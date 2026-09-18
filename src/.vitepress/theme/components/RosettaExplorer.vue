<script setup>
import { ref, computed, shallowRef, watch, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import corpus from '../../rosetta-tasks.json'
import GhulExample from './GhulExample.vue'

// The way into the Rosetta Code section: one task shown whole and ready to run, picked at random
// and weighted towards the ones worth a stranger's time, with the whole corpus searchable and
// filterable beneath it. The corpus is several hundred tasks and grows, so nothing here is a
// hand-made list - the tags and the interest score come from ghul-rosetta-code with the tasks.

// Each part's data is its own chunk, fetched when the part is shown, so the page does not carry
// every solution's source.
// On a task's own page the task is already there above, so the explorer only browses: the same
// search, tags and list, with every choice leading to another task's page. `current` names the
// page's task, so another never lands on it and the list can mark it.
const props = defineProps({
  current: { type: String, default: null },
})

const router = useRouter()

const artifacts = import.meta.glob('../../example-data/rosetta-*.json', { import: 'default' })

const load = name => artifacts[`../../example-data/${name}.json`]()

const query = ref('')
const chosen = ref(new Set())
const runnableOnly = ref(true)

// Only the tags in use, most used first: a chip that matches nothing is noise.
const tagCounts = computed(() => {
  const counts = new Map()

  for (const task of corpus.tasks) {
    for (const tag of task.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])
})

function toggleTag(tag) {
  const next = new Set(chosen.value)

  if (!next.delete(tag)) next.add(tag)

  chosen.value = next
}

const matching = computed(() => {
  const wanted = query.value.trim().toLowerCase().split(/\s+/).filter(w => w !== '')

  return corpus.tasks.filter(task => {
    if (runnableOnly.value && !task.playground) return false

    for (const tag of chosen.value) {
      if (!task.tags.includes(tag)) return false
    }

    const text = `${task.title} ${task.tags.join(' ')}`.toLowerCase()

    return wanted.every(word => text.includes(word))
  })
})

// Interest squared: a 5 is drawn twenty-five times as often as a 1, without a 1 being impossible.
function draw(tasks, except) {
  const pool = tasks.length > 1 ? tasks.filter(task => task.slug !== except) : tasks

  if (pool.length === 0) return null

  const total = pool.reduce((sum, task) => sum + task.interest ** 2, 0)

  let at = Math.random() * total

  for (const task of pool) {
    at -= task.interest ** 2

    if (at <= 0) return task
  }

  return pool[pool.length - 1]
}

const featured = ref(null)
const featuredParts = shallowRef([])

async function feature(task) {
  featured.value = task

  featuredParts.value = task
    ? await Promise.all(task.parts.map(async part => ({ ...part, data: await load(part.name) })))
    : []
}

function another() {
  if (props.current) {
    const next = draw(matching.value, props.current)

    if (next) router.go(`/rosetta/${next.slug}`)

    return
  }

  feature(draw(matching.value, featured.value?.slug))
}

// A random pick differs between the prerender and the reader's browser, so it is made only once
// the page is live.
onMounted(() => { if (!props.current) another() })

// Narrowing the filter to something the featured task is not part of picks a new one; widening
// it leaves the reader looking at what they were looking at.
watch(matching, tasks => {
  // By name: what is featured is held reactively, so it is never the same object as its entry here.
  if (featured.value && !tasks.some(task => task.slug === featured.value.slug)) another()
})
</script>

<template>
  <div class="rosetta-explorer">
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

      <button v-if="current" type="button" class="rosetta-another" @click="another">another</button>
    </div>

    <div class="rosetta-tags" role="group" aria-label="filter by tag">
      <button
        v-for="[tag, count] in tagCounts"
        :key="tag"
        type="button"
        class="rosetta-tag"
        :class="{ 'is-chosen': chosen.has(tag) }"
        :aria-pressed="chosen.has(tag)"
        :title="corpus.tags[tag]"
        @click="toggleTag(tag)"
      >{{ tag }} <span>{{ count }}</span></button>
    </div>

    <section v-if="featured" class="rosetta-featured">
      <header>
        <h2 :id="featured.slug">{{ featured.title }}</h2>

        <a class="rosetta-wiki" :href="featured.url" target="_blank" rel="noreferrer">on Rosetta Code</a>

        <button type="button" class="rosetta-another" @click="another">another</button>
      </header>

      <p class="rosetta-featured-tags">
        <button
          v-for="tag in featured.tags"
          :key="tag"
          type="button"
          class="rosetta-tag"
          :class="{ 'is-chosen': chosen.has(tag) }"
          @click="toggleTag(tag)"
        >{{ tag }}</button>
      </p>

      <template v-for="part in featuredParts" :key="part.name">
        <h3 v-if="part.heading">{{ part.heading }}</h3>

        <GhulExample :name="part.name" :data="part.data" run-to-see />
      </template>
    </section>

    <p class="rosetta-count">
      {{ matching.length }} {{ matching.length === 1 ? 'task' : 'tasks' }}
    </p>

    <ul class="rosetta-list">
      <li v-for="task in matching" :key="task.slug">
        <a :href="`/rosetta/${task.slug}`" :class="{ 'is-current': task.slug === current }">{{ task.title }}</a>
        <span v-if="task.images" class="rosetta-mark" title="draws a picture">image</span>
        <span v-if="task.input" class="rosetta-mark" title="reads what you type">input</span>
        <span v-if="task.parts.length > 1" class="rosetta-mark">{{ task.parts.length }} ways</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
  margin-top: 2rem;
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
