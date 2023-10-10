// Function to get user data from local storage
const getUserData = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return userData || null;
};

// Function to get user ID
const getUserId = () => {
  const userData = getUserData();
  return userData?.data?.id || null;
};

// Function to get user role
const getUserRole = () => {
  const userData = getUserData();
  return userData?.data?.role || null;
};

// Function to get user name
const getUserName = () => {
  const userData = getUserData();
  return userData?.data?.name || null;
};

// Function to get token
const getToken = () => {
  const tokenData = JSON.parse(localStorage.getItem('token'));
  return tokenData || null;
};

export {
  getUserData,
  getUserId,
  getUserRole,
  getUserName,
  getToken,
};
