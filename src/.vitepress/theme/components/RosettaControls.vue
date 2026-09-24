<script setup>
// The search box, the browser-only switch and the tag chips: the whole of the filter, drawn
// wherever there is room for it. `stacked` is the page's aside, a narrow column where the parts
// go one under another.
import { ref, computed } from 'vue'
import { corpus, query, chosen, runnableOnly, tags, toggleTag } from '../rosetta-filter'

const props = defineProps({ stacked: { type: Boolean, default: false } })

// In the narrow column the whole vocabulary would push the results out of sight, so it shows the
// dozen most used - and any chosen one, so the chip that narrowed the list can un-narrow it - with
// the rest a click away.
const FEW = 12
const allTags = ref(false)

const shownTags = computed(() => {
  if (!props.stacked || allTags.value) return tags.value

  return tags.value.filter(([tag], at) => at < FEW || chosen.value.has(tag))
})

const hiddenTags = computed(() => tags.value.length - shownTags.value.length)
</script>

<template>
  <div class="rosetta-filter-controls" :class="{ 'is-stacked': stacked }">
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
        v-for="[tag, count] in shownTags"
        :key="tag"
        type="button"
        class="rosetta-tag"
        :class="{ 'is-chosen': chosen.has(tag) }"
        :aria-pressed="chosen.has(tag)"
        :title="corpus?.tags[tag]"
        @click="toggleTag(tag)"
      >{{ tag }} <span>{{ count }}</span></button>

      <button v-if="hiddenTags > 0" type="button" class="rosetta-more-tags" @click="allTags = true">
        {{ hiddenTags }} more tags
      </button>
      <button v-else-if="stacked && allTags" type="button" class="rosetta-more-tags" @click="allTags = false">
        fewer tags
      </button>
    </div>
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

.is-stacked .rosetta-controls {
  flex-direction: column;
  align-items: stretch;
  margin: 0 0 0.75rem;
  gap: 0.5rem;
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

.is-stacked .rosetta-filter {
  min-width: 0;
  width: 100%;
  font-size: 0.9rem;
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

.rosetta-tags {
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

.is-stacked .rosetta-tag {
  font-size: 0.75rem;
  padding: 0.05rem 0.5rem;
}

.rosetta-more-tags {
  padding: 0.1rem 0.4rem;
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
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
</style>
