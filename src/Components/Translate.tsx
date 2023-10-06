import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  Button
} from "@mui/material";
import {  VolumeUp } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { fetchAudio, translateWord } from "../utils/features";
import Loader from "./Loader";

const Translate = () => {
  const [result , setResult] = useState<translationDataType["result"]>("");
  const [loading , setLoading] = useState<boolean>(false);
  const [audioSrc , setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);
  const [translationData, setTranslationData] = useState<translationDataType>({
    word: "",
    result: "",
    fromLang: "",
    toLang: "",
  });

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;
    const language = translationData.toLang; 
    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(result, language);
      setAudioSrc(data);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setTranslationData({ ...translationData, [name]: value });
    setAudioSrc("");
  };

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const name = e.target.name;
    const value = e.target.value;
    if(name === "toLang"){
      setResult("");
      setLoading(true);
    }
    setTranslationData({ ...translationData, [name]: value });
    setAudioSrc("");
  };

  const translateWordAsync = async (translationData: translationDataType) => {
    try {
      const result = await translateWord({
        word: translationData.word,
        fromLang: translationData.fromLang,
        toLang: translationData.toLang,
      });
      setResult(result.result);
      // Assuming translateWord returns a string when resolved.
    } catch (error) {
      console.error(error);
      return "Translation failed"; // Handle errors gracefully
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (translationData.toLang !== "" && translationData.word !== "") {
        translateWordAsync(translationData);
        if(result !== ""){
          setLoading(false);
        }
      }
      else{
        setResult("");
      }
    }, 10);
  }, [translationData.toLang, translationData.word,result]);

  return (
    <Container maxWidth="xl">
      <Typography
        fontSize={"28px"}
        fontWeight={"500"}
        textAlign={"center"}
        padding="2rem 0rem"
      >
        Translations in different Languages
      </Typography>
      <Stack
        direction={"row"}
        justifyContent="space-evenly"
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Box sx={{ width: 260, margin: "20px 0px" }}>
          <TextField
            fullWidth
            label="Enter Word"
            type="text"
            variant="outlined"
            name="word"
            color="primary"
            //style={{ backgroundColor: "#0D103C" , color:"white" }}
            value={translationData.word}
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ width: 260, margin: "20px 0px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Translate From
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={translationData.fromLang}
              label="Select Language"
              name="fromLang"
              onChange={handleSelectChange}
            >
              <MenuItem value={"ja"}>Japnese</MenuItem>
              <MenuItem value={"fr"}>French</MenuItem>
              <MenuItem value={"es"}>Spanish</MenuItem>
              <MenuItem value={"hi"}>Hindi</MenuItem>
              <MenuItem value={"de"}>German</MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 260, margin: "20px 0px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="toLang"
              value={translationData.toLang}
              label="Select Language"
              onChange={handleSelectChange}
            >
              <MenuItem value={"ja"}>Japnese</MenuItem>
              <MenuItem value={"fr"}>French</MenuItem>
              <MenuItem value={"es"}>Spanish</MenuItem>
              <MenuItem value={"hi"}>Hindi</MenuItem>
              <MenuItem value={"de"}>German</MenuItem>
              <MenuItem value={"en"}>English</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 260, margin: "20px 0px" }}>
          <TextField
            fullWidth
            label="Result"
            type="text"
            variant="outlined"
            name="result"
            value={result}
            onChange={handleInputChange}
          />
        </Box>
        {
          loading === false ? <Box sx={{ width: 50, margin: "20px 0px" }}>
          {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
          <Button
            sx={{
              borderRadius: "50%",
            }}
            onClick={audioHandler}
          >
            <VolumeUp />
          </Button>
        </Box> : <Loader marginTop="0rem"/> 
        }
      </Stack>
    </Container>
  );
};

export default Translate;
