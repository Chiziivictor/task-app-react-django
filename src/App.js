import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import styled from "styled-components";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";

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
      {/* <Register /> */}
      <Router>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<PrivateRoute />}>
            <Route element={<Todo />} path="/" />
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
