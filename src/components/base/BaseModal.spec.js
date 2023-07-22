import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseModal from './BaseModal.vue';

const defaultProps = {};

describe('BaseModal', () => {
  let wrapper;

  function createComponent({ propsData = defaultProps } = {}) {
    wrapper = shallowMount(BaseModal, { propsData });
  }

  beforeEach(() => {
    createComponent();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
})