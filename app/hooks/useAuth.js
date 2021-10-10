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

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async (email, password) => {
    await signinUser({ email, password });
    const user = await getMyProfile().then((res) => {
      setUser(res.data);
      return res.data;
    });
    return user;
  };

  const signup = async (username, email, password) => {
    await signupUser({ username, email, password });
    const user = await getMyProfile().then((res) => {
      setUser(res.data);
      return res.data;
    });
    return user;
  };

  const signout = async () => {
    await signoutUser();
    setUser(null);
  };

  // Get user profile on mount
  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}
