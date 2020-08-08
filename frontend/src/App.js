import React from "react";
// import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import SignInSide from "./SignInSide";
import ForgotInSide from "./ForgotInSide";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: pink,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/forgot">
            <ForgotInSide />
          </Route>
          <Route path="/">
            <SignInSide />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
