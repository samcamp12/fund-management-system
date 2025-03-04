// routes/performanceMetricRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

/**
 * @desc Get all performance metrics
 * @route GET /api/performance-metrics
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM performancemetric');
    const grouped = rows.reduce((acc, curr) => {
        const fundId = curr.FundID;
        if (!acc[fundId]) {
          acc[fundId] = { id: fundId, MetricDate: curr.MetricDate };
        }
        acc[fundId][curr.MetricType] = curr.MetricValue;
        return acc;
      }, {});
      
      const output = Object.values(grouped);
    res.json(output);
  } catch (error) {
    console.error('Error fetching performance metrics:', error);
    res.status(500).json({ error: 'Server error while fetching performance metrics.' });
  }
});



module.exports = router;
