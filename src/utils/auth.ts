const AUTH_STORAGE_KEY = 'song_portfolio_auth_token_3798';
export const ADMIN_PASSWORD = '3798';

export const isAuthorized = (): boolean => {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'authenticated_3798';
  } catch {
    return false;
  }
};

export const setAuthorized = (authorized: boolean): void => {
  try {
    if (authorized) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated_3798');
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
};

export const verifyPassword = (password: string): boolean => {
  return password.trim() === ADMIN_PASSWORD;
};

export const logout = (): void => {
  setAuthorized(false);
};
