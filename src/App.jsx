import './App.css'
import NavBar from "./components/Navbar/NavBar.jsx";
import HomeCards from "./components/HomeCards/HomeCards.jsx"
import Slider from './components/Slider/Slider.jsx';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import CardsAbautUs from './components/AboutUs/CardsAbautUs.jsx';
import Footer from './components/Footer/Footer.jsx';
import RollingCode from './components/RollingCode/Rolling.jsx'

function App() {

  return (
    <>
      <NavBar/>
      <Slider/>
      <HomeCards/>
      <Routes>
      <Route 
          path="/desarrolladores" 
          element={
            <>
              <CardsAbautUs  />
              <RollingCode  />
            </>
          } 
          />
      </Routes>
      
      <Footer/>
     
    </>
  )
}

export default App
