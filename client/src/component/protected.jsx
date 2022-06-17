import { Navigate } from "react-router-dom";

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const Protected = ({ children }) => {
  if (!getCurrentUser()) {
    return <Navigate to="/login" replace />;
  }
 
  return children;
};

export default Protected;