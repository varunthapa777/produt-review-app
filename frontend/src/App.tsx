import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorSchemeStore } from "./stores/colorSchemeStore";
import { useEffect } from "react";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";
import ProtectedRoute from "./pages/user/ProtectedRoute";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import { useAuthStore } from "./stores/authStore";
import ProfilePage from "./pages/user/Profile";
import SignInPage from "./pages/user/SignIn";
import SignUpPage from "./pages/user/SignUp";
import HomePage from "./pages/Home";
import VerifyEmailPage from "./pages/user/VerifyEmailPage";
import ChangePasswordPage from "./pages/user/ChangePasswordPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRouteWrapper from "./pages/admin/AdminRouteWrapper";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import UsersPage from "./pages/admin/Users";
import ModeratorPage from "./pages/admin/Moderators";
import AuditReviewsPage from "./pages/admin/AuditReview";
import ProductPage from "./pages/admin/Products";
import ProductDetailPage from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import Header from "./components/Header";
import LandingPage from "./pages/Landing";
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
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route element={<Header />}>
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Route>
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
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/signin" element={<AdminLogin />} />
          <Route element={<AdminRouteWrapper />}>
            <Route element={<AdminLayout />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/moderators" element={<ModeratorPage />} />
              <Route path="/admin/reviews" element={<AuditReviewsPage />} />
              <Route path="/admin/products" element={<ProductPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
