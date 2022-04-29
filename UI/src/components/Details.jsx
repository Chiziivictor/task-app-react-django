import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin-top: 5%;
`;
const Title = styled.h2``;
const Description = styled.p``;

const Details = ({ details, id }) => {
  const detail = details;
  console.log(id);

  return (
    <Container>
      <Title>{detail.title}</Title>
      <Description>{detail.desc}</Description>
      {detail.completed ? <p>Completed</p> : <p>Not Completed</p>}
    </Container>
  );
};

export default Details;
