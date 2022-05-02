import React, { useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import TodoList from "./TodoList";
import styled from "styled-components";
import AddTodo from "./AddTodo";
import { MdAddCircle } from "react-icons/md";

const Container = styled.div`
  background-color: white;
  width: 90vw;
  height: 95vh;
  border-radius: 5px;
  position: relative;
  /* overflow-y: scroll; */
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* justify-content: center; */
`;
const ListContainer = styled.div`
  width: 90vw;
  height: 83vh;
  @media (min-width: 55rem) {
    width: 70%;
  }
`;
const DetContainer = styled.div`
  display: none;
  padding: 10px 50px;
  /* box-shadow: -5px 1px 10px -10px; */

  @media (min-width: 55rem) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 30%;
    display: block;
  }
`;
const Body = styled.div`
  min-height: 83vh;
  @media (min-width: 55rem) {
    display: flex;
  }
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const AddButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background: none;

  @media (min-width: 55rem) {
    left: 28%;
    transform: translateX(-28%);
  }
`;
const Title = styled.p`
  font-size: 12px;
`;

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [id, setId] = useState(0);
  const [details, setDetails] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

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
    setShowAdd(false);

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
      <Wrapper>
        <Header />
        <Body>
          <ListContainer>
            {showAdd && (
              <AddContainer>
                <AddTodo onAdd={handleAdd} />
              </AddContainer>
            )}
            {todo.length > 0 ? (
              todo.map((todo) => (
                <TodoList
                  item={todo}
                  key={todo.id}
                  onSelect={handleDetails}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                />
              ))
            ) : (
              <Title>No Tasks to show</Title>
            )}
            <AddButton>
              <MdAddCircle
                onClick={() => {
                  setShowAdd(!showAdd);
                }}
                style={{ fontSize: "50px", color: "#16325c" }}
              />
            </AddButton>
          </ListContainer>
          <DetContainer>
            <Details details={details} />
          </DetContainer>
        </Body>
      </Wrapper>
    </Container>
  );
};

export default Todo;
