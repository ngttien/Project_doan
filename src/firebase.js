// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBUNU64mjuRB8YbKl70KQok9fHTef2pyDI',
    authDomain: 'hotel-03w7.firebaseapp.com',
    projectId: 'hotel-03w7',
    storageBucket: 'hotel-03w7.firebasestorage.app',
    messagingSenderId: '722341252541',
    appId: '1:722341252541:web:fe969b3be2e282496756d4',
    measurementId: 'G-MZTQ9DFP1S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
