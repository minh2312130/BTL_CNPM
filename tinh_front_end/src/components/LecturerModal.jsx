// src/components/LecturerModal.jsx
import React from "react";
import { X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <--- 1. THÊM DÒNG NÀY
import { COLORS } from "../theme/colors";

export default function LecturerModal({ lecturer, onClose }) {
  const navigate = useNavigate(); // <--- 2. KHAI BÁO CÔNG CỤ CHUYỂN TRANG

  if (!lecturer) return null;

  const DetailItem = ({ label, value }) => (
    <div className="flex gap-2 items-center">
      <span className="font-medium text-sm" style={{ color: COLORS.NAVY_DARK }}>{label}:</span>
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  );

  // Hàm xử lý khi bấm nút
  const handleViewTimetable = () => {
    onClose(); // Đóng modal lại
    navigate('/mentee/register',{ state: { lecturerName: lecturer.name } }); // Chuyển hướng sang trang lịch của tutor
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold" style={{ color: COLORS.NAVY_DARK }}>{lecturer.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 flex gap-6">
          <div className="flex flex-col items-center w-36">
            {/* Avatar Gấu Trúc */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl shadow-inner border-2 border-gray-300">
              🐼
            </div>
            <p className="text-sm text-center text-gray-600 mt-2">{lecturer.description}</p>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-3 border-b pb-3">
              <DetailItem label="Email" value={lecturer.email} />
              <DetailItem label="Giới tính" value={lecturer.gender} />
              <DetailItem label="Vai trò" value={lecturer.field} />
              <DetailItem label="Chuyên môn" value={lecturer.major} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <DetailItem label="Số cấp đã ghép" value={lecturer.pairedCount} />
              <DetailItem label="Số buổi đã dạy" value={lecturer.taughtSessions} />
              <DetailItem label="Bình luận" value={lecturer.commentsCount} />
              <DetailItem label="Đánh giá" value={`${lecturer.rating}/5 (${lecturer.votedCount} lượt)`} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleViewTimetable} // <--- 3. GẮN HÀM XỬ LÝ VÀO ĐÂY
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: COLORS.NAVY_DARK, color: "white" }}
          >
            <Clock size={16} /> Xem thời gian biểu
          </button>
        </div>
      </div>
    </div>
  );
}