import { useNavigate } from 'react-router-dom';
import './Landing.css';
import LogoImage from '../../logoBK.png';
function Landing() {
  const navigate = useNavigate();

  return (
    <main className="landing">
      <section className="landing__left">
        <div className="logo-card">
          <img src={LogoImage} alt="BK TP.HCM Logo" style={{ width: '100%', height: 'auto', border: 'none' }} />
        </div>
      </section>
      <section className="landing__right">
        <div className="landing__copy">
          <p className="eyebrow">official portal</p>
          <h1>
            Tutor
            <br /> Support
            <br /> System
          </h1>
          <button type="button" className="cta" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default Landing;
