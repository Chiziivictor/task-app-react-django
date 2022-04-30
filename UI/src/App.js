import styled from "styled-components";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Login from "./pages/Login";
import Register from "./components/Register";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
