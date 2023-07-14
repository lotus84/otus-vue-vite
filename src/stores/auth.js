import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  let isUserAuth = ref(false);
  let userName = ref('');

  const router = useRouter();

  function setAuthToken(name) {
    localStorage.setItem('isAuthenticated', true)
    isUserAuth.value = true;
    localStorage.setItem('userName', name)
    userName.value = name;
  }

  function clearAuthToken() {
    localStorage.removeItem('isAuthenticated');
    isUserAuth.value = false;
    localStorage.removeItem('userName');
    userName.value = undefined;
  }

  function getAuthToken() {
    isUserAuth.value = localStorage.getItem('isAuthenticated');
    userName.value = localStorage.getItem('userName');
  }

  function isLoggedIn() {
    getAuthToken();
    return isUserAuth.value;
  }

  function logoutUser() {
    clearAuthToken();
    router.push({ name: 'login' });
  }

  return {
    isUserAuth,
    userName,
    setAuthToken,
    clearAuthToken,
    getAuthToken,
    isLoggedIn,
    logoutUser,
  };
})