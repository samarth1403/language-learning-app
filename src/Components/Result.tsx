import {
  Button,
  Container,
  List,
  ListItem,
  Typography,
  Stack
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../Redux/slices";
import { ansEvaluation } from "../utils/features";

const Result = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {words , result} = useSelector((state:{root:stateType})=>{
    return state.root;
  });

  const correctAns = ansEvaluation(result,words.map(i=>i.meaning));
  const percentage = (correctAns / words.length) * 100;

  const resetHandler = ():void => {
    dispatch(clearState());
    navigate("/");
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" m="1rem 0">
        You got {correctAns} right out of {words.length}
      </Typography>

      <Stack direction={"row"} justifyContent="space-evenly">
        <Stack>
          <Typography m="0.5rem 0" variant="h5">
            Your ans
          </Typography>
          <List>
            {result.map((i, idx) => {
              return (
                <ListItem key={idx}>
                  {idx + 1} - {i}
                </ListItem>
              );
            })}
          </List>
        </Stack>
        <Stack>
          <Typography m="0.5rem 0" variant="h5">
            Correct ans
          </Typography>
          <List>
            {words.map((i, idx) => {
              return (
                <ListItem key={idx}>
                  {idx + 1} - {i.word} - {i.meaning}
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>

      <Stack direction={"row"} justifyContent="space-between">
        <Typography
          p="0.5rem 0"
          variant="h5"
          color={percentage > 50 ? "Green" : "Red"}
        >
          {percentage > 50 ? "Pass" : "Fail"}
        </Typography>

        <Button
          onClick={resetHandler}
          variant="contained"
          sx={{ margin: "0.5rem 0" }}
        >
          Reset
        </Button>
      </Stack>
    </Container>
  );
}

export default Result