import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

/* ⭐ STAR COMPONENT */
const Stars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <span key={i}>⭐</span>;
        if (i === fullStars && halfStar) return <span key={i}>⭐</span>;
        return <span key={i} className="opacity-30">⭐</span>;
      })}
    </div>
  );
};

/* 📘 NOTEBOOK DATA */
const dummyNotebooks = [
  { id: 1, title: "Computer Networks Notes", author: "Anjali S", date: "2024-10-05", topic: "Computer Science", rating: 4.5, reviews: 32 },
  { id: 2, title: "Digital Logic Design", author: "Rahul M", date: "2024-09-18", topic: "Electronics", rating: 4.0, reviews: 18 },
  { id: 3, title: "Operating Systems Handbook", author: "Meera K", date: "2024-11-02", topic: "Computer Science", rating: 4.8, reviews: 41 },
  { id: 4, title: "Engineering Mathematics – III", author: "Arjun P", date: "2024-08-12", topic: "Mathematics", rating: 3.9, reviews: 12 },
  { id: 5, title: "Signals and Systems", author: "Sneha R", date: "2024-10-22", topic: "Electronics", rating: 4.2, reviews: 27 },
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
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <AppLayout active="explore">

      {/* Top bar */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">
          Explore <span className="text-emerald-400">Notebooks</span>
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="max-w-5xl grid md:grid-cols-3 gap-4 mb-10">
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
          <option value="rating">Rating (Highest)</option>
        </select>
      </div>

      {/* Cards */}
      <div className="max-w-5xl grid md:grid-cols-2 gap-6">
        {filteredNotebooks.map((book) => (
          <div
            key={book.id}
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

    </AppLayout>
  );
};

export default Explore;

