import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.auth.email);
  const token = localStorage.getItem("token"); // Get token from local storage
  const isAuthenticated = !!token; // Check if token exists

  return { user, isAuthenticated };
};

export default useAuth;
