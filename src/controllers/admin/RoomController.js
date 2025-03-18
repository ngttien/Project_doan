const Room = require('../models/Room');
const RoomType = require('../models/RoomType');

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.getAll();
        const roomTypes = await RoomType.getAll();
        res.render('rooms', { rooms, roomTypes });
    } catch (error) {
        console.error('Rooms error:', error);
        res.redirect('/dashboard');
    }
};

exports.addRoom = async (req, res) => {
    try {
        const { room_id, type_id, room_price, max_occupancy, status, description } = req.body;
        await Room.create({ room_id, type_id, room_price, max_occupancy, status, description });
        res.redirect('/rooms');
    } catch (error) {
        console.error('Add room error:', error);
        const rooms = await Room.getAll();
        const roomTypes = await RoomType.getAll();
        res.render('rooms', { rooms, roomTypes, error: error.message });
    }
};