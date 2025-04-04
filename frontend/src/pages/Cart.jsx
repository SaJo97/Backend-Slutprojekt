import ShoppingCart from "../components/ShoppingCart";

const Cart = () => {
  return (
    <div className="cart-mt">
      <div className="cart-style">
        <ShoppingCart isCheckoutPage />
      </div>
    </div>
  );
};
export default Cart;
