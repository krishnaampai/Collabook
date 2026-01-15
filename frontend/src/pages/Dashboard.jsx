import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createNotebook } from "../services/notebookServices";

import NotificationPopup from "../components/NotificationPopup";

const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <span key={i}>⭐</span>;
        if (i === fullStars && halfStar) return <span key={i}>⭐</span>;
        return (
          <span key={i} className="opacity-30">⭐</span>
        );
      })}
    </div>
  );
};


const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [myNotebooks, setMyNotebooks] = useState([]);
  const [openedNotebooks, setOpenedNotebooks] = useState([]);
  
  // --- NEW STATE FOR MODAL ---
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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

  const handleConfirmCreate = async () => {
  if (!newTitle.trim()) return;

  try {
    setIsCreating(true);
    await createNotebook(newTitle.trim());
    setNewTitle("");
    setShowModal(false);
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setIsCreating(false);
  }
};


  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex relative">

      {/* --- MODAL CARD OVERLAY --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Create New Notebook</h2>
            <input 
              autoFocus
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 mb-6 focus:outline-none focus:border-emerald-500 transition"
              placeholder="Enter notebook title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmCreate}
                disabled={isCreating}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {isCreating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="w-72 border-r border-neutral-800 p-6 flex flex-col items-center">

        {/* Profile */}
        <div className="flex flex-col items-center text-center mt-4">
          {user ? (
            <>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-28 h-28 rounded-full border-2 border-emerald-500 object-cover" />
              ) : (
                <div className="w-28 h-28 rounded-full bg-neutral-800 border-2 border-emerald-500 flex items-center justify-center text-3xl font-bold text-emerald-400">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="mt-4 text-xl font-semibold">{user.displayName || "User"}</h2>
              <p className="text-sm text-neutral-400 mt-1">{user.email}</p>
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

        {/* Floating Button*/}
        <button
          onClick={() => setShowModal(true)}
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
              <div key={book.id} className="min-w-60 bg-neutral-800 border border-neutral-700 rounded-xl p-5 hover:border-emerald-500 transition cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-emerald-400">{book.topic}</p>
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
                onClick={() => navigate(`/notebook/${book.id}`)}
                className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:border-emerald-500 transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>

              <p className="text-neutral-400">Author: {book.author}</p>
              <p className="text-neutral-400">
                Published: {new Date(book.date).toDateString()}
              </p>

              <p className="text-sm text-emerald-400 mt-2">
                Topic: {book.topic}
              </p>

              <div className="flex items-center justify-between mt-3">
                <Stars rating={book.rating} />
                <span className="text-sm text-neutral-400">
                  {book.rating} • {book.reviews} ratings
                </span>
              </div>
              </div>
            ))}

          </div>
        </section>
      </main>

      {/* ---------- POPUPS ---------- */}
      {showNotifications && (
        <NotificationPopup onClose={() => setShowNotifications(false)} />
      )}

    </div>
  );
};

export default Dashboard;