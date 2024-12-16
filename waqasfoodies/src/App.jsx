import React from "react";
import { AuthProvider } from "./Context Hook/PasswordContext";
import AdminPage from "./Admin Panel/AdminPanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuUpdate from "./Admin Panel/MenuUpdate";
import Menu from "./MainMenu/MENU";
import ItemDetails from "./MainMenu/ItemDetails";
import Cart from "./Cart/Cart";
import NavBar from "./Navbar/Navbar";
import Home from "./Home/HOME";
import CONTACT from "./Contact/CONTACT";
import About from "./About/ABOUT";
import Location from "./Location/LOCATION";
import Order from "./Order page/Order";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="About" element={<About />} />
          <Route path="Location" element={<Location />} />
          <Route path="Contact" element={<CONTACT />} />
          <Route path="Admin" element={<AdminPage />} />
          <Route path="MenuUpdate" element={<MenuUpdate />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
