import {Container , Typography , Stack , Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
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
    <Container maxWidth="sm" style={{ backgroundColor: "#E1C6FC" }}>
      <Typography variant="h4" textAlign={"center"} padding="2rem">
        Welcome , Begin your journey of Learning.
      </Typography>
      <Stack
        direction={"row"}
        padding="1rem"
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems="cente"
        sx={{ backgroundColor: "", borderRadius: "30px" }}
      >
        {languagesList}
      </Stack>
      <Typography variant="h4" textAlign={"center"} padding="1rem">
        Choose Language , which you want to learn
      </Typography>
    </Container>
  );
}

export default Home