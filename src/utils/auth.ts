export const ADMIN_PASSWORD = '3798';

// Always return false so every entry to settings and authorized buttons requires password '3798'
export const isAuthorized = (): boolean => {
  return false;
};

export const setAuthorized = (_authorized: boolean): void => {
  try {
    sessionStorage.removeItem('song_portfolio_auth_token_3798');
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
