// need to add the hash password later

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all user accounts
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM useraccount');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    res.status(500).json({ error: 'Server error while fetching user accounts.' });
  }
});

// GET a single user account by ID
router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM useraccount WHERE UserID = ?', [userID]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User account not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user account:', error);
    res.status(500).json({ error: 'Server error while fetching user account.' });
  }
});

// POST create a new user account
router.post('/', async (req, res) => {
  const { Username, PasswordHash, Role, LastLoginDate } = req.body;

  try {
    // In a real-world app, you'd hash the password with bcrypt or similar
    const [result] = await pool.query(
      `INSERT INTO useraccount (Username, PasswordHash, Role, LastLoginDate)
       VALUES (?, ?, ?, ?)`,
      [Username, PasswordHash, Role, LastLoginDate]
    );

    res.status(201).json({
      message: 'User account created successfully.',
      userID: result.insertId,
    });
  } catch (error) {
    console.error('Error creating user account:', error);
    res.status(500).json({ error: 'Server error while creating user account.' });
  }
});

// PUT update an existing user account
router.put('/:id', async (req, res) => {
  const userID = req.params.id;
  const { Username, PasswordHash, Role, LastLoginDate } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE useraccount
       SET Username = ?, PasswordHash = ?, Role = ?, LastLoginDate = ?
       WHERE UserID = ?`,
      [Username, PasswordHash, Role, LastLoginDate, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User account not found or nothing to update.' });
    }

    res.json({ message: 'User account updated successfully.' });
  } catch (error) {
    console.error('Error updating user account:', error);
    res.status(500).json({ error: 'Server error while updating user account.' });
  }
});

// DELETE a user account
router.delete('/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM useraccount WHERE UserID = ?', [userID]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User account not found.' });
    }
    res.json({ message: 'User account deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ error: 'Server error while deleting user account.' });
  }
});

module.exports = router;
