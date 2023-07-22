import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CartForm from './CartForm.vue';

describe('CartForm', () => {
  let wrapper;

  function createComponent() {
    wrapper = shallowMount(CartForm);
  }

  beforeEach(() => {
    createComponent();
  });

  it.todo('is a Vue instance');

  // it('is a Vue instance', () => {
  //   expect(wrapper.vm).toBeTruthy();
  // });
})