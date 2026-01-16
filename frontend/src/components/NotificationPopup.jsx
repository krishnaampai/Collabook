import React from "react";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";


const NotificationPopup = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-emerald-400">
            Notifications
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Notification list */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {notifications.length === 0 && (
            <p className="text-neutral-500 text-sm">
              No notifications yet.
            </p>
          )}

          {notifications.map((note) => (
            <div
              key={note.id}
              className="bg-neutral-800 border border-neutral-700 rounded-lg p-4"
            >
              <p className="text-sm">{note.text}</p>
              <p className="text-xs text-neutral-400 mt-1">
                {note.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NotificationPopup;
