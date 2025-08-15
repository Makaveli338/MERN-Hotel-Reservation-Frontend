import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";


export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Attempting to log in with email:", email);

      const action = await dispatch(loginUser({ email, password }));

      if (action.meta.requestStatus === "fulfilled") {
        console.log("Action payload:", action.payload);
        console.log("Login successful, navigating to dashboard");

         const { role } = action.payload

       if (role === "admin") {
    navigate("/admin-dashboard");
  } else {
    navigate("/user-dashboard");
  }
      } else {
        console.error("Login failed");
      }
    } else {
      console.log("Registering new user with email:", email);
      try {
        const response = await axiosInstance.post("/auth/register", {
          username,
          email,
          password,
        });

        console.log("Registration successful:", response.data);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    }
  };

  return (
    <section>
      <div className=" absolute top-10 left-10">
        <Link
          to="/"
          className="text-white bg-[#d1964e] px-6 py-2 rounded-full hover:cursor-pointer hover:bg-[#866a47]"
        >
          Home
        </Link>
      </div>
      <div className="mt-[10%] border bg-[#F8F4EF] rounded-[10px] w-2/4 mx-auto text-sm font-medium flex items-center">
        <div
          className="bg-[url('/bg.jpg')] w-[50%] h-130 rounded-l-[10px]"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <img className="p-3" src="/logo.png" alt="Logo" />
        </div>

        <div className="grid items-center justify-center gap-4 p-10 w-[50%]">
          <div className="w-full">
            <h1 className="text-2xl">
              {isLogin ? "Login with email" : "Register with email"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="grid mx-auto">
            <label htmlFor="email">Enter your email:</label>
            <input
              className="border h-10 w-80 rounded-xl px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
            />

            <label className="mt-2" htmlFor="password">
              Password:
            </label>
            <input
              className="border h-10 rounded-xl px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />

            {!isLogin && (
              <>
                <label className="mt-2" htmlFor="username">
                  Username:
                </label>
                <input
                  className="border h-10 w-80 rounded-xl px-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                  name="username"
                />
              </>
            )}

            <input
              className="border mt-6 hover:bg-[#55432c] cursor-pointer rounded-lg w-4/5 mx-auto p-2"
              value={isLogin ? "Login" : "Register"}
              type="submit"
              disabled={isLoading}
            />

            {error && (
              <p className="text-red-500 mt-2">
                {error.message || "Something went wrong"}
              </p>
            )}

            <p className="mt-4 text-center text-sm text-gray-600">
              {!isLogin ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-[#d1964e] hover:underline"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-[#d1964e] hover:underline"
                  >
                    Register
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
