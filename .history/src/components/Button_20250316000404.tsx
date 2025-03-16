import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', safg
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out';
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};