import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  product: null,
  error: null,
  loading: false,
};

export const getProducts = createAsyncThunk(
  "product-list/getAll",
  async (_, thunkAPI) => {
    try {
      const data = await productService.getAll(); // Directly get the data
      return data; // Return the fetched data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle errors
    }
  }
);

// New thunk to get a single product
export const getProduct = createAsyncThunk(
  "product-list/getProduct",
  async (productId, thunkAPI) => {
    try {
      const data = await productService.getProduct(productId); // Call the service to get the product
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Function to create a product
export const createProduct = createAsyncThunk(
  "product-list/create",
  async (productData, thunkAPI) => {
    try {
      const response = await productService.createNewProduct(productData);
      return response.data; // Return the created product data
    } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : "Failed to create product");
    }
  }
);

// Function to update a product
export const updateProduct = createAsyncThunk(
  "product-list/update",
  async (product, thunkAPI) => {
    try {
      const updatedProduct = await productService.update(product);
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Function to delete a product
export const deleteProduct = createAsyncThunk(
  "product-list/delete",
  async (productId, thunkAPI) => {
    try {
      await productService.delete(productId);
      return productId;
    } catch (error) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "product-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload; // Store the fetched product
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products.push(action.payload); // Add the new product to the state
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload; // Update the product in the state
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload); // Remove the deleted product
      });
  },
});

export default productsSlice.reducer;
