import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import image from "../assets/Bgimg.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(121, 121, 121, 0.4), rgba(0, 0, 0, 0.9)),
    url(${image});
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  /* margin-top: 20vh; */
  padding: 20px;
  width: clamp(250px, 50vw, 350px);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: white;
`;
const Input = styled.input`
  flex: 1;
  background: none;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  color: white;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  margin-top: 5vh;
  background-color: #16325c;
  color: white;
  cursor: pointer;
`;
const SignUp = styled.div`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 30px;
`;
const Message = styled.p`
  font-size: 12px;
  margin: 3px;
  display: grid;
  place-items: center;
`;
const PasswordContainer = styled.div`
  min-width: 30%;
  position: relative;
`;
const registerLink = {
  fontSize: "12px",
  textDecoration: "underline",
  color: "inherit",
  cursor: "pointer",
};
const showStyle = {
  position: "absolute",
  top: "75px",
  right: "5%",
  cursor: "pointer",
  color: "white",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  let { loginUser, errorMessage, authTokens } = useContext(AuthContext);

  useEffect(() => {
    authTokens && navigate("/");
  }, [errorMessage, authTokens]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    await loginUser(e);
    // authTokens && navigate("/");
    // if (location.state?.from) {
    //   navigate(location.state.from);
    // } else {
    //   navigate("/");
    // }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN </Title>

        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <Input
            name="password"
            placeholder="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {errorMessage && (
            <Message style={{ color: "rgba(255,255,200,0.5)" }}>
              username or password is incorrect
            </Message>
          )}
          {showPassword ? (
            <IoMdEyeOff style={showStyle} onClick={handleShowPassword} />
          ) : (
            <IoMdEye style={showStyle} onClick={handleShowPassword} />
          )}
          <Button type="submit">LOGIN</Button>
          <SignUp>
            <Message>Don't have an account?</Message>
            <Link to="/register" style={registerLink}>
              Sign up
            </Link>
          </SignUp>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
