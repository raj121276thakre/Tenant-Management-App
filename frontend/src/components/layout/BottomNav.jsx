// frontend/src/components/common/BottomNav.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Home, Users, DollarSign, FileText, Settings } from 'lucide-react';
import { AppContext } from '../../App';

/**
 * Mobile bottom navigation (Bootstrap)
 * Visible on small screens only (hidden on md+).
 * Keeps the same icons, labels and active state logic as the original TSX.
 */

export default function BottomNav() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { currentScreen, setCurrentScreen } = context;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'bills', label: 'Bills', icon: FileText },
    { id: 'rooms', label: 'Rooms', icon: Settings },
  ];

  return (
    <nav className="fixed-bottom bg-white border-top shadow d-md-none" aria-label="Bottom navigation">
      <div className="d-flex align-items-center justify-content-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentScreen(item.id)}
              className={`btn btn-link d-flex flex-column align-items-center text-decoration-none flex-grow-1 py-1 ${
                isActive ? 'text-primary' : 'text-muted'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <small className="d-block mt-1">{item.label}</small>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

BottomNav.propTypes = {
  // no props — uses AppContext
};
