import Product from "../components/Product";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/shoppingcart/shoppingCartSlice";
import { getProducts } from "../store/features/products/productsSlice";
import { useEffect, useState } from "react";
import Filter from "../components/Filter";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    dispatch(addToCart(product));
  };

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }
  if (loading || !products) {
    return (
      <div className="loading-container">
        <div className="loading-video" />
        <div className="loading-text"></div>
      </div>
    );
  }

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  return (
    <>
      <div className="home-page">
        <div className="home-img">
          <img
            src="https://media.istockphoto.com/id/1214281745/vector/%C3%B0%C3%B0%C2%B5%C3%B0%C3%B1%C3%B0%C3%B1%C3%B0%C3%B0%C3%B1%C3%B0-1-%C3%B0%C3%B0%C3%B1%C3%B1%C3%B1%C3%B0%C3%B0%C3%B0%C3%B0%C3%B0%C3%B0%C2%B5%C3%B0.jpg?s=612x612&w=0&k=20&c=Ve72VkVCLHzryHHEmWuZ0JhTrqmlW1tdKwJj7LQNuyM="
            alt="image"
          />
          <div className="home-text">
            <h1>WELCOME TO BMERKETO ELECTRONICS!</h1>
            <h2>The Best Electronics For The Best Price!</h2>
          </div>
        </div>
      </div>
      <div className="home-products">
        <h2>Products</h2>
        <div>
          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-wrapper">
            <Product
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
