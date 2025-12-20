import React from 'react';

const Badge = ({ iconClass = 'bi-award', children, className = '' }) => {
  return (
    <span className={`inline-block bg-yellow-400 px-4 py-2 rounded-full ${className}`}>
      <i className={`bi ${iconClass}`}></i>
      <span className="font-medium ml-2">{children}</span>
    </span>
  );
};

export default Badge;
