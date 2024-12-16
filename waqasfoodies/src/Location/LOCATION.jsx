import React from "react";
import "./Location.css";
import Footer from "../Footer/Footer";

const Location = () => {
  const address = "F9H7+Q3H Main Boyscout Stop, Farooq Colony Lahore, Punjab";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  // WhatsApp phone number (with country code, no "+" sign)
  const whatsappNumber = "923123456789"; // Replace with the actual number

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      <div className="location-page">
        <h1 className="lh1">Our Location</h1>

        <div className="address">
          <h2 className="lh2">Address:</h2>
          <p className="lp3">
            Click the address above to view it on Google Maps.
          </p>
          <p className="lp">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              {address}
            </a>
          </p>
        </div>

        <div className="contact-info">
          <h2 className="lh21">Contact Us:</h2>
          {/* Clicking the phone number will open WhatsApp */}
          <p className="lp1">
            Phone:{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              +92-123-456-7890
            </a>
          </p>
          <p className="lp2">Email: info@milkways.com</p>
        </div>

        <div className="directions"></div>

        <div className="note">
          <p className="lp4">
            <strong>Note:</strong> Iske ilawa hamari koi branch nahi hai.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Location;
