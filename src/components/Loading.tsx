import React from 'react';

interface LoadingProps {
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
  return (
    <div className={`loading ${className}`}>
      <div className="loading-dots">
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
      </div>
    </div>
  );
};
