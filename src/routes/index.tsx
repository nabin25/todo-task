import { Route, Routes, useSearchParams } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignInPage from "../pages/auth/SignInPage";
import { useEffect } from "react";
import AuthRoute from "./AuthRoute";
import HomePage from "../pages/dashboard/HomePage";

const RoutesComponent = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.toString()]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="auth/sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesComponent;
