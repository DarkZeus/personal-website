---
title: "Turning Fragile Career Page Scraping into a Typed Multi-Site Monitor"
description: "A debugging story about Vue bundles, Teamtailor pages, inline job data, and the adapter pattern that fell out of it."
date: "2026-05-07"
category: "Engineering"
tags:
  - typescript
  - bun
  - scraping
  - automation
  - systemd
  - architecture
---

# Case Study: Turning Fragile Career Page Scraping into a Typed Multi-Site Monitor

A debugging story about Vue bundles, Teamtailor pages, inline job data, and the adapter pattern that fell out of it.

## The Page Said No Jobs. The Bundle Disagreed.

The page said there were no open positions. The JavaScript bundle disagreed.

That was the start of what I thought would be a small scraping task: I wanted Telegram notifications when a few game studio career pages changed. I already had an older script that worked against a server-rendered PHP careers page. It fetched the page, pulled vacancies out of the HTML with a selector, compared the result against the previous run, and sent a Telegram message if something changed.

Simple, useful, done.

Then I pointed it at the new GSC Game World careers page. The server-rendered HTML showed the empty state: no jobs. But the actual website, after the client app finished doing its work, had open positions. The old mental model, "fetch HTML and parse the jobs," was suddenly too small for the modern page in front of me.

So the task changed from "write a scraper" to "figure out how each site actually delivers its job data."

## The Old Script Was Useful Until the Website Changed Shape

The original workflow was not bad code. It matched the old website well:

```text
fetch careers page
parse matching HTML elements
compare with the last saved HTML
send Telegram notifications for added or removed items
repeat every hour
```

For a server-rendered page, this is a perfectly reasonable shape. The page source contains the same vacancies a user sees, so the scraper can stay small.

The weakness was not the script itself. The weakness was the assumption under it: that the vacancy list existed in the initial HTML. Once the site moved to a partially server-rendered, partially client-rendered Vue app, that assumption stopped being true.

The first HTML response still mattered, but it was no longer the source of truth.

## Three Sites, Three Rendering Strategies

Once I started looking at multiple studios, the pattern became more interesting.

GSC Game World was the original mystery. The HTML rendered the empty state, but the Vue code loaded careers from a content helper. In the downloaded bundle, the careers page called something equivalent to:

```ts
loadContent("careers")
```

The actual vacancies were baked into a hashed JavaScript content bundle. To monitor GSC reliably, the script needed to discover the current content loader asset, import it, call the loader, and normalize the active careers.

Embark Studios was different. Their careers page is hosted through Teamtailor, and the job list was available in server-rendered HTML under a jobs list container. No browser automation needed, no bundle spelunking. It just needed an HTML parser tuned to Teamtailor's shape.

CD PROJEKT RED was different again. The visible accordion container was empty in the initial HTML, but the page included an inline data assignment:

```js
window.cdpData.jobsData = [...]
```

That was better than scraping cards. The page had already handed over structured job objects with ids, names, locations, projects, categories, remote flags, and SmartRecruiters URLs.

So the final system needed to support three strategies:

- GSC: discover and import a Vue content bundle.
- Embark: parse Teamtailor server-rendered job list HTML.
- CD PROJEKT RED: parse inline `window.cdpData.jobsData`.

The important realization was that these differences should stop at the edge of each website adapter. The rest of the monitor should not care whether a job came from a Vue bundle, an HTML list, or an inline JavaScript array.

## The Adapter Pattern Was Not The Starting Point

I did not start by deciding, "This needs an adapter pattern."

The first working version solved GSC only. It discovered the content loader, extracted the careers, saved local state, and sent Telegram messages. That was enough to prove the idea.

The adapter pattern became obvious only after adding more sites. Embark and CDPR did not share GSC's rendering strategy, but they did share the same desired output: a normalized list of career items.

That led to a small adapter interface:

```ts
type CareerAdapter = (
  monitor: MonitorConfig,
  context: AdapterContext
) => Promise<CareerItem[]>;
```

Each adapter owns the weirdness of one website. The monitor runner owns everything else: polling, diffing, saving snapshots, formatting notifications, and deciding whether to alert.

That separation made the project easier to extend. Adding a new website no longer means threading new scraping rules through the whole script. It means adding one adapter and one config entry.

## Normalizing Jobs Into Career Items

The shared model is intentionally small. The monitor does not need every field a careers platform exposes. It needs enough information to identify a vacancy, display it, link to it, and detect meaningful changes.

The normalized shape looks like this:

```ts
type CareerItem = {
  id: string;
  title: string;
  category: string | null;
  location: string | null;
  project: string | null;
  remote: boolean;
  url: string;
  contentHash: string;
};
```

The `contentHash` is the key detail. Each adapter decides which source fields are meaningful for that site, then the shared career item module hashes those fields consistently.

That means the diffing code does not need to know why a CDPR job has a project, why an Embark job has a Teamtailor URL, or why a GSC job has localized fields. It only compares stable ids and content hashes.

In other words, the messy part of each website is handled once, close to the adapter. After that, the rest of the system deals with plain career items.

## One Registry, Three Website Adapters

The strategy registry is deliberately boring:

```ts
const adapters = {
  "gsc-vue-bundle": fetchGscCareers,
  "teamtailor-html": fetchTeamtailorCareers,
  "cdprojektred-window-data": fetchCdProjektRedCareers,
};
```

The config chooses which strategy each monitor uses:

```json
{
  "id": "embark",
  "name": "Embark Studios",
  "strategy": "teamtailor-html",
  "url": "https://careers.embark-studios.com/jobs"
}
```

This is the part of the design I like most. The interface is small, but there is a lot of behavior behind it. One adapter can do simple HTML extraction. Another can discover a hashed JavaScript bundle and import it. Another can parse inline data. The runner does not change.

That is the kind of abstraction I trust: it appeared because the code had real variation, not because I wanted a pattern in advance.

## Making It Actually Run

The monitor runs on a small VPS with Bun and `systemd`. That part is not glamorous, but it matters. A personal automation is only useful if it keeps running after the terminal closes.

The service file is intentionally simple:

```ini
[Unit]
Description=Monitor careers websites and send notifications to Telegram
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/monitor_careers
ExecStart=/home/ubuntu/.bun/bin/bun index.ts
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

The `network-online.target` bit is a small nicety. The script immediately fetches external websites, so it is better to start after the machine believes the network is actually usable, not merely after the network stack has started.

Each monitor writes its own snapshot:

```text
data/gsc.json
data/embark.json
data/cdprojektred.json
```

That keeps state local and easy to inspect. There is no database, queue, or external scheduler. For this use case, a Bun process plus `systemd` is enough.

## Tests: Small Fixtures Instead Of Live Websites

The refactor also made the project easier to test.

Live careers pages change. That is the whole point of monitoring them. So the tests do not rely on live websites. Instead, each adapter has local fixtures:

- Teamtailor HTML for the Embark-style jobs list.
- CDPR inline `window.cdpData.jobsData`.
- A small GSC-style page plus app bundle and content loader fixture.

The pure modules are tested separately:

- diffing added, removed, updated, and unchanged items
- career item hashing
- snapshot store read/write behavior
- notification formatting and message chunking

This is where the architecture started paying rent. Once the adapters, runner, store, and notifier had real seams, tests could target each piece directly. I did not need to run the whole polling loop to check whether the Teamtailor parser still worked.

## Working With Codex

I used Codex as a debugging and refactoring partner during this project.

The useful part was not having it magically "build the app." The useful part was the back-and-forth: inspecting downloaded bundles, searching for content-loading clues, testing hypotheses against live pages, and then turning the working script into a typed module structure with tests.

That workflow felt closest to pair programming. I still had to decide what mattered: which assumptions were safe, when to stop digging, how much architecture was worth adding, and what shape would stay understandable after the immediate problem was solved.

## Outcome: A Small System With Better Seams

The final monitor is still small. It polls once an hour, checks three public careers pages, stores snapshots locally, and sends Telegram notifications when jobs are added, removed, or meaningfully updated.

But it is no longer one scraper with one assumption. It is a typed Bun/TypeScript monitor with:

- site-specific adapters
- normalized career items
- per-site snapshots
- Telegram notifications
- local fixture tests
- a `systemd` service keeping it alive on a VPS

The main lesson was not "always start with adapters." I think that would have been premature.

The better lesson is: let real variation reveal the seams.

One PHP page did not need a strategy system. One Vue page barely did. But three careers pages, each with a different rendering strategy, made the abstraction obvious. At that point, the adapter pattern was not extra architecture. It was the simplest way to keep the weirdness local.

Adding another careers site now means writing another adapter, not touching the whole system. That is exactly the kind of small, practical leverage I want from architecture.
