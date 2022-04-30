import styled from "styled-components";
import image from "../assets/Bgimg.png";

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
  margin-top: 20vh;
  padding: 20px;
  width: clamp(250px, 50vw, 350px);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
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
`;
const Link = styled.a`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        {/* <Title>SIGN IN</Title> */}
        <Form>
          <Input placeholder="username" />
          <Input placeholder="password" />
          <Button>LOGIN</Button>
          <SignUp>
            <Message>Don't have an account?</Message>
            <Link>Sign up</Link>
          </SignUp>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
