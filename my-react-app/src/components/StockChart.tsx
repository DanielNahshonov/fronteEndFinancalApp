import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Тип данных для одного элемента
interface StockData {
  timestamp: string;
  close: number;
}

// Тип пропсов компонента StockChart
interface StockChartProps {
  data: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Преобразуем данные для графика
  const chartData = {
    labels: data.map(entry => entry.timestamp), // Время
    datasets: [
      {
        label: 'Цена закрытия',
        data: data.map(entry => entry.close), // Значения цены закрытия
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Типизируем options с использованием типов из Chart.js
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Указываем допустимое значение
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `$${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;