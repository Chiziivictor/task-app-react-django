import React, { useState } from "react";
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
  height: 50px;
  padding: 0 5%;
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
  width: 70%;
`;
const Title = styled.p`
  cursor: pointer;
  font-size: 12px;
  width: 100%;
`;
const Date = styled.p`
  font-size: 12px;
  animation: ${fadeIn} 0.3s ease-in;
`;
const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(120%);
  }
`;
const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in;
`;

const TodoList = ({ item, onSelect, onComplete, onDelete, toggleDetails }) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleOut = () => {
    setHover(false);
  };

  const handleDetails = () => {
    onSelect(item.id);
    toggleDetails();
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let d = new window.Date();
  let today = d.getDay();

  let createdDate = new window.Date(item.date);
  let dayIndex = createdDate.getDay();
  let date = createdDate.getDate();
  let day = days[dayIndex];

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
        <Title
          style={{ opacity: item.completed && "0.5" }}
          onClick={handleDetails}
        >
          {item.title}
        </Title>
      </ListItem>
      <DateContainer>
        <Date style={{ opacity: "0.6" }}>
          {dayIndex == today ? "Today" : day + " " + date}
          {/* {day} */}
        </Date>
        <Button onClick={() => onDelete(item.id)}>
          <MdOutlineDelete
            style={{
              fontSize: "18px",
              color: "hsl(0, 100%, 30%)",
              marginLeft: "10px",
            }}
          />
        </Button>
      </DateContainer>
    </Container>
  );
};

export default TodoList;
