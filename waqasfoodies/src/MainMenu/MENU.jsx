import React, { useState, useEffect } from "react";
import { fetchItems } from "./api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";
import CartImage from "../assets/Cart.png";
import Footer from "./../Footer/Footer";
import { use } from "react";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // const [selectedSize, setSelectedSize] = useState("large");
  const [selectedSizesspecial, setSelectedSizesspecial] = useState({});

  const [showFilter, setShowFilter] = useState(false);
  const [visibleItems, setVisibleItems] = useState(9);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [itemAddedMessage, setItemAddedMessage] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0); // Cart item count state

  const queryParams = new URLSearchParams(location.search);
  const categoryFromParams = queryParams.get("category");
  const navigate = useNavigate();
  useEffect(() => {
    const loadItems = async () => {
      // Fetch all items (or you can fetch only relevant items for optimization)
      const fetchedItems = await fetchItems();

      // Filter items based on the selected category from the query parameters
      const filtered = categoryFromParams
        ? fetchedItems.filter(
            (item) =>
              item.category.toLowerCase() === categoryFromParams.toLowerCase()
          )
        : fetchedItems;

      // Update state with the filtered items
      setItems(filtered);
      setFilteredItems(filtered); // You can also filter based on other criteria here
    };

    loadItems();
  }, [categoryFromParams]); // Re-fetch items whenever the category changes

  useEffect(() => {
    // Get cart count from localStorage on load
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setCartItemCount(
      storedCart.reduce((count, item) => count + item.quantity, 0)
    ); // Calculate total cart items count
  }, []);

  // Listen for changes in localStorage and vibrate the cart button
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
      setCartItemCount(
        updatedCart.reduce((count, item) => count + item.quantity, 0)
      );

      // Vibrate the cart button for 300ms
      if (navigator.vibrate) {
        navigator.vibrate(300); // Vibrate for 300ms
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e) => {
    if (e.target.name === "minPrice") {
      setMinPrice(e.target.value);
    } else {
      setMaxPrice(e.target.value);
    }
  };

  const applyFilter = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((item) => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((item) => item.price <= parseFloat(maxPrice));
    }

    setFilteredItems(filtered);
  };
  const addToCart = (item) => {
    // Set the default size based on the category
    let size = selectedSizes[item._id] || "large"; // Default to "large" for all categories

    // For "Ice Cream Slush and Cup", default size will be "special"
    if (item.category.toLowerCase() === "ice cream slush and cup") {
      size = selectedSizes[item._id] || "special"; // Default to "special"
    }

    // For "Ice Cream Shakes", default size will be "large"
    if (item.category.toLowerCase() === "ice cream shakes") {
      size = selectedSizes[item._id] || "large"; // Default to "large"
    }

    // Determine the price based on the size and category
    let price;
    if (item.category.toLowerCase() === "pizza") {
      price = item[`${size}Price`] || item.price; // Pizza size-specific pricing
    } else if (item.category.toLowerCase() === "ice cream slush and cup") {
      price = item[`${size}Price`] || item.price; // Ice cream slush and cup size-specific pricing
    } else if (item.category.toLowerCase() === "ice cream shakes") {
      price = item[`${size}Price`] || item.price; // Ice cream shakes size-specific pricing
    } else {
      price = item.price; // Default price for other categories
    }

    const cartItem = { ...item, selectedSize: size, price };

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = storedCart.findIndex(
      (cartItem) => cartItem._id === item._id && cartItem.selectedSize === size
    );

    if (existingItemIndex > -1) {
      storedCart[existingItemIndex].quantity += 1;
    } else {
      storedCart.push({ ...cartItem, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Trigger the storage event to notify other components (like NavBar)
    window.dispatchEvent(new Event("storage"));

    // Show message for 3 seconds when an item is added
    setItemAddedMessage("Your item added to cart");

    // Vibrate for 300ms when item is added to cart
    if (navigator.vibrate) {
      navigator.vibrate(300); // Vibrate for 300ms
    }

    // Update cart item count
    setCartItemCount(
      storedCart.reduce((count, item) => count + item.quantity, 0)
    );

    setTimeout(() => {
      setItemAddedMessage(""); // Hide message after 3 seconds
    }, 3000);
  };

  const loadMore = () => {
    const rowsToShow = window.innerWidth > 768 ? 3 : 8;
    setVisibleItems((prevVisible) => prevVisible + rowsToShow * 3);
  };

  const toggleCart = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  const [loading, setLoading] = useState(true); // Initially loading state true hai

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true); // Jab data fetch ho raha ho toh loading true kar denge
      const fetchedItems = await fetchItems();
      setItems(fetchedItems); // Ya phir jo bhi data aap fetch karte hain
      setLoading(false); // Data load hone par loading false ho jayega
    };
    loadItems();
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-title">
        <h1>Menu</h1>
      </div>

      <div className="menu-layout">
        {/* Filter Section */}
        <div className="menu-filter-section">
          <button
            className="filter-toggle-button"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Hide Filter" : "Show Filter"}
          </button>

          <div className={showFilter ? "show" : "hide"}>
            <div className="filter-search">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="search-button" onClick={applyFilter}>
                Enter
              </button>
            </div>

            <div className="filter-price-range">
              <label className="price-range-label">Price Range:</label>
              <br />
              <input
                type="number"
                name="minPrice"
                className="price-input"
                placeholder="Min Price"
                value={minPrice}
                onChange={handlePriceChange}
              />
              {""} -
              <input
                type="number"
                name="maxPrice"
                className="price-input"
                placeholder="Max Price"
                value={maxPrice}
                onChange={handlePriceChange}
              />
              <br />
              <button className="menu-apply-button" onClick={applyFilter}>
                Apply
              </button>
            </div>
          </div>
        </div>
        <hr />
        <hr className="ufo" />

        {/* Items Section */}
        <div className="menu-item-section">
          {loading ? (
            <div className="loading-message">
              {" "}
              Items Loading Please wait 30sec...
            </div> // Jab loading ho rahi ho toh message show hoga
          ) : (
            <div className="menu-grid">
              {filteredItems.slice(0, visibleItems).map((item) => (
                <div key={item._id} className="menu-item">
                  <Link to={`/item/${item._id}`} className="menu-item-link">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-item-image"
                    />
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-price">
                      PKR{" "}
                      {item.category.toLowerCase() === "pizza"
                        ? item[`${selectedSizes[item._id] || "large"}Price`]
                        : item.category.toLowerCase() === "ice cream shakes"
                        ? item[`${selectedSizes[item._id] || "large"}Price`] // Price for shakes
                        : item.category.toLowerCase() ===
                          "ice cream slush and cup"
                        ? item[`${selectedSizes[item._id] || "special"}Price`] // Price for slush and cup
                        : item.price}
                    </p>
                  </Link>

                  {item.category.toLowerCase() === "pizza" && (
                    <div className="size-selection">
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="small"
                          checked={selectedSizes[item._id] === "small"}
                          onChange={() => handleSizeChange(item._id, "small")}
                        />
                        Small
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="medium"
                          checked={selectedSizes[item._id] === "medium"}
                          onChange={() => handleSizeChange(item._id, "medium")}
                        />
                        Medium
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="large"
                          checked={
                            selectedSizes[item._id] === "large" ||
                            !selectedSizes[item._id]
                          }
                          onChange={() => handleSizeChange(item._id, "large")}
                        />
                        Large
                      </label>
                    </div>
                  )}

                  {item.category.toLowerCase() ===
                    "ice cream slush and cup" && (
                    <div className="size-selection">
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="small"
                          checked={selectedSizes[item._id] === "small"}
                          onChange={() => handleSizeChange(item._id, "small")}
                        />
                        Small
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="medium"
                          checked={selectedSizes[item._id] === "medium"}
                          onChange={() => handleSizeChange(item._id, "medium")}
                        />
                        Medium
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="special"
                          checked={selectedSizesspecial[item._id] === "special"}
                          onChange={() => handleSizeChange(item._id, "special")}
                        />
                        Special
                      </label>
                    </div>
                  )}

                  {item.category.toLowerCase() === "ice cream shakes" && (
                    <div className="size-selection">
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="small"
                          checked={selectedSizes[item._id] === "small"}
                          onChange={() => handleSizeChange(item._id, "small")}
                        />
                        Small
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`size-${item._id}`}
                          value="large"
                          checked={
                            selectedSizes[item._id] === "large" ||
                            !selectedSizes[item._id]
                          }
                          onChange={() => handleSizeChange(item._id, "large")}
                        />
                        Large
                      </label>
                    </div>
                  )}

                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          )}

          {visibleItems < filteredItems.length && (
            <div className="menu-load-more">
              <button onClick={loadMore}>Load More</button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Button */}
      <div className="cart-button-container" onClick={toggleCart}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/2832/2832517.png"
          alt="Cart"
          className="cart-icon"
        />
        <span className="cart-count">{cartItemCount}</span>
      </div>

      {/* Item Added Message */}
      {itemAddedMessage && (
        <div className="item-added-message">{itemAddedMessage}</div>
      )}
    </div>
  );
};

export default Menu;
