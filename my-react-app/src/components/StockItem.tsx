import React, { useState } from 'react';
import { addToPortfolio } from '../services/api'; // Функция для добавления акций в портфель

interface Stock {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  data: { time: string; price: number }[];
}

interface StockItemProps {
  apiData: Stock; // Используем тип Stock
}

const StockItem: React.FC<StockItemProps> = ({ apiData }) => {
  const { symbol, companyName, price, change } = apiData;
  const [quantity, setQuantity] = useState<number>(1); // Для хранения количества акций
  const [message, setMessage] = useState<string | null>(null); // Для отображения статуса покупки

  const changeClass = change >= 0 ? 'text-green-600' : 'text-red-600';

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You need to login to buy stocks.');
        return;
      }

      await addToPortfolio({
        symbol,
        quantity,
        buy_price: price,
      }, token);

      setMessage(`Successfully bought ${quantity} shares of ${symbol}`);
    } catch (error) {
      setMessage('Failed to buy stocks. Please try again.');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto gap-4">
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold">{companyName}</h2>
        <p className="text-lg text-gray-600">Symbol: {symbol}</p>
        <div className="mt-2">
          <p className="text-lg font-semibold">Price: ${price.toFixed(2)}</p>
          <p className={`text-lg font-semibold ${changeClass}`}>
            {change >= 0 ? `+${change.toFixed(2)}` : `${change.toFixed(2)}`}
          </p>
        </div>

        {/* Поле ввода количества и кнопка "Купить" */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-2">
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-20 text-center"
            />
          </label>
          <button
            onClick={handleBuy}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Buy
          </button>
        </div>

        {/* Сообщение об успешной покупке */}
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default StockItem;