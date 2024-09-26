import React, { useState } from "react";
import '../NavBar/NavBar.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faPhone, faAddressBook, faSearch, faShop } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import Swal from 'sweetalert'; // Importa SweetAlert

const NavBar = () => {
  const navigate = useNavigate();
  
  // Estado local para el carrito de compras (esto podría ser reemplazado por un contexto o un estado global)
  const [cartItems, setCartItems] = useState([]); // Debes tener un método para actualizar este estado según la lógica de tu aplicación

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Manejar la visualización del carrito
  const handleCartClick = () => {
    if (cartItems.length > 0) {
      Swal({
        title: 'Tu Carrito',
        text: `Tu carrito tiene ${cartItems.length} artículo(s).`,
        icon: 'info',
        button: 'Ver carrito',
      }).then(() => {
        handleNavigate('/cart'); // Navega a la página del carrito
      });
    } else {
      Swal({
        title: 'Carrito Vacío',
        text: 'Tu carrito está vacío.',
        icon: 'warning',
        button: 'Entendido',
      });
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div onClick={() => handleNavigate('')} className="icon navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar eventos..." />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {/* Iconos de login y carrito */}
      <div className="navbar-icons">
        <div onClick={() => handleNavigate('/merch')} className="icon">
        <FontAwesomeIcon icon={faShop} />
          <span>Productos</span>
        </div>
        <div onClick={() => handleNavigate('/desarrolladores')} className="icon">
          <FontAwesomeIcon icon={faPhone} />
          <span>Sobre nosotros</span>
        </div>
        <div onClick={() => handleNavigate('/contact')} className="icon">
          <FontAwesomeIcon icon={faAddressBook} />
          <span>Contáctanos</span>
        </div>
        <div onClick={() => handleNavigate('/login')} className="icon">
          <FontAwesomeIcon icon={faUser} />
          <span>Ingresar!</span>
        </div>
        <div onClick={handleCartClick} className="icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Carrito</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
