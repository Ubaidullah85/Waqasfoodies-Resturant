import React, { useState } from "react";
import Email from "../assets/Email.png";
import Whatsapp from "../assets/whatsapp.png";
import Locataion from "../assets/location.png";
import "./Contact.css";
import Footer from "../Footer/Footer";

function CONTACT() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create WhatsApp message with form data
    const message = `*Name*: ${formData.name}\n*Phone*: ${formData.phone}\n*Email*: ${formData.email}\n*Message*: ${formData.message}`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the message pre-filled in the chat
    const whatsappURL = `https://wa.me/+923234141346?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    // Reset form after submission
    setFormData({ name: "", phone: "", email: "", message: "" });
    alert("Your message has been sent successfully!");
  };

  // Function to open location in Google Maps
  const openLocation = () => {
    const locationURL =
      "https://www.google.com/maps?q=F9H7+Q3H+Main+Boyscout+Stop,+Farooq+Colony+Lahore,+Punjab";
    window.open(locationURL, "_blank");
  };

  // Function to open WhatsApp chat
  const openWhatsApp = () => {
    const whatsappURL = "https://wa.me/+9203200489003";
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <div className="Hero">
        <div className="location" onClick={openLocation}>
          <img src={Locataion} alt="location" />
          <p>F9H7+Q3H Main Boyscout Stop, Farooq Colony Lahore, Punjab</p>
        </div>
        <div className="whatsapp" onClick={openWhatsApp}>
          <img src={Whatsapp} alt="Whatsapp" />
          <p>0320 0489003</p>
        </div>
        <div className="email">
          <img src={Email} alt="Email" />
          <p>waqasfoodies00@gmail.com</p>
        </div>
      </div>

      <h2 className="ch2">We Value Your Feedback</h2>
      <p className="cp">
        Please complete the form below so that we can improve.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          id="input1"
          className="inputcontact"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="inputcontact"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          className="inputcontact"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="inputcontact"
          name="message"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <Footer />
    </>
  );
}

export default CONTACT;
