import axios from "axios";

// const apiUrl = 'https://backendforfinanceapp-3ce922e8f420.herokuapp.com/';
const apiUrl = "http://127.0.0.1:5000";

// Аутентификация
export const register = (email: string, password: string) => {
  return axios.post(`${apiUrl}/auth/register`, { email, password });
};

export const login = (email: string, password: string) => {
  return axios.post(`${apiUrl}/auth/login`, { email, password });
};

export const getUsers = () => {
  return axios.get(`${apiUrl}/auth/users`);
};

// Данные о акциях
export const searchStock = (symbol: string) => {
  return axios.get(`${apiUrl}/stocks/${symbol}`);
};

export const getPopularStocks = () => {
  return axios.get(`${apiUrl}/stocks/popular`);
};

// Новости
export const getStockNews = (keywords: string) => {
  return axios.get(`${apiUrl}/stocks/news`, { params: { keywords } });
};

export const getTrendingNews = () => {
  return axios.get(`${apiUrl}/stocks/news/trending`);
};

// Портфель
export const addToPortfolio = (
  data: { symbol: string; quantity: number; buy_price: number },
  token: string
) => {
  return axios.post(`${apiUrl}/portfolio/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPortfolio = (token: string) => {
  return axios.get(`${apiUrl}/portfolio`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const sellFromPortfolio = (
  token: string,
  symbol: string,
  quantity: number,
  sellPrice: number
) => {
  return axios.post(
    `${apiUrl}/portfolio/sell`,
    { symbol, quantity, sell_price: sellPrice },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
