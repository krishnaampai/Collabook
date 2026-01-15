import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AppLayout = ({ children, active = "" }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

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

        {/* Navigation */}
        <div className="flex flex-col gap-3 w-full mt-10">

          <button
            onClick={() => navigate("/dashboard")}
            className={`w-full py-2 rounded-lg transition ${
              active === "dashboard"
                ? "bg-emerald-600"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/explore")}
            className={`w-full py-2 rounded-lg transition ${
              active === "explore"
                ? "bg-emerald-600"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          >
            Profile
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

      {/* ---------- RIGHT CONTENT ---------- */}
      <main className="flex-1 px-10 py-16 relative">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
