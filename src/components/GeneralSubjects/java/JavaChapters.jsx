import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const JavaChapters = () => {
  const javaChapters = [
    "Introduction to Java",
    "Data Types, Variables & Operators",
    "Control Statements",
    "Arrays",
    "Strings, StringBuffer & StringBuilder",
    "Object-Oriented Programming",
    "Constructors & Constructor Overloading",
    "Inheritance",
    "Polymorphism & Method Overloading/Overriding",
    "Interfaces & Abstract Classes",
    "Packages",
    "Exception Handling",
    "Multithreading",
    "File Handling",
    "Wrapper Classes",
    "Collections Framework",
    "Generics",
    "JDBC (Database Connectivity)",
    "Inner Classes",
    "Serialization & Deserialization",
    "I/O Streams",
    "Networking in Java",
    "Lambda Expressions",
    "Java 8 Features",
    "GUI / Applets (Optional)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Light Glow Background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_70%),radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.25),transparent_70%)]"></div>

      <div className="relative bg-gray-800/60 backdrop-blur-lg border border-gray-700 p-10 rounded-3xl shadow-2xl w-full max-w-4xl">

        <h2 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-wide text-center">
          📘 Java Chapters
        </h2>

        <div className="space-y-4">

          {javaChapters.map((chapter, index) => (
            <Link
              key={index}
              to={`/study/bca/java/chapter-${index + 1}`}
              className="flex items-center gap-4 bg-gray-900/60 p-5 rounded-2xl border border-gray-700 hover:border-blue-500 hover:bg-gray-900/80 transition shadow-md hover:shadow-blue-500/20 group"
            >
              <BookOpen className="w-9 h-9 text-blue-400 group-hover:scale-110 transition-transform" />
              
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-200 group-hover:text-blue-300">
                  {chapter}
                </span>
                <span className="text-gray-400 text-sm">
                  Chapter {index + 1}
                </span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
};

export default JavaChapters;
