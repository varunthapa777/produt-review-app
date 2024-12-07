import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useAdminAuthStore } from "../stores/adminAuthStore";

const useAxiosInterceptors = () => {
  const userAuth = useAuthStore();
  const adminAuth = useAdminAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (error.response.data.type === "user") {
            userAuth.logout();
            navigate("/signin");
          } else {
            adminAuth.adminLogout();
            navigate("/admin/signin");
          }
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
  }, [userAuth, adminAuth, navigate]);
};

export default useAxiosInterceptors;
