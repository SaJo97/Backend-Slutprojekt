import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
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
      });
  },
});

export default productsSlice.reducer;
