<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import ContentContainer from './ContentContainer.vue';

const contacts = ref([
  '+7 (924) 765 28 20',
  'г. Якутск, ул. Петра Алексеева, д. 6, ТЦ “Олонхо”',
  'Ежедневно с 10:00 до 19:00',
  '@hobbyart_dv',
]);

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

const copyright = ref('© 2012-2021 SHOP АРТ — официальный интернет-магазин товаров. Все права защищены. Условия использования и политика конфиденциальности');

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

function isNavLinkVisible(link) {
  if (link.isVisibleAuthed) {
    return isUserAuthed.value;
  }
  return true;
}
</script>

<template>
  <footer :class="$style.root">
    <ContentContainer>
      <div :class="$style.wrapper">
        <ul :class="$style.contactsList">
          <li
            v-for="contact, index in contacts"
            :key="index"
            :class="$style.contactsItem"
          >
            {{ contact }}
        </li>
        </ul>
        <ul :class="$style.navList">
          <li
            v-for="link, index in links"
            :key="index"
            :class="$style.navItem"
          >
            <RouterLink
              v-if="isNavLinkVisible(link)"
              :to="{ name: link.href }"
              :class="$style.link"
              active-class="footer-link-active"
            >
              {{ link.text }}
            </RouterLink>
          </li>
        </ul>
        <div :class="$style.info">
          <p :class="$style.copyright">{{ copyright }}</p>
        </div>
      </div>
    </ContentContainer>
  </footer>
</template>

<style module>
.root {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 64px;
  padding: 64px 0;
  color: var(--black-color);
  background-image: linear-gradient(226deg, var(--sugar-cane-color) 0%, var(--orinoco-color) 100%);
}

.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.contactsList {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 430px;
  font-size: 16px;
  line-height: 20px;
}

.navList {
  display: grid;
  grid-template-columns: repeat(2, 200px);
  gap: 38px 50px;
  font-size: 16px;
  line-height: 20px;
}

.link {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: var(--black-color);
  transition: color var(--default-transition);

  &:hover {
    color: var(--copper-rose-color);
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 450px;
  font-size: 16px;
  line-height: 20px;
}
</style>