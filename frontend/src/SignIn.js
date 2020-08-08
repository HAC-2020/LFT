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
  state = {
    email: "",
    password: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://lft-hac.herokuapp.com/api/v1/user/login", {
        user_email: this.state.email,
        user_password: this.state.password,
      })
      .then(console.log);
  };

  render() {
    return (
      <BasicEntry>
        <Typography component="h1" variant="h5">
          Sign in to Proctor
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
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
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
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
