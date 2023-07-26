import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from './auth';

describe('Data Auth Store Test', () => {
  let store = null;

  beforeEach(async () => {
    setActivePinia(createPinia());
    store = useAuthStore();
  })

  it('initializes with isUserAuth is false', () => {
    expect(store.isUserAuth).toBe(false);
  })

  it('test set auth token', () => {
    const defaultUserName = 'Ivan';

    store.setAuthToken(defaultUserName);

    expect(store.isUserAuth).toBe(true);
    expect(store.userName).toBe(defaultUserName);
  })

  it('test clear auth token', () => {
    const defaultUserName = 'Ivan';
    store.setAuthToken(defaultUserName);
    expect(store.isUserAuth).toBe(true);
    expect(store.userName).toBe(defaultUserName);

    store.clearAuthToken();

    expect(store.isUserAuth).toBeFalsy();
    expect(store.userName).toBeFalsy();
  })
})