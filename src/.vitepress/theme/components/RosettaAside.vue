<script setup>
// Where the Rosetta Code explorer puts its onward paths and its filter on a wide screen: the
// page's aside, where other pages keep their outline. The section has no outline - every task
// answers from the one page - and beside a playground as tall as the window the column is the
// one place a reader can see without scrolling. The explorer teleports into this; it stays empty
// on every other page.
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const here = computed(() => route.path.startsWith('/rosetta'))
</script>

<template>
  <div v-if="here" id="rosetta-aside" class="rosetta-aside"></div>
</template>

<style>
.rosetta-aside {
  padding-bottom: 2rem;
}

.rosetta-aside-title {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}
</style>
