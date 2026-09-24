<script setup>
import { ref, computed, shallowRef, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import GhulExample from './GhulExample.vue'
import RosettaControls from './RosettaControls.vue'
import RosettaOnward from './RosettaOnward.vue'
import RosettaList from './RosettaList.vue'
import { countEvent } from '../events'
import { tokenise } from '../rosetta-highlight'
import { PLAYGROUND_BASE } from '../playground'
import { shownSlug, shownFilter, showAt, replaceAt } from '../rosetta-route'
import { corpus, query, chosen, toggleTag } from '../rosetta-filter'
import { loadCorpus, taskBySlug, matching, draw, addressOf, filterFromSearch } from '../rosetta-corpus'

// The whole Rosetta Code section: one task shown whole and ready to run, with the corpus
// searchable and filterable beneath it. The task is whichever /rosetta/<slug> the reader arrived
// at, or one picked at random and weighted towards the ones worth a stranger's time.
//
// Nothing here is copied into the site. The corpus is read from ghul-rosetta-code when the page
// opens and each solution's source when its task is shown, so a task solved there this morning is
// here this morning, and the site stops growing a page per task. What that costs is a section that
// needs GitHub to be reachable, which is what the failure state below is for.

// The corpus and the filter live in rosetta-filter.js, because the page's aside draws the same
// controls on a wide screen.
const failure = ref(null)

// A task shown by address rather than picked: the reader followed a link, or chose one from the
// list. Held apart from `picked` so that going back to the section restores the random pick.
const picked = shallowRef(null)

const shown = computed(() => {
  if (!corpus.value) return null

  return shownSlug.value ? taskBySlug(corpus.value, shownSlug.value) : picked.value
})

const missing = computed(() =>
  corpus.value !== null && shownSlug.value !== null && shown.value === null)

const matches = computed(() => corpus.value
  ? matching(corpus.value, { query: query.value, tags: [...chosen.value], runnableOnly: true })
  : [])

// --- the shown task's source -------------------------------------------------------------------

// Each part's source and its syntax colour, in the shape <GhulExample> takes: the same fields the
// build writes into an example artifact, minus the hovers and diagnostics only a compile produces
// and the recorded output `run-to-see` would hide anyway.
const parts = shallowRef([])
const partsFailure = ref(null)

async function text(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) })

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)

  return response.text()
}

async function part(entry) {
  const code = (await text(entry.source)).replace(/\n+$/, '')

  return {
    ...entry,
    data: {
      name: entry.name,
      code,
      fullSource: code,
      tokens: await tokenise(code),
      output: '',
      images: [],
      hovers: [],
      diagnostics: [],
      playground: entry.playground,
      playgroundPath: entry.id,
    },
    // Only where it will not run: one line saying what it needs that a browser cannot give it.
    reason: entry.playground ? null : await text(entry.unsupported).then(
      line => line.trim(), () => null),
  }
}

// The playground's own page for a part, which runs the program on arrival and carries the editor,
// the output pane and the pictures a drawing produces. The task page frames that page rather than
// rebuilding any of it, so there is one playground and it is the one a reader reaches by any other
// route too. Same origin as the site, which is what lets the page be framed at all.
// `panel` tells the playground it is on a page that already names the task and offers the others,
// so it leaves out the links that would say so again.
const playgroundUrl = entry => `${PLAYGROUND_BASE}rosetta-code/${entry.id}?panel`

// The one part that runs on arrival. Framing every part would start a run per part against a
// service that admits six at once, so the first runnable part is framed and the rest are links to
// their own pages, where each runs when it is opened.
const framed = computed(() => parts.value.find(entry => entry.playground) ?? null)

// As tall as the window has room for below the frame's top, so that the whole playground is on
// the screen on arrival rather than its output pane below the fold; never shorter than an editor
// is worth, never taller than a program's output needs. Measured, because what sits above the
// frame - the site's header, the task's title, its tags - is not a fixed height.
const frameHeight = ref('clamp(28rem, calc(100vh - 14rem), 60rem)')

function sizeFrame() {
  const frame = root.value?.querySelector('.rosetta-playground')

  if (!frame) return

  const top = frame.getBoundingClientRect().top + window.scrollY

  frameHeight.value = `clamp(28rem, calc(100vh - ${Math.round(top) + 24}px), 60rem)`
}

watch(framed, () => nextTick(sizeFrame))

// The section's own introduction sits above the explorer, in the page's markdown, and it is what a
// reader arriving at the section reads first. A reader arriving at a task's address came for the
// task, and on a phone that introduction is what puts it below the fold - so it stands down for an
// arrival at a task, and comes back on returning to the section. Decided once, on arrival: the
// explorer writes its random pick into the address soon after, and the address alone stops saying
// which of the two this was.
const arrivedAtTask = ref(false)
const root = ref(null)

function introduction() {
  const items = []

  for (let node = root.value?.parentElement?.firstElementChild; node && node !== root.value;
       node = node.nextElementSibling) {
    items.push(node)
  }

  return items
}

watch(shownSlug, slug => {
  if (!arrivedAtTask.value) return

  for (const node of introduction()) node.style.display = slug ? 'none' : ''
})

// The task whose parts `parts` holds, so a fetch that finishes after the reader has moved on is
// dropped rather than shown under the wrong heading.
let loading = null

watch(shown, async task => {
  loading = task?.slug ?? null
  parts.value = []
  partsFailure.value = null

  if (!task) return

  try {
    const loaded = await Promise.all(task.parts.map(part))

    if (loading === task.slug) parts.value = loaded
  } catch (error) {
    if (loading === task.slug) partsFailure.value = error.message
  }
}, { immediate: true })

// Each task used to be a page, and a page was counted. They are shown in place now, so the count
// is made here or the section reads as one visit however many tasks somebody works through.
watch([() => shownSlug.value, shown], ([slug, task], previous) => {
  if (!slug) return

  document.title = `${task?.title ?? 'Rosetta Code'} | ghūl programming language`

  if (slug !== previous?.[0]) {
    window.goatcounter?.count?.()

    // The task as well as the pageview: every task answers from this one page,
    // and the slug is the only thing that says which one a reader was shown.
    if (slug) countEvent(`rosetta-open/${slug}`, 'rosetta task opened')
  }
}, { immediate: true })

// --- choosing ----------------------------------------------------------------------------------

// `keep` is false for the draw the page makes on its own: the reader did not ask to be here, so
// it is not a place for the back button to return to.
function another(keep = true) {
  const next = draw(matches.value, shown.value?.slug)

  if (!next) return

  picked.value = next

  // The address names the task, whether it was chosen or drawn: what is on the page is what a
  // reader can link to.
  showAt(addressOf({ slug: next.slug }), keep)
}

function show(task) {
  showAt(addressOf({ slug: task.slug }))
}

// Two or three tasks sharing a tag with this one, so somebody who liked what they just watched has
// somewhere to go that is not the list of nine hundred. Runnable only: an onward path to something
// that cannot run here would undo the point of offering it.
const alike = computed(() => {
  const task = shown.value

  if (!task || !corpus.value) return []

  const tags = new Set(task.tags ?? [])

  return corpus.value.tasks
    .filter(other => other.slug !== task.slug
      && other.playground
      && (other.tags ?? []).some(tag => tags.has(tag)))
    .sort((a, b) =>
      (b.tags ?? []).filter(tag => tags.has(tag)).length - (a.tags ?? []).filter(tag => tags.has(tag)).length
      || (b.interest ?? 0) - (a.interest ?? 0)
      || a.title.localeCompare(b.title))
    .slice(0, 3)
})

// The onward controls are counted apart from the list's, because where a reader was when they took
// one is the thing worth knowing: they sit under the result, where somebody who has just watched a
// program run is looking.
function showOnward(task) {
  countEvent(`rosetta-more/tag/${alike.value.findIndex(other => other.slug === task.slug)}`,
    'onward to a like task')

  show(task)
}

function anotherOnward() {
  countEvent('rosetta-more/another/0', 'onward to another task')

  another()
}

onMounted(() => window.addEventListener('resize', sizeFrame))
onBeforeUnmount(() => window.removeEventListener('resize', sizeFrame))

onMounted(async () => {
  arrivedAtTask.value = shownSlug.value !== null

  if (arrivedAtTask.value) {
    for (const node of introduction()) node.style.display = 'none'
  }

  // The address of a task reached from outside was handed to the router as the section's, so that
  // it had a page to load. Put it back, now that there is an explorer to show the task.
  if (shownSlug.value) replaceAt(addressOf({ slug: shownSlug.value }))

  const filter = filterFromSearch(shownFilter.value || location.search)

  query.value = filter.query
  chosen.value = new Set(filter.tags)

  try {
    corpus.value = await loadCorpus()
  } catch (error) {
    failure.value = error.message

    return
  }

  // A random pick differs between the prerender and the reader's browser, so it is made only once
  // the page is live - and only where the address does not already name a task.
  if (!shownSlug.value) another(false)
})

// Narrowing the filter to something the shown task is not part of picks a new one; widening it
// leaves the reader looking at what they were looking at. A task reached by its own address stays
// put: they asked for that one.
watch(matches, tasks => {
  if (shownSlug.value) return
  if (picked.value && !tasks.some(task => task.slug === picked.value.slug)) another(false)
})

// The filter is part of the address while the section itself is shown, so a search or a set of
// tags is a link. Replaced rather than pushed: typing a word is not a place to go back to.
watch([query, chosen], () => {
  if (shownSlug.value) return

  replaceAt(addressOf({ query: query.value, tags: [...chosen.value] }))
})

// Following a link back to the section restores the filter that link carried.
watch(shownFilter, search => {
  if (shownSlug.value) return

  const filter = filterFromSearch(search)

  if (filter.query !== query.value) query.value = filter.query

  if (filter.tags.join(',') !== [...chosen.value].sort().join(',')) {
    chosen.value = new Set(filter.tags)
  }
})
</script>

<template>
  <div ref="root" class="rosetta-explorer">
    <p v-if="failure" class="rosetta-failure">
      The solutions are read from
      <a href="https://github.com/degory/ghul-rosetta-code" target="_blank" rel="noreferrer">
        ghul-rosetta-code</a>
      when this page opens, and that did not answer ({{ failure }}). Reloading is worth a try.
    </p>

    <p v-else-if="!corpus" class="rosetta-loading">reading the solutions ...</p>

    <template v-else>
      <p v-if="missing" class="rosetta-failure">
        There is no task called <code>{{ shownSlug }}</code>. Here is everything there is.
      </p>

      <section v-if="shown" class="rosetta-featured">
        <header>
          <h2 :id="shown.slug">{{ shown.title }}</h2>

          <a class="rosetta-wiki" :href="shown.url" target="_blank" rel="noreferrer">on Rosetta Code</a>
        </header>

        <p class="rosetta-featured-tags">
          <button
            v-for="tag in shown.tags"
            :key="tag"
            type="button"
            class="rosetta-tag"
            :class="{ 'is-chosen': chosen.has(tag) }"
            :title="corpus.tags[tag]"
            @click="toggleTag(tag)"
          >{{ tag }}</button>
        </p>

        <p v-if="partsFailure" class="rosetta-failure">
          The solution itself did not load ({{ partsFailure }}).
        </p>

        <p v-else-if="parts.length === 0" class="rosetta-loading">reading the solution ...</p>

        <template v-for="entry in parts" :key="entry.name">
          <h3 v-if="entry.heading">{{ entry.heading }}</h3>

          <p v-if="entry.reason" class="rosetta-unsupported">{{ entry.reason }}</p>

          <!-- The playground itself, as a panel on the page. The one that runs on arrival is
               framed; a further way of solving the task is a link to its own page. A part that
               cannot run in a browser is shown as it is recorded. -->
          <iframe
            v-if="entry === framed"
            class="rosetta-playground"
            :src="playgroundUrl(entry)"
            :title="`${shown.title} in the playground`"
            :style="{ height: frameHeight }"
            loading="eager"
            allow="clipboard-write"
          ></iframe>

          <p v-else-if="entry.playground" class="rosetta-part-link">
            <a :href="playgroundUrl(entry)">run this one in the playground</a>
          </p>

          <GhulExample v-else :name="entry.name" :data="entry.data" />
        </template>

        <!-- Under the result, where somebody who has just watched a program run is looking - on a
             screen without an aside. On a wide one the same paths sit beside the playground. -->
        <RosettaOnward
          class="rosetta-inline"
          :alike="alike"
          @another="anotherOnward"
          @show="showOnward"
        />
      </section>

      <!-- The same controls and list the aside shows on a wide screen, for a screen without one. -->
      <RosettaControls class="rosetta-inline" />

      <RosettaList class="rosetta-inline" :matches="matches" :current="shown?.slug" @show="show" />

      <!-- Beside the playground on a wide screen, where the column is the one place a reader can
           see without scrolling past a panel as tall as the window: where to go next first, then
           the filter, with the tasks it leaves listed under it and scrolling within the column. -->
      <Teleport v-if="shown" defer to="#rosetta-aside">
        <RosettaOnward
          stacked
          :alike="alike"
          @another="anotherOnward"
          @show="showOnward"
        />

        <RosettaControls stacked />

        <RosettaList stacked :matches="matches" :current="shown?.slug" @show="show" />
      </Teleport>
    </template>
  </div>
</template>
<style scoped>
.rosetta-loading,
.rosetta-failure {
  margin: 1.5rem 0;
  color: var(--vp-c-text-2);
}

/* Why a solution is here to read rather than run, in the words written beside it. */
.rosetta-unsupported {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

/* The aside shows at 1280px and up (the site's own breakpoint), and carries these from there. */
@media (min-width: 1280px) {
  .rosetta-inline {
    display: none;
  }
}

.rosetta-featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.rosetta-tag {
  padding: 0.1rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.5;
}

.rosetta-tag span {
  color: var(--vp-c-text-3);
}

.rosetta-tag:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.rosetta-tag.is-chosen {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.rosetta-featured {
  margin-top: 1rem;
  /* Clear of the site's fixed header when a task picked from the list is scrolled to. */
  scroll-margin-top: calc(var(--vp-nav-height) + 1rem);
}

.rosetta-featured header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.rosetta-featured h2 {
  flex: 1;
  margin: 0;
  padding: 0;
  border: none;
}

.rosetta-wiki {
  font-size: 0.85rem;
  font-weight: 400;
  white-space: nowrap;
}

.rosetta-featured-tags {
  margin: 0.5rem 0 1rem;
}

/* The playground fills whatever it is given, so the frame decides the panel: tall enough to hold
   an editor over its output pane, bounded by the viewport so the whole of it is on the first
   screen, and never so tall that a wide window turns it into a wall. */
.rosetta-playground {
  display: block;
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.rosetta-part-link {
  margin: 0.5rem 0 1rem;
}

</style>
