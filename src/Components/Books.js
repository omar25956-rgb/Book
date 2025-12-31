import React, { use } from 'react'
import { BookCard } from './BookCard';
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from './NavBar';
function Books() {

  const [books, setBooks] = useState([]);
    const loadBooks = async () => {
    const res = await axios.get("https://book-backend-ihhw.onrender.com/api/books");
    setBooks(res.data);
  };


useEffect(() => {
    loadBooks();
 }, []);

  return (
    <div>
      <NavBar/>
        <section className="p-10">
<h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
Our Books
</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map(b => (
            <div key={b.id} className="border rounded p-3">
              {b.image && (
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.author}</p>
              <p className="text-sm mt-1">{b.description}</p>
              <p className="font-semibold mt-2">${b.price}</p>
            </div>
          ))}
        </div>
</section>
    </div>
  )
}

export default Books
