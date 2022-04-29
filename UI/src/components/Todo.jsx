import React, { useState } from "react";
import Header from "./Header";
import { data } from "../data";
import Details from "./Details";
import TodoList from "./TodoList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  /* justify-content: center; */
`;

const Todo = () => {
  const [todo, setTodo] = useState(data);
  const [id, setId] = useState(0);
  const [completed, setCompleted] = useState(todo.completed);

  const selectTask = (id) => {
    console.log("selected", id);
    setId(todo.filter((todo) => todo.id == todo));
    console.log(id);
  };

  const completeTask = (id) => {
    console.log("completed", id);
    todo.filter((todo) => todo.id == todo);
  };

  console.log(todo);

  return (
    <Container>
      <Header />
      {todo.map((todo) => (
        <TodoList item={todo} key={todo.id} onSelect={selectTask} />
      ))}
      <Details details={todo[id]} id={id} />
    </Container>
  );
};

export default Todo;

//
//
//
//
//
//
//

// useEffect(() => {
//   const fetchData = async () => {
//     const data = await fetch("");
//     const response = data.json();
//     setTodo(data);
//   };
//   // fetchData();
// }, []);
