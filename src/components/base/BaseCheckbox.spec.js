import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseCheckbox from './BaseCheckbox.vue';

const defaultProps = {};

describe('BaseCheckbox', () => {
  let wrapper;

  function createComponent({ propsData = defaultProps } = {}) {
    wrapper = shallowMount(BaseCheckbox, { propsData });
  }

  beforeEach(() => {
    createComponent();
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('show text if passed label', () => {
    const labelText = 'Some checkbox label';
    const propsData = { label: labelText };
    createComponent({ propsData });

    expect(wrapper.text()).toContain(labelText);
  });

  it('emits update:modelValue with false if modelValue is true after click', async () => {
    const propsData = { modelValue: true };
    createComponent({ propsData });

    await wrapper.find('input').setChecked(false);

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
  });

  it('emits update:modelValue with true if modelValue is false after click', async () => {
    const propsData = { modelValue: false };
    createComponent({ propsData });

    await wrapper.find('input').setChecked(true);

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
  });

  it('checkbox has not _checked class if modelValue is false', () => {
    const specialClass = '_checked';
    const propsData = { modelValue: false };
    createComponent({ propsData });

    expect(wrapper.classes()).not.toContain(specialClass);
  });

  it('checkbox has _checked class if modelValue is true', () => {
    const specialClass = '_checked';
    const propsData = { modelValue: true };
    createComponent({ propsData });

    expect(wrapper.classes()).toContain(specialClass);
  });
})
