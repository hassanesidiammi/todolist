export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : false;
};

const authHeader = () => {
  const user = getCurrentUser();

  if (!user || !user.token) {
    return {};
  }

  return {
    Authorization: 'Bearer ' + user.token
  };
}

export default authHeader;