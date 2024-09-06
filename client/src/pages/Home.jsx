import React from "react";
import Navbar from "../components/Navbar";
import Customer from "../components/Customer/Customer";

const Home = () => {
  const isAdmin = false;

  return (
    <>
      <Navbar />
      {isAdmin ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Welcome Admin</h1>
        </div>
      ) : (
        <Customer />
      )}
    </>
  );
};

export default Home;
