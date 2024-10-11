const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/employee');

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new employee
router.post('/employees', 
  body('email').isEmail().withMessage('Valid email is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update an employee
router.put('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an employee
router.delete('/employees', async (req, res) => {
  const { eid } = req.query;

  try {
    const employee = await Employee.findByIdAndDelete(eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(204).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;