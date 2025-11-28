import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { paths } from "../../routers/links";
import { validateLoginForm } from "../../utils/validationUtils";
import { useAuthStore } from "../../stores/authStore";

export const ForgotPassPage = () => {
  const { isAuthLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const validationErrors = validateLoginForm(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, message]) => {
        setError(key, { type: "manual", message });
      });
      return;
    }

    console.log(data);
  };

  return (
    <div className="app_auth_form">
      <h1>Password Recovery</h1>
      <p>
        We will send password recovery code <br />
        on this email
      </p>
      <div className="app_form_auth">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Forgot Password form"
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
          <div>
            <button
              type="submit"
              disabled={isAuthLoading}
              className="app_btn"
              aria-busy={isAuthLoading}
            >
              {isAuthLoading ? "Sending..." : "Send Link"}
            </button>
          </div>
        </form>
        <div className="app_links">
          <p>
            <Link to={paths.login}>Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
