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
  const [selectedRoom, setSelectedRoom] = useState("");
  const { error } = useSelector((s) => s.reservations);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Load current user's bookings
    dispatch(fetchReservations({ isAdmin: false, userName: user?.username }));
  }, [dispatch, user?.username]);

  const Book = async () => {
    if (!checkInDate || !checkOutDate || !guests || !selectedRoom) {
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
      guests,
      room: selectedRoom,
    });

    await dispatch(
      addReservation({
        username: user.username,
        checkInDate,
        checkOutDate,
        guests: Number(guests),
        room: selectedRoom,
      })
    );

    // Refresh list (in case filters or server logic changes)
    dispatch(fetchReservations({ isAdmin: false, userName: user?.username }));

    // Reset form
    setCheckInDate("");
    setCheckOutDate("");
    setGuests(1);
    setSelectedRoom("");
  };

  return (
    <>
      <section className="bg-[url('/bg.jpg')] bg-cover bg-center h-screen w-full mb-40 relative">
        <Header />

        <div className="max-w-5xl mx-auto lg:pt-60 py-5 grid">
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
              className="text-white bg-[#d1964e] hover:bg-[#866a47] mt-5 px-4 py-2 rounded-full hover:cursor-pointer flex justify-self-center"
            >
              Book now
              
            </button>
          </div>
        </div>

        {/* Booking Form */}
        <div className="rounded-xl border border-[#AE7D54] absolute -bottom-110 lg:-bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] h-auto lg:h-40 grid  lg:grid-cols-5 mx-auto px-6 py-9 gap-10 bg-white shadow-md items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Check-In
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="hover:cursor-pointer  w-full p-2 border border-gray-300 rounded-md"
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
              className="hover:cursor-pointer  w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="hover:cursor-pointer  w-full py-2 border border-gray-300 rounded-md"
            >
              {Array.from({ length: 10 }, (_, n) => (
                <option key={n} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full  relative">
            <h1 className="block text-sm font-medium text-gray-700">
              Guests
            </h1>
            {/* Dropdown Button */}
            <div
              onClick={toggleDropdown}
              className="flex justify-between items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:border-[#d1964e] transition cursor-pointer"
            >
              <p className="text-gray-600 font-medium">
                {selectedRoom || "Select Room"}
              </p>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 mt-2 w-full rounded-xl flex flex-col bg-white border border-gray-200 shadow-lg overflow-hidden animate-fadeIn">
                <div
                  onClick={() => {
                    setSelectedRoom("Deluxe Room");
                    setIsOpen(false);
                  }}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                >
                  <p className="text-gray-700">Deluxe Room</p>
                  <p className="text-[#d1964e] font-semibold">$120/night</p>
                </div>

                <div
                  onClick={() => {
                    setSelectedRoom("Suite Room");
                    setIsOpen(false);
                  }}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                >
                  <p className="text-gray-700">Suite Room</p>
                  <p className="text-[#d1964e] font-semibold">$200/night</p>
                </div>

                <div
                  onClick={() => {
                    setSelectedRoom("Standard Room");
                    setIsOpen(false);
                  }}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
                >
                  <p className="text-gray-700">Standard Room</p>
                  <p className="text-[#d1964e] font-semibold">$80/night</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={Book}
            className="mt-3 w-full py-2 px-4 bg-[#d1964e] text-white font-medium rounded-md hover:bg-[#866a47] cursor-pointer"
          >
            BOOK
          </button>
        </div>
      </section>

      {error && (
        <p className="text-center text-red-600 mt-6">{String(error)}</p>
      )}

      {/* User's reservations */}
      <div className="mt-60 lg:mt-0 flex flex-col gap-4">
        <ReservationsList />
        <Footer />
      </div>
    </>
  );
}
