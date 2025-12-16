import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa'; // Nhớ cài: npm install react-icons nếu chưa

export default function ProfilePage() {
  const navigate = useNavigate();

  // --- Thông tin cá nhân (Mock data) ---
  const user = {
    name: 'Nguyễn Chí Tân',
    gender: 'Nam',
    email: 'tan.nguyennct59@hcmut.edu.vn',
    role: localStorage.getItem('role') === 'tutor' ? 'Giảng viên' : 'Học viên',
    subjects: 'Database, Công nghệ phần mềm',
    status: 'Offline',
    avatar: 'https://i.pravatar.cc/150?img=5'
  };

  // --- Thông tin thống kê ---
  const stats = {
    pairedTeachers: 3,
    hoursLearned: 4,
    sessionsAttended: 10,
    sessionsCancelled: 0,
    feedbackCount: 99
  };

  return (
    <div style={styles.container}>
      {/* 1. Phần Tiêu đề & Nút Quay lại */}
      <div style={styles.topBar}>
        <button 
          onClick={() => navigate(-1)} // Quay lại trang trước
          style={styles.backBtn}
        >
          &lt; Quay lại
        </button>
        <h2 style={styles.pageTitle}>TRANG CÁ NHÂN</h2>
        <div style={{ width: '80px' }}></div> {/* Spacer để cân giữa */}
      </div>

      {/* 2. Phần Nội dung chính (Chia 2 cột) */}
      <div style={styles.contentWrapper}>
        
        {/* Cột trái: Avatar & Thông tin cơ bản */}
        <div style={styles.leftCard}>
          <div style={styles.avatarContainer}>
            <img src={user.avatar} alt="avatar" style={styles.avatarImg} />
            <button style={styles.cameraBtn}>
              <FaCamera size={14} color="#555" />
            </button>
          </div>
          
          <h2 style={styles.nameText}>{user.name}</h2>
          
          <div style={styles.infoList}>
            <p style={styles.infoItem}><b>Giới tính:</b> {user.gender}</p>
            <p style={styles.infoItem}><b>Email:</b> {user.email}</p>
            <p style={styles.infoItem}><b>Vai trò:</b> {user.role}</p>
            {/*<p style={styles.infoItem}><b>Nhóm môn:</b> {user.subjects}</p>*/}
            <p style={styles.infoItem}>
              <b>Trạng thái:</b> <span style={{color: 'gray'}}>{user.status}</span>
            </p>
          </div>
        </div>

        {/* Cột phải: Thống kê (Màu xanh dương nhạt) */}
        <div style={styles.rightCard}>
          <h3 style={styles.sectionTitle}>Thông tin hoạt động</h3>
          <div style={styles.statsGrid}>
            <p>Số giảng viên đã ghép cặp: <b>{stats.pairedTeachers}</b></p>
            <p>Số giờ đã học: <b>{stats.hoursLearned}</b></p>
            <p>Số buổi đã học: <b>{stats.sessionsAttended}</b></p>
            <p>Số buổi đã hủy: <b>{stats.sessionsCancelled}</b></p>
            <p>Số bình luận/ phản hồi: <b>{stats.feedbackCount}</b></p>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- CSS Styles (Viết trực tiếp ở đây để không lo lỗi thư viện) ---
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto', // Căn giữa màn hình
    fontFamily: "'Segoe UI', sans-serif",
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#2196f3', // Màu xanh link
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '16px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    textTransform: 'uppercase',
  },
  contentWrapper: {
    display: 'flex',
    gap: '30px', // Khoảng cách giữa 2 cột
    flexWrap: 'wrap', // Tự xuống dòng nếu màn hình nhỏ
  },
  // --- Style Cột Trái ---
  leftCard: {
    flex: '1', // Chiếm 1 phần
    minWidth: '300px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: '15px',
  },
  avatarImg: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #f0f2f5',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#e4e6eb',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '10px 0 20px 0',
    color: '#1c1e21',
  },
  infoList: {
    width: '100%',
    textAlign: 'left',
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#333',
  },
  infoItem: {
    margin: '5px 0',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px',
  },
  // --- Style Cột Phải ---
  rightCard: {
    flex: '2', 
    minWidth: '300px',
    backgroundColor: '#92a8d1', // <--- Đổi thành màu xanh giống trong hình
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '30px',
    color: 'white', // <--- Đổi màu chữ thành trắng cho nổi
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '20px', // To hơn xíu
    fontWeight: 'bold',
    color: '#000', // Tiêu đề "Thông tin" giữ màu đen (hoặc đổi thành 'white' nếu bạn thích)
    paddingBottom: '10px',
    display: 'inline-block',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px', // Tăng khoảng cách cho thoáng
    fontSize: '16px', // Chữ to rõ hơn
    fontWeight: '500',
    color: 'white', // Chắc chắn chữ trong lưới là màu trắng
  }
};
