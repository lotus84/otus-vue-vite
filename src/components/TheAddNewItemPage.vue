<script setup>
import { ref, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { createOrderForProducts } from '../api/order';
import ContentContainer from './ContentContainer.vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';
import BaseSelect from './base/BaseSelect.vue';

const title = ref('Добавить товар');
const mainPage = ref('на главную страницу');
const successText = ref('Товар успешно добавлен!');
const submitButtonText = ref('Добавить');
const placeholder = reactive({
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
});

const form = reactive({
  title: '',
  description: '',
  id: '',
  price: '',
  category: 'men-clothing',
});

let isFormSubmitted = ref(false);

async function onSubmit() {
  let orderForm = {
    title: form.title,
    description: form.description,
    id: form.id,
    price: form.price,
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
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <h2 v-if="!isFormSubmitted" :class="$style.title">{{ title }}</h2>
      <form
        v-if="!isFormSubmitted"
        :class="$style.wrapper"
        @submit.prevent="onSubmit"
      >
        <div :class="$style.fieldsRow">
          <BaseInput
            v-model.trim="form.title"
            :placeholder="placeholder.title"
            type="text"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseInput
            v-model.trim="form.description"
            :placeholder="placeholder.description"
            type="text"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseInput
            v-model.trim="form.id"
            :placeholder="placeholder.id"
            type="number"
            :class="$style.field"
          />
          <BaseInput
            v-model.trim="form.price"
            :placeholder="placeholder.price"
            type="number"
            :class="$style.field"
          />
        </div>
        <div :class="$style.fieldsRow">
          <BaseSelect v-model="form.category" :options="placeholder.selectOptions" />
        </div>
        <div :class="$style.fieldsRow">
          <BaseButton :class="$style.button" type="submit">{{ submitButtonText }}</BaseButton>
        </div>
      </form>
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