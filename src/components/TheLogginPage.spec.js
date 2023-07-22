import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
// import { useAuthStore } from '../stores/auth';
import TheLogginPage from './TheLogginPage.vue';

describe('TheLogginPage', () => {
  let wrapper;

  function createComponent() {
    wrapper = shallowMount(TheLogginPage, {
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