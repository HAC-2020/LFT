import React, { useContext } from "react";
import MainContext from "../MainContext";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
export default function FacultyDashboard() {
  let userData = useContext(MainContext);

  console.log(userData);

  return <span>
    <Navbar title="Student Dashboard" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Link to='/test/46r7354675'>
      <Button style={{color:'black'}}>Click Me</Button>
    </Link>
  </span>;
}
