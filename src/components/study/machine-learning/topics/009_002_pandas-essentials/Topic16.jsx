import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic16_files/01_pd_merge_join_types.py?raw";
import pyCode2 from "./topic16_files/02_left_right_keys_and_suffixes.py?raw";
import pyCode3 from "./topic16_files/03_pd_concat_and_df_join.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_pd_merge_join_types.py",
    title: "1. Relational Joins with pd.merge()",
    badge: "inner, left, right, outer",
    code: pyCode1,
    summary: "Execute SQL-style relational database joins (inner, left, right, full outer) and audit key matching with indicator=True.",
  },
  {
    id: "part2",
    fileName: "02_left_right_keys_and_suffixes.py",
    title: "2. Mismatched Keys & Suffix Disambiguation",
    badge: "left_on, right_on, suffixes",
    code: pyCode2,
    summary: "Merge tables with differing key column headers, join directly on Index objects, and disambiguate overlapping column names.",
  },
  {
    id: "part3",
    fileName: "03_pd_concat_and_df_join.py",
    title: "3. Concatenation (pd.concat) & df.join",
    badge: "pd.concat & df.join",
    code: pyCode3,
    summary: "Stack DataFrames vertically or horizontally using pd.concat(), create hierarchical keys, and leverage index-based df.join().",
  },
];

const LEFT_TABLE_STUDENTS = [
  { id: 101, name: "Debangshu", locality: "Barrackpore" },
  { id: 102, name: "Susmita",   locality: "Shyamnagar" },
  { id: 103, name: "Swadeep",   locality: "Ichapur" },
  { id: 104, name: "Tuhina",    locality: "Naihati" },
  { id: 105, name: "Sachin",    locality: "Kolkata" },
];

const RIGHT_TABLE_SCORES = [
  { id: 101, math: 85, sci: 90 },
  { id: 102, math: 92, sci: 95 },
  { id: 103, math: 65, sci: 70 },
  { id: 104, math: 88, sci: 85 },
  { id: 106, math: 90, sci: 92 },
  { id: 107, math: 84, sci: 88 },
];

const Topic16 = () => {
  const [activeTab, setActiveTab] = useState("join_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [joinType, setJoinType] = useState("inner"); // 'inner', 'left', 'right', 'outer'

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Compute live merge output
  const getMergedRows = () => {
    const leftMap = new Map(LEFT_TABLE_STUDENTS.map((s) => [s.id, s]));
    const rightMap = new Map(RIGHT_TABLE_SCORES.map((s) => [s.id, s]));

    if (joinType === "inner") {
      return LEFT_TABLE_STUDENTS.filter((s) => rightMap.has(s.id)).map((s) => ({
        id: s.id,
        name: s.name,
        locality: s.locality,
        math: rightMap.get(s.id).math,
        sci: rightMap.get(s.id).sci,
        mergeTag: "both",
      }));
    }

    if (joinType === "left") {
      return LEFT_TABLE_STUDENTS.map((s) => {
        const score = rightMap.get(s.id);
        return {
          id: s.id,
          name: s.name,
          locality: s.locality,
          math: score ? score.math : null,
          sci: score ? score.sci : null,
          mergeTag: score ? "both" : "left_only",
        };
      });
    }

    if (joinType === "right") {
      return RIGHT_TABLE_SCORES.map((sc) => {
        const student = leftMap.get(sc.id);
        return {
          id: sc.id,
          name: student ? student.name : null,
          locality: student ? student.locality : null,
          math: sc.math,
          sci: sc.sci,
          mergeTag: student ? "both" : "right_only",
        };
      });
    }

    // Outer join
    const allIds = Array.from(
      new Set([...LEFT_TABLE_STUDENTS.map((s) => s.id), ...RIGHT_TABLE_SCORES.map((s) => s.id)])
    ).sort((a, b) => a - b);

    return allIds.map((id) => {
      const student = leftMap.get(id);
      const score = rightMap.get(id);
      let tag = "both";
      if (student && !score) tag = "left_only";
      if (!student && score) tag = "right_only";

      return {
        id,
        name: student ? student.name : null,
        locality: student ? student.locality : null,
        math: score ? score.math : null,
        sci: score ? score.sci : null,
        mergeTag: tag,
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
                  Relational Data Integration
                </span>
                <span className="text-xs text-slate-400 font-mono">Module 009_002 &bull; Topic 16</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Merging and Joining DataFrames in Pandas
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-3xl">
                Unite disparate data sources: master SQL relational joins with{" "}
                <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">pd.merge()</code>, handle mismatched keys and suffixes, stack datasets with{" "}
                <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">pd.concat()</code>, and audit data lineage with{" "}
                <code className="text-blue-300 bg-slate-800 px-1 py-0.5 rounded">indicator=True</code>.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white font-mono text-xl font-bold shadow-lg shadow-blue-500/20">
                ⋈
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("join_studio")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "join_studio"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            🔀 Relational Join Studio
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

        {/* TAB 1: JOIN STUDIO */}
        {activeTab === "join_studio" && (
          <div className="space-y-6">
            {/* Input DataFrames Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    📋 Left DataFrame: <span className="font-mono text-white">students</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">5 rows (IDs: 101 - 105)</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-300">
                  {LEFT_TABLE_STUDENTS.map((s) => (
                    <div key={s.id} className="flex justify-between py-0.5 border-b border-slate-800/40">
                      <span className="text-blue-400 font-bold">{s.id}</span>
                      <span>{s.name}</span>
                      <span className="text-slate-500">{s.locality}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    📋 Right DataFrame: <span className="font-mono text-white">scores</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">6 rows (IDs: 101-104, 106, 107)</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-300">
                  {RIGHT_TABLE_SCORES.map((s) => (
                    <div key={s.id} className="flex justify-between py-0.5 border-b border-slate-800/40">
                      <span className="text-teal-400 font-bold">{s.id}</span>
                      <span>Math: {s.math}</span>
                      <span>Sci: {s.sci}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Join Type Selector */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>⚡</span> Select Relational Join Strategy (how='...')
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: "inner",
                    title: "1. INNER JOIN",
                    sub: "Intersection (Keys present in BOTH)",
                    rowsText: "4 rows matching",
                  },
                  {
                    id: "left",
                    title: "2. LEFT JOIN",
                    sub: "All students kept (Sachin gets NaN)",
                    rowsText: "5 rows total",
                  },
                  {
                    id: "right",
                    title: "3. RIGHT JOIN",
                    sub: "All scores kept (106/107 get NaN)",
                    rowsText: "6 rows total",
                  },
                  {
                    id: "outer",
                    title: "4. FULL OUTER JOIN",
                    sub: "Union of all records from both",
                    rowsText: "7 rows total",
                  },
                ].map((strat) => (
                  <button
                    key={strat.id}
                    onClick={() => setJoinType(strat.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      joinType === strat.id
                        ? "bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold text-xs text-blue-300">{strat.title}</div>
                    <div className="text-[11px] text-slate-300 mt-1">{strat.sub}</div>
                    <div className="text-[11px] font-mono text-teal-400 mt-2">{strat.rowsText}</div>
                  </button>
                ))}
              </div>

              {/* Dynamic Code Preview */}
              <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-blue-300">
                <span className="text-slate-500"># Executed Python code:</span>
                <div className="mt-1 font-bold">
                  {`pd.merge(students, scores, on='StudentID', how='${joinType}', indicator=True)`}
                </div>
              </div>
            </div>

            {/* Merged Table Output */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <span>📊</span> Merged Output DataFrame ({mergedRows.length} Rows)
                </h3>
                <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded border border-blue-800">
                  how='{joinType}'
                </span>
              </div>

              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-950/80 font-mono">
                    <th className="p-3 text-slate-400">Index</th>
                    <th className="p-3 text-blue-300 font-bold">StudentID (Key)</th>
                    <th className="p-3 text-slate-300">Name (Left)</th>
                    <th className="p-3 text-slate-300">Locality (Left)</th>
                    <th className="p-3 text-teal-300">Math (Right)</th>
                    <th className="p-3 text-teal-300">Science (Right)</th>
                    <th className="p-3 text-purple-300 font-bold bg-purple-950/20">_merge Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {mergedRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-500">{idx}</td>
                      <td className="p-3 text-white font-bold">{row.id}</td>
                      <td className="p-3 font-sans">
                        {row.name ? (
                          <span className="text-slate-100">{row.name}</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-sans">
                        {row.locality ? (
                          <span className="text-slate-300">{row.locality}</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {row.math !== null ? (
                          <span className="text-teal-300">{row.math}</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {row.sci !== null ? (
                          <span className="text-teal-300">{row.sci}</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-xs bg-rose-950/80 text-rose-400 border border-rose-800">
                            NaN
                          </span>
                        )}
                      </td>
                      <td className="p-3 bg-purple-950/10">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            row.mergeTag === "both"
                              ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                              : row.mergeTag === "left_only"
                              ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                              : "bg-amber-600/30 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {row.mergeTag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sukanta Hui Pedagogical Card */}
            <Teacher
              topic="Silent Row Multiplication & Join Validation"
              text="In production machine learning pipelines, joining on duplicate keys causes 'Cartesian row explosion' where 10,000 rows silently explode into 2,000,000 duplicate rows! Always pass validate='1:1' or validate='1:m' inside pd.merge() to guarantee key uniqueness, and use indicator=True during ETL debugging to audit unmatched foreign keys."
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
            <PlainTextPrint text={noteText} title="Topic 16 Revision Notes: Merging & Joining DataFrames" />
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <FAQTemplate questions={questions} title="Topic 16 Knowledge Check: Merging & Joining DataFrames" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic16;
