import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {
  Container,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "../Redux/slices";

const Quiz = () => {
  const navigate = useNavigate();
   const [result, setResult] = useState<string[]>([]);
   const [count, setCount] = useState<number>(0);
   const [ans, setAns] = useState<string>("");

   const dispatch = useDispatch();

   const nextHandler = (): void => {
     setResult((prev) => [...prev, ans]);
     setCount((prev) => prev + 1);
     setAns("");
   };

   useEffect(()=>{
      if(count+1 > words.length){
        navigate("/result");
      }
      dispatch(saveResult(result));
   },[result]);

   const {words} = useSelector((state:{root:stateType})=>{
    return state.root;
   })

  return (
    <Container
      maxWidth="xs"
      sx={{ paddingTop: "1rem" , marginTop:"2rem" }}
      style={{
       
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <Typography m={"2rem 0rem"}>Quiz</Typography>
      <Typography variant="h4">
        {count + 1} - {words[count]?.word}
      </Typography>

      <FormControl>
        <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>Meaning</FormLabel>
        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
          {words[count]?.options.map((i) => {
            return (
              <FormControlLabel
                value={i}
                control={<Radio />}
                label={i}
                key={i}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Button
        sx={{ m: "1rem 0rem" }}
        variant="contained"
        fullWidth
        onClick={nextHandler}
        disabled={ans === ""}
      >
        {count === words.length - 1 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
}

export default Quiz