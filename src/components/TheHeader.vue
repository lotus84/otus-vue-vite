<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import ContentContainer from './ContentContainer.vue';
import BaseButton from './base/BaseButton.vue';
import IconUserVue from './icons/IconUser.vue';

const authStore = useAuthStore();

const links = ref([
  {
    text: 'Каталог',
    href: 'home',
    isVisibleAuthed: false,
  },
  {
    text: 'Корзина',
    href: 'cart',
    isVisibleAuthed: false,
  },
  {
    text: 'Добавить товар',
    href: 'add-item',
    isVisibleAuthed: true,
  },
]);

const login = 'Войти';
const logout = 'Выйти';

function isNavLinkVisible(link) {
  if (link.isVisibleAuthed) {
    return authStore.isUserAuth;
  }
  return true;
}

function onLogoutButtonClick() {
  authStore.logoutUser();
};
</script>

<template>
  <header :class="$style.root">
    <ContentContainer>
      <div :class="$style.wrapper">
        <nav :class="$style.nav">
          <template v-for="link, index in links" :key="index">
            <RouterLink
              v-if="isNavLinkVisible(link)"
              :class="$style.link"
              active-class="header-link-active"
              :to="{ name: link.href }"
            >
              {{ link.text }}
            </RouterLink>
          </template>
        </nav>
        <div :class="$style.authWrapper">
          <RouterLink
            v-if="!authStore.isUserAuth"
            :class="$style.link"
            :to="{ name: 'login' }"
          >
            {{ login }}
          </RouterLink>
          <BaseButton v-else :class="$style.button" type="button" @click="onLogoutButtonClick()">
            <IconUserVue />
            <span :class="$style.userName">{{ authStore.userName }}</span>
            {{ logout }}
          </BaseButton>
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
  min-height: 72px;
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

.button {
  gap: 16px;
}

.userName {
  color: var(--siam-color);
  font-weight: 600;
}
</style>
