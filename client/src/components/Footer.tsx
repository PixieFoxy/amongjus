import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex justify-between items-center pt-10 px-8 pb-4 border-t border-black">
        <div id="footer-logo">
          <Link to="/">
            <img src={logo} className="w-full h-full" alt="amongjus logo" />
          </Link>
        </div>
        <div
          id="footer-menu"
          className="flex justify-between items-center basis-1/2 mr-8"
        >
          <div className="navbar-menu-item">
            <Link to="/faq">FAQs</Link>
          </div>
          <div className="navbar-menu-item">
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="navbar-menu-item">
            <Link to="/careers">Careers</Link>
          </div>
          <div className="navbar-menu-item">
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <p className="w-fit ml-20 mb-8 font-overlock text-xs tracking-[0.05em]">Copyright © 2024 PT Among Praja Mandiri</p>
    </>
  );
};

export default Footer;
