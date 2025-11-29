// frontend/src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple Card wrapper
 * - className added to card container
 */
export default function Card({ children, className = 'card', ...rest }) {
  // allow passing classes like 'p-3' or 'mb-3' etc.
  const classes = className.includes('card') ? className : `card ${className}`;
  return (
    <div className={classes} {...rest}>
      {/* If user already includes inner .card-body, respect that; otherwise wrap */}
      {typeof children === 'string' ? <div className="card-body">{children}</div> : children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
