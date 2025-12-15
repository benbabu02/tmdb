import React, { createContext, useContext, useMemo, useReducer } from "react";
import { makeApi } from "./api.js";

const Ctx = createContext(null);

function reducer(state, action) {
  if (action.type === "LOGIN") return { token: action.token, user: action.user };
  if (action.type === "LOGOUT") return { token: null, user: null };
  return state;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null")
  });

  const api = useMemo(() => makeApi(() => state.token), [state.token]);

  const loginGoogle = async (credential) => {
    const r = await api.post("/api/auth/google", { credential });
    localStorage.setItem("token", r.data.token);
    localStorage.setItem("user", JSON.stringify(r.data.user));
    dispatch({ type: "LOGIN", token: r.data.token, user: r.data.user });
  };

  const testLogin = async () => {
    const r = await api.post("/api/auth/test-login");
    localStorage.setItem("token", r.data.token);
    localStorage.setItem("user", JSON.stringify(r.data.user));
    dispatch({ type: "LOGIN", token: r.data.token, user: r.data.user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return <Ctx.Provider value={{ ...state, api, loginGoogle, testLogin, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
