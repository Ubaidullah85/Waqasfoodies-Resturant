import React, { useState } from "react";
import { useAuth } from "../Context Hook/PasswordContext";
import { Link } from "react-router-dom";
import "./AdminPanel.css";
const AdminPage = () => {
  const [password, setPassword] = useState("");
  const { isAuthorized, authorize } = useAuth();

  const handlePasswordSubmit = () => {
    authorize(password);
    setPassword("");
  };

  return (
    <div>
      {isAuthorized ? (
        <div className="admin-container">
          <h1 className="admin-heading">Admin Panel</h1>
          <div className="admin-buttons-container">
            <Link to="/MenuUpdate">
              <button className="admin-button menu-button">Menu Update</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="password-form">
          <h2>Enter Password to Access Admin Page</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
