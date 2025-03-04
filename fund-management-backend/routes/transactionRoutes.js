const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM transaction');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Server error while fetching transactions.' });
  }
});

// GET a single transaction by ID
router.get('/:id', async (req, res) => {
  const transactionID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM transaction WHERE TransactionID = ?', [transactionID]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Server error while fetching transaction.' });
  }
});

// POST create a new transaction
router.post('/', async (req, res) => {
  const { InvestmentID, TransactionType, TransactionDate, Amount } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO transaction (InvestmentID, TransactionType, TransactionDate, Amount)
       VALUES (?, ?, ?, ?)`,
      [InvestmentID, TransactionType, TransactionDate, Amount]
    );

    res.status(201).json({
      message: 'Transaction created successfully.',
      transactionID: result.insertId,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Server error while creating transaction.' });
  }
});

// PUT update an existing transaction
router.put('/:id', async (req, res) => {
  const transactionID = req.params.id;
  const { InvestmentID, TransactionType, TransactionDate, Amount } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE transaction
       SET InvestmentID = ?, TransactionType = ?, TransactionDate = ?, Amount = ?
       WHERE TransactionID = ?`,
      [InvestmentID, TransactionType, TransactionDate, Amount, transactionID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found or nothing to update.' });
    }

    res.json({ message: 'Transaction updated successfully.' });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Server error while updating transaction.' });
  }
});

// DELETE a transaction
router.delete('/:id', async (req, res) => {
  const transactionID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM transaction WHERE TransactionID = ?', [transactionID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    res.json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Server error while deleting transaction.' });
  }
});

module.exports = router;
