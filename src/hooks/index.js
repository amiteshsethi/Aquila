import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin, register } from "../api";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../utils";
import jwt from "jwt-decode";
// import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  // const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwt(userToken);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmpassword) => {
    const response = await register(name, email, password, confirmpassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    // navigate('/login')
  };

  return {
    user,
    login,
    logout,
    signup,
    loading,
  };
};
