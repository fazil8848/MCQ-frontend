// User token
export const setToken = (token) => {
  localStorage.setItem("userToken", token);
};

export const getToken = () => {
  return localStorage.getItem("userToken");
};

export const removeToken = () => {
  console.log("Clearing token...", new Error().stack);
  localStorage.removeItem("userToken");
};

// User data
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

// Clear all auth data
export const clearAuthData = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("user");
};
