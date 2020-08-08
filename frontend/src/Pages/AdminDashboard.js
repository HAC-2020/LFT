import React, { useContext } from "react";
import MainContext from "../MainContext";
import Navbar from "../components/NavBar";
export default function FacultyDashboard() {
  let userData = useContext(MainContext);

  console.log(userData);

  return <Navbar title="Admin Dashboard" />;
}
