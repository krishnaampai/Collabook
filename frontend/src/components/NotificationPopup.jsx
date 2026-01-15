import React from "react";

const dummyNotifications = [
  {
    id: 1,
    text: "Anjali commented on your notebook 'CN Notes'",
    time: "2026-01-14 09:45 AM",
  },
  {
    id: 2,
    text: "Rahul rated your notebook 'Digital Logic' ⭐⭐⭐⭐",
    time: "2026-01-13 06:12 PM",
  },
  {
    id: 3,
    text: "Your notebook 'OS Handbook' was bookmarked",
    time: "2026-01-12 10:30 AM",
  },
];

const NotificationPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-400">Notifications</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {dummyNotifications.map((note) => (
            <div
              key={note.id}
              className="bg-neutral-800 border border-neutral-700 rounded-lg p-4"
            >
              <p className="text-sm">{note.text}</p>
              <p className="text-xs text-neutral-400 mt-1">{note.time}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NotificationPopup;
