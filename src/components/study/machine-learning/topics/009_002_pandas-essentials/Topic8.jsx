import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic8_files/01_loc_label_based_indexing.py?raw";
import pyCode2 from "./topic8_files/02_iloc_integer_positional_indexing.py?raw";
import pyCode3 from "./topic8_files/03_loc_vs_iloc_slicing_comparison.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_loc_label_based_indexing.py",
    title: "1. Label-Based Access (df.loc[])",
    badge: "loc[] Labels",
    code: pyCode1,
    summary: "Accesses rows/cells via explicit string/integer labels, demonstrates endpoint-inclusive slicing, and conditional filtering.",
  },
  {
    id: "part2",
    fileName: "02_iloc_integer_positional_indexing.py",
    title: "2. Positional Access (df.iloc[])",
    badge: "iloc[] Offsets",
    code: pyCode2,
    summary: "Selects rows/columns by 0-based memory coordinates, endpoint-exclusive slices (0:2), and negative indexing (iloc[-1, -1]).",
  },
  {
    id: "part3",
    fileName: "03_loc_vs_iloc_slicing_comparison.py",
    title: "3. loc vs iloc on Integer Indices",
    badge: "loc vs iloc Traps",
    code: pyCode3,
    summary: "Resolves label vs position confusion on non-sequential integer indices and avoids SettingWithCopyWarning in ML pipelines.",
  },
];

const STUDENTS = [
  { label: "BP_101", pos: 0, name: "Debangshu", city: "Barrackpore", math: 85, sci: 90 },
  { label: "BP_102", pos: 1, name: "Susmita",   city: "Shyamnagar",  math: 92, sci: 95 },
  { label: "BP_103", pos: 2, name: "Swadeep",   city: "Ichapur",      math: 65, sci: 70 },
  { label: "BP_104", pos: 3, name: "Tuhina",    city: "Naihati",      math: 88, sci: 85 },
];

const Topic8 = () => {
  const [activeTab, setActiveTab] = useState("indexer_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [indexerType, setIndexerType] = useState("loc"); // "loc", "iloc"
  const [selectedRow, setSelectedRow] = useState(1); // 0..3
  const [selectedCol, setSelectedCol] = useState("math"); // "name", "city", "math", "sci"

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const colPosMap = { name: 0, city: 1, math: 2, sci: 3 };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-teal-900/60 via-slate-900 to-indigo-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Module 009_002 • Pandas Essentials
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/40">
                Topic 8 • Row Indexing
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Selecting Rows with loc[] and iloc[]
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master the exact differences between Label-Based <code className="text-teal-300 font-mono">df.loc[]</code> (endpoint inclusive) and Integer-Positional <code className="text-cyan-300 font-mono">df.iloc[]</code> (endpoint exclusive), avoiding SettingWithCopyWarning during ML feature updates.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "indexer_studio", label: "Interactive loc vs iloc Studio", icon: "🎯" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive loc vs iloc Studio */}
      {activeTab === "indexer_studio" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                1. Select Indexer Method:
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIndexerType("loc")}
                  className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition ${
                    indexerType === "loc"
                      ? "bg-teal-500 border-teal-400 text-slate-950 shadow-md shadow-teal-500/20"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  df.loc[] (Label-Based)
                </button>
                <button
                  onClick={() => setIndexerType("iloc")}
                  className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition ${
                    indexerType === "iloc"
                      ? "bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  df.iloc[] (Integer Positional)
                </button>
              </div>
            </div>

            {/* Selectors for Row and Col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">
                  Select Row: {indexerType === "loc" ? `Label '${STUDENTS[selectedRow].label}'` : `Position ${selectedRow}`}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {STUDENTS.map((s, idx) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedRow(idx)}
                      className={`p-2 rounded-lg border text-xs font-mono transition ${
                        selectedRow === idx
                          ? "bg-teal-500/20 border-teal-400 text-teal-200 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      {indexerType === "loc" ? s.label : `Row ${idx}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-mono">
                  Select Column: {indexerType === "loc" ? `'${selectedCol}'` : `Position ${colPosMap[selectedCol]}`}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["name", "city", "math", "sci"].map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedCol(col)}
                      className={`p-2 rounded-lg border text-xs font-mono transition ${
                        selectedCol === col
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                    >
                      {indexerType === "loc" ? col : `Col ${colPosMap[col]}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2D Matrix Table */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-slate-200">
                Interactive DataFrame Grid (Click any cell to target)
              </h4>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-center text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="p-2 text-slate-600 text-left">Label Index</th>
                      <th className="p-2 text-slate-600 text-left">Pos</th>
                      <th className="p-2 text-teal-400">Name (0)</th>
                      <th className="p-2 text-indigo-400">City (1)</th>
                      <th className="p-2 text-amber-400">Math (2)</th>
                      <th className="p-2 text-rose-400">Sci (3)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS.map((s, rIdx) => (
                      <tr key={s.label} className="border-b border-slate-900">
                        <td className="p-2.5 text-cyan-400 font-bold text-left">{s.label}</td>
                        <td className="p-2.5 text-slate-600 font-mono text-left">{rIdx}</td>
                        {["name", "city", "math", "sci"].map((col) => {
                          const isTarget = selectedRow === rIdx && selectedCol === col;
                          return (
                            <td
                              key={col}
                              onClick={() => {
                                setSelectedRow(rIdx);
                                setSelectedCol(col);
                              }}
                              className={`p-2.5 border cursor-pointer transition ${
                                isTarget
                                  ? "bg-amber-500 border-amber-300 text-slate-950 font-black scale-105 shadow-lg shadow-amber-500/30"
                                  : selectedRow === rIdx
                                  ? "bg-teal-950/40 border-teal-800/60 text-teal-200"
                                  : "bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              {s[col]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Syntax Evaluation Card */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-teal-300 mb-3">Syntax &amp; Evaluation</h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Selected Target Cell:</span>
                    <span className="text-emerald-400 text-sm font-bold">
                      {STUDENTS[selectedRow][selectedCol]}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-500 block text-[11px]">Equivalent Python Code:</span>
                    <span className="text-amber-300 font-bold block mt-1">
                      {indexerType === "loc"
                        ? `df.loc['${STUDENTS[selectedRow].label}', '${selectedCol}']`
                        : `df.iloc[${selectedRow}, ${colPosMap[selectedCol]}]`}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    {indexerType === "loc"
                      ? "✓ loc uses explicit row and column labels."
                      : "✓ iloc uses 0-indexed integer array coordinates."}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-teal-950/30 border border-teal-900/60 rounded-xl text-[11px] text-teal-200">
                📌 Inclusivity Rule: Slices with <code className="text-white font-mono">loc['A':'C']</code> include 'C'. Slices with <code className="text-white font-mono">iloc[0:2]</code> stop before index 2!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Python Multi-Script Suite */}
      {activeTab === "python_suite" && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PYTHON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScriptId(s.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedScriptId === s.id
                    ? "bg-teal-950/40 border-teal-500 shadow-lg shadow-teal-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {s.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">.py</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">{s.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{s.summary}</p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-teal-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Row Indexing Suite
              </span>
            </div>
            <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Notes */}
      {activeTab === "teacher_notes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Teacher
            name="Sukanta Hui"
            title="Senior ML Instructor, Barrackpore Lab"
            quote="The #1 trap that catches beginner data scientists is confusing df.loc[] with df.iloc[]. Remember: loc is for Labels (and is endpoint inclusive), while iloc is for Integer positions (and is endpoint exclusive, just like standard Python range/slices). When updating values conditionally, always use df.loc[condition, 'col'] = value to prevent nasty SettingWithCopyWarnings!"
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-teal-300 mb-4 flex items-center gap-2">
              <span>📚 Comprehensive Topic Notes</span>
            </h3>
            <PlainTextPrint content={noteText} />
          </div>
        </div>
      )}

      {/* Tab 4: Quizzes & FAQs */}
      {activeTab === "faqs_questions" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <FAQTemplate questions={questions} />
        </div>
      )}
    </div>
  );
};

export default Topic8;
