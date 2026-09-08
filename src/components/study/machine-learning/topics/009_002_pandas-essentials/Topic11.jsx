import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic11_files/01_detecting_nulls_isnull_isna.py?raw";
import pyCode2 from "./topic11_files/02_dropping_nulls_dropna_axis_thresh.py?raw";
import pyCode3 from "./topic11_files/03_imputing_nulls_fillna_mean_ffill.py?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_detecting_nulls_isnull_isna.py",
    title: "1. Detecting & Profiling Missing Values",
    badge: "isna(), isnull(), sum()",
    code: pyCode1,
    summary: "Identify missing data patterns using isna()/isnull() aliases, compute column-wise null counts and missing percentages.",
  },
  {
    id: "part2",
    fileName: "02_dropping_nulls_dropna_axis_thresh.py",
    title: "2. Removing Missing Data with dropna()",
    badge: "dropna(how, subset, thresh)",
    code: pyCode2,
    summary: "Fine-tune deletion strategies with subset parameters, non-null thresholds (thresh=k), and axis dimension controls.",
  },
  {
    id: "part3",
    fileName: "03_imputing_nulls_fillna_mean_ffill.py",
    title: "3. Imputing Values (Mean, Median, ffill)",
    badge: "fillna(), mean/median, ffill",
    code: pyCode3,
    summary: "Fill missing categorical/numeric values using constants, statistical measures (mean/median), forward/backward fill, and dictionary maps.",
  },
];

const RAW_STUDENT_DATA = [
  { id: 101, name: "Debangshu", locality: "Barrackpore", math: 85, sci: 90, scholarship: 1200 },
  { id: 102, name: "Susmita",   locality: "Shyamnagar",  math: 92, sci: null, scholarship: 1500 },
  { id: 103, name: "Swadeep",   locality: null,          math: null, sci: 70, scholarship: null },
  { id: 104, name: "Tuhina",    locality: "Naihati",      math: 88, sci: 85, scholarship: null },
  { id: 105, name: "Sachin",    locality: "Kolkata",      math: 78, sci: 80, scholarship: 800 },
  { id: 106, name: "Mahima",    locality: "Barrackpore", math: null, sci: 92, scholarship: 1500 },
  { id: 107, name: "Abhronila", locality: null,          math: 84, sci: 88, scholarship: null },
];

const Topic11 = () => {
  const [activeTab, setActiveTab] = useState("missing_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [cleaningStrategy, setCleaningStrategy] = useState("raw");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Calculate stats for imputation
  const validMath = RAW_STUDENT_DATA.map((r) => r.math).filter((v) => v !== null);
  const mathMean = (validMath.reduce((a, b) => a + b, 0) / validMath.length).toFixed(1);

  const validSci = RAW_STUDENT_DATA.map((r) => r.sci).filter((v) => v !== null).sort((a, b) => a - b);
  const sciMedian = validSci[Math.floor(validSci.length / 2)];

  // Compute transformed view based on strategy
  const getProcessedData = () => {
    switch (cleaningStrategy) {
      case "dropna_any":
        return RAW_STUDENT_DATA.filter(
          (r) => r.locality !== null && r.math !== null && r.sci !== null && r.scholarship !== null
        );
      case "dropna_marks":
        return RAW_STUDENT_DATA.filter((r) => r.math !== null && r.sci !== null);
      case "fillna_stats":
        return RAW_STUDENT_DATA.map((r) => ({
          ...r,
          locality: r.locality || "Not Specified",
          math: r.math ?? Number(mathMean),
          sci: r.sci ?? sciMedian,
          scholarship: r.scholarship ?? 0,
        }));
      case "ffill": {
        let lastLoc = "Unknown";
        let lastMath = 80;
        let lastSci = 80;
        let lastSch = 0;
        return RAW_STUDENT_DATA.map((r) => {
          if (r.locality !== null) lastLoc = r.locality;
          if (r.math !== null) lastMath = r.math;
          if (r.sci !== null) lastSci = r.sci;
          if (r.scholarship !== null) lastSch = r.scholarship;
          return {
            ...r,
            locality: r.locality ?? lastLoc,
            math: r.math ?? lastMath,
            sci: r.sci ?? lastSci,
            scholarship: r.scholarship ?? lastSch,
          };
        });
      }
      case "raw":
      default:
        return RAW_STUDENT_DATA;
    }
  };

  const displayedRows = getProcessedData();

  // Summary counts of missing values
  const countNulls = (key) => RAW_STUDENT_DATA.filter((r) => r[key] === null).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-900/40 via-orange-900/30 to-slate-900/60 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  Pandas Data Cleaning
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 11</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Handling Missing Values: isnull(), fillna(), dropna()
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Tackle incomplete datasets with surgical precision. Profile missing rates, evaluate deletion versus imputation trade-offs, and master central tendency and forward filling in ML pipelines.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-amber-500/20">
                NaN?
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("missing_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "missing_studio"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧹 Missing Values Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz & Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: MISSING VALUES STUDIO */}
        {activeTab === "missing_studio" && (
          <div className="space-y-6">
            {/* Missing Value Profiler Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Locality Nulls</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                  {countNulls("locality")} / 7{" "}
                  <span className="text-xs text-slate-500 font-sans">
                    ({((countNulls("locality") / 7) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Math Nulls</div>
                <div className="text-xl font-bold text-rose-400 font-mono mt-1">
                  {countNulls("math")} / 7{" "}
                  <span className="text-xs text-slate-500 font-sans">
                    ({((countNulls("math") / 7) * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-mono">Mean = {mathMean}</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Science Nulls</div>
                <div className="text-xl font-bold text-rose-400 font-mono mt-1">
                  {countNulls("sci")} / 7{" "}
                  <span className="text-xs text-slate-500 font-sans">
                    ({((countNulls("sci") / 7) * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-mono">Median = {sciMedian}</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400">Scholarship Nulls</div>
                <div className="text-xl font-bold text-purple-400 font-mono mt-1">
                  {countNulls("scholarship")} / 7{" "}
                  <span className="text-xs text-slate-500 font-sans">
                    ({((countNulls("scholarship") / 7) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Strategy Selector */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚙️</span> Choose Cleaning / Imputation Strategy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { id: "raw", label: "1. Raw Data", desc: "Show original NaN values as is", code: "df" },
                  { id: "dropna_any", label: "2. dropna()", desc: "Drop rows with ANY NaN (how='any')", code: "df.dropna()" },
                  { id: "dropna_marks", label: "3. dropna(subset)", desc: "Drop only if Math/Sci missing", code: "df.dropna(subset=['Math','Sci'])" },
                  { id: "fillna_stats", label: "4. fillna(Stats)", desc: "Impute Mean, Median & 0", code: "df.fillna({'Math': mean, ...})" },
                  { id: "ffill", label: "5. ffill()", desc: "Forward fill previous valid value", code: "df.ffill()" },
                ].map((strat) => (
                  <button
                    key={strat.id}
                    onClick={() => setCleaningStrategy(strat.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      cleaningStrategy === strat.id
                        ? "bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs text-amber-300">{strat.label}</div>
                    <div className="text-xs text-slate-300 mt-1">{strat.desc}</div>
                    <code className="text-[11px] text-teal-400 font-mono block mt-2">{strat.code}</code>
                  </button>
                ))}
              </div>
            </div>

            {/* Resulting Table View */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Cleaned DataFrame Output ({displayedRows.length} rows remaining)
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Strategy: <span className="text-amber-300">{cleaningStrategy}</span>
                </span>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80">
                    <th className="p-3 text-slate-400 font-mono">Index</th>
                    <th className="p-3 text-teal-300 font-semibold">StudentID</th>
                    <th className="p-3 text-teal-300 font-semibold">Name</th>
                    <th className="p-3 text-amber-300 font-semibold">Locality</th>
                    <th className="p-3 text-cyan-300 font-semibold">Math Score</th>
                    <th className="p-3 text-cyan-300 font-semibold">Science Score</th>
                    <th className="p-3 text-purple-300 font-semibold">Scholarship (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {displayedRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-500">{idx}</td>
                      <td className="p-3 text-white font-bold">{row.id}</td>
                      <td className="p-3 text-slate-200 font-sans">{row.name}</td>
                      <td className="p-3 font-sans">
                        {row.locality === null ? (
                          <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800 font-mono">
                            NaN
                          </span>
                        ) : row.locality === "Not Specified" ? (
                          <span className="text-amber-400 italic font-sans">{row.locality}</span>
                        ) : (
                          <span className="text-slate-300 font-sans">{row.locality}</span>
                        )}
                      </td>
                      <td className="p-3">
                        {row.math === null ? (
                          <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        ) : (
                          <span className={cleaningStrategy === "fillna_stats" && RAW_STUDENT_DATA.find((r) => r.id === row.id)?.math === null ? "text-emerald-400 font-bold" : "text-cyan-300"}>
                            {row.math}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {row.sci === null ? (
                          <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        ) : (
                          <span className={cleaningStrategy === "fillna_stats" && RAW_STUDENT_DATA.find((r) => r.id === row.id)?.sci === null ? "text-emerald-400 font-bold" : "text-cyan-300"}>
                            {row.sci}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {row.scholarship === null ? (
                          <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        ) : (
                          <span className={cleaningStrategy === "fillna_stats" && RAW_STUDENT_DATA.find((r) => r.id === row.id)?.scholarship === null ? "text-purple-400 italic" : "text-purple-300"}>
                            ₹{row.scholarship}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Machine Learning Missing Data & Leakage Safeguards"
              text="In machine learning preprocessing, missing data handling is the most frequent source of silent failure! Always check df.isna().sum() first. If you drop rows blindly with dropna(), you might discard 40% of your training examples. If you impute with mean/median, make sure you compute that statistic SOLELY from the training partition to avoid data leakage into validation/test splits!"
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
                      ? "bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 11 Revision Notes: Missing Values in Pandas" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 11 Knowledge Check: Handling Missing Values" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic11;
