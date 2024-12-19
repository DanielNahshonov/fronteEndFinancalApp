import React, { useState } from 'react';
import StockItem from './StockItem'; // Компонент для отображения данных и графика акции

// Тип для данных, получаемых при поиске акции
interface StockData {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  data: { timestamp: string; close: number }[]; // Примерные данные для графика
}

const StockSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState<StockData[]>([]);

  // Пример данных, которые можно получить по запросу (это будет имитация запроса)
  const fetchStockData = (symbol: string) => {
    return {
      symbol,
      companyName: `${symbol} Inc.`,
      price: Math.random() * 100 + 100, // Генерируем случайную цену для примера
      change: Math.random() * 10 - 5, // Генерируем случайное изменение цены
      data: [
        { timestamp: '2024-12-19 10:00', close: Math.random() * 100 + 150 },
        { timestamp: '2024-12-19 11:00', close: Math.random() * 100 + 150 },
        { timestamp: '2024-12-19 12:00', close: Math.random() * 100 + 150 },
      ], // Пример данных для графика
    };
  };

  // Обработка ввода
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm) return;

    // Имитируем получение данных о акции
    const newStock = fetchStockData(searchTerm.toUpperCase());
    setStocks(prevStocks => [...prevStocks, newStock]);

    // Очищаем поле ввода
    setSearchTerm('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Search for a Stock</h1>
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Enter stock symbol (e.g. AAPL)"
          className="p-2 border rounded-l-lg flex-1"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
          Search
        </button>
      </form>

      <div>
        {stocks.map((stock, index) => (
          <StockItem key={index} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default StockSearch;