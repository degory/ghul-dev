<script setup>
// The tasks the filter leaves, with what each one does that a title cannot say.
defineProps({
  matches: { type: Array, default: () => [] },
  current: { type: String, default: null },
  stacked: { type: Boolean, default: false },
})

defineEmits(['show'])
</script>

<template>
  <div class="rosetta-results" :class="{ 'is-stacked': stacked }">
    <p class="rosetta-count">
      {{ matches.length }} {{ matches.length === 1 ? 'task' : 'tasks' }}
    </p>

    <ul class="rosetta-list">
      <li v-for="task in matches" :key="task.slug">
        <a
          :href="`/rosetta/${task.slug}`"
          :class="{ 'is-current': task.slug === current }"
          @click.prevent="$emit('show', task)"
        >{{ task.title }}</a>
        <span v-if="task.images" class="rosetta-mark" title="draws a picture">image</span>
        <span v-if="task.input" class="rosetta-mark" title="reads what you type">input</span>
        <span v-if="task.parts.length > 1" class="rosetta-mark">{{ task.parts.length }} ways</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.rosetta-count {
  margin: 2rem 0 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.is-stacked .rosetta-count {
  margin: 1rem 0 0.25rem;
  font-size: 0.8rem;
}

.rosetta-list {
  columns: 2 16rem;
  column-gap: 2rem;
  padding-left: 0;
  list-style: none;
}

.is-stacked .rosetta-list {
  columns: 1;
  font-size: 0.85rem;
  line-height: 1.5;
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
