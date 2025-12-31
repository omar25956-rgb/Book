import { useEffect, useState } from "react";
import axios from "axios";
import { BookCard } from "./BookCard";
export default function UserPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBooks();
    loadPurchased();
  }, []);

  const loadBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const loadPurchased = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/user/purchases/${user.id}`
    );
    setPurchased(res.data);
  };

  const changePassword = async e => {
    e.preventDefault();
    await axios.put("http://localhost:5000/api/user/password", {
      userId: user.id,
      newPassword: password
    });
    setPassword("");
    setMessage("Password updated");
  };

  const buyBook = async bookId => {
    await axios.post("http://localhost:5000/api/user/buy", {
      userId: user.id,
      bookId
    });
    loadPurchased();
  };

  const isPurchased = bookId =>
    purchased.some(b => b.id === bookId);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>

      {/* PASSWORD */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Change Password</h2>
        <form onSubmit={changePassword} className="flex gap-2">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button className="bg-blue-600 text-white px-4 rounded">
            Update
          </button>
        </form>
        <p className="text-green-600 mt-2">{message}</p>
      </div>

      {/* PURCHASED BOOKS */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">My Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {purchased.map(b => (
            <div key={b.id} className="border p-4 rounded bg-gray-50">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm">{b.author}</p>
            </div>
          ))}
          {purchased.length === 0 && (
            <p className="text-gray-500">No books purchased yet</p>
          )}
        </div>
      </div>

      {/* ALL BOOKS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Store</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
          {books.map(b => (
            <div key={b.id} className="border p-4 rounded">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm">{b.author}</p>
              <p className="font-semibold">${b.price}</p>

              {isPurchased(b.id) ? (
                <button
                  disabled
                  className="mt-2 w-full bg-gray-400 text-white p-2 rounded"
                >
                  Purchased
                </button>
              ) : (
                <button
                  onClick={() => buyBook(b.id)}
                  className="mt-2 w-full bg-green-600 text-white p-2 rounded"
                >
                  Buy
                </button>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
