const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all investors
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM investor');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching investors.' });
  }
});

// GET single investor by ID
router.get('/:id', async (req, res) => {
  const investorID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM investor WHERE InvestorID = ?', [investorID]);
    if (rows.length === 0) return res.status(404).json({ error: 'Investor not found.' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching investor.' });
  }
});

// POST create a new investor
router.post('/', async (req, res) => {
  const { FirstName, LastName, Email, Phone, Address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO fundmanager.investor (FirstName, LastName, Email, Phone, Address, UserID) VALUES (?, ?, ?, ?, ?, ?)',
      [FirstName, LastName, Email, Phone, Address]
    );
    res.status(201).json({
      message: 'Investor created successfully.',
      investorID: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating investor.' });
  }
});

// PUT update an existing investor
router.put('/:id', async (req, res) => {
  const investorID = req.params.id;
  const { FirstName, LastName, Email, Phone, Address } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE investor
       SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, Address = ?
       WHERE InvestorID = ?`,
      [FirstName, LastName, Email, Phone, Address, investorID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Investor not found or nothing to update.' });
    }

    res.json({ message: 'Investor updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating investor.' });
  }
});

// DELETE an investor
router.delete('/:id', async (req, res) => {
  const investorID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM investor WHERE InvestorID = ?', [investorID]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Investor not found.' });
    }
    res.json({ message: 'Investor deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting investor.' });
  }
});

module.exports = router;
