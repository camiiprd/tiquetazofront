import "./App.css"; 
import NavBar from "./components/Navbar/NavBar.jsx";
import Slider from './components/Slider/Slider.jsx';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import CardsAbautUs from "./Pages/AboutUs/CardsAbautUs.jsx";
import RollingCode from "./Pages/RollingCode/Rolling.jsx";
import EventsSection from "./Pages/HomeCards/HomeCards.jsx";
import ContactPage from "./Pages/Contact/Contact.jsx";
import UserDash from "./Pages/Dashboard/Dashboard.user.jsx";
import Event from "./Pages/Dashboard/dashboard.event.jsx";
import { ShoppingCardProvider } from "./contexts/ShoppingCardContext";
import MerchCards from './Pages/Merchandising/MerchCards.jsx'; 
import Login from "./Pages/login/Login.jsx";
import Register from "./Pages/register/Register.jsx";
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart.jsx';
import Profile from "./Pages/UserProfile/Profile.jsx";


function App() {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (event) => {
    const existingItem = cartItems.find(item => item.name === event.title);
    if (existingItem) {
      alert("Este evento ya está en el carrito");
    } else {
      setCartItems([...cartItems, { id: event._id, name: event.title, price: event.price }]);
    }
  };

  return (
    <ShoppingCardProvider>
      <NavBar cartItems={cartItems} setCartItems={setCartItems} />

      <Routes>

        <Route
          path=""
          element={
            <>
              <Slider />
              {/* Pasamos addToCart, cartItems, y setCartItems a EventsSection */}
              <EventsSection addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />
            </>
          }
        />

        <Route 
          path='/homecards' 
          element={<EventsSection addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />} 
        />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="/desarrolladores"
          element={
            <>
              <CardsAbautUs />
              <RollingCode />
            </>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/dash"
          element={
            <>
              <UserDash />
              <Event />
            </>
          }
        />
        <Route
          path="/merch"
          element={
            <>
              <MerchCards />
            </>
          }
        />
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
              <Register />
            </>
          }
        />
          <Route path="/carrito" element={<ShoppingCart />} />
      </Routes>
      
      <Footer />
    </ShoppingCardProvider>
  );
}

export default App;
