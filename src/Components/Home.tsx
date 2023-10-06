import {Container , Typography , Stack , Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Translate from "./Translate";
const languages: languageInfoType[] = [
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Japnese",
    code: "ja",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
  {
    name: "German",
    code: "de",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const buttonClickHandler = (language: languageInfoType["code"]): void => {
     navigate(`/learning?language=${language}`)
  };
  const languagesList = languages.map((lang) => {
    return (
      <Button
        key={lang.code}
        variant="contained"
        style={{margin:"1rem",fontWeight:"bold",borderRadius:"5px",padding:"10px 22px"}}
        onClick={() => {
          buttonClickHandler(lang.code);
        }}
      >
        {lang.name}
      </Button>
    );
  });

  return (
    <Container
      maxWidth="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        fontSize={"28px"}
        fontWeight={"500"}
        textAlign={"center"}
        paddingTop="4rem"
        paddingBottom="1rem"
      >
        Choose Language , which you want to learn
      </Typography>
      <Stack
        direction={"row"}
        padding="1rem"
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems="center"
        maxWidth={"md"}
        sx={{ backgroundColor: "", borderRadius: "30px" }}
      >
        {languagesList}
      </Stack>
      <Translate />
    </Container>
  );
}

export default Home