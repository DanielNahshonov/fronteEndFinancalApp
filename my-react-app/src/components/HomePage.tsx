// src/components/HomePage.tsx
import TrendingNews from './TrendingNews';

const HomePage = () => {
  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-8">Welcome to the Finance App</h2>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4">
        {/* Контейнер для новостей с отступами слева и справа */}
        <div className="w-full max-w-4xl px-4">
          <TrendingNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;