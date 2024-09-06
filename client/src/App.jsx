import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import CustomerResolve from "./pages/CustomerResolve";

const App = () => {
  return (
    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Home} />} />
          <Route
            path="/resolve"
            element={<ProtectedRoute Component={CustomerResolve} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
