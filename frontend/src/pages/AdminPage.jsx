import { useEffect, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import EditProduct from "../components/EditProduct";
import { createProduct, getProducts } from "../store/features/products/productsSlice";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate all fields
    if (
      formData.name.trim() === '' ||
      formData.price.trim() === '' ||
      formData.description.trim() === '' ||
      formData.category.trim() === '' ||
      formData.images.trim() === ''
    ) {
      setError('Please fill in all the fields');
      setLoading(false);
      return;
    }
    // Check for unique product name
    // const { products = [] } = useSelector((state) => state.productList);
    const isNameTaken = products.some(product => product.name.toLowerCase() === formData.name.toLowerCase());
    if (isNameTaken) {
      setError('Product name must be unique.');
      setLoading(false);
      return;
    }

    // Convert price to a number
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      images: formData.images.split(',').map(image => image.trim()) // images are comma-seperated
    };

    try {
      await dispatch(createProduct(productData));
      await dispatch(getProducts());

      // Reset form data
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        images: ''
      });
      navigate('/admin');
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products = [] } = useSelector(
    (state) => state.productList
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(product => product?.category?.toLowerCase()).filter(Boolean))); // Filter out undefined categories

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product && product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

    // console.log("Filtered Products:", filteredProducts); // Log filtered products for debugging
  return (
    <>
      <div className="box-form">
        <div className="containerForm">
          <h2 className="">Create a new product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label htmlFor="name">Product name</label>
              <input
                type="text"
                id="name"
                
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="images">Images (comma-separated URLs)</label>
              <textarea
                type="text"
                id="images"
                
                value={formData.images}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2 animate-pulse">
                  <RiLoaderFill className="size-6 animate-spin" />
                  Loading
                </span>
              ) : (
                'Create'
              )}
            </button>
          </form>
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
      {/* Users - link -> user info(del, update role) */}
      <div className="userbox">
        <h2>
          <Link className="user-link" to="/admin/users">Edit Users</Link>
        </h2>
      </div>
      <div className="home-products">
        <h2>Products</h2>
        <div>
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            product ? (
              <div key={product._id} className="product-wrapper">
                <EditProduct
                  product={product} productId={product._id}
                />
              </div>
            ) : null
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default AdminPage;