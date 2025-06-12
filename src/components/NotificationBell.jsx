import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function NotificationBell() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    { id: 1, text: t('notifications.items.system_ok') },
    { id: 2, text: t('notifications.items.check_pressure') },
    { id: 3, text: t('notifications.items.dummy') },
  ];

  const [read, setRead] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const markAsRead = () => setRead(true);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative">
        <Bell className="h-6 w-6" />
        {!read && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 p-4">
          <h4 className="font-bold mb-2 text-gray-800">{t('notifications.title')}</h4>
          {read ? (
            <p className="text-sm text-gray-600">{t('notifications.no_new')}</p>
          ) : (
            <ul className="max-h-40 overflow-y-auto">
              {notifications.map((notif) => (
                <li key={notif.id} className="text-sm mb-1 text-gray-700">
                  {notif.text}
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={markAsRead}
              className="text-blue-500 hover:underline text-xs"
            >
              {t('notifications.mark_all')}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:underline text-xs"
            >
              {t('notifications.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;



