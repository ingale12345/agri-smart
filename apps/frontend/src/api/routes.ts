// src/api/routes.ts
const API_ROUTES = {
  AUTH: {
    LOGIN: "auth/signin",
    REGISTER: "auth/register",
    LOGOUT: "auth/logout",
    REFRESH_TOKEN: "auth/refresh-token",
  },
  USERS: {
    GET_PROFILE: "users/profile",
    UPDATE_PROFILE: "users/update",
  },
  // Add more modules as needed
};

export default API_ROUTES;
