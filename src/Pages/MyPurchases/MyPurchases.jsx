import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MyPurchases.css';

const PurchaseItem = ({ item }) => (
  <li>
    {item.quantity} x - {item.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
  </li>
);

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchPurchases() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/purchases');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPurchases(data);

        // Calcular el total gastado
        const total = data.reduce((acc, purchase) => acc + (purchase.total || 0), 0);
        setTotalSpent(total);
      } catch (error) {
        console.error("Error fetching purchases:", error);
        setError("No se pudieron cargar las compras.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPurchases();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`http://localhost:4000/api/purchases/${itemId}`, { method: 'DELETE' });
      setPurchases(purchases.filter(purchase => purchase._id !== itemId));
      setTotalSpent(totalSpent - purchases.find(p => p._id === itemId).total);
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
    }
  };

  const handleViewItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/purchases/${itemId}`);
      if (!response.ok) throw new Error('No se pudo obtener los detalles de la compra');
      const itemData = await response.json();
      setSelectedItem(itemData);
      setShowModal(true);
    } catch (error) {
      console.error('Error al obtener detalles de la compra:', error.message);
    }
  };

  if (isLoading) return <div>Cargando tus compras...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="my-purchases">
      <h1>Mis Compras</h1>
      
      {purchases.length === 0 ? (
        <p>No has realizado compras aún.</p>
      ) : (
        <ul>
          {purchases.map((purchase) => (
            <li key={purchase._id} className="purchase-item">
              <div className="purchase-header">
                <h3>{purchase.itemTitle || "Compra sin título"}</h3>
                <p>Fecha: {new Date(purchase.date).toLocaleDateString()}</p>
                <p>Método de Pago: {purchase.paymentMethod || "No especificado"}</p>
              </div>
              <ul>
                {Array.isArray(purchase.items) && purchase.items.length > 0 ? (
                  purchase.items.map(item => (
                    <li key={item._id}>
                      {item.quantity} x - {item.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      {/* Aquí agregar el nombre del producto */}
                      {item.productName && ` ${item.productName}`} 
                    </li>
                  ))
                ) : (
                  <li>No hay productos en esta compra.</li>
                )}
              </ul>
              <p className="purchase-total">Total de la compra: {purchase.total?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <button onClick={() => handleViewItem(purchase._id)}>Ver</button>
              <button onClick={() => handleDeleteItem(purchase._id)}>Eliminar</button>
            </li>
          ))}
        </ul>

        
      )}

        

      {/* Modal de Bootstrap para ver detalles de la compra */}
      <Modal id="purchaseDetailsModal" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.itemTitle || "Detalles de la compra"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <>
              <h4>{selectedItem.itemTitle || "Título no disponible"}</h4>
              <p>Fecha: {new Date(selectedItem.date).toLocaleDateString()} {new Date(selectedItem.date).toLocaleTimeString()}</p>
              <p>Método de Pago: {selectedItem.paymentMethod || "No especificado"}</p>

              {/* Mostrar cada producto en el arreglo items con nombre */}
              {Array.isArray(selectedItem.items) && selectedItem.items.length > 0 ? (
                <ul>
                  {selectedItem.items.map((item) => (
                    <li key={item._id}>
                      {item.quantity} x - {item.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      {item.productName && ` ${item.productName}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay productos en esta compra.</p>
              )}

              <p>Total de la compra: {selectedItem.total?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || "No especificado"}</p>

              {/* Mostrar imagen si está disponible */}
              {selectedItem.productImage ? (
                <img src={selectedItem.productImage} alt={selectedItem.itemTitle || "Imagen del producto"} style={{ width: '100%', marginTop: '10px' }} />
              ) : (
                <p>No hay imagen disponible.</p>
              )}
            </>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <h1>Total gastado: {totalSpent.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
    </div>
  );
};

export default MyPurchases;