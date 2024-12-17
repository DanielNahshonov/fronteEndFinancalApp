// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import StockSearch from './components/StockSearch';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stock-search" element={<StockSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;