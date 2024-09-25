import "./App.css";
import NavBar from "./components/Navbar/NavBar.jsx";
import Slider from "./components/Slider/Slider.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import CardsAbautUs from "./Pages/AboutUs/CardsAbautUs.jsx";
import RollingCode from "./Pages/RollingCode/Rolling.jsx";
import EventsSection from "./Pages/HomeCards/HomeCards.jsx";


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
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
