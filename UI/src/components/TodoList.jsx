import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import { MdInfoOutline, MdOutlineDelete } from "react-icons/md";

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
const Container = styled.div`
  width: 90%;
  height: 50px;
  padding: 0 5% 0 5%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (min-width: 55rem) {
    /* width: 58%; */
  }
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Title = styled.p`
  font-size: 12px;
`;
const Date = styled.p`
  font-size: 12px;
  animation: ${fadeIn} 0.3s ease-in;
`;
const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in;
`;

const TodoList = ({ item, onSelect, onComplete, onDelete }) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleOut = () => {
    setHover(false);
  };

  return (
    <Container onMouseOver={handleHover} onMouseOut={handleOut}>
      <ListItem>
        <Button onClick={() => onComplete(item.id)}>
          {item.completed ? (
            <BsCheckSquare
              style={{
                fontSize: "18px",
                color: "green",
                background: "rgba(133,200,116,0.2)",
              }}
            />
          ) : (
            <BsSquare style={{ fontSize: "18px" }} />
          )}
        </Button>
        <Title style={{ opacity: item.completed && "0.5" }}>{item.title}</Title>
      </ListItem>
      {!hover && (
        <DateContainer>
          <Date style={{ opacity: "0.6" }}>{item.date}</Date>
        </DateContainer>
      )}
      {hover && (
        <DetailsContainer>
          <Button onClick={() => onSelect(item.id)}>
            <MdInfoOutline style={{ fontSize: "18px", marginRight: "2px" }} />
          </Button>
          <Button onClick={() => onDelete(item.id)}>
            <MdOutlineDelete
              style={{ fontSize: "18px", color: "hsl(0, 100%, 30%)" }}
            />
          </Button>
        </DetailsContainer>
      )}
    </Container>
  );
};

export default TodoList;
