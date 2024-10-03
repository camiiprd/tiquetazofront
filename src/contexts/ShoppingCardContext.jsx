import React, { createContext, useState } from 'react';

export const ShoppingCardContext = createContext();

export const ShoppingCardProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(prevItem => prevItem.id === item.id);
            if (existingItem) {
                return prevItems.map(prevItem =>
                    prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }]; // Inicializa la cantidad en 1 en lugar de 0
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, change) => {
        setCartItems(prevItems => 
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) } // Evita que la cantidad sea menor que 1
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <ShoppingCardContext.Provider value={{ cartItems, addItemToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </ShoppingCardContext.Provider>
    );
};
