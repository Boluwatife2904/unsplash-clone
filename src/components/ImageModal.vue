<script setup lang="ts">
import type { IImage } from "@/types"
import IconClose from "./icons/IconClose.vue"
import { watch, watchEffect } from "vue"

interface Props {
  show?: boolean
  image: IImage
}
interface Emits {
  (event: "close"): void
}
const props = defineProps<Props>()
defineEmits<Emits>()

watch(
  () => props.show,
  () => {
    document.body.classList.toggle("overflow-hidden")
  }
)
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="modal">
      <div class="modal__body">
        <button class="modal__close" @click="$emit('close')">
          <IconClose />
        </button>
        <figure class="image">
          <img :src="image.imageUrl" :alt="image?.author ?? ''" class="image__source" />
          <figcaption>
            <div class="image__caption">
              <h6 class="image__author">{{ image?.author ?? "" }}</h6>
              <p class="image__location">{{ image?.location ?? "" }}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  height: 100dvh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  padding: 5rem 1.6rem 2rem;
  overflow-y: auto;

  @include breakpoint(md) {
    padding: 6rem 2.4rem 3rem;
  }

  &__body {
    max-width: 118rem;
    margin: 0 auto;
  }

  &__close {
    margin-left: auto;
    display: block;
    font-size: 2.4rem;
    color: $white;
  }
}

.image {
  border-radius: 0.8rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 102.4rem;
  margin: 0 auto;

  &__caption {
    background-color: $white;
    padding: 2rem 3rem;

    @include breakpoint(md) {
      padding: 2rem 4.8rem;
    }
  }

  &__source {
    max-width: 100%;
    width: 100%;
    height: 100%;
    max-height: 520px;
    object-fit: cover;
    object-position: center;
  }

  &__author {
    @include typography(1.8rem, 2.4rem, 2rem, 3.2rem);
    font-weight: 500;
  }

  &__location {
    @include typography(1.2rem, 1.8rem, 1.4rem, 2rem);
    font-weight: 300;
  }
}
</style>
