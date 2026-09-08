import React, { useState } from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pyCode1 from "./topic5_files/01_basic_excel_reading_and_sheets.py?raw";
import pyCode2 from "./topic5_files/02_excel_engines_and_range_parsing.py?raw";
import pyCode3 from "./topic5_files/03_multi_sheet_consolidation_pipeline.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

const PYTHON_SCRIPTS = [
  {
    id: "part1",
    fileName: "01_basic_excel_reading_and_sheets.py",
    title: "1. Excel Sheet Ingestion (sheet_name)",
    badge: "Sheets & Dictionaries",
    code: pyCode1,
    summary: "Demonstrates reading individual tabs by name or 0-index, and reading all sheets into a dictionary with sheet_name=None.",
  },
  {
    id: "part2",
    fileName: "02_excel_engines_and_range_parsing.py",
    title: "2. Engines & Letter Column Ranges",
    badge: "Ranges & Engines",
    code: pyCode2,
    summary: "Skips corporate metadata headers with skiprows, selects Excel column letter spans (usecols='A:D'), and selects openpyxl/calamine engines.",
  },
  {
    id: "part3",
    fileName: "03_multi_sheet_consolidation_pipeline.py",
    title: "3. Multi-Sheet ETL Consolidation",
    badge: "Multi-Sheet ETL",
    code: pyCode3,
    summary: "Consolidates multiple regional branch Excel sheets into a unified master DataFrame with branch provenance tracking.",
  },
];

const WORKBOOK_SHEETS = {
  Barrackpore_ML: {
    name: "Barrackpore_ML",
    badge: "ML Batch",
    rows: [
      { id: 101, student: "Debangshu", course: "Machine Learning", fee: "₹15,000", attendance: "92%" },
      { id: 102, student: "Susmita",   course: "Machine Learning", fee: "₹15,000", attendance: "98%" },
    ],
  },
  Shyamnagar_DS: {
    name: "Shyamnagar_DS",
    badge: "Data Science Batch",
    rows: [
      { id: 201, student: "Tuhina", course: "Data Science", fee: "₹12,000", attendance: "95%" },
      { id: 202, student: "Sachin", course: "Data Science", fee: "₹12,000", attendance: "84%" },
    ],
  },
  Ichapur_AI: {
    name: "Ichapur_AI",
    badge: "AI Batch",
    rows: [
      { id: 301, student: "Swadeep", course: "Deep Learning", fee: "₹18,000", attendance: "75%" },
    ],
  },
};

const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("excel_studio");
  const [selectedScriptId, setSelectedScriptId] = useState("part1");
  const [activeSheet, setActiveSheet] = useState("Barrackpore_ML");
  const [showConsolidated, setShowConsolidated] = useState(false);

  const activeScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  // Consolidated rows
  const consolidatedRows = Object.entries(WORKBOOK_SHEETS).flatMap(([sheetKey, sheetObj]) =>
    sheetObj.rows.map((r) => ({ ...r, branch: sheetKey.split("_")[0] }))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-900/60 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/40">
                Module 009_002 • Pandas Essentials
              </span>
              <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/40">
                Topic 5 • Excel Ingestion
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-300 bg-clip-text text-transparent">
              Reading Excel Files with pd.read_excel()
            </h1>
            <p className="text-slate-300 text-sm md:text-base mt-1 max-w-3xl">
              Ingest multi-tab corporate workbooks: sheet targeting via <code className="text-emerald-300 font-mono">sheet_name</code>, full workbook loading with <code className="text-teal-300 font-mono">sheet_name=None</code>, metadata header trimming, and multi-sheet master DataFrame consolidation.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: "excel_studio", label: "Interactive Excel Workbook Studio", icon: "📊" },
            { id: "python_suite", label: "Python Multi-Script Suite", icon: "🐍" },
            { id: "teacher_notes", label: "Teacher's Classroom Notes", icon: "📝" },
            { id: "faqs_questions", label: "Quizzes & Questions", icon: "💡" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Interactive Excel Workbook Studio */}
      {activeTab === "excel_studio" && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Workbook Sheet Tabs */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-200">
                  Spreadsheet Workbook: <code className="text-emerald-300 font-mono">barrackpore_centers_2026.xlsx</code>
                </h3>
                <p className="text-xs text-slate-400">Select individual sheet tabs or view consolidated master table</p>
              </div>

              <button
                onClick={() => setShowConsolidated(!showConsolidated)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition ${
                  showConsolidated
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                {showConsolidated ? "✓ Consolidated Mode Active" : "⚡ Consolidate All Sheets (pd.concat)"}
              </button>
            </div>

            {!showConsolidated && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                {Object.entries(WORKBOOK_SHEETS).map(([key, sheet]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSheet(key)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold transition ${
                      activeSheet === key
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    📄 {sheet.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rendered Table */}
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-emerald-300">
                {showConsolidated
                  ? "Consolidated Master DataFrame across all Sheets"
                  : `Parsed Sheet: pd.read_excel(sheet_name='${activeSheet}')`}
              </h4>
              <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 font-mono rounded">
                Rows: {showConsolidated ? consolidatedRows.length : WORKBOOK_SHEETS[activeSheet].rows.length}
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="p-2 text-slate-600 text-left">Index</th>
                    {showConsolidated && <th className="p-2 text-amber-400 font-bold">Branch (Source)</th>}
                    <th className="p-2 text-emerald-400 font-bold">StudentID</th>
                    <th className="p-2 text-teal-400 font-bold">Student Name</th>
                    <th className="p-2 text-cyan-400 font-bold">Course</th>
                    <th className="p-2 text-indigo-400 font-bold">Fee Paid</th>
                    <th className="p-2 text-purple-400 font-bold">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {(showConsolidated ? consolidatedRows : WORKBOOK_SHEETS[activeSheet].rows).map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                      <td className="p-2.5 text-slate-600 font-mono text-left">{idx}</td>
                      {showConsolidated && (
                        <td className="p-2.5 text-amber-300 font-bold">{row.branch}</td>
                      )}
                      <td className="p-2.5 text-slate-300">{row.id}</td>
                      <td className="p-2.5 text-teal-300 font-sans font-semibold">{row.student}</td>
                      <td className="p-2.5 text-cyan-300">{row.course}</td>
                      <td className="p-2.5 text-indigo-300 font-bold">{row.fee}</td>
                      <td className="p-2.5 text-purple-300">{row.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
              Python Code:{" "}
              <span className="text-emerald-300 font-bold">
                {showConsolidated
                  ? "pd.concat([df.assign(Branch=name) for name, df in pd.read_excel('file.xlsx', sheet_name=None).items()], ignore_index=True)"
                  : `pd.read_excel('barrackpore_centers_2026.xlsx', sheet_name='${activeSheet}')`}
              </span>
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
                    ? "bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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
                <h3 className="text-lg font-bold text-emerald-300">{activeScript.title}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{activeScript.fileName}</p>
              </div>
              <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                Excel Ingestion Suite
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
            quote="Corporate business units love Excel workbooks with multiple tabs (e.g., quarterly finances, departmental budgets, regional branches). Using sheet_name=None along with a dictionary comprehension and pd.concat() lets you automate what used to take hours of manual copy-pasting in 3 lines of Python!"
          />
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
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

export default Topic5;
