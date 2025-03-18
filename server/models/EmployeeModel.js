const db = require('../config/firebase');

const getEmployees = async () => {
    try {
        const employeesRef = db.collection('employees');
        const snapshot = await employeesRef.get();
        const employees = [];
        snapshot.forEach(doc => {
            employees.push({ id: doc.id, ...doc.data() });
        });
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Could not fetch employees');
    }
};

module.exports = { getEmployees, db };