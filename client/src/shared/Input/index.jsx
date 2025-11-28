import { formStatus } from "../../constant";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  status = "",
  name,
  className = "",
  ...props
}) => {
  const isDisabled = status === formStatus.DISABLED;

  return (
    <input
      type={type}
      value={value}
      onChange={!isDisabled ? onChange : undefined}
      placeholder={placeholder}
      name={name}
      disabled={isDisabled}
      className={`app_input ${status} ${className}`}
      {...props}
    />
  );
};
