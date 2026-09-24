<script setup>
// Where to go from the task just shown: two or three like it, and a random other. Under the result
// on a narrow screen, beside it on a wide one.
defineProps({
  alike: { type: Array, default: () => [] },
  stacked: { type: Boolean, default: false },
})

defineEmits(['another', 'show'])
</script>

<template>
  <nav class="rosetta-onward" :class="{ 'is-stacked': stacked }">
    <template v-if="alike.length">
      <span class="rosetta-onward-label">more like this</span>

      <a
        v-for="task in alike"
        :key="task.slug"
        :href="`/rosetta/${task.slug}`"
        @click.prevent="$emit('show', task)"
      >{{ task.title }}</a>
    </template>

    <a
      href="/rosetta/"
      class="rosetta-another"
      aria-label="show a randomly chosen task"
      title="show a randomly chosen task"
      @click.prevent="$emit('another')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
      <span>another</span>
    </a>
  </nav>
</template>

<style scoped>
/* One row that wraps rather than a grid: there are never more than five things in it, and on a
   phone they stack without a breakpoint to say so. */
.rosetta-onward {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
  margin: 1rem 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.875rem;
}

.is-stacked {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  margin: 0 0 1.25rem;
  padding-top: 0;
  border-top: none;
}

.rosetta-onward-label {
  color: var(--vp-c-text-2);
}

.is-stacked .rosetta-onward-label {
  margin-top: 0.5rem;
}

.rosetta-another {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.is-stacked .rosetta-another {
  margin-top: 0.5rem;
}

.rosetta-another svg {
  width: 1.05em;
  height: 1.05em;
  flex: none;
}
</style>
