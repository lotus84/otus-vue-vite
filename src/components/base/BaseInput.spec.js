import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseInput from './BaseInput.vue';

const defaultProps = {
  name: 'some-input-name',
};

describe('BaseInput', () => {
  let wrapper;

  function createComponent({ propsData = defaultProps } = {}) {
    wrapper = shallowMount(BaseInput, { propsData });
  }

  beforeEach(() => {
    createComponent();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });
})