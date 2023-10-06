import { Button, TextField, Grid, Typography, Paper } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
const Register = () => {
    const [user , setUser] = useState<userType>({email:"",password:""});
    const navigate = useNavigate();
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user , [name]:value});
    }
    const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((auth) => {
            if (auth) {
             
              navigate("/");
            }
          })
          .catch((error) => {
            alert(error);
          });
    }
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ margin: "50px 0px" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" component="h2" align="center">
            Create Account
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              name="email"
              value={user.email}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={user.password}
              onChange={changeHandler}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ margin: "20px 0px" }}
            >
              Register
            </Button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography sx={{ textAlign: "center" }} variant="body1">
                Login
              </Typography>
            </Link>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
