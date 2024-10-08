<script setup lang="ts">
import { ref, computed } from "vue"
import { useQuery } from "@tanstack/vue-query"

const search = ref("")

const { isFetching, data } = useQuery({
  queryKey: ["images"],
  queryFn: () => useFetch(`/search/photos?query=${search.value || "african"}`)
})

import BaseInput from "@/components/BaseInput.vue"
import GridDisplay from "@/components/GridDisplay.vue"
import SkeletonLoader from "@/components/SkeletonLoader.vue"
import ImageItem from "@/components/ImageItem.vue"
import useFetch from "@/composables/useFetch"

const images = computed(() => {
  if (data.value.results) {
    return data.value.results.map((result) => {
      return {
        imageUrl: result.urls.full,
        author: result?.user?.name ?? "",
        location: result?.user?.location ?? "🌍"
      }
    })
  }
  return []
})
</script>

<template>
  <main class="homepage">
    <div class="homepage__container">
      <BaseInput v-model="search" />

      <div class="homepage__content">
        <GridDisplay>
          <template v-if="isFetching">
            <SkeletonLoader v-for="count in 8" :key="count" />
          </template>
          <template v-else-if="!isFetching && data.results.length">
            <ImageItem v-for="image in images" :key="image.id" :image="image" />
          </template>
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
