<script setup>
// The preamble every Rosetta Code task page carries: that the example runs here, and where the
// same solution is posted. One component rather than the same two sentences copied onto every
// page, so the wording is changed in one place however many tasks there are.
defineProps({
  url: { type: String, required: true },
})
</script>

<template>
  <div class="tip custom-block rosetta-task">
    <p class="custom-block-title">editable example</p>
    <p>
      Click the pencil to open this in an editor, change it, and run it in your browser.
      The same solution is posted on <a :href="url" target="_blank" rel="noreferrer">Rosetta Code</a>.
    </p>
  </div>
</template>

<style scoped>
.rosetta-task p:last-child {
  margin-bottom: 0;
}
</style>
