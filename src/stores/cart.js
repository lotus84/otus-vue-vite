import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useCatalogStore } from './catalog';

export const useCartStore = defineStore('cart', () => {
  const cartItems = reactive([]);

  const catalogStore = useCatalogStore();

  function findItemById(id) {
    return cartItems.find(item => item.id === id);
  }

  function deleteItemFromCartById(id) {
    const indexDeletedItem = cartItems.findIndex(item => Number(item.id) === Number(id));
    cartItems.splice(indexDeletedItem, 1);
  }

  function addItemToCart(id, count) {
    const itemInCart = findItemById(id);

    if (itemInCart) {
      itemInCart.count += count;
    } else {
      cartItems.push({ id, count });
    }
  }

  function removeItemFromCart(id, count) {
    const itemInCart = findItemById(id);

    itemInCart.count -= count;

    if (itemInCart.count === 0) {
      deleteItemFromCartById(id);
    }
  }

  const totalSum = computed(() => {
    const sums = cartItems
                  .map(item => catalogStore.findProductById(item.id).price * item.count)
                  .reduce((sum, val) => sum + val, 0);
    return Number(sums).toFixed(2);
  })

  return {
    cartItems,
    findItemById,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCartById,
    totalSum,
  };
})
