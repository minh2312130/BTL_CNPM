import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Bell, MessageCircle, Settings, User } from 'lucide-react';

// Import các trang (Đảm bảo tên file viết hoa chữ cái đầu)
import TimeTablePage from './pages/timetablepage';
import LibraryPage from './pages/librarypage';
import TimeTableTutorPage from './pages/timetabletutorpage'; // Sửa lại tên import cho khớp với file đã tạo
import RegisterPage from './pages/registerpage';
import EventDetailsPage from './pages/eventdetailspage';
import Profile from './pages/profilepage';
import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import PageLecturers from './pages/PageLecturers'; // Trang danh sách GV
import PageStudents from './pages/PageStudents';   // Trang danh sách SV

// import EditSessionPage from './pages/editsessionpage';
import './App.css';

const Header = () => {
  const location = useLocation();
  
  // --- LOGIC XÁC ĐỊNH NGƯỜI DÙNG DỰA TRÊN URL / NAV STATE ---
  // Nếu đường dẫn hiện tại bắt đầu bằng '/tutor' OR location state indicates tutor,
  // coi như đang ở chế độ Giảng viên. Using navigation state lets us visit the
  // shared `/library` route while keeping the tutor header when coming from tutor.
  const isTutorMode = location.pathname.startsWith('/tutor') || (location.state && location.state.mode === 'tutor');

  // Đích đến của nút "Thời gian biểu":
  // - Nếu đang là Tutor -> Về trang '/tutor'
  // - Nếu không -> Về trang chủ '/' (Mentee)
  // const homeLink = isTutorMode ? '/tutor' : '/';

  // Hàm kiểm tra nút active
  const getClass = (path) => {
    return location.pathname === path ? 'nav-btn active' : 'nav-btn';
  };

  return (
    <header className="main-header">
      <div className="logo" style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>
        <strong>{'Tutor Support System'}</strong>
      </div>
      
      <nav className="header-tabs">
        {isTutorMode ? (
          /* --- MENU DÀNH CHO TUTOR (GIẢNG VIÊN) --- */
          <>
            <Link to="/tutor" className={getClass('/tutor')}>Thời gian biểu</Link>
            <Link to="/tutor/library" state={{ mode: 'tutor' }} className={getClass('tutor/library')}>Thư viện</Link>
            <Link to="/tutor/students" className={getClass('/tutor/students')}>Tiến độ học viên</Link>
          </>
        ) : (
          /* --- MENU DÀNH CHO MENTEE (HỌC VIÊN) --- */
          <>
            <Link to="/mentee" className={getClass('/mentee')}>Thời gian biểu</Link>
            {/* <button className="nav-btn">Đăng ký lớp</button> */}
            <Link to="/mentee/lecturers" className={getClass('/mentee/lecturers')}>Đăng ký lớp</Link>
            <Link to="/mentee/library" className={getClass('mentee/library')}>Thư viện</Link>
          </>
        )}
      </nav>

      <div className="header-icons" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="icon-btn" title="Thông báo">
          <Bell size={20} color="white" />
        </div>
        <div className="icon-btn" title="Tin nhắn">
          <MessageCircle size={20} color="white" />
        </div>
        <div className="icon-btn" title="Cài đặt">
          <Settings size={20} color="white" />
        </div>
        <Link to="/profile" className="icon-btn" title="Tài khoản" style={{textDecoration: 'none'}}>
          <User size={20} color="white" />
        </Link>
      </div>
    </header>
  );
};

// function App() {
//   const location = useLocation();
  
//   // Danh sách các trang KHÔNG hiện Header (Trang Landing và Login)
//   const hideHeaderPaths = ['/', '/login'];
//   const showHeader = !hideHeaderPaths.includes(location.pathname);

//   return (
//     <Router>
//       <div className="app-container">
        
//         <main className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
//           <Routes>
//             <Route path="/" element={<Landing />} />
//             <Route path="/login" element={<Login />} />

//             {/* Route cho trang Tutor */}
//             <Route path="/tutor" element={<TimeTableTutorPage />} />

//             {/* Route cho trang Register */}
//             <Route path="mentee/register" element={<RegisterPage />} />
            
//             {/* Route cho trang chi tiết buổi học */}
//             <Route path="/event-details" element={<EventDetailsPage />} />

            
//             {/* Route mặc định (Mentee) */}
//             <Route path="/mentee" element={<TimeTablePage />} />
            
//             {/* Các route khác */}
//             <Route path="tutor/library" element={<LibraryPage />} />
//             <Route path="mentee/library" element={<LibraryPage />} />
//             <Route path="/profile" element={<Profile/>} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }


const MainContent = () => {
  const location = useLocation();
  
  // Danh sách các trang KHÔNG hiện Header (Trang Landing và Login)
  const hideHeaderPaths = ['/', '/login'];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {/* Chỉ hiện Header nếu không phải trang Login/Landing */}
      {showHeader && <Header />}
      
      <main className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Route cho trang Tutor */}
            <Route path="/tutor" element={<TimeTableTutorPage />} />
            <Route path="tutor/library" element={<LibraryPage />} />
            <Route path="/tutor/students" element={<PageStudents />} />

            {/* Route cho trang chi tiết buổi học */}
            <Route path="/event-details" element={<EventDetailsPage />} />

            
            {/* Route cho (Mentee) */}
            <Route path="/mentee" element={<TimeTablePage />} />
            <Route path="mentee/library" element={<LibraryPage />} />
            <Route path="/mentee/lecturers" element={<PageLecturers />} />
            <Route path="/mentee/register" element={<RegisterPage />} />
            {/* Các route khác */}
            
            
            <Route path="/profile" element={<Profile/>} />
            
            
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;