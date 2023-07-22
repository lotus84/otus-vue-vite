import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing';
import CartItem from './CartItem.vue';

const defaultItem = {
  id: 1,
  count: 1,
};
const defaultProps = {
  item: defaultItem,
};

const useCatalogStore = defineStore('catalog', {
  state: () => ({ n: 1 }),
  getters: {
    double: (state) => state.n * 2,
  },
})

describe('CartItem', () => {
  let wrapper;

  function createComponent({ propsData = defaultProps } = {}) {
    wrapper = shallowMount(CartItem, {
      propsData,
      global: {
        plugins: [createTestingPinia()],
      },
    });
  }

  beforeEach(() => {
    createComponent();
  });

  it.todo('is a Vue instance');

  // it('is a Vue instance', () => {
  //   expect(wrapper.vm).toBeTruthy();
  // });
})
