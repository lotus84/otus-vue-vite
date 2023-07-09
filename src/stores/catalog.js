import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAllProducts } from '../api/products';

export const useCatalogStore = defineStore('catalog', () => {
  const products = reactive([]);

  const isLoading = ref(false);

  async function getProducts() {
    isLoading.value = true;
    const data = await getAllProducts();
    products.push(...data)
    isLoading.value = false;
  }

  function findProductById(id) {
    return products.find((product) => Number(product.id) === Number(id));
  }

  return {
    products,
    isLoading,
    getProducts,
    findProductById,
  };
})
