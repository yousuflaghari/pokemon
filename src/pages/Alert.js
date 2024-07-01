import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AlertContainer = styled.div`
  background-color: red;
  padding: 20px;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
`;

const Alert = () => {
  const Scores = useSelector((state) => state.game.score);

  return (
    <AlertContainer>
      <h1 style={{ fontSize: "50px" }}>GAME OVER</h1>
      <h1>Score :{Scores}</h1>
    </AlertContainer>
  );
};

export default Alert;
