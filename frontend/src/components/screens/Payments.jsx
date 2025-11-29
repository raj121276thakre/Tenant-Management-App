// frontend/src/pages/Payments.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Calendar, DollarSign } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function Payments() {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('paid');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ tenantId: '', amount: '', month: '', mode: 'cash' });

  if (!context) return null;

  const { payments, tenants, setPayments } = context;

  const filteredPayments = payments.filter((p) => p.status === activeTab);
  const paidTotal = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pendingTotal = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  const handleSubmit = () => {
    const tenant = tenants.find((t) => t.id === formData.tenantId);
    if (!tenant) return;

    const newPayment = {
      id: Date.now().toString(),
      tenantId: formData.tenantId,
      tenantName: tenant.name,
      amount: parseFloat(formData.amount) || 0,
      month: formData.month,
      date: new Date().toISOString().split('T')[0],
      status: 'paid',
      mode: formData.mode,
    };

    setPayments([...payments, newPayment]);
    setShowModal(false);
    setFormData({ tenantId: '', amount: '', month: '', mode: 'cash' });
  };

  return (
    <div className="min-vh-100 pb-5">
      <Header title="Payments" />

      <div className="p-4">
        <div className="row g-3 mb-3">
          <div className="col-6">
            <Card className="p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded p-2 bg-success bg-opacity-10"><DollarSign className="text-success" /></div>
                <div>
                  <small className="text-muted">Paid</small>
                  <div className="fw-bold">${paidTotal}</div>
                  <small className="text-muted">{payments.filter(p=>p.status==='paid').length} payments</small>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card className="p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded p-2 bg-warning bg-opacity-10"><DollarSign className="text-warning" /></div>
                <div>
                  <small className="text-muted">Pending</small>
                  <div className="fw-bold">${pendingTotal}</div>
                  <small className="text-muted">{payments.filter(p=>p.status==='pending').length} payments</small>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex gap-2 mb-3">
          <button onClick={() => setActiveTab('paid')} className={`btn btn-sm ${activeTab==='paid' ? 'btn-primary' : 'btn-outline-secondary'}`}>Paid</button>
          <button onClick={() => setActiveTab('pending')} className={`btn btn-sm ${activeTab==='pending' ? 'btn-primary' : 'btn-outline-secondary'}`}>Pending</button>
        </div>

        {/* Payments list */}
        <div>
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="mb-3 p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">{payment.tenantName}</div>
                  <small className="text-muted d-block">{payment.mode} • {payment.month}</small>
                </div>
                <div className="text-end">
                  <div className={`${payment.status==='paid' ? 'text-success' : 'text-warning'} fw-bold`}>${payment.amount}</div>
                  <Badge variant={payment.status === 'paid' ? 'success' : 'warning'} size="sm">{payment.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <button onClick={() => setShowModal(true)} className="btn btn-primary rounded-circle position-fixed" style={{ right: 16, bottom: 80, width: 56, height: 56 }}>
        <Plus size={22} />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Payment" footer={
        <div className="d-flex gap-2">
          <Button variant="outline" onClick={() => setShowModal(false)} fullWidth>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} fullWidth>Save</Button>
        </div>
      }>
        <div>
          <div className="mb-3">
            <label className="form-label">Tenant</label>
            <select className="form-select" value={formData.tenantId} onChange={(e)=>setFormData({...formData, tenantId: e.target.value})}>
              <option value="">Select tenant</option>
              {tenants.filter(t=>t.status==='active').map(t => <option key={t.id} value={t.id}>{t.name} - Room {t.roomNumber}</option>)}
            </select>
          </div>
          <Input label="Amount" type="number" value={formData.amount} onChange={(e)=>setFormData({...formData, amount: e.target.value})} />
          <Input label="Month" value={formData.month} onChange={(e)=>setFormData({...formData, month: e.target.value})} />
          <div className="mb-3">
            <label className="form-label">Mode</label>
            <select className="form-select" value={formData.mode} onChange={(e)=>setFormData({...formData, mode: e.target.value})}>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Payments.propTypes = {};
