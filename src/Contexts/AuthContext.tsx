import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserSession = {
  CUSTID_DIGITAL_GID: string;
  CUST_DISPLAY_ID: string;
  Email: string;
  OTP?: string;
  StatusID?: string;
  SignupStatusID?: string;
};

type AuthContextType = {
  authUser: UserSession | null;
  isLoggedIn: boolean;
  login: (userData: UserSession) => Promise<void>;
  logout: () => Promise<void>;
  saveUserSession: (userData: UserSession) => Promise<void>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
  saveUserSession: async () => {},
  setIsLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<UserSession | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Clear session on app start (fresh start)
  useEffect(() => {
    const clearSession = async () => {
      try {
        await AsyncStorage.removeItem("authUser");
        await AsyncStorage.setItem("isLoggedIn", "false");
        setAuthUser(null);
        setIsLoggedIn(false);
        console.log("Session cleared on app start");
      } catch (error) {
        console.log("Error clearing session:", error);
      }
    };

    clearSession();
  }, []);

  const login = async (userData: UserSession) => {
    setAuthUser(userData);
    setIsLoggedIn(true);
    await AsyncStorage.setItem("authUser", JSON.stringify(userData));
    await AsyncStorage.setItem("isLoggedIn", "true");
    console.log("User logged in:", userData);
  };

  const logout = async () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("authUser");
    await AsyncStorage.setItem("isLoggedIn", "false");
    console.log("User logged out");
  };

  const saveUserSession = async (userData: UserSession) => {
    setAuthUser(userData);
    await AsyncStorage.setItem("authUser", JSON.stringify(userData));
    console.log("User session saved:", userData);
  };

  return (
    <AuthContext.Provider
      value={{ authUser, isLoggedIn, login, logout, saveUserSession, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
