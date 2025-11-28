import { useState, useEffect } from "react";

export const CommaInput = ({
  value = [],
  onChange,
  placeholder = "",
  name,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const joined = Array.isArray(value) ? value.join(", ") : "";
    setInputValue(joined);
  }, [value]);

  const handleChange = (e) => {
    const newInput = e.target.value;
    setInputValue(newInput);

    const valueArray = newInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    onChange({
      target: {
        name,
        value: valueArray,
      },
    });
  };

  return (
    <input
      type="text"
      name={name}
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="app_input"
    />
  );
};
