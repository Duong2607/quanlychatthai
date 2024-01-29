import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './components/homepage/Test'
import HomePage from './components/homepage/homepage'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import L from 'leaflet';

import HomePage1 from "./components/Home/HomePage1";
import UserUpdate from "./components/Home/UserUpdate";
import UserInfo from "./components/Home/UserInfo";
import BinUpdate from "./components/Bin/BinUpdate";
import AllBin from "./components/Bin/AllBin";
import AddNewBin from "./components/Bin/AddNewBin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [count, setCount] = useState(0)
  const position = [21.0278, 105.8342]

  return (

    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<HomePage />}/> */}
          <Route path="/user" element={<HomePage1 />} />
          <Route path="/user-information/:userId" element={<UserInfo />} />
          <Route path="/user/update/:userId" element={<UserUpdate />} />
          <Route path="/bin" element={<AllBin />} />
          <Route path="/bin/update/:binId" element={<BinUpdate />} />
          <Route path="/bin/add" element={<AddNewBin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>


  )
}

export default App
