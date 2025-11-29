// frontend/src/pages/Settings.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Phone, Lock, Bell, Moon, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function Settings() {
  const context = useContext(AppContext);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  if (!context) return null;

  const { setCurrentScreen, setIsAuthenticated } = context;

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  const settingsSections = [
    {
      title: 'Profile',
      items: [
        { icon: User, label: 'Edit Profile', value: 'John Doe', action: () => setCurrentScreen('edit-profile') },
        { icon: Mail, label: 'Email', value: 'john@example.com', action: () => {} },
        { icon: Phone, label: 'Phone', value: '+1 234 567 8900', action: () => {} },
        { icon: Lock, label: 'Change Password', action: () => setCurrentScreen('change-password') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', toggle: true, value: notifications, action: () => setNotifications(!notifications) },
        { icon: Moon, label: 'Dark Mode', toggle: true, value: darkMode, action: () => setDarkMode(!darkMode) },
        { icon: Globe, label: 'Language', value: 'English', action: () => setCurrentScreen('language') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', action: () => {} },
        { icon: HelpCircle, label: 'Terms & Conditions', action: () => {} },
        { icon: HelpCircle, label: 'Privacy Policy', action: () => {} },
      ],
    },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <Header title="Settings" onBack={() => setCurrentScreen('dashboard')} />

      <div className="p-4">
        <Card className="p-3 mb-3">
          <div className="d-flex gap-3 align-items-center">
            <div className="rounded-3 bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 72, height: 72 }}>
              <strong>JD</strong>
            </div>
            <div>
              <h6 className="mb-0">John Doe</h6>
              <small className="text-muted">Property Manager</small>
              <div className="small text-muted">john@example.com</div>
            </div>
          </div>
        </Card>

        {settingsSections.map((section, si) => (
          <div key={si} className="mb-3">
            <h6 className="mb-2">{section.title}</h6>
            <Card className="p-0">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button key={idx} onClick={item.action} className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="rounded p-2 bg-light"><Icon size={18} /></div>
                      <div className="text-start">
                        <div>{item.label}</div>
                        {item.value && !item.toggle && <small className="text-muted">{item.value}</small>}
                      </div>
                    </div>
                    {item.toggle !== undefined ? (
                      <div className={`form-check form-switch`}>
                        <input className="form-check-input" type="checkbox" checked={item.value} onChange={item.action} />
                      </div>
                    ) : (
                      <ChevronRight />
                    )}
                  </button>
                );
              })}
            </Card>
          </div>
        ))}

        <Card className="text-center p-3 mb-3">
          <div className="small text-muted">Tenant Management System</div>
          <div className="small text-muted">Version 1.0.0</div>
        </Card>

        <Button variant="danger" fullWidth icon={<LogOut size={18} />} onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

Settings.propTypes = {};
