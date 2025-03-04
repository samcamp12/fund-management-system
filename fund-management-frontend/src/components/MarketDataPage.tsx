// src/components/MarketDataPage.tsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
}

const MarketDataPage: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [euribor, setEuribor] = useState<number | null>(null);
  const [stockData, setStockData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const exchangeRatesData = { USD_EUR: 0.92, GBP_EUR: 1.17 };
      const euriborValue = 0.5;
      const stockDataFetched: MarketData[] = [
        { symbol: 'AAPL', price: 150, change: 1.2 },
        { symbol: 'GOOGL', price: 2800, change: -0.5 },
      ];

      setExchangeRates(exchangeRatesData);
      setEuribor(euriborValue);
      setStockData(stockDataFetched);
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
        {exchangeRates ? (
          <div>
            <Typography>USD to EUR: {exchangeRates.USD_EUR}</Typography>
            <Typography>GBP to EUR: {exchangeRates.GBP_EUR}</Typography>
          </div>
        ) : (
          <Typography>No data available</Typography>
        )}
      </Paper>
      <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h6">EURIBOR</Typography>
        {euribor !== null ? <Typography>{euribor}%</Typography> : <Typography>No data available</Typography>}
      </Paper>
      <Paper style={{ marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h6" gutterBottom>Stock Market Data</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockData.map(stock => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell>{stock.change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default MarketDataPage;
