import React, { useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import TodoList from "./TodoList";
import styled from "styled-components";
import AddTodo from "./AddTodo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* justify-content: center; */
`;

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [id, setId] = useState(0);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const serverData = await fetchData();
      setTodo(serverData);
      setDetails(serverData[0]);
    };
    getData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/data");
    const data = await res.json();
    return data;
  };

  const fetchDataItem = async (id) => {
    const res = await fetch(`http://localhost:5000/data/${id}`);
    const data = await res.json();

    console.log(data);
    return data;
  };

  const handleAdd = async (item) => {
    console.log("Added Task");

    const res = await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    setTodo([...todo, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTodo = { id, ...item };
    // setTodo([...todo, newTodo]);
  };

  const handleDetails = (id) => {
    console.log("selected id", id);
    const index = todo.findIndex((t, i) => {
      return t.id === id;
    });
    console.log(index);

    const getData = async () => {
      const serverData = await fetchData();
      setDetails(serverData[index]);
      console.log(details);
    };
    getData();

    // setId(todo.filter((todo) => todo.id == id));
    // console.log(typeof id);
    // setDetails(todo[id]);
  };

  const handleDelete = async (id) => {
    console.log("deleted", id);
    await fetch(`http://localhost:5000/data/${id}`, {
      method: "DELETE",
    });
    setTodo(todo.filter((todo) => todo.id !== id));
    console.log(todo);
  };

  const handleComplete = async (id) => {
    console.log("completed", id);
    const todoToggle = await fetchDataItem(id);
    const updatedTodo = { ...todoToggle, completed: !todoToggle.completed };

    const res = await fetch(`http://localhost:5000/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    const data = await res.json();

    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: data.completed } : todo
      )
    );
  };

  return (
    <Container>
      <AddTodo onAdd={handleAdd} />
      <Header />
      {todo.length > 0
        ? todo.map((todo) => (
            <TodoList
              item={todo}
              key={todo.id}
              onSelect={handleDetails}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))
        : "No Tasks To Show"}
      <Details details={details} />
    </Container>
  );
};

export default Todo;
