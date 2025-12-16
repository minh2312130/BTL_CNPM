import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useNavigate, useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from '../PopupWindow/eventmodal';
import SessionRecordModal from '../PopupWindow/sessionrecord';

const locales = { vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CustomEventContent = ({ event, onOpenRecord }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isTutorPage = location.pathname.startsWith('/tutor');
  // const isRegisterPage = location.pathname === "/register"; // Không cần check cái này ở đây nữa

  if (event.isFreeTime) {
    return <div style={{ backgroundColor: event.color || '#ffeaea', height: '100%', borderRadius: 6 }}></div>;
  }

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    navigate('/event-details', { state: { event } });
  };

  const handleEditRecord = (e) => {
    e.stopPropagation();
    if (onOpenRecord) onOpenRecord(event);
  };

  return (
    <div
      onMouseEnter={() => isTutorPage && setIsHovered(true)}
      onMouseLeave={() => isTutorPage && setIsHovered(false)}
      style={{
        backgroundColor: event.color || '#3174ad',
        color: 'white',
        height: '100%',
        borderRadius: 6,
        padding: 5,
        cursor: 'pointer', // Luôn để pointer để biết là bấm được
        position: 'relative'
      }}
    >
      {!isTutorPage || !isHovered ? (
        <>
          <div style={{ fontSize: 13, fontWeight: 'bold' }}>{event.title}</div>
          <div style={{ fontSize: 10, marginTop: 2 }}>
            {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
          </div>
          <div style={{ fontSize: 11 }}>{event.lecturer}</div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={handleMoreInfo} style={{ width: '90%', fontSize: '11px', border: 'none', borderRadius: '4px', backgroundColor: '#e8dddd', cursor: 'pointer' }}>Chi tiết</button>
          <button onClick={handleEditRecord} style={{ width: '90%', fontSize: '11px', border: 'none', borderRadius: '4px', backgroundColor: '#e8dddd', cursor: 'pointer' }}>Biên bản</button>
        </div>
      )}
    </div>
  );
};

const CustomDateHeader = ({ date }) => {
  const today = new Date();
  const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
  return (
    <div className="custom-header">
      <div className="header-day">{format(date, 'EEE', { locale: vi })}</div>
      <div className={`header-date ${isToday ? 'is-today' : ''}`}>{format(date, 'd')}</div>
    </div>
  );
};

// --- SỬA CHÍNH Ở ĐÂY: Thêm onSelectEvent vào props ---
const MainCalendar = ({ events = [], freetime = [], date, onNavigate, onSelectEvent }) => {
  const [internalDate, setInternalDate] = useState(date || new Date());
  
  // State cho Tutor (biên bản)
  const [recordModalData, setRecordModalData] = useState(null); 

  const viewDate = date || internalDate;

  const allEvents = [
    ...events,
    ...freetime.map((free, index) => ({ ...free, id: `freetime-${index}`, isFreeTime: true })),
  ];

  const handleNavigate = (d, view, action) => {
    setInternalDate(d);
    if (onNavigate) onNavigate(d, view, action);
  };

  const handleSaveRecord = (data) => {
    console.log("Lưu biên bản:", data);
    setRecordModalData(null);
    alert("Đã lưu biên bản thành công!");
  };

  return (
    <div style={{ flex: 1, height: 700, background: 'white', borderRadius: 12, overflow: 'hidden' }}>
      <Calendar
        localizer={localizer}
        date={viewDate}
        onNavigate={handleNavigate}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        culture="vi"
        defaultView="week"
        views={['week']}
        toolbar={false}
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 7, 0, 0)}
        max={new Date(0, 0, 0, 23, 59, 0)}
        
        // --- QUAN TRỌNG: Gắn sự kiện click từ bên ngoài vào đây ---
        onSelectEvent={(event) => {
            // Nếu cha truyền hàm xuống thì gọi hàm cha
            if (onSelectEvent) onSelectEvent(event);
        }}

        components={{
          event: (props) => <CustomEventContent {...props} onOpenRecord={setRecordModalData} />,
          header: CustomDateHeader,
        }}
        
        eventPropGetter={() => ({
          style: { backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }
        })}
      />

      {/* Modal Biên Bản (Chỉ dành cho Tutor) */}
      <SessionRecordModal 
        isOpen={!!recordModalData}
        event={recordModalData}
        onClose={() => setRecordModalData(null)}
        onSave={handleSaveRecord}
      />
      
      {/* Lưu ý: Đã XÓA EventModal nội bộ ở đây để tránh xung đột với RegisterPage */}
    </div>
  );
};

export default MainCalendar;