import Details from "./components/Details";
import TodoList from "./components/TodoList";
import styled from "styled-components";
import Todo from "./components/Todo";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  return (
    <Container>
      <Todo />
    </Container>
  );
}

export default App;
