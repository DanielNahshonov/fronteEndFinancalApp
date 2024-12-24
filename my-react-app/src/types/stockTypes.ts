// src/types/stockTypes.ts

export interface TimeSeries {
    [key: string]: {
      '4. close': string;
    };
  }
  
  export interface StockData {
    Information: any;
    price: number;
    'Meta Data': {
      '2. Symbol': string;
    };
    'Time Series (5min)': TimeSeries;
  }