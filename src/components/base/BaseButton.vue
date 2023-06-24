<script setup>
</script>

<template>
  <button :class="$style.root" type="button">
    <slot />
  </button>
</template>

<style module>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 105%;
  border-radius: 116px;
  text-transform: uppercase;
  color: var(--copper-rose-color);
  border: 2px solid var(--silver-color);
  background-color: var(--white-color);
  transition:
    color var(--default-transition),
    border-color var(--default-transition),
    background-color var(--default-transition);

  &:hover,
  &:focus {
    border-color: var(--copper-rose-color);
  }

  &:active {
    color: var(--white-color);
    border-color: var(--copper-rose-color);
    background-color: var(--copper-rose-color);
  }
}
</style>