import './App.css'
import NavBar from "./components/Navbar/NavBar.jsx";
import HomeCards from "./components/HomeCards/HomeCards.jsx"
import Slider from './components/Slider/Slider.jsx';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import CardsAbautUs from './components/AboutUs/CardsAbautUs.jsx';

function App() {

  return (
    <>
      <NavBar/>
      <Slider/>
      <HomeCards/>
      <Routes>
      <Route path="/desarrolladores" element={<CardsAbautUs cards={App} />} />
      </Routes>
     
    </>
  )
}

export default App
