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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { translateWord } from "../utils/features";

const Translate = () => {
  const [result , setResult] = useState<translationDataType["result"]>("");
  const [translationData, setTranslationData] = useState<translationDataType>({
    word: "",
    result: "",
    fromLang: "",
    toLang: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setTranslationData({ ...translationData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setTranslationData({ ...translationData, [name]: value });
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
      </Stack>
    </Container>
  );
};

export default Translate;
