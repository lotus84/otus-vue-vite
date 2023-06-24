<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import ContentContainer from './ContentContainer.vue';

const links = ref([
  {
    text: 'Каталог',
    href: '/',
  },
  {
    text: 'Корзина',
    href: '/cart',
  },
  {
    text: 'Оплата и доставка',
    href: '/',
  },
  {
    text: 'О компании',
    href: '/',
  },
  {
    text: 'Контакты',
    href: '/',
  },
]);
</script>

<template>
  <header :class="$style.root">
    <ContentContainer>
      <nav :class="$style.wrapper">
        <RouterLink
          v-for="link, index in links"
          :key="index"
          :class="$style.link"
          :to="link.href"
        >
          {{ link.text }}
        </RouterLink>
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
  justify-content: center;
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
  transition: color var(--default-transition);

  &:hover {
    color: var(--kabul-color);
  }
}
</style>
