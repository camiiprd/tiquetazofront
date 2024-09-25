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
import ContactPage from "./Pages/Contact/Contact.jsx";
import UserDash from "./Pages/Dashboard/Dashboard.user.jsx";
import Event from "./Pages/Dashboard/Dashboard.event.jsx";
import MerchCards from './Pages/Merchandising/MerchCards.jsx'; 
import Login from "./Pages/login/Login.jsx";
import Register from "./Pages/register/Register.jsx";


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
        <Route
          path="/contact"
          element={
            <>
              <ContactPage />
            </>
          }
        />
        <Route
          path="/dash"
          element={
            <>
              <UserDash />
              <Event />
            </>
          }
        />
        {/* Nueva ruta para MerchCards */}
        <Route
          path="/merch"
          element={
            <>
              <MerchCards />
            </>
          }
        />
        {/*ruta para login y register */}
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
          
        />
         <Route
          path="/register"
          element={
            <>
              < Register/>
            </>
          }
          
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

