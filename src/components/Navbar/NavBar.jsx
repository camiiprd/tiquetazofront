import React, { useContext } from 'react';
import '../NavBar/NavBar.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faPhone, faAddressBook, faSearch, faShop , faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import { ShoppingCardContext } from "../../contexts/ShoppingCardContext";
import Cookies from "js-cookie";

const NavBar = () => {
  const { cartItems } = useContext(ShoppingCardContext);
  const navigate = useNavigate(); 

  // Cargar el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Función para manejar el click de login o logout
  const handleLoginClick = () => {
    if (user) {
      // Si el usuario está logueado, ir al perfil y mostrar "Cerrar sesión"
      navigate('/dashboard');
    } else {
      // Si el usuario no está logueado, ir a la página de login
      navigate('/login');
    }
  };

  const handleLogout = () => {
    // Limpiar sesión: eliminar usuario de localStorage y token de cookies
    localStorage.removeItem('user');
    Cookies.remove('token');
    navigate('/');  // Redirigir al inicio después de hacer logout
  };

  const handleCartClick = () => {
    navigate('/carrito'); // Redirige a la página del carrito
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="icon navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      
      {/* Iconos de navegación */}
      <div className="navbar-icons">
        {user ? (
          // Si el usuario está logueado, muestra las opciones de perfil, mis compras y cerrar sesión
          <>
            <div onClick={() => navigate('/dashboard')} className="icon">
              <FontAwesomeIcon icon={faShop} />
              <span>Dashboard</span>
            </div>
            <div onClick={() => navigate('/merch')} className="icon">
              <FontAwesomeIcon icon={faShop} />
              <span>Productos</span>
            </div>
            <div onClick={() => navigate('/desarrolladores')} className="icon">
              <FontAwesomeIcon icon={faLaptopCode} />
              <span>Sobre nosotros</span>
            </div>
            <div onClick={() => navigate('/contact')} className="icon">
              <FontAwesomeIcon icon={faAddressBook} />
              <span>Contáctanos</span>
            </div>
            <div onClick={handleLogout} className="icon">
              <FontAwesomeIcon icon={faUser} />
              <span>Cerrar sesión</span> {/* Opción para cerrar sesión */}
            </div>
            <div onClick={() => navigate('/mypurchases')} className="icon">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Mis Compras</span> {/* Opción para mis compras */}
            </div>
          </>
        ) : (
          // Si no está logueado, muestra las opciones básicas y "Ingresar"
          <>
            <div onClick={() => navigate('/merch')} className="icon">
              <FontAwesomeIcon icon={faShop} />
              <span>Productos</span>
            </div>
            <div onClick={() => navigate('/desarrolladores')} className="icon">
              <FontAwesomeIcon icon={faLaptopCode} />
              <span>Sobre nosotros</span>
            </div>
            <div onClick={() => navigate('/contact')} className="icon">
              <FontAwesomeIcon icon={faAddressBook} />
              <span>Contáctanos</span>
            </div>
            <div onClick={handleLoginClick} className="icon">
              <FontAwesomeIcon icon={faUser} />
              <span>Ingresar</span> {/* Opción para ingresar si no está logueado */}
            </div>
          </>
        )}
        
        {/* Carrito */}
        <div onClick={handleCartClick} className="icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Carrito ({cartItems.length})</span> {/* Muestra la cantidad de artículos en el carrito */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
