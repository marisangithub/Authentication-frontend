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
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        background: 'linear-gradient(135deg, #020617, #172554, #312e81)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
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
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      fontSize: '40px',
                      fontWeight: 'bold',
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <h2 className="fw-bold text-center mb-2">{user?.name}</h2>
                  <p className="text-center text-light mb-4">{user?.email}</p>

                  <div
                    className="rounded-4 p-3 mb-3"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  >
                    <h5 className="mb-2">🔐 Secure Login</h5>
                    <small>Your authentication system is successfully connected.</small>
                  </div>

                  <div
                    className="rounded-4 p-3"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  >
                    <h5 className="mb-2">🚀 Portfolio Ready</h5>
                    <small>This dashboard can now be added to your MERN portfolio project.</small>
                  </div>
                </div>

                <div className="col-md-7 p-4 p-md-5 bg-white text-center d-flex flex-column justify-content-center">
                  <div
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      fontSize: '42px',
                      boxShadow: '0 0 25px rgba(34,197,94,0.4)',
                    }}
                  >
                    ✓
                  </div>

                  <h1 className="fw-bold mb-3 text-success">
                    Authentication Successful 🎉
                  </h1>

                  <p className="text-muted fs-5 mb-4">
                    Welcome back, <strong>{user?.name}</strong>. Your login was successful and your authentication system is now fully working.
                  </p>

                  <div
                    className="rounded-4 border p-4 mb-4 text-start"
                    style={{ background: '#f8fafc' }}
                  >
                    <h5 className="fw-bold mb-3">Account Information</h5>

                    <p className="mb-2">
                      <strong>Name:</strong> {user?.name}
                    </p>

                    <p className="mb-0">
                      <strong>Email:</strong> {user?.email}
                    </p>
                  </div>

                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <button
                      className="btn btn-outline-primary btn-lg rounded-4 px-4"
                      onClick={() => navigate('/')}
                    >
                      Go Home
                    </button>

                    <button
                      className="btn btn-danger btn-lg rounded-4 px-4"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
