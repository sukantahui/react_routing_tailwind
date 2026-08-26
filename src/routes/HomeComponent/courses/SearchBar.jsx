// components/HomeComponent/SearchBar.jsx
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center mb-10">
      <input
        type="text"
        placeholder="🔍 Search for a course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-5 py-3 w-full md:w-1/2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-sky-400 focus:outline-none placeholder-gray-500 transition-all duration-300"
        aria-label="Search courses"
      /&gt;
    </div>
  );
};

export default SearchBar;