import React from 'react';

const LoadingSpinner: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
  // Changed z-50 to z-30 to stay BEHIND the header (z-40) but ABOVE content
  // Added bg-dark-bg/90 and backdrop-blur to look like a purposeful overlay, not a broken screen
  // Added pointer-events-none to container if fullScreen, but pointer-events-auto to spinner if we wanted interaction (we don't)
  // Actually, if fullScreen is true, we usually WANT to block interaction while loading.
  // BUT if it gets stuck transparently, we want to click through.
  // Given we have a bg color, it's visible. If opacity transition leaves it there, pointer-events-none is safer.
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-dark-bg/90 backdrop-blur-sm z-30 flex items-center justify-center transition-opacity duration-300 pointer-events-none" 
    : "w-full py-20 flex items-center justify-center pointer-events-none";

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