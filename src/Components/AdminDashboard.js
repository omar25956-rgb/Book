import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersRes, booksRes, purchasesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users"),
        axios.get("http://localhost:5000/api/books"),
        axios.get("http://localhost:5000/api/admin/purchases"),
      ]);

      setUsers(usersRes.data);
      setBooks(booksRes.data);
      setPurchases(purchasesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
          <p className="text-lg">Total Users</p>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
          <p className="text-lg">Total Books</p>
          <p className="text-3xl font-bold">{books.length}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow flex flex-col items-center">
          <p className="text-lg">Total Purchases</p>
          <p className="text-3xl font-bold">{purchases.length}</p>
        </div>
      </div>

      {/* Purchased Books Table */}
      <div className="mt-6 bg-white shadow rounded overflow-x-auto">
        <h2 className="text-2xl font-bold p-4 border-b">Purchased Books</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Book</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.user_name}</td>
                <td className="p-2 border">{p.book_title}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">
                  {new Date(p.purchased_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No purchases yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
