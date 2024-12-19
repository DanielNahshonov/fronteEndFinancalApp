// src/services/api.ts
import axios from 'axios';

const apiUrl = 'https://backendforfinanceapp-3ce922e8f420.herokuapp.com/';

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