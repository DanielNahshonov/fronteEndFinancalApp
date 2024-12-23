import React from 'react';
import StockChart, { StockData } from './StockChart';

interface StockItemProps {
  apiData: any; // Данные с сервера
}

const StockItem: React.FC<StockItemProps> = ({ apiData }) => {
  // Преобразуем данные с сервера
  const stockData: StockData[] = transformStockData(apiData);

  // Основные данные акции из Meta Data
  const meta = apiData['Meta Data'];
  const companyName = meta['2. Symbol']; // Используем символ как название компании
  const latestPrice = stockData[0]?.price || 0; // Берем последний (текущий) закрытый курс
  const previousPrice = stockData[1]?.price || latestPrice; // Предыдущий курс для расчета изменения
  const priceChange = latestPrice - previousPrice;

  const changeClass = priceChange >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="flex flex-col sm:flex-row p-4 bg-white shadow-lg rounded-lg max-w-[500px] mx-auto gap-4">
      {/* Левый блок с данными об акции */}
      <div className="flex-1 sm:w-1/3 p-4">
        <h2 className="text-xl font-bold">{companyName}</h2>
        <p className="text-lg text-gray-600">Symbol: {meta['2. Symbol']}</p>
        <div className="mt-2">
          <p className="text-lg font-semibold">Price: ${latestPrice.toFixed(2)}</p>
          <p className={`text-lg font-semibold ${changeClass}`}>
            {priceChange >= 0 ? `+${priceChange.toFixed(2)}` : `${priceChange.toFixed(2)}`}
          </p>
        </div>
      </div>

      {/* Правый блок с графиком */}
      {/* <div className="flex-1 sm:w-2/3 p-4">
        <StockChart data={stockData} />
      </div> */}
    </div>
  );
};

export default StockItem;

// Функция для преобразования данных
const transformStockData = (apiData: any): StockData[] => {
  const timeSeries = apiData['Time Series (5min)'];
  if (!timeSeries) return [];

  return Object.entries(timeSeries).map(([time, values]: [string, any]) => ({
    time,
    price: parseFloat(values['4. close']),
  }));
};