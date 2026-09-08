import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic24_files/01_raw_data_ingestion_and_cleaning.py?raw";
import pyCode2 from "./topic24_files/02_feature_engineering_and_filtering.py?raw";
import pyCode3 from "./topic24_files/03_clean_pipeline_and_multi_format_export.py?raw";
import noteText from "./topic24_files/topic24_note.txt?raw";
import questions from "./topic24_files/topic24_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_raw_data_ingestion_and_cleaning.py",
    title: "1. Raw Ingestion & Header Normalization",
    badge: "snake_case & fillna",
    code: pyCode1,
    summary: "Strip header whitespace, convert column names to standardized snake_case, and impute missing numerical and text values.",
  },
  {
    id: "part2",
    fileName: "02_feature_engineering_and_filtering.py",
    title: "2. Feature Engineering & Multi-Criteria Filter",
    badge: "Features & df.query()",
    code: pyCode2,
    summary: "Derive total score, percentage, and merit scholar indicator flags, then filter high-performing cohorts using boolean masks.",
  },
  {
    id: "part3",
    fileName: "03_clean_pipeline_and_multi_format_export.py",
    title: "3. Complete Pipeline & Multi-Format Export",
    badge: "to_csv(index=False) & gzip",
    code: pyCode3,
    summary: "Encapsulate the entire ETL workflow in a reusable production function and export to standard CSV and compressed GZIP formats.",
  },
];

const RAW_DATASET = [
  { id: 101, name: "Debangshu", dept: "CSE", math: 85, sci: 90, att: 92.5 },
  { id: 102, name: "Susmita",   dept: "CSE", math: 92, sci: 95, att: 96.0 },
  { id: 103, name: "Swadeep",   dept: "Commerce", math: null, sci: 70, att: 78.5 },
  { id: 104, name: "Tuhina",    dept: "Science", math: 88, sci: 85, att: 88.0 },
  { id: 105, name: "Sachin",    dept: "Commerce", math: 78, sci: 80, att: 82.0 },
  { id: 106, name: "Mahima",    dept: "CSE", math: 90, sci: 92, att: 94.5 },
  { id: 107, name: "Abhronila", dept: "Science", math: 84, sci: 88, att: 89.0 },
  { id: 108, name: "Debangshu", dept: "Commerce", math: 80, sci: 82, att: 85.0 },
];

const Topic24 = () => {
  const [activeTab, setActiveTab] = useState("pipeline_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [pipelineStage, setPipelineStage] = useState(4); // 1: Raw, 2: Cleaned, 3: Engineered, 4: Filtered, 5: Export

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const getStageData = () => {
    // Stage 1: Raw
    if (pipelineStage === 1) return RAW_DATASET;

    // Stage 2+: Imputed
    const stage2 = RAW_DATASET.map((r) => ({
      ...r,
      math: r.math ?? 85, // median imputation
    }));

    if (pipelineStage === 2) return stage2;

    // Stage 3+: Engineered
    const stage3 = stage2.map((r) => {
      const total = r.math + r.sci;
      const pct = Number((total / 2).toFixed(1));
      const isMerit = pct >= 88.0 && r.att >= 90.0 ? 1 : 0;
      return {
        ...r,
        total,
        pct,
        isMerit,
      };
    });

    if (pipelineStage === 3) return stage3;

    // Stage 4 & 5: Filtered (pct >= 80 and att >= 80)
    const stage4 = stage3
      .filter((r) => r.pct >= 80.0 && r.att >= 80.0)
      .sort((a, b) => b.pct - a.pct);

    return stage4;
  };

  const currentRows = getStageData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-900/40 via-emerald-900/30 to-slate-900/60 border border-teal-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                  Worked Case Study 5
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 24</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Worked Example 5: Filtering and Exporting Cleaned Data
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Build a production-grade machine learning data preprocessing pipeline. Standardize messy schema headers, impute nulls, engineer feature vectors, apply multi-criteria filtering, and export clean datasets with{" "}
                <code className="text-teal-300 bg-slate-800 px-1 py-0.5 rounded">df.to_csv(index=False)</code>.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-teal-500/20">
                ETL ⚙️
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("pipeline_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "pipeline_studio"
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🏭 5-Stage Pipeline Studio
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
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: PIPELINE STUDIO */}
        {activeTab === "pipeline_studio" && (
          <div className="space-y-6">
            {/* Step-by-Step Stage Progress Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🔄</span> Interactive Pipeline Transformation Stages
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {[
                  { num: 1, title: "1. Raw Dirty Input", sub: "Dirty headers & NaN" },
                  { num: 2, title: "2. Standardized & Imputed", sub: "snake_case & median" },
                  { num: 3, title: "3. Feature Engineering", sub: "total, pct, is_merit" },
                  { num: 4, title: "4. Multi-Filter Cohort", sub: "pct>=80 & att>=80" },
                  { num: 5, title: "5. Production Export", sub: "CSV & GZIP preview" },
                ].map((st) => (
                  <button
                    key={st.num}
                    onClick={() => setPipelineStage(st.num)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      pipelineStage === st.num
                        ? "bg-teal-950/60 border-teal-500 text-white shadow-md shadow-teal-500/20"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold text-teal-300">{st.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{st.sub}</div>
                  </button>
                ))}
              </div>

              {/* Dynamic Python Snippet for Active Stage */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                <span className="text-slate-500"># Pipeline Transformation Step {pipelineStage}:</span>
                <div className="mt-1 font-bold">
                  {pipelineStage === 1 && "df = pd.DataFrame(raw_input)"}
                  {pipelineStage === 2 &&
                    "df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_'); df['math'] = df['math'].fillna(df['math'].median())"}
                  {pipelineStage === 3 &&
                    "df['total_score'] = df['math'] + df['science']; df['percentage'] = df['total_score']/2; df['is_merit'] = np.where((df['percentage']>=88)&(df['attendance']>=90), 1, 0)"}
                  {pipelineStage === 4 &&
                    "df_clean = df.query('percentage >= 80.0 and attendance >= 80.0').sort_values('percentage', ascending=False).reset_index(drop=True)"}
                  {pipelineStage === 5 &&
                    "df_clean.to_csv('cleaned_student_features.csv', index=False, encoding='utf-8')"}
                </div>
              </div>
            </div>

            {/* Stage Output Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Stage {pipelineStage} DataFrame Output ({currentRows.length} Rows)
                </h3>
                <span className="text-xs font-mono text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800">
                  Stage {pipelineStage} Active
                </span>
              </div>

              {pipelineStage === 5 ? (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400">
                    Generated Clean CSV Content Ready for Machine Learning Training:
                  </div>
                  <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
{`student_id,name,department,math,science,attendance,total_score,percentage,is_merit
102,Susmita,CSE,92.0,95.0,96.0,187.0,93.5,1
106,Mahima,CSE,90.0,92.0,94.5,182.0,91.0,1
104,Tuhina,Science,88.0,85.0,88.0,173.0,86.5,0
107,Abhronila,Science,84.0,88.0,89.0,172.0,86.0,0
101,Debangshu,CSE,85.0,90.0,92.5,175.0,87.5,0
108,Debangshu,Commerce,80.0,82.0,85.0,162.0,81.0,0`}
                  </pre>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950/80">
                      <th className="p-3 text-slate-400">Index</th>
                      <th className="p-3 text-teal-300">
                        {pipelineStage === 1 ? "  STUDENT ID  " : "student_id"}
                      </th>
                      <th className="p-3 text-slate-300">
                        {pipelineStage === 1 ? "Candidate Name" : "name"}
                      </th>
                      <th className="p-3 text-cyan-300">
                        {pipelineStage === 1 ? "Department " : "department"}
                      </th>
                      <th className="p-3 text-slate-300">
                        {pipelineStage === 1 ? "Math (Score/100)" : "math"}
                      </th>
                      <th className="p-3 text-slate-300">
                        {pipelineStage === 1 ? "Science (Score/100)" : "science"}
                      </th>
                      <th className="p-3 text-emerald-300">
                        {pipelineStage === 1 ? "Attendance Rate (%)" : "attendance"}
                      </th>
                      {pipelineStage >= 3 && (
                        <>
                          <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">total_score</th>
                          <th className="p-3 text-emerald-400 font-bold bg-emerald-950/20">percentage</th>
                          <th className="p-3 text-purple-300 font-bold bg-purple-950/20">is_merit</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {currentRows.map((row, idx) => (
                      <tr key={row.id + row.name} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 text-slate-500">{idx}</td>
                        <td className="p-3 text-white font-bold">{row.id}</td>
                        <td className="p-3 text-slate-200 font-sans">{row.name}</td>
                        <td className="p-3 text-cyan-300 font-sans">{row.dept}</td>
                        <td className="p-3">
                          {row.math === null ? (
                            <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                              NaN
                            </span>
                          ) : (
                            <span className="text-slate-200">{row.math}</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-200">{row.sci}</td>
                        <td className="p-3 text-emerald-400">{row.att}%</td>
                        {pipelineStage >= 3 && (
                          <>
                            <td className="p-3 text-emerald-400 font-bold bg-emerald-950/10">
                              {row.total}
                            </td>
                            <td className="p-3 text-emerald-400 font-bold bg-emerald-950/10">
                              {row.pct}%
                            </td>
                            <td className="p-3 bg-purple-950/10">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-bold ${
                                  row.isMerit === 1
                                    ? "bg-purple-600/30 text-purple-300 border border-purple-500/40"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                {row.isMerit === 1 ? "1 (Scholar)" : "0"}
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="From Raw Logs to ML Feature Matrices"
              text="This 5-stage workflow represents the standard industry data engineering lifecycle! By wrapping header normalization, statistical imputation, vectorized feature generation, and cohort filtering into a clean, reproducible Python pipeline, we transform noisy, unstructured CSVs into a pristine training matrix ready for Scikit-Learn or PyTorch!"
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
            <PlainTextPrint text={noteText} title="Topic 24 Revision Notes: Worked Example 5" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 24 Knowledge Check: Worked Example 5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic24;
