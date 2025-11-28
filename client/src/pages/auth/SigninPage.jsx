import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routers/links";
import { ToastContext } from "../../shared/toast/context/ToastContext";
import { validateLoginForm } from "../../utils/validationUtils";
import { useAuthStore } from "../../stores/authStore";
import { Eye, CloseEye } from "../../icons";

export const SigninPage = () => {
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);
  const { isAuthLoading, signin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const validationErrors = validateLoginForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, message]) => {
        setError(key, { type: "manual", message });
      });
      return;
    }

    const result = await signin(data, addToast);
    if (result.success) {
      reset();
      navigate(paths.dashboard);
    }
  };

  return (
    <div className="app_auth_form">
      <h1>Welcome back!</h1>
      <p>Sign in to access your daily updates</p>
      <div className="app_form_auth">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Sign in form"
        >
          <div className="app_wrap_field">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="app_input"
              placeholder="Email address"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="app_field_err" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="app_wrap_field">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="app_input"
              placeholder="Password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password", {
                required: "Please enter your password",
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
              <p id="password-error" className="app_field_err" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="app_links_inside">
            <p>
              <Link to={paths.forgot}>Forgot password?</Link>
            </p>
          </div>
          <div>
            <button
              type="submit"
              disabled={isAuthLoading}
              className="app_btn"
              aria-busy={isAuthLoading}
            >
              {isAuthLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="app_links">
          <p>
            Don&apos;t have an account? &nbsp;
            <Link to={paths.register}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
