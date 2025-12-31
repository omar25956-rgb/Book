import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const res = await axios.get("https://book-backend-ihhw.onrender.com/api/books");
    setBooks(res.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = async e => {
    e.preventDefault();
    await axios.post("/api/admin/books", form);
    setForm({ title: "", author: "", price: "", image: "", description: "" });
    loadBooks();
  };

  const startEdit = book => {
    setEditingId(book.id);
    setForm(book);
  };

  const updateBook = async () => {
    await axios.put(`/api/admin/books/${editingId}`, form);
    setEditingId(null);
    setForm({ title: "", author: "", price: "", image: "", description: "" });
    loadBooks();
  };

  const deleteBook = async id => {
    if (!window.confirm("Delete this book?")) return;
    await axios.delete(`/api/admin/books/${id}`);
    loadBooks();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

      {/* ADD / EDIT FORM */}
      <form
        onSubmit={editingId ? e => e.preventDefault() : addBook}
        className="bg-white p-4 shadow rounded mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input className="border p-2 rounded" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input className="border p-2 rounded" name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <input className="border p-2 rounded" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input className="border p-2 rounded" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea className="border p-2 rounded col-span-2" name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        {editingId ? (
          <div className="col-span-2 flex gap-2">
            <button onClick={updateBook} className="bg-green-600 text-white px-4 py-2 rounded">
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button className="bg-blue-600 text-white py-2 rounded col-span-2">
            Add Book
          </button>
        )}
      </form>

      {/* BOOKS TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Author</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id}>
                <td className="p-2 border">
                  {b.image && (
                    <img src={b.image} alt="" className="h-16 w-12 object-cover" />
                  )}
                </td>
                <td className="p-2 border">{b.title}</td>
                <td className="p-2 border">{b.author}</td>
                <td className="p-2 border">${b.price}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => startEdit(b)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(b.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
