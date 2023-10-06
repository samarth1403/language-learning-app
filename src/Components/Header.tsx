import {AppBar , Toolbar , Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

const styles = { color: "white", textDecoration: "none", margin: "0.5rem" , fontWeight:"600" };

const Header = () => {
  const email = localStorage.getItem("user")!;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.pathname = "";
  }
  return (
    <AppBar
      position="static"
      style={{ minHeight: "80px", justifyContent: "center", cursor:"pointer" }}
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
        {email === null && (
          <Link to="/login" style={styles}>
            Login
          </Link>
        )}
        {email !== null && (
          <p style={styles} onClick={handleLogout}>
            Logout
          </p>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header