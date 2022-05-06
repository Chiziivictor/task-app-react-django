import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const url = "https://6ed4-154-160-21-121.eu.ngrok.io/api/";
  // const url = "http://127.0.0.1:8000/api/";
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens")).username
      : null
  );

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Register form submitted");

    const res = await fetch(url + "accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
      }),
    });
    console.log(res.json());
    // console.log();
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Login Form Submitted");
    const res = await fetch(url + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access).username);
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      alert("Something went wrong");
    }
  };

  const handleLogout = () => {
    setAuthTokens(localStorage.removeItem("authTokens"));
  };

  let contextData = {
    url: url,
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    handleLogout: handleLogout,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
