import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("Attempting to log in with email:", email);
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      console.log("Login successful:", response.data);
      return response.data; // Backend should return { username, role, token }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Logging out user");
      state.user = null;
      state.token = null;

      // Clear persisted data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("Login request pending...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login request fulfilled:", action.payload);
        state.isLoading = false;
        state.user = {
          role: action.payload.role,
          username: action.payload.username || "",
        };
        state.token = action.payload.token;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error("Login request rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
