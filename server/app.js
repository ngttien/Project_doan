// server/app.js
const express = require('express');
const app = express();
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('No token provided');

    const token = authHeader.split(' ')[1];
    try {
        console.log('Verifying token:', token); // Log token để debug
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log('Decoded token:', decodedToken); // Log decoded token
        if (req.path.includes('/employees') && decodedToken.role !== 'admin') {
            return res.status(403).send('Access denied: Admin only');
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(403).send('Invalid token: ' + error.message);
    }
};

app.use('/api', authenticateToken, apiRoutes);
app.use('/api', roomRoutes);
app.use('/api', serviceRoutes);
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});