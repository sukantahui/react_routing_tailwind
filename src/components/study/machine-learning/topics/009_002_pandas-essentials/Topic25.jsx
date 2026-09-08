import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic25_files/01_practice_problems_part1.py?raw";
import pyCode2 from "./topic25_files/02_practice_problems_part2.py?raw";
import pyCode3 from "./topic25_files/03_practice_problems_part3.py?raw";
import noteText from "./topic25_files/topic25_note.txt?raw";
import questions from "./topic25_files/topic25_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_practice_problems_part1.py",
    title: "1. Problems 1 & 2 (Filtering & Imputation)",
    badge: "Problems 1 & 2",
    code: pyCode1,
    summary: "Solutions for multi-criteria candidate filtering, leaderboard generation, and group-specific median salary imputation.",
  },
  {
    id: "part2",
    fileName: "02_practice_problems_part2.py",
    title: "2. Problems 3 & 4 (Pivots & Reconciliation)",
    badge: "Problems 3 & 4",
    code: pyCode2,
    summary: "Solutions for multi-dimensional pivot tables with marginal totals and relational discrepancy audits with indicator tags.",
  },
  {
    id: "part3",
    fileName: "03_practice_problems_part3.py",
    title: "3. Problem 5 (Top-K Pipeline & GZIP Export)",
    badge: "Problem 5",
    code: pyCode3,
    summary: "Complete pipeline solution for calculating composite scores and extracting top-K performers via heap algorithms.",
  },
];

const PROBLEMS = [
  {
    id: 1,
    title: "Challenge 1: Multi-Criteria Filter & Leaderboard",
    difficulty: "Medium",
    desc: "Given a student examination DataFrame, compute TotalMarks and Average score. Filter students who scored Average >= 85% AND Attendance >= 90%. Sort by Average descending and create a 1-based Rank index.",
    hint: "Use df.assign() for vectorized arithmetic, df.query() with backtick-escaped column names (`Attendance_%`), and sort_values(by='Average', ascending=False).",
    solutionCode: `df.assign(
    TotalMarks=lambda x: x["Math"] + x["Science"],
    Average=lambda x: x["TotalMarks"] / 2.0
).query("Average >= 85.0 and \`Attendance_%\` >= 90.0")
.sort_values(by="Average", ascending=False)
.reset_index(drop=True)`,
  },
  {
    id: 2,
    title: "Challenge 2: Group-Median Imputation with Missing Indicator",
    difficulty: "Medium-Hard",
    desc: "In an employee payroll dataset with missing salaries, create a binary feature 'Salary_Was_Missing' (1 if null, 0 otherwise) and impute missing Base_Salary with the median salary of the employee's specific Department.",
    hint: "Create the indicator with df['Salary'].isna().astype(int), then use df.groupby('Dept')['Salary'].transform('median') inside fillna().",
    solutionCode: `df["Salary_Was_Missing"] = df["Salary"].isna().astype(int)
dept_medians = df.groupby("Dept")["Salary"].transform("median")
df["Cleaned_Salary"] = df["Salary"].fillna(dept_medians)`,
  },
  {
    id: 3,
    title: "Challenge 3: Regional Pivot Table with Margin Totals",
    difficulty: "Medium",
    desc: "Reshape a transactional sales log into a 2D matrix of Total Revenue with 'Region' as row index, 'Product' as column headers, 0 for missing pairs, and automatic row/column grand totals.",
    hint: "Call pd.pivot_table(df, values='Revenue', index='Region', columns='Product', aggfunc='sum', fill_value=0, margins=True, margins_name='Grand_Total').",
    solutionCode: `pd.pivot_table(
    sales,
    values="Revenue",
    index="Region",
    columns="Product",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="Total"
)`,
  },
  {
    id: 4,
    title: "Challenge 4: Relational Discrepancy & Lineage Audit",
    difficulty: "Hard",
    desc: "Merge candidate registration records with online test submissions to identify two lists: (A) Registered candidates who missed the test, and (B) Unregistered walk-in test takers.",
    hint: "Use pd.merge(registered, submitted, on='CandidateID', how='outer', indicator=True). Filter by _merge == 'left_only' and _merge == 'right_only'.",
    solutionCode: `audit = pd.merge(registered, submitted, on="CandidateID", how="outer", indicator=True)
absentees = audit[audit["_merge"] == "left_only"][["CandidateID", "Name"]]
walkins = audit[audit["_merge"] == "right_only"][["CandidateID", "Score"]]`,
  },
  {
    id: 5,
    title: "Challenge 5: Production Pipeline & Heap Top-K Extraction",
    difficulty: "Hard",
    desc: "Build a pure Python pipeline function that ingests raw score dictionaries, computes a weighted composite score (0.4 * Test1 + 0.6 * Test2), and extracts the Top-K candidates in O(N log K) time.",
    hint: "Standardize columns with df.columns.str.lower(), compute composite score, and call df.nlargest(top_k, 'composite_score').",
    solutionCode: `def etl_pipeline(data_dict, top_k=3):
    df = pd.DataFrame(data_dict)
    df.columns = df.columns.str.lower().str.replace(" ", "_")
    df["composite_score"] = (df["test_1"] * 0.4) + (df["test_2"] * 0.6)
    return df.nlargest(n=top_k, columns="composite_score").reset_index(drop=True)`,
  },
];

const Topic25 = () => {
  const [activeTab, setActiveTab] = useState("challenges_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [selectedProblemId, setSelectedProblemId] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  const activeProblem = PROBLEMS.find((p) => p.id === selectedProblemId) || PROBLEMS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-900/40 via-amber-900/30 to-slate-900/60 border border-orange-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full">
                  Applied Challenges
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 25</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Practice Problems in Pandas Essentials
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Test and solidify your core data manipulation skills. Solve five comprehensive industrial challenges covering multi-criteria filtering, group median imputation, pivot tables, outer reconciliation audits, and heap-based top-K pipelines.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-orange-500/20">
                🎯 Code
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("challenges_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "challenges_studio"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🎯 Practice Challenge Console
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: CHALLENGES STUDIO */}
        {activeTab === "challenges_studio" && (
          <div className="space-y-6">
            {/* Problem Selector Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {PROBLEMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProblemId(p.id);
                    setShowHint(false);
                    setShowSolution(false);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedProblemId === p.id
                      ? "bg-orange-950/60 border-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-orange-400">P-{p.id}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        p.difficulty === "Medium"
                          ? "bg-blue-950 text-blue-300 border border-blue-800"
                          : "bg-purple-950 text-purple-300 border border-purple-800"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">{p.title.split(":")[1]}</div>
                </button>
              ))}
            </div>

            {/* Active Problem Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                    {activeProblem.difficulty} Difficulty &bull; Problem {activeProblem.id} of {PROBLEMS.length}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{activeProblem.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-amber-300 border border-amber-500/30 hover:bg-slate-700 transition-all"
                  >
                    💡 {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-600 text-white shadow-md hover:bg-orange-500 transition-all"
                  >
                    🔑 {showSolution ? "Hide Solution" : "Reveal Solution"}
                  </button>
                </div>
              </div>

              {/* Problem Description */}
              <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <p>{activeProblem.desc}</p>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 text-xs text-amber-200 leading-relaxed">
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    <span>💡</span> Implementation Hint:
                  </div>
                  {activeProblem.hint}
                </div>
              )}

              {/* Solution Code Box */}
              {showSolution && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>✓</span> Verified Python / Pandas Solution:
                  </div>
                  <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
                    {activeProblem.solutionCode}
                  </pre>
                </div>
              )}
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Algorithmic Thinking in Pandas Problem Solving"
              text="When tackling complex Pandas problems, decompose the problem into modular stages: (1) Vectorized calculations, (2) Clean group aggregations or transforms, and (3) Boolean filtering. Strive to write clean, fluent method chains that read like English prose without clumsy intermediate variables!"
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
                      ? "bg-orange-950/60 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 25 Revision Notes: Practice Problems" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 25 Knowledge Check: Practice Problems" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic25;
