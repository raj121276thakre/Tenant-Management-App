// frontend/src/pages/LeftTenants.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Calendar, Home } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function LeftTenants() {
  const context = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('all');

  if (!context) return null;

  const { tenants, payments, lightBills, setCurrentScreen } = context;
  const leftTenants = tenants.filter((t) => t.status === 'left');

  const filteredTenants = leftTenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tenant.roomNumber + '').includes(searchQuery);
    return matchesSearch;
  });

  const getTenantHistory = (tenantId) => {
    const tenantPayments = payments.filter((p) => p.tenantId === tenantId);
    const tenantBills = lightBills.filter((b) => b.tenantId === tenantId);

    return {
      totalPaid: tenantPayments.reduce((sum, p) => sum + p.amount, 0),
      totalPayments: tenantPayments.length,
      totalBills: tenantBills.length,
    };
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header title="Left Tenants" onBack={() => setCurrentScreen('dashboard')} />

      <div className="p-4">
        {/* Search */}
        <div className="mb-3 position-relative">
          <Search size={18} className="position-absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            className="form-control ps-5"
            placeholder="Search left tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="row g-3 mb-3">
          <div className="col-6">
            <Card className="p-3 text-center">
              <small className="text-muted">Total Left</small>
              <h5 className="mb-0">{leftTenants.length}</h5>
            </Card>
          </div>
          <div className="col-6">
            <Card className="p-3 text-center">
              <small className="text-muted">This Year</small>
              <h5 className="mb-0">{leftTenants.filter((t) => t.endDate && t.endDate.startsWith('2025')).length}</h5>
            </Card>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-3 d-flex gap-2 flex-wrap">
          {['all', '2025', '2024'].map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setFilterYear(y)}
              className={`btn btn-sm ${filterYear === y ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              {y === 'all' ? 'All Time' : y}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="list-group">
          {filteredTenants.map((tenant) => {
            const history = getTenantHistory(tenant.id);
            return (
              <Card key={tenant.id} className="mb-3 p-3">
                <div className="d-flex gap-3">
                  <div style={{ width: 48, height: 48 }} className="bg-secondary bg-opacity-10 rounded d-flex align-items-center justify-content-center">
                    <strong className="text-secondary">{tenant.name.split(' ').map((n) => n[0]).join('')}</strong>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-1">{tenant.name}</h6>
                      <Badge variant="default">Left</Badge>
                    </div>
                    <div className="text-muted small d-flex gap-3 align-items-center mb-2">
                      <Home size={14} /> <span>Room {tenant.roomNumber}</span>
                    </div>
                    <div className="text-muted small">
                      <Calendar size={14} />{' '}
                      <span>
                        {new Date(tenant.startDate).toLocaleDateString()} -{' '}
                        {tenant.endDate ? new Date(tenant.endDate).toLocaleDateString() : 'Present'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* History */}
                <div className="mt-3 border-top pt-3">
                  <h6 className="small text-muted">Payment History</h6>
                  <div className="row text-center">
                    <div className="col">
                      <div className="small text-muted">Total Paid</div>
                      <div className="fw-bold text-success">${history.totalPaid}</div>
                    </div>
                    <div className="col">
                      <div className="small text-muted">Payments</div>
                      <div className="fw-bold">{history.totalPayments}</div>
                    </div>
                    <div className="col">
                      <div className="small text-muted">Bills</div>
                      <div className="fw-bold">{history.totalBills}</div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

LeftTenants.propTypes = {};
