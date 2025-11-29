// frontend/src/pages/TenantsList.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Phone, Home } from 'lucide-react';
import { AppContext } from '../../App';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Header from '../layout/Header';

export default function TenantsList() {
  const context = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!context) return null;

  const { tenants, setCurrentScreen, setSelectedTenantId } = context;

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tenant.roomNumber + '').includes(searchQuery);

    if (filterStatus === 'all') return matchesSearch && tenant.status === 'active';
    if (filterStatus === 'paid') return matchesSearch && tenant.rentStatus === 'paid' && tenant.status === 'active';
    if (filterStatus === 'pending') return matchesSearch && tenant.rentStatus === 'pending' && tenant.status === 'active';
    if (filterStatus === 'left') return matchesSearch && tenant.status === 'left';

    return matchesSearch;
  });

  const handleTenantClick = (tenantId) => {
    setSelectedTenantId(tenantId);
    setCurrentScreen('tenant-details');
  };

  return (
    <div className="min-vh-100 pb-5">
      <Header title="Tenants" />

      <div className="p-4">
        <div className="mb-3 position-relative">
          <Search size={18} className="position-absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input className="form-control ps-5" placeholder="Search tenants or room number..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
        </div>

        <div className="d-flex gap-2 mb-3 flex-wrap">
          {['all','paid','pending','left'].map(status => (
            <button key={status} onClick={()=>setFilterStatus(status)} className={`btn btn-sm ${filterStatus===status ? 'btn-primary' : 'btn-outline-secondary'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-4">
            <Card className="p-3 text-center">
              <div className="fw-bold">{tenants.filter(t=>t.status==='active').length}</div>
              <small className="text-muted">Active</small>
            </Card>
          </div>
          <div className="col-4">
            <Card className="p-3 text-center">
              <div className="text-success fw-bold">{tenants.filter(t=>t.rentStatus==='paid' && t.status==='active').length}</div>
              <small className="text-muted">Paid</small>
            </Card>
          </div>
          <div className="col-4">
            <Card className="p-3 text-center">
              <div className="text-warning fw-bold">{tenants.filter(t=>t.rentStatus==='pending' && t.status==='active').length}</div>
              <small className="text-muted">Pending</small>
            </Card>
          </div>
        </div>

        <div>
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="mb-3 p-3" onClick={() => handleTenantClick(tenant.id)}>
              <div className="d-flex gap-3">
                <div className="rounded-3 bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                  <strong>{tenant.name.split(' ').map(n=>n[0]).join('')}</strong>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1 text-truncate">{tenant.name}</h6>
                    <div className="d-flex align-items-center gap-2 bg-light rounded px-2 py-1">
                      <Home size={14} />
                      <span className="small">{tenant.roomNumber}</span>
                    </div>
                  </div>
                  <div className="d-flex gap-2 text-muted small mb-2">
                    <Phone size={14} />
                    <span>{tenant.phone}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Badge variant={tenant.rentStatus==='paid' ? 'success' : 'warning'} size="sm">Rent: {tenant.rentStatus}</Badge>
                    <Badge variant={tenant.billStatus==='paid' ? 'success' : 'warning'} size="sm">Bill: {tenant.billStatus}</Badge>
                    {tenant.status === 'left' && <Badge variant="default" size="sm">Left</Badge>}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTenants.length === 0 && <div className="text-center py-5 text-muted">No tenants found</div>}
      </div>
    </div>
  );
}

TenantsList.propTypes = {};
