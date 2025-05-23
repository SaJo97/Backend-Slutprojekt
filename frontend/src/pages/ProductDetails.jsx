import { useParams } from "react-router";
import "../styles/productDetail.css";
import { useEffect, useState } from "react";
import { addToCart } from "../store/shoppingcart/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/features/products/productsSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productList.product);
  const loading = useSelector((state) => state.productList.loading);
  const error = useSelector((state) => state.productList.error);
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getProduct(productId)); // Fetch product using Redux
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setImages(product.images);
      setMainImage(product.images[0]);
    }
  }, [product]);

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
