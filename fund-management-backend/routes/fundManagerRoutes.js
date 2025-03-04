const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all fund managers
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM fundmanager');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching fund managers.' });
  }
});

// GET single fund manager by ID
router.get('/:id', async (req, res) => {
  const managerID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM fundmanager WHERE FundManagerID = ?', [managerID]);
    if (rows.length === 0) return res.status(404).json({ error: 'Fund manager not found.' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching fund manager.' });
  }
});

// POST create a new fund manager
router.post('/', async (req, res) => {
  const { FirstName, LastName, Email, UserID } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO fundmanager (FirstName, LastName, Email, UserID) VALUES (?, ?, ?, ?)',
      [FirstName, LastName, Email, UserID]
    );
    res.status(201).json({
      message: 'Fund manager created successfully.',
      fundManagerID: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating fund manager.' });
  }
});

// PUT update an existing fund manager
router.put('/:id', async (req, res) => {
  const managerID = req.params.id;
  const { FirstName, LastName, Email, UserID } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE fundmanager
       SET FirstName = ?, LastName = ?, Email = ?, UserID = ?
       WHERE FundManagerID = ?`,
      [FirstName, LastName, Email, UserID, managerID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Fund manager not found or nothing to update.' });
    }

    res.json({ message: 'Fund manager updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating fund manager.' });
  }
});

// DELETE a fund manager
router.delete('/:id', async (req, res) => {
  const managerID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM fundmanager WHERE FundManagerID = ?', [managerID]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Fund manager not found.' });
    }
    res.json({ message: 'Fund manager deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting fund manager.' });
  }
});

module.exports = router;
