const express = require('express');
const router = express.Router();
const EmployeeModel = require('../models/EmployeeModel');
const admin = require('firebase-admin');

router.get('/employees', async (req, res) => {
    try {
        const employees = await EmployeeModel.getEmployees();
        res.json(employees);
    } catch (error) {
        console.error('Error in /employees:', error);
        res.status(500).send('Error fetching employees');
    }
});

router.post('/employees', async (req, res) => {
    try {
        console.log('Received body:', req.body);
        const { name, position, email, phone, status } = req.body;
        if (!name || !position || !email || !phone || !status) {
            return res.status(400).send('All fields are required');
        }
        if (position !== 'Nhân viên' && position !== 'Quản lý') {
            return res.status(400).send('Chức vụ phải là "Nhân viên" hoặc "Quản lý"');
        }

        const newEmployee = {
            name,
            position,
            email,
            phone,
            status,
        };

        const docRef = await EmployeeModel.db.collection('employees').add(newEmployee);
        const addedEmployee = { id: docRef.id, ...newEmployee };

        console.log('Employee added to Firestore:', addedEmployee);
        res.status(201).json(addedEmployee);
    } catch (error) {
        console.error('Error in /employees POST:', error);
        res.status(500).send('Error adding employee: ' + error.message);
    }
});

router.patch('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).send('Status is required');
        }
        if (status !== 'Đang làm' && status !== 'Không làm') {
            return res.status(400).send('Status must be "Đang làm" or "Không làm"');
        }

        const employeeRef = EmployeeModel.db.collection('employees').doc(id);
        const doc = await employeeRef.get();
        if (!doc.exists) {
            return res.status(404).send('Employee not found');
        }

        await employeeRef.update({ status });
        const updatedEmployee = { id, ...doc.data(), status };

        console.log('Employee status updated:', updatedEmployee);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error('Error in /employees/:id PATCH:', error);
        res.status(500).send('Error updating employee: ' + error.message);
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await db.collection('bookings').get();
        const bookingList = bookings.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(bookingList);
    } catch (error) {
        console.error('Error in /bookings:', error);
        res.status(500).send('Error fetching bookings');
    }
});

router.post('/bookings', async (req, res) => {
    try {
        console.log('Received body:', req.body);
        const { customerName, roomType, occupation, checkOutDate, roomNumber, bookingDate } = req.body;
        if (!customerName || !roomType || !occupation || !checkOutDate || !roomNumber || !bookingDate) {
            return res.status(400).send('All fields are required');
        }

        const newBooking = {
            customerName,
            roomType,
            occupation,
            checkOutDate,
            roomNumber,
            bookingDate,
        };

        const docRef = await db.collection('bookings').add(newBooking);
        const addedBooking = { id: docRef.id, ...newBooking };

        console.log('Booking added to Firestore:', addedBooking);
        res.status(201).json(addedBooking);
    } catch (error) {
        console.error('Error in /bookings POST:', error);
        res.status(500).send('Error adding booking: ' + error.message);
    }
});

router.post('/set-admin-role', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { email } = req.body;
        if (!email) {
            console.error('Email is required');
            return res.status(400).send('Email is required');
        }

        const user = await admin.auth().getUserByEmail(email);
        console.log('Found user:', user.uid);

        await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
        console.log(`Admin role set for ${email}`);

        const updatedUser = await admin.auth().getUserByEmail(email);
        console.log('Updated user claims:', updatedUser.customClaims);

        res.status(200).send('Admin role set successfully');
    } catch (error) {
        console.error('Error in /set-admin-role:', error);
        res.status(500).send('Error setting admin role: ' + error.message);
    }
});

module.exports = router;