// password rule descriptions
export const getPasswordRuleText = (key) => {
  switch (key) {
    case "hasMinLength":
      return "• At least 8 characters";
    case "hasUppercase":
      return "• One uppercase letter";
    case "hasLowercase":
      return "• One lowercase letter";
    case "hasNumber":
      return "• One number";
    case "hasSpecialChar":
      return "• One special character";
    default:
      return "";
  }
};

// password validator
export const passwordRules = {
  hasMinLength: (val) => val.length >= 8,
  hasUppercase: (val) =>
    val
      .split("")
      .some(
        (char) => char === char.toUpperCase() && char !== char.toLowerCase()
      ),
  hasLowercase: (val) =>
    val
      .split("")
      .some(
        (char) => char === char.toLowerCase() && char !== char.toUpperCase()
      ),
  hasNumber: (val) => /\d/.test(val),
  hasSpecialChar: (val) => /[!@#$%^&*()_+[\]{}|;:,.<>?/]/.test(val),
};

// name validators
export const validateName = (name) => /^[a-zA-Z ]{2,}$/.test(name);

// email validator
export const validateEmail = (email) => {
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".", atIndex);
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

// phone validator
export const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

// sign-in form validator
export const validateLoginForm = (formData) => {
  const { email, password } = formData;
  const errors = {};

  if (!email) errors.email = "Email is required.";
  else if (!validateEmail(email)) errors.email = "Invalid email format.";

  if (!password) errors.password = "Password is required.";

  return errors;
};

// sign-up form validator
export const validateRegisterForm = (formData) => {
  const { firstName, lastName, email, phone, password } = formData;
  const errors = {};

  if (!firstName) errors.firstName = "First name is required.";
  else if (!validateName(firstName))
    errors.firstName = "Must be at least 2 letters with no special characters.";

  if (!lastName) errors.lastName = "Last name is required.";
  else if (!validateName(lastName))
    errors.lastName = "Must be at least 2 letters with no special characters.";

  if (!email) errors.email = "Email is required.";
  else if (!validateEmail(email)) errors.email = "Invalid email format.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!validatePhone(phone)) errors.phone = "Phone must be 10–15 digits.";

  if (!password) errors.password = "Password is required.";
  else {
    const allValid = Object.values(passwordRules).every((rule) =>
      rule(password)
    );
    if (!allValid) errors.password = "Password does not meet complexity rules.";
  }

  return errors;
};
