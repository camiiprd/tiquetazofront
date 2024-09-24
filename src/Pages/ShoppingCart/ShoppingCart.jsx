import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Concierto A', price: 100 },//Esto se debe eliminar y dejar vasio es solo paramostrar como es
    { id: 2, name: 'Concierto B', price: 150 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemoveClick = (itemId) => {
    setShowModal(true);
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    setCartItems(cartItems.filter(item => item.id !== itemToRemove));
    setShowModal(false);
    setItemToRemove(null);
  };

  const cancelRemove = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ${item.price}</span>
              <FaTrashAlt className="trash-icon" onClick={() => handleRemoveClick(item.id)} />
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        <h3>Total: ${total}</h3>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>¿Estás seguro de que deseas eliminar este ítem?</h4>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={confirmRemove}>Eliminar</button>
              <button className="cancel-button" onClick={cancelRemove}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
