import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/homepage/homepage'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function App() {
  const [count, setCount] = useState(0)
  const position = [21.0278, 105.8342]

  return (
  
    <>
      <HomePage
    
      ></HomePage>
    </>
    
    
  )
}

export default App
