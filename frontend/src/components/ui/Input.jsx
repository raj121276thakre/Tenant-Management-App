// frontend/src/components/ui/Input.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple Input atom
 * Props:
 *  - label: string (optional)
 *  - type: string
 *  - value, onChange, placeholder
 *  - className applied to the input
 *  - help: small helper text
 *  - error: string (shows invalid feedback)
 */
export default function Input({ label, type = 'text', value, onChange, placeholder, className = '', help, error, id, ...rest }) {
  return (
    <div className="mb-2">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input
        id={id}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {help && <div className="form-text">{help}</div>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  help: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
};
