<script setup>
// The preamble every Rosetta Code task page carries: its tags, whether it runs here, and where the
// same solution is posted. One component rather than the same sentences copied onto every page,
// so the wording is changed in one place however many tasks there are.
defineProps({
  url: { type: String, required: true },
  tags: { type: String, default: '' },
  playground: { type: Boolean, default: true },
})
</script>

<template>
  <div class="rosetta-task">
    <p>
      <template v-if="playground">
        Click the pencil to change this and run it in your browser.
      </template>
      <template v-else>
        This one needs something a browser cannot give it, so it is here to read rather than run.
      </template>
      The same solution is posted on
      <a :href="url" target="_blank" rel="noreferrer">Rosetta Code</a>.
    </p>

    <p class="rosetta-task-tags">
      <span v-for="tag in tags.split(',').filter(t => t)" :key="tag">{{ tag }}</span>
      <a href="/rosetta/">all tasks</a>
    </p>
  </div>
</template>

<style scoped>
.rosetta-task-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
}

.rosetta-task-tags span {
  padding: 0.1rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.rosetta-task-tags a {
  margin-left: 0.5rem;
}
</style>
