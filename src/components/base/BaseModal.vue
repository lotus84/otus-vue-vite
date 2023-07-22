<script setup>
import BaseOverlay from './BaseOverlay.vue';
import IconCross from '../icons/IconCross.vue';

</script>

<template>
  <BaseOverlay @close="$emit('close')">
    <div :class="$style.modalWrapper">
      <button
        :class="$style.closeButton"
        type="button"
        data-testid="close-button"
        @click="$emit('close')"
      >
        <IconCross />
      </button>
      <slot />
    </div>
  </BaseOverlay>
</template>

<style module>
.modalWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: var(--white-color);
  box-shadow: 0 0 30px 0 rgba(68, 68, 68, 0.05);
}

.closeButton {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  transition: opacity var(--default-transition);

  & svg {
    width: 60px;
    height: 60px;
  }

  &:hover {
    opacity: 0.7;
  }
}
</style>