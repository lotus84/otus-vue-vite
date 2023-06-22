<script setup>
import { ref } from 'vue';
import ContentContainer from './ContentContainer.vue';

const links = ref([
  {
    text: 'Каталог',
    href: '#',
  },
  {
    text: 'Оплата и доставка',
    href: '#',
  },
  {
    text: 'О компании',
    href: '#',
  },
  {
    text: 'Контакты',
    href: '#',
  },
]);
</script>

<template>
  <header :class="$style.root">
    <ContentContainer>
      <nav :class="$style.wrapper">
        <a
          v-for="link, index in links"
          :key="index"
          :href="link.href"
          :class="$style.link">
          {{ link.text }}
        </a>
      </nav>
    </ContentContainer>
  </header>
</template>

<style module>
.root {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  min-height: 45px;
  background-image: linear-gradient(100deg, var(--copper-rose-color) -30%, var(--eunry-color) 97%);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  width: 100%;
  min-height: 100%;
}

.link {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: var(--white-color);
}
</style>
