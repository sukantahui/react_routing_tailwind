import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic6_files/01_head_tail_sample_inspection.py?raw";
import pyCode2 from "./topic6_files/02_info_dtypes_nonnull_memory.py?raw";
import pyCode3 from "./topic6_files/03_describe_numerical_vs_categorical.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_head_tail_sample_inspection.py",
    title: "1. Boundary Inspection (head, tail, sample)",
    badge: "head, tail, sample",
    code: pyCode1,
    summary: "Demonstrates inspecting top/bottom boundary rows and extracting unbiased random sample rows for EDA.",
  },
  {
    id: "part2",
    fileName: "02_info_dtypes_nonnull_memory.py",
    title: "2. Metadata Diagnostics (df.info())",
    badge: "info & Non-Null",
    code: pyCode2,
    summary: "Profiles column data types, detects missing values via non-null counts, and calculates deep RAM footprint.",
  },
  {
    id: "part3",
    fileName: "03_describe_numerical_vs_categorical.py",
    title: "3. Statistical Summaries (df.describe())",
    badge: "describe() & Quartiles",
    code: pyCode3,
    summary: "Explores 5-number summaries for numeric features and unique/top/freq metrics for categorical columns.",
  },
];

const FULL_DATASET = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", age: 22, hours: 12.5, score: 88, passed: "True" },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  age: 23, hours: 15.0, score: 95, passed: "True" },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      age: 21, hours: 8.0,  score: 72, passed: "True" },
  { id: 104, name: "Tuhina",    locality: "Naihati",      age: 24, hours: 14.5, score: 91, passed: "True" },
  { id: 105, name: "Sachin",    locality: "Kolkata",      age: 25, hours: 10.0, score: 80, passed: "True" },
  { id: 106, name: "Mahima",    locality: "Barrackpore", age: 22, hours: 13.0, score: 89, passed: "True" },
  { id: 107, name: "Abhronila", locality: "Titagarh",    age: 23, hours: 11.5, score: 84, passed: "True" },
  { id: 108, name: "Sourav",    locality: "Khardah",     age: 20, hours: 9.0,  score: 76, passed: "True" },
];

const Topic6 = () => {
  const [activeTab, setActiveTab] = useState("eda_inspector");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [edaMethod, setEdaMethod] = useState("head"); // "head", "tail", "info", "describe_num", "describe_cat"

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
                Topic 6 • Exploratory Data Inspection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Viewing Data: head(), tail(), info() &amp; describe()
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master the 4 fundamental inspection methods for Exploratory Data Analysis (EDA): boundary inspection (<code className="text-teal-300 font-mono">head/tail</code>), metadata &amp; null checking (<code className="text-cyan-300 font-mono">info</code>), and numerical 5-number summaries (<code className="text-amber-300 font-mono">describe</code>).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "eda_inspector", label: "Interactive EDA Inspector", icon: "🔍" },
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

      {/* Tab 1: Interactive EDA Inspector */}
      {activeTab === "eda_inspector" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Method Selector Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-3">
              Select Inspection Method:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: "head", title: "df.head(4)", sub: "Top 4 Rows" },
                { id: "tail", title: "df.tail(4)", sub: "Bottom 4 Rows" },
                { id: "info", title: "df.info()", sub: "Schema & Memory" },
                { id: "describe_num", title: "df.describe()", sub: "Numerical Stats" },
                { id: "describe_cat", title: "describe(include='obj')", sub: "Categorical Stats" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setEdaMethod(btn.id)}
                  className={`p-3 rounded-xl border text-left transition ${
                    edaMethod === btn.id
                      ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-mono font-bold text-xs">{btn.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{btn.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Output Arena */}
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl">
            {/* 1. head() or tail() */}
            {(edaMethod === "head" || edaMethod === "tail") && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-teal-300">
                    Output of: <code className="font-mono text-cyan-300">df.{edaMethod}(4)</code>
                  </h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 font-mono rounded">
                    Showing 4 of 8 rows
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="p-2 text-slate-600 text-left">Index</th>
                        <th className="p-2 text-teal-400 font-bold">StudentID</th>
                        <th className="p-2 text-cyan-400 font-bold">Name</th>
                        <th className="p-2 text-indigo-400 font-bold">Locality</th>
                        <th className="p-2 text-amber-400 font-bold">Age</th>
                        <th className="p-2 text-emerald-400 font-bold">Study_Hours</th>
                        <th className="p-2 text-rose-400 font-bold">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(edaMethod === "head" ? FULL_DATASET.slice(0, 4) : FULL_DATASET.slice(4)).map((row, idx) => (
                        <tr key={row.id} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                          <td className="p-2.5 text-slate-600 font-mono text-left">
                            {edaMethod === "head" ? idx : idx + 4}
                          </td>
                          <td className="p-2.5 text-slate-300">{row.id}</td>
                          <td className="p-2.5 text-teal-300 font-sans font-semibold">{row.name}</td>
                          <td className="p-2.5 text-indigo-300">{row.locality}</td>
                          <td className="p-2.5 text-amber-300">{row.age}</td>
                          <td className="p-2.5 text-emerald-300 font-bold">{row.hours}</td>
                          <td className="p-2.5 text-rose-300 font-bold">{row.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. info() */}
            {edaMethod === "info" && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-cyan-300">
                  Terminal Output of: <code className="font-mono text-teal-300">df.info(memory_usage='deep')</code>
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
                  <p className="text-slate-400">&lt;class 'pandas.core.frame.DataFrame'&gt;</p>
                  <p className="text-slate-400">RangeIndex: 8 entries, 0 to 7</p>
                  <p className="text-slate-400">Data columns (total 7 columns):</p>
                  <p className="text-slate-500"> #&nbsp;&nbsp;&nbsp;Column&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Non-Null Count&nbsp;&nbsp;Dtype</p>
                  <p className="text-slate-500">---&nbsp;&nbsp;------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--------------&nbsp;&nbsp;-----</p>
                  <p className="text-emerald-400">&nbsp;0&nbsp;&nbsp;&nbsp;StudentID&nbsp;&nbsp;&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int64</p>
                  <p className="text-emerald-400">&nbsp;1&nbsp;&nbsp;&nbsp;Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;object</p>
                  <p className="text-emerald-400">&nbsp;2&nbsp;&nbsp;&nbsp;Locality&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;object</p>
                  <p className="text-emerald-400">&nbsp;3&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int64</p>
                  <p className="text-emerald-400">&nbsp;4&nbsp;&nbsp;&nbsp;Study_Hours&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;float64</p>
                  <p className="text-emerald-400">&nbsp;5&nbsp;&nbsp;&nbsp;Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int64</p>
                  <p className="text-emerald-400">&nbsp;6&nbsp;&nbsp;&nbsp;Passed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 non-null&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bool</p>
                  <p className="text-slate-400 pt-2">dtypes: bool(1), float64(1), int64(3), object(2)</p>
                  <p className="text-teal-300">memory usage: 1.4 KB</p>
                </div>
              </div>
            )}

            {/* 3. describe() Numerical */}
            {edaMethod === "describe_num" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-300">
                    Numerical 5-Number Summary: <code className="font-mono text-cyan-300">df.describe()</code>
                  </h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 font-mono rounded">
                    Quantiles &amp; Spread
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="p-2 text-slate-600 text-left">Stat</th>
                        <th className="p-2 text-amber-400 font-bold">Age</th>
                        <th className="p-2 text-emerald-400 font-bold">Study_Hours</th>
                        <th className="p-2 text-rose-400 font-bold">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">count</td>
                        <td className="p-2 text-slate-200">8.00</td>
                        <td className="p-2 text-slate-200">8.00</td>
                        <td className="p-2 text-slate-200">8.00</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">mean</td>
                        <td className="p-2 text-amber-300">22.50</td>
                        <td className="p-2 text-emerald-300">11.81</td>
                        <td className="p-2 text-rose-300">84.38</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">std</td>
                        <td className="p-2 text-slate-300">1.60</td>
                        <td className="p-2 text-slate-300">2.62</td>
                        <td className="p-2 text-slate-300">7.84</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">min</td>
                        <td className="p-2 text-slate-200">20.00</td>
                        <td className="p-2 text-slate-200">8.00</td>
                        <td className="p-2 text-slate-200">72.00</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">25% (Q1)</td>
                        <td className="p-2 text-slate-300">21.75</td>
                        <td className="p-2 text-slate-300">9.75</td>
                        <td className="p-2 text-slate-300">79.00</td>
                      </tr>
                      <tr className="bg-slate-900/40">
                        <td className="p-2 text-cyan-400 text-left font-bold">50% (Median)</td>
                        <td className="p-2 text-cyan-300 font-bold">22.50</td>
                        <td className="p-2 text-cyan-300 font-bold">12.00</td>
                        <td className="p-2 text-cyan-300 font-bold">86.00</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">75% (Q3)</td>
                        <td className="p-2 text-slate-300">23.25</td>
                        <td className="p-2 text-slate-300">13.38</td>
                        <td className="p-2 text-slate-300">89.50</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">max</td>
                        <td className="p-2 text-slate-200">25.00</td>
                        <td className="p-2 text-slate-200">15.00</td>
                        <td className="p-2 text-slate-200">95.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. describe() Categorical */}
            {edaMethod === "describe_cat" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-indigo-300">
                    Categorical Summary: <code className="font-mono text-cyan-300">df.describe(include=['object'])</code>
                  </h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-400 font-mono rounded">
                    Mode &amp; Unique Counts
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        <th className="p-2 text-slate-600 text-left">Stat</th>
                        <th className="p-2 text-teal-400 font-bold">Name</th>
                        <th className="p-2 text-indigo-400 font-bold">Locality</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">count</td>
                        <td className="p-2 text-slate-200">8</td>
                        <td className="p-2 text-slate-200">8</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">unique</td>
                        <td className="p-2 text-teal-300">8</td>
                        <td className="p-2 text-indigo-300">6</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">top (Mode)</td>
                        <td className="p-2 text-slate-300">Debangshu</td>
                        <td className="p-2 text-indigo-200 font-bold">Barrackpore</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-slate-500 text-left font-bold">freq</td>
                        <td className="p-2 text-slate-300">1</td>
                        <td className="p-2 text-indigo-200 font-bold">3</td>
                      </tr>
                    </tbody>
                  </table>
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
                Data Inspection Suite
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
            quote="Before writing a single line of feature engineering or machine learning code, you must intimately understand your dataset's shape, missingness, and distribution. Always run df.info() to spot nulls, df.describe() to detect outlier anomalies, and df.sample() to inspect unbiased random records."
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

export default Topic6;
