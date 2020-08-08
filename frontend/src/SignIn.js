import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as axios from "axios";

import BasicEntry from "./BasicEntry";

import Copyright from "./Copyright";

class SignIn extends React.Component {
  login = e => {
    e.stopPropagation();
    axios.post("https://lft-hac.herokuapp.com/api/v1/user/login").then(console.log);
  };

  render() {
    return (
      <BasicEntry>
        <Typography component="h1" variant="h5">
          Sign in to Proctor
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.login}>
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
