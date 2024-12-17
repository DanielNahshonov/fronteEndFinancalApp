// src/components/StockSearch.tsx
import { useState } from 'react';
import StockChart from './StockChart';

// Тип для данных, которые приходят с API
interface StockApiResponse {
  "Time Series (5min)": {
    [key: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

const StockSearch = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<{ timestamp: string; close: number }[] | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStockData(null);

    try {
      const response = await fetch(`https://backendforfinanceapp-3ce922e8f420.herokuapp.com/stocks/${stockSymbol}`);

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const responseData: StockApiResponse = await response.json();
      
      // Обрабатываем данные, чтобы получить нужную информацию для графика
      const processedData = Object.entries(responseData["Time Series (5min)"]).map(([timestamp, data]) => ({
        timestamp,
        close: parseFloat(data["4. close"]),
      }));

      setStockData(processedData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Search for Stock</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          placeholder="Enter stock symbol"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>Error: {error}</p>}
      
      {stockData && <StockChart data={stockData} />}
    </div>
  );
};

export default StockSearch;