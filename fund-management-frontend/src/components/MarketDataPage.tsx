// src/components/MarketDataPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { testMarketData } from '../constants/testData';
import StockChartExample from './Charts/StockChart';
import FxChart from './Charts/FxChart';
import { getMarketData } from '../services/marketDataService';

export interface StockData {
  date: string;
  google: number;
  apple: number;
  amazon: number
}

export interface ExchangeRate {
  date: string;
  usdToEur: number;
}

const MarketDataPage: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const marketData = await getMarketData();
      marketData.sort((a, b) => a.date.localeCompare(b.date));
      setExchangeRates(marketData.filter(x => x.usdToEur !== "").map(x => {
        return {
          date: x.date,
          usdToEur: x.usdToEur,
        }
      }))
      setStockData(marketData.filter(x => x.google !== "").map(x => {
        return {
          date: x.date,
          google: parseFloat(x.google),
          apple: parseFloat(x.apple),
          amazon: parseFloat(x.amazon),
        }
      }))
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Market Data</Typography>
      <Button variant="contained" onClick={fetchMarketData} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Data'}
      </Button>
      <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h6">Exchange Rates</Typography>
        <FxChart data={exchangeRates}/>
      </Paper>
      <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h6" gutterBottom>Stock Market Data</Typography>
        <StockChartExample data={stockData}/>
      </Paper>
    </Container>
  );
};

export default MarketDataPage;
