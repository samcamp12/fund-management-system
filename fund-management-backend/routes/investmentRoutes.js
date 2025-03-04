const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all investments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM investment');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching investments.' });
  }
});

// GET investment by ID
router.get('/:id', async (req, res) => {
  const investmentID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM investment WHERE InvestmentID = ?', [investmentID]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Investment not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching investment.' });
  }
});

// POST create a new investment
router.post('/', async (req, res) => {
  const { InvestorID, FundID, InvestmentDate, Amount } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO investment (InvestorID, FundID, InvestmentDate, Amount) VALUES (?, ?, ?, ?)',
      [InvestorID, FundID, InvestmentDate, Amount]
    );
    res.status(201).json({
      message: 'Investment created successfully.',
      investmentID: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating investment.' });
  }
});

// PUT update an existing investment
router.put('/:id', async (req, res) => {
  const investmentID = req.params.id;
  const { InvestorID, FundID, InvestmentDate, Amount } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE investment
       SET InvestorID = ?, FundID = ?, InvestmentDate = ?, Amount = ?
       WHERE InvestmentID = ?`,
      [InvestorID, FundID, InvestmentDate, Amount, investmentID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Investment not found or nothing to update.' });
    }
    res.json({ message: 'Investment updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating investment.' });
  }
});

// DELETE an investment
router.delete('/:id', async (req, res) => {
  const investmentID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM investment WHERE InvestmentID = ?', [investmentID]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Investment not found.' });
    }
    res.json({ message: 'Investment deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting investment.' });
  }
});

module.exports = router;
