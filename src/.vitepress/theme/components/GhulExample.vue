<script setup>
import { computed, ref } from 'vue'
import DiagnosticIcon from './DiagnosticIcon.vue'

// Renders a verified ghūl example from its generated artifact: the visible
// (sliced, de-indented) code, syntax-coloured and with VSCE-style hover
// tooltips, IDE-style red/yellow squiggles under any compiler diagnostics,
// and — when the example produced output or diagnostics — a panel below.
//
// The artifact carries plain `code`, `hovers` and `diagnostics`; the
// build-time ghul-example-data Vite plugin folds in syntax-colour `tokens`
// for the code and each hover's description. Colour tokens, hover spans and
// diagnostic spans are all character ranges — merged here into one run of
// spans per line.
const props = defineProps({
  name: { type: String, required: true }
})

const artifacts = import.meta.glob('../../example-data/*.json', { eager: true })

const example = computed(() => {
  for (const path in artifacts) {
    if (path.endsWith('/' + props.name + '.json')) {
      const module = artifacts[path]
      return module.default ?? module
    }
  }
  return null
})

const diagnostics = computed(() => example.value?.diagnostics ?? [])
const semanticTokens = computed(() => example.value?.semanticTokens ?? [])

// The compiler reports some diagnostics over a whole multi-line declaration.
// A wavy underline spanning many lines is noisy, so a multi-line diagnostic
// squiggle is clamped to its first line (start column to end of line); the
// panel and hover still carry the full diagnostic. Single-line diagnostics
// are underlined exactly.
const squiggleDiagnostics = computed(() =>
  diagnostics.value.map(d =>
    d.endLine > d.startLine
      ? { ...d, endLine: d.startLine, endColumn: 100000 }
      : d))

const lines = computed(() => {
  const ex = example.value
  if (!ex) return []

  const tokenLines = ex.tokens
    ?? ex.code.split('\n').map(text => [{ text, style: '' }])

  return tokenLines.map((tokens, i) =>
    mergeLine(tokens, i + 1, ex.hovers ?? [], squiggleDiagnostics.value, semanticTokens.value))
})

// Merge one line's colour tokens with the hovers, diagnostics and semantic
// tokens that cover it, producing runs of text that each carry a colour
// style and, optionally, a hover, a diagnostic and a semantic-token class.
//
// When a character is covered by a semantic token the TextMate-derived
// Shiki colour is dropped — the semantic class colours it via CSS — so an
// identifier reliably reflects what the compiler resolved it to (`class`,
// `method`, `property`, `parameter`, …) rather than the regex-based guess.
function mergeLine(colourTokens, lineNumber, hovers, diags, semantic) {
  const chars = []
  const styles = []
  for (const token of colourTokens) {
    for (const ch of token.text) {
      chars.push(ch)
      styles.push(token.style || '')
    }
  }
  const length = chars.length

  // For each 1-based column, the innermost (shortest) span covering it.
  const hoverAt = pickSpans(hovers, lineNumber, length)
  const diagAt = pickSpans(diags, lineNumber, length)
  const semanticAt = pickSpans(semantic, lineNumber, length)

  // Group consecutive characters sharing the same colour, hover, diagnostic
  // and semantic token.
  const segments = []
  let column = 0
  while (column < length) {
    const style = styles[column]
    const hover = hoverAt[column]
    const diagnostic = diagAt[column]
    const sem = semanticAt[column]
    let end = column
    while (
      end < length &&
      styles[end] === style &&
      hoverAt[end] === hover &&
      diagAt[end] === diagnostic &&
      semanticAt[end] === sem
    ) end++
    segments.push({
      text: chars.slice(column, end).join(''),
      // A semantic token's CSS class supplies the colour; drop the Shiki
      // style on that range so the class isn't fighting an inline `color`.
      style: sem ? null : style,
      hover,
      diagnostic,
      semantic: sem,
    })
    column = end
  }
  return segments
}

// For one line, return a per-column array of the innermost span covering
// each column. Spans are {startLine, startColumn, endLine, endColumn}.
function pickSpans(spans, lineNumber, length) {
  const at = new Array(length).fill(null)
  const width = new Array(length).fill(Infinity)

  for (const span of spans) {
    if (span.startLine > lineNumber || span.endLine < lineNumber) continue

    const from = span.startLine < lineNumber ? 1 : span.startColumn
    const to = span.endLine > lineNumber ? length : span.endColumn
    const size = (span.endLine - span.startLine) * 100000
      + (span.endColumn - span.startColumn)

    for (let column = from; column <= to && column <= length; column++) {
      if (size < width[column - 1]) {
        width[column - 1] = size
        at[column - 1] = span
      }
    }
  }
  return at
}

// A single shared tooltip, teleported to <body> and positioned fixed, so it
// is never clipped by the code box's overflow. A hover tooltip shows the
// hover description rendered ghūl-coloured; a diagnostic tooltip shows the
// plain diagnostic message.
const tip = ref({ show: false, tokens: [], text: '', severity: '', style: {} })

function place(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const maxWidth = 480

  const style = {
    left: Math.max(8, Math.min(rect.left, window.innerWidth - maxWidth - 16)) + 'px'
  }
  if (rect.bottom + 220 > window.innerHeight) {
    style.bottom = (window.innerHeight - rect.top + 6) + 'px'
  } else {
    style.top = (rect.bottom + 6) + 'px'
  }
  return style
}

// Like VSCode, a token carrying both a diagnostic and hover info shows
// both — the diagnostic on top, the hover description below.
function onEnter(event, segment) {
  if (!segment.diagnostic && !segment.hover) {
    return
  }

  tip.value = {
    show: true,
    text: segment.diagnostic?.message ?? '',
    severity: segment.diagnostic?.severity ?? '',
    tokens: segment.hover?.tokens ?? [],
    style: place(event),
  }
}

function onLeave(segment) {
  if (segment.hover || segment.diagnostic) {
    tip.value = { ...tip.value, show: false }
  }
}

const copied = ref(false)

function copy() {
  if (!example.value) return
  // `fullSource` is the original example file with the `// >>>` / `// <<<`
  // region markers stripped — what the user actually wants to paste into
  // their own project. `code` is the slice displayed on the page.
  navigator.clipboard?.writeText(example.value.fullSource ?? example.value.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// The panel below the code can be toggled fully collapsed or expanded. It
// defaults to expanded for a diagnostic example (the diagnostics are the
// point) or one or two lines of output, collapsed for longer output.
function isShortOutput(output) {
  if (!output) return false
  return output.replace(/\n+$/, '').split('\n').length <= 2
}

const outputExpanded = ref(
  diagnostics.value.length > 0 || isShortOutput(example.value?.output)
)

function toggleOutput() {
  outputExpanded.value = !outputExpanded.value
}

const panelLabel = computed(() =>
  diagnostics.value.length > 0 && !example.value?.output ? 'diagnostics' : 'output')
</script>

<template>
  <div v-if="example" class="ghul-example">
    <span class="ghul-example-lang">ghul</span>
    <button
      type="button"
      class="ghul-example-copy"
      :class="{ copied }"
      :title="copied ? 'copied' : 'copy code'"
      @click="copy"
    >
      <svg v-if="!copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>

    <div class="ghul-example-code">
      <div v-for="(segments, i) in lines" :key="i" class="ghul-example-line">
        <span
          v-for="(segment, j) in segments"
          :key="j"
          :style="segment.style"
          :class="[
            'ghul-example-tok',
            segment.semantic ? 'ghul-sem-' + segment.semantic.tokenType : null,
            segment.semantic && segment.semantic.modifiers && segment.semantic.modifiers.includes('static') ? 'ghul-sem-mod-static' : null,
            {
              'ghul-example-hover': segment.hover,
              'ghul-example-squiggle-error': segment.diagnostic && segment.diagnostic.severity === 'error',
              'ghul-example-squiggle-warning': segment.diagnostic && segment.diagnostic.severity === 'warning',
            }
          ]"
          @mouseenter="onEnter($event, segment)"
          @mouseleave="onLeave(segment)"
        >{{ segment.text }}</span>
      </div>
    </div>
    <div v-if="example.output || diagnostics.length" class="ghul-example-output">
      <button
        type="button"
        class="ghul-example-output-toggle"
        :aria-expanded="outputExpanded"
        @click="toggleOutput"
      >
        <svg
          class="ghul-example-chevron"
          :class="{ 'is-open': outputExpanded }"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
        <span>{{ panelLabel }}</span>
      </button>
      <div v-show="outputExpanded" class="ghul-example-output-body">
        <div
          v-for="(d, k) in diagnostics"
          :key="k"
          class="ghul-example-diag"
        >
          <DiagnosticIcon :severity="d.severity" />
          <span class="ghul-example-diag-text">{{ d.message }}</span>
        </div>
        <pre v-if="example.output">{{ example.output }}</pre>
      </div>
    </div>
  </div>
  <div v-else class="ghul-example ghul-example-missing">
    no generated artifact for example "{{ name }}"
  </div>

  <Teleport to="body">
    <div
      v-if="tip.show"
      class="ghul-example-tooltip"
      :style="tip.style"
    >
      <div v-if="tip.text" class="ghul-example-tooltip-diagnostic">
        <DiagnosticIcon :severity="tip.severity" />
        <span>{{ tip.text }}</span>
      </div>
      <div v-if="tip.tokens.length" class="ghul-example-tooltip-hover">
        <span
          v-for="(token, k) in tip.tokens"
          :key="k"
          :style="token.style"
          class="ghul-example-tok"
        >{{ token.text }}</span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.ghul-example {
  position: relative;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.ghul-example-code {
  font-family: 'Fira Code', var(--vp-font-family-mono);
  font-feature-settings: 'calt' 1, 'liga' 1, 'ss07' 1;
  font-size: 0.875em;
  line-height: 1.6;
  padding: 1rem 1.25rem;
  background: var(--vp-code-block-bg);
  white-space: pre;
  overflow-x: auto;
}

.ghul-example-line {
  min-height: 1.6em;
}

.ghul-example-tok {
  color: var(--shiki-light);
}

.dark .ghul-example-tok {
  color: var(--shiki-dark);
}

/* Semantic-token colours — what the compiler resolved each identifier to.
   Light+ / Dark+ values come from VS Code's stock themes so a ghul.dev
   example reads the same as it would in the editor. The TextMate-derived
   Shiki colour is dropped on these ranges in mergeLine, so these classes
   colour them directly. */
.ghul-sem-namespace      { color: #267F99; }
.ghul-sem-class          { color: #267F99; }
.ghul-sem-interface      { color: #267F99; }
.ghul-sem-struct         { color: #267F99; }
.ghul-sem-enum           { color: #267F99; }
.ghul-sem-typeParameter  { color: #267F99; }
.ghul-sem-enumMember     { color: #0070C1; }
.ghul-sem-method         { color: #795E26; }
.ghul-sem-function       { color: #795E26; }
.ghul-sem-property       { color: #001080; }
.ghul-sem-variable       { color: #001080; }
.ghul-sem-parameter      { color: #001080; }

.dark .ghul-sem-namespace      { color: #4EC9B0; }
.dark .ghul-sem-class          { color: #4EC9B0; }
.dark .ghul-sem-interface      { color: #B8D7A3; }
.dark .ghul-sem-struct         { color: #4EC9B0; }
.dark .ghul-sem-enum           { color: #4EC9B0; }
.dark .ghul-sem-typeParameter  { color: #4EC9B0; }
.dark .ghul-sem-enumMember     { color: #4FC1FF; }
.dark .ghul-sem-method         { color: #DCDCAA; }
.dark .ghul-sem-function       { color: #DCDCAA; }
.dark .ghul-sem-property       { color: #9CDCFE; }
.dark .ghul-sem-variable       { color: #9CDCFE; }
.dark .ghul-sem-parameter      { color: #9CDCFE; }

/* The `static` modifier — visible cue without changing colour. */
.ghul-sem-mod-static {
  font-style: italic;
}

.ghul-example-hover:hover {
  background: var(--vp-c-default-soft);
}

/* IDE-style squiggles: a wavy underline under the diagnostic range. */
.ghul-example-squiggle-error,
.ghul-example-squiggle-warning {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-skip-ink: none;
  text-underline-offset: 3px;
}

.ghul-example-squiggle-error {
  text-decoration-color: var(--vp-c-danger-1);
}

.ghul-example-squiggle-warning {
  text-decoration-color: var(--vp-c-warning-1);
}

/* Language tag and copy button — top-right, swapping on hover, matching
   VitePress's own fenced code blocks. */
.ghul-example-lang {
  position: absolute;
  top: 8px;
  right: 12px;
  z-index: 2;
  font-family: 'Fira Code', var(--vp-font-family-mono);
  font-feature-settings: 'calt' 1, 'liga' 1, 'ss07' 1;
  font-size: 12px;
  color: var(--vp-c-text-3);
  transition: opacity 0.2s;
}

.ghul-example-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s, color 0.2s;
}

.ghul-example:hover .ghul-example-lang {
  opacity: 0;
}

.ghul-example:hover .ghul-example-copy {
  opacity: 1;
}

.ghul-example-copy:hover {
  color: var(--vp-c-text-1);
}

.ghul-example-copy.copied {
  color: var(--vp-c-brand-1);
  opacity: 1;
}

.ghul-example-copy svg {
  width: 16px;
  height: 16px;
}

.ghul-example-output {
  border-top: 1px solid var(--vp-c-divider);
}

.ghul-example-output-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 1.25rem;
  background: transparent;
  border: 0;
  font-family: inherit;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.ghul-example-output-toggle:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.ghul-example-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

.ghul-example-chevron.is-open {
  transform: rotate(90deg);
}

.ghul-example-output-body pre {
  margin: 0;
  padding: 0.4rem 1.25rem 0.9rem;
  font-family: 'Fira Code', var(--vp-font-family-mono);
  font-feature-settings: 'calt' 1, 'liga' 1, 'ss07' 1;
  font-size: 0.875em;
  white-space: pre-wrap;
}

/* One diagnostic line in the panel: a severity icon and the message. */
.ghul-example-diag {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.2rem 1.25rem;
  font-family: 'Fira Code', var(--vp-font-family-mono);
  font-feature-settings: 'calt' 1, 'liga' 1, 'ss07' 1;
  font-size: 0.8125em;
  line-height: 1.5;
}

.ghul-example-diag:first-child {
  padding-top: 0.5rem;
}

.ghul-example-diag-text {
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}

.ghul-example-missing {
  padding: 0.75rem 1.25rem;
  color: var(--vp-c-danger-1);
  font-size: 0.9em;
}

.ghul-example-tooltip {
  position: fixed;
  z-index: 100;
  font-family: 'Fira Code', var(--vp-font-family-mono);
  font-feature-settings: 'calt' 1, 'liga' 1, 'ss07' 1;
  font-size: 0.8125em;
  line-height: 1.5;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  box-shadow: var(--vp-shadow-3);
  max-width: 480px;
  pointer-events: none;
  overflow: hidden;
}

/* The diagnostic half: severity icon and a plain, uncoloured message. */
.ghul-example-tooltip-diagnostic {
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
  padding: 6px 10px;
  white-space: pre-wrap;
  color: var(--vp-c-text-1);
}

/* The hover half: the description, syntax-coloured from the grammar. */
.ghul-example-tooltip-hover {
  padding: 6px 10px;
  white-space: pre-wrap;
}

/* When both halves show, a divider sits between them. */
.ghul-example-tooltip-diagnostic + .ghul-example-tooltip-hover {
  border-top: 1px solid var(--vp-c-divider);
}
</style>
