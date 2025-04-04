import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Get the token from the auth state

    try {
      let response;
      if (token) {
        // If the user is logged in, create the order normally
        response = await axios.post(
          "http://localhost:8080/api/order",
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
      } else {
        // If the user is not logged in, use the guest order endpoint
        response = await axios.post(
          "http://localhost:8080/api/order/guest",
          orderData
        );
      }

      // Fetch orders again after creating a new order
      dispatch(fetchOrders());

      return response.data; // Return the response data
    } catch (error) {
      console.error(
        "Order creation error:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : "Order creation failed"
      );
    }
  }
);

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Get the token from the auth state

    if (!token) {
      return rejectWithValue("Unauthorized"); // Reject if no token is present
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/order",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log("API Response fetchOrders:", response.data); // Log the API response
      return response.data; // Return the response data
    } catch (error) {
      console.error(
        "Fetch orders error:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : "Fetch orders failed"
      );
    }
  }
);

// Async thunk for fetching order details by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Get the token from the auth state

    if (!token) {
      return rejectWithValue("Unauthorized"); // Reject if no token is present
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log("API Response fetchOrderById:", response.data); // Log the API response
      return response.data; // Return the response data
    } catch (error) {
      console.error(
        "Fetch order by ID error:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : "Fetch order failed"
      );
    }
  }
);

// Create the order slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: null,
    orders: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear the error state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order; // Store the created order *
        state.error = null; // Clear any previous errors
        state.loading = false; // Set loading to false
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload; // Set error message from the rejected action
        state.loading = false; // Set loading to false
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload; // Store the fetched orders
        state.error = null; // Clear any previous errors
        state.loading = false; // Set loading to false
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload; // Set error message from the rejected action
        state.loading = false; // Set loading to false
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order = action.payload; // Store the fetched order details
        state.error = null; // Clear any previous errors
        state.loading = false; // Set loading to false
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.error = action.payload; // Set error message from the rejected action
        state.loading = false; // Set loading to false
      });
  },
});

// Export the clearError action
export const { clearError } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
