import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-neutral-800 border-b border-neutral-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-emerald-400 cursor-pointer"
        >
          Collabook
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!user ? (
            /* BEFORE LOGIN */
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Login
            </button>
          ) : (
            /* AFTER LOGIN */
            <>
              <button
                onClick={() => navigate("/explore")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Explore
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-300 rounded-lg hover:text-white cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
