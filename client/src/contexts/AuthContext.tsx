import { ReactNode, createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface IUser {
  id?: number;
  email?: string;
  role?: "USER" | "ADMIN";
}

type AuthContextType = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  verifyAuth: () => Promise<IUser>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | Record<string, never>>({});

async function verifyAuth() {
  try {
    const response = await axiosInstance.get("/user/get-user", {
      withCredentials: true,
    });
    // The cookie still holds a valid session with a logged in user,
    // then return the user returned by the auth API.
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (
        error.response?.data instanceof Object &&
        Object.prototype.hasOwnProperty.call(error.response?.data, "error")
      ) {
        alert(error.response?.data);
      }
    } else {
      alert(error);
    }
    return {};
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>({});

  // Check if a user is already logged in with the session cookie when the page loads.
  useEffect(() => {
    const verifyCookie = async () => {
      const response = await verifyAuth();
      const userId = response?.id;
      const userEmail = response?.email;
      const userRole = response?.role;
      setUser({ id: userId, email: userEmail, role: userRole });
    };

    verifyCookie();

    return () => {
      setUser({});
    };
  }, []);

  async function logout() {
    try {
      await axiosInstance.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser({});
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.data instanceof Object &&
          Object.prototype.hasOwnProperty.call(error.response?.data, "error")
        ) {
          alert(error.response?.data);
        }
      } else {
        alert(error);
      }
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      // If login successful, assign the user in AuthContext with the user returned by the response
      const userId = response.data?.id;
      const userEmail = response.data?.email;
      const userRole = response.data?.role;
      setUser({ id: userId, email: userEmail, role: userRole });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert([error.response?.data, error.response?.status]);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, verifyAuth, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
