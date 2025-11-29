// frontend/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import PropTypes from 'prop-types';
import { AppContext } from '../../App';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function Login() {
  const context = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!context) return null;

  const { setIsAuthenticated, setCurrentScreen } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="w-100" style={{ maxWidth: 520 }}>
        <div className="card shadow-sm rounded-3">
          <div className="card-body p-4">
            {/* Logo/Illustration */}
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{ width: 80, height: 80, backgroundColor: '#2563eb' }}
              >
                <LogIn color="#fff" size={36} />
              </div>
              <h1 className="h5 mb-1 text-dark">Tenant Management</h1>
              <p className="text-muted mb-0">
                {isLogin ? 'Welcome back! Please login to continue' : 'Create your account to get started'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 position-relative">
                {/* icon */}
                <div
                  className="position-absolute"
                  style={{ left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                >
                  <Mail color="#94a3b8" size={18} />
                </div>

                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ps-5"
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <div
                  className="position-absolute"
                  style={{ left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                >
                  <Lock color="#94a3b8" size={18} />
                </div>

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ps-5"
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-3 position-relative">
                  <div
                    className="position-absolute"
                    style={{ left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  >
                    <Lock color="#94a3b8" size={18} />
                  </div>

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    className="ps-5"
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="text-end mb-3">
                  <button type="button" className="btn btn-link p-0 small text-primary">
                    Forgot Password?
                  </button>
                </div>
              )}

              <div className="d-grid mb-3">
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </div>
            </form>

            {/* Toggle */}
            <div className="text-center mt-3">
              <p className="text-muted mb-0">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="btn btn-link p-0 text-primary"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted small mt-3">Secure property management made simple</p>
      </div>
    </div>
  );
}

Login.propTypes = {
  // no props
};
