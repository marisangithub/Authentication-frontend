import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

      const response = await axios.post(
        'https://authentication-backend-5fku.onrender.com/api/auth/register/send-otp',
        {
          email: formData.email,
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
        'https://authentication-backend-5fku.onrender.com/api/auth/register/verify-otp',
        formData
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px', borderRadius: '20px' }}>
        <h2 className="text-center mb-4 fw-bold">Register</h2>

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {!otpSent ? (
          <button
            className="btn btn-primary w-100"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        ) : (
          <>
            <div className="mt-4 mb-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                name="otp"
                className="form-control"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-success w-100"
              onClick={verifyOtpAndRegister}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP & Register'}
            </button>
          </>
        )}

        <p className="text-center mt-4 mb-0">
          Already have an account?{' '}
          <span
            style={{ color: '#0d6efd', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
