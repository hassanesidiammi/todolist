import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";

const Protected = ({ children }) => {
  if (!getCurrentUser()) {
    return <Navigate to="/login" replace={true} />;
  }
 
  return children;
};

export default Protected;