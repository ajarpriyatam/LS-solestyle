import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const MINIMUM_ORDER_QUANTITY = 48;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      const parsedCart = JSON.parse(existingCartItem);
      // Ensure all cart items meet minimum quantity requirement
      const validatedCart = parsedCart.map(item => ({
        ...item,
        quantity: Math.max(item.quantity, MINIMUM_ORDER_QUANTITY)
      }));
      setCart(validatedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      // Remove from localStorage if cart is empty
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Helper function to validate minimum quantity
  const validateMinimumQuantity = (quantity) => {
    return Math.max(quantity, MINIMUM_ORDER_QUANTITY);
  };

  // Helper function to add item to cart with minimum quantity validation
  const addToCart = (newItem) => {
    const validatedItem = {
      ...newItem,
      quantity: validateMinimumQuantity(newItem.quantity)
    };

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === validatedItem.id
      );

      if (existingItemIndex !== -1) {
        // Update existing item quantity (maintain minimum)
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity = validateMinimumQuantity(
          updatedCart[existingItemIndex].quantity + validatedItem.quantity
        );
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, validatedItem];
      }
    });
  };

  // Helper function to update quantity with minimum validation
  const updateQuantity = (id, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: validateMinimumQuantity(newQuantity) }
          : item
      )
    );
  };

  // Create backward compatible value that supports both array and object destructuring
  const contextValue = [
    cart,
    setCart,
    {
      cart,
      setCart,
      addToCart,
      updateQuantity,
      removeItem: (id) => setCart(prevCart => prevCart.filter(item => item.id !== id)),
      MINIMUM_ORDER_QUANTITY
    }
  ];

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
