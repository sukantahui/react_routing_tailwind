import React from "react";
import { Link } from "react-router-dom";

const ComputerApplicationWbbEleven = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-400 tracking-wide">
          📘 Semistar
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-300">
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem1">Semistar 1</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem2">Semistar 2</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem3">Semistar 3</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem4">Semistar 4</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem5">Semistar 5</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem6">Semistar 6</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem7">Semistar 7</Link>
          </li>
          <li className="hover:text-blue-400 transition duration-200 cursor-pointer">
            <Link to="/study/class11/wbb/computer-application/sem8">Semistar 8</Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default ComputerApplicationWbbEleven;
