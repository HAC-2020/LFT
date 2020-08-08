import React from "react";
// import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainContext from "./MainContext";
import StudentDashboard from "./Pages/StudentDashboard";
import FacultyDashboard from "./Pages/FacultyDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import TestScreen from "./Pages/TestScreen";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: pink,
    secondary: pink,
  },
});

class App extends React.Component {
  state = {
    name: "Pushpendra Vishwakarma",
    email: "pushpendra.hpx2001@gmail.com",
    phone: 9327046282,
    uid: "estgr6yhvdrvs6rvsryst",
    role: "student",
  };

  renderDashboard() {
    switch (this.state.role) {
      case "student":
        return StudentDashboard;
      case "invigilator":
        return FacultyDashboard;
      case "admin":
        return AdminDashboard;
      default:
        return SignIn;
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MainContext.Provider value={this.state}>
          <Router>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/forgot" component={ForgotPassword} />
              <Route exact path="/home" component={this.renderDashboard()} />

              {/* the below routes are for just testing */}
              <Route exact path="/student" component={StudentDashboard} />
              <Route exact path="/test/:testId" component={TestScreen} />
              <Route exact path="/faculty" component={FacultyDashboard} />
              <Route exact path="/admin" component={AdminDashboard} />
            </Switch>
          </Router>
        </MainContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
