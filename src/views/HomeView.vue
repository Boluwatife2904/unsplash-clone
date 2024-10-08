<script setup lang="ts">
import { computed, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useQuery } from "@tanstack/vue-query"
import useFetch from "@/composables/useFetch"
import type { UnSplashResponse } from "@/types"

const route = useRoute()
const router = useRouter()

const query = computed(() => route?.query?.query ?? "")
const queryKey = computed(() => ["images", query.value])

const { isFetching, data, isSuccess } = useQuery<UnSplashResponse>({
  queryKey,
  queryFn: () => useFetch(`/search/photos?query=${query.value || "african"}`)
})

import BaseInput from "@/components/BaseInput.vue"
import GridDisplay from "@/components/GridDisplay.vue"
import SkeletonLoader from "@/components/SkeletonLoader.vue"
import ImageItem from "@/components/ImageItem.vue"

const images = computed(() => {
  if (isSuccess && data.value && data.value.results) {
    return data.value.results.map((result) => {
      return {
        id: result.id,
        imageUrl: result.urls.full,
        author: result?.user?.name ?? "",
        location: result?.user?.location ?? "🌍"
      }
    })
  }
  return []
})

const searchForKeyword = async (event: KeyboardEvent) => {
  const query = (event.target as HTMLInputElement).value
  router.push({ query: { query } })
  await nextTick()
}
</script>

<template>
  <main class="homepage">
    <div class="homepage__container">
      <h6 v-if="!!query" class="homepage__title">
        {{ isFetching ? "Searching" : "Search Results" }}
        for
        <span class="homepage__title--highlighted">"{{ query }}"</span>
      </h6>
      <BaseInput v-else :model-value="String(query)" @keypress.enter="searchForKeyword" />

      <div class="homepage__content">
        <GridDisplay>
          <template v-if="isFetching">
            <SkeletonLoader v-for="count in 8" :key="count" />
          </template>
          <template v-else-if="!isFetching && images.length">
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

  &__title {
    @include typography(1.8rem, 2.4rem, 2.4rem, 3.2rem, 3.2rem, 4.8rem);
    color: #2b3954;

    &--highlighted {
      color: #7d8ea0;
    }
  }
}
</style>
