import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated} = useAuth();
  const { role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role (if specified)
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />; // Redirect to home or another page if the role doesn't match
  }

  return children;
};

export default ProtectedRoute;
