import React, { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  padding: 20px 5vw;
  margin: 0;
  font-size: 25px;
  font-weight: 500;
`;
const Line = styled.div`
  background-color: #16325c;
  width: 7px;
  height: 20px;
  margin-right: 10px;
`;
const Span = styled.span`
  color: rgba(0, 0, 0, 0.3);
  font-size: 10px;
  font-style: italic;
  margin-left: 40%;
`;

const Header = ({ name }) => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Title>
        <Line />
        My Tasks
        <Span>logged in as {user}</Span>
      </Title>
    </Container>
  );
};

export default Header;
