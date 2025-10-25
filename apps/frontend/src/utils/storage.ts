export const saveAuthToStorage = (accessToken: string, user: any) => {
  sessionStorage.setItem("token", accessToken);
  sessionStorage.setItem("user", JSON.stringify(user));
};
export const clearAuthFromStorage = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
export const getUserFromStorage = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
export const getTokenFromStorage = () => {
  return sessionStorage.getItem("token");
};
