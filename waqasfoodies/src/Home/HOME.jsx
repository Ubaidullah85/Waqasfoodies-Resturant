import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Home.css";
import pizza from "../assets/pizza.jpeg";
import burger from "../assets/burger.jpeg";
import shuwarma from "../assets/shuarma.jpeg";
import sandwich from "../assets/sandwiches.jpeg";
// import nuggets from "../assets/nuggets.jpeg";
import pasta from "../assets/pasta.jpeg";
import feature1 from "../assets/feautre1.jpg";
import feature2 from "../assets/feature 2.jpg";
import Deals from "./deals1.jpg";
import Footer from "../Footer/Footer";

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleExplore = (category) => {
    navigate(`/Menu?category=${category}`); // Navigate to MENU with category as a query param
  };

  // Function to navigate to OrderForm
  const handleOrderNowClick = () => {
    navigate("/OrderForm");
  };

  return (
    <>
      <div className="homepage">
        <h1 className="headinghome">Category</h1>
        <div className="items-grid">
          <div
            className="item-card"
            onClick={() => handleExplore("Deals")} // Make the entire card clickable
          >
            <img src={Deals} alt="Pizza" className="item-image" />
            <h3 className="item-name">Deals</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Pizza")} // Make the entire card clickable
          >
            <img src={pizza} alt="Pizza" className="item-image" />
            <h3 className="item-name">Pizza</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Burger")} // Card click functionality
          >
            <img src={burger} alt="Burger" className="item-image" />
            <h3 className="item-name">Burger</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Shawarma")} // Make the entire card clickable
          >
            <img src={shuwarma} alt="Shawarma" className="item-image" />
            <h3 className="item-name">Shawarma</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Broast")} // Make the entire card clickable
          >
            <img
              src="https://i.pinimg.com/736x/ff/d1/28/ffd128823f956492dcba1395e341d27b.jpg"
              alt="Icecream"
              className="item-image"
            />
            <h3 className="item-name">Broast</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Sandwich")} // Make the entire card clickable
          >
            <img src={sandwich} alt="Sandwich" className="item-image" />
            <h3 className="item-name">Sandwiches</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("sides", "Nuggets")} // Make the entire card clickable
          >
            <img
              src="https://i.pinimg.com/736x/c2/6e/93/c26e930f6356a41fdcc6ea7efe8091df.jpg"
              alt="Nuggets"
              className="item-image"
            />
            <h3 className="item-name">Sides</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Pasta")} // Make the entire card clickable
          >
            <img src={pasta} alt="Pasta" className="item-image" />
            <h3 className="item-name">Pasta</h3>
          </div>
          <div
            className="item-card"
            onClick={() =>
              handleExplore(
                "Ice-cream",
                "Ice Cream Shakes",
                "Ice Cream Slush and Cup"
              )
            } // Make the entire card clickable
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ArY8KDLxjxZR8XLPOWDcrjQP68jCsixLsQ&s"
              alt="Icecream"
              className="item-image"
            />
            <h3 className="item-name">Icecream</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Ice Cream Shakes")} // Make the entire card clickable
          >
            <img
              src="https://i.pinimg.com/236x/0a/25/62/0a2562540f4aa7b151c91e97024b2064.jpg"
              alt="Icecream Shakes "
              className="item-image"
            />
            <h3 className="item-name">Icecream Shakes</h3>
          </div>
          <div
            className="item-card"
            onClick={() => handleExplore("Ice Cream Slush and Cup")} // Make the entire card clickable
          >
            <img
              src="https://i.pinimg.com/736x/57/ff/65/57ff657ae55df30c2a8b19d87d046b2f.jpg"
              alt="Icecream"
              className="item-image"
            />
            <h3 className="item-name">Ice Cream Slush</h3>
          </div>{" "}
          <div
            className="item-card"
            onClick={() => handleExplore("Drinks")} // Make the entire card clickable
          >
            <img
              src="https://colanext.com/cnws/wp-content/uploads/2017/12/1-7-2.png"
              alt="Icecream"
              className="item-image"
            />
            <h3 className="item-name">Drinks</h3>
          </div>
        </div>
        {/* Featured Products */}
        <div className="featured-products">
          <h1 className="featureproduct">Featured Product</h1>
          <div className="featured-product">
            <img
              src={feature1}
              alt="Featured Product 1"
              className="featured-image"
            />
            <div className="product-details">
              <h3 className="featured-product-title">Shawarma Deal</h3>
              <p className="featured-product-description">
                "Get 5 crispy, juicy pieces of fried chicken for only 299 PKR!
                Treat yourself to the perfect bite at an unbeatable price!"
              </p>
              <button className="merabutton">Order Now</button>{" "}
            </div>
          </div>
          <div className="featured-product2">
            <img
              src={feature2}
              alt="Featured Product 2"
              className="featured-image2"
            />
            <div className="product-details">
              <h3 className="featured-product-title">Pasta Special</h3>
              <p className="featured-product-description">
                "Get 5 crispy, juicy pieces of fried chicken for only 299 PKR!
                Treat yourself to the perfect bite at an unbeatable price!"
              </p>
              <button className="merabutton">Order Now</button>
            </div>
          </div>

          {/* Delivery Sections */}
          <div className="delivery-section1">
            <img
              src="https://images-beta.tossdown.com/site/342e1184-bec9-46be-b79c-f9ad45915433.webp"
              alt="Delivery Charges"
              className="delivery-image"
            />
            <h4 className="delivery-title">Delivery Charges</h4>
            <p className="delivery-description">
              Delivery Charges may vary based on distance.
            </p>
          </div>

          <div className="delivery-section1">
            <img
              src="https://images-beta.tossdown.com/site/30e3bfab-7e7c-4f12-9466-a019784616b2.webp"
              alt="Same Day Delivery"
              className="delivery-image"
            />
            <h4 className="delivery-title">Same Day Delivery</h4>
            <p className="delivery-description">
              Enjoy Flexibility with Same Day Delivery and Pre-bookings
            </p>
          </div>

          <div className="delivery-section">
            <img
              src="https://images-beta.tossdown.com/site/f38a7e92-26a0-4090-bec4-f4ced47d244c.webp"
              alt="Delivery Timings"
              className="delivery-image"
            />
            <h4 className="delivery-title">Delivery Timings</h4>
            <p className="delivery-description">
              Delivery Service Available between 5 PM and 3:30 AM
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
