import { useState } from "react";
import { Link } from "react-router";

const OrderItem = ({ order }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <div className="order-container">
      <Link to={`/order/${order._id}`}>
        <h3>Order ID: {order._id}</h3>
      </Link>
      <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Total Price: {order.totalPrice} kr</p>
      <h4>Products:</h4>
      <ul>
        {order.products.slice(0, 3).map((product) => {
          const productDetails = product.productId; // Access the populated product details
          return (
            <li key={product.productId._id}>
              <h3>
                {productDetails.name || "Product name not available"} - Quantity: {product.quantity}
              </h3>
              {productDetails.images && productDetails.images.length > 0 ? (
                <img
                  src={productDetails.images[0]}
                  alt={productDetails.name || "Product image"}
                  width="100"
                />
              ) : (
                <p>No image available</p>
              )}
              <p>
                Total: {(productDetails.price * product.quantity).toFixed(2)} kr
              </p>
            </li>
          );
        })}
        {showMore &&
          order.products.slice(3).map((product) => {
            const productDetails = product.productId; // Access the populated product details
            return (
              <li key={product.productId._id}>
                <h3>
                  {productDetails.name || "Product name not available"} - Quantity: {product.quantity}
                </h3>
                {productDetails.images && productDetails.images.length > 0 ? (
                  <img
                    src={productDetails.images[0]}
                    alt={productDetails.name || "Product image"}
                    width="100"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <p>
                  Total: {(productDetails.price * product.quantity).toFixed(2)} kr
                </p>
              </li>
            );
          })}
      </ul>
      {order.products.length > 3 && (
        <button onClick={toggleShowMore}>
          {showMore ? "Show Less" : `And ${order.products.length - 3} more items...`}
        </button>
      )}
    </div>
  );
};

export default OrderItem;