const { db } = require("../config/firebase"); // ✅ Chỉ cần import db
const roomsRef = db.collection("ROOMS");

// Dữ liệu nhiều phòng
const rooms = [
  { roomNumber: "001", type: "VIP", price: 100, status: "Available" },
  { roomNumber: "002", type: "Standard", price: 80, status: "Booked" },
  { roomNumber: "003", type: "Deluxe", price: 120, status: "Available" },
  { roomNumber: "004", type: "Standard", price: 90, status: "Cleaning" },
];

// Hàm thêm phòng vào Firestore
async function uploadRooms() {
  const batch = db.batch();

  rooms.forEach((room) => {
    const docRef = roomsRef.doc(room.roomNumber); // Dùng roomNumber làm ID
    batch.set(docRef, room);
  });

  await batch.commit();
  console.log("Rooms uploaded successfully!");
}

// Chạy hàm
uploadRooms();
// Kết quả: Dữ liệu phòng đã được thêm vào Firestore
