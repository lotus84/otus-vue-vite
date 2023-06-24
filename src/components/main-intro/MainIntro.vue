<script setup>
import { ref } from 'vue';
import ContentContainer from '../ContentContainer.vue';

const title = ref('Интернет-магазин');
const text = ref('Повседневная практика показывает, что укрепление и развитие внутренней структуры обеспечивает широкому кругу (специалистов) участие в формировании форм воздействия.');
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <div :class="$style.wrapper">
        <div :class="$style.content">
          <h2 :class="$style.title">{{ title }}</h2>
          <p :class="$style.text">{{ text }}</p>
        </div>
      </div>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  width: 100%;
  padding: 50px 0;
}

.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 100px 50px;
  border-radius: 20px;
  overflow: hidden;
  color: var(--black-color);
  background-image:
    url('./MainIntroImage.png'),
    linear-gradient(150deg, var(--loafer-color) 0%, var(--sugar-cane-color) 100%);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.05);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 48px;
  width: 50%;
  margin-left: auto;
}

.title {
  max-width: 500px;
  font-size: 28px;
  font-weight: 600;
  line-height: 150%;
  text-transform: uppercase;
}

.text {
  max-width: 500px;
  color: rgba(var(--kabul-color), 0.8);
  font-size: 18px;
  line-height: 150%;
}
</style>