import React from 'react';

function PreviewCard({ title, description }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition transform hover:-translate-y-1">
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default PreviewCard;
