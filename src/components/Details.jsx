import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
// import { data } from "../data";

const Container = styled.div`
  position: relative;
  padding: 10px 40px;
  margin-top: 5%;
`;
const Title = styled.h1`
  color: #16325c;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  display: flex;
  align-items: center;

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;
const Heading = styled.h2`
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
const Wrapper = styled.div``;
const Description = styled.p`
  font-weight: 300;
  font-size: 14px;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
const DateHead = styled.h3`
  font-size: 11px;
  font-weight: 400;
  opacity: 0.5;

  @media (max-width: 400px) {
    font-size: 10px;
  }
`;
const DateDesc = styled.p`
  font-size: 10px;
  opacity: 0.5;

  @media (max-width: 400px) {
    font-size: 9px;
  }
`;
const EditButton = styled.span`
  margin-left: 10%;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #a1867f;
    transform: scale(120%);
  }
`;
const Close = styled.h2`
  position: absolute;
  width: 25px;
  top: -35px;
  right: 40px;
  margin-left: 40px;
  cursor: pointer;

  @media (min-width: 55rem) {
    display: none;
  }
`;

const Details = ({ details, toggleEdit, toggleDetails, todoLength }) => {
  const [itemDetails, setItemDetails] = useState(details);

  let created = new window.Date(details.created);
  let time = created.toLocaleString();

  console.log("Details updated");
  console.log(itemDetails);

  // useEffect(() => {
  //  setItemDetails(details);
  // }, [todoLength]);

  return (
    <Container>
      {Object.keys(details).length === 0 ? (
        <Description>Select an item to show details</Description>
      ) : (
        <>
          <Close onClick={toggleDetails}>
            <IoMdClose />
          </Close>
          <Title>
            {details.title}
            <EditButton>
              <FiEdit onClick={toggleEdit} />
            </EditButton>
          </Title>
          <Wrapper style={{ margin: "35px 0" }}>
            <Heading>Description</Heading>
            <Description>{details.description}</Description>
            <DateHead>Created at:</DateHead>
            <DateDesc>{time}</DateDesc>
          </Wrapper>
          <Wrapper>
            <Heading>Status</Heading>
            {details.completed ? (
              <Description>Completed</Description>
            ) : (
              <Description>Not Completed</Description>
            )}
          </Wrapper>
        </>
      )}
      {/* <Wrapper style={{ margin: "30px 0" }}>
        <DateHead>Created at:</DateHead>
        <DateDesc>{time}</DateDesc>
      </Wrapper> */}
    </Container>
  );
};

export default Details;
