import React, { useState } from 'react';
// Import các component con (Tên file viết hoa chữ cái đầu cho đúng chuẩn)
import MainCalendar from '../components/Calendar/maincalendar';
import MiniCalendar from '../components/Calendar/minicalendar';
import CreateSession from '../components/PopupWindow/createsession';

// Bảng màu cho các phiên học
const SESSION_COLORS = ['#3d8d7a', '#b3d8a8', '#578fca', '#a3d1c6'];

// Dữ liệu thô (chưa có ID và màu)
const sessionData = [
  {
    title: 'VẬT LÝ 1',
    start: new Date(2025, 11, 9, 15, 0),
    end: new Date(2025, 11, 9, 18, 0),
    form: 'Online',
    lecturer: 'Trương Hoàng Minh',
    content: 'Ôn tập chương 1: Động học chất điểm'
  },
  {
    title: 'HÓA 1',
    start: new Date(2025, 11, 11, 14, 0),
    end: new Date(2025, 11, 11, 16, 0),
    form: 'Online',
    lecturer: 'Trương Hoàng Minh',
    content: 'Entropy và các định luật nhiệt động học'
  },
  {
    title: 'VẬT LÝ 2',
    start: new Date(2025, 11, 12, 18, 0),
    end: new Date(2025, 11, 12, 20, 0),
    form: 'Online',
    lecturer: 'Trương Hoàng Minh',
    content: 'Ôn thi cuối kì'
  },
  {
    title: 'VẬT LÝ 1',
    start: new Date(2025, 11, 13, 13, 0),
    end: new Date(2025, 11, 13, 16, 0),
    form: 'Online',
    lecturer: 'Trương Hoàng Minh',
    content: 'Ôn tập chương 2: Động lực học chất điểm'
  }
];

const freeTimeData = [
  {
    title: 'Thời gian rảnh',
    start: new Date(2025, 11, 8, 16, 0),
    end: new Date(2025, 11, 8, 20, 0),
  },
  {
    title: 'Thời gian rảnh',
    start: new Date(2025, 11, 11, 12, 0),
    end: new Date(2025, 11, 11, 14, 0),
  },
  {
    title: 'Thời gian rảnh',
    start: new Date(2025, 11, 12, 14, 0),
    end: new Date(2025, 11, 12, 16, 0),
  },
  {
    title: 'Thời gian rảnh',
    start: new Date(2025, 11, 14, 14, 0),
    end: new Date(2025, 11, 14, 18, 0),
  }
];

// events and freetime will be initialized inside the component state

const TimeTableTutorPage = () => {
  // State quản lý:
  // - miniCalendarDate: Tháng hiển thị trên mini calendar (không ảnh hưởng main calendar)
  // - mainCalendarDate: Ngày/tuần hiển thị trên main calendar (khi click ngày trên mini)
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());
  const [mainCalendarDate, setMainCalendarDate] = useState(new Date());

  // Events / freetime state so we can add new sessions from the popup
  const [events, setEvents] = useState(
    sessionData.map((sess, index) => ({
      ...sess,
      id: `session-${index}`,
      color: SESSION_COLORS[index % SESSION_COLORS.length]
    }))
  );

  const [freetime, setFreetime] = useState(freeTimeData);

  // Popup state for creating a session
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  const handleSaveCreate = (formData) => {
    // formData: { title, date (YYYY-MM-DD), startTime (HH:MM), endTime (HH:MM), type, location, desc }
    try {
      const [y, m, d] = formData.date.split('-').map(Number);
      const [sh, sm] = formData.startTime.split(':').map(Number);
      const [eh, em] = formData.endTime.split(':').map(Number);
      const start = new Date(y, m - 1, d, sh || 0, sm || 0);
      const end = new Date(y, m - 1, d, eh || 0, em || 0);

      const newEvent = {
        id: `session-${Date.now()}`,
        title: formData.title || 'Buổi học mới',
        start,
        end,
        form: formData.type || 'Online',
        lecturer: 'Người tạo',
        content: formData.desc || '',
        color: SESSION_COLORS[events.length % SESSION_COLORS.length]
      };

      setEvents(prev => [...prev, newEvent]);
      setIsCreateOpen(false);
    } catch (err) {
      // If parsing fails, just close popup
      console.error('Failed to parse form data', err);
      setIsCreateOpen(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      
      {/* 1. TIÊU ĐỀ: Nằm trên cùng */}
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
        LỊCH DẠY & THỜI GIAN RẢNH
      </h2>

      {/* 2. CONTAINER FLEX: Chia cột */}
      <div style={{ display: 'flex', gap: '55px' }}>
        
        {/* CỘT TRÁI: MINI CALENDAR & BUTTON */}
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <div style={{ flexGrow: 0, width: 260 }}>
            <MiniCalendar
              date={miniCalendarDate}
              selectedDate={mainCalendarDate}
              onChange={(d) => setMiniCalendarDate(d)}
              onSelectDate={(d) => {
                setMainCalendarDate(d);
              }}
            />
          </div>
          
            <button onClick={openCreate} style={{ 
              padding: '12px 30px', background: '#e8dddd', 
              border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              Tạo buổi học
            </button>

          <button style={{ 
              padding: '12px 30px', background: '#e8dddd', 
              border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
              Thêm thời gian rảnh
          </button>
        </div>

        {/* CỘT PHẢI: MAIN CALENDAR */}
        <div style={{ flexGrow: 1 }}>
          <MainCalendar 
              events={events}
              freetime={freetime}
              date={mainCalendarDate} 
              onNavigate={(d) => setMainCalendarDate(d)} 
          />

          <CreateSession isOpen={isCreateOpen} onClose={closeCreate} onSave={handleSaveCreate} />
        </div>
      </div>
    </div>
  );
};

export default TimeTableTutorPage;