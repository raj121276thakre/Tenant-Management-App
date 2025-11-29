// frontend/src/pages/Rooms.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Home, User, Grid3x3, List } from 'lucide-react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function Rooms() {
  const context = useContext(AppContext);
  const [viewMode, setViewMode] = useState('grid');

  if (!context) return null;

  const { rooms, setCurrentScreen, setSelectedTenantId } = context;

  const occupiedCount = rooms.filter((r) => r.status === 'occupied').length;
  const vacantCount = rooms.filter((r) => r.status === 'vacant').length;

  const handleRoomClick = (room) => {
    if (room.tenantId) {
      setSelectedTenantId(room.tenantId);
      setCurrentScreen('tenant-details');
    }
  };

  return (
    <div className="min-vh-100 pb-5">
      <Header
        title="Rooms"
        actions={
          <div className="d-flex gap-2">
            <button onClick={() => setViewMode('grid')} className={`btn btn-sm ${viewMode==='grid' ? 'btn-primary' : 'btn-outline-secondary'}`}><Grid3x3 size={16} /></button>
            <button onClick={() => setViewMode('list')} className={`btn btn-sm ${viewMode==='list' ? 'btn-primary' : 'btn-outline-secondary'}`}><List size={16} /></button>
          </div>
        }
      />

      <div className="p-4">
        <div className="row g-3 mb-3">
          <div className="col-4">
            <Card className="p-3 text-center">
              <div className="fw-bold">{rooms.length}</div>
              <small className="text-muted">Total</small>
            </Card>
          </div>
          <div className="col-4">
            <Card className="p-3 text-center">
              <div className="text-success fw-bold">{occupiedCount}</div>
              <small className="text-muted">Occupied</small>
            </Card>
          </div>
          <div className="col-4">
            <Card className="p-3 text-center">
              <div className="fw-bold">{vacantCount}</div>
              <small className="text-muted">Vacant</small>
            </Card>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="row g-3">
            {rooms.map((room) => (
              <div className="col-6 col-md-4 col-lg-3" key={room.id}>
                <Card className="p-3" onClick={() => handleRoomClick(room)}>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className={`rounded p-2 ${room.status==='occupied' ? 'bg-success bg-opacity-10' : 'bg-light'}`}><Home className={room.status==='occupied' ? 'text-success' : 'text-muted'} /></div>
                    <div>
                      <h6 className="mb-0">Room {room.roomNumber}</h6>
                      <small className="text-muted">{room.status}</small>
                    </div>
                  </div>
                  {room.status === 'occupied' ? (
                    <>
                      <div className="small text-muted">{room.tenantName}</div>
                      <div className="text-muted">${room.rentAmount}/mo</div>
                    </>
                  ) : (
                    <div className="text-muted small">Available</div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {rooms.map((room) => (
              <Card key={room.id} className="mb-3 p-3" onClick={() => handleRoomClick(room)}>
                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded p-2 ${room.status==='occupied' ? 'bg-success bg-opacity-10' : 'bg-light'}`}><Home /></div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0">Room {room.roomNumber}</h6>
                      <Badge variant={room.status === 'occupied' ? 'success' : 'default'} size="sm">{room.status}</Badge>
                    </div>
                    {room.status === 'occupied' ? (
                      <div className="small text-muted">{room.tenantName} • ${room.rentAmount}/mo</div>
                    ) : (
                      <div className="small text-muted">Available</div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Rooms.propTypes = {};
