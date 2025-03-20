const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerModel');

router.post('/customers', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !email) {
            throw new Error('Name and email are required');
        }
        const newCustomer = await Customer.create({ name, email, phone, address });
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Add customer error:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.getAll();
        res.json(customers);
    } catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/customers/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { name, phone, address } = req.body;
        if (!name) {
            throw new Error('Name is required');
        }
        const updatedCustomer = await Customer.update(email, { name, phone, address });
        res.json(updatedCustomer);
    } catch (error) {
        console.error('Update customer error:', error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/customers/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const result = await Customer.delete(email);
        res.json(result);
    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;