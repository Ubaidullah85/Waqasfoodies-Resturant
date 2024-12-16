import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchItems } from "./api";
import "./itemDetails.css";

const ItemDetail = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("large");
  const [price, setPrice] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const loadItemDetails = async () => {
      try {
        const items = await fetchItems();
        const selectedItem = items.find((item) => item._id === id);
        if (selectedItem) {
          setItemDetails(selectedItem);
          // Set the initial price based on the category
          if (/pizza/i.test(selectedItem.category)) {
            setPrice(selectedItem.largePrice);
          } else {
            setPrice(selectedItem.price);
          }
        } else {
          setItemDetails(null);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
        setItemDetails(null);
      } finally {
        setLoading(false);
      }
    };

    loadItemDetails();
  }, [id]);

  const handleSizeChange = (e) => {
    const selected = e.target.value;
    setSelectedSize(selected);

    if (/pizza/i.test(itemDetails.category)) {
      if (selected === "small") {
        setPrice(itemDetails.smallPrice);
      } else if (selected === "medium") {
        setPrice(itemDetails.mediumPrice);
      } else if (selected === "large") {
        setPrice(itemDetails.largePrice);
      }
    } else if (/ice cream slush and cup/i.test(itemDetails.category)) {
      if (selected === "small") {
        setPrice(itemDetails.smallPrice);
      } else if (selected === "medium") {
        setPrice(itemDetails.mediumPrice);
      } else if (selected === "special") {
        setPrice(itemDetails.specialPrice);
      }
    } else if (/ice cream shakes/i.test(itemDetails.category)) {
      if (selected === "small") {
        setPrice(itemDetails.smallPrice);
      } else if (selected === "large") {
        setPrice(itemDetails.largePrice);
      }
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem._id === itemDetails._id &&
        cartItem.selectedSize === selectedSize
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      const cartItem = {
        _id: itemDetails._id,
        name: itemDetails.name,
        selectedSize: selectedSize,
        price: price,
        quantity: 1,
      };
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger a custom event to notify the cart count change
    window.dispatchEvent(new Event("cartUpdated"));

    // Trigger vibration on adding to the cart (if supported by device)
    if (navigator.vibrate) {
      navigator.vibrate(200); // Vibrates for 200ms
    }

    // Show the notification for 3 seconds
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!itemDetails) {
    return (
      <div className="error-container">
        <p>Item not found!</p>
      </div>
    );
  }

  const isPizza = /pizza/i.test(itemDetails.category);
  const isIceCreamSlushAndCup = /ice cream slush and cup/i.test(
    itemDetails.category
  );
  const isIceCreamShakes = /ice cream shakes/i.test(itemDetails.category);

  return (
    <div className="item-detail-container">
      <div className="item-detail-left">
        <img
          src={itemDetails.image}
          alt={itemDetails.name}
          className="item-detail-image"
        />
      </div>
      <div className="item-detail-right">
        <h1 className="item-detail-name">{itemDetails.name}</h1>
        <p className="item-detail-price">PKR {price}</p>
        <p className="description-of-item">{itemDetails.description}</p>

        {isPizza && (
          <div className="size-options">
            <label className="choose" htmlFor="size">
              Choose size:
            </label>
            <div className="input-in-rows">
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="small"
                  onChange={handleSizeChange}
                  checked={selectedSize === "small"}
                />
                S
              </label>
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="medium"
                  onChange={handleSizeChange}
                  checked={selectedSize === "medium"}
                />
                M
              </label>
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="large"
                  onChange={handleSizeChange}
                  checked={selectedSize === "large"}
                />
                L
              </label>
            </div>
          </div>
        )}

        {isIceCreamSlushAndCup && (
          <div className="size-options">
            <label className="choose" htmlFor="size">
              Choose size:
            </label>
            <div className="input-in-rows">
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="small"
                  onChange={handleSizeChange}
                  checked={selectedSize === "small"}
                />
                Small
              </label>
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="medium"
                  onChange={handleSizeChange}
                  checked={selectedSize === "medium"}
                />
                Medium
              </label>
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="special"
                  onChange={handleSizeChange}
                  checked={selectedSize === "special"}
                />
                Special
              </label>
            </div>
          </div>
        )}

        {isIceCreamShakes && (
          <div className="size-options">
            <label className="choose" htmlFor="size">
              Choose size:
            </label>
            <div className="input-in-rows">
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="small"
                  onChange={handleSizeChange}
                  checked={selectedSize === "small"}
                />
                Small
              </label>
              <label>
                <input
                  className="input-size"
                  type="radio"
                  name="size"
                  value="large"
                  onChange={handleSizeChange}
                  checked={selectedSize === "large"}
                />
                Large
              </label>
            </div>
          </div>
        )}

        <button className="add-to-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        {showNotification && (
          <div className="item-added-notification">
            <p>{itemDetails.name} added to cart!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
