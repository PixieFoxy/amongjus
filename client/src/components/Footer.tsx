import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between items-center pt-12 px-8 pb-4">
        <div id="footer-logo">
          <a href="/">
            <img src={logo} className="w-full h-full" alt="amongjus logo" />
          </a>
        </div>
        <div
          id="footer-menu"
          className="flex justify-between items-center basis-1/2"
        >
          <div className="navbar-menu-item">
            <a href="#">FAQs</a>
          </div>
          <div className="navbar-menu-item">
            <a href="#">Contact Us</a>
          </div>
          <div className="navbar-menu-item">
            <a href="#">Careers</a>
          </div>
          <div className="navbar-menu-item">
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
      <p className="w-fit ml-20 mb-8 font-overlock text-xs tracking-[0.05em]">Copyright © 2024 PT Among Praja Mandiri</p>
    </>
  );
};

export default Footer;
