// src/components/HomePage.tsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Finance App</h2>
      <p>Here you can register, log in, and track popular stocks!</p>
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/stock-search">Search Stocks</Link>
          </li>
          <li>
            <Link to="/popular-stocks">Popular Stocks</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;