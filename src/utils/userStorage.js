// Function to get user data from local storage
export const getUserData = () => {
  const userData = localStorage.getItem('user');
  return JSON.parse(userData);
};

// Function to get user ID
export const getUserId = () => {
  const userData = getUserData();
  return userData?.data?.id || null;
};

// Function to get user role
export const getUserRole = () => {
  const userData = getUserData();
  return userData?.data?.role || null;
};

// Function to get user name
export const getUserName = () => {
  const userData = getUserData();
  return userData?.data?.name || null;
};
