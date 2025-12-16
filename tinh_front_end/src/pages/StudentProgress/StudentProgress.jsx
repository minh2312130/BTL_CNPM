import './StudentProgress.css';

function StudentProgress() {
  return (
    <div className="student-page">
      <header className="student-header">
        <div className="nav-back">&lt; Quay lại</div>
        <nav className="nav-tabs">
          <button className="tab-btn">Thời gian biểu</button>
          <button className="tab-btn">Thư viện</button>
          <button className="tab-btn active">Tiến độ học viên</button>
        </nav>
        <div className="header-icons">
          <span className="icon" aria-hidden="true">🔔</span>
          <span className="icon" aria-hidden="true">💬</span>
          <span className="icon" aria-hidden="true">⚙️</span>
          <div className="avatar" aria-hidden="true">👤</div>
        </div>
      </header>

      <section className="student-card">
        <h1>TIẾN ĐỘ SINH VIÊN</h1>
        <div className="student-details">
          <div className="student-info">
            <p>
              <span className="label">Tên:</span>
              <span className="value">Nguyễn Chí Tân</span>
            </p>
            <p>
              <span className="label">ID:</span>
              <span className="value">2313485</span>
            </p>
            <p>
              <span className="label">Trạng thái:</span>
              <span className="value">Đang học</span>
            </p>
          </div>
          <div className="student-statistics">
            <p>
              <span className="label">Tỉ lệ tham gia (số buổi đã học/ số buổi đã đăng ký):</span>
              <span className="value">39/41</span>
            </p>
            <p>
              <span className="label">Số buổi vắng mặt:</span>
              <span className="value">2</span>
            </p>
            <p>
              <span className="label">Số buổi đi trễ:</span>
              <span className="value">5</span>
            </p>
            <p>
              <span className="label">Điểm đánh giá của người hướng dẫn:</span>
              <span className="value">9.5/10</span>
            </p>
            <p>
              <span className="label">Kỹ năng cần cải thiện:</span>
              <span className="value">Đạo hàm bậc hai và đạo hàm hàm hợp</span>
            </p>
            <p>
              <span className="label">Ghi chú của người hướng dẫn:</span>
            </p>
            <textarea className="note-box" placeholder="Không có ghi chú thêm" readOnly />
          </div>
        </div>
        <div className="actions">
          <button className="update-btn">Cập nhật</button>
        </div>
      </section>
    </div>
  );
}

export default StudentProgress;
