import {AppBar , Toolbar , Typography} from "@mui/material";
import {Link} from "react-router-dom";

const styles = { color: "white", textDecoration: "none", margin: "0.5rem" , fontWeight:"600" };

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ minHeight: "80px", justifyContent: "center" }}
    >
      <Toolbar>
        <Typography variant="h5" marginRight={"auto"}>
          <Link to="/" style={styles}>
            Language App
          </Link>
        </Typography>
        <Link to="/translate" style={styles}>
          Translate
        </Link>
        <Link to="/login" style={styles}>
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header