import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { data } from "../data";

const Container = styled.div`
  width: 70%;
  margin-top: 5%;
`;
const Title = styled.h2``;
const Description = styled.p``;

const Details = ({ details }) => {
  return (
    <Container>
      <Title>{details.title}</Title>
      <Description>{details.desc}</Description>
      {details.completed ? <p>Completed</p> : <p>Not Completed</p>}
    </Container>
  );
};

export default Details;
