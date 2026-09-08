import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic23_files/01_admissions_test_inner_left_merge.py?raw";
import pyCode2 from "./topic23_files/02_diagnosing_unmatched_outer_merge.py?raw";
import pyCode3 from "./topic23_files/03_merging_with_cardinality_and_clean_export.py?raw";
import noteText from "./topic23_files/topic23_note.txt?raw";
import questions from "./topic23_files/topic23_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_admissions_test_inner_left_merge.py",
    title: "1. Key Matching: Inner & Left Joins",
    badge: "left_on / right_on",
    code: pyCode1,
    summary: "Merge student registration databases with online assessment test logs using inner and left relational joins.",
  },
  {
    id: "part2",
    fileName: "02_diagnosing_unmatched_outer_merge.py",
    title: "2. Discrepancy Audits with indicator=True",
    badge: "Outer Join & _merge",
    code: pyCode2,
    summary: "Reconcile discrepancies using full outer joins with merge indicator tags to isolate absentees (left_only) and walk-in candidates (right_only).",
  },
  {
    id: "part3",
    fileName: "03_merging_with_cardinality_and_clean_export.py",
    title: "3. Cardinality Validation (validate='1:1')",
    badge: "validate='1:1' & Suffixes",
    code: pyCode3,
    summary: "Enforce strict one-to-one merge validation, disambiguate conflicting batch codes with suffixes, and derive qualification status.",
  },
];

const ADMISSIONS_DATA = [
  { regno: "REG-101", name: "Debangshu", course: "Python ML", locality: "Barrackpore" },
  { regno: "REG-102", name: "Susmita",   course: "Python ML", locality: "Shyamnagar" },
  { regno: "REG-103", name: "Swadeep",   course: "Data Science", locality: "Ichapur" },
  { regno: "REG-104", name: "Tuhina",    course: "Python ML", locality: "Naihati" },
  { regno: "REG-105", name: "Sachin",    course: "Data Science", locality: "Kolkata" },
  { regno: "REG-106", name: "Mahima",    course: "Python ML", locality: "Barrackpore" },
];

const TEST_RESULTS_DATA = [
  { student_code: "REG-101", score: 88.5, time: 45 },
  { student_code: "REG-102", score: 94.0, time: 38 },
  { student_code: "REG-103", score: 72.0, time: 55 },
  { student_code: "REG-104", score: 89.5, time: 42 },
  { student_code: "REG-106", score: 91.0, time: 40 },
  { student_code: "REG-107", score: 85.0, time: 48 }, // Abhronila walk-in
];

const Topic23 = () => {
  const [activeTab, setActiveTab] = useState("merge_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [joinStrategy, setJoinStrategy] = useState("left"); // 'inner', 'left', 'right', 'outer'

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const getMergedRows = () => {
    const admMap = new Map(ADMISSIONS_DATA.map((a) => [a.regno, a]));
    const testMap = new Map(TEST_RESULTS_DATA.map((t) => [t.student_code, t]));

    if (joinStrategy === "inner") {
      return ADMISSIONS_DATA.filter((a) => testMap.has(a.regno)).map((a) => {
        const t = testMap.get(a.regno);
        return {
          regno: a.regno,
          name: a.name,
          course: a.course,
          score: t.score,
          status: t.score >= 80 ? "Merit Admission" : "Standard Admission",
          tag: "both",
        };
      });
    }

    if (joinStrategy === "left") {
      return ADMISSIONS_DATA.map((a) => {
        const t = testMap.get(a.regno);
        return {
          regno: a.regno,
          name: a.name,
          course: a.course,
          score: t ? t.score : null,
          status: t ? (t.score >= 80 ? "Merit Admission" : "Standard Admission") : "Assessment Absent",
          tag: t ? "both" : "left_only",
        };
      });
    }

    if (joinStrategy === "right") {
      return TEST_RESULTS_DATA.map((t) => {
        const a = admMap.get(t.student_code);
        return {
          regno: t.student_code,
          name: a ? a.name : "Unregistered Walk-in",
          course: a ? a.course : "Pending Selection",
          score: t.score,
          status: a ? (t.score >= 80 ? "Merit Admission" : "Standard Admission") : "Registration Required",
          tag: a ? "both" : "right_only",
        };
      });
    }

    // Outer
    const allKeys = Array.from(
      new Set([...ADMISSIONS_DATA.map((a) => a.regno), ...TEST_RESULTS_DATA.map((t) => t.student_code)])
    ).sort();

    return allKeys.map((k) => {
      const a = admMap.get(k);
      const t = testMap.get(k);
      let tag = "both";
      if (a && !t) tag = "left_only";
      if (!a && t) tag = "right_only";

      return {
        regno: k,
        name: a ? a.name : "Unregistered Walk-in",
        course: a ? a.course : "Pending Selection",
        score: t ? t.score : null,
        status:
          tag === "left_only"
            ? "Assessment Absent"
            : tag === "right_only"
            ? "Registration Required"
            : t.score >= 80
            ? "Merit Admission"
            : "Standard Admission",
        tag,
      };
    });
  };

  const mergedRows = getMergedRows();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/60 border border-blue-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                  Worked Case Study 4
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 23</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Worked Example 4: Merging Two DataFrames on a Key Column
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Reconcile disparate institutional records: join Admissions registration data with Online Assessment test logs, audit data discrepancies with{" "}
                <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">indicator=True</code>, and validate one-to-one cardinality.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-blue-500/20">
                Key ⋈
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("merge_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "merge_studio"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🔀 Key Reconciliation Studio
          </button>
          <button
            onClick={() => setActiveTab("python_code")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "python_code"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🐍 Python Code Lab ({PYTHON_SCRIPTS.length} Scripts)
          </button>
          <button
            onClick={() => setActiveTab("theory_notes")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "theory_notes"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            📖 Comprehensive Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🧠 Quiz &amp; Assessment ({questions.length})
          </button>
        </div>

        {/* TAB 1: MERGE STUDIO */}
        {activeTab === "merge_studio" && (
          <div className="space-y-6">
            {/* Input Tables Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <h4 className="text-xs font-bold text-blue-300 uppercase">
                    📋 Left: Admissions DB (<code className="text-white font-mono">RegNo</code>)
                  </h4>
                  <span className="text-xs text-slate-500">6 Registered</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-300">
                  {ADMISSIONS_DATA.map((a) => (
                    <div key={a.regno} className="flex justify-between py-0.5 border-b border-slate-800/40">
                      <span className="text-blue-400 font-bold">{a.regno}</span>
                      <span>{a.name}</span>
                      <span className="text-slate-500">{a.course}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <h4 className="text-xs font-bold text-teal-300 uppercase">
                    📋 Right: Test Portal (<code className="text-white font-mono">Student_Reg_Code</code>)
                  </h4>
                  <span className="text-xs text-slate-500">6 Submissions</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-300">
                  {TEST_RESULTS_DATA.map((t) => (
                    <div key={t.student_code} className="flex justify-between py-0.5 border-b border-slate-800/40">
                      <span className="text-teal-400 font-bold">{t.student_code}</span>
                      <span className="text-emerald-400 font-bold">{t.score}% Score</span>
                      <span className="text-slate-500">{t.time} mins</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Join Type Selector */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚡</span> Select Relational Merge Strategy
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: "left",
                    title: "1. LEFT JOIN (Recommended)",
                    sub: "All enrolled students kept (Sachin marked absent)",
                    code: "how='left'",
                  },
                  {
                    id: "inner",
                    title: "2. INNER JOIN",
                    sub: "Only candidates who are enrolled AND tested",
                    code: "how='inner'",
                  },
                  {
                    id: "right",
                    title: "3. RIGHT JOIN",
                    sub: "All test takers kept (Walk-in REG-107 included)",
                    code: "how='right'",
                  },
                  {
                    id: "outer",
                    title: "4. FULL OUTER JOIN",
                    sub: "Complete discrepancy audit with indicator=True",
                    code: "how='outer'",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setJoinStrategy(item.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      joinStrategy === item.id
                        ? "bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs text-blue-300">{item.title}</div>
                    <div className="text-[11px] text-slate-300 mt-1">{item.sub}</div>
                    <code className="text-[11px] font-mono text-teal-400 mt-2 block">{item.code}</code>
                  </button>
                ))}
              </div>

              {/* Dynamic Python Command */}
              <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
                <span className="text-slate-500"># Executed Python merge command:</span>
                <div className="mt-1 font-bold">
                  {`pd.merge(admissions, test_results, left_on='RegNo', right_on='Student_Reg_Code', how='${joinStrategy}', validate='1:1')`}
                </div>
              </div>
            </div>

            {/* Output Table Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Reconciled Output Table ({mergedRows.length} Records)
                </h3>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                    <th className="p-3 text-blue-300 font-bold">RegNo (Key)</th>
                    <th className="p-3 text-slate-300">Student Name</th>
                    <th className="p-3 text-slate-300">Target Course</th>
                    <th className="p-3 text-cyan-300">Assessment Score</th>
                    <th className="p-3 text-emerald-400 font-bold">Admission Qualification Status</th>
                    <th className="p-3 text-purple-300 font-bold bg-purple-950/20">_merge Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {mergedRows.map((row) => (
                    <tr key={row.regno} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-blue-400 font-bold">{row.regno}</td>
                      <td className="p-3 text-white font-sans font-semibold">{row.name}</td>
                      <td className="p-3 text-slate-300 font-sans">{row.course}</td>
                      <td className="p-3">
                        {row.score !== null ? (
                          <span className="text-cyan-300 font-bold">{row.score}%</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            Absent (NaN)
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            row.status.includes("Merit")
                              ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                              : row.status.includes("Absent")
                              ? "bg-rose-600/30 text-rose-300 border border-rose-500/40"
                              : "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 bg-purple-950/10">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            row.tag === "both"
                              ? "bg-emerald-600/30 text-emerald-300"
                              : row.tag === "left_only"
                              ? "bg-blue-600/30 text-blue-300"
                              : "bg-amber-600/30 text-amber-300"
                          }`}
                        >
                          {row.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="ETL Data Lineage & Reconciliation Audits"
              text="In enterprise databases, merging two files is rarely clean because real-world systems have orphan records! Sachin registered but missed the exam (left_only), while Abhronila walked in and took the exam without pre-registering (right_only). Using pd.merge(how='outer', indicator=True) immediately uncovers both discrepancies for administrative resolution!"
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
                      ? "bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
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
            <PlainTextPrint text={noteText} title="Topic 23 Revision Notes: Worked Example 4" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 23 Knowledge Check: Worked Example 4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic23;
