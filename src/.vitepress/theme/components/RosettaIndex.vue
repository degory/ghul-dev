<script setup>
import { ref, computed } from 'vue'
import groups from '../../rosetta-tasks.json'

// The contents for the Rosetta Code section. The corpus grows without limit, so this is what the
// section is navigated by rather than a sidebar holding every task: a handful of groups, and a
// filter for the reader who knows what they are looking for. The sidebar carries one entry.
//
// Filtering matches the task's name and its group's, so "sort" finds Quicksort and typing a
// group's name shows that group whole.
const filter = ref('')

const matching = computed(() => {
  const wanted = filter.value.trim().toLowerCase()

  if (wanted === '') {
    return groups
  }

  return groups
    .map(group => ({
      ...group,
      tasks: group.title.toLowerCase().includes(wanted)
        ? group.tasks
        : group.tasks.filter(task => task.title.toLowerCase().includes(wanted)),
    }))
    .filter(group => group.tasks.length > 0)
})

const total = computed(() =>
  matching.value.reduce((n, group) => n + group.tasks.length, 0)
)
</script>

<template>
  <div class="rosetta-index">
    <input
      v-model="filter"
      class="rosetta-filter"
      type="search"
      placeholder="filter by name"
      aria-label="filter tasks by name"
    />

    <p v-if="filter.trim() !== ''" class="rosetta-count">
      {{ total }} {{ total === 1 ? 'task' : 'tasks' }}
    </p>

    <section v-for="group in matching" :key="group.title" class="rosetta-group">
      <h2 :id="group.title.replace(/ /g, '-')">{{ group.title }}</h2>

      <p class="rosetta-blurb">{{ group.blurb }}</p>

      <ul>
        <li v-for="task in group.tasks" :key="task.slug">
          <a :href="`/rosetta/${task.slug}`">{{ task.title }}</a>
          <span v-if="task.parts.length > 1" class="rosetta-parts">
            {{ task.parts.length }} ways
          </span>
        </li>
      </ul>
    </section>

    <p v-if="matching.length === 0" class="rosetta-count">nothing matches that.</p>
  </div>
</template>

<style scoped>
.rosetta-filter {
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.rosetta-filter:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.rosetta-group h2 {
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.rosetta-blurb {
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.rosetta-count {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.rosetta-parts {
  color: var(--vp-c-text-3);
  font-size: 0.85em;
  margin-left: 0.5rem;
}
</style>
