import "./App.css";
import NavBar from "./components/Navbar/NavBar.jsx";
import Slider from "./components/Slider/Slider.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import CardsAbautUs from "./Pages/AboutUs/CardsAbautUs.jsx";
import RollingCode from "./Pages/RollingCode/Rolling.jsx";
import EventsSection from "./Pages/HomeCards/HomeCards.jsx";
<<<<<<< HEAD
import MerchCards from './Pages/Merchandising/MerchCards.jsx';
=======
import ContactPage from "./Pages/Contact/Contact.jsx";
import UserDash from "./Pages/Dashboard/Dashboard.user.jsx";
import Event from "./Pages/Dashboard/Dashboard.event.jsx";
>>>>>>> 25b87fcb1524c4e7541338fccac51e8a62694bc0

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
<<<<<<< HEAD
        <Route path="/merchandising" element={<MerchCards />} />
=======
         <Route
          path="/contact"
          element={
            <>
              <ContactPage
               />
            </>
          }
        />
        <Route
          path="/dash"
          element={
            <>
              <UserDash
               />
               <Event
               />
            </>
          }
        />
>>>>>>> 25b87fcb1524c4e7541338fccac51e8a62694bc0
      </Routes>
      

      <Footer />
    </>
  );
}

export default App;
