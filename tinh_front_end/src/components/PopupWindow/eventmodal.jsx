import React from 'react';
import { useEffect } from "react";
import format from 'date-fns/format';
import vi from 'date-fns/locale/vi';
import { X } from 'lucide-react'; // Icon đóng

const EventModal = ({ event, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!event) return null;

  const dateStr = format(event.start, 'dd/MM/yyyy', { locale: vi });
  const timeStartStr = format(event.start, 'h:mm a');
  const timeEndStr = format(event.end, 'h:mm a');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3>Thông tin chi tiết</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="info-row">
            <span className="label">Môn học:</span>
            <span className="value font-bold">{event.title}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Giảng viên:</span>
            <span className="value">{event.lecturer || 'Chưa cập nhật'}</span>
          </div>

          <div className="info-row">
            <span className="label">Thời gian:</span>
            <span className="value">
              {timeStartStr} - {timeEndStr} <br /> {dateStr}
            </span>
          </div>

          <div className="info-row">
            <span className="label">Hình thức:</span>
            <span className="value">{event.type || 'Online'}</span>
          </div>

          <div className="info-row">
            <span className="label">Địa điểm:</span>
            <span className="value link">{event.location || 'https://google.meet'}</span>
          </div>

          <div className="info-row">
            <span className="label">Nội dung:</span>
            <span className="value">{event.content || 'Buổi học định kỳ'}</span>
          </div>

          <div className="info-row">
            <span className="label">Số lượng sinh viên:</span>
            <span className="value">{event.studentsCount || '0/50'}</span>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-action btn-join">Tham gia</button>
          <button className="btn-action btn-edit" onClick={onClose}>
            Hủy bỏ
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventModal;