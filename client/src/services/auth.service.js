export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
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