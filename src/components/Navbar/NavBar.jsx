import React, { useContext } from 'react';
import '../NavBar/NavBar.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faPhone, faAddressBook, faSearch, faShop } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import { ShoppingCardContext } from "../../contexts/ShoppingCardContext";

const NavBar = () => {
  const { cartItems } = useContext(ShoppingCardContext);
  const navigate = useNavigate(); 
 

  const handleLoginClick = () => {
    navigate('/profile'); // Redirige a la página del perfil
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

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar eventos..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {/* Iconos de login y carrito */}
      <div className="navbar-icons">
        <div onClick={() => navigate('/merch')} className="icon">
          <FontAwesomeIcon icon={faShop} />
          <span>Productos</span>
        </div>
        <div onClick={() => navigate('/desarrolladores')} className="icon">
          <FontAwesomeIcon icon={faPhone} />
          <span>Sobre nosotros</span>
        </div>
        <div onClick={() => navigate('/contact')} className="icon">
          <FontAwesomeIcon icon={faAddressBook} />
          <span>Contáctanos</span>
        </div>
        <div onClick={handleLoginClick} className="icon">
          <FontAwesomeIcon icon={faUser} />
          <span>Ingresar!</span>
        </div>
        <div onClick={handleCartClick} className="icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Carrito ({cartItems.length})</span> {/* Muestra la cantidad de artículos */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
