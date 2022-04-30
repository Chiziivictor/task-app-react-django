import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const Container = styled.div`
  width: 87%;
  height: 50px;
  padding: 0 10% 0 3%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Title = styled.p`
  font-size: 12px;
`;
const DateContainer = styled.div`
  float: right;
  display: flex;
  gap: 30px;
`;
const Button = styled.button`
  background: none;
  border: none;
`;
const completedStyle = {
  opacity: "0.6",
};

const TodoList = ({ item, onSelect, onComplete, onDelete }) => {
  return (
    <Container>
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
          onClick={() => onSelect(item.id)}
          style={{ opacity: item.completed && "0.5" }}
        >
          {item.title}
        </Title>
      </ListItem>
      <DateContainer>
        <Title style={{ opacity: "0.6" }}>{item.date}</Title>
        {/* <Button onClick={() => onDelete(item.id)}>
          <HighlightOffOutlinedIcon />
        </Button> */}
      </DateContainer>
    </Container>
  );
};

export default TodoList;
