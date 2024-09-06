import React from "react";
import Navbar from "../components/Navbar";
import Customer from "../components/Customer/Customer";
import Admin from "../components/Admin/Admin";

const Home = () => {
  const isAdmin = JSON.parse(localStorage.getItem("branchInternational")).admin;

  return (
    <>
      <Navbar />
      {isAdmin ? <Admin /> : <Customer />}
    </>
  );
};

export default Home;
