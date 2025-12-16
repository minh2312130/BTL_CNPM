import React, { useState } from "react";
import { Sliders } from "lucide-react"; 
import LecturerModal from "../components/LecturerModal";
import { COLORS } from "../theme/colors"; // Đảm bảo ông đã copy file colors.js vào src/theme

const initialLecturers = [
  {
    id: 1,
    name: "Trương Hoàng Minh",
    email: "minhtruong@hcmut.edu.vn",
    description: "Bạn trai số 2, không ai số 1",
    field: "Giảng viên",
    gender: "Nam",
    major: "Database, Công nghệ phần mềm",
    pairedCount: 3000,
    taughtSessions: 6,
    commentsCount: 100,
    rating: 5,
    votedCount: 5,
    isPaired: false,
  },
  {
    id: 2,
    name: "Nguyễn Chí Tân",
    email: "tannc@hcmut.edu.vn",
    description: "Phụ trách môn Nhập môn lập trình",
    field: "Giảng viên",
    gender: "Nam",
    major: "Mạng máy tính, An toàn thông tin",
    pairedCount: 1500,
    taughtSessions: 4,
    commentsCount: 50,
    rating: 4.5,
    votedCount: 2,
    isPaired: true,
  },
  {
    id: 3,
    name: "Triệu Quốc Tính",
    email: "tinhtq@hcmut.edu.vn",
    description: "Chủ nhiệm khoa Khoa học máy tính",
    field: "Trợ giảng",
    gender: "Nam",
    major: "Hệ thống thông tin, AI",
    pairedCount: 800,
    taughtSessions: 2,
    commentsCount: 20,
    rating: 4.8,
    votedCount: 4,
    isPaired: false,
  },
  {
    id: 4,
    name: "Trần Minh Trí",
    email: "trinmt@hcmut.edu.vn",
    description: "Giảng viên môn Cấu trúc Dữ liệu",
    field: "Giảng viên",
    gender: "Nam",
    major: "Khoa học ứng dụng",
    pairedCount: 1200,
    taughtSessions: 8,
    commentsCount: 150,
    rating: 4.6,
    votedCount: 3,
    isPaired: false,
  },
];

export default function PageLecturers() {
  const [lecturers, setLecturers] = useState(initialLecturers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTogglePairing = (id) => {
    setLecturers((prev) => prev.map(l => l.id === id ? { ...l, isPaired: !l.isPaired } : l));
  };

  const filtered = lecturers.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="pt-8 pb-14 min-h-screen" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Danh sách tất cả giảng viên</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm Giảng viên hoặc Môn học..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-[#3f72af] focus:border-[#3f72af] shadow-sm"
          />
          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white" style={{ backgroundColor: COLORS.NAVY_DARK }}>
            <Sliders size={16} /> Lọc
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden divide-y">
          {filtered.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Không tìm thấy giảng viên nào.</p>
          ) : (
            filtered.map((lect, idx) => (
              <div key={lect.id} className="flex items-center justify-between p-4 sm:p-5"
                   style={{ backgroundColor: idx % 2 === 0 ? COLORS.ROW1 : COLORS.ROW2 }}>
                <div>
                  <div className="text-lg font-semibold text-gray-800">{lect.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{lect.major}</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTogglePairing(lect.id)}
                    className="px-3 py-1.5 rounded-lg text-white font-medium shadow-sm"
                    style={{ backgroundColor: lect.isPaired ? "#999" : "#3f72af" }}
                  >
                    {lect.isPaired ? "Đã ghép cặp" : "Ghép cặp"}
                  </button>

                  <button
                    onClick={() => { setSelectedLecturer(lect); setIsModalOpen(true); }}
                    className="px-3 py-1.5 rounded-lg font-medium shadow-sm text-white"
                    style={{ backgroundColor: COLORS.NAVY_DARK }}
                  >
                    Thông tin
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <LecturerModal
          lecturer={selectedLecturer}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}