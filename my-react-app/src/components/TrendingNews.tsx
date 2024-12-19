// src/components/TrendingNews.tsx
import { useState, useEffect } from 'react';
import { getTrendingNews } from '../services/api'; // Убедись, что API правильно импортирован
import NewsItem  from './NewsItem'; // Импортируем компонент для новостей

const TrendingNews = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getTrendingNews();
      if (response && response.data) {
        setNews(response.data);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="space-y-6">
      {news.length > 0 ? (
        news.map((item, index) => (
          <NewsItem key={index} news={item} />
        ))
      ) : (
        <p>Loading trending news...</p>
      )}
    </div>
  );
};

export default TrendingNews;