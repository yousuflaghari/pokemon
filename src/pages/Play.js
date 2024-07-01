// src/pages/Play.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  setTime,
  setData,
  setNames,
  setScore,
  setSelectedPokemon,
  setIsLoading,
  setSnackbarOpen,
  setSnackbarMessage,
  setGameover,
} from "../reducer";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 29px;
  align-items: center;
  width: 350px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Paragraph = styled.p`
  margin: 5px 0;
  border: 1px solid;
  width: 400px;
  border-radius: 11px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 400px;
  height: 600px;
`;

const Playcontainer = styled.div`
  background-color: aliceblue;
`;

const Play = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    time,
    data,
    names,
    score,
    selectedPokemon,
    isLoading,
    snackbarOpen,
    snackbarMessage,
    gameover,
  } = useSelector((state) => state.game);
  const currentTime = useSelector((state) => state.game.time);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        dispatch(setData(response.data.results));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const getRandomNames = () => {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 4).map((pokemon) => pokemon.name);

      const selected3 = selected[Math.floor(Math.random() * selected.length)];
      const selectedPokemonName = async () => {
        const selectedPokemon = data.find(
          (pokemon) => pokemon.name === selected3
        );
        try {
          const response = await axios.get(selectedPokemon.url);
          const imageUrl = response.data.sprites.front_default;
          dispatch(setSelectedPokemon({ name: selected3, url: imageUrl }));
        } catch (error) {
          console.log("error");
        }

        dispatch(setNames(selected));
      };
      selectedPokemonName();
    };

    if (data.length > 0) {
      getRandomNames();
    }
    dispatch(setIsLoading(false));
  }, [data, isLoading, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > 0) {
        console.log(currentTime, "hello");
        dispatch(setTime(currentTime - 1));
      } else {
        dispatch(setSnackbarMessage("Game Over"));
        dispatch(setSnackbarOpen(true));
        dispatch(setGameover(true));
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, currentTime]);

  const handleCheckName = (name) => {
    if (name === selectedPokemon.name) {
      dispatch(setScore(score + 20));
      dispatch(setSnackbarMessage("Congratulations"));
    } else {
      dispatch(setSnackbarMessage("Try again"));
    }

    dispatch(setSnackbarOpen(true));
    dispatch(setIsLoading(true));
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSnackbarClose = () => {
    dispatch(setSnackbarOpen(false));
    if (gameover) {
      navigate("/alert");
    }
  };

  return (
    <Container>
      <Playcontainer>
        <ImageContainer>
          <Header>
            <h1>Hi Pokemon</h1>
            {selectedPokemon.name}
            <img alt="pokemon" src={selectedPokemon.url} />
          </Header>
        </ImageContainer>
      </Playcontainer>
      <div>
        <InfoContainer>
          <InfoItem>
            <h1>Score {score}</h1>
          </InfoItem>
          <InfoItem>
            <h1>Time {time}</h1>
          </InfoItem>
          <InfoItem>
            <FontAwesomeIcon
              icon={faHouse}
              onClick={handleHomeClick}
              size="2x"
            />{" "}
          </InfoItem>
        </InfoContainer>
        <ContentContainer>
          {names.map((name, index) => (
            <Paragraph key={index} onClick={() => handleCheckName(name)}>
              {name}
            </Paragraph>
          ))}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
          />
        </ContentContainer>
      </div>
    </Container>
  );
};

export default Play;
