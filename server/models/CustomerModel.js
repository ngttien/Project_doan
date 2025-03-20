const db = require('../config/firebase');

class Customer {
    static async create(customerData) {
        const customerRef = db.collection('customers').doc(customerData.email); // Sử dụng email làm ID
        const customerDoc = await customerRef.get();
        if (customerDoc.exists) {
            throw new Error('Customer with this email already exists');
        }
        await customerRef.set({
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone || '',
            address: customerData.address || '',
            createdAt: new Date().toISOString()
        });
        return { email: customerData.email, ...customerData };
    }

    static async getAll() {
        const customersSnapshot = await db.collection('customers').get();
        return customersSnapshot.docs.map(doc => ({
            email: doc.id,
            ...doc.data()
        }));
    }

    static async update(email, customerData) {
        const customerRef = db.collection('customers').doc(email);
        const customerDoc = await customerRef.get();
        if (!customerDoc.exists) {
            throw new Error('Customer not found');
        }
        await customerRef.update({
            name: customerData.name,
            phone: customerData.phone || '',
            address: customerData.address || ''
        });
        return { email, ...customerData };
    }

    static async delete(email) {
        const customerRef = db.collection('customers').doc(email);
        const customerDoc = await customerRef.get();
        if (!customerDoc.exists) {
            throw new Error('Customer not found');
        }
        await customerRef.delete();
        return { message: 'Customer deleted', email };
    }
}

module.exports = Customer;