import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAllProducts } from '../api/products';

export const useCatalogStore = defineStore('catalog', () => {
  let products = reactive([]);

  const isLoading = ref(false);

  async function getProducts() {
    isLoading.value = true;
    const data = await getAllProducts();
    products.push(...data)
    isLoading.value = false;
  }

  return { products, isLoading, getProducts, }
})
