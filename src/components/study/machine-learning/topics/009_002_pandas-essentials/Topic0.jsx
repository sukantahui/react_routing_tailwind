import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic0_files/01_intro_pandas_series_dataframe.py?raw";
import pyCode2 from "./topic0_files/02_pandas_vs_numpy_vs_sql.py?raw";
import pyCode3 from "./topic0_files/03_ml_preprocessing_pipeline_preview.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_intro_pandas_series_dataframe.py",
    title: "1. Series & DataFrame Core Structures",
    badge: "Core Structures",
    code: pyCode1,
    summary: "Introduces 1D labeled Series and 2D heterogeneous DataFrames using Barrackpore student batch records.",
  },
  {
    id: "part2",
    fileName: "02_pandas_vs_numpy_vs_sql.py",
    title: "2. Pandas vs NumPy vs SQL Architecture",
    badge: "Comparative Analysis",
    code: pyCode2,
    summary: "Contrasts raw homogeneous NumPy ndarrays with labeled heterogeneous Pandas DataFrames and demonstrates df.to_numpy().",
  },
  {
    id: "part3",
    fileName: "03_ml_preprocessing_pipeline_preview.py",
    title: "3. Pandas in Machine Learning Pipelines",
    badge: "ML Feature Prep",
    code: pyCode3,
    summary: "Demonstrates exploratory data summaries with df.describe() and extracting clean feature matrix X and target label y.",
  },
];

const SAMPLE_STUDENTS = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", hours: 12.5, attendance: 92, passed: true },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  hours: 15.0, attendance: 98, passed: true },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      hours: 8.0,  attendance: 75, passed: true },
  { id: 104, name: "Tuhina",    locality: "Naihati",      hours: 14.5, attendance: 95, passed: true },
  { id: 105, name: "Sachin",    locality: "Kolkata",      hours: 10.0, attendance: 84, passed: true },
];

const Topic0 = () => {
  const [activeTab, setActiveTab] = useState("architecture_explorer");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [viewMode, setViewMode] = useState("dataframe"); // "dataframe", "series", "numpy_matrix"
  const [selectedColumn, setSelectedColumn] = useState("hours");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

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
                Topic 0 • Introduction to Pandas
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Introduction to Pandas &amp; Tabular Data
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Understand the core architecture of Python’s foundational data science library: 1D labeled <code className="text-teal-300 font-mono">Series</code>, 2D heterogeneous <code className="text-cyan-300 font-mono">DataFrame</code>, and how Pandas bridges raw data files with machine learning models.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "architecture_explorer", label: "Pandas Data Structure Explorer", icon: "📊" },
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

      {/* Tab 1: Architecture Explorer */}
      {activeTab === "architecture_explorer" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* View Mode Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-3">
              Select Data Structure Representation:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "dataframe", title: "1. 2D Pandas DataFrame", desc: "Heterogeneous labeled table (Rows × Columns)" },
                { id: "series", title: "2. 1D Pandas Series", desc: "Single labeled column with row index" },
                { id: "numpy_matrix", title: "3. Underlying NumPy ndarray", desc: "Pure homogeneous matrix extracted via .to_numpy()" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setViewMode(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    viewMode === m.id
                      ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{m.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Arena */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            {/* 1. DataFrame View */}
            {viewMode === "dataframe" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-200">
                    Pandas DataFrame: <code className="text-teal-300 font-mono">df_students</code>
                  </h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-teal-300 font-mono rounded">
                    Shape: (5, 6) • 5 Rows × 6 Columns
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="p-2 text-slate-600 text-left">Index</th>
                        <th className="p-2 text-teal-400 font-bold">ID (int64)</th>
                        <th className="p-2 text-cyan-400 font-bold">Name (object)</th>
                        <th className="p-2 text-indigo-400 font-bold">Locality (object)</th>
                        <th className="p-2 text-amber-400 font-bold">Study_Hours (float64)</th>
                        <th className="p-2 text-emerald-400 font-bold">Attendance_% (int64)</th>
                        <th className="p-2 text-purple-400 font-bold">Passed (bool)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_STUDENTS.map((s, idx) => (
                        <tr key={s.id} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                          <td className="p-2.5 text-slate-600 font-mono text-left">{idx}</td>
                          <td className="p-2.5 text-slate-300">{s.id}</td>
                          <td className="p-2.5 text-cyan-300 font-sans font-semibold">{s.name}</td>
                          <td className="p-2.5 text-indigo-300">{s.locality}</td>
                          <td className="p-2.5 text-amber-300 font-bold">{s.hours}</td>
                          <td className="p-2.5 text-emerald-300">{s.attendance}%</td>
                          <td className="p-2.5 text-purple-300">{s.passed ? "True" : "False"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Row Index Range:</span>
                    <span className="text-teal-300 font-bold">RangeIndex(start=0, stop=5)</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Column Names:</span>
                    <span className="text-cyan-300 font-bold">['ID', 'Name', 'Locality', ...]</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Heterogeneous Types:</span>
                    <span className="text-purple-300 font-bold">int64, object, float64, bool</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Series View */}
            {viewMode === "series" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-200">
                    Pandas 1D Series: <code className="text-teal-300 font-mono">df_students['{selectedColumn}']</code>
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Select Column:</span>
                    {["hours", "attendance", "locality"].map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColumn(col)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition ${
                          selectedColumn === col
                            ? "bg-teal-500 border-teal-400 text-slate-950 font-bold"
                            : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md font-mono text-xs">
                  <div className="border-b border-slate-800 pb-2 mb-2 text-slate-500 flex justify-between">
                    <span>Index (Student)</span>
                    <span>Value ({selectedColumn})</span>
                  </div>
                  {SAMPLE_STUDENTS.map((s) => (
                    <div key={s.id} className="flex justify-between py-1.5 border-b border-slate-900 text-slate-300">
                      <span className="text-cyan-300">{s.name}</span>
                      <span className="text-amber-300 font-bold">{s[selectedColumn]}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                    <span>Name: {selectedColumn}</span>
                    <span>dtype: {selectedColumn === "hours" ? "float64" : selectedColumn === "attendance" ? "int64" : "object"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. NumPy Matrix View */}
            {viewMode === "numpy_matrix" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-200">
                    Extracted Pure NumPy Feature Matrix X: <code className="text-teal-300 font-mono">df[['Study_Hours', 'Attendance_%']].to_numpy()</code>
                  </h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-amber-300 font-mono rounded">
                    Shape: (5, 2) • float64
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <p className="text-slate-500"># Output of df[['Study_Hours', 'Attendance_%']].to_numpy():</p>
                  <p className="text-emerald-400 font-bold">
                    array([<br />
                    &nbsp;&nbsp;[12.5, 92. ],<br />
                    &nbsp;&nbsp;[15. , 98. ],<br />
                    &nbsp;&nbsp;[ 8. , 75. ],<br />
                    &nbsp;&nbsp;[14.5, 95. ],<br />
                    &nbsp;&nbsp;[10. , 84. ]<br />
                    ])
                  </p>
                  <p className="text-slate-400 text-[11px] pt-2">
                    -&gt; Feeds directly into Scikit-Learn <code className="text-teal-300">model.fit(X, y)</code> or PyTorch tensors!
                  </p>
                </div>
              </div>
            )}
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
                Pandas Essentials Suite
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
            quote="Welcome to Pandas Essentials! While NumPy gave you the computational engine for matrix operations, Pandas gives you the human-readable tabular framework for real-world datasets. In industry, over 80% of your time as a data scientist or ML engineer is spent inside Pandas: cleaning nulls, grouping records, engineering features, and preparing datasets for modeling."
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

export default Topic0;
