import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const NestBasketLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
  };

  return (
    <img
      src="./nestbasket-logo.jpg"
      alt="NestBasket Logo"
      className={`${sizeClasses[size]} object-cover shadow-md shadow-emerald-900/40 border border-emerald-500/30 select-none shrink-0 ${className}`}
    />
  );
};

export default NestBasketLogo;
