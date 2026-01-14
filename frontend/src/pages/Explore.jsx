import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyNotebooks = [
  { id: 1, title: "Computer Networks Notes", author: "Anjali S", date: "2024-10-05", topic: "Computer Science" },
  { id: 2, title: "Digital Logic Design", author: "Rahul M", date: "2024-09-18", topic: "Electronics" },
  { id: 3, title: "Operating Systems Handbook", author: "Meera K", date: "2024-11-02", topic: "Computer Science" },
  { id: 4, title: "Engineering Mathematics – III", author: "Arjun P", date: "2024-08-12", topic: "Mathematics" },
  { id: 5, title: "Signals and Systems", author: "Sneha R", date: "2024-10-22", topic: "Electronics" },
];

const Explore = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [sort, setSort] = useState("none");

  const filteredNotebooks = dummyNotebooks
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.topic.toLowerCase().includes(search.toLowerCase());
      const matchesTopic = topic === "All" || book.topic === topic;
      return matchesSearch && matchesTopic;
    })
    .sort((a, b) => {
      if (sort === "author") return a.author.localeCompare(b.author);
      if (sort === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

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
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Explore Section */}
      <section className="flex-1 px-6 py-16">

        <h1 className="text-3xl font-bold text-center mb-8">
          Explore <span className="text-emerald-400">Notebooks</span>
        </h1>

        {/* Filters */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 mb-10">
          <input
            placeholder="Search by notebook name or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
          />

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="p-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
          >
            <option>All</option>
            <option>Computer Science</option>
            <option>Electronics</option>
            <option>Mathematics</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-emerald-500"
          >
            <option value="none">Sort by</option>
            <option value="date">Date (Newest)</option>
            <option value="author">Author (A–Z)</option>
          </select>
        </div>

        {/* Notebook Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {filteredNotebooks.map((book) => (
            <div
              key={book.id}
              className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:border-emerald-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-neutral-400">Author: {book.author}</p>
              <p className="text-neutral-400">
                Published: {new Date(book.date).toDateString()}
              </p>
              <p className="text-sm text-emerald-400 mt-2">
                Topic: {book.topic}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 border-t border-neutral-700 py-6 text-center text-sm text-neutral-500">
        © 2024 Collabook
      </footer>

    </div>
  );
};

export default Explore;
