import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import CountriesSingle from "./components/CountriesSingle";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import ProtectedRoute from "./auth/ProtectedRoute";
import "bootstrap-icons/font/bootstrap-icons.css";
import Favourites from "./components/Favourites";

const App = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/countries" element={<Countries />} />
            <Route path="/Favourites" element={<Favourites />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
