import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // console.log("Registering with data:", userData);
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData
      );
      console.log("Registration successful:", response.data);
      // console.log("Payload being returned:", {
      //   message: "Registration successful",
      //   token: response.data.token,
      //   email: userData.email,
      // });

      if (response.status === 201) {
        // store the token in local storage
        localStorage.setItem("token", response.data.token);
        return {
          message: "Registration successful",
          token: response.data.token,
          email: userData.email,
        };
      }
    } catch (error) {
      console.error("Registration error:", error.response.data); // Log the error response
      return rejectWithValue(error.response.data); // Return the error response on failure
    }
  }
);

// Async thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      // console.log("Logging in with data:", userData); // Log the user data
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );

      // store the token in local storage
      localStorage.setItem("token", response.data.token);
      console.log("Login successful:", response.data.token);
      return {
        message: "Login successful",
        token: response.data.token,
        email: userData.email,
      };
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : "Login failed"
      ); // Return the error response on failure
    }
  }
);

const initialState = {
  email: null,
  token: localStorage.getItem("token"),
  error: null,
  loading: false,
  message: null,
  success: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear the error state
    },
    clearMessage: (state) => {
      state.message = null; // Clear the success message
    },
    logout: (state) => {
      state.email = null; // Clear email
      state.token = null; // Clear token
      localStorage.removeItem("token"); // Remove token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(register.fulfilled, (state, action) => {
        state.email = action.payload.email; // Set email on successful registration
        state.token = action.payload.token; // Set token on successful registration
        state.error = null; // Clear any previous errors
        state.loading = false; // Set loading to false
        state.message = action.payload.message; // Set success message
        state.success = true; // Indicate success
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload; // Set error message from the rejected action
        state.loading = false; // Set loading to false
        state.success = false; // Indicate failure
      })
      .addCase(login.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
      })
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email; // Set email on successful login
        state.token = action.payload.token; // Set token on successful login
        state.error = null; // Clear any previous errors
        state.loading = false; // Set loading to false
        state.message = action.payload.message; // Set success message
        state.success = true; // Indicate success
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload; // Set error message from the rejected action
        state.loading = false; // Set loading to false
        state.success = false; // Indicate failure
      });
  },
});

// Export the clearError action
export const { clearError, clearMessage, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
