import React, { useState, useMemo, useEffect } from 'react';
// Import các component con
import MainCalendar from '../components/Calendar/maincalendar';
import MiniCalendar from '../components/Calendar/minicalendar';
import EventModal from '../components/PopupWindow/eventmodal'; // Import cái Modal có sẵn
import { saveSession } from '../fakeDB.js'; // <--- Import hàm lưu
import { useLocation } from 'react-router-dom';

// Bảng màu cho các phiên học
const SESSION_COLORS = ['#3d8d7a', '#b3d8a8', '#578fca', '#a3d1c6'];

// Dữ liệu thô
const session = [
  {
    title: 'VẬT LÝ 1',
    start: new Date(2025, 11, 4, 15, 0), // Lưu ý: Tháng 11 là index 10 trong JS
    end: new Date(2025, 11, 4 , 18, 0),
    form: 'Online',
    lecturer: 'Trương Hoàng Minh',
    content: 'Ôn tập chương 1: Động học chất điểm'
  },
    {
    title: 'VẬT LÝ 2',
    start: new Date(2025, 11, 5, 18, 0),
    end: new Date(2025, 11, 5, 20, 0),
    form: 'Online',
    lecturer: 'Trương Hoàng Minh',
    content: 'Ôn thi cuối kì'
  },
  {
    title: 'HÓA 1',
    start: new Date(2025, 11, 11, 14, 0),
    end: new Date(2025, 11, 11, 16, 0),
    form: 'Online',
    lecturer: 'Trần Minh Trí',
    content: 'Entropy và các định luật nhiệt động học'
  },
  {
    title: 'VẬT LÝ 2',
    start: new Date(2025, 11, 13, 18, 0),
    end: new Date(2025, 11, 13, 20, 0),
    form: 'Online',
    lecturer: 'Trần Minh Trí',
    content: 'Ôn thi cuối kì'
  },
];

// Xử lý dữ liệu: Thêm ID và Màu
const sessionincalendar = session.map((sess, index) => {
  return {
    ...sess,
    id: index + 1,
    color: SESSION_COLORS[index % SESSION_COLORS.length]
  };
});

const RegisterPage = () => { // Đổi tên component cho đúng file (RegisterPage)
  // State quản lý lịch
  const location = useLocation();

  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());
  const [mainCalendarDate, setMainCalendarDate] = useState(new Date());

  // --- 1. THÊM STATE ĐỂ QUẢN LÝ MODAL ---
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [selectedLecturer, setSelectedLecturer] = useState(
    location.state?.lecturerName || 'All'
  );

  // Thêm một cái useEffect để chắc chắn cập nhật nếu navigate thay đổi
  useEffect(() => {
    if (location.state?.lecturerName) {
      setSelectedLecturer(location.state.lecturerName);
    }
  }, [location.state]);

  // Hàm xử lý khi bấm vào môn học trên lịch
  const handleEventClick = (event) => {
    console.log("Đã bấm vào môn:", event);
    setSelectedEvent(event); // Lưu môn vừa bấm vào state -> Modal tự hiện
  };

  return (
    <div style={{ padding: '20px' }}>
      
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
        THÔNG TIN THỜI GIAN BIỂU
      </h2>

      <div style={{ display: 'flex', gap: '55px' }}>
        
        {/* CỘT TRÁI */}
        <div style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ flexGrow: 0 }}>
            <MiniCalendar
              date={miniCalendarDate}
              selectedDate={mainCalendarDate}
              onChange={(d) => setMiniCalendarDate(d)}
              onSelectDate={(d) => setMainCalendarDate(d)}
            />
          </div>
          
          <button style={{ 
              padding: '12px 30px', background: '#e8dddd', 
              border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
              Đặt lịch
          </button>
        </div>

        {/* CỘT PHẢI: MAIN CALENDAR */}
        <div style={{ flexGrow: 1 }}>
          <MainCalendar 
              events={sessionincalendar} 
              date={mainCalendarDate}
              onNavigate={(d) => setMainCalendarDate(d)}
              
              // --- 2. TRUYỀN HÀM XỬ LÝ CLICK VÀO ĐÂY ---
              // Tùy vào thư viện Calendar bạn dùng mà prop này có thể là:
              // onSelectEvent (React Big Calendar) hoặc onClickEvent
              onSelectEvent={handleEventClick} 
          />
        </div>
      </div>

      {/* --- 3. HIỂN THỊ MODAL KHI CÓ EVENT ĐƯỢC CHỌN --- */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default RegisterPage;