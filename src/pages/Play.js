import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useGetPokemonByNameQuery } from "../actions";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Score = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Time = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameParagraph = styled.p`
  margin: 5px 0;
  width: 400px;
  border: 1px solid;
  border-radius: 11px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  width: 400px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 400px;
  height: 600px;
`;

const PlayContainer = styled.div`
  background-color: aliceblue;
`;

const Image = styled.img`
  width: 325px;
  height: 325px;
`;
const Subcontainer = styled.div`
  margin-left: 90px;
`;
const Play = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery();
  const [currentTime, setCurrentTime] = useState(10);
  const [score, setScore] = useState(0);

  const [selectedPokemon, setSelectedPokemon] = useState({ name: "", url: "" });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [names, setNames] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [gameover, setGameover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getRandomNames = () => {
    if (data && data.length > 0) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 4).map((pokemon) => pokemon.name);
      const selected3 = selected[Math.floor(Math.random() * selected.length)];
      const selectedPokemon = data.find(
        (pokemon) => pokemon.name === selected3
      );
      if (selectedPokemon) {
        setSelectedPokemon({
          name: selectedPokemon.name,
          url: selectedPokemon.url,
        });
      }
      setNames(selected);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      getRandomNames();
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > 0) {
        setCurrentTime(currentTime - 1);
      } else {
        setSnackbarMessage("Game Over");
        setSnackbarOpen(true);
        setGameover(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const handleCheckName = (name) => {
    if (name === selectedPokemon.name) {
      setScore(score + 20);
      setSnackbarMessage("Congratulations");
    } else {
      setSnackbarMessage("Try again");
    }

    setSnackbarOpen(true);

    // Reset game logic and fetch new random names
    setGameover(true);
    getRandomNames(); // Call getRandomNames again to fetch new names
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    if (gameover) {
      navigate("/alert");
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">This is an error Alert.</Alert>;
  }
  return (
    <Container>
      <PlayContainer>
        <ImageContainer>
          <Header>
            <Heading>Hi Pokemon</Heading>
            <Paragraph>{selectedPokemon.name}</Paragraph>
            <Image alt="pokemon" src={selectedPokemon.url} />
          </Header>
        </ImageContainer>
      </PlayContainer>
      <Subcontainer>
        <InfoContainer>
          <InfoItem>
            <Score>Score {score}</Score>
          </InfoItem>
          <InfoItem>
            <Time>Time {currentTime}</Time>
          </InfoItem>
          <InfoItem>
            <FontAwesomeIcon
              icon={faHouse}
              onClick={handleHomeClick}
              size="2x"
            />
          </InfoItem>
        </InfoContainer>
        <ContentContainer>
          {names.map((name, index) => (
            <NameParagraph key={index} onClick={() => handleCheckName(name)}>
              {name}
            </NameParagraph>
          ))}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
          />
        </ContentContainer>
      </Subcontainer>
    </Container>
  );
};

export default Play;
