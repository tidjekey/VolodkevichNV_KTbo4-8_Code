"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/api";
import {
  addToUserCart,
  getUserCart,
  removeFromCart,
} from "../api/personal.api";

interface Cart {
  addItem: any;
  removeItem: any;
  cart: any[];
}

const initCart: Cart = {
  addItem: (itemId: any) => {},
  removeItem: (itemId: any) => {},
  cart: [],
};

export const CartContext = createContext(initCart);

const CartContextProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>(() =>
    JSON.parse(localStorage?.getItem("cart") || "[]")
  );

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (user) {
        getUserCart()
          .then((data) => setCart(data))
          .catch((e) => console.log(e));
      }
    })();
  }, []);

  const updateLocalCart = () => {
    localStorage?.setItem("cart", JSON.stringify(cart));
  };

  const addItem = async (itemId: any) => {
    const user = await getCurrentUser();
    if (user) {
      const data = await addToUserCart({ carpet_id: Number(itemId) });
    }
    setCart((prev: any) => [...prev, itemId]);
  };

  const removeItem = async (itemId: any) => {
    const user = await getCurrentUser();
    if (user) {
      const data = await removeFromCart({ carpet_id: Number(itemId) });
    }
    setCart((prev: any) => prev.filter((e: any) => e != itemId));
  };

  useEffect(() => {
    updateLocalCart();
  }, [cart]);

  return (
    <CartContext.Provider value={{ addItem, removeItem, cart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export default CartContextProvider;
