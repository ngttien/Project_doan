import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDvOGLGoNGhAOs6qQN2YqRlpY7Qi1x1zds",
    authDomain: "hotel-management-vaa-2025.firebaseapp.com",
    databaseURL: "https://hotel-management-vaa-2025-default-rtdb.firebaseio.com",
    projectId: "hotel-management-vaa-2025",
    storageBucket: "hotel-management-vaa-2025.firebasestorage.app",
    messagingSenderId: "734384514339",
    appId: "1:734384514339:web:6a2b4ad52bcbf54659d896",
    measurementId: "G-8B3R2HTPC2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);