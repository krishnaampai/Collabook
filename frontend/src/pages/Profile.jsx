import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import AppLayout from "../layouts/AppLayout";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    qualification: "",
    bio: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  /* ---------- AUTH LISTENER ---------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* ---------- LOAD / CREATE PROFILE ---------- */
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setForm((prev) => ({ ...prev, ...snap.data() }));
        } else {
          await setDoc(ref, {
            name: user.displayName || "",
            email: user.email,
            phone: "",
            address: "",
            qualification: "",
            bio: "",
            createdAt: new Date()
          });
        }
      } catch (err) {
        console.error("Profile load failed:", err);
      }
    };

    loadProfile();
  }, [user]);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setMessage("");

      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, form);

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Failed to save profile ❌");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <AppLayout active="profile">

      {/* PAGE HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold">
          My <span className="text-emerald-400">Profile</span>
        </h1>
        <p className="text-neutral-400 mt-2">
          Manage your personal information
        </p>
      </div>

      {loading ? (
        <p className="text-neutral-400">Loading profile...</p>
      ) : (
        <div className="max-w-3xl bg-neutral-800 border border-neutral-700 rounded-2xl p-8 space-y-6">

          <div>
            <label className="block text-sm mb-1 text-neutral-300">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-neutral-300">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:outline-none focus:border-emerald-500"
            />
          </div>

          

          <div>
            <label className="block text-sm mb-1 text-neutral-300">Qualification</label>
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="Eg: B.Tech CSE, MSc..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-neutral-300">Short Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell something about yourself"
              rows="4"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {message && (
              <p className="text-sm text-emerald-400">{message}</p>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Profile;

