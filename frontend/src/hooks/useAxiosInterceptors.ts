import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const useAxiosInterceptors = () => {
  const { setAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setAuthenticated(false);
          localStorage.removeItem("token");
          navigate("/signin");
        }
        if (error.response?.status === 403) {
          navigate("/verify-email", {
            state: { email: error.response.data.email },
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [setAuthenticated, navigate]);
};

export default useAxiosInterceptors;
