import React, { useContext, useState } from 'react'; 
import { FaTrashAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ShoppingCardContext } from '../../contexts/ShoppingCardContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const { cartItems, removeFromCart, clearCart, updateQuantity, getTotal } = useContext(ShoppingCardContext);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
    const navigate = useNavigate();

    const total = getTotal();

    const handleRemoveClick = (itemId) => {
        setItemToRemove(itemId);
        setShowRemoveModal(true);
    };

    const confirmRemove = () => {
        removeFromCart(itemToRemove);
        setShowRemoveModal(false);
        setItemToRemove(null);
    };
    
    const calculateTotal = (items) => {
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const finalizePurchase = async () => {
        // Verificar si se ha seleccionado un método de pago
        if (!paymentMethod) {
            alert('Por favor, selecciona un método de pago para continuar.');
            return;
        }

        // Validación de campos según el método de pago
        if ((paymentMethod === 'Tarjeta de Crédito' || paymentMethod === 'Tarjeta de Débito') && 
            (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
            alert('Por favor, complete todos los campos de la tarjeta.');
            return;
        }
        // No se requiere validación para Transferencia Bancaria

        try {
            const totalAmount = calculateTotal(cartItems); 
            const itemTitle = cartItems.length > 0 ? cartItems[0].title : 'Sin título'; 

            const purchaseData = {
                items: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: totalAmount,
                paymentMethod: paymentMethod,
                itemTitle: itemTitle,
                price: totalAmount,
            };

            const response = await fetch("http://localhost:4000/api/purchases", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(purchaseData),
            });

            if (!response.ok) {
                throw new Error("Error al procesar la compra");
            }

            const data = await response.json();
            clearCart();
            setShowPaymentModal(false);
            navigate('/mypurchases');
        } catch (error) {
            console.error("Error al procesar la compra:", error);
        }
    };

    return (
        <div className="shopping-cart">
            <h1>Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <h3>{item.title}</h3>
                                <p>Precio: ${item.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                                <button onClick={() => handleRemoveClick(item.id)}>
                                    <FaTrashAlt /> Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <div className="cart-actions">
                            <Button variant="danger" onClick={clearCart}>Vaciar Carrito</Button>
                            <Button variant="success" onClick={() => setShowPaymentModal(true)}>Finalizar Compra</Button>
                        </div>
                    </div>
                </>
            )}

            {/* Modal de Confirmación de Eliminación */}
            <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro que deseas eliminar este ítem?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={confirmRemove}>Eliminar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Finalización de Compra */}
            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona un Método de Pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Selecciona un método</option>
                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                        <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                        <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    </select>
                    
                    {paymentMethod === 'Tarjeta de Crédito' && (
                        <div>
                            <h5>Detalles de la Tarjeta</h5>
                            <input type="text" placeholder="Número de tarjeta" onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
                            <input type="text" placeholder="Fecha de expiración (MM/AA)" onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                            <input type="text" placeholder="CVV" onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                        </div>
                    )}
                    
                    {paymentMethod === 'Tarjeta de Débito' && (
                        <div>
                            <h5>Detalles de la Tarjeta</h5>
                            <input type="text" placeholder="Número de tarjeta" onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
                            <input type="text" placeholder="Fecha de expiración (MM/AA)" onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                            <input type="text" placeholder="CVV" onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                        </div>
                    )}
                    
                    {paymentMethod === 'Transferencia Bancaria' && (
                        <div>
                            <h5>Detalles de Transferencia</h5>
                            <h6><strong>CBU de Tiquetazo:</strong> 1234567890123456789012</h6>
                            <h6><strong>Alias de Tiquetazo:</strong> tiquetazo_alias</h6>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>Cancelar</Button>
                    <Button variant="success" onClick={finalizePurchase}>Confirmar Compra</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShoppingCart;
