import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Container, Stack, Typography, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  clearState,
  getWordsFailure,
  getWordsRequest,
  getWordsSuccess,
} from "../Redux/slices";
import { fetchAudio, translateWords } from "../utils/features";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const params = useSearchParams()[0].get("language") as languageType;

  const { words, loading, error } = useSelector(
    (state: { root: stateType }) => {
      return state.root;
    }
  );

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((arr: WordType[]) => dispatch(getWordsSuccess(arr)))
      .catch((error) => dispatch(getWordsFailure(error)));

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  const nextClickHandler = () => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  const audioHandler = async () => {
    console.log("Hello")
    const player: HTMLAudioElement = audioRef.current!;
    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, params);
      setAudioSrc(data);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      style={{
        padding: "2rem 2rem",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "4rem",
        backgroundColor: "#E1C6FC",
        borderRadius: "20px",
      }}
      maxWidth="xs"
    >
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Button
          onClick={
            count === 0
              ? () => {
                  navigate("/");
                }
              : () => setCount((prev) => prev - 1)
          }
        >
          <ArrowBack />
        </Button>
        <Typography variant="h6">Learning Made Easy</Typography>
      </Stack>
      <Stack
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h5">
          {count + 1} - {words[count]?.word} : {words[count]?.meaning}
        </Typography>

        {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
        <Button
          sx={{
            borderRadius: "50%",
          }}
          onClick={audioHandler}
        >
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        variant="contained"
        sx={{ marginTop: "2rem", width: "100px" }}
        onClick={
          count === words.length - 1
            ? () => {
                navigate("/quiz");
              }
            : nextClickHandler
        }
      >
        {count === words.length - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
