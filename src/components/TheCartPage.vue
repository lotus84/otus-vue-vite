<script setup>
import { ref, reactive } from 'vue';
import ContentContainer from './ContentContainer.vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';
import BaseCheckbox from './base/BaseCheckbox.vue';
import BaseRadioButtonsGroup from './base/BaseRadioButtonsGroup.vue';
import BaseSelect from './base/BaseSelect.vue';

const receiving = ref('Способ получения');
const userInfo = ref('Данные получателя');
const paymentMethod = ref('Способ оплаты');
const submitButtonText = ref('Оформить заказ');
const orderDetails = ref('Подробности заказа');
const placeholder = reactive({
  city: 'Город',
  street: 'Улица',
  houseNumber: 'Дом',
  flatNumber: 'Квартира',
  postcode: 'Индекс',
  message: 'Добавить комментарий',
  surname: 'Фамилия',
  name: 'Имя',
  patronymic: 'Отчество',
  phone: 'Номер телефона',
  email: 'E-mail',
  checkboxLabel: 'Подписаться на рассылку новинок и акций',
  radioItems: [
    {
      label: 'Оплата при получении наличными или картой',
      value: 'cash'
    },
    {
      label: 'Оплата банковской картой онлайн',
      value: 'card',
    },
  ],
  selectOptions: [
    {
      text: 'Почта России',
      value: 'post',
    },
    {
      text: 'СДЭК',
      value: 'sdek',
    },
    {
      text: 'Курьер',
      value: 'courier',
    },
  ]
});

const form = reactive({
  city: '',
  street: '',
  houseNumber: '',
  flatNumber: '',
  postcode: '',
  message: '',
  surname: '',
  name: '',
  patronymic: '',
  phone: '',
  email: '',
  isSubscribed: true,
  paymentMethod: '',
  deliveryMethod: 'post',
});

function onSubmit() {
  return console.log('submit');
};
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <form :class="$style.wrapper" @submit.prevent="onSubmit">
        <div :class="$style.column">
          <p :class="$style.title">{{ receiving }}</p>
          <div :class="$style.fieldsRow">
            <BaseInput
              v-model.trim="form.city"
              :placeholder="placeholder.city"
              type="text"
              :class="$style.fieldCity"
            />
          </div>
          <div :class="$style.fieldsRow">
            <BaseSelect v-model="form.deliveryMethod" :options="placeholder.selectOptions" />
          </div>
          <div :class="$style.fieldsRow">
            <BaseInput
              v-model.trim="form.street"
              :placeholder="placeholder.street"
              type="text"
              :class="$style.fieldStreet"
            />
            <BaseInput
              v-model.trim="form.houseNumber"
              :placeholder="placeholder.houseNumber"
              type="text"
              :class="$style.fieldHouse"
            />
            <BaseInput
              v-model.trim="form.flatNumber"
              :placeholder="placeholder.flatNumber"
              type="number"
              :class="$style.fieldFlat"
            />
            <BaseInput
              v-model.trim="form.postcode"
              :placeholder="placeholder.postcode"
              type="number"
              :class="$style.fieldPostcode"
            />
          </div>
          <div :class="$style.fieldsRow">
            <BaseInput
              v-model.trim="form.message"
              :placeholder="placeholder.message"
              type="text"
              :class="$style.fieldMessage"
            />
          </div>
          <p :class="$style.title">{{ userInfo }}</p>
          <div :class="$style.fieldsRow">
            <BaseInput
              v-model.trim="form.surname"
              :placeholder="placeholder.surname"
              type="text"
              :class="$style.fieldSurname"
            />
            <BaseInput
              v-model.trim="form.name"
              :placeholder="placeholder.name"
              type="text"
              :class="$style.fieldName"
            />
            <BaseInput
              v-model.trim="form.patronymic"
              :placeholder="placeholder.patronymic"
              type="text"
              :class="$style.fieldPatronymic"
            />
          </div>
          <div :class="$style.fieldsRow">
            <BaseInput
              v-model.trim="form.phone"
              :placeholder="placeholder.phone"
              type="tel"
              :class="$style.fieldPhone"
            />
          </div>
          <div :class="$style.fieldsRow">
            <BaseInput
              v-model.trim="form.email"
              :placeholder="placeholder.email"
              type="email"
              :class="$style.fieldEmail"
            />
          </div>
          <div :class="$style.fieldsRow">
            <BaseCheckbox v-model="form.isSubscribed" :label="placeholder.checkboxLabel" />
          </div>
          <p :class="$style.title">{{ paymentMethod }}</p>
          <div :class="$style.fieldsRow">
            <BaseRadioButtonsGroup v-model="form.paymentMethod" :items="placeholder.radioItems"/>
          </div>
        </div>
        <div :class="$style.column">
          <div :class="$style.orderDetails">
            <p :class="$style.title">{{ orderDetails }}</p>
            <BaseButton>{{ submitButtonText }}</BaseButton>
          </div>
        </div>
      </form>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 64px 0;
}

.wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 100px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: calc((100% - 100px) / 2);
}

.title {
  color: var(--black-color);
  font-size: 28px;
  line-height: 150%;
  font-weight: 600;
}

.fieldsRow {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.fieldStreet {
  max-width: 254px;
}

.fieldHouse,
.fieldFlat,
.fieldPostcode {
  max-width: 130px;
}

.orderDetails {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 40px;
  border-radius: 20px;
  background-color: var(--gainsboro-color);
}
</style>