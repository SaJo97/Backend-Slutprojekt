import axios from "axios";

// Create an Axios instance with a base URL based on the environment
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8080/' : '/';

const apiClient = axios.create({
  baseURL: BASE_URL
});

// Function to get all products
const getAll = async () => {
  const res = await apiClient.get("api/products");
  return res.data;
};

// Function to get a single product
const getProduct = async (productId) => {
  const res = await apiClient.get(`api/products/${productId}`);
  return res.data;
};

const createNewProduct = async (productData) => {
  const token = sessionStorage.getItem('jwt');

  try {
    const res = await apiClient.post(`api/products/`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to update a product
const update = async (product) => {
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    throw new Error("No token found for update");
  }

  console.log("Updating product with data:", product);

  try {
    const res = await apiClient.put(`api/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error.response ? error.response.data : error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }

  // const res = await apiClient.put(`api/products/${product._id}`, product, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // return res.data;
};

// Function to delete a product
const deleteProduct = async (productId) => {
  const token = sessionStorage.getItem('jwt');
  if (!token) {
    throw new Error("No token found"); // Optional: Handle case where token is missing
  }
  // Ensure productId is a string
  if (typeof productId !== 'string') {
    throw new Error("Invalid product ID");
  }

  await apiClient.delete(`api/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Export the Axios instance and the getAll function as default
const productService = {
  getAll,
  getProduct,
  createNewProduct,
  update,
  delete: deleteProduct,
  apiClient,
};

export default productService; // Default export