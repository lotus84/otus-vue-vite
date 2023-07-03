<script setup>
import { ref, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { Form } from 'vee-validate';
import { object, string, number } from 'yup';
import { createOrderForProducts } from '../api/order';
import ContentContainer from './ContentContainer.vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';
import BaseSelect from './base/BaseSelect.vue';

const title = ref('Добавить товар');
const mainPage = ref('на главную страницу');
const successText = ref('Товар успешно добавлен!');
const submitButtonText = ref('Добавить');
const placeholder = {
  title: 'Название товара',
  description: 'Описание',
  id: 'Артикул',
  price: 'Цена',
  selectOptions: [
    {
      text: 'Мужская одежда',
      value: 'men-clothing',
    },
    {
      text: 'Ювелирное изделие',
      value: 'jewelery',
    },
    {
      text: 'Электроника',
      value: 'electronics',
    },
    {
      text: 'Женская одежда',
      value: 'women-clothing',
    },
  ],
};

const form = reactive({
  category: 'men-clothing',
});

const schema = object().shape(
  {
    title: string().required('заполните поле'),
    description: string().required('заполните поле'),
    id: number().required().positive().typeError('заполните поле'),
    price: number().required().positive().typeError('заполните поле'),
  },
);

let isFormSubmitted = ref(false);

async function onSubmit(values) {
  let orderForm = {
    ...values,
    category: form.category,
  };

  try {
    const response = await createOrderForProducts(orderForm);

    if (response.ok) {
      isFormSubmitted.value = true;
    }

  } catch (error) {
    console.error('There was an error!', error);
  }
};

function onInvalidSubmit() {
  const submitBtn = document.querySelector('.submit-button');
  submitBtn.classList.add('invalid');
  setTimeout(() => {
    submitBtn.classList.remove('invalid');
  }, 1000);
}
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <h2 v-if="!isFormSubmitted" :class="$style.title">{{ title }}</h2>
      <Form
        v-if="!isFormSubmitted"
        :class="$style.wrapper"
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <div :class="$style.fieldsRow">
          <BaseInput
            :placeholder="placeholder.title"
            name="title"
            type="text"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseInput
            :placeholder="placeholder.description"
            name="description"
            type="text"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseInput
            :placeholder="placeholder.id"
            name="id"
            type="number"
            :class="$style.field"
          />
          <BaseInput
            :placeholder="placeholder.price"
            name="price"
            type="number"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseSelect v-model="form.category" :options="placeholder.selectOptions" />
        </div>
        <div :class="$style.fieldsRow">
          <BaseButton :class="$style.button" class="submit-button" type="submit">{{ submitButtonText }}</BaseButton>
        </div>
      </Form>
      <div v-else :class="$style.success">
        <p :class="$style.successText">{{ successText }}</p>
        <RouterLink
          :class="$style.link"
          to="/"
        >
          {{ mainPage }}
        </RouterLink>
      </div>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  width: 100%;
  padding: 24px 0;
}

.title {
  align-self: center;
  margin-bottom: 24px;
  color: var(--black-color);
  font-size: 28px;
  font-weight: 600;
  line-height: 150%;
  text-transform: uppercase;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.fieldsRow {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 530px;
}

.button {
  width: 100%;
}

.success {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
}

.successText {
  color: var(--black-color);
  font-size: 28px;
  line-height: 140%;
  font-weight: 600;
  text-align: center;
}

.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 45px;
  color: var(--white-color);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 50px;
  background-image: linear-gradient(152deg, var(--copper-rose-color) 0%, var(--eunry-color) 100%);
}
</style>