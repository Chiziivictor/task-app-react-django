import { useContext, useState } from "react";
import styled from "styled-components";
import image from "../assets/Bgimg.png";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import AuthContext from "../context/AuthContext";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(121, 121, 121, 0.4), rgba(0, 0, 0, 0.9)),
    url(${image});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  border-radius: 5px;
  padding: 30px;
  width: clamp(200px, 50vw, 300px);
  background-color: white;
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
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0 0;
  padding: 10px;
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
`;
const Message = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  margin-top: 10vh;
  background-color: #16325c;
  color: white;
  cursor: pointer;
`;
const showStyle = {
  position: "absolute",
  top: "142px",
  right: "5%",
  cursor: "pointer",
  color: "black",
};
const showStyle2 = {
  position: "absolute",
  top: "197px",
  right: "5%",
  cursor: "pointer",
  color: "black",
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState();
  const [showPassword2, setShowPassword2] = useState();

  const { registerUser } = useContext(AuthContext);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN UP</Title>
        <Form onSubmit={registerUser}>
          <Input
            name="email"
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Input
            name="username"
            placeholder="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Input
            name="password"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            required
          />
          {showPassword ? (
            <IoMdEyeOff style={showStyle} onClick={handleShowPassword} />
          ) : (
            <IoMdEye style={showStyle} onClick={handleShowPassword} />
          )}
          {showPassword2 ? (
            <IoMdEyeOff style={showStyle2} onClick={handleShowPassword2} />
          ) : (
            <IoMdEye style={showStyle2} onClick={handleShowPassword2} />
          )}
          {/* <Message>Use a password you can easily remember</Message> */}
          <Button>SIGN UP</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
