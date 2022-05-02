import styled from "styled-components";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #a1867f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <Login />
    </Container>
  );
}

export default App;
