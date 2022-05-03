import styled from "styled-components";
import image from "../assets/Bgimg.png";

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

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.user.value);
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN UP</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="username" type="text" name="user" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          {/* <Message>Use a password you can easily remember</Message> */}
          <Button>SIGN UP</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
