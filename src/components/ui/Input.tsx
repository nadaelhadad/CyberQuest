import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'font-terminal bg-cyber-dark border-2 rounded px-3 py-2 focus:outline-none focus:ring-2 transition-all';
  const normalStyles = 'border-cyber-gray focus:border-cyber-blue-100 focus:ring-cyber-blue-100 focus:ring-opacity-50 text-white';
  const errorStyles = 'border-cyber-red focus:border-cyber-red focus:ring-cyber-red';
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label className="block text-white mb-1 font-cyber text-sm">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${error ? errorStyles : normalStyles} ${widthStyle} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-cyber-red text-xs">{error}</p>
      )}
    </div>
  );
};

export default Input;