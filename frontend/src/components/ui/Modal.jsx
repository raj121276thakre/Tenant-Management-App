// frontend/src/components/ui/Modal.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

/**
 * Lightweight Modal using Bootstrap markup.
 * - Renders into document.body via portal.
 * - Props: isOpen, onClose, title, children, footer (node)
 *
 * Usage:
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="Title" footer={<div>...</div>}>...</Modal>
 */
export default function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose && onClose();
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-backdrop show" onClick={onClose}></div>
      <div className="modal-dialog modal-dialog-centered" role="document" style={{ zIndex: 1055 }}>
        <div className="modal-content">
          {title && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
          )}
          <div className="modal-body">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
};
