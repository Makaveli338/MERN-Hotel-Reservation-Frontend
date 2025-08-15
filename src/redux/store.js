import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import reservationsReducer from "./reservationSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Auth slice to the store
    reservations: reservationsReducer, // Reservations slice to the store
  },
});

console.log("Redux store initialized"); // Debug log

export default store;