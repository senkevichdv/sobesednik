import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'primary';
  size?: 'sm' | 'default';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    default: 'btn-outline',
    outline: 'btn-outline',
    primary: 'btn-primary'
  };
  const sizeClasses = {
    sm: 'btn-sm',
    default: 'btn-default'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};