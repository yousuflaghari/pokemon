// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 47px;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #fef773;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SubtitleContainer = styled.div`
  margin-bottom: 20px;
`;

const Subtitle1 = styled.h1`
  font-size: 143px;
  color: white;
  margin: 0px;
  margin-left: 60px;
`;

const Subtitle2 = styled.h1`
  font-size: 143px;
  color: yellow;
  margin: 0px;
  margin-left: 60px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Homemain = styled.div`
  background-color: #4f4e4b;
  height: 644px;
`;

const Buttonplay = styled.button`
  margin-left: 180px;
  background-color: yellow;
  border-radius: 16px;
  width: 160px;
  height: 39px;
  color: #201e1e;
  font-weight: 900;
  margin-top: 83px;
`;

const Home = () => {
  const navigate = useNavigate();
  const handlechange = () => {
    navigate("/play");
  };

  return (
    <Homemain>
      <Container>
        <Header>
          <Title>Who's That</Title>
        </Header>
        <ButtonGroup>
          <Button>Github</Button>
          <Button>Start</Button>
        </ButtonGroup>
      </Container>
      <SubtitleContainer>
        <Subtitle1>Who's that</Subtitle1>
        <Subtitle2>Pokemon</Subtitle2>
      </SubtitleContainer>
      <Buttonplay onClick={handlechange}>PLAY</Buttonplay>
      <Image />
    </Homemain>
  );
};

export default Home;
