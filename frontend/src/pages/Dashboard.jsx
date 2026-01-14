import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import NotificationPopup from "../components/NotificationPopup";
import CreateNotebookPopup from "../components/CreateNotebookPopup";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [myNotebooks, setMyNotebooks] = useState([]);
  const [openedNotebooks, setOpenedNotebooks] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  /* ---------- AUTH LISTENER ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  /* ---------- FIRESTORE LISTENERS ---------- */
  useEffect(() => {
    if (!user) return;

    // My notebooks
    const myQuery = query(
      collection(db, "notebooks"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribeMy = onSnapshot(myQuery, (snapshot) => {
      setMyNotebooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    // Saved notebooks
    const savedQuery = query(
      collection(db, "notebooks"),
      where("savedBy", "array-contains", user.uid)
    );

    const unsubscribeSaved = onSnapshot(savedQuery, (snapshot) => {
      setOpenedNotebooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsubscribeMy();
      unsubscribeSaved();
    };
  }, [user]);

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex">

      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="w-72 border-r border-neutral-800 p-6 flex flex-col items-center">

        {/* Profile */}
        <div className="flex flex-col items-center text-center mt-4">
          {user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-2 border-emerald-500 object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-neutral-800 border-2 border-emerald-500 flex items-center justify-center text-3xl font-bold text-emerald-400">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}

              <h2 className="mt-4 text-xl font-semibold">
                {user.displayName || "User"}
              </h2>

              <p className="text-sm text-neutral-400 mt-1">
                {user.email}
              </p>
            </>
          ) : (
            <>
              <div className="w-28 h-28 rounded-full bg-neutral-800 animate-pulse" />
              <div className="h-4 w-24 bg-neutral-800 rounded mt-4 animate-pulse" />
              <div className="h-3 w-32 bg-neutral-800 rounded mt-2 animate-pulse" />
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full mt-10">

          <button
            onClick={() => navigate("/profile")}
            className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Profile
          </button>

          <button
            onClick={() => setShowNotifications(true)}
            className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Notifications
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Explore
          </button>

          <button
            onClick={async () => {
              await auth.signOut();
              navigate("/login");
            }}
            className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition text-red-400"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ---------- MAIN DASHBOARD ---------- */}
      <main className="flex-1 p-10 relative">

        {/* Floating Create Button */}
        <button
          onClick={() => setShowCreate(true)}
          className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-2xl flex items-center justify-center text-4xl font-bold text-white transition transform hover:scale-105"
          title="Create Notebook"
        >
          +
        </button>

        {/* Saved */}
        <section className="mb-14">
          <h1 className="text-2xl font-bold mb-4">Saved Notebooks</h1>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {openedNotebooks.length === 0 && (
              <p className="text-neutral-500">No saved notebooks yet.</p>
            )}

            {openedNotebooks.map((book) => (
              <div
                key={book.id}
                className="min-w-60 bg-neutral-800 border border-neutral-700 rounded-xl p-5 hover:border-emerald-500 transition cursor-pointer"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {book.title}
                </h2>
                <p className="text-sm text-emerald-400">
                  {book.topic}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* My */}
        <section>
          <h1 className="text-2xl font-bold mb-4">My Notebooks</h1>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {myNotebooks.length === 0 && (
              <p className="text-neutral-500">You haven’t created any notebooks yet.</p>
            )}

            {myNotebooks.map((book) => (
              <div
                key={book.id}
                className="min-w-60 bg-neutral-800 border border-neutral-700 rounded-xl p-5 hover:border-emerald-500 transition cursor-pointer"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {book.title}
                </h2>
                <p className="text-sm text-emerald-400">
                  {book.topic}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ---------- POPUPS ---------- */}
      {showNotifications && (
        <NotificationPopup onClose={() => setShowNotifications(false)} />
      )}

      {showCreate && (
        <CreateNotebookPopup onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
};

export default Dashboard;
