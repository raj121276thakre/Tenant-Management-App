// frontend/src/components/modals/ChangePasswordModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAppSettings } from '../../contexts/AppContext';

/**
 * ChangePasswordModal (JSX + Bootstrap)
 * Keeps same logic and UX as original TSX.
 */

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { changePassword } = useAppSettings();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const changed = changePassword(formData.oldPassword, formData.newPassword);

    if (changed) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setSuccess(false);
      }, 1500);
    } else {
      setError('Current password is incorrect');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2" role="alert">
            Password changed successfully!
          </div>
        )}

        <div className="mb-3">
          <Input
            label="Current Password"
            type="password"
            value={formData.oldPassword}
            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
            required
            placeholder="Enter current password"
          />
        </div>

        <div className="mb-3">
          <Input
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-3">
          <Input
            label="Confirm New Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            placeholder="Confirm new password"
          />
        </div>

        <div className="d-flex gap-2">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Change Password
          </Button>
        </div>
      </form>
    </Modal>
  );
}

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
