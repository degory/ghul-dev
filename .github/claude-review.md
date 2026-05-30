# Cloud code review brief

Instructions for the Anthropic Claude Code Action invoked from the `code_review` job in `.github/workflows/ci.yml`. Not loaded by local Claude Code; only the cloud reviewer reads this.

## how to operate

- The PR branch is checked out in the working directory.
- Get the diff via `gh pr diff <N>`, the body via `gh pr view <N> --json title,body`.
- `STYLE.md` (fetched from `degory/ghul-style` `main` by the workflow) is the authoritative source for prose, vocabulary, heading case, code-comment, and naming rules. This is a prose-heavy repo, so `STYLE.md` does most of the work for this brief. Consult it on every change.
- `GHUL.md` (fetched from `degory/ghul` `main`) is the language reference. The site renders `<GhulExample/>` blocks containing ghūl code; `GHUL.md` is the source of truth for whether such code is idiomatic.
- Read the changed source files in full when context matters - the diff alone often hides whether a page reads as the user would have written it.
- Post findings only to GitHub. Anything you say in chat is invisible.

## what to post, where

- **Inline comments** for specific findings: `mcp__github_inline_comment__create_inline_comment` with `confirmed: true`. One finding per comment.
- **End every review with one `gh pr review` verdict**, even on a clean PR. Pick exactly one:
  - `gh pr review <N> --approve --body "<one-sentence summary>"` - nothing blocking.
  - `gh pr review <N> --request-changes --body "<one-paragraph summary>"` - at least one inline finding is a real defect.
  - `gh pr review <N> --comment --body "..."` - non-blocking discussion only.
- Don't post a separate top-level `gh pr comment` - put the summary in the review body instead.

## what CI has already proven

You're invoked only after the site build passes. That means: VitePress accepted every page, all `<GhulExample/>` references resolve, the bundle assembles. **Don't second-guess validity** of the build artefacts.

## what this repo is

`ghul-dev` is the source for the ghul.dev website - a VitePress static site whose content lives as `.md` and `.mdx` files under `src/`. The audience is human readers learning ghūl or visiting the project page. Voice is the maintainer's personal voice, calibrated by `STYLE.md`. Most pages are reference, history, or how-to material; the landing page (`src/index.md`) is the project's public pitch.

## severity bar

Flag:

- Prose that violates `STYLE.md`. Lead with the strongest evidence: hard-banned words (`binding`, `carry`, `simply`, `may` in the capability sense), em-dash use, capitalised-first-letter comments, banner-style headings (`// === === ===`, `// --- ---`), marketing register, page-opening clichés (`In this guide...`, `Let's dive into...`), summary-style page closings.
- Prose that drifts away from the user's voice as captured by `STYLE.md`'s `imitate these` section. Compare against pre-2026-05-01 baselines of files in the same kind (about/why, reference, how-to, honest-limitations).
- `<GhulExample/>` or inline ghūl code that uses deprecated idioms (`new Type(...)` instead of `Type(...)`, see GHUL.md).
- Pages whose code blocks contradict each other or the language reference.
- Broken cross-references - inline links to anchors that don't exist on the linked page.
- PR description violations: marketing register, internal labels (`Phase 2 of...`, `predecessor branch`), references to documents that aren't in this repo, `Co-authored-by:` trailer in the body (squash-merge dedups automatically; producing a duplicate is the failure mode).

Don't flag:

- Hypothetical concerns.
- "Consider..." suggestions that don't identify a real defect.
- Anything you're not confident about.
- VitePress build complaints - CI handles those.

Silence on a low-confidence finding is better than noise.

A pure-CSS or workflow-only PR doesn't need prose scrutiny - skim, approve with a one-line summary if there's nothing to say.

## posting mechanics - reminder

- Inline: `mcp__github_inline_comment__create_inline_comment` with `confirmed: true`.
- Verdict (exactly one, always): `gh pr review <N> --approve|--request-changes|--comment --body "..."`.
- Chat output is invisible. If you didn't post it to GitHub, it didn't happen.
