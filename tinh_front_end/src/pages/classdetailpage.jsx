import React, { useState } from 'react';
import { FaBell, FaCommentDots, FaCog } from 'react-icons/fa';

export default function ClassDetailPage() {
  // --- Màu sắc ---
  const headerColor = '#3F72AF';
  const buttonColor = '#4F85C7';

  // --- Thông tin buổi học ---
  const defaultSubject = '';
  const defaultDate = '';
  const defaultStartTime = '';
  const defaultEndTime = '';
  const defaultTeacher = '';
  const defaultType = '';
  const defaultLocation = '';
  const defaultContent = '';

  // --- State lưu dữ liệu nhập ---
  const [subject, setSubject] = useState(defaultSubject);
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [teacher, setTeacher] = useState(defaultTeacher);
  const [type, setType] = useState(defaultType);
  const [location, setLocation] = useState(defaultLocation);
  const [content, setContent] = useState(defaultContent);

  const handleSave = () => alert('Đã lưu thông tin buổi học!');
  const handleCancel = () => alert('Hủy thao tác');
  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa buổi học này?')) {
      alert('Đã xóa buổi học!');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header Navbar */}
      <div
        className='flex justify-between items-center px-6 py-3'
        style={{ backgroundColor: headerColor, color: 'white' }}
      >
        <div className='flex space-x-3'>
          <button
            className='px-3 py-1 rounded hover:opacity-80'
            style={{ backgroundColor: buttonColor }}
          >
            Thời gian biểu
          </button>
          <button
            className='px-3 py-1 rounded hover:opacity-80'
            style={{ backgroundColor: buttonColor }}
          >
            Đăng ký lớp
          </button>
          <button
            className='px-3 py-1 rounded hover:opacity-80'
            style={{ backgroundColor: buttonColor }}
          >
            Thư viện
          </button>
        </div>
        <div className='flex space-x-4 items-center'>
          <FaBell size={18} />
          <FaCommentDots size={18} />
          <FaCog size={18} />
        </div>
      </div>

      {/* Quay lại + Title */}
      <div className='max-w-4xl mx-auto mt-6 px-6 flex items-center justify-between'>
        <button className='text-blue-600 font-semibold hover:underline'>
          &lt; Quay lại
        </button>
        <div className='text-xl font-bold text-black px-4 py-2 rounded'>
          THÔNG TIN CHI TIẾT BUỔI HỌC
        </div>
        <div></div> {/* giữ khoảng trống cho cân đối */}
      </div>

      {/* Form Card */}
      <div className='max-w-4xl mx-auto mt-4 bg-white p-6 rounded-lg shadow space-y-6 text-black'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label className='font-bold mb-1'>
              Môn: <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className='p-2 border rounded'
              placeholder='Nhập môn học'
            />
          </div>

          <div className='flex flex-col'>
            <label className='font-bold mb-1'>
              Ngày: <span className='text-red-500'>*</span>
            </label>
            <input
              type='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              className='p-2 border rounded'
            />
          </div>

          <div className='flex flex-col'>
            <label className='font-bold mb-1'>
              Thời gian bắt đầu: <span className='text-red-500'>*</span>
            </label>
            <input
              type='time'
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className='p-2 border rounded'
            />
          </div>

          <div className='flex flex-col'>
            <label className='font-bold mb-1'>
              Thời gian kết thúc: <span className='text-red-500'>*</span>
            </label>
            <input
              type='time'
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className='p-2 border rounded'
            />
          </div>

          <div className='flex flex-col'>
            <label className='font-bold mb-1'>
              Giảng viên: <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={teacher}
              onChange={e => setTeacher(e.target.value)}
              className='p-2 border rounded'
              placeholder='Nhập tên giảng viên'
            />
          </div>

          <div className='flex flex-col'>
            <label className='font-bold mb-1'>
              Hình thức: <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={type}
              onChange={e => setType(e.target.value)}
              className='p-2 border rounded'
              placeholder='Ví dụ: Trực tuyến / Tại lớp'
            />
          </div>

          <div className='flex flex-col md:col-span-2'>
            <label className='font-bold mb-1'>
              Địa điểm: <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={location}
              onChange={e => setLocation(e.target.value)}
              className='p-2 border rounded'
              placeholder='Nhập địa điểm'
            />
          </div>

          <div className='flex flex-col md:col-span-2'>
            <label className='font-bold mb-1'>Nội dung:</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className='p-2 border rounded'
              rows={4}
              placeholder='Nhập nội dung buổi học'
            />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-end space-x-3'>
          <button
            onClick={handleDelete}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400'
          >
            Xóa buổi học
          </button>
          <button
            onClick={handleCancel}
            className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300'
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400'
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
