<script setup lang="ts">
import { generateRowEndNumber } from "@/utils"
import type { IImage } from "@/types"

interface Props {
  image: IImage
}

defineProps<Props>()

// randomised number to achieve uneven height in grid layout
const gridRowEnd = generateRowEndNumber()
</script>

<template>
  <figure class="image" :style="{ gridRowEnd: `span ${gridRowEnd}` }">
    <img :src="image.imageUrl" :alt="image.author" class="image__source" />
    <figcaption class="image__overlay">
      <h6 class="image__author">{{ image.author }}</h6>
      <p class="image__location">{{ image.location }}</p>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.image {
  position: relative;
  overflow: hidden;
  border-radius: 0.8rem;
  cursor: pointer;
  max-height: auto;

  &__source {
    object-fit: cover;
    height: 100%;
    max-width: 100%;
	width: 100%;
    will-change: transform;
    transition: all 0.3s linear;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%);
    pointer-events: none;
    padding: 2.4rem 1.6rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__author {
    @include typography(1.6rem, 2rem, 1.8rem, 2.4rem);
    color: #e6e6e6;
    font-weight: 500;
  }

  &__location {
    @include typography(1.2rem, 1.6rem, 1.4rem, 1.8rem);
    color: #e6e6e6;
    font-weight: 300;
  }
}
</style>
