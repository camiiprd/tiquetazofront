import React from "react";
import '../NavBar/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faPhone, faAddressBook, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  // Función para redireccionar 
  const handleNavigate = () => {
    navigate('/carrito'); // Redirige a la página del carrito
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar eventos..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {/* Iconos de login y carrito */}
      <div className="navbar-icons">
        <div className="icon">
          <FontAwesomeIcon icon={faPhone} />
          <span>Sobre nosotros</span>
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faAddressBook} />
          <span>Contactanos</span>
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faUser} />
          <span>Ingresar!</span>
        </div>
        <div onClick={handleNavigate}  className="icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Carrito</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
