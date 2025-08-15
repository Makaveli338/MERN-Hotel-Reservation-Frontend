// src/pages/UserDashboard.jsx
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReservationsList from "../components/ReservationList";
import { useDispatch, useSelector } from "react-redux";
import { addReservation, fetchReservations } from "../redux/reservationSlice";

export default function UserDashboardPage() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user); // expecting { name }
  console.log("DEBUG - Current Redux auth.user:", user);

  const { error } = useSelector((s) => s.reservations);

  useEffect(() => {
    // Load current user's bookings
    dispatch(fetchReservations({ isAdmin: false, userName: user?.username }));
  }, [dispatch, user?.username]);

  const Book = async () => {
    if (!checkInDate || !checkOutDate || !guests) {
      console.error("Please fill in all fields.");
      return;
    }
    if (!user?.username) {
      console.error("Missing user name for booking.");
      return;
    }

    console.log("DEBUG - Booking details:", {
  guestName: user?.username || user?.username,
  checkInDate,
  checkOutDate,
  guests
});


    await dispatch(
      addReservation({
        username: user.username,
        checkInDate,
        checkOutDate,
        guests: Number(guests),
      })
    );

    // Refresh list (in case filters or server logic changes)
    dispatch(fetchReservations({ isAdmin: false, userName: user?.username }));

    // Reset form
    setCheckInDate("");
    setCheckOutDate("");
    setGuests(1);
  };

  return (
    <>
      <section className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen w-full mb-40 relative">
        <Header />

        <div className="max-w-5xl mx-auto lg:py-60 py-5 grid">
          <div className="flex gap-2 justify-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
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
            <h1 className=" text-6xl lg:text-9xl text-white font-medium playfair">
              Book your dream vacation with us
            </h1>
            <button
              onClick={Book}
              className="text-white bg-[#d1964e] hover:bg-[#866a47] mt-5 pl-8 py-3 w-40 rounded-full hover:cursor-pointer flex justify-self-center"
            >
              Book now
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Booking Form */}
        <div className="rounded-xl border border-[#AE7D54] absolute -bottom-90 lg:-bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] h-auto lg:h-40 grid  lg:grid-cols-4 mx-auto px-6 py-9 gap-10 bg-white shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-In
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="hover:cursor-pointer mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-Out
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="hover:cursor-pointer mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="hover:cursor-pointer mt-1 w-full p-2 border border-gray-300 rounded-md"
            >
              {Array.from({ length: 10 }, (_, n) => (
                <option key={n} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={Book}
            className="mt-4 w-full py-2 px-4 bg-[#d1964e] text-white font-medium rounded-md hover:bg-[#866a47] cursor-pointer"
          >
            BOOK
          </button>
        </div>
      </section>

      {error && (
        <p className="text-center text-red-600 mt-6">
          {String(error)}
        </p>
      )}

      {/* User's reservations */}
      <div className="mt-60 flex flex-col gap-4">
      <ReservationsList />
      <Footer />
      </div>
        
    </>
  );
}
