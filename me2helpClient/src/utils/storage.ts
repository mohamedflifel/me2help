// Storage is kept minimal — auth is handled via HttpOnly cookies.
// Only user display data is stored in localStorage for UI purposes.

const USER_KEY = 'me2help_user';

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setStoredUser = (user: object): void =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

export const clearStorage = (): void => {
  localStorage.removeItem(USER_KEY);
};
