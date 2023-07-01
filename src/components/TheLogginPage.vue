<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate';
import { object, string } from 'yup';
import { setAuthToken, clearAuthToken } from '../utils/index';
import ContentContainer from './ContentContainer.vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';

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

const router = useRouter();

async function onSubmit() {
  setAuthToken();
  router.push('add-item');
};

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-button');

  clearAuthToken();

  submitBtn.classList.add('invalid');
  setTimeout(() => {
    submitBtn.classList.remove('invalid');
  }, 1000);
}
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
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
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
}

.title {
  width: 100%;
  margin-bottom: 32px;
  color: var(--black-color);
  font-size: 28px;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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