<script setup>
// VSCode-style severity icon: a red crossed circle for an error, a
// yellow warning triangle for a warning. Sized in em so it tracks the
// surrounding text.
defineProps({
  severity: { type: String, required: true }
})
</script>

<template>
  <span
    class="ghul-diagnostic-icon"
    :class="'ghul-diagnostic-icon-' + severity"
  >
    <svg v-if="severity === 'error'" viewBox="0 0 16 16" aria-label="error">
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8"
        stroke="#fff" stroke-width="1.7" stroke-linecap="round"
      />
    </svg>
    <svg v-else viewBox="0 0 16 16" aria-label="warning">
      <path d="M8 1.7L15.2 14.3H0.8Z" fill="currentColor" />
      <path
        d="M8 5.7v3.8"
        stroke="#1a1a1a" stroke-width="1.7" stroke-linecap="round"
      />
      <circle cx="8" cy="11.8" r="1" fill="#1a1a1a" />
    </svg>
  </span>
</template>

<style scoped>
.ghul-diagnostic-icon {
  display: inline-flex;
  flex: none;
}

.ghul-diagnostic-icon svg {
  width: 1.2em;
  height: 1.2em;
}

.ghul-diagnostic-icon-error {
  color: var(--vp-c-danger-1);
}

.ghul-diagnostic-icon-warning {
  color: var(--vp-c-warning-1);
}
</style>
