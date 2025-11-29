// frontend/src/pages/LightBills.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Zap, Calendar } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function LightBills() {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('thisMonth');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ tenantId: '', units: '', amount: '', month: '' });

  if (!context) return null;

  const { lightBills, tenants, setLightBills } = context;

  const thisMonthBills = lightBills.filter((b) => b.month === 'November 2025');
  const pendingBills = lightBills.filter((b) => b.status === 'pending');
  const paidBills = lightBills.filter((b) => b.status === 'paid');

  const getFilteredBills = () => {
    switch (activeTab) {
      case 'thisMonth':
        return thisMonthBills;
      case 'pending':
        return pendingBills;
      case 'paid':
        return paidBills;
      default:
        return lightBills;
    }
  };

  const filteredBills = getFilteredBills();
  const totalUnits = filteredBills.reduce((s, b) => s + (b.units || 0), 0);
  const totalAmount = filteredBills.reduce((s, b) => s + (b.amount || 0), 0);

  const handleSubmit = () => {
    const tenant = tenants.find((t) => t.id === formData.tenantId);
    if (!tenant) return;

    const newBill = {
      id: Date.now().toString(),
      tenantId: formData.tenantId,
      tenantName: tenant.name,
      units: parseInt(formData.units) || 0,
      amount: parseFloat(formData.amount) || 0,
      month: formData.month,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setLightBills([...lightBills, newBill]);
    setShowModal(false);
    setFormData({ tenantId: '', units: '', amount: '', month: '' });
  };

  return (
    <div className="min-vh-100 pb-5">
      <Header title="Light Bills" />

      <div className="p-4">
        {/* Summary */}
        <div className="row g-3 mb-3">
          <div className="col-6">
            <Card className="p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 rounded p-2"><Zap className="text-warning" /></div>
                <div>
                  <small className="text-muted">Total Units</small>
                  <div className="fw-bold">{totalUnits}</div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card className="p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-secondary bg-opacity-10 rounded p-2"><Zap className="text-secondary" /></div>
                <div>
                  <small className="text-muted">Total Amount</small>
                  <div className="fw-bold">${totalAmount}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex gap-2 mb-3 overflow-auto">
          <button onClick={() => setActiveTab('thisMonth')} className={`btn btn-sm ${activeTab === 'thisMonth' ? 'btn-primary' : 'btn-outline-secondary'}`}>This Month</button>
          <button onClick={() => setActiveTab('pending')} className={`btn btn-sm ${activeTab === 'pending' ? 'btn-primary' : 'btn-outline-secondary'}`}>Pending</button>
          <button onClick={() => setActiveTab('paid')} className={`btn btn-sm ${activeTab === 'paid' ? 'btn-primary' : 'btn-outline-secondary'}`}>Paid</button>
        </div>

        {/* Bills List */}
        <div className="mb-3">
          {filteredBills.map((bill) => (
            <Card key={bill.id} className="mb-3 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-3">
                  <div className={`rounded p-2 ${bill.status === 'paid' ? 'bg-success bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
                    <Zap className={bill.status === 'paid' ? 'text-success' : 'text-warning'} />
                  </div>
                  <div>
                    <div className="fw-semibold">{bill.tenantName}</div>
                    <div className="small text-muted"><Calendar size={12} /> {bill.month}</div>
                    <div className="mt-1"><Badge variant="info">{bill.units} units</Badge></div>
                  </div>
                </div>
                <div className="text-end">
                  <div className={`${bill.status === 'paid' ? 'text-success' : 'text-warning'} fw-bold`}>${bill.amount}</div>
                  <Badge variant={bill.status === 'paid' ? 'success' : 'warning'}>{bill.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredBills.length === 0 && (
          <Card className="text-center p-4">
            <Zap size={32} className="text-muted mb-2" />
            <div className="text-muted">No bills found</div>
          </Card>
        )}
      </div>

      {/* Add button */}
      <button onClick={() => setShowModal(true)} className="btn btn-warning rounded-circle position-fixed" style={{ right: 16, bottom: 80, width: 56, height: 56 }}>
        <Plus size={22} />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Light Bill" footer={
        <div className="d-flex gap-2">
          <Button variant="outline" onClick={() => setShowModal(false)} fullWidth>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} fullWidth>Save</Button>
        </div>
      }>
        <div>
          <div className="mb-3">
            <label className="form-label">Tenant</label>
            <select className="form-select" value={formData.tenantId} onChange={(e) => setFormData({...formData, tenantId: e.target.value})}>
              <option value="">Select tenant</option>
              {tenants.filter(t=>t.status==='active').map(t => <option key={t.id} value={t.id}>{t.name} - Room {t.roomNumber}</option>)}
            </select>
          </div>

          <Input label="Units Consumed" type="number" value={formData.units} onChange={(e)=>setFormData({...formData, units: e.target.value})} />
          <Input label="Amount" type="number" value={formData.amount} onChange={(e)=>setFormData({...formData, amount: e.target.value})} />
          <Input label="Month" value={formData.month} onChange={(e)=>setFormData({...formData, month: e.target.value})} />
        </div>
      </Modal>
    </div>
  );
}

LightBills.propTypes = {};
