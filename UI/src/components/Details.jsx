import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
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
  display: flex;
  align-items: center;
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
const DateHead = styled.h3`
  font-size: 11px;
  font-weight: 400;
  opacity: 0.5;
`;
const DateDesc = styled.p`
  font-size: 10px;
  opacity: 0.5;
`;
const EditButton = styled.span`
  margin-left: 2%;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #a1867f;
    transform: scale(120%);
  }
`;

const Details = ({ details, toggleEdit }) => {
  let created = new window.Date(details.created);
  // let created = detailsCreated.getDay()

  // let date = created.toDateString();
  let time = created.toLocaleString();

  return (
    <Container>
      {details.length === 0 ? (
        <Description>Select an item to show details</Description>
      ) : (
        <>
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
