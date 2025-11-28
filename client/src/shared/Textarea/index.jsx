import { formStatus } from "../../constant";

export const Textarea = ({
  value,
  onChange,
  placeholder = "",
  status = "",
  name,
  className = "",
  rows = 4,
  ...props
}) => {
  const isDisabled = status === formStatus.DISABLED;

  return (
    <textarea
      value={value}
      onChange={!isDisabled ? onChange : undefined}
      placeholder={placeholder}
      name={name}
      disabled={isDisabled}
      rows={rows}
      className={`app_textarea ${status} ${className}`}
      {...props}
    />
  );
};
