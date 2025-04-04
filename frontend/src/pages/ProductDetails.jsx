import { useParams } from "react-router";
import "../styles/productDetail.css";
import { useEffect, useState } from "react";
import { addToCart } from "../store/shoppingcart/shoppingCartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8080/api/products/${productId}`
        );
        setProduct(res.data);
        console.log("Product data:", res.data);
        if (res.data && res.data.images && res.data.images.length > 0) {
          setImages(res.data.images);
          setMainImage(res.data.images[0]);
        }
      } catch (error) {
        setError("Something went wrong!");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    console.log(`Added ${product.name} to cart`);
  };

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }
  if (loading || !product) {
    return (
      <div className="loading-container">
        <div className="loading-video" />
        <div className="loading-text"></div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="image-slider">
        {mainImage && <img id="mainImage" src={mainImage} alt="Product" />}
        <div className="thumbnails">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(src)}
            />
          ))}
        </div>
      </div>
      <div className="details">
        <h1>{product.name}</h1>
        <div className="price">
          <p>{product.price}kr</p>
        </div>
        <div className="description">
          <p>{product.description}</p>
        </div>
        <div className="add-to-cart2">
          <button className="cart-btn2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
