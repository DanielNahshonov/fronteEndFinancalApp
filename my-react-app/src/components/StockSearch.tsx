import React, { useState } from 'react';
import StockItem from './StockItem'; // Компонент для отображения данных об акции
import { searchStock } from '../services/api'; // Функция для отправки запросов к серверу
import { StockData } from '../types/stockTypes';

interface Stock {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  data: { time: string; price: number }[];
}

const StockSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Для хранения введенного символа
  const [stocks, setStocks] = useState<Stock[]>([]); // Для хранения массива данных акций
  const [loading, setLoading] = useState(false); // Для отображения состояния загрузки
  const [error, setError] = useState<string | null>(null); // Для отображения ошибок

  // Обработчик поиска
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) return; // Если строка пустая, ничего не делаем

    setLoading(true); // Начинаем загрузку
    setError(null); // Очищаем ошибки

    try {
      // Отправляем запрос к серверу
      const response = await searchStock(searchTerm.toUpperCase());
      const data: StockData = response.data;
      console.log('Response data:', data);

      if (data.Information) {
        setError(data.Information); // Устанавливаем сообщение об ошибке
        setLoading(false);
        return;
    }

      if (!data['Meta Data']) {
        setError('No data found for the entered symbol.');
        setLoading(false);
        return;
      }

      // Преобразуем данные в нужный формат
      const stock: Stock = {
        symbol: data['Meta Data']['2. Symbol'],
        companyName: 'Example Company', // Можно заменить на реальные данные
        price: parseFloat(Object.values(data['Time Series (5min)'])[0]['4. close']),
        change: 0, // Пока оставляем 0, можно рассчитать на основе данных
        data: Object.entries(data['Time Series (5min)']).map(([time, values]: [string, any]) => ({
          time,
          price: parseFloat(values['4. close']),
        })),
      };

      // Добавляем новый объект в массив
      setStocks((prevStocks) => [...prevStocks, stock]);
      setSearchTerm(''); // Очищаем поле ввода
    } catch (err: any) {
      // Обрабатываем ошибку
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Search for a Stock</h1>
      <form onSubmit={handleSearch} className="flex mb-6 shadow-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter stock symbol (e.g. AAPL)"
          className="p-3 border rounded-l-lg flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-all"
        >
          Search
        </button>
      </form>

      {/* Отображение загрузки или ошибки */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Отображение списка акций */}
      <div className="space-y-4 mt-4">
        {stocks.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500">No stocks added yet. Search for a stock to add it to the list.</p>
        )}
        {stocks.map((stock) => (
          <StockItem key={stock.symbol} apiData={stock} />
        ))}
      </div>
    </div>
  );
};

export default StockSearch;