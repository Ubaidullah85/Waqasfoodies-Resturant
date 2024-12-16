import React from "react";
import "./About.css"; // Import CSS file
import Main from "../assets/Main.jpeg";
import Footer from "../Footer/Footer";
const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-image">
          <img src={Main} alt="About Us" />
        </div>
        <div className="about-text">
          <h2 className="ah2">About Us</h2>
          <p className="ap">
            Welcome to our restaurant in Walton, Lahore! We are proud to be
            recognized as the best dining spot in the area, serving our valued
            customers for the past 5 years.
          </p>
          <p className="ap1">
            As the only restaurant in Walton dedicated to delivering exceptional
            halal food, we take great pride in our diverse menu. From
            mouth-watering pizzas and juicy burgers to delightful pasta, every
            dish is crafted with care to ensure an unforgettable dining
            experience.
          </p>
          <p className="ap2">
            Our commitment to quality extends beyond taste; we believe that a
            clean and comfortable environment is essential. Our sitting area is
            designed for your comfort, making it the perfect place to enjoy a
            meal with family and friends.
          </p>
          <p className="ap3">
            Our chefs are highly trained professionals who excel in their craft.
            They use only the freshest ingredients to create dishes that not
            only taste amazing but also adhere to the highest standards of
            hygiene and safety.
          </p>
          <p className="ap4">
            We also prioritize cleanliness in our kitchen and dining areas,
            ensuring that your food is prepared in a pristine environment.
            Additionally, we are licensed by the food authority, guaranteeing
            that our practices meet all regulatory standards.
          </p>
          <p className="ap5">
            Join us for an extraordinary culinary journey, where taste meets
            tradition and passion. We can’t wait to serve you!
          </p>
          <p className="ap6">Regards, Waqas</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
