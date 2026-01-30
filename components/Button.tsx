import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  const variants = {
    primary: "bg-royal-600 hover:bg-royal-500 text-white shadow-lg shadow-royal-900/50 border border-transparent",
    secondary: "bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-900/50 border border-transparent",
    outline: "bg-transparent border border-royal-500/30 text-royal-400 hover:bg-royal-500/10 hover:border-royal-400 focus:ring-royal-500",
    ghost: "bg-transparent text-dark-muted hover:text-white hover:bg-white/5 focus:ring-slate-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;