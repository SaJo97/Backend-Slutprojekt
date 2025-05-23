import { Link } from "react-router";
import FormLogin from "../components/FormLogin";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearError, clearMessage } from "../store/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearError()); // Clear any previous messages when the component mounts
    dispatch(clearMessage());
  }, [dispatch]);
  return (
    <div className="container-reg-from">
      <div className="wrapper">
        <FormLogin />
      </div>
      <div className="acc-con">
        <p>Don't have an account?</p>
        <Link to="/register">
          <button className="btn-acc">Register</button>
        </Link>
      </div>
    </div>
  );
};
export default Login;
