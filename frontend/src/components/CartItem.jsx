import { useDispatch } from "react-redux";
import "../styles/cart.css";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  addToCart,
  removeItem,
  removeOne,
} from "../store/shoppingcart/shoppingCartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addOneToCart = () => {
    dispatch(addToCart(item.product));
  };
  const removeOneFromCart = () => {
    dispatch(removeOne(item.product._id));
  };
  const deleteItem = () => {
    dispatch(removeItem(item.product._id));
  };

  return (
    <div className="cart-container">
      <div className="product-info-cart">
        <div className="image-container-cart">
          <img src={item.product.images[0]} alt={item.product.name} />
        </div>
        <div>
          <p className="product-title-cart">{item.product.name}</p>
          <p className="product-quantity">
            {item.quantity} x {item.product.price}kr
          </p>
        </div>
      </div>

      <div className="button-container-cart">
        <div>
          <button onClick={removeOneFromCart} className="button-cart">
            <FaMinus className="size-3" />
          </button>
          <button onClick={addOneToCart} className="button-cart">
            <FaPlus className="size-3" />
          </button>
        </div>
        <button onClick={deleteItem} className="delete-button">
          <FaTrash className="icon" />
        </button>
      </div>
    </div>
  );
};
export default CartItem;
