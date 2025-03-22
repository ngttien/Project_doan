import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from '../src/pages/admin/dashboard/index';
import HomePage from '../src/pages/user/home/index';
import ScrollToTop from "./ScrollToTop"; // Import component
import BookingPage from "./pages/user/booking/BookingPage";

function App() {
  return (
    <Router>
      <BookingPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
