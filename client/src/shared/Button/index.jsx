import { formStatus } from "../../constant";
import { Spinner } from "../../icons";

export const Button = ({
  children,
  status = "",
  onClick,
  className = "",
  ...props
}) => {
  const isDisabled =
    status === formStatus.DISABLED || status === formStatus.LOADING;

  return (
    <button
      className={`app_btn ${status} ${className}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {status === formStatus.LOADING ? (
        <>
          Please wait... <Spinner />
        </>
      ) : (
        children
      )}
    </button>
  );
};
