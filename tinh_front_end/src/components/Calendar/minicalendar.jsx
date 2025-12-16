import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Tuần bắt đầu T2
  getDay,
  locales,
});

const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

const MiniToolbar = ({ onNavigate, date }) => {
  const goToBack = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');
  const label = format(date || new Date(), 'MMMM yyyy', { locale: vi });

  return (
    <div className="mini-toolbar">
      <button onClick={goToBack}>&#8249;</button>
      <span className="mini-toolbar-label">{label}</span>
      <button onClick={goToNext}>&#8250;</button>
    </div>
  );
};

const CustomDateHeader = ({ label, date, selectedDate, onSelect }) => {
  const isToday = isSameDay(date, new Date());
  const isSelected = isSameDay(date, selectedDate);

  return (
    <div
      onClick={() => onSelect(date)}
      style={{
        cursor: 'pointer',
        // Căn chỉnh số vào giữa ô
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        width: '30px', 
        height: '30px',
        borderRadius: '50%', // Làm tròn hoàn hảo

        backgroundColor: isSelected 
          ? '#1976d2' 
          : isToday 
            ? '#e3f2fd' 
            : 'transparent',
            
        color: isSelected 
          ? 'white' 
          : isToday 
            ? '#1565c0' 
            : 'inherit',
            
        fontWeight: isToday || isSelected ? 'bold' : 'normal',
      }}
    >
      {label}
    </div>
  );
};

const MiniCalendar = ({ date = new Date(), selectedDate, onChange, onSelectDate }) => {
  return (
    <div
      className="mini-calendar-wrapper"
      style={{
        width: 260,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
      }}
    >
      <Calendar
        localizer={localizer}
        
        // Quản lý ngày hiển thị
        date={date}
        onNavigate={onChange} // Cập nhật khi bấm nút chuyển tháng
        
        // Cấu hình View
        views={['month']}
        defaultView="month"
        events={[]} // Không hiển thị sự kiện để lịch sạch
        
        // Cấu hình Style & Component
        style={{ height: 280 }}
        components={{
          month: {
            toolbar: MiniToolbar, // Thay thanh công cụ mặc định
            dateHeader: (props) => (
              <CustomDateHeader
                {...props}
                selectedDate={selectedDate} // Truyền ngày đang chọn xuống
                onSelect={(d) => {
                    // Logic: Khi click vào ngày
                    if (onSelectDate) onSelectDate(d); // 1. Cập nhật state selectedDate
                    if (onChange) onChange(d);         // 2. Cập nhật state viewDate (để lịch to nhảy theo)
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default MiniCalendar;