import React from 'react';
import BookCard from '../components/Library/bookcard';

const LibraryPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Thư viện tài liệu</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        <BookCard title="Giáo trình Vật Lý 1" author="Nguyễn Chí Tân" color="#6aa84f" />
        <BookCard title="Hóa Đại Cương" author="Trương Hoàng Minh" color="#93c47d" />
        <BookCard title="Giải tích 1" author="Trần Minh Trí" color="#6fa8dc" />
      </div>
    </div>
  );
};

export default LibraryPage;