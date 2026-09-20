<script setup>
import { ref, computed, shallowRef, watch, onMounted } from 'vue'
import GhulExample from './GhulExample.vue'
import { countEvent } from '../events'
import { tokenise } from '../rosetta-highlight'
import { shownSlug, shownFilter, showAt, replaceAt } from '../rosetta-route'
import {
  loadCorpus, taskBySlug, matching, tagCounts, draw, addressOf, filterFromSearch,
} from '../rosetta-corpus'

// The whole Rosetta Code section: one task shown whole and ready to run, with the corpus
// searchable and filterable beneath it. The task is whichever /rosetta/<slug> the reader arrived
// at, or one picked at random and weighted towards the ones worth a stranger's time.
//
// Nothing here is copied into the site. The corpus is read from ghul-rosetta-code when the page
// opens and each solution's source when its task is shown, so a task solved there this morning is
// here this morning, and the site stops growing a page per task. What that costs is a section that
// needs GitHub to be reachable, which is what the failure state below is for.

const corpus = shallowRef(null)
const failure = ref(null)

const query = ref('')
const chosen = ref(new Set())
const runnableOnly = ref(true)

// A task shown by address rather than picked: the reader followed a link, or chose one from the
// list. Held apart from `picked` so that going back to the section restores the random pick.
const picked = shallowRef(null)

const shown = computed(() => {
  if (!corpus.value) return null

  return shownSlug.value ? taskBySlug(corpus.value, shownSlug.value) : picked.value
})

const missing = computed(() =>
  corpus.value !== null && shownSlug.value !== null && shown.value === null)

const tags = computed(() => corpus.value ? tagCounts(corpus.value) : [])

const matches = computed(() => corpus.value
  ? matching(corpus.value, { query: query.value, tags: [...chosen.value], runnableOnly: runnableOnly.value })
  : [])

function toggleTag(tag) {
  const next = new Set(chosen.value)

  if (!next.delete(tag)) next.add(tag)

  chosen.value = next
}

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

onMounted(async () => {
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
  <div class="rosetta-explorer">
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

          <button type="button" class="rosetta-another" @click="another">another</button>
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

          <GhulExample :name="entry.name" :data="entry.data" run-to-see />
        </template>
      </section>

      <div class="rosetta-controls">
        <input
          v-model="query"
          class="rosetta-filter"
          type="search"
          placeholder="search by name or tag"
          aria-label="search tasks by name or tag"
        />

        <label class="rosetta-runnable">
          <input v-model="runnableOnly" type="checkbox" />
          runs in the browser
        </label>
      </div>

      <div class="rosetta-tags" role="group" aria-label="filter by tag">
        <button
          v-for="[tag, count] in tags"
          :key="tag"
          type="button"
          class="rosetta-tag"
          :class="{ 'is-chosen': chosen.has(tag) }"
          :aria-pressed="chosen.has(tag)"
          :title="corpus.tags[tag]"
          @click="toggleTag(tag)"
        >{{ tag }} <span>{{ count }}</span></button>
      </div>

      <p class="rosetta-count">
        {{ matches.length }} {{ matches.length === 1 ? 'task' : 'tasks' }}
      </p>

      <ul class="rosetta-list">
        <li v-for="task in matches" :key="task.slug">
          <a
            :href="`/rosetta/${task.slug}`"
            :class="{ 'is-current': task.slug === shown?.slug }"
            @click.prevent="show(task)"
          >{{ task.title }}</a>
          <span v-if="task.images" class="rosetta-mark" title="draws a picture">image</span>
          <span v-if="task.input" class="rosetta-mark" title="reads what you type">input</span>
          <span v-if="task.parts.length > 1" class="rosetta-mark">{{ task.parts.length }} ways</span>
        </li>
      </ul>
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

.rosetta-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0 0.75rem;
}

.rosetta-filter {
  flex: 1;
  min-width: 12rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 1rem;
}

.rosetta-filter:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.rosetta-runnable {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.rosetta-tags,
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

.rosetta-another {
  padding: 0.25rem 0.9rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  color: var(--vp-c-brand-1);
  font-size: 0.9rem;
}

.rosetta-another:hover {
  background: var(--vp-c-brand-soft);
}

.rosetta-featured-tags {
  margin: 0.5rem 0 1rem;
}

.rosetta-count {
  margin: 2rem 0 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.rosetta-list {
  columns: 2 16rem;
  column-gap: 2rem;
  padding-left: 0;
  list-style: none;
}

.rosetta-list li {
  margin: 0;
  padding: 0.15rem 0;
  break-inside: avoid;
}

/* A long list of bold links is a wall; these read as a list of names. */
.rosetta-list a {
  font-weight: 400;
  text-decoration: none;
}

.rosetta-list a.is-current {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.rosetta-list a:hover {
  text-decoration: underline;
}

.rosetta-mark {
  margin-left: 0.4rem;
  color: var(--vp-c-text-3);
  font-size: 0.75rem;
}
</style>
