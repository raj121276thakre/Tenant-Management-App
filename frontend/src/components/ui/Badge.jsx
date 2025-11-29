// frontend/src/components/ui/Badge.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge atom mapping variants to Bootstrap colors
 * variant: 'success'|'warning'|'info'|'secondary'|'default'
 */
export default function Badge({ children, variant = 'secondary', size = 'md', className = '', ...rest }) {
  const variantClass = variant === 'success' ? 'bg-success text-white'
    : variant === 'warning' ? 'bg-warning text-dark'
    : variant === 'info' ? 'bg-info text-dark'
    : variant === 'danger' ? 'bg-danger text-white'
    : 'bg-secondary text-white';

  const sizeClass = size === 'sm' ? 'py-1 px-2 small' : 'py-1 px-2';

  return (
    <span className={`badge ${variantClass} ${sizeClass} ${className}`} {...rest}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['success','warning','info','secondary','danger','default']),
  size: PropTypes.oneOf(['sm','md']),
  className: PropTypes.string,
};
