// src/components/NewsItem.tsx
const NewsItem = ({ news }: { news: any }) => {
    return (
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-4 space-y-4 md:space-y-0 md:space-x-6 max-w-[700px] max-h-[500px] mx-auto">
        <div className="flex-shrink-0">
          <img 
            src={news.banner_image} 
            alt={news.title} 
            className=" max-w-48 object-cover rounded-lg" 
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
          <p className="text-sm text-gray-600">{news.summary}</p>
          <div className="flex justify-between items-center mt-2">
            <a href={news.url} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Read more</a>
            <span className="text-sm text-gray-500">{news.time_published}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewsItem;