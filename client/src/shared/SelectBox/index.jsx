export const SelectBox = ({
  name,
  value,
  options,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`app_input ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
