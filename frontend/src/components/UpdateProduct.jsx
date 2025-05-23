import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getProduct, getProducts, updateProduct } from "../store/features/products/productsSlice";


const UpdateProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.productList.products.find((p) => p._id === productId));
  const products = useSelector((state) => state.productList.products)

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      price: '',
      description: '',
      category: '',
      images: [],
    };
  });

 // Loading state to handle fetching product data
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
  // Fetch the product list first
  dispatch(getProducts()).then(() => {
    // After fetching the product list, fetch the specific product
    dispatch(getProduct(productId)).then(() => {
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          images: product.images || [],
        });
      }
      setLoading(false);
    }).catch((error) => {
      setError(error.message || "Failed to fetch product.");
      setLoading(false);
    });
  }).catch((error) => {
    setError(error.message || "Failed to fetch products.");
    setLoading(false);
  });
}, [dispatch, productId]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === 'images' ? value.split(',').map(url => url.trim()) : value, // Handle images as an array
  }));
};
// const { products = [] } = useSelector((state) => state.productList);

const handleSubmit = (e) => {
  e.preventDefault();
  const isNameTaken = products.some(product => product.name.toLowerCase() === formData.name.toLowerCase() && product._id !== productId);
  if (isNameTaken) {
    setError('Product name must be unique.');
    return;
  }

  const updatedProduct = {
    ...formData,
    _id: productId // Ensure the product ID is included
  };
  dispatch(updateProduct(updatedProduct)).then(() => {
    navigate('/admin'); // Redirect after update
  })
  .catch((error) => {
    setError(error.message || "Failed to update product."); // Handle update error
  });
};

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-video" />
        <div className="loading-text"></div>
      </div>
    );
  }

  return (
    <div className="box-form">
      <div className="containerForm">
        <form onSubmit={handleSubmit}>
          <h2>Update Product</h2>
          <div className="form-group full-width">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group full-width">
            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group full-width">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group full-width">
            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group full-width">
            <label>Images (comma separated URLs):</label>
            <textarea type="text" name="images" value={formData.images.join(', ')} onChange={handleChange} required />
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <button className="submit-btn" type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;