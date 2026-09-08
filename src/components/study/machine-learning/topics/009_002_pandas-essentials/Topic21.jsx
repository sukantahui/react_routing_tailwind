import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic21_files/01_detect_profile_salary_nulls.py?raw";
import pyCode2 from "./topic21_files/02_evaluate_imputation_strategies.py?raw";
import pyCode3 from "./topic21_files/03_imputation_pipeline_and_audit.py?raw";
import noteText from "./topic21_files/topic21_note.txt?raw";
import questions from "./topic21_files/topic21_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_detect_profile_salary_nulls.py",
    title: "1. Missing Salary Profiling & Cohort Rates",
    badge: "Null Audit & Subsets",
    code: pyCode1,
    summary: "Audit missing base salary rates across departments and isolate affected employee records in the corporate payroll dataset.",
  },
  {
    id: "part2",
    fileName: "02_evaluate_imputation_strategies.py",
    title: "2. Global Mean vs Median vs Group Median",
    badge: "Imputation Comparison",
    code: pyCode2,
    summary: "Evaluate the skewness risk of global mean imputation and test department-specific median imputation using groupby().transform().",
  },
  {
    id: "part3",
    fileName: "03_imputation_pipeline_and_audit.py",
    title: "3. ML Imputation Pipeline & Missing Indicator",
    badge: "MissingIndicator & Pipeline",
    code: pyCode3,
    summary: "Construct a robust production pipeline with binary missing indicator features (Salary_Was_Missing) and derived compensation metrics.",
  },
];

const RAW_PAYROLL = [
  { id: 1001, name: "Debangshu", dept: "Engineering", exp: 2, salary: 55000, bonus: 10 },
  { id: 1002, name: "Susmita",   dept: "Engineering", exp: 5, salary: 85000, bonus: 15 },
  { id: 1003, name: "Swadeep",   dept: "Sales",       exp: 1, salary: null,  bonus: 8 },
  { id: 1004, name: "Tuhina",    dept: "HR",          exp: 4, salary: 52000, bonus: 5 },
  { id: 1005, name: "Sachin",    dept: "Sales",       exp: 3, salary: 48000, bonus: 12 },
  { id: 1006, name: "Mahima",    dept: "Engineering", exp: 6, salary: 92000, bonus: 15 },
  { id: 1007, name: "Abhronila", dept: "HR",          exp: 2, salary: null,  bonus: 5 },
  { id: 1008, name: "Aniket",    dept: "Engineering", exp: 8, salary: 120000, bonus: 20 },
  { id: 1009, name: "Priyanka",  dept: "Sales",       exp: 4, salary: null,  bonus: 10 },
  { id: 1010, name: "Sourav",    dept: "HR",          exp: 1, salary: 42000, bonus: 5 },
];

const DEPT_MEDIANS = {
  Engineering: 88500,
  Sales: 48000,
  HR: 47000,
};

const GLOBAL_MEAN = 70571;
const GLOBAL_MEDIAN = 55000;

const Topic21 = () => {
  const [activeTab, setActiveTab] = useState("salary_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [strategy, setStrategy] = useState("group_median"); // 'raw', 'global_mean', 'global_median', 'group_median'
  const [showIndicator, setShowIndicator] = useState(true);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const getProcessedPayroll = () => {
    return RAW_PAYROLL.map((r) => {
      const isMissing = r.salary === null;
      let imputedSalary = r.salary;

      if (isMissing) {
        if (strategy === "global_mean") imputedSalary = GLOBAL_MEAN;
        else if (strategy === "global_median") imputedSalary = GLOBAL_MEDIAN;
        else if (strategy === "group_median") imputedSalary = DEPT_MEDIANS[r.dept];
      }

      const totalComp =
        imputedSalary !== null ? Math.round(imputedSalary * (1 + r.bonus / 100)) : null;

      return {
        ...r,
        isMissing,
        imputedSalary,
        totalComp,
      };
    });
  };

  const processedRows = getProcessedPayroll();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900/60 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Worked Case Study 2
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 21</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Worked Example 2: Handling Missing Salary Values
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Solve real-world corporate payroll missing data challenges. Compare global mean versus cohort-specific median imputation, avoid wage distortion, and build missing indicator features for ML estimators.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-emerald-500/20">
                ₹ NaN
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("salary_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "salary_studio"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            💼 Salary Imputation Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: SALARY STUDIO */}
        {activeTab === "salary_studio" && (
          <div className="space-y-6">
            {/* Strategy Selector Panel */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚙️</span> Choose Imputation Strategy for Base_Salary
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: "raw",
                    title: "1. Raw Records",
                    desc: "Show original missing NaNs as is",
                    val: "3 NaNs present",
                  },
                  {
                    id: "global_mean",
                    title: "2. Global Mean",
                    desc: "df['Salary'].fillna(df['Salary'].mean())",
                    val: "₹70,571 (Distorted by Eng)",
                  },
                  {
                    id: "global_median",
                    title: "3. Global Median",
                    desc: "df['Salary'].fillna(df['Salary'].median())",
                    val: "₹55,000 (General)",
                  },
                  {
                    id: "group_median",
                    title: "4. Group Median (Best)",
                    desc: "df.groupby('Dept')['Salary'].transform('median')",
                    val: "Eng: ₹88.5k | Sales: ₹48k | HR: ₹47k",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStrategy(item.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      strategy === item.id
                        ? "bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs text-emerald-300">{item.title}</div>
                    <div className="text-[11px] text-slate-300 mt-1 font-mono truncate">{item.desc}</div>
                    <div className="text-[11px] font-mono text-teal-400 mt-2">{item.val}</div>
                  </button>
                ))}
              </div>

              {/* Indicator Feature Checkbox */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={showIndicator}
                    onChange={(e) => setShowIndicator(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700"
                  />
                  <span>
                    Include <code className="text-teal-300 font-mono">Salary_Was_Missing</code> Boolean Feature (ML Best Practice)
                  </span>
                </label>
                <span className="text-xs font-mono text-slate-500">
                  Active Strategy: <span className="text-emerald-400 font-bold">{strategy}</span>
                </span>
              </div>
            </div>

            {/* Imputation Table Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Cleaned Payroll Table (10 Employees)
                </h3>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                    <th className="p-3 text-slate-400">EmpID</th>
                    <th className="p-3 text-teal-300">Name</th>
                    <th className="p-3 text-cyan-300">Department</th>
                    <th className="p-3 text-slate-300">Experience</th>
                    <th className="p-3 text-emerald-300 font-bold bg-emerald-950/20">Base Salary (₹)</th>
                    {showIndicator && (
                      <th className="p-3 text-amber-300 font-mono font-bold bg-amber-950/20">
                        Salary_Was_Missing
                      </th>
                    )}
                    <th className="p-3 text-purple-300 font-bold">Total Compensation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {processedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-400">{row.id}</td>
                      <td className="p-3 text-white font-sans font-semibold">{row.name}</td>
                      <td className="p-3 text-cyan-300 font-sans">{row.dept}</td>
                      <td className="p-3 text-slate-300">{row.exp} yrs</td>
                      <td className="p-3">
                        {row.isMissing ? (
                          strategy === "raw" ? (
                            <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                              NaN (Missing)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-xs bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold">
                              ₹{row.imputedSalary.toLocaleString()} (Imputed)
                            </span>
                          )
                        ) : (
                          <span className="text-slate-200">₹{row.salary.toLocaleString()}</span>
                        )}
                      </td>
                      {showIndicator && (
                        <td className="p-3 bg-amber-950/10">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-bold ${
                              row.isMissing
                                ? "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {row.isMissing ? "1 (True)" : "0"}
                          </span>
                        </td>
                      )}
                      <td className="p-3 text-purple-300 font-bold">
                        {row.totalComp !== null ? `₹${row.totalComp.toLocaleString()}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Why Cohort Median Trumps Global Mean in Salary Imputation"
              text="Look at Swadeep (Sales) and Abhronila (HR). Imputing them with the global mean of ₹70,571 would give a Sales junior an unrealistic wage boosted by Engineering team salaries! By applying df.groupby('Department')['Salary'].transform('median'), Swadeep receives ₹48,000 and Abhronila receives ₹47,000—perfectly matching their peer cohorts. Adding the Salary_Was_Missing flag ensures machine learning algorithms preserve data provenance!"
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
                      ? "bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 21 Revision Notes: Worked Example 2" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 21 Knowledge Check: Worked Example 2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic21;
