import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routers/links";
import { ToastContext } from "../../shared/toast/context/ToastContext";
import { useAuthStore } from "../../stores/authStore";
import { useLocationStore } from "../../stores/locationStore";
import { Eye, CloseEye } from "../../icons";

const passwordRules = {
  hasMinLength: (val) => val.length >= 8,
  hasUppercase: (val) => /[A-Z]/.test(val),
  hasLowercase: (val) => /[a-z]/.test(val),
  hasNumber: (val) => /\d/.test(val),
  hasSpecialChar: (val) => /[!@#$%^&*()_+[\]{}|;:,.<>?/]/.test(val),
};

const getPasswordRuleText = (key) => {
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

export const SignupPage = () => {
  const navigate = useNavigate();
  const { locationInformation } = useLocationStore();
  const { addToast } = useContext(ToastContext);
  const { isAuthLoading, signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password", "");
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      role: "admin",
    };
    const result = await signup(payload, addToast);
    if (result.success) {
      reset();
      navigate(paths.dashboard);
    }
  };

  const locationOptions = locationInformation.map(
    ({ _id, locationName, locationCode }) => ({
      label: `${locationCode} - ${locationName}`,
      value: _id,
    })
  );

  return (
    <div className="app_auth_form">
      <h1>Create an account</h1>
      <p>Please create an account to continue</p>
      <div className="app_form_auth">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="app_group_field">
            <div className="app_wrap_field">
              <input
                type="text"
                className="app_input"
                placeholder="First name"
                {...register("firstName", {
                  required: "Please enter your first name",
                })}
              />
              {errors.firstName && (
                <p className="app_field_err">{errors.firstName.message}</p>
              )}
            </div>
            <div className="app_wrap_field">
              <input
                type="text"
                className="app_input"
                placeholder="Last name"
                {...register("lastName", {
                  required: "Please enter your last name",
                })}
              />
              {errors.lastName && (
                <p className="app_field_err">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="app_wrap_field">
            <input
              type="email"
              className="app_input"
              placeholder="Email address"
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="app_field_err">{errors.email.message}</p>
            )}
          </div>
          <div className="app_group_field">
            <div className="app_wrap_field">
              <input
                type="tel"
                className="app_input"
                placeholder="Phone no."
                {...register("phone", {
                  required: "Please enter your phone no.",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Please enter a valid phone no.",
                  },
                })}
              />
              {errors.phone && (
                <p className="app_field_err">{errors.phone.message}</p>
              )}
            </div>
            <div className="app_wrap_field">
              <select className="select_box" {...register("labLocation")}>
                {
                  // required: "Please select a lab location",
                }
                <option value="">Select Location</option>
                {locationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.labLocation && (
                <p className="app_field_err">{errors.labLocation.message}</p>
              )}
            </div>
          </div>
          <div className="app_wrap_field">
            <input
              className="app_input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Please enter a password with 8 characters",
                minLength: {
                  value: 8,
                  message: "At least 8 characters",
                },
                validate: {
                  hasUppercase: (v) =>
                    passwordRules.hasUppercase(v) ||
                    "At least one uppercase letter",
                  hasLowercase: (v) =>
                    passwordRules.hasLowercase(v) ||
                    "At least one lowercase letter",
                  hasNumber: (v) =>
                    passwordRules.hasNumber(v) || "At least one number",
                  hasSpecialChar: (v) =>
                    passwordRules.hasSpecialChar(v) ||
                    "At least one special character",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="app_password_eyes"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <CloseEye aria-hidden="true" />
              ) : (
                <Eye aria-hidden="true" />
              )}
            </button>
            {errors.password && (
              <p className="app_field_err">{errors.password.message}</p>
            )}
            <div className="app_pass_rules">
              {Object.entries(passwordRules).map(([key, ruleFn]) => (
                <p
                  key={key}
                  className={
                    ruleFn(password) ? "app_valid_green" : "app_valid_gray"
                  }
                >
                  {getPasswordRuleText(key)}
                </p>
              ))}
            </div>
          </div>
          <div>
            <button type="submit" disabled={isAuthLoading} className="app_btn">
              {isAuthLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="app_links">
          <p>
            If you already have an account, &nbsp;
            <Link to={paths.login}>Login now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
