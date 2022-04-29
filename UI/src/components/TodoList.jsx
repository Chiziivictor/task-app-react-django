import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

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
`;

const TodoList = ({ item, onSelect }) => {
  return (
    <Container>
      <ListItem>
        {item.completed ? (
          <CheckCircleOutlinedIcon />
        ) : (
          <CircleOutlinedIcon onClick={() => (item.completed = false)} />
        )}
        <Title onClick={() => onSelect(item.id)}>{item.title}</Title>
      </ListItem>
      <DateContainer>{item.date}</DateContainer>
    </Container>
  );
};

export default TodoList;
