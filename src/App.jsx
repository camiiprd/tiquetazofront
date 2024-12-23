import React from "react";
import "./App.css";
import NavBar from "./components/Navbar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Slider from "./components/Slider/Slider.jsx";
import { Routes, Route } from "react-router-dom";
import EventsSection from "./Pages/HomeCards/HomeCards.jsx";
import CardsAbautUs from "./Pages/AboutUs/CardsAbautUs.jsx";
import RollingCode from "./Pages/RollingCode/Rolling.jsx";
import ContactPage from "./Pages/Contact/Contact.jsx";
import MerchCards from "./Pages/Merchandising/MerchCards.jsx";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart.jsx";
import Profile from "./Pages/UserProfile/Profile.jsx";
import MyPurchases from "./Pages/MyPurchases/MyPurchases.jsx";
import Login from "./Pages/login/Login.jsx";
import Register from "./Pages/register/Register.jsx";
import UserDash from "./Pages/Dashboard/Dashboard.user.jsx";
import Event from "./Pages/Dashboard/dashboard.event.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/Authcontexts.jsx";
import { ShoppingCardProvider } from "./contexts/ShoppingCardContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ShoppingCardProvider>
        <NavBar />
        <Routes>
          {/* Rutas públicas */}
          <Route
            path=""
            element={
              <>
                <Slider />
                <EventsSection />
              </>
            }
          />
          <Route path="/homecards" element={<EventsSection />} />
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
          <Route path="/merch" element={<MerchCards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
          
          </Route>
          <Route path="/profile" element={<Profile />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <UserDash />
                  <Event />
                </>
              }
            />
            <Route path="/carrito" element={<ShoppingCart />} />
            <Route path="/mypurchases" element={<MyPurchases />} />
        </Routes>
        <Footer />
      </ShoppingCardProvider>
    </AuthProvider>
  );
}

export default App;
