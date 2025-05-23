import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import FormInput from "./FormInput";
import { login } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const {
    form: formData,
    handleChange,
  } = useForm({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!formData.email || !formData.password) {
      setFormError("Email and password are required.");
      return;
    }

    setFormError(""); // Clear any previous error

    // console.log("Form values before dispatch:", formData); // Log the values being submitted

    dispatch(login(formData)).then((action) => {
      // console.log("Action after dispatch:", action);
      if (login.fulfilled.match(action)) {
        console.log("Login successful:", action.payload); // Log successful login
        navigate("/account"); // Redirect to account page
      } else {
        console.error("Login failed:", action.payload); // Log error if login fails
        // Check if action.payload is an object and has a message property
        const errorMessage = action.payload?.message || "Login failed"; // Use optional chaining
        setFormError(errorMessage); // Set the error message to display
      }
    });
  };
  // Handle error state from Redux
  useEffect(() => {
    if (error) {
      setFormError(error); // Set the error message from Redux state
    }
  }, [error]);

  return (
    <form onSubmit={onSubmit} className="login-form space-y-1" noValidate>
      {/* Render form validation error */}
      {formError && <p className="error-message">{formError}</p>} {/* Display form error */}

      <FormInput
        label="Email"
        name="email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <FormInput
        label="Password"
        name="password"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit" className="btn-acc" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default FormLogin;