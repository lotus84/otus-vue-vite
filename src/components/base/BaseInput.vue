<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});
</script>

<template>
  <label
    :class="{
      [$style.root]: true,
      [$style._error]: !!errorMessage,
      [$style._success]: meta.valid,
    }"
  >
    <input
      :name="name"
      :value="inputValue"
      :type="props.type"
      :placeholder="props.placeholder"
      @input="handleChange"
      @blur="handleBlur"
    >
  </label>
</template>

<style module>
.root {
  position: relative;
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

._error {
  & input {
    border-color: var(--error-color);
  }

  & input:hover,
  & input:focus {
    border-color: var(--error-color);
  }
}

._success {
  & input {
    border-color: var(--success-color);
  }

  & input:hover,
  & input:focus {
    border-color: var(--success-color);
  }
}
</style>