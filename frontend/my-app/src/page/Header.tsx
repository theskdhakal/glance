import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="bg-blue-200 py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo or Brand */}
          <div className="text-xl font-bold text-blue-800">
            <Link to="/">MyApp</Link>
          </div>

          {/* Navigation Links */}
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-blue-900 hover:text-white px-3 py-2 rounded-md bg-green-100 hover:bg-green-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-900 hover:text-white px-3 py-2 rounded-md bg-green-100 hover:bg-green-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
