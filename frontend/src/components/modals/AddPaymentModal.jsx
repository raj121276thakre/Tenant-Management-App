// frontend/src/components/modals/AddPaymentModal.jsx
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AppContext } from '../../App';

/**
 * AddPaymentModal (JSX + Bootstrap)
 * Props:
 *  - isOpen: bool
 *  - onClose: func
 *  - tenantId: string (optional)
 *  - tenantName: string (optional)
 *
 * Keeps the same fields and behavior as original TSX.
 */

export default function AddPaymentModal({ isOpen, onClose, tenantId, tenantName }) {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({
    amount: '',
    month: '',
    date: new Date().toISOString().split('T')[0],
    status: 'paid',
    mode: 'cash',
  });

  if (!context) return null;
  const { payments, setPayments } = context;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPayment = {
      id: Date.now().toString(),
      tenantId,
      tenantName,
      amount: parseFloat(formData.amount) || 0,
      month: formData.month,
      date: formData.date,
      status: formData.status,
      mode: formData.mode,
    };

    setPayments([...payments, newPayment]);
    onClose();

    // reset form
    setFormData({
      amount: '',
      month: '',
      date: new Date().toISOString().split('T')[0],
      status: 'paid',
      mode: 'cash',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Payment">
      <form onSubmit={handleSubmit}>
        {/* Amount */}
        <div className="mb-3">
          <Input
            label="Amount ($)"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            placeholder="1200"
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

        {/* Payment Mode */}
        <div className="mb-3">
          <label className="form-label mb-2">Payment Mode</label>
          <select
            value={formData.mode}
            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
            className="form-select"
          >
            <option value="cash">Cash</option>
            <option value="online">Online</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label mb-2">Status</label>
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
            Add Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
}

AddPaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tenantId: PropTypes.string,
  tenantName: PropTypes.string,
};
