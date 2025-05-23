import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:8080/api/auth/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(
    `http://localhost:8080/api/auth/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // Return the id to remove from the state
});

export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ id, role }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:8080/api/auth/users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      return response.data; // Return the updated user
    } catch (error) {
      console.error(
        "Error updating user role:",
        error.response?.data || error.message
      );
      throw error; // Rethrow the error to be handled by the calling function
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user._id !== action.payload);
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
