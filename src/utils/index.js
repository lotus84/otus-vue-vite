export function setAuthToken() {
  localStorage.setItem('isAuthenticated', true)
}

export function clearAuthToken() {
  localStorage.removeItem('isAuthenticated')
}

export function getAuthToken() {
  return localStorage.getItem('isAuthenticated');
}

export function isLoggedIn() {
  return getAuthToken();
}

export function logoutUser() {
  clearAuthToken();
}