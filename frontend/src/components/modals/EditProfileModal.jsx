// frontend/src/components/modals/EditProfileModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAppSettings } from '../../contexts/AppContext';

/**
 * EditProfileModal (JSX + Bootstrap)
 * Mirrors the TSX behavior: prefilled fields from user, updates via updateUser.
 */

export default function EditProfileModal({ isOpen, onClose }) {
  const { user, updateUser } = useAppSettings();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="mb-3">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="mb-3">
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="d-flex gap-2">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
