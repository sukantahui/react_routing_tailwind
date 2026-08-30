import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import TeacherSukantaHui from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Download,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Search,
  Copy,
  Check,
  Zap,
  Info,
  Terminal,
  ShieldAlert,
  Hash,
  Type
} from "lucide-react";
import questions from "./topic8_files/topic8_questions";
import workbookUrl from "./excel_files/002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx?url";

export default function Topic8() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const examples = useMemo(() => [
  {
    "id": 1,
    "title": "1. Basic Numeric Selection",
    "sampleInput": "Index: 2 | Options: Low, Medium, High",
    "formula": "=CHOOSE(2, \"Low\", \"Medium\", \"High\")",
    "result": "Medium",
    "category": "Basic Choice",
    "businessUse": "Selects 2nd option 'Medium' from choice list."
  },
  {
    "id": 2,
    "title": "2. Financial Scenario Switcher (Base, Best, Worst)",
    "sampleInput": "Scenario Switch Cell B1 = 2 (Best Case)",
    "formula": "=CHOOSE(B1, BaseRevenue, BestRevenue, WorstRevenue)",
    "result": "₹ 15,00,000",
    "category": "Scenario Planning",
    "businessUse": "Switches financial forecast outputs dynamically between Base, Best, and Worst cases."
  },
  {
    "id": 3,
    "title": "3. Quarter Name from Month Number",
    "sampleInput": "Month Number: 5 (May)",
    "formula": "=CHOOSE(ROUNDUP(5/3,0), \"Q1\", \"Q2\", \"Q3\", \"Q4\")",
    "result": "Q2",
    "category": "Quarter Lookup",
    "businessUse": "Converts month index number 5 into calendar quarter label 'Q2'."
  },
  {
    "id": 4,
    "title": "4. Day of Week Name Conversion",
    "sampleInput": "WEEKDAY(Date) = 3",
    "formula": "=CHOOSE(WEEKDAY(\"2026-05-12\"), \"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\")",
    "result": "Tue",
    "category": "Calendar Formatting",
    "businessUse": "Converts date serial into 3-letter day name abbreviation."
  },
  {
    "id": 5,
    "title": "5. Left VLOOKUP via CHOOSE Virtual Table",
    "sampleInput": "Key in Col B, Return in Col A",
    "formula": "=VLOOKUP(E2, CHOOSE({1,2}, B2:B100, A2:A100), 2, FALSE)",
    "result": "Rahul Kumar",
    "category": "Left VLOOKUP",
    "businessUse": "Creates virtual table swapping Col B and Col A so legacy VLOOKUP can perform left lookup."
  },
  {
    "id": 6,
    "title": "6. Dynamic Sum Range Selection",
    "sampleInput": "Region Switcher Cell = 1",
    "formula": "=SUM(CHOOSE(B1, NorthSales, SouthSales, EastSales, WestSales))",
    "result": "₹ 45,80,000",
    "category": "Dynamic Range Sum",
    "businessUse": "Sums entire regional data range selected by scenario index number."
  },
  {
    "id": 7,
    "title": "7. Tiered Bonus Percentage Assignment",
    "sampleInput": "Performance Level = 3",
    "formula": "=CHOOSE(3, 5%, 10%, 15%, 20%)",
    "result": "15%",
    "category": "Compensation Tiers",
    "businessUse": "Assigns 15% bonus multiplier for Level 3 employee performance rating."
  },
  {
    "id": 8,
    "title": "8. Fiscal Quarter Month Name Array",
    "sampleInput": "Quarter = 1",
    "formula": "=CHOOSE(1, \"Jan, Feb, Mar\", \"Apr, May, Jun\", \"Jul, Aug, Sep\", \"Oct, Nov, Dec\")",
    "result": "Jan, Feb, Mar",
    "category": "Fiscal Reporting",
    "businessUse": "Returns list of active months in selected fiscal quarter."
  },
  {
    "id": 9,
    "title": "9. Tax Slab Rate Selector",
    "sampleInput": "Tax Slab Index = 2",
    "formula": "=CHOOSE(2, 0%, 5%, 10%, 15%, 20%, 30%)",
    "result": "5%",
    "category": "Tax Computation",
    "businessUse": "Selects applicable GST/Income tax rate slab based on bracket index."
  },
  {
    "id": 10,
    "title": "10. Dynamic Average Formula Choice",
    "sampleInput": "Metric Switch = 1 (SMA) vs 2 (WMA)",
    "formula": "=CHOOSE(B1, AVERAGE(A1:A10), SUMPRODUCT(A1:A10, W1:W10))",
    "result": "₹ 12,450",
    "category": "Forecast Methods",
    "businessUse": "Switches financial forecast model between Simple Moving Average and Weighted Moving Average."
  },
  {
    "id": 11,
    "title": "11. Custom Date Month Abbreviation",
    "sampleInput": "MONTH(Date) = 8",
    "formula": "=CHOOSE(8, \"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\")",
    "result": "Aug",
    "category": "Custom Date Mask",
    "businessUse": "Converts numeric month 8 into 3-letter month string 'Aug'."
  },
  {
    "id": 12,
    "title": "12. Multi-Column Array Spill via CHOOSE",
    "sampleInput": "Select Cols A & C",
    "formula": "=CHOOSE({1,2}, A2:A10, C2:C10)",
    "result": "Spilled 2-Col Grid",
    "category": "Dynamic Array Spill",
    "businessUse": "Spills 2 non-adjacent columns side by side into dynamic array grid."
  },
  {
    "id": 13,
    "title": "13. Departmental Budget Ceiling Selector",
    "sampleInput": "Dept ID = 4 (HR)",
    "formula": "=CHOOSE(4, 500000, 750000, 1200000, 350000)",
    "result": "₹ 3,50,000",
    "category": "Budget Allocation",
    "businessUse": "Extracts departmental annual operating budget ceiling."
  },
  {
    "id": 14,
    "title": "14. Risk Assessment Grade Label",
    "sampleInput": "Risk Score Index = 1",
    "formula": "=CHOOSE(1, \"Low Risk\", \"Moderate Risk\", \"High Risk\", \"Critical Risk\")",
    "result": "Low Risk",
    "category": "Risk Audit",
    "businessUse": "Maps numeric risk rating score to human-readable risk classification."
  },
  {
    "id": 15,
    "title": "15. Dynamic Chart Source Series Switch",
    "sampleInput": "Dropdown Selection Index = 2",
    "formula": "=CHOOSE(ChartSelectCell, Q1_Data, Q2_Data, Q3_Data, Q4_Data)",
    "result": "Q2 Data Range",
    "category": "Dashboard Charting",
    "businessUse": "Feeds dynamic chart data series based on interactive dashboard dropdown choice."
  },
  {
    "id": 16,
    "title": "16. Discount Percentage by Customer Tier",
    "sampleInput": "Tier Index = 3 (Gold)",
    "formula": "=CHOOSE(3, 0%, 5%, 10%, 15%)",
    "result": "10%",
    "category": "Customer Pricing",
    "businessUse": "Applies 10% commercial volume discount for Gold tier accounts."
  },
  {
    "id": 17,
    "title": "17. Currency Symbol Formatting Selector",
    "sampleInput": "Currency Code Index = 1 (INR)",
    "formula": "=CHOOSE(1, \"₹\", \"$\", \"€\", \"£\", \"¥\")",
    "result": "₹",
    "category": "Multi-Currency",
    "businessUse": "Selects active currency symbol prefix for regional financial statements."
  },
  {
    "id": 18,
    "title": "18. Depreciation Method Selector (SLN vs DB vs DDB)",
    "sampleInput": "Method Choice = 1 (SLN)",
    "formula": "=CHOOSE(1, SLN(100000, 10000, 5), DB(100000, 10000, 5, 1), DDB(100000, 10000, 5, 1))",
    "result": "₹ 18,000",
    "category": "Asset Accounting",
    "businessUse": "Switches asset depreciation schedule between Straight-Line, Declining Balance, and Double Declining."
  },
  {
    "id": 19,
    "title": "19. Dynamic Sorting Order Choice",
    "sampleInput": "Sort Order Index = 1 (Asc) vs 2 (Desc)",
    "formula": "=SORT(A2:B10, 2, CHOOSE(1, 1, -1))",
    "result": "Ascending Sorted Grid",
    "category": "Dynamic Sorting",
    "businessUse": "Toggles dynamic array SORT order between ascending (+1) and descending (-1)."
  },
  {
    "id": 20,
    "title": "20. Final CHOOSE Audit Check Pass",
    "sampleInput": "Scenario Modeling Engine",
    "formula": "=CHOOSE(Case, Option1, Option2)",
    "result": "Audit Ready",
    "category": "Audit Verification",
    "businessUse": "Confirms CHOOSE returns exact scenario parameters across financial models."
  }
], []);

  const filteredExamples = useMemo(() => {
    if (!searchQuery.trim()) return examples;
    const q = searchQuery.toLowerCase();
    return examples.filter(
      (ex) =>
        ex.title.toLowerCase().includes(q) ||
        ex.sampleInput.toLowerCase().includes(q) ||
        ex.formula.toLowerCase().includes(q) ||
        ex.result.toLowerCase().includes(q) ||
        ex.businessUse.toLowerCase().includes(q)
    );
  }, [searchQuery, examples]);

  const handleCopyFormula = (formulaText, index) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleDownload = () => {
    if (!workbookUrl) return;
    const link = document.createElement("a");
    link.href = workbookUrl;
    link.download = "002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500/30 selection:text-sky-200 pb-16">
      {/* HEADER BANNER */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/study/excel"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all duration-200 border border-slate-700/50"
              title="Back to Excel Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                <span>Module 002_005</span>
                <span>•</span>
                <span>Topic 8</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                CHOOSE Index-Based Selection Engine
              </h1>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Master Workbook (.xlsx)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Conceptual Guide & 20 Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab("faq")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "faq"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ & Explanations</span>
          </button>

          <button
            onClick={() => setActiveTab("questions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === "questions"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Practice & Assessment</span>
          </button>
        </div>

        {/* TAB 1: CONCEPTUAL GUIDE & 20 EXAMPLES */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* EASY TOPIC EXPLANATION CARD */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Easy Concept Explanation & Quick Summary</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                CHOOSE selects and returns a specific value or range reference from a list of up to 254 choice arguments based on an index number (1 to 254). For example, =CHOOSE(2, 'Gold', 'Silver', 'Bronze') returns 'Silver'. CHOOSE is widely used in scenario planning (Case 1: Base, Case 2: Best, Case 3: Worst) and for restructuring non-contiguous columns for VLOOKUP (=VLOOKUP(key, CHOOSE({1,2}, ColB, ColA), 2, FALSE)).
              </p>
            </div>

            {/* TOPIC-SPECIFIC SYNTAX & OVERVIEW CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  Topic-Specific Excel Syntax & Parameter Breakdown
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  In Microsoft Excel, mastering <strong>CHOOSE Index-Based Selection Engine</strong> is vital for building robust financial models, automated reporting dashboards, and dynamic multi-criteria lookup systems.
                </p>

                {/* SYNTAX CARD */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-emerald-300 space-y-2.5">
                  <div className="text-slate-500 flex items-center justify-between">
                    <span>// Topic-Specific Excel Function Signature</span>
                    <span className="text-[11px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 font-sans">
                      Return: Selected Value, Array or Cell Reference
                    </span>
                  </div>
                  <div className="text-amber-300 font-bold text-base sm:text-lg tracking-wide bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    =CHOOSE(index_num, value1, [value2], ...)
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed pt-1">
                    • <strong>Parameter Breakdown:</strong> index_num: Integer between 1 and 254 | value1, value2...: Up to 254 choices (text, numbers, formulas, or range references)
                  </div>
                  <div className="text-emerald-400 text-xs leading-relaxed font-sans pt-1 border-t border-slate-800">
                    💡 <strong>Implementation Tip:</strong> Use CHOOSE with {1,2} array constant (=CHOOSE({1,2}, ColB, ColA)) to create a virtual 2-column table, enabling legacy VLOOKUP to perform left lookups!
                  </div>
                </div>
              </div>

              {/* MENTOR NOTE SIDEBAR */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg border border-emerald-500/30">
                      SH
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Instructor's Note</h4>
                      <p className="text-xs text-slate-400">Mentored by Sukanta Hui</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "Consistent practice with real workplace datasets builds true Excel speed. Review all 20 examples below to master every edge case in professional spreadsheet modeling."
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-mono">
                  ✓ 20 Practical Scenarios Verified
                </div>
              </div>
            </div>

            {/* DEDICATED TOPIC BREAKDOWN & DETAILED DESCRIPTION CARD */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Layers className="w-5 h-5 text-emerald-400" />
                Comprehensive Topic Breakdown & Detailed Description
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
                  <h3 className="font-semibold text-emerald-300 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Core Technical Mechanics
                  </h3>
                  <p>
                    Understanding the underlying logic of <strong>CHOOSE Index-Based Selection Engine</strong> equips spreadsheet architects to eliminate manual lookup errors, prevent model breakage during row/column insertion, and construct high-performance data pipelines.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
                  <h3 className="font-semibold text-cyan-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Workplace Use Cases & Audit Standards
                  </h3>
                  <p>
                    Corporate financial analysts use these techniques for financial reporting, executive dashboards, inventory tracking, and dynamic cross-sheet calculations while ensuring zero formula distortion during audits.
                  </p>
                </div>
              </div>
            </div>

            {/* 20 WORKPLACE EXAMPLES TABLE */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-400" />
                    20 Real-World Workplace Examples & Scenarios
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Explore 20 practical workplace scenarios with real inputs, exact Excel formulas, and copyable syntax.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 20 examples..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider font-mono">
                      <th className="p-3.5"># Scenario Title</th>
                      <th className="p-3.5">Sample Input</th>
                      <th className="p-3.5">Excel Formula</th>
                      <th className="p-3.5 text-center">Calculated Output</th>
                      <th className="p-3.5">Business & Audit Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                    {filteredExamples.map((ex, eIdx) => (
                      <tr key={ex.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          <div className="font-semibold text-emerald-300">{ex.title}</div>
                          <div className="text-[11px] text-slate-500">{ex.category}</div>
                        </td>
                        <td className="p-3.5 font-mono text-slate-200 bg-slate-950/50 rounded-lg">{ex.sampleInput}</td>
                        <td className="p-3.5 font-mono text-emerald-400 flex items-center justify-between gap-2">
                          <span>{ex.formula}</span>
                          <button
                            onClick={() => handleCopyFormula(ex.formula, eIdx)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Copy Formula"
                          >
                            {copiedIndex === eIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-center text-cyan-300 text-base">{ex.result}</td>
                        <td className="p-3.5 text-slate-300 text-xs leading-relaxed max-w-xs">{ex.businessUse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TEACHER SUKANTA HUI MENTOR GUIDE */}
            <div className="pt-6 border-t border-slate-800">
              <TeacherSukantaHui
                topicName="CHOOSE Index-Based Selection Engine"
                noteTitle="Sukanta Hui's Master Mentor Guide"
                mentorAdvice="In corporate financial modeling and enterprise spreadsheet architecture, accuracy precedes speed. Always verify calculation edge cases, check absolute cell reference locks ($), and test formulas against zero and negative inputs."
              />
            </div>
          </div>
        )}

        {/* TAB FAQ & EXPLANATIONS */}
        {activeTab === "faq" && questions && (
          <div className="max-w-7xl mx-auto space-y-6">
            <FAQTemplate
              title="Frequently Asked Questions & Detailed Explanations"
              subtitle="Deep-dive solutions for common workplace edge cases and formula questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 2: PRACTICE & QUIZ */}
        {activeTab === "questions" && questions && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Practice & Assessment</h2>
                <p className="text-slate-400 text-xs sm:text-sm">Test your comprehension of CHOOSE Index-Based Selection Engine</p>
              </div>
              {showResults && (
                <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-xl text-sm font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            {/* LIVE INTERACTIVE EXCEL PRACTICE GRID & SHEET VIEWER */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400">📥</span> Interactive Master Sheet Practice Viewer
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Explore the live worksheet data below or download the full module workbook to practice in Microsoft Excel.
                  </p>
                </div>
              </div>
              <ExcelFileLoader
                fileModule={workbookUrl}
                title="Live Module Master Worksheet"
                rowsPerPage={25}
                showSheetSelector={true}
              />
            </div>

            <div className="space-y-6">
              {questions.map((q, qIdx) => {
                const selected = selectedAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div key={q.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-slate-800 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded-md font-bold">
                        Q{qIdx + 1}
                      </span>
                      <h3 className="font-medium text-slate-200 text-sm sm:text-base">{q.question}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (selected === optIdx) {
                          optStyle = "bg-emerald-950 border-emerald-500 text-emerald-200";
                        }
                        if (showResults) {
                          if (optIdx === q.correctAnswer) {
                            optStyle = "bg-emerald-950 border-emerald-500 text-emerald-300 font-semibold";
                          } else if (selected === optIdx && !isCorrect) {
                            optStyle = "bg-rose-950 border-rose-500 text-rose-300";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleOptionSelect(q.id, optIdx)}
                            className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optStyle}`}
                          >
                            <span className="font-mono text-slate-500 text-xs shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="ml-8 bg-slate-900/60 border border-slate-800 rounded-lg p-3 text-xs text-slate-400">
                        <strong className="text-emerald-400">Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowResults(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-emerald-950/40"
              >
                Submit & Check Score
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
