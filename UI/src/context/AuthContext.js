import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from "history";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
 
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
  // const [authTokens, setAuthTokens] = useState(null)
  const [user, setUser] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    let res = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await res.json();
    if (res.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      //   history("/dashboard");
    } else {
      alert("Something went wrong");
    }
  };

  let contextData = {
    authTokens: authTokens,
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
