<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
import ContentContainer from './ContentContainer.vue';

const links = ref([
  {
    text: 'Каталог',
    href: 'home',
  },
  {
    text: 'Корзина',
    href: 'cart',
  },
  {
    text: 'Добавить товар',
    href: 'add-item',
  },
]);

const login = ref('Войти');
</script>

<template>
  <header :class="$style.root">
    <ContentContainer>
      <div :class="$style.wrapper">
        <nav :class="$style.nav">
          <RouterLink
            v-for="link, index in links"
            :key="index"
            :class="$style.link"
            active-class="header-link-active"
            :to="{ name: link.href }"
          >
            {{ link.text }}
          </RouterLink>
        </nav>
        <div :class="$style.authWrapper">
          <button :class="$style.link" type="button">{{ login }}</button>
        </div>
      </div>
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
  justify-content: space-between;
  width: 100%;
  min-height: 100%;
  gap: 24px;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
}

.authWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
