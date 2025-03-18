const db = require('../config/firebase');

class RoomType {
    static async generateTypeId() {
        const counterRef = db.collection('counters').doc('room_types');
        return db.runTransaction(async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            let newCount;
            if (!counterDoc.exists) {
                newCount = 1;
                transaction.set(counterRef, { count: newCount });
            } else {
                newCount = counterDoc.data().count + 1;
                transaction.update(counterRef, { count: newCount });
            }
            return `TYPE${String(newCount).padStart(3, '0')}`; // TYPE001, TYPE002,...
        });
    }

    static async create(roomTypeData) {
        const typeRef = db.collection('room_types').doc(roomTypeData.type_id);
        const typeDoc = await typeRef.get();
        if (typeDoc.exists) {
            throw new Error('Type ID already exists');
        }
        await typeRef.set({
            type_name: roomTypeData.type_name,
            default_price: parseFloat(roomTypeData.default_price),
            description: roomTypeData.description
        });
    }

    static async getAll() {
        const typesSnapshot = await db.collection('room_types').get();
        return typesSnapshot.docs.map(doc => ({
            type_id: doc.id,
            ...doc.data()
        }));
    }
}

module.exports = RoomType;