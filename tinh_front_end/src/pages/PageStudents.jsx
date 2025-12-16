// src/pages/PageStudents.jsx
import React from "react";
import { Sliders } from "lucide-react";
import { COLORS } from "../theme/colors";

const initialStudents = [
  { id: 101, name: "Nguyễn Chí Tấn", studentId: "C03014", className: "Lớp 3", progress: "Tiến độ" },
  { id: 102, name: "Trường Hoàng Minh", studentId: "PH1942", className: "Lớp 5", progress: "Tiến độ" },
  { id: 103, name: "Nguyễn Chí Tấn", studentId: "PH1942", className: "Lớp 5", progress: "Tiến độ" },
  { id: 104, name: "Minh Hoàng Trường", studentId: "MT1003", className: "Lớp 2", progress: "Tiến độ" },
];

export default function PageStudents() {
  return (
    <section className="pt-8 pb-14 min-h-screen" style={{ backgroundColor: COLORS.BG_LIGHT }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">Danh sách Sinh viên</h2>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">Tổng số: {initialStudents.length} sinh viên</div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-white" style={{ backgroundColor: COLORS.NAVY_DARK }}>
            <Sliders size={16} /> Lọc
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead style={{ backgroundColor: COLORS.NAVY_DARK }} className="text-[#efece3]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tên</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Mã SV/Lớp</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {initialStudents.map((s, idx) => (
                <tr key={s.id} style={{ backgroundColor: idx % 2 === 0 ? COLORS.ROW1 : COLORS.ROW2 }}>
                  <td className="px-6 py-4">{s.name}</td>
                  <td className="px-6 py-4">{s.studentId}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 rounded-lg text-white font-medium" style={{ backgroundColor: COLORS.NAVY_DARK }}>
                      {s.progress}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
