import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Custom props can be added here
}

export const Input: React.FC<InputProps> = ({
  className = '',
  ...props
}) => {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  );
};