import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  name?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  name,
  required = false,
  multiline = false,
  rows = 4,
}) => {
  const baseClasses = 'w-full px-4 py-3 border-4 border-primary bg-white text-primary placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-[#FF6B35] transition-all';

  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${className}`}
        name={name}
        required={required}
        rows={rows}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
      name={name}
      required={required}
    />
  );
};
