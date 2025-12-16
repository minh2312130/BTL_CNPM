import React, { useState, useEffect } from 'react';
import { Paperclip, X } from 'lucide-react'; 

const SessionRecordModal = ({ isOpen, onClose, event, onSave }) => {
  // State lưu dữ liệu biên bản
  const [recordData, setRecordData] = useState({
    writer: '',
    date: '',
    content: ''
  });

  // Khi mở modal lên, nếu có dữ liệu cũ thì điền vào (hoặc lấy ngày hiện tại)
  useEffect(() => {
    if (isOpen && event) {
      setRecordData({
        writer: event.lecturer || 'Giảng viên', // Mặc định là tên giảng viên
        date: new Date().toISOString().split('T')[0], // Mặc định ngày hôm nay
        content: event.recordContent || '' // Nội dung cũ nếu có
      });
    }
  }, [isOpen, event]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(recordData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="session-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* --- HEADER --- */}
        <div className="session-header">
          <h3>BIÊN BẢN BUỔI HỌC</h3>
          {/* Nút đóng ẩn hoặc hiện tùy ý, trong thiết kế không có nút X rõ ràng ở header nhưng nên thêm cho UX */}
        </div>

        {/* --- BODY --- */}
        <div className="session-body">
          {/* Dòng 1: Người viết */}
          <div className="session-row">
            <input 
              type="text" 
              name="writer"
              placeholder="Người viết" 
              value={recordData.writer}
              onChange={handleChange}
              className="session-input"
            />
          </div>

          {/* Dòng 2: Ngày viết */}
          <div className="session-row">
            <input 
              type="date" 
              name="date"
              placeholder="Ngày viết" 
              value={recordData.date}
              onChange={handleChange}
              className="session-input"
            />
          </div>

          {/* Dòng 3: Nội dung (Textarea lớn) */}
          <div className="session-row full-height">
            <textarea 
              name="content"
              placeholder="Nội dung biên bản" 
              value={recordData.content}
              onChange={handleChange}
              className="session-textarea"
            ></textarea>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="session-footer">
          <div className="footer-left">
            <button className="icon-btn-clip" title="Đính kèm tệp">
              <Paperclip size={20} color="#333" />
            </button>
          </div>
          <div className="footer-right">
            <button className="btn-session btn-cancel" onClick={onClose}>Hủy</button>
            <button className="btn-session btn-save" onClick={handleSave}>Lưu</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SessionRecordModal;