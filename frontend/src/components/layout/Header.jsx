// frontend/src/components/common/Header.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Menu, Bell } from 'lucide-react';

/**
 * Header (Bootstrap)
 * Props:
 *  - title: string
 *  - onBack: func (optional)
 *  - actions: node (optional)
 *  - showMenu: bool (optional)
 *  - onMenuClick: func (optional)
 *
 * Paste this file to: frontend/src/components/common/Header.jsx
 */

export default function Header({ title, onBack, actions, showMenu = false, onMenuClick }) {
  return (
    <header className="bg-white border-bottom sticky-top">
      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="btn btn-link p-0 text-secondary"
              aria-label="Back"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          {showMenu && (
            <button
              type="button"
              onClick={onMenuClick}
              className="btn btn-link p-0 text-secondary"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          )}

          <h1 className="h5 mb-0 text-dark">{title}</h1>
        </div>

        <div className="d-flex align-items-center gap-2">
          {actions}
          {/* keep a bell icon slot if actions doesn't include it (optional) */}
          {/* <button type="button" className="btn btn-link p-0 text-secondary"><Bell size={20} /></button> */}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  actions: PropTypes.node,
  showMenu: PropTypes.bool,
  onMenuClick: PropTypes.func,
};
