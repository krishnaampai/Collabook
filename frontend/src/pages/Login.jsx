import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">

      {/* Navbar (same style as Landing) */}
      <nav className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-emerald-400 cursor-pointer"
          >
            Collabook
          </h1>

          <button
            onClick={() => navigate("/explore")}
            className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Explore
          </button>
        </div>
      </nav>

      {/* Login Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome to <span className="text-emerald-400">Collabook</span>
          </h1>
          <p className="text-neutral-400 text-center mb-8">
            Login to continue collaborating
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
            />

            <button
  onClick={() => navigate("/dashboard")}
  className="w-full py-3 bg-emerald-500 rounded-lg font-semibold hover:bg-emerald-600 transition"
>
  Login
</button>

          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-neutral-700"></div>
            <span className="px-3 text-neutral-500 text-sm">OR</span>
            <div className="flex-grow border-t border-neutral-700"></div>
          </div>

          <button className="w-full py-3 flex items-center justify-center gap-3 border border-neutral-700 rounded-lg hover:border-emerald-500 hover:text-emerald-400 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-emerald-400 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>

        </div>
      </section>

      {/* Footer (same feel as Landing) */}
      <footer className="bg-neutral-800 border-t border-neutral-700 py-6 text-center text-sm text-neutral-500">
        © 2024 Collabook
      </footer>

    </div>
  );
};

export default Login;
