const express = require('express');
const cors = require('cors');
const fundRoutes = require('./routes/fundRoutes');
const fundManagerRoutes = require('./routes/fundManagerRoutes');
const investorRoutes = require('./routes/investorRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userAccountRoutes = require('./routes/userAccountRoutes');
const complianceRecordRoutes = require('./routes/complianceRecordRoutes');
const performanceMetricRoutes = require('./routes/performanceMetricRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/funds', fundRoutes);
app.use('/api/fund-managers', fundManagerRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/user-accounts', userAccountRoutes);
app.use('/api/compliance-records', complianceRecordRoutes);
app.use('/api/performance-metrics', performanceMetricRoutes);

// Health check or root route
app.get('/', (req, res) => {
  res.send('Fund Management Backend API is running.');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
