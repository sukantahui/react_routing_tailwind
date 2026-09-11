// src/components/study/java-core/topics/003_001_string-immutability-and-string-constant-pool/Topic15.jsx

import React from "react";
import JavaProjectAnswerTemplate from "../../../JavaProjectAnswerTemplate";
import projectData from "./string-immutability-projects.json";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        `}
      </style>

      {/* ================= HEADER SECTION ================= */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_001 · Topic 15
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Hands-On Project Work (22 Projects)
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Core Java SE
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Project Work: String Immutability & String Constant Pool
        </h1>

        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Comprehensive real-world laboratory exercises and programming challenges applying String immutability,
          the String Constant Pool (SCP), dynamic interning, equality verification, security tokens,
          and robust text manipulation utilities in Java. Basic constructs such as loops, conditionals,
          methods, and arrays are utilized as helping structures throughout.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <div className="text-xs text-slate-500 font-medium">Projects</div>
            <div className="text-lg font-bold text-indigo-400">22 Practical Labs</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <div className="text-xs text-slate-500 font-medium">Core Focus</div>
            <div className="text-lg font-bold text-sky-400">SCP & Immutability</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <div className="text-xs text-slate-500 font-medium">Helping Items</div>
            <div className="text-lg font-bold text-emerald-400">Loops, Methods, Arrays</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <div className="text-xs text-slate-500 font-medium">Target Tool</div>
            <div className="text-lg font-bold text-amber-400">BlueJ / IDE Ready</div>
          </div>
        </div>
      </header>

      {/* ================= PROJECT WORK TEMPLATE ================= */}
      <JavaProjectAnswerTemplate data={projectData} />
    </div>
  );
}
