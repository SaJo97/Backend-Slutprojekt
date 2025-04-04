import { Link, NavLink } from "react-router";
import Logo from "../assets/Placeholders/Logo.svg";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const { totalQuantity } = useSelector((state) => state.shoppingCart);

  const { token } = useSelector((state) => state.auth); // Get the token from the auth state

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink className="nav-link" to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link nav-hide"
              to="/contacts"
              onClick={closeMenu}
            >
              Contacts
            </NavLink>
          </li>

          {token ? (
            <li>
              <NavLink
                className="nav-link nav-hide"
                to="/account"
                onClick={closeMenu}
              >
                Account
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                className="nav-link nav-hide"
                to="/login"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            </li>
          )}

          <li className="nav-link dropdown-cart-li">
            {totalQuantity > 0 && (
              <div className="quantity-badge">
                <div className="notification-badge">{totalQuantity}</div>
              </div>
            )}
            <Dropdown>
              <i className="fas fa-shopping-cart"></i>
            </Dropdown>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`dropdown ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink className="nav-link" to="/contacts" onClick={closeMenu}>
              Contacts
            </NavLink>
          </li>
          {token ? (
            <li>
              <NavLink className="nav-link" to="/account" onClick={closeMenu}>
                Account
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
