const RoomType = require('../models/RoomType');

exports.getRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.getAll();
        res.render('room_types', { roomTypes });
    } catch (error) {
        console.error('Room types error:', error);
        res.redirect('/dashboard');
    }
};

exports.addRoomType = async (req, res) => {
    try {
        const { type_name, default_price, description } = req.body;
        const type_id = await RoomType.generateTypeId();
        await RoomType.create({ type_id, type_name, default_price, description });
        res.redirect('/room_types');
    } catch (error) {
        console.error('Add room type error:', error);
        const roomTypes = await RoomType.getAll();
        res.render('room_types', { roomTypes, error: error.message });
    }
};