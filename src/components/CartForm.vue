<script setup>
import { ref, reactive } from 'vue';
import { Form } from 'vee-validate';
import { object, string, number } from 'yup';
import { createOrderForProducts } from '../api/order';
import { cartProducts } from '../utils/cart';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';
import BaseCheckbox from './base/BaseCheckbox.vue';
import BaseRadioButtonsGroup from './base/BaseRadioButtonsGroup.vue';
import BaseSelect from './base/BaseSelect.vue';
import CartItem from './CartItem.vue';

const receiving = ref('Способ получения');
const userInfo = ref('Данные получателя');
const paymentMethod = ref('Способ оплаты');
const submitButtonText = ref('Оформить заказ');
const orderDetails = ref('Подробности заказа');
const orderComposition = ref('Состав заказа');
const placeholder = {
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
};

const form = reactive({
  isSubscribed: true,
  paymentMethod: '',
  deliveryMethod: 'post',
});

const schema = object().shape(
  {
    city: string().required('нужно заполнить'),
    street: string().required('нужно заполнить'),
    house: number().positive().required().typeError('нужно заполнить'),
    flat: number().positive().required().typeError('нужно заполнить'),
    postcode: number().min(6).required().positive().typeError('укажите индекс'),
    message: string().default('').notRequired(),
    surname: string().required('укажите свою фамилию'),
    name: string().required('укажите своё имя'),
    patronymic: string().required('укажите своё отчество'),
    phone: number().required().positive().typeError('укажите свой телефон'),
    email: string().email().required('укажите свой email'),
  },
);

const emit = defineEmits(['success']);

async function onSubmit(values) {
  let orderForm = {
    ...values,
    isSubscribed: form.isSubscribed,
    paymentMethod: form.paymentMethod,
    deliveryMethod: form.deliveryMethod,
  };

  try {
    const response = await createOrderForProducts(orderForm);

    if (response.ok) {
      emit('success')
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

function handleDeleteFromCart(productId) {
  const indexDeletedItem = cartProducts.findIndex((cartItem) => cartItem.item.id === productId);
  cartProducts.splice(indexDeletedItem, 1)
}
</script>

<template>
  <Form
    :class="$style.root"
    @submit="onSubmit"
    :validation-schema="schema"
    @invalid-submit="onInvalidSubmit"
  >
    <div :class="$style.column">
      <p :class="$style.title">{{ receiving }}</p>
      <div :class="$style.fieldsRow">
        <BaseInput
          :placeholder="placeholder.city"
          name="city"
          type="text"
          :class="$style.fieldCity"
        />
      </div>
      <div :class="$style.fieldsRow">
        <BaseSelect v-model="form.deliveryMethod" :options="placeholder.selectOptions" />
      </div>
      <div :class="$style.fieldsRow">
        <BaseInput
          :placeholder="placeholder.street"
          name="street"
          type="text"
          :class="$style.fieldStreet"
        />
        <BaseInput
          :placeholder="placeholder.houseNumber"
          name="house"
          type="number"
          :class="$style.fieldHouse"
        />
        <BaseInput
          :placeholder="placeholder.flatNumber"
          name="flat"
          type="number"
          :class="$style.fieldFlat"
        />
        <BaseInput
          :placeholder="placeholder.postcode"
          name="postcode"
          type="number"
          :class="$style.fieldPostcode"
        />
      </div>
      <div :class="$style.fieldsRow">
        <BaseInput
          :placeholder="placeholder.message"
          name="message"
          type="text"
          :class="$style.fieldMessage"
        />
      </div>
      <p :class="$style.title">{{ userInfo }}</p>
      <div :class="$style.fieldsRow">
        <BaseInput
          :placeholder="placeholder.surname"
          name="surname"
          type="text"
          :class="$style.fieldSurname"
        />
        <BaseInput
          :placeholder="placeholder.name"
          name="name"
          type="text"
          :class="$style.fieldName"
        />
        <BaseInput
          :placeholder="placeholder.patronymic"
          name="patronymic"
          type="text"
          :class="$style.fieldPatronymic"
        />
      </div>
      <div :class="$style.fieldsRow">
        <BaseInput
          :placeholder="placeholder.phone"
          name="phone"
          type="tel"
          :class="$style.fieldPhone"
        />
      </div>
      <div :class="$style.fieldsRow">
        <BaseInput
          :placeholder="placeholder.email"
          name="email"
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
    <div :class="[$style.column, $style.column_right]">
      <p v-if="cartProducts.length > 0" :class="$style.title">{{ orderComposition }}</p>
      <ul :class="$style.productList">
        <li v-for="item, index in cartProducts" :key="index" :class="$style.productItem">
          <CartItem :item="item.item" :count="item.count" @delete-product="handleDeleteFromCart" />
        </li>
      </ul>
      <div :class="$style.orderDetails">
        <p :class="$style.title">{{ orderDetails }}</p>
        <BaseButton class="submit-button" type="submit">{{ submitButtonText }}</BaseButton>
      </div>
    </div>
  </Form>
</template>

<style module>
.root {
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

.column_right {
  gap: 48px;
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

.productList {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
}

.productItem {
  position: relative;
  display: flex;
  width: 100%;

  &::before {
    position: absolute;
    top: -24px;
    left: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 1px;
    content: '';
    background-color: var(--silver-color);
  }
}
</style>