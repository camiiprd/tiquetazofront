import React from "react";
import '../NavBar/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faPhone, faAddressBook, } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png"
const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar eventos..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon"/>
      </div>

      {/* Iconos de login y carrito */}
      <div className="navbar-icons">
      <div className="icon">
          <FontAwesomeIcon icon={faPhone} /> {<i class="fa-solid fa-phone"></i>}
          <span>Sobre nosotros</span>
        </div>
      <div className="icon">
          <FontAwesomeIcon icon={faAddressBook} /> {<i class="fa-solid fa-address-book"></i>}
          <span>Contactanos</span>
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faUser} /> {<i class="fa-solid fa-user fa-beat"></i>}
          <span>Ingresar!</span>
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faShoppingCart} /> {<i class="fa-solid fa-cart-shopping fa-beat"></i>}
          <span>Carrito</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;