import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const api = 'https://authentication-backend-5fku.onrender.com/api/auth';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = async () => {
    setError('');
    setMessage('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${api}/register/send-otp`, {
        email: formData.email,
      });

      setMessage(response.data.message);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    setError('');
    setMessage('');

    if (!formData.otp) {
      setError('Please enter OTP');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${api}/register/verify-otp`,
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        background: 'linear-gradient(135deg, #020617, #172554, #312e81)',
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-lg-10 col-xl-8">
          <div
            className="card border-0 shadow-lg overflow-hidden"
            style={{
              borderRadius: '30px',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <div className="row g-0">
              <div
                className="col-md-5 d-none d-md-flex flex-column justify-content-center text-white p-5"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                }}
              >
                <h1 className="fw-bold mb-3">✨ Create Account</h1>
                <p className="mb-4 text-light">
                  Join your authentication system with secure OTP-based registration.
                </p>

                <div
                  className="rounded-4 p-3 mb-3"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <h5>Email Verification</h5>
                  <small>
                    We send a secure 6-digit OTP to verify your email address.
                  </small>
                </div>

                <div
                  className="rounded-4 p-3"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <h5>Safe Authentication</h5>
                  <small>
                    Your account is only created after successful OTP verification.
                  </small>
                </div>
              </div>

              <div className="col-md-7 p-4 p-md-5 bg-white">
                <h2 className="fw-bold mb-2">Register</h2>
                <p className="text-muted mb-4">
                  Create your account to access the authentication dashboard.
                </p>

                {message && (
                  <div className="alert alert-success rounded-4">{message}</div>
                )}

                {error && (
                  <div className="alert alert-danger rounded-4">{error}</div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {!otpSent ? (
                  <button
                    className="btn btn-primary btn-lg w-100 rounded-4 mb-3"
                    onClick={sendOtp}
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                      border: 'none',
                    }}
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Enter OTP</label>
                      <input
                        type="text"
                        name="otp"
                        className="form-control form-control-lg rounded-4 text-center"
                        placeholder="Enter 6-digit OTP"
                        value={formData.otp}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      className="btn btn-success btn-lg w-100 rounded-4 mb-3"
                      onClick={verifyOtpAndRegister}
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP & Register'}
                    </button>
                  </>
                )}

                <div className="text-center mt-3 text-muted">
                  Already have an account?{' '}
                  <span
                    style={{ cursor: 'pointer', color: '#4f46e5', fontWeight: '600' }}
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
