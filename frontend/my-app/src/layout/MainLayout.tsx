import { Footer } from "../page/Footer";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../components/UserSlice";
import type { ReactNode } from "react";
import { useState } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const handleOnLogout = () => {
    dispatch(setUser(null));
    setIsAccountOpen(false);
    localStorage.setItem("access_token", "");
    localStorage.setItem("refresh_token", "");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Navbar */}
      <header className="md:hidden flex justify-between items-center bg-blue-800 text-white p-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="text-2xl font-bold"
        >
          ☰
        </button>
        <Link to="/" className="text-xl font-bold">
          Glance
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="bg-green-100 hover:bg-green-300 text-blue-900 font-medium px-3 py-1 rounded-md"
          >
            {user ? user.username : "Account"}
          </button>
          {isAccountOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-20 text-gray-700">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleOnLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for md+ */}
        <aside className="w-64 border-r border-gray-200 p-4 hidden md:block">
          <div className="text-xl font-bold text-blue-800 mb-8">
            <Link to="/">Glance</Link>
          </div>
          <ul className="space-y-6 text-gray-700 font-semibold">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Search</li>
            <li className="hover:text-blue-600 cursor-pointer">Messages</li>
            <li className="hover:text-blue-600 cursor-pointer">Notifications</li>
          </ul>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMenuOpen && (
          <aside
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="bg-white w-64 h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xl font-bold text-blue-800 mb-8">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Glance
                </Link>
              </div>
              <ul className="space-y-6 text-gray-700 font-semibold">
                <li
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </li>
                <li
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search
                </li>
                <li
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </li>
                <li
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notifications
                </li>
              </ul>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 max-w-2xl mx-auto">{children}</main>

        {/* Right Sidebar for md+ */}
        <aside className="w-64 border-l border-gray-200 p-4 hidden md:flex flex-col items-end">
          <div className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="bg-green-100 hover:bg-green-300 text-blue-900 font-medium px-4 py-2 rounded-md"
            >
              {user ? user.username : "Account"}
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleOnLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};
