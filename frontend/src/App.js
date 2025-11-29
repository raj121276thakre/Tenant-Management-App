// frontend/src/App.js
import React, { createContext, useState } from 'react';
import Login from './components/screens/Login';
import Dashboard from './components/screens/Dashboard';
import TenantsList from './components/screens/TenantsList';
import AddTenant from './components/screens/AddTenant';
import TenantDetails from './components/screens/TenantDetails';
import Rooms from './components/screens/Rooms';
import Payments from './components/screens/Payments';
import LightBills from './components/screens/LightBills';
import LeftTenants from './components/screens/LeftTenants';
import Reports from './components/screens/Reports';
import Settings from './components/screens/Settings';
import BottomNav from './components/layout/BottomNav';
import { AppSettingsProvider } from './contexts/AppContext';

// App-level context (same role as original TypeScript AppContext)
export const AppContext = createContext(null);

/**
 * App.js
 * - Plain JS (no TS)
 * - Single AppSettingsProvider wrapper
 * - Provides AppContext to screens/components
 */

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock data (kept from original)
  const [tenants, setTenants] = useState([
    {
      id: '1',
      name: 'John Smith',
      phone: '+1 234 567 8901',
      roomNumber: '101',
      rentAmount: 1200,
      deposit: 2400,
      startDate: '2024-01-01',
      status: 'active',
      rentStatus: 'paid',
      billStatus: 'paid',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1 234 567 8902',
      roomNumber: '102',
      rentAmount: 1500,
      deposit: 3000,
      startDate: '2024-02-15',
      status: 'active',
      rentStatus: 'pending',
      billStatus: 'pending',
    },
    {
      id: '3',
      name: 'Michael Brown',
      phone: '+1 234 567 8903',
      roomNumber: '103',
      rentAmount: 1300,
      deposit: 2600,
      startDate: '2024-03-01',
      status: 'active',
      rentStatus: 'paid',
      billStatus: 'pending',
    },
    {
      id: '4',
      name: 'Emily Davis',
      phone: '+1 234 567 8904',
      roomNumber: '104',
      rentAmount: 1400,
      deposit: 2800,
      startDate: '2023-12-01',
      endDate: '2024-11-15',
      status: 'left',
      rentStatus: 'paid',
      billStatus: 'paid',
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: '1',
      tenantId: '1',
      tenantName: 'John Smith',
      amount: 1200,
      month: 'November 2025',
      date: '2025-11-01',
      status: 'paid',
      mode: 'online',
    },
    {
      id: '2',
      tenantId: '2',
      tenantName: 'Sarah Johnson',
      amount: 1500,
      month: 'November 2025',
      date: '2025-11-01',
      status: 'pending',
      mode: 'cash',
    },
    {
      id: '3',
      tenantId: '3',
      tenantName: 'Michael Brown',
      amount: 1300,
      month: 'November 2025',
      date: '2025-11-05',
      status: 'paid',
      mode: 'online',
    },
  ]);

  const [lightBills, setLightBills] = useState([
    {
      id: '1',
      tenantId: '1',
      tenantName: 'John Smith',
      units: 150,
      amount: 180,
      month: 'November 2025',
      status: 'paid',
      date: '2025-11-10',
    },
    {
      id: '2',
      tenantId: '2',
      tenantName: 'Sarah Johnson',
      units: 200,
      amount: 240,
      month: 'November 2025',
      status: 'pending',
      date: '2025-11-10',
    },
    {
      id: '3',
      tenantId: '3',
      tenantName: 'Michael Brown',
      units: 175,
      amount: 210,
      month: 'November 2025',
      status: 'pending',
      date: '2025-11-10',
    },
  ]);

  const [rooms, setRooms] = useState([
    { id: '1', roomNumber: '101', status: 'occupied', tenantId: '1', tenantName: 'John Smith', rentAmount: 1200 },
    { id: '2', roomNumber: '102', status: 'occupied', tenantId: '2', tenantName: 'Sarah Johnson', rentAmount: 1500 },
    { id: '3', roomNumber: '103', status: 'occupied', tenantId: '3', tenantName: 'Michael Brown', rentAmount: 1300 },
    { id: '4', roomNumber: '104', status: 'vacant' },
    { id: '5', roomNumber: '105', status: 'vacant' },
    { id: '6', roomNumber: '106', status: 'vacant' },
  ]);

  // Context value provided to children
  const contextValue = {
    currentScreen,
    setCurrentScreen,
    selectedTenantId,
    setSelectedTenantId,
    isAuthenticated,
    setIsAuthenticated,
    tenants,
    setTenants,
    payments,
    setPayments,
    lightBills,
    setLightBills,
    rooms,
    setRooms,
  };

  // Picks which screen to render
  const renderScreen = () => {
    if (!isAuthenticated) return <Login />;

    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'tenants':
        return <TenantsList />;
      case 'add-tenant':
      case 'edit-tenant':
        return <AddTenant />;
      case 'tenant-details':
        return <TenantDetails />;
      case 'rooms':
        return <Rooms />;
      case 'payments':
        return <Payments />;
      case 'bills':
        return <LightBills />;
      case 'left-tenants':
        return <LeftTenants />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Show bottom nav for authenticated screens (same logic as original)
  const showBottomNav =
    isAuthenticated &&
    !['add-tenant', 'edit-tenant', 'tenant-details', 'left-tenants', 'reports', 'settings'].includes(currentScreen);

  return (
    <AppSettingsProvider>
      <AppContext.Provider value={contextValue}>
        <div className="min-vh-100 bg-light">
          {renderScreen()}
          {showBottomNav && <BottomNav />}
        </div>
      </AppContext.Provider>
    </AppSettingsProvider>
  );
}
