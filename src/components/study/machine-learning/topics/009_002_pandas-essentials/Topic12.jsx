import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic12_files/01_rename_dictionary_mapping.py?raw";
import pyCode2 from "./topic12_files/02_string_methods_and_bulk_renaming.py?raw";
import pyCode3 from "./topic12_files/03_prefix_suffix_and_set_axis.py?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_rename_dictionary_mapping.py",
    title: "1. Selective Dictionary Mapping (df.rename)",
    badge: "df.rename(columns={...})",
    code: pyCode1,
    summary: "Selectively rename targeted columns and row index labels using dictionaries without mutating untouched fields.",
  },
  {
    id: "part2",
    fileName: "02_string_methods_and_bulk_renaming.py",
    title: "2. Vectorized String Cleaning (.str.lower, .replace)",
    badge: "df.columns.str",
    code: pyCode2,
    summary: "Strip messy whitespace, sanitize special characters, and convert messy column names into standardized snake_case.",
  },
  {
    id: "part3",
    fileName: "03_prefix_suffix_and_set_axis.py",
    title: "3. add_prefix, add_suffix & set_axis",
    badge: "add_prefix & set_axis",
    code: pyCode3,
    summary: "Namespace features prior to multi-table joins using add_prefix/add_suffix and execute fluent pipeline chaining with set_axis.",
  },
];

const RAW_STUDENT_RECORDS = [
  { id: 101, name: "Debangshu", loc: "Barrackpore", math: 85, sci: 90 },
  { id: 102, name: "Susmita",   loc: "Shyamnagar",  math: 92, sci: 95 },
  { id: 103, name: "Swadeep",   loc: "Ichapur",      math: 65, sci: 70 },
  { id: 104, name: "Tuhina",    loc: "Naihati",      math: 88, sci: 85 },
  { id: 105, name: "Sachin",    loc: "Kolkata",      math: 78, sci: 80 },
  { id: 106, name: "Mahima",    loc: "Barrackpore", math: 90, sci: 92 },
  { id: 107, name: "Abhronila", loc: "Titagarh",    math: 84, sci: 88 },
];

const NAMING_PRESETS = [
  {
    id: "raw",
    label: "1. Raw Messy Headers",
    cols: ["  STUD_ID  ", "Student & Full Name", "Locality / Town", "Math (Score/100)", "Science (Pct %)"],
    code: "# Original dirty columns with whitespace and special symbols\ndf.columns",
  },
  {
    id: "snake_case",
    label: "2. Standard snake_case (ML Best Practice)",
    cols: ["student_id", "full_name", "locality_town", "math_score", "science_pct"],
    code: "df.columns = (df.columns.str.strip().str.lower()\n    .str.replace(' & ', '_and_')\n    .str.replace(' / ', '_')\n    .str.replace(' ', '_'))",
  },
  {
    id: "pascal_case",
    label: "3. PascalCase / Dictionary Map",
    cols: ["StudentID", "StudentName", "Locality", "MathScore", "ScienceScore"],
    code: "df = df.rename(columns={\n    'stud_id': 'StudentID',\n    'full_name': 'StudentName',\n    'math': 'MathScore',\n    'sci': 'ScienceScore'\n})",
  },
  {
    id: "uppercase",
    label: "4. UPPERCASE",
    cols: ["STUDENT_ID", "FULL_NAME", "LOCALITY", "MATH_SCORE", "SCIENCE_SCORE"],
    code: "df = df.rename(columns=str.upper)",
  },
  {
    id: "prefix_term1",
    label: "5. Prefix Namespaced (add_prefix)",
    cols: ["Term1_ID", "Term1_Name", "Term1_Locality", "Term1_Math", "Term1_Science"],
    code: "df = df.add_prefix('Term1_')",
  },
];

const Topic12 = () => {
  const [activeTab, setActiveTab] = useState("rename_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [activePresetId, setActivePresetId] = useState("snake_case");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  const activePreset = NAMING_PRESETS.find((p) => p.id === activePresetId) || NAMING_PRESETS[1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-slate-900/60 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                  Schema Normalization
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 12</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Renaming Columns in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Transform clumsy raw column headers into clean, Pythonic identifiers. Master{" "}
                <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">df.rename()</code>, vectorized string transformations on{" "}
                <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">df.columns.str</code>, and table namespacing with{" "}
                <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">add_prefix()</code>.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-cyan-500/20">
                A→B
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("rename_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "rename_studio"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🏷️ Header Renaming Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz & Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: RENAMING STUDIO */}
        {activeTab === "rename_studio" && (
          <div className="space-y-6">
            {/* Header Preset Switcher */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚡</span> Select Naming Standard / Transformation Mode
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {NAMING_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePresetId(preset.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      activePresetId === preset.id
                        ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs text-cyan-300">{preset.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono truncate">
                      {preset.cols[0]}, {preset.cols[1]}...
                    </div>
                  </button>
                ))}
              </div>

              {/* Code Snippet Box */}
              <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1 font-sans"># Corresponding Pandas Transformation Code:</div>
                <pre className="font-mono text-xs text-cyan-300 whitespace-pre-wrap">{activePreset.code}</pre>
              </div>
            </div>

            {/* Live Table Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Transformed DataFrame Preview
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
                  Active Style: {activePreset.label}
                </span>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80">
                    <th className="p-3 text-slate-400 font-mono">Index</th>
                    <th className="p-3 text-cyan-300 font-mono font-bold bg-cyan-950/20">{activePreset.cols[0]}</th>
                    <th className="p-3 text-cyan-300 font-mono font-bold bg-cyan-950/20">{activePreset.cols[1]}</th>
                    <th className="p-3 text-cyan-300 font-mono font-bold bg-cyan-950/20">{activePreset.cols[2]}</th>
                    <th className="p-3 text-cyan-300 font-mono font-bold bg-cyan-950/20">{activePreset.cols[3]}</th>
                    <th className="p-3 text-cyan-300 font-mono font-bold bg-cyan-950/20">{activePreset.cols[4]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {RAW_STUDENT_RECORDS.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-500">{idx}</td>
                      <td className="p-3 text-white font-bold">{row.id}</td>
                      <td className="p-3 text-slate-200 font-sans">{row.name}</td>
                      <td className="p-3 text-slate-300 font-sans">{row.loc}</td>
                      <td className="p-3 text-cyan-300">{row.math}</td>
                      <td className="p-3 text-cyan-300">{row.sci}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Schema Cleaning & Downstream ML Compatibility"
              text="Never build machine learning pipelines with columns containing spaces, parentheses, or uppercase letters like 'Math (Score / 100)'. Such headers break dot-notation (df.math_score), fail inside pd.query(), and trigger errors when exporting to Parquet, SQL databases, or PySpark. Always clean headers first with df.columns = df.columns.str.lower().str.replace(' ', '_')!"
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
                      ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 12 Revision Notes: Renaming Columns" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 12 Knowledge Check: Renaming Columns" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic12;
