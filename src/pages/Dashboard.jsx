import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-lg text-center p-5"
        style={{ maxWidth: '600px', width: '100%', borderRadius: '20px' }}
      >
        <h1 className="fw-bold text-success mb-3">
          Authentication Successful 🎉
        </h1>

        <h3 className="mb-4">
          Welcome, <span className="text-primary">{user?.name}</span>
        </h3>

        <p className="text-muted mb-4">
          Your login was successful and your authentication system is working properly.
        </p>

        <div className="bg-light border rounded p-3 mb-4">
          <p className="mb-2">
            <strong>Name:</strong> {user?.name}
          </p>
          <p className="mb-0">
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
