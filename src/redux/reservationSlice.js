import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance  from "../api/axios"; // use your central axiosInstance instancex

export const addReservation = createAsyncThunk(
  "reservations/addReservation",
  async (newReservation, { getState }) => {
    const token = getState().auth.token; // get token from Redux store
    // Debug log
    console.log("DEBUG - Token being sent:", token);
    console.log("DEBUG - New reservation data:", newReservation);

    const res = await axiosInstance.post("/bookings", newReservation, {
      headers: {
        Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      },
    });
    return res.data;
  }
);

export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async ({ isAdmin = false } = {}, { getState }) => {
    const token = getState().auth.token;
    const endpoint = isAdmin ? "/bookings" : "/bookings/my";

    const res = await axiosInstance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);


// Update reservation status
export const updateStatus = createAsyncThunk(
  "reservations/updateStatus",
  async ({ id, status }, { getState }) => {
    const token = getState().auth.token; // get token from Redux store
    const res = await axiosInstance.patch(
      `/bookings/${id}/status`, 
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);




const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        console.log("DEBUG - fetchReservations payload:", action.payload);
        state.loading = false;
        state.list = action.payload.data || [];
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addReservation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateStatus.fulfilled, (state, action) => {
      const index = state.list.findIndex((r) => r._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    });
    
  },
});

export default reservationsSlice.reducer;
