import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic3_files/01_dict_of_lists_creation.py?raw";
import pyCode2 from "./topic3_files/02_list_of_dicts_record_format.py?raw";
import pyCode3 from "./topic3_files/03_dict_of_series_and_orient_options.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_dict_of_lists_creation.py",
    title: "1. Dictionary of Lists (Columnar)",
    badge: "Dict of Lists",
    code: pyCode1,
    summary: "Creates DataFrames from key-list mappings, defines custom row indices, and diagnoses unequal-length ValueError traps.",
  },
  {
    id: "part2",
    fileName: "02_list_of_dicts_record_format.py",
    title: "2. List of Dictionaries (JSON Records)",
    badge: "JSON Records",
    code: pyCode2,
    summary: "Ingests irregular JSON-style dictionary records, automatically unioning keys and inserting NaNs for missing attributes.",
  },
  {
    id: "part3",
    fileName: "03_dict_of_series_and_orient_options.py",
    title: "3. from_dict Orientations & Dict of Series",
    badge: "from_dict & Orient",
    code: pyCode3,
    summary: "Demonstrates orient='index' vs orient='columns' and explores automatic index label alignment with dict of Series.",
  },
];

const PRESETS = {
  dict_of_lists: {
    title: "1. Dictionary of Lists (Columnar Format)",
    desc: "Keys become column headers; values are equal-length lists.",
    codePreview: `student_dict = {
  "Name": ["Debangshu", "Susmita", "Swadeep"],
  "City": ["Barrackpore", "Shyamnagar", "Ichapur"],
  "Score": [88, 95, 72]
}
df = pd.DataFrame(student_dict)`,
    headers: ["Index", "Name", "City", "Score"],
    rows: [
      [0, "Debangshu", "Barrackpore", 88],
      [1, "Susmita", "Shyamnagar", 95],
      [2, "Swadeep", "Ichapur", 72],
    ],
  },
  list_of_dicts: {
    title: "2. List of Dictionaries (JSON / Record Format)",
    desc: "Each dictionary represents a row observation; missing keys populate with NaN automatically.",
    codePreview: `records = [
  {"Name": "Debangshu", "Score": 88, "Grade": "A"},
  {"Name": "Susmita", "Score": 95, "Grade": "A+"},
  {"Name": "Swadeep", "Score": 72, "Scholarship": "Half"},
  {"Name": "Sachin", "Score": 65}
]
df = pd.DataFrame(records)`,
    headers: ["Index", "Name", "Score", "Grade", "Scholarship"],
    rows: [
      [0, "Debangshu", 88, "A", "NaN"],
      [1, "Susmita", 95, "A+", "NaN"],
      [2, "Swadeep", 72, "B", "Half"],
      [3, "Sachin", 65, "NaN", "NaN"],
    ],
  },
  orient_index: {
    title: "3. Nested Dict with orient='index'",
    desc: "Outer keys become the row index; inner keys become columns.",
    codePreview: `data = {
  "Debangshu": {"Age": 22, "Score": 88},
  "Susmita": {"Age": 23, "Score": 95},
  "Swadeep": {"Age": 21, "Score": 72}
}
df = pd.DataFrame.from_dict(data, orient='index')`,
    headers: ["Index (Outer Key)", "Age", "Score"],
    rows: [
      ["Debangshu", 22, 88],
      ["Susmita", 23, 95],
      ["Swadeep", 21, 72],
    ],
  },
};

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("interactive_constructor");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedPreset, setSelectedPreset] = useState("dict_of_lists");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  const current = PRESETS[selectedPreset];

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
                Topic 3 • DataFrame Construction
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Creating a DataFrame from a Dictionary
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master Python dictionary data ingestion: Columnar Dictionaries of Lists, JSON Record Lists with automatic <code className="text-amber-300 font-mono">NaN</code> handling, Dict of Series with index alignment, and <code className="text-teal-300 font-mono">orient='index'</code> transformations.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "interactive_constructor", label: "Interactive DataFrame Constructor", icon: "🏗️" },
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

      {/* Tab 1: Interactive DataFrame Constructor */}
      {activeTab === "interactive_constructor" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Format Selector Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-3">
              Select Dictionary Input Pattern:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "dict_of_lists", title: "1. Dict of Lists", badge: "Columnar Format" },
                { id: "list_of_dicts", title: "2. List of Dicts", badge: "JSON / Records Format" },
                { id: "orient_index", title: "3. from_dict (orient='index')", badge: "Nested Dict" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedPreset(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    selectedPreset === m.id
                      ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{m.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{m.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visualization Arena */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Input */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h4 className="text-base font-bold text-slate-200">{current.title}</h4>
              <p className="text-xs text-slate-400">{current.desc}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre overflow-x-auto">
                {current.codePreview}
              </div>
            </div>

            {/* Rendered DataFrame Output */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold text-teal-300">Constructed DataFrame Output</h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 font-mono rounded">
                    Shape: ({current.rows.length}, {current.headers.length - 1})
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        {current.headers.map((h, i) => (
                          <th key={i} className={`p-2 ${i === 0 ? "text-slate-600 text-left" : "text-teal-400 font-bold"}`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {current.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-slate-900">
                          {row.map((val, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-2.5 ${
                                cIdx === 0
                                  ? "text-slate-500 font-mono text-left"
                                  : val === "NaN"
                                  ? "text-rose-400 font-bold bg-rose-950/20"
                                  : "text-slate-200 bg-slate-900/40"
                              }`}
                            >
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 p-3 bg-teal-950/30 border border-teal-900/60 rounded-xl text-xs text-teal-200">
                💡 Notice how Pandas automatically maps dictionary keys to columns and preserves structure seamlessly!
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
                DataFrame Constructor Suite
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
            quote="In real-world data engineering pipelines, data rarely arrives in perfect CSV tables on day one. It often comes as raw JSON payloads from REST APIs or database document queries. Knowing how to convert both Columnar (Dict of Lists) and Record (List of Dicts) formats directly into clean Pandas DataFrames is a fundamental daily skill."
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

export default Topic3;
