import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <div id="navbar-container" className="flex justify-between max-w-screen h-auto px-8 py-4 border-b border-black border-opacity-100">
        <div id="navbar-logo">
          <a href="/">
            <img src={logo} className="w-full h-full" alt="amongjus logo"/>
          </a>
        </div>
        <div id="navbar-menu" className="flex justify-between items-center mr-8 basis-1/2">
          <div className="navbar-menu-item">
            <a href="#">About Us</a>
          </div>
          <div className="navbar-menu-item">
            <a href="#">Products</a>
          </div>
          <div className="navbar-menu-item">
            <a href="#">Cart</a>
          </div>
          <div className="navbar-menu-item">
            <a href="#">Login</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
