import React, { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const User = styled.p`
  /* color: rgba(0, 0, 0, 0.3); */
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  margin-right: 10vw;
`;
const Span = styled.span`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #a1867f;
    transform: scale(120%);
  }
`;

const Header = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <Container>
      <Title>
        <Line />
        My Tasks
      </Title>
      <User>
        Hi, {user}{" "}
        <Span>
          <IoIosLogOut onClick={handleLogout} />
        </Span>
      </User>
    </Container>
  );
};

export default Header;
