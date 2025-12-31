import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const url="https://book-backend-ihhw.onrender.com";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isLogin
        ? "{url}/api/login"
        : "{url}/api/signup";

      const res = await axios.post(url, form);
      setMessage(res.data.message);

      if (isLogin && res.data.user) {
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate(user.role === "admin" ? "/admin/dashboard" : "/shop/purchased");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {message && (
            <p className="text-center text-red-500 text-sm">{message}</p>
          )}

          <p
            onClick={() => setIsLogin(!isLogin)}
            className="text-center text-blue-600 cursor-pointer text-sm hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </p>
        </form>
      </div>
    </>
  );
}
