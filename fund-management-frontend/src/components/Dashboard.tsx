// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import FundGrid from './Grids/FundGrid';
import { api } from '../constants/API';
import { MetricsChart } from './Charts/MetricsChart';

const Dashboard: React.FC = () => {
  const [totalAUM, setTotalAUM] = useState<number>(0);
  const [keyMetrics, setKeyMetrics] = useState({ returns: 0, performanceYoY: 0 });

  // Replace these with your API calls
  useEffect(() => {
    setTotalAUM(150000000);
    setKeyMetrics({ returns: 8.5, performanceYoY: 10.2 });
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Fund Overview Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total AUM</Typography>
              <Typography variant="h4">${totalAUM.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Returns</Typography>
              <Typography variant="h4">{keyMetrics.returns}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">YoY Performance</Typography>
              <Typography variant="h4">{keyMetrics.performanceYoY}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Fund Grid</Typography>
              <FundGrid url={`${api}/funds`} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Fund Performance Over Time</Typography>
              <MetricsChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
