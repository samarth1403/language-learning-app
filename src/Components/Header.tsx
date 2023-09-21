import {AppBar , Toolbar , Typography} from "@mui/material";
import {Link} from "react-router-dom";

const styles = { color: "white", textDecoration: "none", margin: "0.5rem" };

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ minHeight: "80px", justifyContent: "center" }}
    >
      <Toolbar>
        <Typography variant="h5" marginRight={"auto"}>
          <Link to="/" style={styles}>
            Language Learning App
          </Link>
        </Typography>
        <Link to="/" style={styles}>
          Home
        </Link>
        <Link to="/login" style={styles}>
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header