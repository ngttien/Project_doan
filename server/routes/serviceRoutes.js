const express = require('express');
const router = express.Router();
const Service = require('../models/ServiceModel');

router.get('/services', async (req, res) => {
    try {
        const services = await Service.getAll();
        res.json(services);
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/services', async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price) {
            throw new Error('Name and price are required');
        }
        const newService = await Service.create({ name, price, description });
        res.status(201).json(newService);
    } catch (error) {
        console.error('Add service error:', error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/services/:service_id', async (req, res) => {
    try {
        const { service_id } = req.params;
        const { name, price, description } = req.body;
        if (!name || !price) {
            throw new Error('Name and price are required');
        }
        const updatedService = await Service.update(service_id, { name, price, description });
        res.json(updatedService);
    } catch (error) {
        console.error('Update service error:', error);
        res.status(400).json({ error: error.message });
    }
});

router.delete('/services/:service_id', async (req, res) => {
    try {
        const { service_id } = req.params;
        const result = await Service.delete(service_id);
        res.json(result);
    } catch (error) {
        console.error('Delete service error:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;