import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const url = "https://veekthorcodes.pythonanywhere.com/api/";
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
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [registered, setRegistered] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Register form submitted");

    axios
      .post(url + "accounts/register/", {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
      })
      .then((res) => {
        res.status === 200 && setRegistered(true);
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Login Form Submitted");

    axios
      .post(url + "login/", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access).username);
        localStorage.setItem("authTokens", JSON.stringify(res.data));
      })
      .catch((err) => {
        setErrorMessage(true);
      });
  };

  const handleLogout = () => {
    setAuthTokens(localStorage.removeItem("authTokens"));
  };

  let contextData = {
    url: url,
    user: user,
    authTokens: authTokens,
    errors: errors,
    errorMessage: errorMessage,
    registered: registered,
    loginUser: loginUser,
    handleLogout: handleLogout,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
