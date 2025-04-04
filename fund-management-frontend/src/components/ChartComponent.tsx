import React, { JSX } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useRowDataFetch } from '../hooks/useRowDataFetch';

export interface ChartLine<T> {
  dataKey: keyof T;
  color?: string;
  label?: string;
  dot?: boolean;
}

export interface GeneralChartProps<T> {
  /** Optional URL to fetch data. If provided, data prop is ignored. */
  url?: string;
  /** Alternatively, pass in the data directly. */
  data?: T[];
  /** Field to use for the x-axis */
  xKey: keyof T;
  /** Array of line configurations to render */
  lines: ChartLine<T>[];
  /** Optional custom formatter for the x-axis ticks */
  xAxisTickFormatter?: (value: any, index: number) => string;
  /** Optional custom formatter for tooltip labels */
  tooltipLabelFormatter?: (label: any) => string;
  /** Y-axis domain (e.g., [0, 25]). Defaults to [0, 'auto'] */
  yDomain?: [number, number | 'auto'];
  /** Margin for the chart container */
  margin?: { top: number; right: number; bottom: number; left: number };
  /** Height of the chart (container) */
  height?: number;
  yAxisUnit?: string;
}


export const defaultDateFormatter = (dateStr: string) => {
  const date = new Date(dateStr);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yy = String(date.getFullYear());
  return `${mm}-${dd}-${yy}`;
};

export const ChartComponent = <T extends object>({
  url,
  data,
  xKey,
  lines,
  xAxisTickFormatter,
  tooltipLabelFormatter,
  yDomain = [0, 'auto'],
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  height = 300,
  yAxisUnit,
}: GeneralChartProps<T>): JSX.Element => {
  // If no data provided but a URL is available, fetch the data.
  const { rowData, error } = useRowDataFetch<T>(url || '');
  const chartData = data || rowData;

  if (url && error) {
    return <div>Data error</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey as string} tickFormatter={xAxisTickFormatter} />
        <YAxis 
          domain={yDomain}           
          tickFormatter={(value: number) =>
            yAxisUnit ? `${yAxisUnit}${value}` : value.toString()
          }/>
        <Tooltip labelFormatter={tooltipLabelFormatter} />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey as string}
            stroke={line.color || '#000'}
            name={line.label}
            dot={line.dot}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
