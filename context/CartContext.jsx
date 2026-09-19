'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { showToast as triggerToast, updateCartBadge } from '@/lib/main';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const syncCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('harmonia_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  };

  // Load cart on mount and listen to storage / custom updates
  useEffect(() => {
    syncCartFromStorage();

    const handleCartUpdate = () => {
      syncCartFromStorage();
      updateCartBadge();
    };

    window.addEventListener('harmonia_cart_updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('harmonia_cart_updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem('harmonia_cart', JSON.stringify(cart));
      updateCartBadge();
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    triggerToast(message, type);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product?.id === product.id || item.id === product.id
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 1) + quantity;
        return newCart;
      } else {
        return [...prevCart, { product, id: product.id, quantity }];
      }
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => (item.product?.id || item.id) !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.product?.id || item.id) === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const cartTotal = cart.reduce((total, item) => {
    const price = item.product ? item.product.price : item.price || 0;
    return total + price * (item.quantity || 1);
  }, 0);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        toastMessage,
        showToast,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        searchQuery,
        setSearchQuery,
        formatPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
