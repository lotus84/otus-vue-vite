<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import ContentContainer from './ContentContainer.vue';
import CartForm from './CartForm.vue';

const mainPage = ref('на главную страницу');
const thanksText = ref('Благодарим за покупку!');
const description = ref('В ближайшее время с вами свяжется менеджер для подтверждения заказа');
let isFormSubmitted = ref(false);

</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <CartForm v-if="!isFormSubmitted" @success="isFormSubmitted = true">
      </CartForm>
      <div v-else :class="$style.success">
        <p :class="$style.thanksText">{{ thanksText }}</p>
        <p :class="$style.description">{{ description }}</p>
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

.success {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
}

.thanksText {
  color: var(--black-color);
  font-size: 28px;
  line-height: 140%;
  font-weight: 600;
  text-align: center;
}

.description {
  max-width: 320px;
  color: var(--black-color);
  text-align: center;
  font-size: 16px;
  line-height: 140%;
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