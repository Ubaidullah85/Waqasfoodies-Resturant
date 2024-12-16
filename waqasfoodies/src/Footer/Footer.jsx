import React from "react";
import "./Footer.css";
import FacebookIcon from "../Footer/facebook.svg";
import TiktokIcon from "../Footer/tik-tok.svg";
import InstagramIcon from "../Footer/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a
            href="https://www.instagram.com/waqasfoodies_16/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={InstagramIcon} alt="Instagram Icon" className="icon" />
          </a>
          <a
            href="https://www.facebook.com/p/Waqas-foodies-100064615796745/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={FacebookIcon} alt="Facebook Icon" className="icon" />
          </a>
          <a
            href="https://www.tiktok.com/@waqsfoodies"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tiktok"
          >
            <img src={TiktokIcon} alt="Tiktok Icon" className="icon" />
          </a>
        </div>

        {/* Copyright Section */}
        <div className="copyright">
          <p>
            <small>
              Copyright © 2024 Waqas Foodies | Powered by Ubaida Developers
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
