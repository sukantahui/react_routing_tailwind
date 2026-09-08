import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic7_files/01_single_and_multi_column_selection.py?raw";
import pyCode2 from "./topic7_files/02_dot_notation_vs_bracket_notation.py?raw";
import pyCode3 from "./topic7_files/03_select_dtypes_and_filter_regex.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_single_and_multi_column_selection.py",
    title: "1. Single vs Multi-Column Selection",
    badge: "Bracket Notation",
    code: pyCode1,
    summary: "Contrasts 1D Series extraction (df['col']) with 2D DataFrame multi-column feature subsets (df[['col1', 'col2']]).",
  },
  {
    id: "part2",
    fileName: "02_dot_notation_vs_bracket_notation.py",
    title: "2. Dot vs Bracket Notation Traps",
    badge: "Method Collisions",
    code: pyCode2,
    summary: "Explains syntax pitfalls with spaces, method collisions (df.count vs df['count']), and dynamic variable lookups.",
  },
  {
    id: "part3",
    fileName: "03_select_dtypes_and_filter_regex.py",
    title: "3. select_dtypes & Regex filter()",
    badge: "select_dtypes & regex",
    code: pyCode3,
    summary: "Selects numeric/object features automatically for ML pipelines and matches column name patterns via regex filter.",
  },
];

const MASTER_COLUMNS = [
  { key: "StudentID", label: "StudentID", type: "int64", isNum: true },
  { key: "Name", label: "Name", type: "object", isNum: false },
  { key: "Locality", label: "Locality", type: "object", isNum: false },
  { key: "Math_Score", label: "Math_Score", type: "int64", isNum: true },
  { key: "Science_Score", label: "Science_Score", type: "int64", isNum: true },
  { key: "Passed", label: "Passed", type: "bool", isNum: false },
];

const SAMPLE_ROWS = [
  { StudentID: 101, Name: "Debangshu", Locality: "Barrackpore", Math_Score: 85, Science_Score: 90, Passed: "True" },
  { StudentID: 102, Name: "Susmita",   Locality: "Shyamnagar",  Math_Score: 92, Science_Score: 95, Passed: "True" },
  { StudentID: 103, Name: "Swadeep",   Locality: "Ichapur",      Math_Score: 65, Science_Score: 70, Passed: "True" },
  { StudentID: 104, Name: "Tuhina",    Locality: "Naihati",      Math_Score: 88, Science_Score: 85, Passed: "True" },
];

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState("column_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedCols, setSelectedCols] = useState(["Name", "Math_Score", "Science_Score"]);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const toggleCol = (key) => {
    if (selectedCols.includes(key)) {
      if (selectedCols.length > 1) {
        setSelectedCols(selectedCols.filter((c) => c !== key));
      }
    } else {
      setSelectedCols([...selectedCols, key]);
    }
  };

  const selectNumbersOnly = () => {
    setSelectedCols(MASTER_COLUMNS.filter((c) => c.isNum).map((c) => c.key));
  };

  const selectAll = () => {
    setSelectedCols(MASTER_COLUMNS.map((c) => c.key));
  };

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
                Topic 7 • Column Selection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Selecting Columns in Pandas
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master column extraction workflows: single bracket Series <code className="text-teal-300 font-mono">df['col']</code>, multi-column feature subsets <code className="text-cyan-300 font-mono">df[['c1', 'c2']]</code>, dot notation pitfalls, and automated type selection via <code className="text-amber-300 font-mono">select_dtypes()</code>.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "column_studio", label: "Interactive Column Studio", icon: "📐" },
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

      {/* Tab 1: Interactive Column Studio */}
      {activeTab === "column_studio" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                1. Select Columns to Include in Feature Subset:
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={selectNumbersOnly}
                  className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-bold transition"
                >
                  ⚡ df.select_dtypes('number')
                </button>
                <button
                  onClick={selectAll}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-mono transition"
                >
                  Select All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-800">
              {MASTER_COLUMNS.map((col) => {
                const isSelected = selectedCols.includes(col.key);
                return (
                  <button
                    key={col.key}
                    onClick={() => toggleCol(col.key)}
                    className={`p-3 rounded-xl border text-left transition ${
                      isSelected
                        ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <div className="font-mono font-bold text-xs truncate">{col.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{col.type}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rendered Table */}
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-teal-300">
                Generated DataFrame Feature Matrix: <span className="font-mono text-cyan-300">df[{JSON.stringify(selectedCols)}]</span>
              </h4>
              <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 font-mono rounded">
                Shape: ({SAMPLE_ROWS.length}, {selectedCols.length})
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="p-2 text-slate-600 text-left">Index</th>
                    {selectedCols.map((c) => (
                      <th key={c} className="p-2 text-teal-400 font-bold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ROWS.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                      <td className="p-2.5 text-slate-600 font-mono text-left">{idx}</td>
                      {selectedCols.map((c) => (
                        <td key={c} className="p-2.5 text-slate-200 bg-slate-900/40">
                          {row[c]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
              Python Extraction:{" "}
              <span className="text-teal-300 font-bold">
                X = df[{JSON.stringify(selectedCols)}].to_numpy()
              </span>
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
                Column Selection Suite
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
            quote="When preparing feature matrix X and target vector y for machine learning models, always remember: single brackets df['target'] return a 1D Series (ideal for target y), while double brackets df[['f1', 'f2']] return a 2D DataFrame (required for feature matrix X). And never use dot notation for columns named count or shape!"
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

export default Topic7;
