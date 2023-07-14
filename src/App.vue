<script setup>
import { RouterView } from 'vue-router';
import { useCatalogStore } from './stores/catalog';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

const catalog = useCatalogStore();
catalog.getProducts();
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
  <TheFooter />
</template>
