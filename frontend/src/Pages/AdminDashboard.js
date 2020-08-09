import React from "react";
import MainContext from "../MainContext";
import Navbar from "../components/NavBar";
import {
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";

import "./Dashboard.css";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "student",
    };
  }

  onSubmit = () => {
    // do something here
  };

  render() {
    return (
      <div>
        <Navbar title="Admin Dashboard" />
        <Container maxWidth="md" className="mainContainer">
          <Typography variant="h4">Add a user</Typography>
          <form className="addUserForm" noValidate autoComplete="off">
            <TextField
              id="user_name"
              label="Username"
              variant="outlined"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <TextField
              id="user_email"
              label="Email"
              variant="outlined"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <TextField
              id="user_password"
              label="Password"
              variant="outlined"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <FormControl variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="user_role"
                label="Role"
                value={this.state.role}
                onChange={e => this.setState({ role: e.target.value })}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="invigilator">Faculty</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" color="secondary">
              Add user
            </Button>
          </form>
        </Container>
      </div>
    );
  }
}
AdminDashboard.contextType = MainContext;
export default AdminDashboard;
