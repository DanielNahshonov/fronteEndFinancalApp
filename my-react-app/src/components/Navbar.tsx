// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token'); // Проверяем наличие токена

  return (
    <nav className="bg-purple-600 text-white p-4 shadow-md">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-200 transition-colors duration-300">
            Home
          </Link>
        </li>
        {!token ? (
          <>
            <li>
              <Link to="/register" className="hover:text-gray-200 transition-colors duration-300">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-200 transition-colors duration-300">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/stock-search" className="hover:text-gray-200 transition-colors duration-300">
                Search Stocks
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-gray-200 transition-colors duration-300">
                Portfolio
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="hover:text-gray-200 transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;