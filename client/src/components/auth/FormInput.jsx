import { Input } from "../../shared/Input";

export const FormInput = ({
  type,
  value,
  placeholder,
  dispatchType,
  dispatch,
}) => {
  return (
    <div>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          })
        }
      />
    </div>
  );
};
