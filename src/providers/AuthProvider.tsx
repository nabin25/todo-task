import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";

interface IUser {
  full_name: string;
  email: string;
  avatar: string;
  id: number;
}

type ContextValue = {
  login: (user: IUser, token: string) => void;
  logout: () => void;
  token: string | null;
  user: IUser | null;
};

const AuthContext = createContext<ContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const getInitialAuthState = () => {
    if (typeof window !== "undefined") {
      const initialUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") ?? "")
        : null;
      const initialToken = localStorage.getItem("token") || null;
      return {
        user: initialUser,
        token: initialToken,
      };
    }
    return { user: null, token: null };
  };

  const [authState, setAuthState] = useState(getInitialAuthState);

  const login = (user: IUser, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    setAuthState({ user, token });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthState({ user: null, token: null });

    navigate(routes.auth.signIn);
    setTimeout(() => {
      toast.success("Logged out successufully");
    }, 100);
  };

  const value = {
    login,
    logout,
    token: authState.token,
    user: authState.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
export default AuthProvider;
