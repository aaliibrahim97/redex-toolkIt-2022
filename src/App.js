import React, { Fragment } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Auth from "./guards/auth";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" excat element={<Login />} />

          <Route element={<Auth />}>
            <Route path="/" excat element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
