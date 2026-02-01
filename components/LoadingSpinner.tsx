import React from 'react';

const LoadingSpinner: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
  // Changed z-50 to z-30 to stay BEHIND the header (z-40) but ABOVE content
  // Added bg-dark-bg/90 and backdrop-blur to look like a purposeful overlay, not a broken screen
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-dark-bg/90 backdrop-blur-sm z-30 flex items-center justify-center transition-opacity duration-300" 
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