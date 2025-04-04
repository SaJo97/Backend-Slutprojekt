import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import CartItem from "./CartItem";
import { clearCart } from "../store/shoppingcart/shoppingCartSlice";
import "../styles/cart.css";
import { createOrder } from "../store/features/orders/orderSlice";
import { useState } from "react";
import ModalMessage from "./ModalMessage";

const ShoppingCart = ({ setIsOpen, isCheckoutPage }) => {
  const { cart, totalPrice } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth); // Get the token from the auth state

  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      setModalMessage(
        "Your cart is empty. Please add items before placing an order."
      );
      setShowModal(true);
      return;
    }
    // Construct the order data from the cart items
    const orderData = {
      products: cart.map((item) => ({
        productId: item.product._id, 
        quantity: item.quantity, 
      })),
    };
    // Dispatch the createOrder action
    dispatch(createOrder(orderData))
      .unwrap() // Unwrap the promise to handle success/error
      .then((data) => {
        console.log("Order created successfully:", data);
        dispatch(clearCart()); // Clear the cart after successful order
        setModalMessage("Order created successfully!");
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Failed to create order:", error);
        setModalMessage("Failed to create order. Please try again.");
        setShowModal(true);
      });
  };

  return (
    <div className="shopping-container">
      <div className="cart-header">
        <p>Cart</p>
      </div>
      <div>
        {cart.length <= 0 && (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        )}
        {cart.map((item) => (
          <CartItem key={"cart_" + item.product._id} item={item} />
        ))}
      </div>
      <div className="total-info">
        <div>
          <p className="total-text">Total: {totalPrice}kr</p>
          <p className="total-text inc-tax">inc tax</p>
        </div>
        {isCheckoutPage ? (
          <button onClick={handlePlaceOrder} className="button-shopping">
            Place order
          </button>
        ) : (
          <Link
            onClick={() => setIsOpen(false)}
            to="/checkout"
            className="button-shopping"
          >
            Checkout
          </Link>
        )}
      </div>
      {showModal && (
        <ModalMessage
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
export default ShoppingCart;
