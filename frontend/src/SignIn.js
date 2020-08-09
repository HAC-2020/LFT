import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import { Link, Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import BasicEntry from "./BasicEntry";

import Copyright from "./Copyright";
import MainContext from "./MainContext";

function SignIn(){
  let [state,setState] = useState({
    email: "admin@lft.com",
    password: "admin",
  })


  let mainContext = useContext(MainContext);
  console.log(mainContext)

  let RenderStatus = localStorage.getItem("token")

  let handleSubmit = e => {
    e.preventDefault();
    fetch("https://lft-hac.herokuapp.com/api/v1/user/login", {method:"POST",headers:{'Content-type':'application/json'},body:JSON.stringify({
      user_email: state.email,
      user_password: state.password,
    })})
      .then(data=> data.json().then(data=>{
        console.log(data)
        let {token} = data;
        localStorage.setItem("token",token)

        mainContext.changeLoginStatus(true)
        // console.log(mainContext)
      }))
      .catch(error=>{
        console.log(error)
      });
  };

    if((RenderStatus !== null) || toString(RenderStatus).length === 0){
      return <Redirect to='/student' />
    }else{
      return (
        <BasicEntry>
          <Typography component="h1" variant="h5">
            Sign in to Proctor
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={state.email || 'admin@lft.com'}
              onChange={e => setState({ email: e.target.value })}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={state.password || 'admin'}
              onChange={e => setState({ password: e.target.value })}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container className="forgotpass">
              <Grid item xs>
                <Link to="/forgot">Forgot password?</Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </BasicEntry>
      );
    }
}

export default SignIn;
