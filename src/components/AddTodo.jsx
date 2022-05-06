import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  background: none;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  color: black;
  font-size: 300;

  &:focus {
    outline: 1px solid #a1867f;
  }
`;
const Button = styled.input`
  border: none;
  border-radius: 5px;
  padding: 12px 18px;
  background-color: #16325c;
  width: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #a1867f;
  }
`;
const Label = styled.div`
  font-size: 10px;
  margin: 0 5px -10px;
`;

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const description = "";

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please add a Task");
      return;
    }

    onAdd({ title, date, description });

    setTitle("");
    setDate("");
  };

  return (
    <Container>
      <Form action="" onSubmit={onSubmit}>
        <Label htmlFor="">Title</Label>
        <Input
          type="text"
          placeholder="Add Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Label htmlFor="">Date</Label>
        <Input
          type="date"
          placeholder="Add Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Button type="submit" value="Add" />
        {/* <button onClick={handleClick}>Add</button> */}
      </Form>
    </Container>
  );
};

export default AddTodo;

// const handleClick = (e) => {
//   e.preventdefault();
//   console.log("Clicked Add Button");
// };
