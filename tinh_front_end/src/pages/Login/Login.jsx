import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LogoImage from '../../logoBK.png';
const MENTEE_USERNAME = 'mentee';
const MENTEE_PASSWORD = '123456';

const TUTOR_USERNAME = 'tutor';
const TUTOR_PASSWORD = '123456';




function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username === MENTEE_USERNAME && password === MENTEE_PASSWORD) {
      setError('');
      navigate('/mentee');
      localStorage.setItem('role', 'mentee');
    }
    else if (username === TUTOR_USERNAME && password === TUTOR_PASSWORD) {
      setError('');
      navigate('/tutor');
      localStorage.setItem('role', 'tutor');
    }
    else {
      setError('Sai tên tài khoản hoặc mật khẩu. Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <img src={LogoImage} alt="Logo BK" className="logo-mark small" />
        <h1>DỊCH VỤ XÁC THỰC TẬP TRUNG</h1>
      </header>

      <section className="auth-body">
        <div className="auth-card">
          <h2>Nhập thông tin tài khoản của bạn</h2>

          <label>
            Tên tài khoản
            <input
              type="text"
              placeholder="Tên tài khoản"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Mật khẩu
            <input
              type="password"
              placeholder="Mật khẩu"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="auth-checkbox">
            <input type="checkbox" />
            Cảnh báo trước khi tôi đăng nhập vào các trang web khác.
          </label>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-actions">
            <button type="button" className="btn primary" onClick={handleSubmit}>
              Đăng nhập
            </button>
            <button type="button" className="btn secondary">Xóa</button>
          </div>

          <a className="forgot" href="#">
            Thay đổi mật khẩu?
          </a>
        </div>

        <aside className="auth-notes">
          <div className="languages">
            <a href="#">Tiếng Việt</a>
            <span> | </span>
            <a href="#">Tiếng Anh</a>
          </div>

          <div className="notes-block">
            <h3>Lưu ý</h3>
            <p>
              Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ thống web ở Trường Đại học Bách Khoa-ĐHQG-HCM.
              Điều này có nghĩa là bạn chỉ đăng nhập một lần cho những hệ thống web đã đăng ký với hệ thống xác thực quản lý truy cập tập trung.
            </p>
            <p>
              Bạn cần dùng tài khoản HCMUT để đăng nhập. Tài khoản HCMUT cho phép truy cập đến nhiều tài nguyên gồm hệ thống thông tin, thư điện tử, ...
            </p>
            <p>
              Vì lý do an ninh, bạn hãy Thoát khỏi trình duyệt Web khi bạn kết thúc việc truy cập các dịch vụ đòi hỏi xác thực!
            </p>
          </div>

          <div className="support-block">
            <h3>Hỗ trợ kỹ thuật</h3>
            <p>
              E-mail: <a href="mailto:support@hcmut.edu.vn">support@hcmut.edu.vn</a>
            </p>
            <p>ĐT: (84-8) 38647256 - 7204</p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Login;
