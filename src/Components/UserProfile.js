import { useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/user/password", {
        userId: user.id,
        newPassword: password
      });
      setMsg("Password updated successfully");
      setPassword("");
    } catch {
      setMsg("Error updating password");
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-4">
        <p className="text-gray-700">Name: {user.name}</p>
        <p className="text-gray-700">Email: {user.email}</p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Password
        </button>

        {msg && <p className="text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
