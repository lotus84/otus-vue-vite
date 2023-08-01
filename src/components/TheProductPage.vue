<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useCatalogStore } from '../stores/catalog';
import ContentContainer from './ContentContainer.vue';
import BaseButton from './base/BaseButton.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const addToCartText = 'Добавить в корзину';
const alreadyInCart = 'Уже в корзине';

const product = ref();

const catalogStore = useCatalogStore();

product.value = catalogStore.findProductById(Number(props.id));

const cartStore = useCartStore();

const isProductInCart = computed(() => {
  return cartStore.findItemById(Number(props.id))
});

function addToCart() {
  cartStore.addItemToCart(Number(props.id), 1)
};

</script>

<template>
  <div v-if="product" :class="$style.root">
    <ContentContainer>
      <div :class="$style.wrapper">
        <div :class="$style.imgBox">
          <img :src="product?.image" alt="">
        </div>
        <div :class="$style.content">
          <h3 :class="$style.title">{{ product?.title }}</h3>
          <span :class="$style.category">{{ product?.category }}</span>
          <p :class="$style.description">{{ product?.description }}</p>
          <div :class="$style.priceBox">
            <span :class="$style.price">{{ product?.price }}$</span>
            <BaseButton v-if="!isProductInCart" @click="addToCart()" data-testid="add-to-cart-button">{{ addToCartText }}</BaseButton>
            <div v-else :class="$style.buttonBox">
              <p :class="$style.inCart">{{ alreadyInCart }}</p>
              <BaseButton @click="addToCart()"> + </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 58px 0;
}

.wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 44px;
}

.imgBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40%;

  & img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
}

.title {
  font-size: 32px;
  font-weight: 600;
  line-height: 130%;
}

.category {
  font-size: 16px;
  line-height: 130%;
  color: var(--copper-rose-color);
}

.description {
  font-size: 22px;
  line-height: 150%;
}

.priceBox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
}

.price {
  font-size: 28px;
  font-weight: 600;
  line-height: 150%;
}

.buttonBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.inCart {
  font-weight: 600;
  color: var(--copper-rose-color);
}
</style>