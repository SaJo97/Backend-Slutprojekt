import { useNavigate } from "react-router";
import useForm from "../hooks/useForm";
import { register } from "../store/features/auth/authSlice";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    form: formData,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, message } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    const { success, form: values } = handleSubmit(e);
    // console.log(values);
    if (!success) return;

    const userData = {
      email: values.email,
      password: values.password,
    };
    dispatch(register(userData)).then((action) => {
      if (action.type === "auth/register/fulfilled") {
        navigate("/account");
      }
    });
  };
  return (
    <form onSubmit={onSubmit} className="reg-from space-y-1" noValidate>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <FormInput
        label="Email"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        errorMsg={errors.email}
        onBlur={handleBlur}
      />

      <FormInput
        label="Password"
        name="password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        errorMsg={errors.password}
        onBlur={handleBlur}
      />

      <FormInput
        label="Confirm password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        errorMsg={errors.confirmPassword}
        onBlur={handleBlur}
      />

      <button type="submit" className="btn-acc" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};
export default Form;
