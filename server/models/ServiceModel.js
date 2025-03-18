const db = require('../config/firebase');

class Service {
    static async generateServiceId() {
        const counterRef = db.collection('counters').doc('services');
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
            return `SVC${String(newCount).padStart(3, '0')}`;
        });
    }

    static async getAll() {
        const servicesSnapshot = await db.collection('services').get();
        return servicesSnapshot.docs.map(doc => ({
            service_id: doc.id,
            ...doc.data()
        }));
    }

    static async create(serviceData) {
        const serviceId = await Service.generateServiceId();
        const serviceRef = db.collection('services').doc(serviceId);
        await serviceRef.set({
            name: serviceData.name,
            price: parseFloat(serviceData.price),
            description: serviceData.description || ''
        });
        return { service_id: serviceId, ...serviceData };
    }

    static async update(serviceId, serviceData) {
        const serviceRef = db.collection('services').doc(serviceId);
        const serviceDoc = await serviceRef.get();
        if (!serviceDoc.exists) {
            throw new Error('Service not found');
        }
        await serviceRef.update({
            name: serviceData.name,
            price: parseFloat(serviceData.price),
            description: serviceData.description || ''
        });
        return { service_id: serviceId, ...serviceData };
    }

    static async delete(serviceId) {
        const serviceRef = db.collection('services').doc(serviceId);
        const serviceDoc = await serviceRef.get();
        if (!serviceDoc.exists) {
            throw new Error('Service not found');
        }
        await serviceRef.delete();
        return { message: 'Service deleted', service_id: serviceId };
    }
}

module.exports = Service;