<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { logoutUser } from '../utils/index';
import ContentContainer from './ContentContainer.vue';
import BaseButton from './base/BaseButton.vue';
import IconUserVue from './icons/IconUser.vue';

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
const logout = ref('Выйти');
const isUserAuthed = ref(false);

onMounted(() => {
  if (localStorage.getItem('isAuthenticated')) {
    isUserAuthed.value = true;
  } else {
    isUserAuthed.value = false;
  }
})

const route = useRoute();

watch(() => route.name, () => {
  if (localStorage.getItem('isAuthenticated')) {
    isUserAuthed.value = true;
  } else {
    isUserAuthed.value = false;
  }
})

function onLogoutButtonClick() {
  logoutUser();
  if (localStorage.getItem('isAuthenticated')) {
    isUserAuthed.value = true;
  } else {
    isUserAuthed.value = false;
  }
};
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
          <RouterLink
            v-if="!isUserAuthed"
            :class="$style.link"
            :to="{ name: 'login' }"
          >
            {{ login }}
          </RouterLink>
          <BaseButton v-else :class="$style.button" type="button" @click="onLogoutButtonClick()">
            <IconUserVue />
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
  & svg {
    margin-right: 16px;
  }
}
</style>
