import { Link } from "react-router";
import Form from "./Form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearError } from "../store/features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearError()); // Clear any previous messages when the component mounts
  }, [dispatch]);
  return (
    <div className="container-reg-from">
      <div className="wrapper">
        <Form />
      </div>
      <div className="acc-con">
        <p>Already have an account?</p>
        <Link to="/login">
          <button className="btn-acc">Login</button>
        </Link>
      </div>
    </div>
  );
};
export default Register;
