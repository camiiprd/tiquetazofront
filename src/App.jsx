import './App.css'
import NavBar from "./components/Navbar/NavBar.jsx";
import Slider from './components/Slider/Slider.jsx';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import CardsAbautUs from './Pages/AboutUs/CardsAbautUs.jsx';
import RollingCode from './Pages/RollingCode/Rolling.jsx';
import EventsSection from './Pages/HomeCards/HomeCards.jsx';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart.jsx';


function App() {

  return (
    <>
      <NavBar/>
      <Slider/>
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
      <Route path='/homecards' element={<EventsSection/>}/>
      <Route path="/carrito" element={<ShoppingCart />} />
      </Routes>
      
      <Footer/>
     
    </>
  )
}

export default App
