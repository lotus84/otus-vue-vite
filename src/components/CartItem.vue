<script setup>
import { computed, reactive } from 'vue';
import { useCatalogStore } from '../stores/catalog';
import { useCartStore } from '../stores/cart';
import BaseButton from './base/BaseButton.vue';
import IconDelete from './icons/IconDelete.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const catalogStore = useCatalogStore();

let itemInCatalog = reactive({});

itemInCatalog = catalogStore.findProductById(Number(props.item.id));

const cartStore = useCartStore();

const sum = computed(() => {
  return (Number(itemInCatalog.price) * Number(props.item.count)).toFixed(2)
});

function addToCart() {
  cartStore.addItemToCart(Number(props.item.id), 1)
};

function removeFromCart() {
  cartStore.removeItemFromCart(Number(props.item.id), 1)
};

function deleteItemFromCart() {
  cartStore.deleteItemFromCartById(Number(props.item.id));
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.imgBox">
      <img :src="itemInCatalog.image" alt="">
    </div>
    <h3 :class="$style.title">{{ itemInCatalog.title }}</h3>
    <BaseButton :class="$style.button" @click="removeFromCart()">
      -
    </BaseButton>
    <div :class="$style.count">{{ props.item.count }}</div>
    <BaseButton :class="$style.button" @click="addToCart()">
      +
    </BaseButton>
    <span :class="$style.price">{{ sum }}$</span>
    <BaseButton @click="deleteItemFromCart()">
      <IconDelete />
    </BaseButton>
  </div>
</template>

<style module>
.root {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 12px;
}

.imgBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  padding-bottom: 15%;
  max-width: 155px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.title {
  width: 25%;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
}

.count {
  width: 30px;
  text-align: center;
}

.price {
  flex-shrink: 0;
  width: 130px;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
}

.button {
  flex-shrink: 0;
  width: 46px;
}
</style>