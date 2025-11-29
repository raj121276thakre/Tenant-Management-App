// frontend/src/pages/AddTenant.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Save } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function AddTenant() {
  const context = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomNumber: '',
    rentAmount: '',
    deposit: '',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  if (!context) return null;

  const { setCurrentScreen, tenants, setTenants } = context;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTenant = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      roomNumber: formData.roomNumber,
      rentAmount: parseFloat(formData.rentAmount) || 0,
      deposit: parseFloat(formData.deposit) || 0,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      status: formData.status,
      rentStatus: 'pending',
      billStatus: 'pending',
    };

    setTenants([...tenants, newTenant]);
    setCurrentScreen('tenants');
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header title="Add Tenant" onBack={() => setCurrentScreen('tenants')} />

      <form onSubmit={handleSubmit} className="p-4">
        {/* Personal Information */}
        <Card className="mb-3 p-3">
          <h5 className="mb-3">Personal Information</h5>

          <Input
            label="Full Name"
            placeholder="Enter tenant name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 234 567 8900"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </Card>

        {/* Room Details */}
        <Card className="mb-3 p-3">
          <h5 className="mb-3">Room Details</h5>

          <Input
            label="Room Number"
            placeholder="101"
            value={formData.roomNumber}
            onChange={(e) => handleChange('roomNumber', e.target.value)}
            required
          />

          <Input
            label="Monthly Rent"
            type="number"
            placeholder="1200"
            value={formData.rentAmount}
            onChange={(e) => handleChange('rentAmount', e.target.value)}
            required
          />

          <Input
            label="Security Deposit"
            type="number"
            placeholder="2400"
            value={formData.deposit}
            onChange={(e) => handleChange('deposit', e.target.value)}
            required
          />
        </Card>

        {/* Duration */}
        <Card className="mb-3 p-3">
          <h5 className="mb-3">Tenancy Duration</h5>

          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            required
          />

          <Input
            label="End Date (Optional)"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
          />

          <div className="mt-3">
            <label className="form-label mb-2">Status</label>
            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => handleChange('status', 'active')}
                className={`flex-fill btn ${formData.status === 'active' ? 'btn-primary' : 'btn-outline-secondary'}`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => handleChange('status', 'left')}
                className={`flex-fill btn ${formData.status === 'left' ? 'btn-primary' : 'btn-outline-secondary'}`}
              >
                Left
              </button>
            </div>
          </div>
        </Card>

        {/* ID Proof Upload */}
        <Card className="mb-3 p-3">
          <h5 className="mb-3">ID Proof</h5>

          <label className="d-block border rounded p-3 text-center cursor-pointer">
            <Upload size={28} className="mb-2 text-muted" />
            <div className="text-muted">Upload ID Proof</div>
            <div className="small text-muted">Click to browse or drag and drop</div>
            <input type="file" className="d-none" accept="image/*,.pdf" />
          </label>
        </Card>

        {/* Submit */}
        <div className="d-flex gap-2">
          <Button type="button" variant="outline" onClick={() => setCurrentScreen('tenants')} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            <Save size={16} className="me-2" />
            Save Tenant
          </Button>
        </div>
      </form>
    </div>
  );
}

AddTenant.propTypes = {};
