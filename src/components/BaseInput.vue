<script setup lang="ts">
import SearchIcon from "@/components/icons/IconSearch.vue"

const modelValue = defineModel<string>({ default: "" })
</script>

<template>
  <div class="input">
    <span class="input__icon"><SearchIcon /></span>
    <input
      v-model="modelValue"
      class="input__element"
      type="search"
      name="search"
      id="search"
      placeholder="Search for photo" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  position: relative;

  &__icon {
    display: block;
    position: absolute;
    top: 2.1rem;
    left: 2.4rem;
    pointer-events: none;
  }

  &__element {
    @include typography(1.4rem, 1.8rem, 1.6rem, 2rem, 1.8rem, 2.4rem);
    background-color: $white;
    border: none;
    outline: none;
    width: 100%;
    padding: 2rem 2rem 2rem 8rem;
    font-weight: 500;
    border-radius: 0.6rem;
    color: #1b2025;
    box-shadow: 0px 48px 100px 0px rgba(17, 12, 46, 0.15);
  }
}
</style>
