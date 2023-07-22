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

  it('renders default input type is text', () => {
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.attributes('type')).toBe('text');
  });

  it('renders correct input type from props', () => {
    createComponent(
      {
        propsData: {
          ...defaultProps,
          type: 'number',
        },
      },
    );
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.attributes('type')).toBe('number');
  });

  it('renders correct input name from props', () => {
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.attributes('name')).toBe(defaultProps.name);
  });

  it('renders correct input placeholder from props', () => {
    createComponent(
      {
        propsData: {
          ...defaultProps,
          placeholder: 'some placeholder',
        },
      },
    );
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.attributes('placeholder')).toBe('some placeholder');
  });
})