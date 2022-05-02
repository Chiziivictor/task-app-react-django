import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { data } from "../data";

const Container = styled.div`
  padding: 10px 40px;
  margin-top: 5%;
`;
const Title = styled.h1`
  color: #16325c;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
`;
const Heading = styled.h2`
  font-size: 14px;
  font-weight: 600;
`;
const Wrapper = styled.div``;
const Description = styled.p`
  font-weight: 300;
  font-size: 14px;
`;

const Details = ({ details }) => {
  return (
    <Container>
      <Title>{details.title}</Title>
      <Wrapper style={{ margin: "35px 0" }}>
        <Heading>Description</Heading>
        <Description>{details.desc}</Description>
      </Wrapper>
      <Wrapper>
        <Heading>Status</Heading>
        {details.completed ? (
          <Description>Completed</Description>
        ) : (
          <Description>Not Completed</Description>
        )}
      </Wrapper>
    </Container>
  );
};

export default Details;
