<script setup lang="ts"></script>

<template>
  <div class="grid-display">
    <slot />
  </div>
</template>

<style scoped>
.grid-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2rem 4.8rem;
  width: 100%;
}
</style>
