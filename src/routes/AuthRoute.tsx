import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const AuthRoute = () => {
  const { token, user } = useAuth();

  return token && user ? (
    <>
      <Navigate to="/" />
    </>
  ) : (
    <Outlet />
  );
};
export default AuthRoute;
