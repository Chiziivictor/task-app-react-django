import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Title = styled.p``;
const DateContainer = styled.div`
  float: right;
  display: flex;
  gap: 30px;
`;
const Button = styled.button``;

const TodoList = ({ item, onSelect, onComplete, onDelete }) => {
  return (
    <Container>
      <ListItem>
        <Button onClick={() => onComplete(item.id)}>
          {item.completed ? (
            <CheckCircleOutlinedIcon />
          ) : (
            <CircleOutlinedIcon />
          )}
        </Button>
        <Title onClick={() => onSelect(item.id)}>{item.title}</Title>
      </ListItem>
      <DateContainer>
        <Title>{item.date}</Title>
        <Button onClick={() => onDelete(item.id)}>
          <HighlightOffOutlinedIcon />
        </Button>
      </DateContainer>
    </Container>
  );
};

export default TodoList;
