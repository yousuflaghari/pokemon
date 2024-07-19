import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Alertcontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 300px;
`;
const Headingalert = styled.div`
  display: flex;
  font-size: 50px;
  background-color: yellow;
`;
const Alert = () => {
  const NAVIGATE_TO_HOME_TIME = 9000;
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, NAVIGATE_TO_HOME_TIME);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Alertcontainer>
      <Headingalert>Sorry, the game is over.</Headingalert>
    </Alertcontainer>
  );
};

export default Alert;
