import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic4_files/01_basic_csv_reading_and_params.py?raw";
import pyCode2 from "./topic4_files/02_delimiters_encodings_and_parsers.py?raw";
import pyCode3 from "./topic4_files/03_handling_dates_na_and_chunking.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_basic_csv_reading_and_params.py",
    title: "1. Core CSV Reading (index_col, usecols)",
    badge: "Core Parameters",
    code: pyCode1,
    summary: "Reads CSV buffers, sets custom index columns, and extracts selective memory-optimized feature subsets via usecols.",
  },
  {
    id: "part2",
    fileName: "02_delimiters_encodings_and_parsers.py",
    title: "2. Custom Delimiters & Missing Headers",
    badge: "Delimiters & Headers",
    code: pyCode2,
    summary: "Handles semicolon and tab-delimited files (TSV), and assigns custom column names with header=None, names=[...].",
  },
  {
    id: "part3",
    fileName: "03_handling_dates_na_and_chunking.py",
    title: "3. Dates, Custom NA & Big Data Chunking",
    badge: "Dates & Chunking",
    code: pyCode3,
    summary: "Parses timestamps, flags custom NA sentinels ('MISSING', -999), and streams multi-gigabyte datasets via chunksize iterator.",
  },
];

const CSV_PRESETS = [
  {
    name: "Comma-Separated (Standard CSV)",
    delimiter: ",",
    raw: `StudentID,Name,Locality,Math,Science
101,Debangshu,Barrackpore,85,90
102,Susmita,Shyamnagar,92,95
103,Swadeep,Ichapur,65,70
104,Tuhina,Naihati,88,85`,
  },
  {
    name: "Semicolon-Separated (European / Tax Data)",
    delimiter: ";",
    raw: `StudentID;Name;Locality;Math;Science
101;Debangshu;Barrackpore;85;90
102;Susmita;Shyamnagar;92;95
103;Swadeep;Ichapur;65;70
104;Tuhina;Naihati;88;85`,
  },
  {
    name: "Tab-Separated (TSV Logs)",
    delimiter: "\t",
    raw: `StudentID\tName\tLocality\tMath\tScience
101\tDebangshu\tBarrackpore\t85\t90
102\tSusmita\tShyamnagar\t92\t95
103\tSwadeep\tIchapur\t65\t70
104\tTuhina\tNaihati\t88\t85`,
  },
];

const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("csv_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [hasIndexCol, setHasIndexCol] = useState(false);
  const [filterCols, setFilterCols] = useState(false);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  const preset = CSV_PRESETS[selectedPresetIdx];

  // Parse raw text into simulated table
  const lines = preset.raw.trim().split("\n");
  const sep = preset.delimiter;
  const rawHeaders = lines[0].split(sep);
  const rawRows = lines.slice(1).map((l) => l.split(sep));

  const headers = filterCols ? ["Name", "Math", "Science"] : rawHeaders;
  const colIndices = filterCols
    ? [rawHeaders.indexOf("Name"), rawHeaders.indexOf("Math"), rawHeaders.indexOf("Science")]
    : rawHeaders.map((_, i) => i);

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
                Topic 4 • CSV Ingestion
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-200 via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
              Reading CSV Files with pd.read_csv()
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Master the Swiss Army Knife of tabular ingestion: custom delimiters (<code className="text-teal-300 font-mono">sep</code>), row indexing (<code className="text-cyan-300 font-mono">index_col</code>), memory pruning (<code className="text-indigo-300 font-mono">usecols</code>), datetime parsing, and out-of-core streaming with <code className="text-amber-300 font-mono">chunksize</code>.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "csv_studio", label: "Interactive CSV Ingestion Studio", icon: "📄" },
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

      {/* Tab 1: Interactive CSV Ingestion Studio */}
      {activeTab === "csv_studio" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              1. Select CSV Format / Delimiter:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CSV_PRESETS.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPresetIdx(idx)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedPresetIdx === idx
                      ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/10"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{p.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Delimiter: <code className="text-teal-300">{p.delimiter === "\t" ? "\\t" : p.delimiter}</code>
                  </div>
                </button>
              ))}
            </div>

            {/* Ingestion Switches */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-800 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasIndexCol}
                  onChange={(e) => setHasIndexCol(e.target.checked)}
                  className="accent-teal-500 w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-slate-300 font-mono">index_col='StudentID'</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterCols}
                  onChange={(e) => setFilterCols(e.target.checked)}
                  className="accent-teal-500 w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-slate-300 font-mono">usecols=['Name', 'Math', 'Science']</span>
              </label>
            </div>
          </div>

          {/* Side-by-Side: Raw CSV vs Parsed DataFrame */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Raw File Buffer */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-slate-200">Raw CSV File Buffer</h4>
                <span className="text-xs font-mono text-slate-500">students.csv</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre overflow-x-auto">
                {preset.raw}
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                pd.read_csv('students.csv', sep='{preset.delimiter === "\t" ? "\\t" : preset.delimiter}'{hasIndexCol ? ", index_col='StudentID'" : ""}{filterCols ? ", usecols=['Name', 'Math', 'Science']" : ""})
              </div>
            </div>

            {/* Parsed DataFrame Output */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-teal-300">Parsed Pandas DataFrame</h4>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 font-mono rounded">
                    Shape: ({rawRows.length}, {headers.length - (hasIndexCol && !filterCols ? 1 : 0)})
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <table className="w-full text-center text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800">
                        {headers.map((h, idx) => (
                          <th key={idx} className={`p-2 ${idx === 0 && hasIndexCol ? "text-cyan-400 font-bold text-left" : "text-teal-400 font-bold"}`}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rawRows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                          {colIndices.map((cIdx, i) => (
                            <td
                              key={i}
                              className={`p-2.5 ${i === 0 && hasIndexCol ? "text-cyan-300 font-mono font-bold text-left" : "text-slate-200 bg-slate-900/40"}`}
                            >
                              {row[cIdx]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 p-3 bg-teal-950/30 border border-teal-900/60 rounded-xl text-xs text-teal-200">
                ⚡ Memory Optimization: Loading only required columns with <code className="text-white font-mono">usecols</code> reduces memory footprint by up to 90% on wide tables!
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
                CSV Ingestion Suite
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
            quote="In machine learning competitions and real-world jobs, 90% of tabular datasets start life as CSV files. Knowing how to tune pd.read_csv() parameters (like usecols for memory conservation, parse_dates for time series, na_values for dirty sentinel strings, and chunksize for multi-gigabyte files) separates true data professionals from beginners."
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

export default Topic4;
