<script setup>
import { ref, reactive } from 'vue';
import { Form } from 'vee-validate';
import { object, string } from 'yup';
import { useAuthStore } from '../stores/auth';
import BaseModal from './base/BaseModal.vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';

const authStore = useAuthStore();

const emit = defineEmits(['close']);

const title = ref('Войти в личный кабинет');
const placeholder = reactive({
  username: 'Логин',
  password: 'Пароль',
});
const submitButtonText = ref('Войти');

const schema = object().shape(
  {
    username: string().required('заполните поле'),
    password: string().required('введите пароль'),
  },
);

async function onSubmit(values) {
  let orderForm = {
    ...values,
  };
  authStore.setAuthToken(values.username);
  localStorage.setItem('username', orderForm.username)

  emit('close');
};

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-button');

  authStore.clearAuthToken();

  submitBtn.classList.add('invalid');
  setTimeout(() => {
    submitBtn.classList.remove('invalid');
  }, 1000);
}
</script>

<template>
  <BaseModal @close="$emit('close')">
    <div :class="$style.modalContent">
      <p :class="$style.title">{{ title }}</p>
      <Form
        :class="$style.wrapper"
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <div :class="$style.fieldsRow">
          <BaseInput
            :placeholder="placeholder.username"
            name="username"
            type="text"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseInput
            :placeholder="placeholder.password"
            name="password"
            type="password"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseButton :class="$style.button" class="submit-button" type="submit">{{ submitButtonText }}</BaseButton>
        </div>
      </Form>
    </div>
  </BaseModal>
</template>

<style module>
.modalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 600px;
  padding: 80px;
}

.title {
  color: var(--black-color);
  font-size: 28px;
  font-weight: 600;
  line-height: 140%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.fieldsRow {
  display: flex;
  align-items: center;
  width: 100%;
}

.button {
  width: 100%;
}
</style>