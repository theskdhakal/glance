import { Footer } from "../page/Footer";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setUser } from "../components/userSlice";
import type { ReactNode } from "react";
import { useState } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnLogout = () => {
    dispatch(setUser(null));
    setIsOpen(false);
    localStorage.setItem("access_token","");
    localStorage.setItem("refresh_token","")
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Left Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 p-4 max-w-2xl mx-auto">{children}</main>

        {/* Right Sidebar / Profile / Auth */}
        <aside className="w-64 border-l border-gray-200 p-4 hidden md:flex flex-col items-end">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-green-100 hover:bg-green-300 text-blue-900 font-medium px-4 py-2 rounded-md"
            >
              {user ? user.username : "Account"}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => setIsOpen(false)}
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
