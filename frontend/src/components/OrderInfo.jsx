import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchOrderById } from "../store/features/orders/orderSlice";

const OrderInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    const fetchOrder = () => {
      dispatch(fetchOrderById(id)); // Fetch order details when the component mounts
    };

    fetchOrder();
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error fetching order details: {error}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  // Defensive check for products
  if (!order.products || !Array.isArray(order.products) || order.products.length === 0) {
    return <p>No products found in this order.</p>;
  }

  // Calculate total price based on products
  const totalPrice = order.products.reduce((total, product) => {
    // Defensive check for product and its properties
    if (product.productId && product.productId.price) {
      return total + product.productId.price * product.quantity;
    }
    return total; // If price is undefined, just return the total
  }, 0);

  return (
    <div className="order-container">
      <h2>Order ID: {order._id}</h2>
      <p>Total Price: {totalPrice.toFixed(2)} kr</p>
      <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
      <h4>Products:</h4>
      <ul>
        {order.products.map((product) => (
          <li key={product.productId._id}>
            <h3>
              {product.productId.name} - Quantity: {product.quantity}
            </h3>
            {product.productId.images && product.productId.images.length > 0 ? (
              <img
                src={product.productId.images[0]}
                alt={product.productId.name}
                width="100"
              />
            ) : (
              <p>No image available</p>
            )}
            <p>Price: {product.productId.price} kr</p>
            <p>
              Total: {(product.productId.price * product.quantity).toFixed(2)} kr
            </p>
            <p>Description: {product.productId.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderInfo;