// frontend/src/pages/TenantDetails.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Phone, Home, DollarSign, Calendar, Zap, Edit, Upload } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AddPaymentModal from '../modals/AddPaymentModal';
import AddBillModal from '../modals/AddBillModal';
import UploadIdProofModal from '../modals/UploadIdProofModal';

export default function TenantDetails() {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('payments');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  if (!context) return null;

  const { selectedTenantId, tenants, payments, lightBills, setCurrentScreen, setTenants } = context;
  const tenant = tenants.find((t) => t.id === selectedTenantId);
  if (!tenant) return <div className="p-4">Tenant not found</div>;

  const tenantPayments = payments.filter((p) => p.tenantId === tenant.id);
  const tenantBills = lightBills.filter((b) => b.tenantId === tenant.id);

  // Fix #2 & #3: compute pending bill once and guard values
  const pendingBill = tenantBills.find((b) => b.status === 'pending');

  const handleEdit = () => setCurrentScreen('edit-tenant');

  const handleRemoveTenant = () => {
    // Fix #1: use window.confirm explicitly
    if (window.confirm('Are you sure you want to remove this tenant?')) {
      const updatedTenants = tenants.map((t) =>
        t.id === tenant.id ? { ...t, status: 'left', endDate: new Date().toISOString().split('T')[0] } : t
      );
      setTenants(updatedTenants);
      setCurrentScreen('tenants');
    }
  };

  const tabs = [
    { id: 'payments', label: 'Payments' },
    { id: 'pending', label: 'Pending' },
    { id: 'bills', label: 'Bills' },
    { id: 'documents', label: 'Documents' },
  ];

  // Safe initials (Fix #2)
  const initials = (tenant.name && tenant.name.trim().length > 0)
    ? tenant.name.split(' ').map((n) => n[0] || '').join('').toUpperCase()
    : 'TN';

  // Safe start date display (Fix #2)
  const startDateDisplay = tenant.startDate ? new Date(tenant.startDate).toLocaleDateString() : 'N/A';

  return (
    <div className="min-vh-100 bg-light">
      <Header
        title="Tenant Details"
        onBack={() => setCurrentScreen('tenants')}
        actions={
          <div className="d-flex align-items-center">
            <button onClick={handleEdit} className="btn btn-link p-0 me-2" aria-label="Edit tenant">
              <Edit size={18} />
            </button>
            <button onClick={handleRemoveTenant} className="btn btn-link text-danger p-0" aria-label="Remove tenant">
              Remove
            </button>
          </div>
        }
      />

      <div className="p-4">
        <Card className="p-3 mb-3">
          <div className="d-flex gap-3">
            <div
              className="rounded-3 bg-primary text-white d-flex align-items-center justify-content-center"
              style={{ width: 64, height: 64 }}
            >
              <strong>{initials}</strong>
            </div>
            <div className="flex-grow-1">
              <h5 className="mb-1">{tenant.name || 'Unknown'}</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Badge variant={tenant.status === 'active' ? 'success' : 'secondary'}>{tenant.status}</Badge>
                <Badge variant={tenant.rentStatus === 'paid' ? 'success' : 'warning'}>Rent {tenant.rentStatus}</Badge>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="d-flex gap-3 text-muted mb-1"><Phone size={16} />{tenant.phone || '-'}</div>
            <div className="d-flex gap-3 text-muted mb-1"><Home size={16} />Room {tenant.roomNumber || '-'}</div>
            <div className="d-flex gap-3 text-muted"><Calendar size={16} />Since {startDateDisplay}</div>
          </div>
        </Card>

        <div className="row g-3 mb-3">
          <div className="col-6">
            <Card className="p-3">
              <div className="small text-muted">Monthly Rent</div>
              <div className="fw-bold">${tenant.rentAmount ?? 0}</div>
              <small className="text-muted">Due: 1st of month</small>
            </Card>
          </div>
          <div className="col-6">
            <Card className="p-3">
              <div className="small text-muted">Current Bill</div>
              <div className="fw-bold">${(pendingBill && pendingBill.amount) || 0}</div>
              <small className="text-muted">{(pendingBill && pendingBill.units) || 0} units</small>
            </Card>
          </div>
        </div>

        <div className="d-grid gap-2 mb-3">
          <Button variant="primary" onClick={() => setShowPaymentModal(true)} icon={<DollarSign size={16} />}>Add Payment</Button>
          <Button variant="secondary" onClick={() => setShowBillModal(true)} icon={<Zap size={16} />}>Add Bill</Button>
          <Button variant="outline" onClick={() => setShowUploadModal(true)} icon={<Upload size={16} />}>Upload ID Proof</Button>
        </div>

        <div className="d-flex gap-2 overflow-auto mb-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`btn btn-sm ${activeTab === t.id ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'payments' && tenantPayments.filter((p) => p.status === 'paid').map((p) => (
            <Card key={p.id} className="mb-3 p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <div>{p.month}</div>
                  <small className="text-muted">{p.mode}</small>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-success">${p.amount}</div>
                  <Badge variant="success" size="sm">{p.status}</Badge>
                </div>
              </div>
              <div className="small text-muted">{p.date ? new Date(p.date).toLocaleDateString() : ''}</div>
            </Card>
          ))}

          {activeTab === 'pending' && tenantPayments.filter((p) => p.status === 'pending').map((p) => (
            <Card key={p.id} className="mb-3 p-3">
              <div className="d-flex justify-content-between">
                <div>{p.month}</div>
                <div className="fw-bold text-warning">${p.amount}</div>
              </div>
            </Card>
          ))}

          {activeTab === 'bills' && tenantBills.map((b) => (
            <Card key={b.id} className="mb-3 p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <div>{b.month}</div>
                  <small className="text-muted">{b.units} units</small>
                </div>
                <div className="text-end">
                  <div className={`${b.status === 'paid' ? 'text-success' : 'text-warning'} fw-bold`}>${b.amount}</div>
                  <Badge variant={b.status === 'paid' ? 'success' : 'warning'}>{b.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddPaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} tenantId={tenant.id} tenantName={tenant.name} />
      <AddBillModal isOpen={showBillModal} onClose={() => setShowBillModal(false)} tenantId={tenant.id} tenantName={tenant.name} />
      <UploadIdProofModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} onUpload={() => {}} />
    </div>
  );
}

TenantDetails.propTypes = {};
