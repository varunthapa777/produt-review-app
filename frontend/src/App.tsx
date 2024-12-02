import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorSchemeStore } from "./stores/colorSchemeStore";
import { useEffect } from "react";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuthStore } from "./stores/authStore";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();
const App = () => {
  const { setDarkMode } = useColorSchemeStore();
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setDarkMode]);

  useAxiosInterceptors();
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            index
            element={isAuthenticated ? <HomePage /> : <LandingPage />}
          />

          <Route
            path="/signup"
            element={isAuthenticated ? <HomePage /> : <SignUpPage />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <HomePage /> : <SignInPage />}
          />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/reset-password"
            element={isAuthenticated ? <HomePage /> : <ResetPasswordPage />}
          />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
