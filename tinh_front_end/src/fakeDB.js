// src/utils/fakeDB.js

// Key để lưu trong localStorage
const DB_KEY = 'tutor_system_classes';

// Hàm lấy tất cả lớp đã đăng ký
export const getRegisteredClasses = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) return [];
  
  // Parse JSON và chuyển chuỗi ngày tháng về dạng Date object (quan trọng cho Calendar)
  const parsed = JSON.parse(data);
  return parsed.map(item => ({
    ...item,
    start: new Date(item.start),
    end: new Date(item.end)
  }));
};

// Hàm lưu lớp mới (Đăng ký)
export const registerClass = (newClass) => {
  const currentClasses = getRegisteredClasses();
  
  // Kiểm tra trùng (Optional)
  const isExist = currentClasses.some(c => c.id === newClass.id);
  if (isExist) {
    alert("Lớp này đã đăng ký rồi!");
    return false;
  }

  const updatedClasses = [...currentClasses, newClass];
  localStorage.setItem(DB_KEY, JSON.stringify(updatedClasses));
  return true;
};

// Hàm xóa lớp (Hủy đăng ký)
export const unregisterClass = (classId) => {
  const currentClasses = getRegisteredClasses();
  const updatedClasses = currentClasses.filter(c => c.id !== classId);
  localStorage.setItem(DB_KEY, JSON.stringify(updatedClasses));
};