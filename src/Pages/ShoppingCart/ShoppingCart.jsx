import React, { useContext, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ShoppingCart.css';
import { ShoppingCardContext } from '../../contexts/ShoppingCardContext';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(ShoppingCardContext);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const userId = 'YOUR_USER_ID';
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const total = cartItems.reduce((acc, item) => {
    try {
      return acc + parseFloat(item.price.slice(1)) * item.quantity;
    } catch (error) {
      console.error("Error al calcular el total:", error);
      return acc;
    }
  }, 0);

  const handleRemoveClick = (itemId) => {
    setShowModal(true);
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    removeFromCart(itemToRemove);
    setShowModal(false);
    setItemToRemove(null);
  };

  const handleIncreaseQuantity = (itemId) => {
    updateQuantity(itemId, 1); // Incrementar la cantidad
  };

  const handleDecreaseQuantity = (itemId) => {
    updateQuantity(itemId, -1); // Decrementar la cantidad
  };

  const finalizePurchase = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems, total, userId }),
      });
  
      if (response.ok) {
        console.log("Compra exitosa");
        clearCart();
        setShowSuccessModal(true);
      } else {
        console.error("Error finalizando la compra:", await response.json());
      }
    } catch (error) {
      console.error("Error finalizando la compra:", error);
    }
  };
  
  return (
    <div className="shopping-cart">
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title} (Cantidad: {item.quantity})</h3>
                <p>{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </div>
                <button onClick={() => handleRemoveClick(item.id)}>
                  <FaTrashAlt /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <div className="cart-actions">
          <Button variant="danger" onClick={clearCart}>Limpiar Carrito</Button>
          <Button variant="success" onClick={finalizePurchase}>Finalizar Compra</Button>
        </div>
      </div>

      {/* Modal de confirmación para eliminar un ítem */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este ítem?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmRemove}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de compra exitosa */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Compra Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu compra ha sido completada con éxito. ¡Gracias por tu compra!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
