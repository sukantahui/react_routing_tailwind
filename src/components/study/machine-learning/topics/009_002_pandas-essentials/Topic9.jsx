import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic9_files/01_single_and_compound_boolean_conditions.py?raw";
import pyCode2 from "./topic9_files/02_isin_between_and_string_filters.py?raw";
import pyCode3 from "./topic9_files/03_query_method_dynamic_filtering.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_single_and_compound_boolean_conditions.py",
    title: "1. Compound Bitwise Filtering (&, |, ~)",
    badge: "&, |, ~ Operators",
    code: pyCode1,
    summary: "Demonstrates single/compound boolean masks, parentheses precedence rules, and bitwise NOT (~) inversion.",
  },
  {
    id: "part2",
    fileName: "02_isin_between_and_string_filters.py",
    title: "2. Convenience Methods (.isin, .between)",
    badge: "isin & between",
    code: pyCode2,
    summary: "Applies membership filtering via .isin([list]), numeric range slicing with .between(), and text pattern matching.",
  },
  {
    id: "part3",
    fileName: "03_query_method_dynamic_filtering.py",
    title: "3. SQL-Style df.query() & @ Variables",
    badge: "df.query & @var",
    code: pyCode3,
    summary: "Evaluates expressive SQL-like query strings with NumExpr acceleration and dynamic Python variable injection (@var).",
  },
];

const MASTER_RECORDS = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", math: 85, sci: 90 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  math: 92, sci: 95 },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      math: 65, sci: 70 },
  { id: 104, name: "Tuhina",    locality: "Naihati",      math: 88, sci: 85 },
  { id: 105, name: "Sachin",    locality: "Kolkata",      math: 78, sci: 80 },
  { id: 106, name: "Mahima",    locality: "Barrackpore", math: 90, sci: 92 },
  { id: 107, name: "Abhronila", locality: "Titagarh",    math: 84, sci: 88 },
];

const Topic9 = () => {
  const [activeTab, setActiveTab] = useState("filter_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [minMath, setMinMath] = useState(80);
  const [selectedCities, setSelectedCities] = useState(["Barrackpore", "Shyamnagar", "Naihati"]);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter((c) => c !== city));
      }
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const filtered = MASTER_RECORDS.filter(
    (r) => r.math >= minMath && selectedCities.includes(r.locality)
  );

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
                Topic 9 • Boolean Filtering
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Boolean Filtering &amp; Querying
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Filter tabular datasets with precision: bitwise compound logic (<code className="text-teal-300 font-mono">&amp;, |, ~</code>), parentheses rules, convenience filters (<code className="text-cyan-300 font-mono">isin</code>, <code className="text-amber-300 font-mono">between</code>), and SQL-style <code className="text-indigo-300 font-mono">df.query()</code>.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "filter_studio", label: "Interactive Boolean Filter Studio", icon: "⚡" },
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

      {/* Tab 1: Interactive Boolean Filter Studio */}
      {activeTab === "filter_studio" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Filter Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              1. Dynamic Filter Conditions Builder:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Math Threshold Slider */}
              <div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-300 font-mono font-bold">Condition 1: Math Score &gt;= {minMath}</span>
                  <span className="text-teal-400 font-mono font-bold">Threshold: {minMath}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  step="5"
                  value={minMath}
                  onChange={(e) => setMinMath(Number(e.target.value))}
                  className="w-full accent-teal-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Locality Selector Pills */}
              <div>
                <span className="text-xs text-slate-300 font-mono font-bold block mb-2">
                  Condition 2: Locality .isin({JSON.stringify(selectedCities)})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Titagarh"].map((city) => {
                    const isSelected = selectedCities.includes(city);
                    return (
                      <button
                        key={city}
                        onClick={() => toggleCity(city)}
                        className={`px-3 py-1 rounded-lg border text-xs font-mono transition ${
                          isSelected
                            ? "bg-teal-500/20 border-teal-400 text-teal-200 font-bold"
                            : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generated Code Preview */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <span className="text-slate-500 block">Generated Pandas Expressions:</span>
              <p className="text-teal-300">
                # Standard Mask: df[(df['Math'] &gt;= {minMath}) &amp; (df['Locality'].isin({JSON.stringify(selectedCities)}))]
              </p>
              <p className="text-cyan-300">
                # df.query: df.query("Math &gt;= {minMath} and Locality in {JSON.stringify(selectedCities)}")
              </p>
            </div>
          </div>

          {/* Rendered Filtered Table */}
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-teal-300">Filtered DataFrame Results</h4>
              <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold rounded-lg border border-emerald-500/30">
                {filtered.length} of {MASTER_RECORDS.length} Matches Found
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="p-2 text-slate-600 text-left">StudentID</th>
                    <th className="p-2 text-teal-400 font-bold">Name</th>
                    <th className="p-2 text-indigo-400 font-bold">Locality</th>
                    <th className="p-2 text-amber-400 font-bold">Math</th>
                    <th className="p-2 text-rose-400 font-bold">Science</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((row) => (
                      <tr key={row.id} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                        <td className="p-2.5 text-slate-400 text-left">{row.id}</td>
                        <td className="p-2.5 text-teal-300 font-sans font-semibold">{row.name}</td>
                        <td className="p-2.5 text-indigo-300">{row.locality}</td>
                        <td className="p-2.5 text-amber-300 font-bold">{row.math}</td>
                        <td className="p-2.5 text-rose-300 font-bold">{row.sci}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-rose-400">
                        No student records match the current filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
              📌 Always remember to wrap compound conditions in parentheses <code className="text-teal-300 font-mono">(cond1) &amp; (cond2)</code>!
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
                Boolean Filtering Suite
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
            quote="Boolean filtering is the primary mechanism by which you clean datasets, remove outliers, and extract subsets for validation. Never use Python's 'and'/'or' keywords across Pandas Series—always use bitwise '&' and '|' wrapped in parentheses, or switch to df.query() for clean, readable filtering expressions."
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

export default Topic9;
