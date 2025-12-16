import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';

const CreateSession = ({ isOpen, onClose, onSave }) => {
  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'Online',
    location: '',
    desc: ''
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

  if (!isOpen) return null;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý khi bấm Lưu
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu ra ngoài cho cha xử lý
    onSave(formData);
    // Reset form (tuỳ chọn)
    setFormData({ title: '', date: '', startTime: '', endTime: '', type: 'Online', location: '', desc: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h3>Tạo buổi học mới</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body - Form */}
        <form onSubmit={handleSubmit} className="modal-body">
          
          {/* Tên môn học */}
          <div className="form-group">
            <label>Tên môn học / Tiêu đề:</label>
            <input 
              type="text" 
              name="title" 
              className="form-input" 
              placeholder="VD: Mạng máy tính" 
              value={formData.title}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Hàng: Ngày & Giờ */}
          <div className="form-row">
            <div className="form-group half">
              <label>Ngày học:</label>
              <input 
                type="date" 
                name="date" 
                className="form-input" 
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group quarter">
              <label>Bắt đầu:</label>
              <select
                name="startTime"
                className="form-input"
                value={formData.startTime}
                onChange={handleChange}
                required
              >
                <option value="">Chọn giờ</option>
                {timeOptions.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group quarter">
              <label>Kết thúc:</label>
              <select
                name="endTime"
                className="form-input"
                value={formData.endTime}
                onChange={handleChange}
                required
              >
                <option value="">Chọn giờ</option>
                {timeOptions.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hàng: Hình thức & Địa điểm */}
          <div className="form-row">
            <div className="form-group half">
              <label>Hình thức:</label>
              <select 
                name="type" 
                className="form-input" 
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div className="form-group half">
              <label>Địa điểm / Link:</label>
              <input 
                type="text" 
                name="location" 
                className="form-input" 
                placeholder="VD: Phòng H3-301 hoặc Link Google Meet" 
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className="form-group">
            <label>Nội dung:</label>
            <textarea 
              name="desc" 
              className="form-input" 
              rows="3" 
              placeholder="Nội dung chính buổi học ..."
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Footer - Buttons */}
          <div className="modal-footer">
            <button type="submit" className="btn-action btn-save">Tạo</button>
            <button type="button" className="btn-action btn-cancel" onClick={onClose}>Hủy bỏ</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateSession;