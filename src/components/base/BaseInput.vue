<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label :class="$style.root">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </label>
</template>

<style module>
.root {
  display: flex;
  width: 100%;

  & input {
    width: 100%;
    min-height: 50px;
    padding: 16px 24px;
    font-size: 14px;
    line-height: 16px;
    color: var(--black-color);
    border-radius: 83px;
    border: 1px solid var(--silver-color);
    outline: none;
    transition: border-color var(--default-transition);
  }

  & input:hover,
  & input:focus {
    border-color: var(--copper-rose-color);
  }

  & input::placeholder {
    color: var(--silver-color);
  }
}
</style>