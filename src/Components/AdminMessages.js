import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.id}>
                <td className="p-2 border">{m.name}</td>
                <td className="p-2 border">{m.email}</td>
                <td className="p-2 border">{m.message}</td>
                <td className="p-2 border">{new Date(m.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
