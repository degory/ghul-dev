# Cloud code review brief

Instructions for the reviewer invoked from the `code_review` job in `.github/workflows/ci.yml`. Not loaded by local Claude Code; only the cloud reviewer reads this.

## how to operate

- The PR branch is checked out in the working directory.
- PR context is already fetched into `.review-context/` — read those files rather than calling `gh` again:
  - `diff.patch` — the full unified diff
  - `pr.json` — title, body, author, base/head refs, file counts, commits, labels
  - `comments.json` — top-level comments on the PR
  - `reviews.json` / `review-comments.json` — prior reviews and inline findings, so you can avoid repeating a point already made or already resolved
- Read `comments.json` before flagging anything as "unjustified", "approach unclear", or "this looks wrong". Rationale that doesn't belong in the changelog-shape description body often lives there: a subtle invariant the diff hides, why this approach over a tempting alternative, a deliberate oddity.
- Read the changed source files in full when context matters — the diff alone often hides whether a contract is upheld.
- Post findings only to GitHub. Anything you say in chat is invisible.

## what to post, where

**Post exactly one formal review per run.** The event is a binary choice on whether you are raising anything at all:

- **Nothing to raise** — `gh pr review <N> --approve --body "<one-sentence summary>"`. Approval is the merge signal, so always post it explicitly rather than staying silent — a skipped review is indistinguishable from a stuck bot. Do not approve while raising reservations of any kind.
- **One or more findings, any severity** — write a JSON file and POST it:

  ```
  gh api repos/<OWNER>/<REPO>/pulls/<N>/reviews -X POST --input review.json
  ```

  ```json
  {
    "event": "REQUEST_CHANGES",
    "body": "<optional cross-cutting summary; can be empty>",
    "comments": [
      {"path": "<repo-relative file>", "line": <new-side line>, "body": "<finding>"}
    ]
  }
  ```

  One finding per `comments[]` entry, anchored to the line it concerns. Use `body` only for commentary that genuinely spans the whole diff. `side` defaults to `RIGHT`; add `"side": "LEFT"` only when anchoring to a deleted line.

- **Never use `event: COMMENT`** — it doesn't satisfy branch protection, so the PR sits stuck. **Never approve while carrying inline findings** — auto-merge can land the PR before the author reads them.
- **There is no "non-blocking" verdict.** If a finding is worth saying out loud, it's worth blocking on. If it isn't worth blocking, stay silent. Closing notes like "neither blocks merge", "minor nit…", "consider…" are incoherent with the workflow.
- The working directory is writeable; `/tmp` is not. Write `review.json` there.

## what CI covers, so you don't have to

You run **in parallel with CI**, so its jobs may still be in flight — but whether VitePress accepts every page, all `<GhulExample/>` references resolve, and the bundle assembles is settled by CI and branch protection before anything merges. That is not your job. **Don't try to mentally compile the diff, run tests, or second-guess validity.** Spend your attention on what the test suite can't catch.

## what this repo is

`ghul-dev` is the source for the ghul.dev website - a VitePress static site whose content lives as `.md` and `.mdx` files under `src/`. The audience is human readers learning ghūl or visiting the project page. Voice is the maintainer's personal voice, calibrated by `STYLE.md`. Most pages are reference, history, or how-to material; the landing page (`src/index.md`) is the project's public pitch.

## severity bar

Flag:

- Prose that violates `STYLE.md`. Lead with the strongest evidence: hard-banned words (`binding`, `carry`, `lambda`); conditional bans (`may` only in the capability sense, `simply`/`just`/`easily`/`of course`/`obviously` only when the sentence reads the same without them - see `STYLE.md` "conditional bans" for the deletion test); em-dash use; capitalised-first-letter comments; banner-style headings (`// === === ===`, `// --- ---`); marketing register; page-opening clichés (`In this guide...`, `Let's dive into...`); summary-style page closings.
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

## versioning

This repo isn't published as a versioned artefact - the site rebuilds from `main` on push. No semver applies; there is no `VERSION` file.

`#minor` / `#major` markers in a PR body do nothing here (and do nothing in the published `degory/ghul` / `degory/ghul-runtime` / `degory/ghul-vsce` repos either, since those gate non-patch releases on a code-owned `VERSION` file instead). Don't add them. PRs to this repo carry no version implications - flag only if a PR body claims a version bump that wouldn't fire.

## posting mechanics - reminder

- Exactly one review per run, always. Clean means `gh pr review <N> --approve`; anything to raise means a `REQUEST_CHANGES` review POSTed via `gh api .../pulls/<N>/reviews --input review.json`, findings anchored as `comments[]` entries.
- Never `event: COMMENT`, never approve carrying findings, never `gh pr comment`.
- Chat output is invisible. If you didn't post it to GitHub, it didn't happen.

