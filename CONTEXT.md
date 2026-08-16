# Personal Website

This context describes the public-facing portfolio site and the writing surface that supports it.

## Language

**Blog**:
A Git-authored Markdown writing section on the personal website, exposed at `/blog`.
_Avoid_: CMS, publication platform, Notes, Writing, Articles

**Blog Post**:
A first-class Markdown page in the **Blog** with its own URL, title, description, and publication date.
_Avoid_: entry, item, article

**Achievement**:
A concise, evidence-backed statement in a work experience entry that connects a concrete contribution to an observable outcome.
_Avoid_: responsibility, duty, task

**Frontend Owner**:
The public role label for work where Serhii designed the frontend approach, coordinated implementation, reviewed work, and drove it through release; it does not imply people management.
_Avoid_: Frontend Lead, manager

**Cross-product Terms and Consent Framework**:
The public label for compliance-related frontend work applied consistently across the customer-facing Paybis website and **Paybis Widget**, without disclosing internal capabilities or architecture.
_Avoid_: Compliance Engine, Terms of Service components

**Paybis Widget**:
The customer-facing embedded Paybis experience through which partner users access Paybis services.
_Avoid_: widget platform, embedded product

## Relationships

- The **Blog** belongs to the personal website and is authored by Serhii in Git.
- The **Blog** uses `/blog` as its public index route.
- The **Blog** appears in the primary navigation.
- The **Blog** is published through static site generation with the rest of the personal website.
- A **Blog** contains zero or more **Blog Posts**.
- The **Blog** index lists **Blog Posts** in reverse chronological order.
- Each **Blog Post** has exactly one public URL under `/blog`.
- Each **Blog Post** has a title, description, and publication date.
- Each **Blog Post** is pre-rendered during the static build and does not require a runtime content database.

## Example dialogue

> **Dev:** "Should the **Blog** support visual editing?"
> **Domain expert:** "No, Markdown in Git is enough for now."
> **Dev:** "Should the navigation call it Writing?"
> **Domain expert:** "No, the public label is Blog."
> **Dev:** "Should the Blog be hidden unless someone knows the URL?"
> **Domain expert:** "No, it belongs in the primary navigation."
> **Dev:** "Should the Blog index launch with tags and search?"
> **Domain expert:** "No, it should start as a simple newest-first list."
> **Dev:** "Is a Blog Post just data shown inside the Blog index?"
> **Domain expert:** "No, each Blog Post is its own page."
> **Dev:** "Do Blog Posts need tags or draft states on day one?"
> **Domain expert:** "No, keep the post metadata simple."
> **Dev:** "Should the Blog require D1 at runtime?"
> **Domain expert:** "No, it should be statically generated."

## Flagged ambiguities

- "blog" could mean either a lightweight writing section or a full publishing workflow; resolved: **Blog** means the lightweight Markdown section.
