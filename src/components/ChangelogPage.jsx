import React from 'react';

const changelog = [
  {
    version: '🆕 Version 1.2.0',
    date: 'June 2025',
    updates: [
      'Added News Carousel with live energy industry updates.',
      'Implemented multilingual support with i18next.',
      'UI polish with TailwindCSS gradients and layout improvements.',
    ],
  },
  {
    version: '⚙️ Version 1.1.0',
    date: 'May 2025',
    updates: [
      'Integrated anomaly dashboard launch functionality.',
      'Improved login and authentication flow.',
      'Added new external resource buttons (YouTube, policies, GEM wiki).',
    ],
  },
  {
    version: '🔧 Version 1.0.0',
    date: 'April 2025',
    updates: [
      'Initial dashboard release with user login, preview cards.',
    ],
  },
  {
    version: '🧪 Version 0.9.0',
    date: 'March 2025',
    updates: [
      'Implemented login with Firebase Auth.',
      'Basic anomaly detection model integration.',
    ],
  },
  {
    version: '📊 Version 0.8.0',
    date: 'February 2025',
    updates: [
      'Created dynamic analytics grid layout.',
      'Enabled email-based login/logout.',
    ],
  },
  {
    version: '🛠 Version 0.7.0',
    date: 'January 2025',
    updates: [
      'Basic dashboard UI with TailwindCSS.',
      'Added system health status mockup.',
      'Integrated simple routing with React Router.',
    ],
  },
  {
    version: '🚧 Version 0.6.0',
    date: 'December 2024',
    updates: [
      'Project skeleton setup with Vite + React.',
      'Initial Firebase integration.',
      'Created project roadmap and wireframes.',
    ],
  },
];

function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-10 text-center drop-shadow-sm">
          📜 Changelog
        </h1>
        <div className="relative border-l-4 border-green-400 pl-6 space-y-10">
          {changelog.map((log, index) => (
            <div key={index} className="relative group">
              <div className="absolute -left-[10px] top-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition" />
              <div className="bg-white shadow-md rounded-2xl p-6 border border-green-100">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-green-800">{log.version}</h2>
                  <span className="text-sm text-gray-500">{log.date}</span>
                </div>
                <ul className="list-disc ml-5 text-gray-700 space-y-1 text-sm">
                  {log.updates.map((update, i) => (
                    <li key={i}>{update}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChangelogPage;

