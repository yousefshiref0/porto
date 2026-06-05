import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseClasses = 'font-bold uppercase tracking-wider border-4 border-primary transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-[#F8F5EC] hover:translate-x-1 hover:translate-y-1 shadow-[8px_8px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_#111111]',
    secondary: 'bg-[#F8F5EC] text-primary hover:translate-x-1 hover:translate-y-1 shadow-[8px_8px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_#111111]',
    accent: 'bg-[#FF6B35] text-[#F8F5EC] hover:translate-x-1 hover:translate-y-1 shadow-[8px_8px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_#111111]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
};
