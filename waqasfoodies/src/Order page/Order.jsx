import React, { useState, useEffect } from "react";
import "./Order.css";

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [extras, setExtras] = useState({ ketchup: false, sauce: false });
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState(""); // New state for additional notes
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
  });

  // Fetch cart data from localStorage
  const fetchCartData = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const totalAmount = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  useEffect(() => {
    fetchCartData();

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        fetchCartData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle extra charges for selected items
  const calculateExtras = () => {
    let extraCost = 0;
    if (extras.ketchup) extraCost += 50;
    if (extras.sauce) extraCost += 50;
    return extraCost;
  };

  const handleExtrasChange = (e) => {
    setExtras({ ...extras, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the state based on the field being updated
    if (name === "name") {
      setName(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, name: false }));
      }
    } else if (name === "phone") {
      setPhone(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, phone: false }));
      }
    } else if (name === "address") {
      setAddress(value);
      if (value) {
        setErrors((prevErrors) => ({ ...prevErrors, address: false }));
      }
    }
  };

  const handleConfirmOrder = () => {
    // Check if any required fields are empty
    let formValid = true;
    const newErrors = {
      name: !name,
      phone: !phone,
      address: !address,
    };

    setErrors(newErrors);

    // If any field is empty, stop order submission
    if (newErrors.name || newErrors.phone || newErrors.address) {
      formValid = false;
      // Focus on the first empty field
      if (newErrors.name) {
        document.getElementById("nameInput").focus();
      } else if (newErrors.phone) {
        document.getElementById("phoneInput").focus();
      } else if (newErrors.address) {
        document.getElementById("addressInput").focus();
      }
    }

    if (!formValid) {
      return; // Stop further execution if validation fails
    }

    // Prepare message to send to WhatsApp with improved formatting
    const extrasText = [];
    if (extras.ketchup) extrasText.push("• Extra Ketchup: PKR 50");
    if (extras.sauce) extrasText.push("• Extra Sauce: PKR 50");

    const orderDetails = `
      *Customer Details:*\n
*Full Name:* ${name ? `*${name}*` : "Not Provided"}
*Phone Number:* ${phone ? phone : "Not Provided"}
*Delivery Address:* ${address ? address : "Not Provided"}

 *Additional Notes:*\n
${notes || "• No additional notes"}

 *Order Summary:*\n
      ${cartItems
        .map(
          (item) =>
            `*Item:*   ${item.name}\n*Size:* ${
              item.selectedSize
            }\n*Quantity:* ${item.quantity}\n*Price:* PKR ${
              item.price * item.quantity
            }\n`
        )
        .join("\n")}
 *Total:*  
 PKR ${total + calculateExtras()}
 `;

    const whatsappURL = `https://wa.me/+923234141346?text=${encodeURIComponent(
      orderDetails
    )}`;

    // Open WhatsApp to send message
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <div className="order-container">
        <div className="order-details">
          <h2 className="order-details-title">Order Details</h2>
          <input
            id="nameInput"
            name="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleChange}
            className={`order-input-name ${errors.name ? "error" : ""}`}
            required
          />
          {errors.name && (
            <p className="error-message">This field is required</p>
          )}

          <input
            id="phoneInput"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={handleChange}
            className={`order-input-phone ${errors.phone ? "error" : ""}`}
            required
          />
          {errors.phone && (
            <p className="error-message">This field is required</p>
          )}

          <textarea
            id="addressInput"
            name="address"
            placeholder="Delivery Address"
            value={address}
            onChange={handleChange}
            className={`order-textarea-address ${
              errors.address ? "error" : ""
            }`}
            required
          />
          {errors.address && (
            <p className="error-message">This field is required</p>
          )}

          <textarea
            placeholder="Additional Notes (e.g., specific instructions)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="order-textarea-notes"
          />
        </div>

        <div className="order-summary">
          <h2 className="order-summary-title">Order Summary</h2>
          <div className="summary-items-container">
            {cartItems.map((item) => (
              <div key={item._id + item.selectedSize} className="summary-item">
                <p className="summary-item-name">Name: {item.name}</p>
                <p className="summary-item-size">Size: {item.selectedSize}</p>
                <p className="summary-item-quantity">
                  Quantity: {item.quantity}
                </p>
                <p className="summary-item-price">
                  Price: PKR {item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <h3 className="order-total">
            Total: PKR {total + calculateExtras()}
          </h3>

          <button onClick={handleConfirmOrder} className="order-confirm-button">
            Confirm Order
          </button>
        </div>
      </div>
      <p className="delivery-charges-note">*Delivery charges may apply*</p>
    </>
  );
};

export default Order;
