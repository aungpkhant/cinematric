import React, { useState, useEffect, useContext, createContext } from "react";

import { getMyProfile } from "@/services/backend/users";
import {
  signup as signupUser,
  signin as signinUser,
  signout as signoutUser,
} from "@/services/backend/auth";

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

const initialState = {
  fetching: false,
  data: null,
  error: null,
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(initialState);

  const getUserInfo = () => {
    setUser({ ...user, fetching: true, err: null });
    return getMyProfile()
      .then((res) => {
        setUser({ ...user, data: res.data, fetching: false, err: null });
        return res.data;
      })
      .catch((err) => {
        setUser({ ...user, fetching: false, error: err });
        console.error(err);
      });
  };

  // ... to save the user to state.
  const signin = async (email, password) => {
    await signinUser({ email, password });
    const user = await getUserInfo();
    return user;
  };

  const signup = async (username, email, password) => {
    await signupUser({ username, email, password });
    const user = await getUserInfo();
    return user;
  };

  const signout = async () => {
    await signoutUser();
    setUser({
      fetching: false,
      data: null,
      error: null,
    });
  };

  // Get user profile on mount
  useEffect(() => {
    getUserInfo();
  }, []);

  // Return the user object and auth methods
  return {
    user: user.data,
    fetchingUser: user.fetching,
    signin,
    signup,
    signout,
  };
}
