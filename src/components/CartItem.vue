<script setup>
import BaseButton from './base/BaseButton.vue';
import IconDelete from './icons/IconDelete.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  count: {
    type: [String, Number],
  },
})

const emit = defineEmits(['delete-product']);

function onDeleteButtonClick() {
  emit('delete-product', props.item.id)
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.imgBox">
      <img :src="props?.item.image" alt="">
    </div>
    <h3 :class="$style.title">{{ props?.item.title }}</h3>
    <div :class="$style.count">{{ props.count }}</div>
    <span :class="$style.price">{{ props?.item.price }}$</span>
    <BaseButton @click="onDeleteButtonClick">
      <IconDelete />
    </BaseButton>
  </div>
</template>

<style module>
.root {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
}

.imgBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  padding-bottom: 20%;
  max-width: 175px;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.title {
  width: 30%;
  font-size: 16px;
  font-weight: 600;
  line-height: 18px;
}

.count {
  width: 30px;
  text-align: center;
}

.price {
  width: 100px;
  font-size: 20px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
}
</style>