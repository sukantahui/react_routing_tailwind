// src/components/study/icse-java-x/topics/003_001_array-2d-concepts/Topic6.jsx

import React from "react";
import JavaProjectAnswerTemplate from "../../../JavaProjectAnswerTemplate";
import testData from "./topic6_files/array-2d-output-tests.json";

export default function Topic6() {
  return (
    <div className="space-y-12">
      {/* ================= TOPIC HEADER ================= */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Comprehensive Output Test
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          2D Array Output Prediction & Dry Run Tests
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-5xl leading-relaxed">
          Master ICSE Class X Section A dry run and output prediction questions. Test your tracing skills across 
          <b> 50 curated problems</b> covering 2D array declarations, row/column traversals, diagonal operations, matrix addition, 
          and board patterns.
        </p>
      </header>

      {/* ================= PROJECT ANSWER TEMPLATE (50 TESTS) ================= */}
      <JavaProjectAnswerTemplate data={testData} />
    </div>
  );
}
