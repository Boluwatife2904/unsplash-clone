<script setup lang="ts">
import { generateRowEndNumber } from "@/utils"

// randomised number to achieve uneven height in grid layout
const gridRowEnd = generateRowEndNumber()
</script>

<template>
  <div class="shimmer" :style="{ gridRowEnd: `span ${gridRowEnd}` }">
    <span class="shimmer__child"></span>
    <span class="shimmer__child"></span>
  </div>
</template>

<style lang="scss" scoped>
$shimmer-background: #f6f6f6;

.shimmer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  gap: 0.8rem;
  background-color: $shimmer-background;
  border-radius: 0.8rem;
  width: 100%;
  min-height: 32rem;
  padding: 2.8rem;
  animation-duration: 2.2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, $shimmer-background 8%, #f0f0f0 18%, $shimmer-background 33%);
  background-size: 120rem 100%;

  &__child {
    background-color: #e5e5e5;
    display: block;
    height: 1.2rem;
    border-radius: 0.2rem;

    &:first-child {
      width: 12rem;
    }

    &:last-child {
      width: 8rem;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: -120rem 0;
  }
  100% {
    background-position: 120rem 0;
  }
}
</style>
