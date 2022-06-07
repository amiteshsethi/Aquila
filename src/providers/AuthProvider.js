import { createContext } from "react";
import { useProvideAuth } from "../hooks";
import React from "react";

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  loading: true,
  updateUser: () => {},
  updateUserFriends: () => {}
};

export const AuthContext = createContext(initialState)


export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
