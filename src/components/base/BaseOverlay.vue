<script setup>
import { onMounted, onUnmounted } from 'vue';
const escapeKeyCode = 27;

const emit = defineEmits(['close']);

function close() {
  emit('close');
}

function onKeydown(event) {
  if (event.keyCode === escapeKeyCode) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
})

</script>

<template>
  <div :class="$style.overlay" @click.self="close" @keyup.esc="close">
    <div :class="$style.content">
      <slot></slot>
    </div>
  </div>
</template>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(16 16 16 / 85%);
}

.content {
  padding: 60px 0;
}
</style>