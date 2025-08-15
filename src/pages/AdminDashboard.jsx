// src/pages/AdminDashboard.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  fetchReservations,
  updateStatus,
} from "../redux/reservationSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.reservations);
  const user = useSelector((s) => s.auth.user); // expecting { role: 'admin' }

  useEffect(() => {
    // Load ALL bookings for admin
    dispatch(fetchReservations({ isAdmin: true }));
  }, [dispatch]);

  const handleApprove = (id) =>
    dispatch(updateStatus({ id, status: "Approved" }));
  const handleDecline = (id) =>
    dispatch(updateStatus({ id, status: "Declined" }));

  const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  return (
    <>
      <section className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen w-full mb-40 relative">
        <Header />
        <div className="max-w-5xl mx-auto py-30 lg:py-60 grid">
          <div className="flex gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1L12.2451 7.90983H19.5106L13.6327 12.1803L15.8779 19.0902L10 14.8197L4.12215 19.0902L6.36729 12.1803L0.489435 7.90983H7.75486L10 1Z"
                  fill="#B48761"
                />
              </svg>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-6xl lg:text-9xl text-white font-medium playfair">
              Admin Reservations
            </h1>
          </div>
        </div>
      </section>

      <div className="flex text-[#AE7D54] text-2xl justify-center items-center gap-2">
        <p className="font-sans">Bookings</p>
      </div>

      {loading && <p className="text-center mt-10">Loading bookings…</p>}
      {error && <p className="text-center mt-10 text-red-600">{error}</p>}

      <div className="mt-10 space-y-10">
        {list.map((r) => (
          <div key={r.id}>
            <div className="w-[70%] text-left text-[#AE7D54] mx-auto mt-10 font-semibold">
              <h1>
                Reservation by: <span>{r.username || "N/A"}</span>
              </h1>
            </div>

            <div className="mt-5 w-[70%] h-auto rounded-xl lg:h-40 grid lg:grid-cols-4 mx-auto px-6 py-9 gap-10 bg-[#d6c3ac] shadow-md">
              <div>
                <h1 className="text-sm font-medium text-gray-700">Check-In</h1>
                <p className="mt-1 w-full p-2 border border-gray-300 rounded-md">{formatDate(r.checkInDate)}</p>
              </div>
              <div>
                <h1 className="text-sm font-medium text-gray-700">Check-Out</h1>
                <p className="mt-1 w-full p-2 border border-gray-300 rounded-md">{formatDate(r.checkOutDate)}</p>
              </div>
              <div>
                <h1 className="text-sm font-medium text-gray-700">Guests</h1>
                <p className="mt-1 w-full p-2 border border-gray-300 rounded-md">{r.guests}</p>
              </div>

              <div className="flex gap-2">
                {r.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(r._id)}
                      className="mt-4 w-1/2 py-2 px-4 bg-[#45db31] text-white font-medium rounded-md flex justify-center items-center cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(r._id)}
                      className="mt-4 w-1/2 py-2 px-4 bg-[#d61b1b] text-white font-medium rounded-md flex justify-center items-center cursor-pointer"
                    >
                      Decline
                    </button>
                  </>
                )}
                {r.status === "Approved" && (
                  <span className="mt-4 w-full py-2 px-4 bg-[#45db31] text-white font-medium rounded-md flex justify-center items-center">
                    Approved
                  </span>
                )}
                {r.status === "Declined" && (
                  <span className="mt-4 w-full py-2 px-4 bg-[#d61b1b] text-white font-medium rounded-md flex justify-center items-center">
                    Declined
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;
