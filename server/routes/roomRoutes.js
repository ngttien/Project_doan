// server/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/RoomModel');
const RoomType = require('../models/roomTypesModel');

// Lấy danh sách phòng
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.getAll();
        res.json(rooms);
    } catch (error) {
        console.error('Get rooms error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Thêm phòng mới
router.post('/rooms', async (req, res) => {
    try {
        const { room_id, type_id, room_price, max_occupancy, status, description } = req.body;
        await Room.create({ room_id, type_id, room_price, max_occupancy, status, description });
        res.status(201).json({ room_id, type_id, room_price, max_occupancy, status, description });
    } catch (error) {
        console.error('Add room error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Lấy danh sách loại phòng
router.get('/room_types', async (req, res) => {
    try {
        const roomTypes = await RoomType.getAll();
        res.json(roomTypes);
    } catch (error) {
        console.error('Get room types error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Thêm loại phòng mới (tùy chọn, nếu bạn muốn quản lý loại phòng từ admin)
router.post('/room_types', async (req, res) => {
    try {
        const { type_name, default_price, description } = req.body;
        const type_id = await RoomType.generateTypeId();
        await RoomType.create({ type_id, type_name, default_price, description });
        res.status(201).json({ type_id, type_name, default_price, description });
    } catch (error) {
        console.error('Add room type error:', error);
        res.status(400).json({ error: error.message });
    }
});

router.put('/rooms/:room_id', async (req, res) => {
    try {
        const { room_id } = req.params;
        const { status } = req.body;
        const roomRef = db.collection('rooms').doc(room_id);
        const roomDoc = await roomRef.get();
        if (!roomDoc.exists) {
            throw new Error('Room not found');
        }
        await roomRef.update({ status });
        res.json({ message: 'Room status updated', room_id, status });
    } catch (error) {
        console.error('Update room error:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;