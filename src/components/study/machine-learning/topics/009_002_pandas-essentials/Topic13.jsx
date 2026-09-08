import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic13_files/01_single_and_multi_column_sorting.py?raw";
import pyCode2 from "./topic13_files/02_na_position_and_sort_index.py?raw";
import pyCode3 from "./topic13_files/03_nlargest_nsmallest_top_k.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_single_and_multi_column_sorting.py",
    title: "1. Single & Multi-Column Sorting (sort_values)",
    badge: "df.sort_values()",
    code: pyCode1,
    summary: "Sort DataFrames across single or multiple hierarchical columns with mixed ascending/descending direction vectors.",
  },
  {
    id: "part2",
    fileName: "02_na_position_and_sort_index.py",
    title: "2. na_position & sort_index (Row/Col Axis)",
    badge: "na_position & sort_index",
    code: pyCode2,
    summary: "Control NaN positioning ('first' vs 'last') and sort the DataFrame along row index labels or column header axes.",
  },
  {
    id: "part3",
    fileName: "03_nlargest_nsmallest_top_k.py",
    title: "3. High-Performance Top-K (nlargest/nsmallest)",
    badge: "nlargest & nsmallest",
    code: pyCode3,
    summary: "Extract top or bottom performers with O(N log K) heap-based efficiency without allocating full-array sort buffers.",
  },
];

const INITIAL_DATA = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", math: 85, sci: 90, total: 175 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  math: 92, sci: 95, total: 187 },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      math: 65, sci: 70, total: 135 },
  { id: 104, name: "Tuhina",    locality: "Naihati",      math: 88, sci: 85, total: 173 },
  { id: 105, name: "Sachin",    locality: "Kolkata",      math: 78, sci: 80, total: 158 },
  { id: 106, name: "Mahima",    locality: "Barrackpore", math: 90, sci: 92, total: 182 },
  { id: 107, name: "Abhronila", locality: "Titagarh",    math: 84, sci: 88, total: 172 },
];

const Topic13 = () => {
  const [activeTab, setActiveTab] = useState("sort_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Interactive sorting states
  const [sortBy, setSortBy] = useState("total");
  const [isAscending, setIsAscending] = useState(false);
  const [filterMode, setFilterMode] = useState("all"); // 'all', 'top3', 'bottom2'

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Process rows
  const getSortedRows = () => {
    let list = [...INITIAL_DATA];

    list.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === "string") {
        return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return isAscending ? valA - valB : valB - valA;
    });

    if (filterMode === "top3") {
      // Top 3 by total
      const sortedByTotal = [...INITIAL_DATA].sort((a, b) => b.total - a.total);
      return sortedByTotal.slice(0, 3);
    }
    if (filterMode === "bottom2") {
      // Bottom 2 by math
      const sortedByMath = [...INITIAL_DATA].sort((a, b) => a.math - b.math);
      return sortedByMath.slice(0, 2);
    }

    return list;
  };

  const sortedRows = getSortedRows();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-slate-900/60 border border-violet-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full">
                  Ordering &amp; Ranking
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 13</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Sorting Values and Index in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Structure your data hierarchically: sort by multiple columns with{" "}
                <code className="text-violet-300 bg-slate-800 px-1 py-0.5 rounded">df.sort_values()</code>, position NaNs, reorder row indices, and perform lightning-fast Top-K extraction using{" "}
                <code className="text-violet-300 bg-slate-800 px-1 py-0.5 rounded">nlargest()</code> and{" "}
                <code className="text-violet-300 bg-slate-800 px-1 py-0.5 rounded">nsmallest()</code>.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-mono text-2xl font-bold shadow-lg shadow-violet-500/20">
                ⇅
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("sort_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "sort_studio"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🏆 Leaderboard &amp; Sorting Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: SORTING STUDIO */}
        {activeTab === "sort_studio" && (
          <div className="space-y-6">
            {/* Interactive Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🎛️</span> Dynamic Sorting Configuration
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Sort Column Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Sort By Column (by='...')
                  </label>
                  <select
                    value={sortBy}
                    disabled={filterMode !== "all"}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-violet-300 focus:outline-none focus:border-violet-500 font-mono disabled:opacity-50"
                  >
                    <option value="total">TotalMarks (Math + Sci)</option>
                    <option value="math">Math</option>
                    <option value="sci">Science</option>
                    <option value="name">Name (Alphabetical)</option>
                    <option value="locality">Locality</option>
                    <option value="id">StudentID</option>
                  </select>
                </div>

                {/* Sort Direction Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Direction (ascending=...)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      disabled={filterMode !== "all"}
                      onClick={() => setIsAscending(false)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                        !isAscending && filterMode === "all"
                          ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      } disabled:opacity-50`}
                    >
                      Descending (High→Low)
                    </button>
                    <button
                      disabled={filterMode !== "all"}
                      onClick={() => setIsAscending(true)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
                        isAscending && filterMode === "all"
                          ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      } disabled:opacity-50`}
                    >
                      Ascending (Low→High)
                    </button>
                  </div>
                </div>

                {/* Top-K / Mode Preset */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Optimized Mode (nlargest / nsmallest)
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setFilterMode("all")}
                      className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                        filterMode === "all"
                          ? "bg-violet-600 text-white"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      Full Sort
                    </button>
                    <button
                      onClick={() => setFilterMode("top3")}
                      className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                        filterMode === "top3"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      nlargest(3)
                    </button>
                    <button
                      onClick={() => setFilterMode("bottom2")}
                      className={`px-2 py-2 rounded-xl text-xs font-semibold transition-all ${
                        filterMode === "bottom2"
                          ? "bg-rose-600 text-white"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      nsmallest(2)
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Python Code Output */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-violet-300">
                <span className="text-slate-500"># Executed Python code:</span>
                <div className="mt-1">
                  {filterMode === "top3" && (
                    <span className="text-emerald-400">df.nlargest(n=3, columns='TotalMarks')</span>
                  )}
                  {filterMode === "bottom2" && (
                    <span className="text-rose-400">df.nsmallest(n=2, columns='Math')</span>
                  )}
                  {filterMode === "all" && (
                    <span>{`df.sort_values(by='${sortBy === "total" ? "TotalMarks" : sortBy}', ascending=${isAscending ? "True" : "False"}).reset_index(drop=True)`}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Live Table Leaderboard */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Sorted DataFrame Leaderboard ({sortedRows.length} Rows)
                </h3>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80">
                    <th className="p-3 text-violet-400 font-bold">Rank</th>
                    <th className="p-3 text-slate-400 font-mono">StudentID</th>
                    <th className="p-3 text-teal-300 font-semibold">Student Name</th>
                    <th className="p-3 text-slate-300 font-semibold">Locality</th>
                    <th className="p-3 text-cyan-300 font-semibold">Math</th>
                    <th className="p-3 text-cyan-300 font-semibold">Science</th>
                    <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Total Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {sortedRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3">
                        <span
                          className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-bold ${
                            idx === 0
                              ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40"
                              : idx === 1
                              ? "bg-slate-300 text-slate-950"
                              : idx === 2
                              ? "bg-amber-700 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">{row.id}</td>
                      <td className="p-3 text-slate-100 font-sans font-semibold">{row.name}</td>
                      <td className="p-3 text-slate-300 font-sans">{row.locality}</td>
                      <td className="p-3 text-cyan-300">{row.math}</td>
                      <td className="p-3 text-cyan-300">{row.sci}</td>
                      <td className="p-3 text-emerald-400 font-bold bg-emerald-950/10 text-sm">
                        {row.total} / 200
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Sorting Mechanics & Algorithmic Scalability in ML"
              text="Sorting seems straightforward, but at production scale with 50 million records, choosing df.nlargest(10, 'Probability') over df.sort_values().head(10) saves seconds of runtime and gigabytes of memory! Also, remember that time-series ML models strictly require prior chronological sorting before computing rolling moving averages or lag features."
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-violet-950/60 border-violet-500 text-white shadow-lg shadow-violet-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <h3 className="text-md font-bold text-white font-mono">{activeScript.fileName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeScript.summary}</p>
                </div>
              </div>
              <PythonFileLoader fileModule={activeScript.code} title={activeScript.fileName} />
            </div>
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === "theory_notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <PlainTextPrint text={noteText} title="Topic 13 Revision Notes: Sorting Values &amp; Index" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 13 Knowledge Check: Sorting Values &amp; Index" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic13;
