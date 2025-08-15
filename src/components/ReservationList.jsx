// src/components/ReservationList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations } from "../redux/reservationSlice";

const statusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-[#d1964e]";
    case "Approved":
      return "bg-[#45db31]";
    case "Declined":
      return "bg-[#d61b1b]";
    default:
      return "bg-gray-300";
  }
};


const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


const ReservationsList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.reservations);
  const user = useSelector((s) => s.auth.user); // expecting { name, role }

  useEffect(() => {
    dispatch(fetchReservations({ isAdmin: false, userName: user?.name }));
  }, [dispatch, user?.name]);

  if (loading) return <p className="text-center mt-10">Loading your bookings…</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!list.length) return <p className="text-center mt-10">No bookings yet.</p>;

  return (
    <div className="mt-20">
      <div className="flex text-[#AE7D54] text-2xl justify-center gap-2">
        <p className="font-sans">Your bookings</p>
      </div>

      {list.map((r) => (
        <div key={r.id} className="mt-5 w-[70%] h-auto lg:h-40 grid lg:grid-cols-4 mx-auto px-6 py-9 gap-10 bg-white shadow-md rounded-xl border border-[#AE7D54]">
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
          <div>
            <span className={`mt-4 w-full py-2 px-4 text-white font-medium rounded-md flex justify-center items-center ${statusColor(r.status)}`}>
              {r.status.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationsList;
