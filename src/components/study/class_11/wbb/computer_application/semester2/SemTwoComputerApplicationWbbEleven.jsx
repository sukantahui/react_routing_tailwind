import React from "react";
import { Link } from "react-router-dom";

const SemTwoComputerApplicationWbbEleven = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-wide">
          📘 Chapters
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-300">
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem2/dsa">Data Structure</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem2/cn">Computer Network</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SemTwoComputerApplicationWbbEleven;
