import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { paths } from "../../routers/links";

const AuthGuard = ({ children }) => {
  const token = useAuthStore((state) => state.isToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(paths.login);
    }
  }, [navigate, token]);

  return children;
};

export default AuthGuard;
