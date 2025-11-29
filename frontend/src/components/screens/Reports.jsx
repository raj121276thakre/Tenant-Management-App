// frontend/src/pages/Reports.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, DollarSign, Users, Download } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const context = useContext(AppContext);

  if (!context) return null;

  const { payments, lightBills, rooms, tenants, setCurrentScreen } = context;

  const monthlyData = [
    { month: 'Jul', revenue: 3200, expenses: 800 },
    { month: 'Aug', revenue: 3800, expenses: 950 },
    { month: 'Sep', revenue: 4100, expenses: 1100 },
    { month: 'Oct', revenue: 3900, expenses: 1000 },
    { month: 'Nov', revenue: 4500, expenses: 1200 },
  ];

  const paidVsPending = [
    { name: 'Paid', value: payments.filter((p) => p.status === 'paid').length, color: '#10b981' },
    { name: 'Pending', value: payments.filter((p) => p.status === 'pending').length, color: '#f59e0b' },
  ];

  const occupancyData = [
    { month: 'Jul', occupied: 2, vacant: 4 },
    { month: 'Aug', occupied: 3, vacant: 3 },
    { month: 'Sep', occupied: 3, vacant: 3 },
    { month: 'Oct', occupied: 3, vacant: 3 },
    { month: 'Nov', occupied: 3, vacant: 3 },
  ];

  const totalRevenue = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalBills = lightBills.reduce((s, b) => s + b.amount, 0);
  const occupancyRate = Math.round((rooms.filter((r) => r.status === 'occupied').length / rooms.length) * 100);

  return (
    <div className="min-vh-100 bg-light">
      <Header
        title="Reports & Analytics"
        onBack={() => setCurrentScreen('dashboard')}
        actions={<Button variant="outline" size="sm" icon={<Download size={18} />}>Export</Button>}
      />

      <div className="p-4">
        <div className="row g-3 mb-3">
          <div className="col-6">
            <Card className="p-3">
              <div className="d-flex gap-3 align-items-center">
                <div className="p-2 bg-success bg-opacity-10 rounded"><DollarSign className="text-success" /></div>
                <div>
                  <small className="text-muted">Revenue</small>
                  <div className="fw-bold">${totalRevenue}</div>
                  <small className="text-muted">+12% this month</small>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card className="p-3">
              <div className="d-flex gap-3 align-items-center">
                <div className="p-2 bg-primary bg-opacity-10 rounded"><Users className="text-primary" /></div>
                <div>
                  <small className="text-muted">Occupancy</small>
                  <div className="fw-bold">{occupancyRate}%</div>
                  <small className="text-muted">{rooms.filter(r=>r.status==='occupied').length}/{rooms.length} rooms</small>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Charts */}
        <Card className="p-3 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Monthly Revenue</h6>
              <small className="text-muted">Revenue vs Expenses</small>
            </div>
            <TrendingUp className="text-success" />
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis dataKey="month" stroke="#6c757d" />
                <YAxis stroke="#6c757d" />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#0ea5a4" radius={[6,6,0,0]} />
                <Bar dataKey="expenses" fill="#f59e0b" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-3 mb-3">
          <h6>Payment Status</h6>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={paidVsPending} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5}>
                  {paidVsPending.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="d-flex justify-content-center gap-4 mt-3">
            {paidVsPending.map((p, i) => (
              <div key={i} className="d-flex gap-2 align-items-center">
                <div style={{ width: 10, height: 10, backgroundColor: p.color, borderRadius: 4 }} />
                <small className="text-muted">{p.name}: {p.value}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-3">
          <h6>Occupancy Trend</h6>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis dataKey="month" stroke="#6c757d" />
                <YAxis stroke="#6c757d" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="occupied" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="vacant" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

Reports.propTypes = {};
