<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue']);

const radio = computed({
  get() {
    return props.modelValue
  },
  set(radio) {
    emit('update:modelValue', radio)
  }
});
</script>

<template>
  <div :class="$style.root">
    <label
      v-for="item, index in props.items"
      :key="index"
      :class="{
        [$style.label]: true,
        [$style._checked]: item.value === radio,
      }"
    >
      <input
        v-model="radio"
        type="radio"
        :value="item.value"
      >
      <span>{{ item.label }}</span>
    </label>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
}

.label {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  & input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0 0 0 0);
  }

  & span {
    position: relative;
    padding-left: 46px;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid var(--silver-color);
      background-color: var(--show-color);
      transition: border-color var(--default-transition);
    }

    &::after {
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--copper-rose-color);
      opacity: 0;
      transition: opacity var(--default-transition);
    }
  }

  &:hover span::before,
  &:focus span::before {
    border-color: var(--copper-rose-color);
  }
}

._checked {
  & span {
    &::after {
      opacity: 1;
    }
  }
}
</style>