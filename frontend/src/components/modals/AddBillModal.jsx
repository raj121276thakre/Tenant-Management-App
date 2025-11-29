// frontend/src/components/modals/AddBillModal.jsx
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { AppContext } from '../../App';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

/**
 * AddBillModal (JSX + Bootstrap)
 * Props:
 *  - isOpen: bool
 *  - onClose: func
 *  - tenantId: string
 *  - tenantName: string
 *
 * Note: This keeps use of your Modal, Input and Button atoms.
 */

export default function AddBillModal({ isOpen, onClose, tenantId, tenantName }) {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({
    units: '',
    amount: '',
    month: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  });

  if (!context) return null;

  const { lightBills, setLightBills } = context;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBill = {
      id: Date.now().toString(),
      tenantId,
      tenantName,
      units: parseFloat(formData.units) || 0,
      amount: parseFloat(formData.amount) || 0,
      month: formData.month,
      status: formData.status,
      date: formData.date,
    };

    setLightBills([...lightBills, newBill]);
    onClose();

    // Reset form
    setFormData({
      units: '',
      amount: '',
      month: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Light Bill">
      <form onSubmit={handleSubmit}>
        {/* Units */}
        <div className="mb-3">
          <Input
            label="Units (kWh)"
            type="number"
            value={formData.units}
            onChange={(e) => setFormData({ ...formData, units: e.target.value })}
            required
            placeholder="150"
          />
        </div>

        {/* Amount */}
        <div className="mb-3">
          <Input
            label="Amount ($)"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            placeholder="180"
          />
        </div>

        {/* Month */}
        <div className="mb-3">
          <Input
            label="Month"
            type="text"
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
            required
            placeholder="November 2025"
          />
        </div>

        {/* Date */}
        <div className="mb-3">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        {/* Status select */}
        <div className="mb-3">
          <label className="form-label d-block mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="form-select"
          >
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Actions */}
        <div className="d-flex gap-2">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Add Bill
          </Button>
        </div>
      </form>
    </Modal>
  );
}

AddBillModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
  tenantName: PropTypes.string,
};
