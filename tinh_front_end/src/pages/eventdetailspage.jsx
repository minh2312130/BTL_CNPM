// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import format from 'date-fns/format';
// import vi from 'date-fns/locale/vi';
// import { ArrowLeft } from 'lucide-react';

// const EventDetailsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const event = location.state?.event;

//   if (!event) {
//     return (
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <p>Không tìm thấy thông tin buổi học.</p>
//         <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px', background: '#3f72af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//           Quay lại
//         </button>
//       </div>
//     );
//   }

//   const dateStr = format(event.start, 'EEEE, dd/MM/yyyy', { locale: vi });
//   const timeStartStr = format(event.start, 'HH:mm');
//   const timeEndStr = format(event.end, 'HH:mm');

//   return (
//     <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
//       {/* Back button */}
//       <button 
//         onClick={() => navigate(-1)} 
//         style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#3f72af', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' }}
//       >
//         <ArrowLeft size={18} /> Quay lại
//       </button>

//       {/* Header */}
//       <h1 style={{ marginTop: 0, marginBottom: '30px', color: '#333', fontSize: '28px' }}>
//         {event.title}
//       </h1>

//       {/* Info Card */}
//       <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '12px', padding: '30px', marginBottom: '30px' }}>
        
//         <div style={{ marginBottom: '20px' }}>
//           <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Giảng viên</h3>
//           <p style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: '500' }}>{event.lecturer || 'Chưa cập nhật'}</p>
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Thời gian</h3>
//           <p style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: '500' }}>
//             {dateStr} <br /> {timeStartStr} - {timeEndStr}
//           </p>
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Hình thức</h3>
//           <p style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: '500' }}>{event.form || 'Online'}</p>
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Địa điểm / Link</h3>
//           <p style={{ margin: 0, color: '#3f72af', fontSize: '16px', fontWeight: '500', textDecoration: 'underline', cursor: 'pointer' }}>
//             {event.location || 'https://google.meet'}
//           </p>
//         </div>

//         <div>
//           <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Nội dung</h3>
//           <p style={{ margin: 0, color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
//             {event.content || 'Buổi học định kỳ'}
//           </p>
//         </div>

//       </div>

//       {/* Action Buttons */}
//       <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
//         <button 
//           onClick={() => navigate(-1)}
//           style={{ padding: '12px 30px', background: '#dbe3ef', border: 'none', borderRadius: '6px', color: '#333', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
//         >
//           Đóng
//         </button>
//         <button 
//           onClick={() => navigate('/edit-session', { state: { event } })}
//           style={{ padding: '12px 30px', background: '#3f72af', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
//         >
//           Sửa buổi học
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventDetailsPage;

import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import { ChevronLeft } from 'lucide-react';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy dữ liệu sự kiện được truyền từ trang trước
  const event = location.state?.event;

  // Khởi tạo state cho form với dữ liệu mặc định từ event
  // QUAN TRỌNG: Hook useState phải được gọi TRƯỚC KHI return (Conditional Rendering)
  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event?.start ? format(event.start, 'yyyy-MM-dd') : '', // Format chuẩn cho input date
    startTime: event?.start ? format(event.start, 'HH:mm') : '', // Format chuẩn cho input time
    endTime: event?.end ? format(event.end, 'HH:mm') : '',
    lecturer: event?.lecturer || '',
    form: event?.form || 'Online', // Hình thức
    location: event?.location || '',
    content: event?.content || event?.resource || '' // Nội dung/Ghi chú
  });

    const timeOptions = useMemo(() => {
      const options = [];
      for (let i = 6; i <= 22; i++) {
        const hour = i < 10 ? `0${i}` : i;
        options.push(`${hour}:00`);
        options.push(`${hour}:30`);
      }
      return options;
    }, []);

  // Nếu không có dữ liệu (truy cập trực tiếp link), quay về
  if (!event) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Không tìm thấy dữ liệu buổi học.</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  // Xử lý khi người dùng nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý lưu
  const handleSave = () => {
    console.log("Dữ liệu đã chỉnh sửa:", formData);
    // Ở đây bạn sẽ gọi API hoặc cập nhật state global
    alert("Đã lưu thông tin buổi học thành công!");
    navigate(-1);
  };

  // Xử lý xóa
  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa buổi học này không?")) {
      console.log("Đã xóa event:", event.id);
      navigate(-1);
    }
  };


  // Style chung cho input để giống hình
  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
    outline: 'none',
    fontWeight: '500',
    color: '#333'
  };

  const labelStyle = {
    width: '180px', // Chiều rộng cố định cho nhãn
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#333',
    display: 'flex',
    alignItems: 'center'
  };

  const rowStyle = {
    display: 'flex',
    marginBottom: '15px',
    alignItems: 'center' // Căn giữa theo chiều dọc
  };

  return (
    <div style={{ padding: '20px 40px', background: 'white', minHeight: '100vh' }}>
      
      {/* Nút Quay lại nằm ở góc trên bên trái, ngoài luồng căn giữa */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ 
            background: 'none', border: 'none', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', gap: '5px',
            fontWeight: 'bold', fontSize: '14px', color: '#333'
          }}
        >
          <ChevronLeft size={20} /> Quay lại
        </button>
      </div>

      {/* Container chính căn giữa trang chứa Form và Tiêu đề */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      
        {/* Tiêu đề */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#000' }}>
          THÔNG TIN CHI TIẾT BUỔI HỌC
        </h2>

        {/* Form nhập liệu */}
        <div>
          
          {/* Môn */}
          <div style={rowStyle}>
            <label style={labelStyle}>Môn:<span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" name="title" value={formData.title} onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          {/* Ngày */}
          <div style={rowStyle}>
            <label style={labelStyle}>Ngày:<span style={{color: 'red'}}>*</span></label>
            <input 
              type="date" name="date" value={formData.date} onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          {/* Thời gian bắt đầu */}
          <div style={rowStyle}>
            <label style={labelStyle}>
              Thời gian bắt đầu:<span style={{ color: 'red' }}>*</span>
            </label>

            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- Chọn giờ --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Thời gian kết thúc */}
          <div style={rowStyle}>
            <label style={labelStyle}>
              Thời gian kết thúc:<span style={{ color: 'red' }}>*</span>
            </label>

            <select
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- Chọn giờ --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>


          {/* Giảng viên */}
          <div style={rowStyle}>
            <label style={labelStyle}>Giảng viên:<span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" name="lecturer" value={formData.lecturer} onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          {/* Hình thức */}
          <div style={rowStyle}>
            <label style={labelStyle}>Hình thức:<span style={{color: 'red'}}>*</span></label>
            <select 
              name="form" value={formData.form} onChange={handleChange} 
              style={{...inputStyle, cursor: 'pointer'}}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Địa điểm */}
          <div style={rowStyle}>
            <label style={labelStyle}>Địa điểm:<span style={{color: 'red'}}>*</span></label>
            <input 
              type="text" name="location" value={formData.location} onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          {/* Nội dung */}
          <div style={{...rowStyle, alignItems: 'flex-start'}}>
            <label style={{...labelStyle, paddingTop: '10px'}}>Nội dung:</label>
            <textarea 
              name="content" value={formData.content} onChange={handleChange} 
              rows="4"
              style={{...inputStyle, resize: 'vertical', minHeight: '80px'}} 
            />
          </div>

          {/* Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            
            {/* Nút Xóa (Bên trái) */}
            <button 
              onClick={handleDelete}
              style={{ 
                backgroundColor: 'red', color: 'white', border: 'none', 
                padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' 
              }}
            >
              Xóa buổi học
            </button>

            {/* Nhóm nút Hủy/Lưu (Bên phải) */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => navigate(-1)}
                style={{ 
                  backgroundColor: '#dbe3ef', color: '#333', border: 'none', 
                  padding: '10px 30px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' 
                }}
              >
                Hủy
              </button>
              <button 
                onClick={handleSave}
                style={{ 
                  backgroundColor: '#0091ff', color: 'white', border: 'none', 
                  padding: '10px 30px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' 
                }}
              >
                Lưu
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;