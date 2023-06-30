<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  modelValue: {
    type: [Array, Boolean],
  },
  value: {
    type: [Boolean, Object],
  },
})

const emit = defineEmits(['update:modelValue']);

const checked = computed({
  get() {
    return props.modelValue
  },
  set(checked) {
    emit('update:modelValue', checked)
  }
});
</script>

<template>
  <label :class="
    {
      [$style.root]: true,
      [$style._checked]: checked,
    }"
  >
    <input
      v-model="checked"
      type="checkbox"
      :value="props.value"
    >
    <span>{{ label }}</span>
  </label>
</template>

<style module>
.root {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
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
      border-radius: 6px;
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
      border-radius: 2px;
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