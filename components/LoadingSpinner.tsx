import React from 'react';

const LoadingSpinner: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-dark-bg z-50 flex items-center justify-center" 
    : "w-full py-20 flex items-center justify-center";

  return (
    <div className={containerClass}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-royal-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-royal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;