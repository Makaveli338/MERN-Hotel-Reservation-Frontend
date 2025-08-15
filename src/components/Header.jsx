import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice"; // Adjust path if needed

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const username = user?.username || "";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <section className="py-6 flex justify-between items-center max-w-[90%] mx-auto">
        <img src="/logo.png" alt="Logo" />

        <div className="text-white font-semibold text-xl flex gap-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>

          {user && (
            <Link
              to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              className="text-white hover:underline"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white bg-[#d1964e] px-6 py-2 rounded-full hover:cursor-pointer hover:bg-[#866a47]"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-[#d1964e] px-6 py-2 rounded-full hover:cursor-pointer hover:bg-[#866a47]"
            >
              Log in
            </Link>
          )}
        </div>
      </section>

      {/* Welcome Message */}
      {user && (
        <div>
          <p className="text-white text-center font-semibold text-xl">
            Welcome, {username || "Loading..."}
          </p>
        </div>
      )}
    </>
  );
}

export default Navbar;
