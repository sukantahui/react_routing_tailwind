import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic17_files/01_series_apply_and_map.py?raw";
import pyCode2 from "./topic17_files/02_dataframe_apply_row_vs_col_axis.py?raw";
import pyCode3 from "./topic17_files/03_apply_vs_vectorization_benchmarks.py?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_series_apply_and_map.py",
    title: "1. Series.apply() & Series.map()",
    badge: "apply() & map()",
    code: pyCode1,
    summary: "Apply custom scalar business logic, pass keyword arguments to functions, and perform rapid dictionary category mapping.",
  },
  {
    id: "part2",
    fileName: "02_dataframe_apply_row_vs_col_axis.py",
    title: "2. DataFrame.apply() Across Rows & Columns",
    badge: "axis=0 vs axis=1",
    code: pyCode2,
    summary: "Execute multi-column row-wise logic with axis=1, compute column summaries with axis=0, and explore modern DataFrame.map().",
  },
  {
    id: "part3",
    fileName: "03_apply_vs_vectorization_benchmarks.py",
    title: "3. Vectorization vs np.where vs apply(axis=1)",
    badge: "Performance Benchmarks",
    code: pyCode3,
    summary: "Measure why pure NumPy vectorization and np.where run up to 300x faster than interpreted Python row-loops in ML pipelines.",
  },
];

const RAW_STUDENT_RECORDS = [
  { id: 101, name: "Debangshu", dept: "CSE", math: 85, sci: 90, eng: 82 },
  { id: 102, name: "Susmita",   dept: "CSE", math: 92, sci: 95, eng: 89 },
  { id: 103, name: "Swadeep",   dept: "IT",  math: 65, sci: 70, eng: 74 },
  { id: 104, name: "Tuhina",    dept: "ECE", math: 88, sci: 85, eng: 91 },
  { id: 105, name: "Sachin",    dept: "IT",  math: 78, sci: 80, eng: 76 },
  { id: 106, name: "Mahima",    dept: "CSE", math: 90, sci: 92, eng: 88 },
  { id: 107, name: "Abhronila", dept: "ECE", math: 84, sci: 88, eng: 85 },
];

const DEPT_FULL_NAMES = {
  CSE: "Computer Science & Engineering",
  IT: "Information Technology",
  ECE: "Electronics & Communication",
};

const Topic17 = () => {
  const [activeTab, setActiveTab] = useState("apply_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [activeTransformMode, setActiveTransformMode] = useState("grade_classifier");

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const getComputedRows = () => {
    return RAW_STUDENT_RECORDS.map((r) => {
      const avg = ((r.math + r.sci + r.eng) / 3).toFixed(1);
      let customResult = "";

      if (activeTransformMode === "grade_classifier") {
        if (r.math >= 90) customResult = "Distinction (O)";
        else if (r.math >= 80) customResult = "First Class (E)";
        else if (r.math >= 70) customResult = "Second Class (A)";
        else customResult = "Pass (B)";
      } else if (activeTransformMode === "dept_mapping") {
        customResult = DEPT_FULL_NAMES[r.dept] || r.dept;
      } else if (activeTransformMode === "honors_eligibility") {
        customResult = Number(avg) >= 85 && r.math >= 80 ? "Honors (Eligible)" : "Standard";
      } else if (activeTransformMode === "curved_bonus") {
        customResult = `${Math.min(r.math + 5, 100)} / 100`;
      }

      return {
        ...r,
        avg,
        customResult,
      };
    });
  };

  const computedRows = getComputedRows();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-rose-900/40 via-pink-900/30 to-slate-900/60 border border-rose-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                  Functional Transformations
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 17</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Applying Functions with apply() in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Bridge Python functions and Pandas structures. Discover how to apply custom logic across Series, calculate row-wise properties with{" "}
                <code className="text-rose-300 bg-slate-800 px-1 py-0.5 rounded">df.apply(axis=1)</code>, and master the performance hierarchy between loops and pure vectorization.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-rose-500/20">
                λ(x)
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("apply_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "apply_studio"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            ⚡ Functional Transformation Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: APPLY STUDIO */}
        {activeTab === "apply_studio" && (
          <div className="space-y-6">
            {/* Function Selector Cards */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🎛️</span> Select Applied Function / Transformation Paradigm
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: "grade_classifier",
                    title: "1. Series.apply(classify_grade)",
                    desc: "Custom Python if-elif function on Math score",
                    code: "df['Math'].apply(grade_classifier)",
                  },
                  {
                    id: "dept_mapping",
                    title: "2. Series.map(dict_lookup)",
                    desc: "Fast dictionary substitution for abbreviations",
                    code: "df['Department'].map(dept_lookup)",
                  },
                  {
                    id: "honors_eligibility",
                    title: "3. df.apply(axis=1)",
                    desc: "Multi-column cross-row boolean evaluation",
                    code: "df.apply(lambda r: check_honors(r), axis=1)",
                  },
                  {
                    id: "curved_bonus",
                    title: "4. apply(func, bonus=5)",
                    desc: "Passing positional and keyword arguments",
                    code: "df['Math'].apply(add_curved_bonus, bonus=5)",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTransformMode(item.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      activeTransformMode === item.id
                        ? "bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-500/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs text-rose-300">{item.title}</div>
                    <div className="text-[11px] text-slate-300 mt-1">{item.desc}</div>
                    <code className="text-[11px] font-mono text-teal-400 mt-2 block truncate">
                      {item.code}
                    </code>
                  </button>
                ))}
              </div>

              {/* Dynamic Python Code Preview */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-rose-300">
                <span className="text-slate-500"># Executed Python Expression:</span>
                <div className="mt-1 font-bold">
                  {activeTransformMode === "grade_classifier" &&
                    "df['Grade_Category'] = df['Math'].apply(lambda score: 'Distinction' if score >= 90 else ('First Class' if score >= 80 else 'Pass'))"}
                  {activeTransformMode === "dept_mapping" &&
                    "df['Dept_Full'] = df['Department'].map({'CSE': 'Computer Science & Engineering', 'IT': 'Information Technology', 'ECE': 'Electronics & Communication'})"}
                  {activeTransformMode === "honors_eligibility" &&
                    "df['Honors_Status'] = df.apply(lambda r: 'Honors (Eligible)' if ((r['Math']+r['Science']+r['English'])/3 >= 85 and r['Math'] >= 80) else 'Standard', axis=1)"}
                  {activeTransformMode === "curved_bonus" &&
                    "df['Curved_Math'] = df['Math'].apply(lambda s, bonus=5: min(s + bonus, 100))"}
                </div>
              </div>
            </div>

            {/* Performance Hierarchy Alert */}
            <div className="bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🚀</span>
                <div>
                  <h4 className="text-sm font-bold text-amber-300">Performance Speed Hierarchy in Pandas</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    1. <strong className="text-emerald-400">Pure Vectorization / np.where (Fastest: ~0.002s)</strong> &gt; 2.{" "}
                    <strong className="text-cyan-400">Series.apply / map (~0.05s)</strong> &gt; 3.{" "}
                    <strong className="text-rose-400">DataFrame.apply(axis=1) (Slowest: ~0.85s, 400x slower)</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Table Output */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Transformed Output DataFrame
                </h3>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                    <th className="p-3 text-slate-400">StudentID</th>
                    <th className="p-3 text-teal-300">Name</th>
                    <th className="p-3 text-cyan-300">Dept</th>
                    <th className="p-3 text-slate-300">Math</th>
                    <th className="p-3 text-slate-300">Science</th>
                    <th className="p-3 text-slate-300">English</th>
                    <th className="p-3 text-slate-400">Average</th>
                    <th className="p-3 text-rose-300 font-bold bg-rose-950/20">
                      Applied Result (New Feature)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {computedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-400">{row.id}</td>
                      <td className="p-3 text-white font-sans font-semibold">{row.name}</td>
                      <td className="p-3 text-cyan-300 font-sans">{row.dept}</td>
                      <td className="p-3 text-slate-300">{row.math}</td>
                      <td className="p-3 text-slate-300">{row.sci}</td>
                      <td className="p-3 text-slate-300">{row.eng}</td>
                      <td className="p-3 text-slate-400">{row.avg}%</td>
                      <td className="p-3 font-bold bg-rose-950/10">
                        <span className="px-2 py-0.5 rounded text-xs bg-rose-600/20 text-rose-300 border border-rose-500/30">
                          {row.customResult}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="The apply(axis=1) Trap in Machine Learning"
              text="When building preprocessing pipelines for big datasets, df.apply(..., axis=1) is notorious for destroying throughput because it iterates through each row sequentially in Python. Always test if your logic can be written with vectorized NumPy methods like np.where() or np.select(). Reserve apply() strictly for complex string parsing, regex, or calls to external NLP/vision APIs!"
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
                      ? "bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 17 Revision Notes: Applying Functions with apply()" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 17 Knowledge Check: Applying Functions with apply()" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic17;
