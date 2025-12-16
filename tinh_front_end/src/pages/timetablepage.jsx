import React, { useState } from 'react';
// Import các component con (Tên file viết hoa chữ cái đầu cho đúng chuẩn)
import MainCalendar from '../components/Calendar/maincalendar';
import MiniCalendar from '../components/Calendar/minicalendar';

// const today = new Date();
// const year = today.getFullYear();
// const month = today.getMonth();
// const day = today.getDate();

// Bảng màu cho các phiên học
const SESSION_COLORS = ['#3d8d7a', '#b3d8a8', '#578fca', '#a3d1c6'];

// Dữ liệu thô (chưa có ID và màu)



const session = [
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

// Xử lý dữ liệu: Thêm ID và Màu sắc tự động xoay vòng
const sessionincalendar = session.map((sess, index) => {
  return {
    ...sess,
    id: index + 1,
    color: SESSION_COLORS[index % SESSION_COLORS.length]
  };
});

const TimeTablePage = () => {
  // State quản lý:
  // - miniCalendarDate: Tháng hiển thị trên mini calendar (không ảnh hưởng main calendar)
  // - mainCalendarDate: Ngày/tuần hiển thị trên main calendar (khi click ngày trên mini)
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());
  const [mainCalendarDate, setMainCalendarDate] = useState(new Date());

  return (
    <div style={{ padding: '20px' }}>
      
      {/* 1. TIÊU ĐỀ: Đưa ra ngoài để nằm trên cùng, thẳng cột với Mini Calendar */}
      <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
        THÔNG TIN THỜI GIAN BIỂU
      </h2>

      {/* 2. CONTAINER FLEX: Chứa 2 cột lịch nằm ngang hàng nhau */}
      <div style={{ display: 'flex', gap: '55px' }}>
        
        {/* CỘT TRÁI: MINI CALENDAR & BUTTON */}
        <div style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ flexGrow: 0 }}>
            <MiniCalendar
              date={miniCalendarDate}
              selectedDate={mainCalendarDate}
              // Khi thay đổi tháng ở lịch nhỏ -> Chỉ cập nhật mini calendar display
              onChange={(d) => setMiniCalendarDate(d)}
              // Khi chọn ngày cụ thể -> Cập nhật main calendar để nhảy lịch to đến ngày đó
              onSelectDate={(d) => {
                setMainCalendarDate(d);
              }}
            />
          </div>
          
          <button style={{ 
              width: '100%', padding: '12px', background: '#fff200', 
              border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
              Đăng ký làm người hướng dẫn
          </button>
        </div>

        {/* CỘT PHẢI: MAIN CALENDAR */}
        <div style={{ flexGrow: 1 }}>
          {/* MainCalendar sẽ nằm ngang hàng với MiniCalendar vì tiêu đề đã được đưa ra ngoài */}
          <MainCalendar 
              events={sessionincalendar} 
              date={mainCalendarDate} 
              // Khi bấm Next/Back ở lịch to -> Cập nhật ngược lại state để đồng bộ
              onNavigate={(d) => setMainCalendarDate(d)} 
          />
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;