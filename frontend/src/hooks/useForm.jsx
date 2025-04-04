import { useState } from "react";
import { validate } from "../utils/validate";

const useForm = (initialFormData) => {
  const [form, setForm] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((data) => ({
      ...data,
      [name]: value,
    }));

    // Clear the error for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Prevent the default form submission behavior if the event is provided
    // console.log("Form data before validation:", form);

    const isValid = validate(form, setErrors); // Validate the form
    if (!isValid) {
      console.log("Validation failed");
      return { success: false, errors }; // Return an object indicating failure
    }
    // console.log("Form data after validation:", form);
    return { success: true, form }; // Return an object indicating success
  };

  const handleBlur = (e) => {
    validate(form, setErrors, e); // Validate on blur
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useForm;
