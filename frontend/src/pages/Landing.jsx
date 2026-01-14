import React from 'react'
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">

      {/* Minimal Navbar */}
      <nav className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-400">
            Collabook
          </h1>
          <button
  onClick={() => navigate("/login")}
  className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
>
  Login
</button>

        </div>
      </nav>

      {/* Hero Section (About) */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Collaborative Learning,
          <span className="text-emerald-400 block mt-2">Simplified</span>
        </h1>
        
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-4">
          A shared notebook platform where knowledge grows through collaboration
          and smart summaries.
        </p>
        
        <p className="text-neutral-400 max-w-2xl mx-auto mb-10">
          Create, share, and improve notebooks together with your peers. 
          Get AI-powered summaries and build knowledge as a community.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <button
  onClick={() => navigate("/login")}
  className="px-8 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all font-medium"
>
  Get Started
</button>

          <button className="px-8 py-3 border border-neutral-600 text-neutral-300 rounded-xl hover:border-emerald-500 hover:text-emerald-300 transition-all">
            Learn More
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-800/30">
        <div className="max-w-md mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            Contact
          </h2>
          <p className="text-neutral-400 text-center mb-8">
            Have feedback or ideas? Reach out.
          </p>

          <div className="space-y-4">
            <input
              placeholder="Your Email"
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            ></textarea>

            <button className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-neutral-800 border-t border-neutral-700 py-6 text-center text-sm text-neutral-500">
        © 2024 Collabook
      </footer>

    </div>
  );
};

export default Landing;