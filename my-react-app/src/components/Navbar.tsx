// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '20px' }}>
        <li>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
        </li>
        <li>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        </li>
        <li>
          <Link to="/stock-search" style={{ color: '#fff', textDecoration: 'none' }}>Search Stocks</Link>
        </li>
        <li>
          <Link to="/popular-stocks" style={{ color: '#fff', textDecoration: 'none' }}>Popular Stocks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;