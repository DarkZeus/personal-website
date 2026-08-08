---
title: "Building Yata: A Translation App in a Couple of Evenings"
description: "How I used SvelteKit, Cloudflare, and an issue-by-issue Codex workflow to build a focused translation app, then changed models when latency broke the experience."
date: "2026-08-08"
category: "Engineering"
tags:
  - svelte
  - sveltekit
  - cloudflare
  - ai
  - translation
  - codex
---

I had already entered my text into DeepL when a Cloudflare Turnstile checkbox appeared over the
page. It had given me enough time to start, but now I could not copy the Translation or interact
with the interface until I passed the check.

That interruption was one part of an accumulated frustration with translation products. DeepL
also appended a promotional attribution when I copied longer Translations from its free version.
Kagi Translate did not focus the textarea when I opened it, even though the textarea is the
product's main interaction, and [Kagi later paused free access](https://blog.kagi.com/translate-update).
Google Translate was easy to reach, but its results often lacked the contextual quality I wanted.

None of those observations is a market analysis, and this is not a comparison of translation
services. They simply pushed me toward a personal question: what would a translation product look
like if I built the one I wanted to use myself?

::theme-picture{light="/images/blog/yata-light.png" dark="/images/blog/yata-dark.png" alt="Yata translating the English pangram The quick brown fox jumps over the lazy dog into Ukrainian" width="2858" height="1754"}
::

## Translation should not feel like work

The obvious modern answer would have been to use an AI chatbot. I did not want another chat.
Translation does not need a conversation, a message history, or context that carries from one
request into the next. Each Translation Request should stand on its own: Source Text, language
choices, and the selected Translation Mode go in; a read-only Translation comes back.

That decision made the interface deliberately conventional. Yata has two text areas, language
selectors, a Copy action, and little else competing for attention. The Source Text editor is
focused when the desktop app opens. Live Translation begins after a short pause, while
`Ctrl+Enter` or `Command+Enter` starts it immediately. The result is designed to let me paste,
translate, and copy without leaving the keyboard.

The product still needed to handle the less visible parts of that simplicity. If I change the
Source Text while a request is running, the old request becomes obsolete. If I change a language
or switch between Fast and Thoughtful Translation, the visible result is now out of date. If the
replacement fails, discarding the previous successful Translation would turn a recoverable
failure into lost work.

I modeled those cases as one discriminated lifecycle rather than a collection of flags: idle,
debouncing, translating, current, out of date, and failed. The previous Translation can remain
visible while its status tells the truth. A 600-millisecond debounce keeps ordinary typing from
issuing a request for every edit, and input-method composition is allowed to finish before that
timer starts.

Cancellation is only best-effort, so the browser also owns a monotonically increasing sequence.
An obsolete request may still finish somewhere downstream, but it cannot publish over newer work.
The essential shape looks like this, trimmed for the article:

```ts
function cancelObsoleteWork(): void {
  requestSequence += 1;
  activeAbortController?.abort();
  activeAbortController = undefined;
}

async function publishTranslation(
  sequence: number,
  abortController: AbortController,
  translationRequest: TranslationRequest,
): Promise<void> {
  const result = await request(translationRequest, abortController.signal);

  if (sequence !== requestSequence) return;

  lastSuccessful = { request: translationRequest, result };
  lifecycle = { status: 'current', success: lastSuccessful };
}
```

This was the first point where the product philosophy became an engineering constraint.
"Immediate" was not a visual style. It depended on scheduling, cancellation, state ownership, and
eventually the latency of the model itself.

Privacy followed the same product-first logic. Yata retains no Translation history or content
logs, and it disables AI Gateway payload logging and caching. A provider necessarily receives the
Source Text, but Yata sends no application account, Cloudflare Access identity, analytics
identifier, or conversation history with it. Under
[Google's paid-service terms](https://ai.google.dev/gemini-api/docs/zdr), those requests are not
used to improve Google's products, although Google may still retain content for abuse monitoring.
I describe Yata as private, not as zero-retention. The distinction matters, but privacy is a
supporting property of the product rather than the subject of this case study.

## An unfamiliar frontend on familiar infrastructure

I came to Yata with more than seven years of frontend experience, mostly in Vue and React. Before
this project, I had built only something very basic with Svelte. Yata became my first substantial
SvelteKit application.

I had been curious about Svelte for a long time. As Vue's
[Vapor Mode](https://github.com/vuejs/core/releases/tag/v3.6.0-rc.1) moved toward a
compiler-driven, no-virtual-DOM rendering path, I wanted to experience those ideas from the other
direction: start with a framework built around compilation and see how they felt in a complete
product.

The transition was much smoother than the word "new" suggests. Component composition, reactive
state, and the separation between application behavior and presentation all transferred naturally
from Vue. Svelte's compiler-first model kept the resulting client lightweight, and Svelte 5 runes
gave the translator controller an explicit place to own reactive state without adding a state
library.

Codex also handled Svelte and SvelteKit well. That does not prove that every unfamiliar framework
becomes effortless with an AI coding partner, but it changed the risk calculation for this
project. I could review the logic and patterns through the frontend experience I already had while
Codex supplied much of the framework-specific implementation. The resulting application still
felt snappy and native to the stack rather than like Vue code mechanically translated into Svelte.

For infrastructure, I chose the familiar option. Cloudflare Workers was already a platform I knew,
and a single SvelteKit Worker was a good fit for a small full-stack application: static application
shell, dynamic Translation endpoint, secrets, deployment, and owner-only Access protection in one
place.

The pleasant discovery was [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/).
It gave both inference paths one place for metadata-only observability, rate limiting,
authentication, and cache controls. Its
[core analytics, caching, and rate-limiting features are currently free](https://developers.cloudflare.com/ai-gateway/reference/pricing/),
although provider inference still has its own price. For developers who already use Cloudflare,
AI Gateway is remarkably easy to recommend: it adds useful control without requiring a large AI
framework or a separate operational system.

The integration does not mean every request remains inside Cloudflare. Fast Translation uses a
Cloudflare-hosted model, while Thoughtful Translation passes through AI Gateway to Google. What
stays unified is the Cloudflare account, request path, and operational controls—not the underlying
provider.

## Responsiveness runs through the whole stack

Yata exposes two Translation Modes. Fast is for ordinary requests where latency matters most.
Thoughtful permits additional provider reasoning for harder text while preserving exactly the
same interface and browser-visible response contract.

The first version used Cloudflare-hosted Gemma 4 for both. That was a reasonable starting point,
not an architecture I needed to apologize for later. One model meant one Workers AI binding, one
Gateway, no third-party inference credential, and no speculative provider layer. Fast disabled
thinking; Thoughtful asked Gemma to reason briefly before publishing the structured Translation.

Then I watched Thoughtful requests in Chrome's Network panel. For comparable short Source Text,
they took approximately five seconds end to end. The request worked, but the pause dominated an
interaction designed to disappear into my typing flow.

I first tried the smaller change: constrain Gemma to LOW reasoning and ask it to use only the
minimum thought needed to resolve ambiguity. The wait did not materially improve. At that point
the question was no longer how to tune one model. It was whether the simplicity of one inference
stack was worth keeping when it contradicted the product.

I considered Gemini 3.5 Flash, Gemini 3.6 Flash, Qwen, and several other models before choosing
[Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite)
with low thinking for Thoughtful Translation. Its combination of speed, cost, structured output,
and paid-provider data terms fit Yata best. Fast remained on Gemma because its path did not have
the same problem.

The switch revealed differences a model string could not hide. Workers AI publishes through one
forced tool call; Gemini returns native JSON-schema output. They have different reasoning controls,
authentication, token accounting, and error shapes. Those were the variations that finally
justified a boundary:

```ts
export type ProviderTranslationRequest = Omit<TranslationRequest, 'mode'>;

export interface TranslationProvider {
  model: string;
  pricing?: ProviderPricing;
  translate(
    request: ProviderTranslationRequest,
    promptVersion: string,
    signal: AbortSignal,
  ): Promise<ProviderPublication | undefined>;
}
```

The interface is intentionally narrow. It does not promise arbitrary portability or expose a
provider selector. Fast always names one configured path and Thoughtful names the other. The
Translation Service continues to own the stable product contract: validation, deadlines, language
policy, safe errors, request IDs, and content-free diagnostics. Provider-specific adapters remain
concrete behind it.

Using the same informal Network-panel method and comparable text, I now see Thoughtful responses
around one second. In one five-request capture, every request completed between 874 milliseconds
and 1.35 seconds:

::nuxt-picture{src="/images/blog/yata-gemini-thoughtful-network-timings.png" alt="Chrome Network panel showing five successful Gemini Translation Requests completing between 874 milliseconds and 1.35 seconds" width="988" height="364" sizes="xs:100vw sm:92vw md:704px" densities="x1" format="avif,webp" loading="lazy" decoding="async"}
::

That is enough to change the feel of the product. It is not a controlled benchmark: I did not
record a fixed corpus, sample size, cold-versus-warm runs, or a breakdown of browser, network,
Gateway, and model time.

The quality result is similarly bounded. I saw no obvious regression for popular languages and
noticeably better results for Ukrainian, Hutsul, and Surzhyk, but I have not completed a thorough
provider-backed evaluation. Deterministic tests prove that the adapters preserve Yata's structured
contract and failure behavior. They do not prove linguistic quality.

That distinction is useful. The model change solved the interaction problem I had observed and
made the architecture more honest about its two providers. It did not establish a universal model
ranking.

## From sixteen issues to a closed beta

The development speed came from making decisions before generating code. I used a grilling
workflow from [Matt Pocock's skills](https://github.com/mattpocock/skills) to force the product
questions into the open. The result became a PRD, then sixteen initial vertical slices that Codex
could implement one by one.

That sequence mattered. "Build a translation app" leaves hundreds of decisions implicit. An issue
such as Live Translation had a much tighter boundary: debounce after 600 milliseconds, respect
composition events, cancel obsolete work, and prevent older requests from publishing. The issue
described what had to be true; Codex could concentrate on making it true.

I defined the idea, UI/UX philosophy, constraints, and architecture. Codex implemented the
application issue by issue. I reviewed every commit—primarily its logic, patterns, and
architectural direction—then exercised the result and redirected it when necessary. This was
active oversight, although not a meticulous line-by-line review.

The first usable version took shape in a couple of evenings. Deployment, the Gemini migration, and
polish continued over the next few days. The repository records the aftermath of the process: one
PRD, sixteen initial implementation issues, issue-scoped commits, and verification notes. It does
not turn those days into proof that anyone can build any production system instantly. I brought
years of frontend judgment, a familiar infrastructure platform, and a deliberately narrow product
scope to the work.

I then put Yata in an Access-protected closed beta with three people from my circle of friends and
family. The goal was not to validate Translation quality. It was to make the application usable
enough for my inner circle before widening access. Their feedback found the kind of problems a
product needs real use to expose: labels that felt wrong, sizing inconsistencies, and missing
workflow details such as a Clear action. I fixed those issues without changing the basic direction
of the product.

Yata is still a small application. It has no conversation, history, database, provider marketplace,
or attempt to support every language a model might recognize. That restraint is part of why it
works for me.

Three lessons remain after the implementation details. First, chat is not a silver bullet for AI
products. A focused task often deserves a focused interface. Second, responsiveness runs through
the whole system: component state, request ownership, network behavior, and model choice all shape
the same user experience. Third, an AI coding partner can compress implementation dramatically
when the product decisions and acceptance boundaries are explicit.

With a narrow problem, explicit product decisions, a familiar deployment platform, and an
issue-by-issue AI-assisted workflow, I could build a genuinely usable application in a couple of
evenings. That does not remove the need for engineering judgment; it changes where that judgment
is spent.
