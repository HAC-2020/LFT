import React from "react";
// import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import SignInSide from "./SignInSide";
import ForgotInSide from "./ForgotInSide";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainContext from "./MainContext";
import Dashboard from "./Pages/Dashboard/Dashboard";

import FacultyDashboard from "./Pages/FacultyDashboard.js";

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: pink,
  },
});

function App() {


  let UserData = {
    name:'Pushpendra Vishwakarma',
    email:'pushpendra.hpx2001@gmail.com',
    phone:9327046282,
    uid:'estgr6yhvdrvs6rvsryst'
  }


  return (
    <ThemeProvider theme={theme}>
      <MainContext.Provider value={UserData}>
        <Router>
          <Switch>
            <Route path="/forgot" exact >
              <ForgotInSide />
            </Route>
            <Route path="/" exact>
              <SignInSide />
            </Route>
            <Route path="/student/home" exact>
              <Dashboard />
            </Route>
            <Route path="/home" exact> 
            <Redirect to='/faculty/home' />
            
            </Route> {/* this route is for just Testing Purpose */ }
            <Route path="/faculty/home" exact>
              <FacultyDashboard />
            </Route>
          </Switch>
        </Router>
      </MainContext.Provider>
    </ThemeProvider>
  );
}

export default App;
