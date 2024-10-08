<script setup lang="ts">
import { ref } from "vue"

import BaseInput from "@/components/BaseInput.vue"
import GridDisplay from "@/components/GridDisplay.vue"
import SkeletonLoader from "@/components/SkeletonLoader.vue"

const search = ref("")
</script>

<template>
  <main class="homepage">
    <div class="homepage__container">
      <BaseInput v-model="search" />

      <div class="homepage__content">
        <GridDisplay>
          <SkeletonLoader v-for="count in 8" :key="count" />
        </GridDisplay>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.homepage {
  padding: 120px 24px;

  &__container {
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 8rem;
  }

  &__content {
    width: 100%;
    max-width: 932px;
    margin: 0 auto;
  }
}
</style>
