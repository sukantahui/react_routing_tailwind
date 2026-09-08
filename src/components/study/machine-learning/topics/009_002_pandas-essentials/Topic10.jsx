import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic10_files/01_adding_derived_columns.py?raw";
import pyCode2 from "./topic10_files/02_dropping_columns_and_rows_inplace.py?raw";
import pyCode3 from "./topic10_files/03_insert_pop_and_assign_methods.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_adding_derived_columns.py",
    title: "1. Adding Scalar & Vectorized Derived Columns",
    badge: "Bracket Assignment & np.where",
    code: pyCode1,
    summary: "Create new columns via direct assignment, constant broadcasting, vectorized multi-column arithmetic, and conditional logic with np.where().",
  },
  {
    id: "part2",
    fileName: "02_dropping_columns_and_rows_inplace.py",
    title: "2. Dropping Columns & Rows (inplace vs Pure)",
    badge: "df.drop(columns=[...])",
    code: pyCode2,
    summary: "Remove columns and rows safely with .drop(columns=[...]) or axis=1, and explore why modern Pandas favors reassignment over inplace=True.",
  },
  {
    id: "part3",
    fileName: "03_insert_pop_and_assign_methods.py",
    title: "3. Positional Insertion, Popping & .assign()",
    badge: "insert, pop, assign",
    code: pyCode3,
    summary: "Insert columns at exact integer indices with df.insert(), extract them destructively with df.pop(), and build clean pipelines with df.assign().",
  },
];

const INITIAL_RECORDS = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", math: 85, sci: 90, tempNotes: "Fee Paid", internalCode: "BKP-01" },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  math: 92, sci: 95, tempNotes: "Pending",  internalCode: "BKP-02" },
  { id: 103, name: "Swadeep",   locality: "Ichapur",      math: 65, sci: 70, tempNotes: "Fee Paid", internalCode: "BKP-03" },
  { id: 104, name: "Tuhina",    locality: "Naihati",      math: 88, sci: 85, tempNotes: "Fee Paid", internalCode: "BKP-04" },
  { id: 105, name: "Sachin",    locality: "Kolkata",      math: 78, sci: 80, tempNotes: "Pending",  internalCode: "BKP-05" },
  { id: 106, name: "Mahima",    locality: "Barrackpore", math: 90, sci: 92, tempNotes: "Fee Paid", internalCode: "BKP-06" },
  { id: 107, name: "Abhronila", locality: "Titagarh",    math: 84, sci: 88, tempNotes: "Fee Paid", internalCode: "BKP-07" },
];

const Topic10 = () => {
  const [activeTab, setActiveTab] = useState("column_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");

  // Interactive Column modifiers
  const [includeTempNotes, setIncludeTempNotes] = useState(true);
  const [includeInternalCode, setIncludeInternalCode] = useState(true);
  const [addTotalScore, setAddTotalScore] = useState(true);
  const [addPercentage, setAddPercentage] = useState(true);
  const [addGrade, setAddGrade] = useState(false);
  const [addInstitute, setAddInstitute] = useState(false);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Compute live columns and rows
  const getTransformedRows = () => {
    return INITIAL_RECORDS.map((r) => {
      const total = r.math + r.sci;
      const pct = (total / 2).toFixed(1);
      let grade = "C";
      if (pct >= 90) grade = "A+";
      else if (pct >= 80) grade = "A";
      else if (pct >= 70) grade = "B";

      return {
        ...r,
        totalScore: total,
        percentage: `${pct}%`,
        grade,
        institute: "Coder & AccoTax",
      };
    });
  };

  const visibleRows = getTransformedRows();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-slate-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                  Pandas Transformation Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 10</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Adding and Dropping Columns in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Master data shaping: create vector-derived columns, insert positionally with{" "}
                <code className="text-teal-300 bg-slate-800 px-1 py-0.5 rounded">df.insert()</code>, eliminate junk fields with{" "}
                <code className="text-teal-300 bg-slate-800 px-1 py-0.5 rounded">df.drop()</code>, and understand why modern Pandas embraces immutable method pipelines.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-700 flex items-center justify-center text-white font-mono text-2xl font-bold shadow-lg shadow-teal-500/20">
                ±Col
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("column_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "column_studio"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🎛️ Interactive Column Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz & Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: INTERACTIVE COLUMN STUDIO */}
        {activeTab === "column_studio" && (
          <div className="space-y-6">
            {/* Control Panel Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <span>⚡</span> Interactive Column Management Studio
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column Drop Controls */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-rose-900/30">
                  <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🗑️</span> Drop Columns (df.drop)
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!includeTempNotes}
                        onChange={(e) => setIncludeTempNotes(!e.target.checked)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">
                        Drop <code className="text-rose-400 font-mono">TempNotes</code> (Fee status temporary notes)
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!includeInternalCode}
                        onChange={(e) => setIncludeInternalCode(!e.target.checked)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">
                        Drop <code className="text-rose-400 font-mono">InternalCode</code> (Internal tracking IDs)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Column Add Controls */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-emerald-900/30">
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>➕</span> Add Derived Columns (df['col'] = ...)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addTotalScore}
                        onChange={(e) => setAddTotalScore(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">
                        <code className="text-emerald-400 font-mono">TotalMarks</code> (Math + Sci)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addPercentage}
                        onChange={(e) => setAddPercentage(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">
                        <code className="text-emerald-400 font-mono">Percentage</code> (Total / 2)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addGrade}
                        onChange={(e) => setAddGrade(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">
                        <code className="text-emerald-400 font-mono">Grade</code> (np.where)
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addInstitute}
                        onChange={(e) => setAddInstitute(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                      />
                      <span className="text-sm text-slate-300">
                        <code className="text-emerald-400 font-mono">Institute</code> (Scalar)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Dynamic Code Generator */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 overflow-x-auto">
                <div className="text-slate-500 mb-1 font-sans text-xs"># Executed Python Operations:</div>
                <div>{`df = raw_df.copy()`}</div>
                {(!includeTempNotes || !includeInternalCode) && (
                  <div className="text-rose-400">
                    {`df = df.drop(columns=[${[
                      !includeTempNotes ? "'TempNotes'" : null,
                      !includeInternalCode ? "'InternalCode'" : null,
                    ]
                      .filter(Boolean)
                      .join(", ")}])`}
                  </div>
                )}
                {addTotalScore && <div className="text-emerald-400">{`df['TotalMarks'] = df['Math'] + df['Science']`}</div>}
                {addPercentage && <div className="text-emerald-400">{`df['Percentage'] = df['TotalMarks'] / 2.0`}</div>}
                {addGrade && (
                  <div className="text-emerald-400">{`df['Grade'] = np.where(df['Percentage'] >= 90, 'A+', np.where(df['Percentage'] >= 80, 'A', 'B'))`}</div>
                )}
                {addInstitute && <div className="text-cyan-400">{`df['Institute'] = 'Coder & AccoTax'`}</div>}
              </div>
            </div>

            {/* Live DataFrame Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Resulting DataFrame (df.shape = ({visibleRows.length},{" "}
                  {3 +
                    (includeTempNotes ? 1 : 0) +
                    (includeInternalCode ? 1 : 0) +
                    2 +
                    (addTotalScore ? 1 : 0) +
                    (addPercentage ? 1 : 0) +
                    (addGrade ? 1 : 0) +
                    (addInstitute ? 1 : 0)}
                  ))
                </h3>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80">
                    <th className="p-3 text-slate-400 font-mono">Index</th>
                    <th className="p-3 text-teal-300 font-semibold">StudentID</th>
                    <th className="p-3 text-teal-300 font-semibold">Name</th>
                    <th className="p-3 text-teal-300 font-semibold">Locality</th>
                    {includeTempNotes && <th className="p-3 text-amber-300 font-semibold">TempNotes</th>}
                    {includeInternalCode && <th className="p-3 text-amber-300 font-semibold">InternalCode</th>}
                    <th className="p-3 text-cyan-300 font-semibold">Math</th>
                    <th className="p-3 text-cyan-300 font-semibold">Science</th>
                    {addTotalScore && <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">TotalMarks</th>}
                    {addPercentage && <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">Percentage</th>}
                    {addGrade && <th className="p-3 text-purple-400 font-bold bg-purple-950/20">Grade</th>}
                    {addInstitute && <th className="p-3 text-cyan-400 font-semibold bg-cyan-950/20">Institute</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {visibleRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-500">{idx}</td>
                      <td className="p-3 text-white font-bold">{row.id}</td>
                      <td className="p-3 text-slate-200 font-sans">{row.name}</td>
                      <td className="p-3 text-slate-300 font-sans">{row.locality}</td>
                      {includeTempNotes && <td className="p-3 text-amber-300">{row.tempNotes}</td>}
                      {includeInternalCode && <td className="p-3 text-amber-300">{row.internalCode}</td>}
                      <td className="p-3 text-cyan-300">{row.math}</td>
                      <td className="p-3 text-cyan-300">{row.sci}</td>
                      {addTotalScore && <td className="p-3 text-emerald-400 font-bold bg-emerald-950/10">{row.totalScore}</td>}
                      {addPercentage && <td className="p-3 text-emerald-400 font-bold bg-emerald-950/10">{row.percentage}</td>}
                      {addGrade && (
                        <td className="p-3 bg-purple-950/10">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            row.grade === "A+" ? "bg-purple-600/30 text-purple-300 border border-purple-500/40" :
                            row.grade === "A" ? "bg-blue-600/30 text-blue-300 border border-blue-500/40" :
                            "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                          }`}>
                            {row.grade}
                          </span>
                        </td>
                      )}
                      {addInstitute && <td className="p-3 text-cyan-300 text-xs font-sans bg-cyan-950/10">{row.institute}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Pandas Column Engineering & Immutability Patterns"
              text="In machine learning feature engineering, adding interaction terms like Total = Math + Sci and dropping extraneous identifiers like TempNotes is your bread and butter. Remember: always prefer non-destructive df.drop(columns=[...]) assignments rather than inplace=True. This keeps data pipelines pure, debuggable, and fully aligned with modern Pandas 2.x Copy-on-Write architecture!"
            />
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "python_code" && (
          <div className="space-y-6">
            {/* Script Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PYTHON_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => setSelectedScriptId(script.id)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedScriptId === script.id
                      ? "bg-teal-950/60 border-teal-500 text-white shadow-lg shadow-teal-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-1">
                    {script.badge}
                  </div>
                  <div className="font-bold text-sm text-slate-100">{script.title}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">{script.summary}</div>
                </button>
              ))}
            </div>

            {/* Active Code Viewer */}
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
            <PlainTextPrint text={noteText} title="Topic 10 Revision Notes: Adding & Dropping Columns" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 10 Knowledge Check: Adding & Dropping Columns" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic10;
