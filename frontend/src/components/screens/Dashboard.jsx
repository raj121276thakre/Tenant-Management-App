// frontend/src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Users, Home, DollarSign, Zap, TrendingUp, Plus, CreditCard, FileText, Bell, Settings } from 'lucide-react';
import { AppContext } from '../../App';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Header from '../layout/Header';

export default function Dashboard() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { tenants, payments, lightBills, rooms, setCurrentScreen } = context;

  const activeTenants = tenants.filter((t) => t.status === 'active').length;
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
  const pendingRents = payments.filter((p) => p.status === 'pending').length;
  const pendingBills = lightBills.filter((b) => b.status === 'pending').length;
  const monthlyRevenue = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  const stats = [
    { label: 'Total Tenants', value: activeTenants, icon: Users, colorClass: 'bg-primary text-white', change: '+2 this month' },
    { label: 'Occupied Rooms', value: occupiedRooms, icon: Home, colorClass: 'bg-success text-white', change: `${occupiedRooms}/${rooms.length} rooms` },
    { label: 'Pending Rents', value: pendingRents, icon: DollarSign, colorClass: 'bg-warning text-white', change: 'Due this month' },
    { label: 'Pending Bills', value: pendingBills, icon: Zap, colorClass: 'bg-danger text-white', change: 'To be collected' },
    { label: 'Monthly Revenue', value: `$${monthlyRevenue}`, icon: TrendingUp, colorClass: 'bg-secondary text-white', change: '+12% from last month' },
  ];

  const quickActions = [
    { label: 'Add Tenant', icon: Users, onClick: () => setCurrentScreen('add-tenant'), colorClass: 'btn-primary' },
    { label: 'Add Payment', icon: CreditCard, onClick: () => setCurrentScreen('payments'), colorClass: 'btn-success' },
    { label: 'Add Bill', icon: FileText, onClick: () => setCurrentScreen('bills'), colorClass: 'btn-warning' },
  ];

  return (
    <div className="min-vh-100 pb-5">
      <Header
        title="Dashboard"
        showMenu
        actions={
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light position-relative p-2">
              <Bell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
            </button>
            <button onClick={() => setCurrentScreen('settings')} className="btn btn-light p-2">
              <Settings size={18} />
            </button>
          </div>
        }
      />

      <div className="p-4">
        {/* Welcome */}
        <div className="rounded-3 p-4 text-white mb-4" style={{ background: 'linear-gradient(90deg,#2563eb,#1e40af)' }}>
          <h5 className="mb-1">Welcome Back! 👋</h5>
          <p className="mb-0">Here's what's happening with your properties today</p>
        </div>

        {/* Stats */}
        <h6 className="mb-3">Overview</h6>
        <div className="row g-3 mb-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div className="col-12 col-sm-6 col-lg-4" key={i}>
                <Card className="p-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-muted">{s.label}</small>
                      <h5 className="mb-1">{s.value}</h5>
                      <small className="text-muted">{s.change}</small>
                    </div>
                    <div className={`rounded-3 d-flex align-items-center justify-content-center`} style={{ width: 48, height: 48 }}>
                      <div className={`${s.colorClass} d-flex align-items-center justify-content-center rounded-2`} style={{ width: 48, height: 48 }}>
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <h6 className="mb-3">Quick Actions</h6>
        <div className="row g-3 mb-4">
          {quickActions.map((a, i) => {
            const Icon = a.icon;
            return (
              <div className="col-12 col-sm-4" key={i}>
                <button onClick={a.onClick} className={`w-100 btn ${a.colorClass} text-white p-3 rounded-3 d-flex align-items-center gap-3`}>
                  <div className="bg-white bg-opacity-10 rounded me-2 p-2 d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="flex-grow-1 text-start">{a.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Recent Activity (kept simple) */}
        <h6 className="mb-3">Recent Activity</h6>
        <Card className="p-2">
          <div className="list-group list-group-flush">
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3 align-items-center">
                <div className="bg-success bg-opacity-10 rounded p-2"><DollarSign className="text-success" size={18} /></div>
                <div>
                  <div>Payment Received</div>
                  <small className="text-muted">John Smith - Room 101</small>
                </div>
              </div>
              <small className="text-muted">2h ago</small>
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3 align-items-center">
                <div className="bg-primary bg-opacity-10 rounded p-2"><Users className="text-primary" size={18} /></div>
                <div>
                  <div>New Tenant Added</div>
                  <small className="text-muted">Sarah Johnson - Room 102</small>
                </div>
              </div>
              <small className="text-muted">5h ago</small>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};
