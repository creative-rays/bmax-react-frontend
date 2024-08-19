export const getTokenFromStorage = () => localStorage.getItem('authToken');
export const setTokenToStorage = (token) => localStorage.setItem('authToken', token);
export const removeTokenFromStorage = () => localStorage.removeItem('authToken');
