const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all compliance records
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM compliancerecord');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching compliance records:', error);
    res.status(500).json({ error: 'Server error while fetching compliance records.' });
  }
});

// GET a single compliance record by ID
router.get('/:id', async (req, res) => {
  const complianceID = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM compliancerecord WHERE ComplianceID = ?', [complianceID]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Compliance record not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching compliance record:', error);
    res.status(500).json({ error: 'Server error while fetching compliance record.' });
  }
});

// POST create a new compliance record
router.post('/', async (req, res) => {
  const { FundID, ComplianceDate, ComplianceType, Status, Notes } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO compliancerecord (FundID, ComplianceDate, ComplianceType, Status, Notes)
       VALUES (?, ?, ?, ?, ?)`,
      [FundID, ComplianceDate, ComplianceType, Status, Notes]
    );

    res.status(201).json({
      message: 'Compliance record created successfully.',
      complianceID: result.insertId,
    });
  } catch (error) {
    console.error('Error creating compliance record:', error);
    res.status(500).json({ error: 'Server error while creating compliance record.' });
  }
});

// PUT update an existing compliance record
router.put('/:id', async (req, res) => {
  const complianceID = req.params.id;
  const { FundID, ComplianceDate, ComplianceType, Status, Notes } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE compliancerecord
       SET FundID = ?, ComplianceDate = ?, ComplianceType = ?, Status = ?, Notes = ?
       WHERE ComplianceID = ?`,
      [FundID, ComplianceDate, ComplianceType, Status, Notes, complianceID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Compliance record not found or nothing to update.' });
    }

    res.json({ message: 'Compliance record updated successfully.' });
  } catch (error) {
    console.error('Error updating compliance record:', error);
    res.status(500).json({ error: 'Server error while updating compliance record.' });
  }
});

// DELETE a compliance record
router.delete('/:id', async (req, res) => {
  const complianceID = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM compliancerecord WHERE ComplianceID = ?', [complianceID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Compliance record not found.' });
    }

    res.json({ message: 'Compliance record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting compliance record:', error);
    res.status(500).json({ error: 'Server error while deleting compliance record.' });
  }
});

module.exports = router;
