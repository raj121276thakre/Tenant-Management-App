// frontend/src/components/ui/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Bootstrap-friendly Button atom
 * Props:
 *  - variant: 'primary'|'secondary'|'outline'|'danger'|'link'
 *  - size: 'sm'|'md'|'lg'
 *  - fullWidth: bool
 *  - icon: React node (optional) — shown left of children
 *  - className: extra classes
 */
export default function Button({ variant = 'primary', size = 'md', fullWidth, icon, children, className = '', ...rest }) {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const variantClass = variant === 'outline' ? 'btn-outline-primary' :
    variant === 'secondary' ? 'btn-secondary' :
    variant === 'danger' ? 'btn-danger' :
    variant === 'link' ? 'btn-link' : 'btn-primary';

  return (
    <button
      className={`${variantClass} ${sizeClass} ${fullWidth ? 'w-100' : ''} d-inline-flex align-items-center justify-content-center ${className}`}
      {...rest}
    >
      {icon && <span className="me-2 d-inline-flex align-items-center">{icon}</span>}
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary','secondary','outline','danger','link']),
  size: PropTypes.oneOf(['sm','md','lg']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};
