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
      <section className="py-6 flex flex-col md:flex-row justify-between items-center max-w-[90%] mx-auto gap-4 md:gap-0">
        <img src="/logo.png" alt="Logo" className="w-32 md:w-auto" />

        {/* Links */}
        <div className="flex  text-white font-semibold text-xl gap-2 md:gap-4 items-center">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>

          {user && (
            <Link
              to={
                user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"
              }
              className="text-white hover:underline"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-0">
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
