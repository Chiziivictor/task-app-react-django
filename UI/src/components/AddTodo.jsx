import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 40px;
`;

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a Task");
      return;
    }

    onAdd({ title, date, completed });

    setTitle("");
    setDate("");
  };

  return (
    <Container>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Todo</label>
          <input
            type="text"
            placeholder="Add Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Date</label>
          <input
            type="text"
            placeholder="Add Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <input type="submit" value="Save" />
        {/* <button onClick={handleClick}>Add</button> */}
      </form>
    </Container>
  );
};

export default AddTodo;

// const handleClick = (e) => {
//   e.preventdefault();
//   console.log("Clicked Add Button");
// };
