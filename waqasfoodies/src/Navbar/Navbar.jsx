import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import MenuImage from "../assets/Menu.png";
import CartImage from "../assets/Cart.png";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Keep track of cart count in state
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOrderNowClick = () => {
    navigate("/Menu");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.reduce((total, item) => total + item.quantity, 0)); // Sum up quantities
  };

  const handleStorageChange = () => {
    updateCartCount();
  };

  useEffect(() => {
    updateCartCount();

    // Listen for changes in localStorage (to update cart count on other tabs)
    window.addEventListener("storage", handleStorageChange);

    // Listen for the custom 'cartUpdated' event to update cart count when an item is added
    const handleCartUpdated = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    // Close menu when clicking outside
    const closeMenuOnClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickOutside);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdated);
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar" id="navbar">
      <div className="heading-container" id="heading-container">
        <h1 className="heading" id="navbar-heading">
          Waqas
        </h1>
        <h2 className="subheading" id="navbar-subheading">
          Foodies
        </h2>
      </div>
      <div className="menu-icon" id="navbar-menu-icon" onClick={toggleMenu}>
        <img src={MenuImage} alt="Menu" id="menu-image" />
      </div>
      <ul className={`nav-links ${isMenuOpen ? "show" : ""}`} id="nav-links">
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/menu" onClick={handleLinkClick}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/About" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li>
          <Link to="/Location" onClick={handleLinkClick}>
            Location
          </Link>
        </li>
        <li>
          <Link to="/Contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </li>
        <li>
          <button className="order1" onClick={handleOrderNowClick}>
            Order Now
          </button>
        </li>
      </ul>
      <Link to="cart" id="navbar-cart-link">
        <div className="navbar-cart-container">
          <img src={CartImage} alt="Cart" className="cart-icon" />
          {cartCount > 0 && <div className="cart-item-count">{cartCount}</div>}
        </div>
      </Link>
      {isMenuOpen && <div className="overlay"></div>}{" "}
      {/* To darken the area outside menu */}
    </nav>
  );
}

export default NavBar;
