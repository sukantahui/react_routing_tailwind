import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  Layers,
  ArrowRight,
  Printer,
  Sparkles,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trophy,
  Check,
  HelpCircle,
  CheckSquare,
  Square
} from "lucide-react";

/**
 * JournalViewerEngine
 * Shared Interactive 5-Column Commercial Journal Viewer Component
 * Placed in `src/components/study/JournalViewerEngine.jsx`
 *
 * Supports topic-specific title, subtitle, and flowSteps diagram nodes.
 */
export default function JournalViewerEngine({
  entries = [],
  title = "Commercial Journal Practice & Interactive Worksheet",
  subtitle = "Attempt the business transaction entries first, then reveal solutions to check your answers",
  isBengali = false,
  flowSteps = null,
  showFlowDiagram = false,
  hideEngineHeader = false
}) {
  // Display Mode: "WORKSHEET" (All Questions) | "FLASHCARD" (One-by-One)
  const [viewMode, setViewMode] = useState("WORKSHEET");
  
  // State for revealed individual solutions in Worksheet mode: object { [id]: boolean }
  const [revealedIds, setRevealedIds] = useState({});

  // Global toggle: Reveal All Answers vs Hide All Answers
  const [globalReveal, setGlobalReveal] = useState(false);

  // Student attempts/scratchpad state: { [id]: { debit: "", credit: "" } }
  const [userAttempts, setUserAttempts] = useState({});

  // Self-verified answers tracker: { [id]: boolean }
  const [verifiedIds, setVerifiedIds] = useState({});

  // "FLASHCARD" (One-by-One) Mode State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Search & Voucher Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [voucherFilter, setVoucherFilter] = useState("ALL");

  // Default flow steps if none provided
  const activeFlowSteps = flowSteps || [
    { title1: "TRANSACTION", title2: "QUESTION", desc: "Solve Problem Event", color: "#6ee7b7", grad: "url(#gradEmerald)", stroke: "#10b981" },
    { title1: "STUDENT", title2: "ATTEMPT", desc: "Identify Dr & Cr", color: "#7dd3fc", grad: "url(#gradSky)", stroke: "#38bdf8" },
    { title1: "CHECK", title2: "ANSWER", desc: "Reveal 5-Col Solution", color: "#5eead4", grad: "url(#gradTeal)", stroke: "#2dd4bf" },
    { title1: "TALLYPRIME", title2: "VOUCHER", desc: "F4/F5/F6/F7/F8/F9", color: "#a5b4fc", grad: "url(#gradIndigo)", stroke: "#818cf8" }
  ];

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const matchSearch =
        searchTerm === "" ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.debitAccount && e.debitAccount.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.creditAccount && e.creditAccount.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.narration && e.narration.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchVoucher =
        voucherFilter === "ALL" ||
        (e.voucherType && e.voucherType.toLowerCase().includes(voucherFilter.toLowerCase()));

      return matchSearch && matchVoucher;
    });
  }, [entries, searchTerm, voucherFilter]);

  // Helper to extract total debit for an entry
  const getEntryTotalDebit = (entry) => {
    if (entry.debitLines && Array.isArray(entry.debitLines)) {
      return entry.debitLines.reduce((s, l) => s + Number(l.amount || 0), 0);
    }
    return Number(entry.debitAmount || 0);
  };

  // Helper to extract total credit for an entry
  const getEntryTotalCredit = (entry) => {
    if (entry.creditLines && Array.isArray(entry.creditLines)) {
      return entry.creditLines.reduce((s, l) => s + Number(l.amount || 0), 0);
    }
    return Number(entry.creditAmount || 0);
  };

  // Compute total debit and credit invariants
  const { totalDebit, totalCredit, isBalanced } = useMemo(() => {
    const dr = filteredEntries.reduce((sum, item) => sum + getEntryTotalDebit(item), 0);
    const cr = filteredEntries.reduce((sum, item) => sum + getEntryTotalCredit(item), 0);
    return { totalDebit: dr, totalCredit: cr, isBalanced: dr === cr };
  }, [filteredEntries]);

  // Flashcard mode current item
  const currentItem = filteredEntries[currentIndex] || filteredEntries[0];

  // Toggle solution for a single transaction ID
  const toggleRevealId = (id) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle global reveal all
  const handleToggleGlobalReveal = () => {
    const nextState = !globalReveal;
    setGlobalReveal(nextState);
    const updated = {};
    filteredEntries.forEach((e) => {
      updated[e.id] = nextState;
    });
    setRevealedIds(updated);
  };

  // Handle user attempt input change
  const handleAttemptChange = (id, field, value) => {
    setUserAttempts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { debit: "", credit: "" }), [field]: value }
    }));
  };

  // Toggle self-verification checkmark
  const toggleVerified = (id) => {
    setVerifiedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Number of self-verified correct answers
  const verifiedCount = useMemo(() => {
    return Object.values(verifiedIds).filter(Boolean).length;
  }, [verifiedIds]);

  const handleNext = () => {
    if (currentIndex < filteredEntries.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to render debit and credit lines for an entry in table format
  const renderJournalLines = (entry) => {
    const drLines = entry.debitLines || [
      { account: entry.debitAccount, amount: entry.debitAmount }
    ];
    const crLines = entry.creditLines || [
      { account: entry.creditAccount, amount: entry.creditAmount }
    ];

    return (
      <>
        {/* Debit Rows */}
        {drLines.map((line, dIdx) => (
          <tr key={`dr-${dIdx}`}>
            <td className="p-3 border-r border-slate-800 text-slate-400 font-sans">
              {dIdx === 0 ? entry.date : ""}
            </td>
            <td className="p-3 border-r border-slate-800 font-sans">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300">{line.account}</span>
                <span className="text-emerald-400 font-bold">Dr.</span>
              </div>
            </td>
            <td className="p-3 text-center border-r border-slate-800 text-slate-500">
              {dIdx === 0 ? entry.id : ""}
            </td>
            <td className="p-3 text-right border-r border-slate-800 font-bold text-emerald-400">
              ₹{Number(line.amount).toLocaleString('en-IN')}
            </td>
            <td className="p-3 text-right text-slate-600">—</td>
          </tr>
        ))}

        {/* Credit Rows */}
        {crLines.map((line, cIdx) => (
          <tr key={`cr-${cIdx}`}>
            <td className="p-2 border-r border-slate-800"></td>
            <td className="p-3 border-r border-slate-800 font-sans pl-8">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sky-300">To {line.account}</span>
                <span className="text-sky-400 font-bold">Cr.</span>
              </div>
            </td>
            <td className="p-2 border-r border-slate-800"></td>
            <td className="p-3 text-right border-r border-slate-800 text-slate-600">—</td>
            <td className="p-3 text-right font-bold text-sky-400">
              ₹{Number(line.amount).toLocaleString('en-IN')}
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 space-y-8 font-sans">
      
      {/* HEADER & SVG DOUBLE-ENTRY FLOW VISUALIZER */}
      {!hideEngineHeader && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{isBengali ? "Interactive Topic Lab · বিষয়ভিত্তিক ল্যাব" : "Interactive Topic Lab & Solution Check"}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-md shrink-0"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>{isBengali ? "জার্নাল প্রিন্ট (Print)" : "Print Journal"}</span>
              </button>
            </div>
          </div>

          {/* SVG VISUAL FLOW DIAGRAM WITH CUSTOM STEPS */}
          {showFlowDiagram && (
            <div className="overflow-x-auto py-2">
              <div className="min-w-[760px] p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 shadow-inner">
                <svg viewBox="0 0 800 160" className="w-full h-auto drop-shadow-lg">
                  <defs>
                    <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="gradSky" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="gradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
                    </linearGradient>
                    
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <g stroke="#334155" strokeWidth="2.5" fill="none" strokeDasharray="6,4">
                    <path d="M 130 80 L 190 80" />
                    <path d="M 310 80 L 370 80" />
                    <path d="M 490 80 L 550 80" />
                    <path d="M 670 80 L 730 80" />
                  </g>

                  {/* Dynamic Flow Node 1 */}
                  <g transform="translate(10, 35)">
                    <rect x="0" y="0" width="120" height="90" rx="14" fill={activeFlowSteps[0]?.grad || "url(#gradEmerald)"} stroke={activeFlowSteps[0]?.stroke || "#10b981"} strokeWidth="1.5" filter="url(#glow)" />
                    <text x="60" y="32" textAnchor="middle" fill={activeFlowSteps[0]?.color || "#6ee7b7"} fontSize="11" fontWeight="bold">{activeFlowSteps[0]?.title1 || "1. STEP 1"}</text>
                    <text x="60" y="48" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">{activeFlowSteps[0]?.title2 || "EVENT"}</text>
                    <text x="60" y="68" textAnchor="middle" fill="#94a3b8" fontSize="9">{activeFlowSteps[0]?.desc || "Analysis"}</text>
                  </g>
                  <polygon points="188,75 198,80 188,85" fill={activeFlowSteps[0]?.stroke || "#10b981"} />

                  {/* Dynamic Flow Node 2 */}
                  <g transform="translate(190, 35)">
                    <rect x="0" y="0" width="120" height="90" rx="14" fill={activeFlowSteps[1]?.grad || "url(#gradSky)"} stroke={activeFlowSteps[1]?.stroke || "#38bdf8"} strokeWidth="1.5" filter="url(#glow)" />
                    <text x="60" y="32" textAnchor="middle" fill={activeFlowSteps[1]?.color || "#7dd3fc"} fontSize="11" fontWeight="bold">{activeFlowSteps[1]?.title1 || "2. STEP 2"}</text>
                    <text x="60" y="48" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">{activeFlowSteps[1]?.title2 || "PROCESS"}</text>
                    <text x="60" y="68" textAnchor="middle" fill="#94a3b8" fontSize="9">{activeFlowSteps[1]?.desc || "Classification"}</text>
                  </g>
                  <polygon points="368,75 378,80 368,85" fill={activeFlowSteps[1]?.stroke || "#38bdf8"} />

                  {/* Dynamic Flow Node 3 */}
                  <g transform="translate(370, 35)">
                    <rect x="0" y="0" width="120" height="90" rx="14" fill={activeFlowSteps[2]?.grad || "url(#gradTeal)"} stroke={activeFlowSteps[2]?.stroke || "#2dd4bf"} strokeWidth="1.5" filter="url(#glow)" />
                    <text x="60" y="32" textAnchor="middle" fill={activeFlowSteps[2]?.color || "#5eead4"} fontSize="11" fontWeight="bold">{activeFlowSteps[2]?.title1 || "3. STEP 3"}</text>
                    <text x="60" y="48" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">{activeFlowSteps[2]?.title2 || "ENTRY"}</text>
                    <text x="60" y="68" textAnchor="middle" fill="#94a3b8" fontSize="9">{activeFlowSteps[2]?.desc || "Journal Solution"}</text>
                  </g>
                  <polygon points="548,75 558,80 548,85" fill={activeFlowSteps[2]?.stroke || "#2dd4bf"} />

                  {/* Dynamic Flow Node 4 */}
                  <g transform="translate(550, 35)">
                    <rect x="0" y="0" width="120" height="90" rx="14" fill={activeFlowSteps[3]?.grad || "url(#gradIndigo)"} stroke={activeFlowSteps[3]?.stroke || "#818cf8"} strokeWidth="1.5" filter="url(#glow)" />
                    <text x="60" y="32" textAnchor="middle" fill={activeFlowSteps[3]?.color || "#a5b4fc"} fontSize="11" fontWeight="bold">{activeFlowSteps[3]?.title1 || "4. STEP 4"}</text>
                    <text x="60" y="48" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">{activeFlowSteps[3]?.title2 || "VOUCHER"}</text>
                    <text x="60" y="68" textAnchor="middle" fill="#94a3b8" fontSize="9">{activeFlowSteps[3]?.desc || "Tally Mapping"}</text>
                  </g>
                  <polygon points="728,75 738,80 728,85" fill={activeFlowSteps[3]?.stroke || "#818cf8"} />

                  {/* Node 5 */}
                  <g transform="translate(730, 35)">
                    <rect x="0" y="0" width="60" height="90" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                    <text x="30" y="42" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">LEDGER</text>
                    <text x="30" y="58" textAnchor="middle" fill="#38bdf8" fontSize="9">P&amp;L / BS</text>
                  </g>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DISPLAY MODE SWITCHER & GLOBAL CONTROLS */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          
          {/* Segmented View Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0 shadow-inner">
            <button
              onClick={() => setViewMode("WORKSHEET")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "WORKSHEET"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isBengali ? "সমস্ত প্রশ্ন একত্রে (All Questions Worksheet)" : "All Questions Worksheet"}</span>
            </button>

            <button
              onClick={() => setViewMode("FLASHCARD")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "FLASHCARD"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isBengali ? "এক-একটি করে সমাধান (Step-by-Step Reveal)" : "Step-by-Step Flashcards"}</span>
            </button>
          </div>

          {/* Global Solution Reveal Button & Verified Counter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBengali ? `সঠিক উত্তর যাচাইকরণের সংখ্যা: ${verifiedCount} / ${filteredEntries.length}` : `Verified Correct: ${verifiedCount} / ${filteredEntries.length}`}</span>
            </div>

            {viewMode === "WORKSHEET" && (
              <button
                onClick={handleToggleGlobalReveal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-inner hover:border-slate-700"
              >
                {globalReveal ? (
                  <>
                    <EyeOff className="w-4 h-4 text-amber-400" />
                    <span>{isBengali ? "সব সমাধান লুকান (Hide All Answers)" : "Hide All Answers"}</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>{isBengali ? "সব সমাধান দেখুন (Reveal All Answers)" : "Check All Answers (Reveal Solutions)"}</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>

        {/* Search & Voucher Type Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={isBengali ? "খুঁজুন (Search Question, Account, Narration)..." : "Search Question, Particulars, or Narration..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Voucher Filter:
            </span>
            {["ALL", "F4", "F5", "F6", "F7", "F8", "F9"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setVoucherFilter(type);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  voucherFilter === type
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* INVARIANT BANNER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className={`w-4 h-4 ${isBalanced ? "text-emerald-400" : "text-amber-400"}`} />
            <span>
              {isBengali
                ? `মোট ফিল্টারকৃত প্রশ্ন লেনদেন: ${filteredEntries.length} টি`
                : `Total Transaction Problems: ${filteredEntries.length} entries`}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Total Debit (Dr):</span>
              <span className="text-emerald-400 font-bold text-sm">₹{totalDebit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Total Credit (Cr):</span>
              <span className="text-sky-400 font-bold text-sm">₹{totalCredit.toLocaleString('en-IN')}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isBalanced ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : "bg-amber-950 text-amber-300 border border-amber-500/30"}`}>
              {isBalanced ? "Balanced (Dr = Cr)" : "Unbalanced"}
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODE 1: ALL QUESTIONS WORKSHEET MODE (Shows Questions First!) */}
      {/* ========================================================================= */}
      {viewMode === "WORKSHEET" && (
        <div className="space-y-6 animate-fadeIn">
          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400 text-sm">
              {isBengali ? "কোনো প্রশ্ন লেনদেন পাওয়া যায়নি।" : "No transaction questions match your search filter."}
            </div>
          ) : (
            filteredEntries.map((entry, idx) => {
              const isRevealed = Boolean(revealedIds[entry.id]);
              const isVerified = Boolean(verifiedIds[entry.id]);

              return (
                <div
                  key={entry.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 transition-all hover:border-slate-700"
                >
                  {/* TRANSACTION QUESTION EVENT HEADER CARD */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold shrink-0">
                        #{idx + 1}
                      </span>
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1">
                          📌 {isBengali ? "বাণিজ্যিক লেনদেন প্রশ্ন (Transaction Problem)" : "Commercial Transaction Question"}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {entry.description}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-sky-400 font-mono text-xs font-semibold">
                        Voucher: {entry.voucherType || "F7 Journal"}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono text-xs">
                        {entry.date}
                      </span>
                    </div>
                  </div>

                  {/* INTERACTIVE STUDENT ATTEMPT / SCRATCHPAD AREA */}
                  {!isRevealed && (
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          {isBengali ? "আপনার সমাধান চেষ্টা করুন (Mental / Written Practice Attempt):" : "Your Practice Attempt (Identify Debit & Credit Accounts):"}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">Solve before checking answer</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <input
                          type="text"
                          placeholder={isBengali ? "ডেবিট লেজার (e.g. Rent A/c Dr ₹15,000)..." : "Enter Debit Account (e.g., Rent A/c Dr ₹15,000)..."}
                          value={userAttempts[entry.id]?.debit || ""}
                          onChange={(e) => handleAttemptChange(entry.id, "debit", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        <input
                          type="text"
                          placeholder={isBengali ? "ক্রেডিট লেজার (e.g. To Cash A/c Cr ₹40,000)..." : "Enter Credit Account (e.g., To Cash A/c Cr ₹40,000)..."}
                          value={userAttempts[entry.id]?.credit || ""}
                          onChange={(e) => handleAttemptChange(entry.id, "credit", e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* PER-QUESTION CHECK ANSWER / REVEAL TOGGLE */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleRevealId(entry.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        isRevealed
                          ? "bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:scale-105 shadow-emerald-500/20"
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>{isBengali ? "উত্তর লুকান (Hide Solution)" : "Hide Answer Solution"}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>{isBengali ? "উত্তর যাচাই করুন (Check Answer Solution)" : "Check Answer (Reveal Solution)"}</span>
                        </>
                      )}
                    </button>

                    {isRevealed && (
                      <button
                        onClick={() => toggleVerified(entry.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isVerified
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                            : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {isVerified ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                        <span>{isVerified ? "Self Verified! (সঠিক)" : "Mark Correct"}</span>
                      </button>
                    )}
                  </div>

                  {/* REVEALED 5-COLUMN COMMERCIAL JOURNAL ENTRY SOLUTION TABLE (Supports Compound Entries) */}
                  {isRevealed && (
                    <div className="space-y-3 pt-2 animate-fadeIn">
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                        <table className="w-full text-xs sm:text-sm text-left border-collapse font-mono">
                          <thead>
                            <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                              <th className="p-3 w-28 border-r border-slate-800">Date</th>
                              <th className="p-3 border-r border-slate-800">Particulars &amp; Narration</th>
                              <th className="p-3 w-16 text-center border-r border-slate-800">L.F.</th>
                              <th className="p-3 w-32 text-right border-r border-slate-800 text-emerald-400">Debit (₹)</th>
                              <th className="p-3 w-32 text-right text-sky-400">Credit (₹)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/80">
                            {renderJournalLines(entry)}

                            {/* Narration */}
                            <tr className="bg-slate-900/50">
                              <td className="p-2 border-r border-slate-800"></td>
                              <td colSpan={4} className="p-3 pl-8 text-slate-400 italic font-sans text-xs">
                                ({entry.narration})
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Double-Entry Explanation Box */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-sans">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                          <Layers className="w-4 h-4" />
                          <span>{isBengali ? "ডাবল-এন্ট্রি হিসাব বিশ্লেষণ ও Tally Mapping" : "Double-Entry Transaction Analysis & Tally Mapping"}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{entry.explanation || entry.description}</p>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: STEP-BY-STEP FLASHCARD REVEAL MODE */}
      {/* ========================================================================= */}
      {viewMode === "FLASHCARD" && currentItem && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          
          {/* Progress Tracker */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                Transaction {currentIndex + 1} of {filteredEntries.length}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Date: {currentItem.date}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredEntries.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-40 text-xs font-bold shadow-md shadow-emerald-500/20"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RAW BUSINESS TRANSACTION PROBLEM CARD */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wide">
                📌 {isBengali ? "বাণিজ্যিক লেনদেন প্রশ্ন (Transaction Problem)" : "Commercial Transaction Question"}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-400 font-mono text-xs font-semibold">
                Tally Voucher: {currentItem.voucherType || "F7 Journal"}
              </span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentItem.description}
            </p>
          </div>

          {/* REVEAL SOLUTION CONTROL BUTTON */}
          <div className="text-center pt-2">
            {!revealedIds[currentItem.id] ? (
              <button
                onClick={() => toggleRevealId(currentItem.id)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                <Eye className="w-5 h-5" />
                <span>{isBengali ? "উত্তরটি পরীক্ষা করুন (Check Answer Solution)" : "Check Answer (Reveal Journal Entry Solution)"}</span>
              </button>
            ) : (
              <button
                onClick={() => toggleRevealId(currentItem.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs transition-all"
              >
                <EyeOff className="w-4 h-4" />
                <span>{isBengali ? "উত্তরটি লুকান (Hide Solution)" : "Hide Solution"}</span>
              </button>
            )}
          </div>

          {/* REVEALED 5-COLUMN JOURNAL ENTRY RESULT (Supports Compound Entries) */}
          {revealedIds[currentItem.id] && (
            <div className="space-y-4 animate-fadeIn pt-2">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-xs sm:text-sm text-left border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-900 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                      <th className="p-3 w-28 border-r border-slate-800">Date</th>
                      <th className="p-3 border-r border-slate-800">Particulars &amp; Narration</th>
                      <th className="p-3 w-16 text-center border-r border-slate-800">L.F.</th>
                      <th className="p-3 w-32 text-right border-r border-slate-800 text-emerald-400">Debit (₹)</th>
                      <th className="p-3 w-32 text-right text-sky-400">Credit (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {renderJournalLines(currentItem)}

                    {/* Narration */}
                    <tr className="bg-slate-900/50">
                      <td className="p-2 border-r border-slate-800"></td>
                      <td colSpan={4} className="p-3 pl-8 text-slate-400 italic font-sans text-xs">
                        ({currentItem.narration})
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Double-Entry Explanation Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-sans">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Layers className="w-4 h-4" />
                  <span>{isBengali ? "ডাবল-এন্ট্রি হিসাব বিশ্লেষণ" : "Double-Entry Transaction Analysis"}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentItem.explanation || currentItem.description}</p>
              </div>

              {/* Self Verified Check Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => toggleVerified(currentItem.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    verifiedIds[currentItem.id]
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                      : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{verifiedIds[currentItem.id] ? "Self Verified! (সঠিক)" : "Mark as Self-Verified"}</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
