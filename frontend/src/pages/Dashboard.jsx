import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createNotebook } from "../services/notebookServices";

import NotificationPopup from "../components/NotificationPopup";
import CreateNotebookPopup from "../components/CreateNotebookPopup";
import AppLayout from "../layouts/AppLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [myNotebooks, setMyNotebooks] = useState([]);
  const [openedNotebooks, setOpenedNotebooks] = useState([]);

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

  /* ---------- CREATE NOTEBOOK ---------- */
  const handleConfirmCreate = async () => {
    if (!newTitle.trim()) return;

    try {
      setIsCreating(true);
      await createNotebook(newTitle);
      setNewTitle("");
      setShowModal(false);
    } catch (err) {
      console.error("Create notebook failed:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AppLayout active="dashboard">

      {/* ---------- MODAL ---------- */}
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

      {/* ---------- PAGE HEADER ---------- */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold">
          Dashboard <span className="text-emerald-400">Overview</span>
        </h1>
        <p className="text-neutral-400 mt-2">
          Manage your notebooks and activity
        </p>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-2xl flex items-center justify-center text-4xl font-bold text-white transition transform hover:scale-105"
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
            <div key={book.id} onClick={() => navigate(`/notebook/${book.id}`)} className="min-w-60 bg-neutral-800 border border-neutral-700 rounded-xl p-5 hover:border-emerald-500 transition cursor-pointer">
              <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
              <p className="text-sm text-emerald-400">{book.topic}</p>
            </div>
          ))}
        </div>
      </section>

      {showNotifications && (
        <NotificationPopup onClose={() => setShowNotifications(false)} />
      )}

      {showCreate && (
        <CreateNotebookPopup onClose={() => setShowCreate(false)} />
      )}
    </AppLayout>
  );
};

export default Dashboard;
