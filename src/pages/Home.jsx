import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="card border-0 shadow-lg text-center p-5"
              style={{
                borderRadius: '30px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                color: 'white',
              }}
            >
              <div className="mb-4">
                <div
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                    fontSize: '38px',
                    boxShadow: '0 0 30px rgba(99,102,241,0.5)',
                  }}
                >
                  🔐
                </div>

                <h1 className="fw-bold display-4 mb-3">
                  Welcome to My Authentication Page
                </h1>

                <p
                  className="lead mx-auto"
                  style={{ maxWidth: '600px', color: '#cbd5e1' }}
                >
                  Secure login, OTP-based registration, and password reset system
                  built for your portfolio project.
                </p>
              </div>

              <div className="row g-4 mt-4 mb-4">
                <div className="col-md-4">
                  <div
                    className="p-4 h-100 rounded-4"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <h3 className="mb-2">📧</h3>
                    <h5>Email Login</h5>
                    <p className="small text-light mb-0">
                      Login securely with your email and password.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="p-4 h-100 rounded-4"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <h3 className="mb-2">🔑</h3>
                    <h5>OTP Register</h5>
                    <p className="small text-light mb-0">
                      Create a new account using email OTP verification.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="p-4 h-100 rounded-4"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <h3 className="mb-2">🛡️</h3>
                    <h5>Forgot Password</h5>
                    <p className="small text-light mb-0">
                      Reset your password anytime using OTP.
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-3">
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
                  style={{
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                    border: 'none',
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                  style={{ borderRadius: '15px' }}
                >
                  Register
                </Link>
              </div>

              <div className="mt-5 text-secondary small">
                Developed by Mari • MERN Stack Authentication Project
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
