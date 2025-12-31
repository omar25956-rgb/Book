import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPurchased() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/purchases/${user.id}`).then(res => setPurchased(res.data));
  }, [user.id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {purchased.map(b => (
          <div key={b.id} className="border rounded p-4 bg-white">
            {b.image && (
              <img src={b.image} alt={b.title} className="h-40 w-full object-cover rounded mb-2" />
            )}
            <h3 className="font-bold">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.author}</p>
            <p className="text-sm mt-1">{b.description}</p>
            <p className="font-semibold mt-2">${b.price}</p>
          </div>
        ))}
        {purchased.length === 0 && (
          <p className="text-gray-500 col-span-full">No books purchased yet.</p>
        )}
      </div>
    </div>
  );
}
