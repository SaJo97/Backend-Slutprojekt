import { Link } from "react-router";
import { useDispatch } from "react-redux";
import "../styles/home.css";
import { deleteProduct} from "../store/features/products/productsSlice";
const EditProduct = ({product, productId}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(productId)).unwrap(); // Use unwrap to handle errors
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

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
        <Link to={`/update/${product._id}`}>
          <button className="btn add-to-cart">Update</button>
        </Link>
        <button
          className="btn add-to-cart"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
export default EditProduct