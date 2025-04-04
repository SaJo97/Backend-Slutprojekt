import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../components/orderItem";
import { fetchOrders } from "../store/features/orders/orderSlice";
import { useEffect } from "react";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders); // Get orders from the Redux state

  useEffect(() => {
    dispatch(fetchOrders()); // Fetch orders when the component mounts
  }, [dispatch]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error fetching orders: {error}</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} /> // Use the OrderItem component for each order
          ))}
        </div>
      )}
    </div>
  );
};
export default OrderHistory;
