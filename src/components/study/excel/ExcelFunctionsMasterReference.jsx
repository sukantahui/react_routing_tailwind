import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Filter,
  Copy,
  Check,
  Sparkles,
  Layers,
  Award,
  Terminal,
  HelpCircle,
  X,
  Code,
  Zap,
  CheckCircle2
} from "lucide-react";
import { excelFunctionsCatalog } from "./excel_functions_catalog";
import ExcelFunctionsMasterTutorial from "./ExcelFunctionsMasterTutorial";

export default function ExcelFunctionsMasterReference({ isModal = false, onClose = null }) {
  const [activeTab, setActiveTab] = useState("reference"); // "reference" | "tutorial"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [copiedName, setCopiedName] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(excelFunctionsCatalog.map((f) => f.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  const priorities = ["All", "Essential", "Important", "Advanced", "Optional"];

  const filteredFunctions = useMemo(() => {
    return excelFunctionsCatalog.filter((fn) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        fn.name.toLowerCase().includes(q) ||
        fn.category.toLowerCase().includes(q) ||
        fn.description.toLowerCase().includes(q) ||
        fn.syntax.toLowerCase().includes(q) ||
        fn.useCase.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "All" || fn.category === selectedCategory;

      const matchesPriority =
        selectedPriority === "All" || fn.priority === selectedPriority;

      return matchesQuery && matchesCategory && matchesPriority;
    });
  }, [searchQuery, selectedCategory, selectedPriority]);

  const copyFormula = (text, name) => {
    navigator.clipboard.writeText(text);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  const getPriorityBadgeColor = (p) => {
    switch (p) {
      case "Essential":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      case "Important":
        return "bg-sky-500/10 text-sky-300 border-sky-500/30";
      case "Advanced":
        return "bg-amber-500/10 text-amber-300 border-amber-500/30";
      case "Optional":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  const content = (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>CODER &amp; ACCOTAX EXCEL METHODOLOGY CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              101 Master Excel Functions Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete formula catalog &amp; interactive step-by-step tutorial suite covering Math, Random Simulation, Logarithmic, Lookup, Information, Date &amp; Time, Text, Statistics, Testing, Regression, Dynamic Array, Database, and Financial functions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab("reference")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "reference"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                📖 Catalog Reference
              </button>
              <button
                onClick={() => setActiveTab("tutorial")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "tutorial"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🎓 Interactive Tutorial
              </button>
            </div>

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                title="Close Reference"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-slate-400 block text-[11px]">Total Methods</span>
            <span className="text-lg font-bold text-emerald-400">{excelFunctionsCatalog.length}</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-slate-400 block text-[11px]">Essential</span>
            <span className="text-lg font-bold text-emerald-300">
              {excelFunctionsCatalog.filter((f) => f.priority === "Essential").length}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-slate-400 block text-[11px]">Important</span>
            <span className="text-lg font-bold text-sky-300">
              {excelFunctionsCatalog.filter((f) => f.priority === "Important").length}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-slate-400 block text-[11px]">Advanced &amp; Optional</span>
            <span className="text-lg font-bold text-amber-300">
              {excelFunctionsCatalog.filter((f) => f.priority === "Advanced" || f.priority === "Optional").length}
            </span>
          </div>
        </div>
      </div>

      {activeTab === "tutorial" ? (
        <ExcelFunctionsMasterTutorial />
      ) : (
        <>
          {/* CONTROLS & SEARCH */}
          <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by function (e.g. SUMPRODUCT, XLOOKUP, EOMONTH)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Priority Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-3 py-1 rounded-lg transition font-medium ${
                  selectedPriority === p
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 text-xs">
          <Filter size={14} className="text-emerald-400 shrink-0 ml-1 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-lg px-3 py-1.5 transition font-medium border ${
                selectedCategory === cat
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                  : "border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFunctions.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <HelpCircle size={40} className="text-amber-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No matching functions found</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or switching filters.</p>
          </div>
        ) : (
          filteredFunctions.map((fn) => (
            <div
              key={fn.name}
              className="rounded-xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 p-4 space-y-3 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {fn.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getPriorityBadgeColor(
                        fn.priority
                      )}`}
                    >
                      {fn.priority}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md">
                    {fn.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {fn.description}
                </p>

                {/* Syntax Box */}
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 flex items-center justify-between gap-2">
                  <code className="font-mono text-xs text-amber-300 overflow-x-auto whitespace-nowrap">
                    {fn.syntax}
                  </code>
                  <button
                    onClick={() => copyFormula(fn.syntax, fn.name)}
                    className="shrink-0 text-slate-400 hover:text-emerald-400 transition"
                    title="Copy Syntax"
                  >
                    {copiedName === fn.name ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Example & Use Case */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Terminal size={12} className="text-emerald-400" /> Example:
                  </span>
                  <code className="font-mono text-emerald-300">{fn.example}</code>
                </div>

                {fn.result && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-semibold text-slate-300">Expected Result:</span>
                    <span className="font-mono text-amber-200">{fn.result}</span>
                  </div>
                )}

                <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2 rounded border border-slate-800/60">
                  <span className="font-semibold text-emerald-400">Workplace Use Case: </span>
                  {fn.useCase}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
        </>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
        <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
