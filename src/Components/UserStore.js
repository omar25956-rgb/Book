import { useEffect, useState } from "react";
import axios from "axios";

export default function UserStore() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [books, setBooks] = useState([]);
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books").then(res => setBooks(res.data));
    axios.get(`http://localhost:5000/api/user/purchases/${user.id}`).then(res => setPurchased(res.data));
  }, [user.id]);

  const buyBook = async bookId => {
    await axios.post("http://localhost:5000/api/user/buy", { userId: user.id, bookId });
    setPurchased([...purchased, books.find(b => b.id === bookId)]);
  };

  const isPurchased = bookId => purchased.some(b => b.id === bookId);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Store</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map(b => (
          <div key={b.id} className="border rounded p-4 bg-white">
            {b.image && (
              <img src={b.image} alt={b.title} className="h-40 w-full object-cover rounded mb-2" />
            )}
            <h3 className="font-bold">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.author}</p>
            <p className="text-sm mt-1">{b.description}</p>
            <p className="font-semibold mt-2">${b.price}</p>

            {isPurchased(b.id) ? (
              <button className="mt-2 w-full bg-gray-400 text-white p-2 rounded" disabled>
                Purchased
              </button>
            ) : (
              <button
                onClick={() => buyBook(b.id)}
                className="mt-2 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
