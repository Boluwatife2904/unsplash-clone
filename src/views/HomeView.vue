<script setup lang="ts">
import { ref } from "vue"

import BaseInput from "@/components/BaseInput.vue"
const search = ref("")
</script>

<template>
  <main class="homepage">
    <div class="homepage__container">
      <BaseInput v-model="search" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.homepage {
  padding: 120px 24px;

  &__container {
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
