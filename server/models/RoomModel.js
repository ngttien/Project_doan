const db = require('../config/firebase');

class Room {
    static async getAll() {
        const roomsSnapshot = await db.collection('rooms').get();
        return roomsSnapshot.docs.map(doc => ({
            room_id: doc.id,
            ...doc.data()
        }));
    }

    static async create(roomData) {
        const roomRef = db.collection('rooms').doc(roomData.room_id);
        const roomDoc = await roomRef.get();
        if (roomDoc.exists) {
            throw new Error('Room ID already exists');
        }
        const typeRef = db.collection('room_types').doc(roomData.type_id);
        const typeDoc = await typeRef.get();
        if (!typeDoc.exists) {
            throw new Error('Invalid type_id');
        }
        const defaultPrice = typeDoc.data().default_price;

        await roomRef.set({
            type_id: roomData.type_id,
            room_price: parseFloat(roomData.room_price) || defaultPrice,
            max_occupancy: parseInt(roomData.max_occupancy),
            status: roomData.status || 'available',
            description: roomData.description,
            last_cleaned: new Date().toISOString()
        });
    }

    static async getStats() {
        const roomsSnapshot = await db.collection('rooms').get();
        const totalRooms = roomsSnapshot.size;
        const availableRooms = roomsSnapshot.docs.filter(doc => doc.data().status === 'available').length;
        return { totalRooms, availableRooms };
    }
}

module.exports = Room;