// ... imports remain unchanged
import React, { useState, useEffect, useRef } from 'react'; 
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import PreviewCard from './PreviewCard';
import Loader from './Loader';
import LanguageSelector from './LanguageSelector';
import PowerPlantInfo from './PowerPlantInfo';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [lastLogin, setLastLogin] = useState('');
  const [systemHealth, setSystemHealth] = useState('OK');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [showLoader, setShowLoader] = useState(false);
  const [role, setRole] = useState('admin');
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const scrollRef = useRef(null);

  const isGuest = location.state?.isGuest;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
        setLastLogin(u.metadata.lastSignInTime);
      } else if (!isGuest) {
        navigate('/');
      }
    });

    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, [navigate, isGuest]);

  const handleLogout = async () => {
    if (!isGuest) await signOut(auth);
    navigate('/');
  };

  const handleOpenAnomalyDashboard = () => {
    setShowLoader(true);
    setTimeout(() => {
      window.open('https://boiler-room-maintenance.streamlit.app/', '_blank');
      setShowLoader(false);
    }, 1500);
  };

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const saveTask = () => {
    if (newTask.trim()) {
      setTasks(prev => ({
        ...prev,
        [date.toDateString()]: [...(prev[date.toDateString()] || []), newTask.trim()]
      }));
      setNewTask('');
      setShowTaskModal(false);
    }
  };

  const getTileClassName = ({ date: tileDate }) => {
    const today = new Date();
    const isToday =
      tileDate.getDate() === today.getDate() &&
      tileDate.getMonth() === today.getMonth() &&
      tileDate.getFullYear() === today.getFullYear();

    if (isToday) return 'bg-yellow-300 rounded-full';
    if (tasks[tileDate.toDateString()]) return 'bg-green-400 rounded-full';

    return '';
  };

  const upcomingTasks = Object.entries(tasks)
    .filter(([taskDate]) => new Date(taskDate) >= new Date())
    .sort(([a], [b]) => new Date(a) - new Date(b));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-green-700 text-white flex justify-between items-center p-4">
        <h1 className="text-xl font-extrabold italic">{t('app_name')}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <NotificationBell />
          <button
            onClick={() => setRole(role === 'admin' ? 'client' : 'admin')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
          >
            {role === 'admin' ? t('switch_to_client') : t('switch_to_admin')}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {t('welcome')}, {user?.email || t('guest')}!
            </h2>
            {user && <p className="text-gray-600 mb-1">{t('last_login')}: {lastLogin}</p>}
            <p className="text-gray-600 mb-1">{t('system_health')}: {systemHealth}</p>
            <p className="text-gray-600 mb-1">{t('next_maintenance_due')}</p>
            <p className="text-gray-600">{t('current_time')}: {currentTime}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {role === 'admin' && (
              <>
                <button onClick={handleOpenAnomalyDashboard} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  {t('btn_anomaly_dashboard')}
                </button>
                <button onClick={() => window.open('https://github.com/pavanjit09/boiler-room-maintenance', '_blank')} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                  {t('btn_documentation')}
                </button>
                <button onClick={() => window.location.href = 'mailto:pavanjitsubash802@gmail.com'} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  {t('btn_contact')}
                </button>
              </>
            )}
            <button onClick={() => window.open('https://www.gem.wiki/Kozhikode_Diesel_power_station', '_blank')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              {t('gem_wiki')}
            </button>
            <button onClick={() => window.open('https://www.youtube.com/watch?v=fk3DjD9gSsk', '_blank')} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
              {t('watch_boiler')}
            </button>
            <button onClick={() => window.open('https://www.iea.org/policies?country%5B0%5D=India', '_blank')} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
              {t('latest_policies')}
            </button>
          </div>

          {showLoader && <Loader />}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <PreviewCard title={t('card_dashboard_title')} description={t('card_dashboard_desc')} />
          <PreviewCard title={t('card_root_cause_title')} description={t('card_root_cause_desc')} />
        </div>
      </div>

      {/* Scheduler Section */}
      {role === 'admin' ? (
        <div className="bg-white p-6 mt-4 mx-4 md:mx-6 rounded shadow">
          <h3 className="text-2xl font-bold text-green-800 mb-4">{t('maintenance_scheduler')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scheduler Box */}
            <div className="bg-green-50 p-4 rounded-lg shadow border border-green-200">
              <Calendar
                onChange={setDate}
                value={date}
                tileClassName={getTileClassName}
              />
              <button
                onClick={handleAddTask}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {t('add_task')}
              </button>
              <div className="mt-4">
                <h4 className="font-semibold text-green-800">{t('tasks_for')}: {date.toDateString()}</h4>
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {(tasks[date.toDateString()] || []).map((tText, idx) => (
                    <li key={idx}>{tText}</li>
                  ))}
                </ul>
                {!(tasks[date.toDateString()] || []).length && (
                  <p className="text-gray-500 text-sm">{t('no_upcoming_tasks')}</p>
                )}
              </div>
            </div>

            {/* Upcoming Tasks Box */}
            <div className="bg-green-50 p-4 rounded-lg shadow border border-green-200 h-fit">
              <h3 className="text-xl font-bold text-green-800 mb-3">{t('upcoming_maintenance_tasks')}</h3>
              {upcomingTasks.length > 0 ? (
                <ul className="text-sm list-disc ml-4">
                  {upcomingTasks.map(([dateStr, taskList], idx) => (
                    <li key={idx}>
                      <strong>{dateStr}:</strong> {taskList.join(', ')}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">{t('no_upcoming_tasks')}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PowerPlantInfo />
      )}

      {/* Footer */}
      <footer className="bg-green-800 text-white p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="space-x-4">
          <a href="/faq" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('faq')}</a>
          <a href="mailto:support@yourcompany.com" className="hover:underline">{t('support')}</a>
          <a href="https://twitter.com/vapor_eye" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('twitter')}</a>
          <a href="/changelog" target="_blank" rel="noopener noreferrer" className="hover:underline">{t('changelog')}</a>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 mt-2 md:mt-0">
          {t('logout')}
        </button>
      </footer>

      <div className="text-center text-xs p-2 text-gray-500 hover:text-green-600 transition cursor-pointer">
        💡 {t('did_you_know')}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-2">{t('add_task_for', { date: date.toDateString() })}</h2>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={t('enter_task_description')}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowTaskModal(false)} className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
                {t('cancel')}
              </button>
              <button onClick={saveTask} className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600">
                {t('add')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;











