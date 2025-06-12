import React from 'react';

function Loader() {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"></div>
      <span className="text-green-700">Opening Anomaly Dashboard...</span>
    </div>
  );
}

export default Loader;
