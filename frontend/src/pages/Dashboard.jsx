import React from "react";
import { useNavigate } from "react-router-dom";

/* Dummy data for UI */
const openedNotebooks = [
  { id: 1, title: "Computer Networks", topic: "CS" },
  { id: 2, title: "Operating Systems", topic: "CS" },
  { id: 3, title: "Digital Logic", topic: "EC" },
  { id: 4, title: "Signals & Systems", topic: "EC" },
];

const myNotebooks = [
  { id: 5, title: "KTU S5 CN Notes", topic: "CS" },
  { id: 6, title: "Microprocessors", topic: "EC" },
  { id: 7, title: "Engineering Maths III", topic: "Maths" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex">

      {/* ---------- LEFT SIDEBAR ---------- */}
      <aside className="w-72 border-r border-neutral-800 p-6 flex flex-col items-center">

        {/* Profile */}
        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-28 h-28 rounded-full bg-neutral-800 border-2 border-emerald-500 flex items-center justify-center text-3xl font-bold text-emerald-400">
            U
          </div>

          <h2 className="mt-4 text-xl font-semibold">Your Name</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Collaborative learner • CS student
          </p>
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
            onClick={() => navigate("/notifications")}
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

        </div>
      </aside>

      {/* ---------- MAIN DASHBOARD ---------- */}
      <main className="flex-1 p-10 relative">

        {/* Floating Create Button */}
        <button
          onClick={() => navigate("/create")}
          className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-2xl flex items-center justify-center text-4xl font-bold text-white transition transform hover:scale-105"
          title="Create Notebook"
        >
          +
        </button>

        {/* Opened Notebooks */}
        <section className="mb-14">
          <h1 className="text-2xl font-bold mb-4">
            Saved Notebooks
          </h1>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-700">
            {openedNotebooks.map((book) => (
              <div
                key={book.id}
                className="min-w-[240px] bg-neutral-800 border border-neutral-700 rounded-xl p-5 hover:border-emerald-500 transition cursor-pointer"
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

        {/* My Notebooks */}
        <section>
          <h1 className="text-2xl font-bold mb-4">
            My Notebooks
          </h1>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-700">
            {myNotebooks.map((book) => (
              <div
                key={book.id}
                className="min-w-[240px] bg-neutral-800 border border-neutral-700 rounded-xl p-5 hover:border-emerald-500 transition cursor-pointer"
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
    </div>
  );
};

export default Dashboard;
