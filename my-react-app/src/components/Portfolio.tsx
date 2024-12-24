import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPortfolio } from '../services/api';
import StockSearch from './StockSearch';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<any>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('You need to login first!');
      navigate('/login');
    } else {
      fetchPortfolio();
    }
  }, [token, navigate]);

  const fetchPortfolio = async () => {
    try {
      const data = await getPortfolio(token!); // Используем API-клиент для запроса
      setPortfolio(data.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      alert('Failed to load portfolio. Please try again later.');
    }
  };

  if (!portfolio) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Portfolio</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Buy Price</th>
              <th className="px-4 py-2">Current Price</th>
              <th className="px-4 py-2">Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.stocks.map((stock: any, index: number) => (
              <tr
                key={stock.symbol}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="border px-4 py-2">{stock.symbol}</td>
                <td className="border px-4 py-2">{stock.quantity}</td>
                <td className="border px-4 py-2">${stock.buy_price.toFixed(2)}</td>
                <td className="border px-4 py-2">${stock.current_price.toFixed(2)}</td>
                <td
                  className="border px-4 py-2 font-semibold"
                  style={{
                    color:
                      stock.current_price * stock.quantity - stock.total_invested >= 0
                        ? 'green'
                        : 'red',
                  }}
                >
                  ${(stock.current_price * stock.quantity - stock.total_invested).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold text-center mt-6">
        Total Profit/Loss:{' '}
        <span
          className={`${
            portfolio.profit_or_loss >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          ${portfolio.profit_or_loss.toFixed(2)}
        </span>
      </h2>
      <StockSearch/>
    </div>
  );
};

export default Portfolio;