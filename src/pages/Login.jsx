import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const api = 'https://authentication-backend-5fku.onrender.com/api/auth';

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleForgotChange = (e) => {
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const response = await axios.post(`${api}/login`, loginData);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const sendForgotOtp = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const response = await axios.post(`${api}/forgot-password/send-otp`, {
        email: forgotData.email,
      });

      setMessage(response.data.message);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const response = await axios.post(`${api}/forgot-password/verify-otp`, {
        email: forgotData.email,
        otp: forgotData.otp,
      });

      setMessage(response.data.message);
      setOtpVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const response = await axios.post(`${api}/reset-password`, {
        email: forgotData.email,
        otp: forgotData.otp,
        newPassword: forgotData.newPassword,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        setForgotMode(false);
        setOtpSent(false);
        setOtpVerified(false);
        setForgotData({ email: '', otp: '', newPassword: '' });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b, #312e81)',
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
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                }}
              >
                <h1 className="fw-bold mb-3">🔐 Secure Access</h1>
                <p className="mb-4 text-light">
                  Sign in to access your authentication dashboard and manage your account securely.
                </p>

                <div className="rounded-4 p-3 mb-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <h5>OTP Password Recovery</h5>
                  <small>Forgot password? Recover it instantly using email OTP.</small>
                </div>

                <div className="rounded-4 p-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <h5>Protected Dashboard</h5>
                  <small>After login, users are redirected to your custom dashboard page.</small>
                </div>
              </div>

              <div className="col-md-7 p-4 p-md-5 bg-white">
                {!forgotMode ? (
                  <>
                    <h2 className="fw-bold mb-2">Welcome Back 👋</h2>
                    <p className="text-muted mb-4">Login to continue to your portfolio authentication system.</p>

                    {message && <div className="alert alert-success rounded-4">{message}</div>}
                    {error && <div className="alert alert-danger rounded-4">{error}</div>}

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg rounded-4"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg rounded-4"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                    </div>

                    <div className="d-flex justify-content-end mb-4">
                      <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => {
                          setForgotMode(true);
                          setMessage('');
                          setError('');
                        }}
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      className="btn btn-primary btn-lg w-100 rounded-4 mb-4"
                      onClick={loginUser}
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        border: 'none',
                      }}
                    >
                      {loading ? 'Logging In...' : 'Login'}
                    </button>

                    <div className="text-center text-muted">
                      Don't have an account?{' '}
                      <span
                        style={{ cursor: 'pointer', color: '#4f46e5', fontWeight: '600' }}
                        onClick={() => navigate('/register')}
                      >
                        Register
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="fw-bold mb-2">Forgot Password</h2>
                    <p className="text-muted mb-4">Verify your email with OTP and create a new password.</p>

                    {message && <div className="alert alert-success rounded-4">{message}</div>}
                    {error && <div className="alert alert-danger rounded-4">{error}</div>}

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg rounded-4"
                        placeholder="Enter your email"
                        value={forgotData.email}
                        onChange={handleForgotChange}
                      />
                    </div>

                    {!otpSent && (
                      <button
                        className="btn btn-warning btn-lg w-100 rounded-4 mb-3"
                        onClick={sendForgotOtp}
                        disabled={loading}
                      >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    )}

                    {otpSent && !otpVerified && (
                      <>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">OTP</label>
                          <input
                            type="text"
                            name="otp"
                            className="form-control form-control-lg rounded-4 text-center"
                            placeholder="Enter 6-digit OTP"
                            value={forgotData.otp}
                            onChange={handleForgotChange}
                          />
                        </div>

                        <button
                          className="btn btn-success btn-lg w-100 rounded-4 mb-3"
                          onClick={verifyOtp}
                          disabled={loading}
                        >
                          {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                      </>
                    )}

                    {otpVerified && (
                      <>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            className="form-control form-control-lg rounded-4"
                            placeholder="Enter new password"
                            value={forgotData.newPassword}
                            onChange={handleForgotChange}
                          />
                        </div>

                        <button
                          className="btn btn-danger btn-lg w-100 rounded-4 mb-3"
                          onClick={resetPassword}
                          disabled={loading}
                        >
                          {loading ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                      </>
                    )}

                    <div className="text-center mt-3">
                      <button
                        className="btn btn-link text-decoration-none"
                        onClick={() => {
                          setForgotMode(false);
                          setOtpSent(false);
                          setOtpVerified(false);
                          setMessage('');
                          setError('');
                        }}
                      >
                        ← Back to Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
