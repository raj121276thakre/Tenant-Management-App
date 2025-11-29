// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Home } from 'lucide-react';
import PropTypes from 'prop-types';
import Button from '../components/ui/Button';

/**
 * Login.jsx
 * Converted from Login.tsx (keeps same UI & behavior, Bootstrap classes)
 *
 * Props:
 *  - setIsAuthenticated: function
 */

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // keep same behaviour as original: mark authenticated and navigate
    if (setIsAuthenticated) setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="w-100" style={{ maxWidth: 520 }}>
        {/* Welcome Illustration */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{ width: 80, height: 80, backgroundColor: '#2563eb' /* blue-600 */ }}
          >
            <Home color="#fff" size={32} />
          </div>
          <h1 className="h4 mb-1 text-dark">Welcome Back</h1>
          <p className="text-muted mb-0">Manage your tenants with ease</p>
        </div>

        {/* Login Card */}
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-3">
                <label className="form-label text-muted">Email</label>
                <div className="position-relative">
                  <div
                    className="position-absolute"
                    style={{ left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  >
                    <Mail color="#94a3b8" size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-control ps-5"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-2">
                <label className="form-label text-muted">Password</label>
                <div className="position-relative">
                  <div
                    className="position-absolute"
                    style={{ left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  >
                    <Lock color="#94a3b8" size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-control ps-5"
                    required
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-end mb-3">
                <button type="button" className="btn btn-link p-0 small text-primary">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <div className="d-grid mb-3">
                <Button type="submit" variant="primary" fullWidth>
                  Login
                </Button>
              </div>

              {/* Signup Link */}
              <div className="text-center">
                <p className="text-muted mb-0">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="btn btn-link p-0 text-primary"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted small mt-3">Tenant Management System v1.0</p>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsAuthenticated: PropTypes.func,
};
