// src/pages/PageRegistration.jsx
import React from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { COLORS } from "../theme/colors";

const subjects = [
  { id: 1, name: "Cấu trúc Dữ liệu", code: "CS201" },
  { id: 2, name: "Nhập môn Lập trình", code: "CS101" },
  { id: 3, name: "Cơ sở Dữ liệu", code: "IS301" },
  { id: 4, name: "Mạng máy tính", code: "CN405" },
  { id: 5, name: "Công nghệ Phần mềm", code: "SE402" },
];

export default function PageRegistration({ setCurrentPage, setSubject }) {
  const handleSelect = (s) => {
    setSubject(s);
    setCurrentPage("Lecturers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-8 pb-14 min-h-screen" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#3f72af] flex items-center gap-3">
          <BookOpen size={26} className="text-yellow-400" /> Đăng ký lớp học
        </h1>
        <p className="mt-3 text-gray-600 border-b pb-4">Chọn môn học bạn muốn tìm giảng viên để ghép cặp:</p>

        <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-gray-200">
          {subjects.map((s, i) => (
            <div
              key={s.id}
              onClick={() => handleSelect(s)}
              className={`flex justify-between items-center p-6 cursor-pointer transition ${
                i % 2 === 1 ? "bg-[#f8fafc]" : ""
              } hover:bg-[${COLORS.ROW1}]`}
              // Tailwind can't compile dynamic bg-[...] from variable; use inline style for true color match
              style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f8fafc" }}
            >
              <div>
                <div className="text-lg font-semibold text-gray-800">{s.name}</div>
                <div className="text-sm text-[#3f72af] mt-1">{s.code}</div>
              </div>

              <ChevronDown size={20} className="text-[#3f72af] transform -rotate-90" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
