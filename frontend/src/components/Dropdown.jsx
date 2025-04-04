import { useState } from "react";
import ReactDOM from "react-dom";
import ShoppingCart from "./ShoppingCart";

// Dropdown component that manages the visibility of a dropdown menu
const Dropdown = ({ children }) => {
  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Render the background overlay if the dropdown is open */}
      {isOpen && <DropdownBg setIsOpen={setIsOpen} />}

      {/* Button to toggle the dropdown visibility */}
      <button className="cart-btn" onClick={() => setIsOpen((state) => !state)}>
        {children} {/* Display the button's children (text or icon) */}
      </button>

      {/* Render the dropdown content if it is open */}
      {isOpen && (
        <div className="isOpen-box">
          <div className="shop-cart">
            {/* Render the ShoppingCart component and pass setIsOpen to it */}
            <ShoppingCart setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;

// DropdownBg component that renders a background overlay
const DropdownBg = ({ setIsOpen }) => {
  return ReactDOM.createPortal(
    // Create a portal for the background overlay
    <div className="dropdown-box" onClick={() => setIsOpen(false)}></div>,
    document.querySelector("#modal") // Render the overlay in the modal element
  );
};
