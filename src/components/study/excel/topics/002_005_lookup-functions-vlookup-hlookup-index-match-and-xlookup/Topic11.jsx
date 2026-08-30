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
import questions from "./topic11_files/topic11_questions";
import workbookUrl from "./excel_files/002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx?url";

export default function Topic11() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const examples = useMemo(() => [
  {
    "id": 1,
    "title": "1. Internal Workbook Sheet Jump (#)",
    "sampleInput": "Target Sheet: Overview, Cell A1",
    "formula": "=HYPERLINK(\"#'Overview'!A1\", \"🏠 Jump to Overview\")",
    "result": "🏠 Jump to Overview",
    "category": "Internal Sheet Link",
    "businessUse": "Creates single-click hyperlink jumping directly to Executive Overview sheet."
  },
  {
    "id": 2,
    "title": "2. Web Portal URL Link",
    "sampleInput": "Official Web Portal",
    "formula": "=HYPERLINK(\"https://www.codernaccotax.co.in\", \"🌐 Coder & AccoTax Portal\")",
    "result": "🌐 Coder & AccoTax Portal",
    "category": "Web Link",
    "businessUse": "Creates clickable web link opening institute portal in browser."
  },
  {
    "id": 3,
    "title": "3. Direct Email Link (mailto:)",
    "sampleInput": "Email: sukantahui@codernaccotax.co.in",
    "formula": "=HYPERLINK(\"mailto:sukantahui@codernaccotax.co.in\", \"✉️ Email Instructor\")",
    "result": "✉️ Email Instructor",
    "category": "Email Link",
    "businessUse": "Launches default email client addressed to mentor Sukanta Hui."
  },
  {
    "id": 4,
    "title": "4. Local File System PDF Link",
    "sampleInput": "Path: C:\\Reports\\Q1_Audit.pdf",
    "formula": "=HYPERLINK(\"C:\\Reports\\Q1_Audit.pdf\", \"📄 Open Q1 Audit PDF\")",
    "result": "📄 Open Q1 Audit PDF",
    "category": "Local File Link",
    "businessUse": "Opens local audit report PDF document directly from spreadsheet cell."
  },
  {
    "id": 5,
    "title": "5. Dynamic Sheet Jump based on Cell Value",
    "sampleInput": "Sheet Name in Cell B2 = \"Topic5\"",
    "formula": "=HYPERLINK(\"#'\" & B2 & \"'!A1\", \"👉 Open \" & B2)",
    "result": "👉 Open Topic5",
    "category": "Dynamic Link",
    "businessUse": "Constructs dynamic sheet jump hyperlink based on active dropdown sheet name."
  },
  {
    "id": 6,
    "title": "6. Jump to Specific Cell Address in Active Sheet",
    "sampleInput": "Target Cell B100",
    "formula": "=HYPERLINK(\"#B100\", \"⬇️ Jump to Totals Row\")",
    "result": "⬇️ Jump to Totals Row",
    "category": "In-Sheet Jump",
    "businessUse": "Jumps cursor down 100 rows directly to table summary totals row."
  },
  {
    "id": 7,
    "title": "7. Dynamic Customer Invoice PDF Link",
    "sampleInput": "Invoice ID: INV-8940 in Cell A2",
    "formula": "=HYPERLINK(\"https://invoices.acme.com/\" & A2 & \".pdf\", \"📄 View Invoice \" & A2)",
    "result": "📄 View Invoice INV-8940",
    "category": "Dynamic Web Link",
    "businessUse": "Generates custom invoice PDF download URL based on invoice ID."
  },
  {
    "id": 8,
    "title": "8. Jump to Maximum Sales Record Cell",
    "sampleInput": "Address string: $B$45",
    "formula": "=HYPERLINK(\"#\" & ADDRESS(MATCH(MAX(B2:B100), B1:B100, 0), 2), \"⭐ Jump to Top Sale\")",
    "result": "⭐ Jump to Top Sale",
    "category": "Dynamic Target",
    "businessUse": "Constructs clickable hyperlink jumping to highest sales record cell in table."
  },
  {
    "id": 9,
    "title": "9. Shared Network Drive Directory Link",
    "sampleInput": "\\\\Server\\Finance\\2026_Budgets",
    "formula": "=HYPERLINK(\"\\\\Server\\Finance\\2026_Budgets\", \"📁 Shared Network Folder\")",
    "result": "📁 Shared Network Folder",
    "category": "Network Link",
    "businessUse": "Opens corporate shared network drive folder directory."
  },
  {
    "id": 10,
    "title": "10. WhatsApp Chat Quick Link",
    "sampleInput": "Phone: +917003756860",
    "formula": "=HYPERLINK(\"https://wa.me/917003756860\", \"💬 Chat on WhatsApp\")",
    "result": "💬 Chat on WhatsApp",
    "category": "WhatsApp Link",
    "businessUse": "Opens direct WhatsApp chat conversation with support team."
  },
  {
    "id": 11,
    "title": "11. Dynamic Table Directory Index Hyperlinks",
    "sampleInput": "Sheet Name: Topic12_XLOOKUP",
    "formula": "=HYPERLINK(\"#'\" & C2 & \"'!A1\", \"🚀 Open \" & C2 & \" Sheet\")",
    "result": "🚀 Open Topic12_XLOOKUP Sheet",
    "category": "Directory Table",
    "businessUse": "Populates interactive sheet directory table in Executive Overview landing page."
  },
  {
    "id": 12,
    "title": "12. GitHub Code Repository Link",
    "sampleInput": "GitHub Repo URL",
    "formula": "=HYPERLINK(\"https://github.com/sukantahui\", \"💻 Mentor GitHub Profile\")",
    "result": "💻 Mentor GitHub Profile",
    "category": "GitHub Link",
    "businessUse": "Links to Sukanta Hui's open-source GitHub portfolio repository."
  },
  {
    "id": 13,
    "title": "13. Jump to Named Range Target",
    "sampleInput": "Named Range \"TaxSummary\"",
    "formula": "=HYPERLINK(\"#TaxSummary\", \"📊 Jump to Tax Summary\")",
    "result": "📊 Jump to Tax Summary",
    "category": "Named Range Link",
    "businessUse": "Jumps directly to named range selection block 'TaxSummary'."
  },
  {
    "id": 14,
    "title": "14. Conditional Hyperlink (Valid vs Invalid)",
    "sampleInput": "Status Cell = \"Approved\"",
    "formula": "=IF(C2=\"Approved\", HYPERLINK(\"#'Approval'!A1\", \"✅ View Certificate\"), \"❌ Pending\")",
    "result": "✅ View Certificate",
    "category": "Conditional Link",
    "businessUse": "Displays active hyperlink only when record approval status is met."
  },
  {
    "id": 15,
    "title": "15. Dynamic Google Maps Location Link",
    "sampleInput": "Pincode / Address in Cell A2",
    "formula": "=HYPERLINK(\"https://www.google.com/maps/search/\" & ENCODEURL(A2), \"📍 Map Location\")",
    "result": "📍 Map Location",
    "category": "Maps Link",
    "businessUse": "Generates Google Maps location link for client campus address."
  },
  {
    "id": 16,
    "title": "16. Dynamic Search Query Link",
    "sampleInput": "GSTIN Code in Cell A2",
    "formula": "=HYPERLINK(\"https://services.gst.gov.in/services/searchtp?gstin=\" & A2, \"🔍 Verify GSTIN\")",
    "result": "🔍 Verify GSTIN",
    "category": "Tax Portal Link",
    "businessUse": "Opens government GST portal verifying customer tax registration."
  },
  {
    "id": 17,
    "title": "17. External Excel Workbook Link",
    "sampleInput": "Master_Model.xlsx",
    "formula": "=HYPERLINK(\"C:\\Models\\Master_Model.xlsx\", \"📊 Open Master Model\")",
    "result": "📊 Open Master Model",
    "category": "External Workbook",
    "businessUse": "Opens external financial master model workbook from current sheet."
  },
  {
    "id": 18,
    "title": "18. Return to Top Navigation Link",
    "sampleInput": "Cell A1 Target",
    "formula": "=HYPERLINK(\"#A1\", \"⬆️ Back to Top\")",
    "result": "⬆️ Back to Top",
    "category": "Top Nav Link",
    "businessUse": "Adds 'Back to Top' navigation link at bottom of long data tables."
  },
  {
    "id": 19,
    "title": "19. Dynamic Help Desk Ticket Link",
    "sampleInput": "Ticket # 4589",
    "formula": "=HYPERLINK(\"https://support.acme.com/ticket/\" & A2, \"🎫 Ticket #\" & A2)",
    "result": "🎫 Ticket #4589",
    "category": "Helpdesk Link",
    "businessUse": "Creates clickable tracking link for customer support tickets."
  },
  {
    "id": 20,
    "title": "20. Final HYPERLINK Audit Verification",
    "sampleInput": "Navigation Menu System",
    "formula": "=HYPERLINK(Target, Label)",
    "result": "Audit Verified",
    "category": "Audit Pass",
    "businessUse": "Confirms all internal and external hyperlinks navigate cleanly without broken targets."
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
                <span>Topic 11</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                HYPERLINK Interactive Navigation Engine
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
                HYPERLINK creates a clickable shortcut link that opens a document, jumps to a specific sheet/cell in the active workbook, or opens a web portal URL. Syntax: =HYPERLINK(link_location, [friendly_name]). To jump to cell A1 on sheet 'Overview' in the active workbook, use =HYPERLINK("#'Overview'!A1", "🏠 Back to Overview").
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
                  In Microsoft Excel, mastering <strong>HYPERLINK Interactive Navigation Engine</strong> is vital for building robust financial models, automated reporting dashboards, and dynamic multi-criteria lookup systems.
                </p>

                {/* SYNTAX CARD */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-emerald-300 space-y-2.5">
                  <div className="text-slate-500 flex items-center justify-between">
                    <span>// Topic-Specific Excel Function Signature</span>
                    <span className="text-[11px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 font-sans">
                      Return: undefined
                    </span>
                  </div>
                  <div className="text-amber-300 font-bold text-base sm:text-lg tracking-wide bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    =HYPERLINK(link_location, [friendly_name])
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed pt-1">
                    • <strong>Parameter Breakdown:</strong> link_location: Path, URL, or internal workbook sheet destination e.g. "#'SheetName'!A1" | friendly_name: Custom blue clickable text displayed in cell
                  </div>
                  <div className="text-emerald-400 text-xs leading-relaxed font-sans pt-1 border-t border-slate-800">
                    💡 <strong>Implementation Tip:</strong> For internal workbook sheet jumps, ALWAYS prefix the sheet reference with '#' and enclose sheet names in single quotes e.g. =HYPERLINK("#'Overview'!A1", "Jump to Overview").
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
                    Understanding the underlying logic of <strong>HYPERLINK Interactive Navigation Engine</strong> equips spreadsheet architects to eliminate manual lookup errors, prevent model breakage during row/column insertion, and construct high-performance data pipelines.
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
                topicName="HYPERLINK Interactive Navigation Engine"
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
                <p className="text-slate-400 text-xs sm:text-sm">Test your comprehension of HYPERLINK Interactive Navigation Engine</p>
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
