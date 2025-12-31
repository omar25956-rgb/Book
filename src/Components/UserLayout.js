import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // redirect to login/signup
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">User Panel</h1>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `p-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
              }
            >
              Profile
            </NavLink>

            <NavLink
              to="purchased"
              className={({ isActive }) =>
                `p-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
              }
            >
              My Books
            </NavLink>

            <NavLink
              to="store"
              className={({ isActive }) =>
                `p-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
              }
            >
              Store
            </NavLink>
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
