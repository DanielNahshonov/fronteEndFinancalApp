import React from 'react';
import StockChart, { StockData } from './StockChart'; // Импортируем StockData и StockChart

// Тип пропсов для компонента StockItem
interface StockItemProps {
  stock: {
    symbol: string; // Символ акции
    companyName: string; // Название компании
    price: number; // Текущая цена акции
    change: number; // Изменение цены
    data: StockData[]; // Данные для графика
  };
}

const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  return (
    <div className="flex flex-col sm:flex-row p-4 bg-white shadow-lg rounded-lg max-w-[500px] mx-auto gap-4"> {/* Ограничиваем ширину и добавляем отступы между блоками */}
      {/* Левый блок с данными об акции */}
      <div className="flex-1 sm:w-1/3 p-4">
        <h2 className="text-xl font-bold">{stock.companyName}</h2>
        <p className="text-lg text-gray-600">({stock.symbol})</p>
        <div className="mt-2">
          <p className="text-lg font-semibold">Price: ${stock.price.toFixed(2)}</p>
          <p className={`text-lg ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change >= 0 ? `+${stock.change.toFixed(2)}` : `${stock.change.toFixed(2)}`}
          </p>
        </div>
        
      </div>

      {/* Правый блок с графиком */}
      <div className="flex-1 sm:w-2/3 p-4">
        <StockChart data={stock.data} />
      </div>
    </div>
  );
};

export default StockItem;