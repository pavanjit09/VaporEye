import React, { useState } from 'react';

const TaskModal = ({ onClose, onSave, date }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = () => {
    if (taskText.trim()) {
      onSave(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="text-lg font-bold mb-2">Add Task for {date}</h3>
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          rows="4"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task details..."
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
