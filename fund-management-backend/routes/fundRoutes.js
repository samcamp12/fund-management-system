const express = require('express');
const router = express.Router();
const pool = require('../config/db');

/**
 * @desc Get all funds
 * @route GET /api/funds
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM fund');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching funds.' });
  }
});

/**
 * @desc Get a single fund by ID
 * @route GET /api/funds/:id
 */
router.get('/:id', async (req, res) => {
  const fundID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM fund WHERE FundID = ?', [fundID]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Fund not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching fund.' });
  }
});

/**
 * @desc Create a new fund
 * @route POST /api/funds
 */
router.post('/', async (req, res) => {
  const { FundName, FundType, InceptionDate, TotalAssets, FundManagerID } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO fund (FundName, FundType, InceptionDate, TotalAssets, FundManagerID) VALUES (?, ?, ?, ?, ?)',
      [FundName, FundType, InceptionDate, TotalAssets, FundManagerID]
    );

    res.status(201).json({
      message: 'Fund created successfully',
      fundID: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating fund.' });
  }
});

/**
 * @desc Update a fund
 * @route PUT /api/funds/:id
 */
router.put('/:id', async (req, res) => {
  const fundID = req.params.id;
  const { FundName, FundType, InceptionDate, TotalAssets, FundManagerID } = req.body;

  try {
    // You can do partial or full updates depending on your logic
    const [result] = await pool.query(
      `UPDATE fund 
       SET FundName = ?, FundType = ?, InceptionDate = ?, TotalAssets = ?, FundManagerID = ?
       WHERE FundID = ?`,
      [FundName, FundType, InceptionDate, TotalAssets, FundManagerID, fundID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Fund not found or nothing to update.' });
    }

    res.json({ message: 'Fund updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating fund.' });
  }
});

/**
 * @desc Delete a fund
 * @route DELETE /api/funds/:id
 */
router.delete('/:id', async (req, res) => {
  const fundID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM fund WHERE FundID = ?', [fundID]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Fund not found.' });
    }

    res.json({ message: 'Fund deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting fund.' });
  }
});

module.exports = router;
