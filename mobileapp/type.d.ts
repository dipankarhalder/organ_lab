interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (tetx: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad",
}

interface ProfileFieldProps {

}

interface SignInParams {
  email: string;
  password: string;
}

interface GetMenuParams {
  
}