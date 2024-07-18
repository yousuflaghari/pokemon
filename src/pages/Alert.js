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
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 9000); // Navigate to "/" after 5 seconds

    return () => clearTimeout(timeout); // Clear timeout if component unmounts
  }, [navigate]);

  return (
    <Alertcontainer>
      <Headingalert>Sorry, the game is over.</Headingalert>
    </Alertcontainer>
  );
};

export default Alert;
