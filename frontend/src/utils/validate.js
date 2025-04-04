const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export const validate = (form, setErrors, evt) => {
  const err = {};
  let isValid = true;

  // Email validation
  if (form.email.trim() === "") {
    err.email = "You need to enter an email address";
    isValid = false;
  } else if (!emailRegex.test(form.email)) {
    err.email = "You need to enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (form.password.trim() === "") {
    err.password = "You need to enter a password";
    isValid = false;
  } else if (form.password.length < 8) {
    err.password = "Your password must be at least 8 characters long";
    isValid = false;
  } else if (!passwordRegex.test(form.password)) {
    err.password =
      "Your password must have at least one uppercase, one lowercase, one number, and a special character";
    isValid = false;
  }

  // Log the errors
  console.log("Validation errors:", err);

  // Set all errors at once
  setErrors(err);

  return isValid; // Return true if no errors, false otherwise
};
