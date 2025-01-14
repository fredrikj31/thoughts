import { createContext, useContext, useEffect, useMemo, useState } from "react";
import cookies from "js-cookie";
import { Profile } from "../types/profile";
import { useLoginUser } from "../api/actions/login/useLoginUser";
import { decodeJwtToken } from "../helpers/decodeJwtToken";
import { useNavigate } from "react-router-dom";
import { useSignupUser } from "../api/actions/signup/useSignupUser";
import { useToast } from "@shadcn-ui/components/ui/use-toast";
import { ToastAction } from "@shadcn-ui/components/ui/toast";
import { useLogoutUser } from "../api/actions/logout/useLogoutUser";
import { refreshToken } from "../api/actions/refreshToken";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderValue = {
  isAuthenticated: boolean;
  userId: string | undefined;
  // Methods
  login: (data: Pick<Profile, "email" | "password">) => void;
  signup: (data: Omit<Profile, "id">) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    cookies.get("access_token"),
  );
  const refreshTokenCookie = cookies.get("refresh_token");

  const decodedAccessToken = useMemo<{ userId: string } | undefined>(() => {
    return decodeJwtToken<{ userId: string }>({
      token: accessToken,
    });
  }, [accessToken]);

  const isAuthenticated = useMemo<boolean>(() => {
    return accessToken !== undefined ? true : false;
  }, [accessToken]);

  const [userId, setUserId] = useState<string | undefined>(
    decodedAccessToken?.userId,
  );

  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: loginUser } = useLoginUser();
  const { mutate: signupUser } = useSignupUser();
  const { mutate: logoutUser } = useLogoutUser();

  useEffect(() => {
    if (!accessToken && refreshTokenCookie) {
      refreshToken().then(() => {
        setAccessToken(cookies.get("access_token"));
        navigate("/");
      });
    }
  }, [navigate, accessToken, refreshTokenCookie]);

  const login = (data: Pick<Profile, "email" | "password">) => {
    loginUser(data, {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error logging in!",
          description: error.message,
        });
      },
      onSuccess: () => {
        setUserId(decodedAccessToken?.userId);
        setAccessToken(cookies.get("access_token"));
        navigate("/");
      },
    });
  };

  const logout = () => {
    logoutUser(undefined, {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error logging out!",
          description: error.message,
        });
      },
      onSuccess: () => {
        setUserId(undefined);
        navigate("/login");
      },
    });
  };

  const signup = (data: Omit<Profile, "id">) => {
    signupUser(data, {
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error signing up!",
          description: error.message,
        });
      },
      onSuccess: () => {
        toast({
          title: "Successfully signed up!",
          description: "Welcome to the club. You are now signed up",
          action: (
            <ToastAction altText="Login" onClick={() => navigate("/")}>
              Login
            </ToastAction>
          ),
        });
        navigate("/login");
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthProviderValue => {
  const authContext = useContext(AuthContext);

  const auth = useMemo(() => {
    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    const auth: AuthProviderValue = {
      isAuthenticated: authContext.isAuthenticated,
      userId: authContext.userId,
      login: authContext.login,
      logout: authContext.logout,
      signup: authContext.signup,
    };

    return auth;
  }, [authContext]);

  return auth;
};
