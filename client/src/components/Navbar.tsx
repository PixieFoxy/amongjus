import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navbarClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "border-b-2 navbar-menu-item" : "navbar-menu-item";
  };

  const { user } = useAuth();

  return (
    <>
      <div
        id="navbar-container"
        className="flex justify-between max-w-screen h-auto px-8 py-4 border-b border-black border-opacity-100"
      >
        <div id="navbar-logo">
          <Link to="/">
            <img src={logo} className="w-full h-full" alt="amongjus logo" />
          </Link>
        </div>
        <div
          id="navbar-menu"
          className="flex justify-between items-center mr-8 basis-1/2"
        >
          <div>
            <NavLink className={navbarClass} to="/about">
              About Us
            </NavLink>
          </div>
          <div>
            <NavLink className={navbarClass} to="/menu">
              Products
            </NavLink>
          </div>
          <div>
            <NavLink className={navbarClass} to="/cart">
              Cart
            </NavLink>
          </div>
          <div>
            <NavLink
              className={navbarClass}
              to={user.id ? "/dashboard" : "/login"}
            >
              {user.id ? user.email : "Login"}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
