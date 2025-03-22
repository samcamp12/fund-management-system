import React from 'react';
import { ChartComponent, defaultDateFormatter } from '../ChartComponent';
import { api } from '../../constants/API';

interface MetricsData {
  id: number;
  MetricDate: string;
  IRR: number;
  MOIC: number;
}

export const MetricsChart = () => (
  <ChartComponent<MetricsData>
    url={`${api}/performance-metrics`}
    xKey="MetricDate"
    lines={[
      { dataKey: 'IRR', color: '#8884d8', label: 'IRR' },
      { dataKey: 'MOIC', color: '#82ca9d', label: 'MOIC' },
    ]}
    xAxisTickFormatter={defaultDateFormatter}
    tooltipLabelFormatter={defaultDateFormatter}
    yDomain={[0, 25]}
  />
);

