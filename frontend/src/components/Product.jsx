import { Link } from "react-router";
import "../styles/home.css";
const Product = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-container">
        <div className="product-image-container">
          <img
            className="product-image"
            src={product.images[0]}
            alt={product.name}
          />
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product._id}`}>
          <div className="product-name">
            <p>{product.name}</p>
          </div>
        </Link>
        <div className="product-spacer"></div>
        <div className="product-price">
          <p>{product.price}kr</p>
        </div>
        <button
          className="btn add-to-cart"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Product;
