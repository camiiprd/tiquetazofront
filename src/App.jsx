import "./App.css";
import NavBar from "./components/Navbar/NavBar.jsx";
import Slider from "./components/Slider/Slider.jsx";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import CardsAbautUs from "./Pages/AboutUs/CardsAbautUs.jsx";
import RollingCode from "./Pages/RollingCode/Rolling.jsx";
import EventsSection from "./Pages/HomeCards/HomeCards.jsx";
import MerchCards from './Pages/Merchandising/MerchCards.jsx';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path=""
          element={
            <>
              <Slider />
              <EventsSection />
            </>
          }
        />
        <Route
          path="/desarrolladores"
          element={
            <>
              <CardsAbautUs />
              <RollingCode />
            </>
            
          }
        />
        <Route path="/merchandising" element={<MerchCards />} />
      </Routes>
      

      <Footer />
    </>
  );
}

export default App;
