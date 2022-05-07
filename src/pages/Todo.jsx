import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Details from "../components/Details";
import TodoList from "../components/TodoList";
import styled from "styled-components";
import AddTodo from "../components/AddTodo";
import { MdAddCircle } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import EditTodo from "../components/EditTodo";

const Container = styled.div`
  background-color: white;
  /* width: clamp(250px, 90vw, 1350px); */
  width: 90vw;
  height: 95vh;
  border-radius: 5px;
  position: relative;

  overflow-x: hidden;
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
  overflow-y: scroll;

  @media (min-width: 55rem) {
    width: 60vw;
  }
`;
const DetContainer = styled.div`
  display: block;
  position: absolute;
  top: 80px;
  background: white;
  width: 100%;
  /* box-shadow: -5px 1px 10px -10px; */

  @media (min-width: 55rem) {
    position: relative;
    top: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 30vw;
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
  position: sticky;
  top: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 2;
`;
const AddButton = styled.button`
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background: none;
  cursor: pointer;

  @media (min-width: 55rem) {
    left: 28%;
    transform: translateX(-28%);
  }
`;
const NoTask = styled.div`
  padding: 20px 50px;
  display: flex;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;
const AddMessage = styled.a`
  margin-left: 15px;
  color: #16325c;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
`;
const NoDetContainer = styled.div`
  display: none;

  @media (min-width: 55rem) {
    display: block;
    position: relative;
    top: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 30vw;
    display: block;
  }
`;
const NoDetails = styled.div`
  position: relative;
  padding: 10px 40px;
  margin-top: 5%;
`;
const NoDetailsDesc = styled.p`
  font-weight: 300;
  font-size: 14px;
`;

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [details, setDetails] = useState([]);
  const [getAuthTokens, setGetAuthTokens] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [todoLength, setTodoLength] = useState(Object.keys(todo).length);

  // const url = "http://localhost:8000/api/";

  const { url, authTokens } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      setGetAuthTokens(authTokens);
      const serverData = await fetchData();
      setTodo(serverData);
    };
    getData();
  }, [showAdd, showEdit]);

  const fetchData = async () => {
    const res = await fetch(url + "list/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
    });
    const data = await res.json();
    return data;
  };

  const fetchDataItem = async (id) => {
    const res = await fetch(url + `detail/${id}/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
    });
    const data = await res.json();

    console.log(data);
    return data;
  };

  const toggleAdd = () => {
    showEdit && setShowEdit(false);
    setShowAdd(!showAdd);
    showDetails && setShowDetails(false);
  };

  const handleAdd = async (item) => {
    console.log("Added Task");

    const res = await fetch(url + "create/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    setTodo([...todo, data]);
    setTodoLength(Object.keys(todo).length);
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
    const index = todo.findIndex((t, i) => {
      return t.id === id;
    });
    console.log(index);
    await fetch(url + `delete/${id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
    });
    setTodo(todo.filter((todo) => todo.id !== id));

    setTodoLength(Object.keys(todo).length);
    setShowDetails(false);
    console.log(todo);
  };

  const handleComplete = async (id) => {
    console.log("completed", id);
    const todoToggle = await fetchDataItem(id);
    const updatedTodo = { ...todoToggle, completed: !todoToggle.completed };

    const res = await fetch(url + `update/${id}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
      body: JSON.stringify(updatedTodo),
    });

    const data = await res.json();

    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: data.completed } : todo
      )
    );

    setTodoLength(Object.keys(todo).length);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);

    showAdd && setShowAdd(false);
  };

  const handleEdit = async (item) => {
    console.log("Edited", item.id);
    const todoToggle = await fetchDataItem(item.id);
    const updatedTodo = { ...todoToggle, ...item };
    const logged = JSON.stringify(item);

    const res = await fetch(url + `update/${item.id}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authTokens.access,
      },
      body: JSON.stringify(updatedTodo),
    });

    const data = await res.json();

    setTodo(
      todo.map((todo) => (todo.id === item.id ? { ...todo, data } : todo))
    );

    setTodoLength(Object.keys(todo).length);
    handleDetails(item.id);
    setShowEdit(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    // Object.keys(details).length > 0 && setShowDetails(true);
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
            {showEdit && (
              <AddContainer>
                <EditTodo onEdit={handleEdit} details={details} />
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
                  toggleDetails={toggleDetails}
                />
              ))
            ) : (
              <NoTask>
                <Title>No Tasks to show.</Title>
                <AddMessage
                  onClick={() => {
                    setShowAdd(!showAdd);
                  }}
                >
                  Add Task
                </AddMessage>
              </NoTask>
            )}
            <AddButton>
              <MdAddCircle
                onClick={toggleAdd}
                style={{ fontSize: "50px", color: "#16325c" }}
              />
            </AddButton>
          </ListContainer>

          {showDetails ? (
            <DetContainer>
              <Details
                details={details}
                toggleEdit={toggleEdit}
                toggleDetails={toggleDetails}
                todoLength={todoLength}
              />
            </DetContainer>
          ) : (
            <NoDetContainer>
              <NoDetails>
                <NoDetailsDesc>Select an item to show details</NoDetailsDesc>
              </NoDetails>
            </NoDetContainer>
          )}
        </Body>
      </Wrapper>
    </Container>
  );
};

export default Todo;
