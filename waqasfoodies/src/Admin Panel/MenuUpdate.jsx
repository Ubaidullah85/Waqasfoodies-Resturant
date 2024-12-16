import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuUpdate.css";

function MenuUpdate() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://waqasfoodiesbackend-qyji.onrender.com/api/products"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !productName ||
      !productCategory ||
      !productImage ||
      !productDescription
    ) {
      alert("Please fill in all fields");
      return;
    }

    const isPizzaOrIceCream =
      productCategory === "Pizza" ||
      productCategory === "Ice Cream Shakes" ||
      productCategory === "Ice Cream Slush and Cup";
    const newProduct = {
      name: productName,
      category: productCategory,
      image: productImage,
      description: productDescription,
      price: isPizzaOrIceCream ? 0 : parseFloat(productPrice || 0),
      smallPrice: isPizzaOrIceCream ? parseFloat(smallPrice || 0) : 0,
      mediumPrice: parseFloat(mediumPrice || 0),
      largePrice: parseFloat(largePrice || 0),
      specialPrice: parseFloat(specialPrice || 0),
    };

    try {
      const response = await fetch(
        "https://waqasfoodiesbackend-qyji.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);

      // Clear the form after adding the product
      setProductName("");
      setProductCategory("");
      setProductImage("");
      setProductDescription("");
      setSmallPrice("");
      setMediumPrice("");
      setLargePrice("");
      setSpecialPrice("");
      setProductPrice("");

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://waqasfoodiesbackend-qyji.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "1") {
      setPasswordCorrect(true);
    } else {
      alert("Incorrect Password");
    }
  };

  if (!passwordCorrect) {
    return (
      <div className="password-form">
        <h2 className="password-heading">
          Enter Password to Access Admin Page
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="password-input"
        />
        <button onClick={handlePasswordSubmit} className="password-submit">
          Submit
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="order-container">
        <h2 className="order-heading">Menu item</h2>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <div className="menu-container">
        <h2 className="menu-heading">Product Menu</h2>

        <form className="product-form" onSubmit={addProduct}>
          <input
            type="text"
            className="product-name-input"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <select
            className="product-category-select"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Drinks">Drinks</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Shawarma">Shawarma</option>
            <option value="Broast">Broast</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Sides">Sides</option>
            <option value="Ice-Cream">Ice-Cream</option>
            <option value="Ice Cream Shakes">Ice Cream Shakes</option>
            <option value="Ice Cream Slush and Cup">
              Ice Cream Slush and Cup
            </option>
            <option value="Pasta">Pasta</option>
            <option value="Deals">Deals</option>
          </select>
          {productCategory === "Pizza" ? (
            <>
              <input
                type="text"
                className="small-price-input"
                placeholder="Small Price"
                value={smallPrice}
                onChange={(e) => setSmallPrice(e.target.value)}
              />
              <input
                type="text"
                className="medium-price-input"
                placeholder="Medium Price"
                value={mediumPrice}
                onChange={(e) => setMediumPrice(e.target.value)}
              />
              <input
                type="text"
                className="large-price-input"
                placeholder="Large Price"
                value={largePrice}
                onChange={(e) => setLargePrice(e.target.value)}
              />
            </>
          ) : productCategory === "Ice Cream Shakes" ? (
            <>
              <input
                type="text"
                className="small-price-input"
                placeholder="Small Price"
                value={smallPrice}
                onChange={(e) => setSmallPrice(e.target.value)}
              />
              <input
                type="text"
                className="large-price-input"
                placeholder="Large Price"
                value={largePrice}
                onChange={(e) => setLargePrice(e.target.value)}
              />
            </>
          ) : productCategory === "Ice Cream Slush and Cup" ? (
            <>
              <input
                type="text"
                className="small-price-input"
                placeholder="Small Price"
                value={smallPrice}
                onChange={(e) => setSmallPrice(e.target.value)}
              />
              <input
                type="text"
                className="medium-price-input"
                placeholder="Medium Price"
                value={mediumPrice}
                onChange={(e) => setMediumPrice(e.target.value)}
              />
              <input
                type="text"
                className="special-price-input"
                placeholder="Special Price"
                value={specialPrice}
                onChange={(e) => setSpecialPrice(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                className="price-input"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </>
          )}

          <input
            type="text"
            className="product-image-input"
            placeholder="Image URL"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
          <textarea
            className="product-description-input"
            placeholder="Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>

          <button type="submit" className="add-product-button">
            Add Product
          </button>
        </form>

        <div className="product-list">
          <h2 className="product-list-heading">Existing Products</h2>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="product-item" key={product._id}>
                <h3 className="product-name">{product.name}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <p className="product-price">
                  Price:{" "}
                  {product.category === "Pizza"
                    ? `S: ${product.smallPrice} M: ${product.mediumPrice} L: ${product.largePrice}`
                    : product.category === "Ice Cream Shakes"
                    ? `S: ${product.smallPrice} L: ${product.largePrice}`
                    : product.category === "Ice Cream Slush and Cup"
                    ? `S: ${product.smallPrice} M: ${product.mediumPrice} SS: ${product.specialPrice}`
                    : `PKR ${product.price}`}
                </p>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="delete-product-button"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
}
export default MenuUpdate;
