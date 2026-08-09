<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import GhulExample from './GhulExample.vue'
import { editingExample } from '../playground'

// A rotating carousel of <GhulExample> cards. The page-split plugin injects
// `:examples` (an array of {name, data}); `labels` is a comma-separated list
// of human labels, paired by index. One card is shown at a time; the deck
// auto-rotates every few seconds, pausing on hover/focus or when the user
// takes manual control, and is disabled entirely when the reader has asked
// their OS for reduced motion.
const props = defineProps({
  examples: { type: Array, required: true },
  labels: { type: String, default: '' },
  startIndex: { type: Number, default: 0 },
})

const ROTATE_MS = 7000
const HOLD_MS = 12000

// A label can mark a span as code with backticks ("fibonacci: streams +
// `|>`"), rendered as alternating text/code parts so operators show in the
// code font. Odd positions in the split are the code spans.
function labelParts(label) {
  return label.split('`').map((text, i) => ({ text, code: i % 2 === 1 }))
}

const items = computed(() => {
  const labels = props.labels.split(',').map(s => s.trim())
  return props.examples.map((e, i) => {
    const label = labels[i] || e.name
    return {
      name: e.name,
      data: e.data,
      label,
      labelText: label.replaceAll('`', ''),
      labelParts: labelParts(label),
    }
  })
})

const index = ref(props.startIndex)
const current = computed(() => items.value[index.value] ?? items.value[0])

function go(i) {
  const n = items.value.length
  if (n) index.value = ((i % n) + n) % n
}
const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)

// true while one of this deck's own examples is open in the editor. Rotating
// then would swap the card out from under someone who is typing in it.
const editingHere = computed(() =>
  editingExample.value !== null
  && items.value.some(item => item.name === editingExample.value))

// Auto-rotation state. A single interval ticks; it advances only when
// nothing is asking it to hold still (reduced motion, hidden tab, pointer
// over the card, a recent manual selection, or an open editor).
const reduced = ref(false)
const hovering = ref(false)
const holding = ref(false)
// False once the top of the deck has been scrolled past. The examples differ
// in height by several hundred pixels, so a rotation a reader cannot see only
// shifts the rest of the page under them.
const anchored = ref(true)
const root = ref(null)
let timer = null
let holdTimer = null
let mq = null
let mqListener = null
let observer = null

function clearHold() {
  holding.value = false
  if (holdTimer) { clearTimeout(holdTimer); holdTimer = null }
}
// a manual control: jump and hold auto-rotation for a while so the
// reader can study the example they picked
function jump(i) {
  go(i)
  clearHold()
  holding.value = true
  holdTimer = setTimeout(clearHold, HOLD_MS)
}

onMounted(() => {
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced.value = mq.matches
  mqListener = e => { reduced.value = e.matches }
  mq?.addEventListener?.('change', mqListener)

  // Watch a zero-height strip at the top of the deck: once it leaves the
  // viewport the reader is below the examples and rotation should stop.
  if (root.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      entries => { anchored.value = entries[0].isIntersecting },
      { threshold: 0 },
    )
    observer.observe(root.value)
  }

  timer = setInterval(() => {
    if (reduced.value || hovering.value || holding.value) return
    if (editingHere.value) return
    if (!anchored.value) return
    // no point rotating a tab nobody is looking at
    if (document.hidden) return
    next()
  }, ROTATE_MS)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (holdTimer) clearTimeout(holdTimer)
  mq?.removeEventListener?.('change', mqListener)
  observer?.disconnect()
})
</script>

<template>
  <div
    class="ghul-switcher"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @focusin="hovering = true"
    @focusout="hovering = false"
  >
    <div ref="root" class="ghul-switcher-anchor" aria-hidden="true" />
    <div class="ghul-switcher-bar">
      <span class="ghul-switcher-label"><template v-for="(part, i) in current?.labelParts" :key="i"><code v-if="part.code">{{ part.text }}</code><template v-else>{{ part.text }}</template></template></span>
      <div class="ghul-switcher-controls">
        <button type="button" class="ghul-switcher-btn" aria-label="previous example" @click="jump(index - 1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div class="ghul-switcher-dots">
          <button
            v-for="(item, i) in items"
            :key="item.name"
            type="button"
            class="ghul-switcher-dot"
            :class="{ 'is-active': i === index }"
            :aria-label="item.labelText"
            :aria-pressed="i === index"
            :title="item.labelText"
            @click="jump(i)"
          ><span class="ghul-switcher-dot-mark" /></button>
        </div>
        <button type="button" class="ghul-switcher-btn" aria-label="next example" @click="jump(index + 1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
    <!-- GhulExample has several root nodes (the card plus a teleported
         tooltip). A fragment cannot be wrapped in a <Transition> (the
         outgoing card would leave without the incoming one ever being
         inserted) and cannot inherit a class of its own, so the key and
         the entry animation both live on this wrapper. Rekeying it
         remounts the example, which is what switches the deck. -->
    <div :key="current?.name" class="ghul-switcher-card">
      <GhulExample
        :name="current?.name"
        :data="current?.data"
      />
    </div>
  </div>
</template>

<style scoped>
.ghul-switcher {
  margin: 1rem 0;
}

.ghul-switcher-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.35rem 0.25rem 0.6rem;
}

/* Match the .vp-doc h3 styling ("hello world!" above), so the rotating
   label reads as this card's section heading. */
.ghul-switcher-label {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

/* Code spans in the label (e.g. the |> operator): Fira Code with the same
   ligature settings the example cards use, at the relative size VitePress
   gives code inside headings. */
.ghul-switcher-label code {
  font-family: 'Fira Code', var(--vp-font-family-mono);
  font-feature-settings: 'calt' 1, 'liga' 1, 'ss07' 1;
  font-size: 0.9em;
  font-weight: 600;
}

.ghul-switcher-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.ghul-switcher-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.ghul-switcher-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.ghul-switcher-btn svg {
  width: 15px;
  height: 15px;
}

.ghul-switcher-dots {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.ghul-switcher-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.ghul-switcher-dot-mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  opacity: 0.5;
  transition: opacity 0.15s, background 0.15s, transform 0.15s;
}

.ghul-switcher-dot:hover .ghul-switcher-dot-mark {
  opacity: 0.85;
}

.ghul-switcher-dot.is-active .ghul-switcher-dot-mark {
  background: var(--vp-c-brand-1);
  opacity: 1;
  transform: scale(1.15);
}

/* let the inner card sit flush under the bar; GhulExample has its own
   margins, so tighten the switcher's hold on vertical rhythm */
.ghul-switcher :deep(.ghul-example) {
  margin-top: 0;
}

/* Each switch remounts the card, so a plain entry animation gives the
   change a soft edge without needing a <Transition>. */
/* A zero-height marker for the top of the deck; the rotation stops once it
   scrolls out of view. */
.ghul-switcher-anchor {
  height: 0;
}

.ghul-switcher-card {
  animation: ghul-switcher-in 0.2s ease;
}

@keyframes ghul-switcher-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .ghul-switcher-card {
    animation: none;
  }
}
</style>
