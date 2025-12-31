import { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setMsg(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending message");
    }
  };

  return (
    <>
      <NavBar />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Contact Us</h2>

          {msg && <p className="text-center text-green-600 mb-4">{msg}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1">Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
