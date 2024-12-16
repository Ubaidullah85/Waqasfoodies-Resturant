import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch cart data from localStorage and update state
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    updateTotal(storedCart);

    // Listen to the 'storage' event for localStorage updates in other tabs
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updatedCart);
      updateTotal(updatedCart);
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // This effect will run once when the component mounts

  // Update the total cost of the cart
  const updateTotal = (items) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  // Add item to cart or increase quantity if item with the same name, size, and category exists
  const addItemToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem._id === item._id &&
        cartItem.selectedSize === item.selectedSize &&
        cartItem.category === item.category
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cartItems, item];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  // Increase item quantity
  const increaseQuantity = (id, size, category) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id &&
      item.selectedSize === size &&
      item.category === category
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (id, size, category) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id &&
      item.selectedSize === size &&
      item.category === category
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  // Remove item from cart
  const removeItem = (id, size, category) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item._id === id &&
          item.selectedSize === size &&
          item.category === category
        )
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  // Render the cart items
  return (
    <div className="cart-container">
      <div className="containercari">
        <h1 className="cart-title">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty!</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id + item.selectedSize} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">PKR {item.price}</span>
                  <span className="cart-item-size">
                    Size: {item.selectedSize}
                  </span>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item._id,
                          item.selectedSize,
                          item.category
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item._id,
                          item.selectedSize,
                          item.category
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <span className="cart-item-total">
                    Total: PKR {item.price * item.quantity}
                  </span>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() =>
                    removeItem(item._id, item.selectedSize, item.category)
                  }
                >
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-trash-b-256.png"
                    alt=""
                    className="trash"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-total">
        <h3 className="total">Total: PKR {total}</h3>
        <button
          className="proceed-to-order"
          onClick={() => navigate("/order")} // This will navigate to the order page
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
