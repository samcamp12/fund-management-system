import React from 'react';
import { ChartComponent, defaultDateFormatter } from '../ChartComponent';
import { StockData } from '../MarketDataPage';

const StockChart= ({ data }: { data: StockData[] }) => (
  <ChartComponent<StockData>
    data={data}
    xKey="date"
    lines={[
      { dataKey: 'google', color: '#ff7300', label: 'NASDAQ: GOOG', dot: false },
      { dataKey: 'apple', color: '#387908', label: 'NASDAQ: AAPL', dot: false },
      { dataKey: 'amazon', color: '#8884d8', label: 'NASDAQ: AMZN', dot: false },
    ]}
    xAxisTickFormatter={defaultDateFormatter}
    tooltipLabelFormatter={defaultDateFormatter}
    yDomain={[100, 300]}
  />
);

export default StockChart;
