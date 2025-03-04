// src/components/ChartComponent.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRowDataFetch } from '../hooks/useRowDataFetch';

interface ChartComponentProps {
  url: string
}

interface DataPoint {
  id: number,
  MetricDate: string;
  IRR: number;
  MOIC: number;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear());
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}-${dd}-${yy}`;
};

const ChartComponent: React.FC<ChartComponentProps> = ({ url }) => {
  const { rowData, error } = useRowDataFetch<DataPoint>(url);
  return (
    !error ? <ResponsiveContainer width="100%" height={300}>
      <LineChart data={rowData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="MetricDate" tickFormatter={formatDate}/>
        <YAxis  domain={[0, 25]} />
        <Tooltip labelFormatter={(label) => formatDate(label)}/>
        <Legend />
        <Line type="monotone" dataKey="IRR" stroke="#8884d8" />
        <Line type="monotone" dataKey="MOIC" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer> : <div>Data error</div>
  );
};

export default ChartComponent;
