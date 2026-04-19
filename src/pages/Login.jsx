import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotChange = (e) => {
    setForgotData({
      ...forgotData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    setError('');
    setMessage('');

    try {
      setLoading(true);

      const response = await axios.post(
        'https://authentication-backend-5fku.onrender.com/api/auth/login',
        loginData
      );

      setMessage(response.data.message);

      localStorage.setItem('user', JSON.stringify(response.data.user));

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
    setError('');
    setMessage('');

    try {
      setLoading(true);

      const response = await axios.post(
        'https://authentication-backend-5fku.onrender.com/api/auth/forgot-password/send-otp',
        {
          email: forgotData.email,
        }
      );

      setMessage(response.data.message);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyForgotOtp = async () => {
    setError('');
    setMessage('');

    try {
      setLoading(true);

      const response = await axios.post(
        'https://authentication-backend-5fku.onrender.com/api/auth/forgot-password/verify-otp',
        {
          email: forgotData.email,
          otp: forgotData.otp,
        }
      );

      setMessage(response.data.message);
      setOtpVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setError('');
    setMessage('');

    try {
      setLoading(true);

      const response = await axios.post(
        'https://authentication-backend-5fku.onrender.com/api/auth/reset-password',
        {
          email: forgotData.email,
          otp: forgotData.otp,
          newPassword: forgotData.newPassword,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        setForgotMode(false);
        setOtpSent(false);
        setOtpVerified(false);
        setForgotData({
          email: '',
          otp: '',
          newPassword: '',
        });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px', borderRadius: '20px' }}>
        {!forgotMode ? (
          <>
            <h2 className="text-center mb-4 fw-bold">Login</h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={loginUser}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center mt-3">
              <span
                style={{ color: '#0d6efd', cursor: 'pointer' }}
                onClick={() => {
                  setForgotMode(true);
                  setMessage('');
                  setError('');
                }}
              >
                Forgot Password?
              </span>
            </div>

            <p className="text-center mt-4 mb-0">
              Don't have an account?{' '}
              <span
                style={{ color: '#0d6efd', cursor: 'pointer' }}
                onClick={() => navigate('/register')}
              >
                Register
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-center mb-4 fw-bold">Forgot Password</h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={forgotData.email}
                onChange={handleForgotChange}
              />
            </div>

            {!otpSent && (
              <button
                className="btn btn-warning w-100"
                onClick={sendForgotOtp}
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <div className="mt-3 mb-3">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={forgotData.otp}
                    onChange={handleForgotChange}
                  />
                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={verifyForgotOtp}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </>
            )}

            {otpVerified && (
              <>
                <div className="mt-3 mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Enter new password"
                    value={forgotData.newPassword}
                    onChange={handleForgotChange}
                  />
                </div>

                <button
                  className="btn btn-danger w-100"
                  onClick={resetPassword}
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </>
            )}

            <div className="text-center mt-4">
              <span
                style={{ color: '#0d6efd', cursor: 'pointer' }}
                onClick={() => {
                  setForgotMode(false);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setMessage('');
                  setError('');
                }}
              >
                Back to Login
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
