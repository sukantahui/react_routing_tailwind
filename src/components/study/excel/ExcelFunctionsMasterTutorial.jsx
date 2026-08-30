import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Terminal,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Copy,
  Check,
  Sparkles,
  Layers,
  Award,
  Play,
  ArrowRight,
  Code,
  Zap,
  Sliders,
  Database,
  Calculator,
  TrendingUp,
  FileSpreadsheet,
  Cpu
} from "lucide-react";
import { excelFunctionsCatalog } from "./excel_functions_catalog";

export default function ExcelFunctionsMasterTutorial() {
  const [selectedCategory, setSelectedCategory] = useState("Math & Aggregation");
  const [selectedFunctionName, setSelectedFunctionName] = useState("SUMPRODUCT");
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(excelFunctionsCatalog.map((f) => f.category));
    return Array.from(cats).sort();
  }, []);

  const categoryFunctions = useMemo(() => {
    return excelFunctionsCatalog.filter((f) => f.category === selectedCategory);
  }, [selectedCategory]);

  const activeFunction = useMemo(() => {
    const found = categoryFunctions.find((f) => f.name === selectedFunctionName);
    return found || categoryFunctions[0] || excelFunctionsCatalog[0];
  }, [categoryFunctions, selectedFunctionName]);

  const copyFormula = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 1500);
  };

  return (
    <div className="space-y-8 text-slate-100 font-sans max-w-7xl mx-auto p-4 sm:p-6">
      {/* HERO TUTORIAL BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-emerald-950/50 to-slate-900 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
              <Sparkles size={16} className="text-amber-400 animate-pulse" />
              <span>OFFICIAL TUTORIAL SUITE • 101 MASTER EXCEL METHODS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200">
              Interactive Excel Functions &amp; Formula Tutorials
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step-by-step interactive learning guides, formula syntax breakdowns, workplace use cases, live calculation previews, and mentor audit notes by Sukanta Hui (Coder &amp; AccoTax).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Award size={18} />
              <span>Methodology Coverage</span>
            </div>
            <p className="text-slate-400">101 Essential &amp; Advanced Functions Index</p>
            <div className="flex items-center gap-2 text-amber-300 font-mono text-[11px] pt-1">
              <span>Track Code: EXCEL-PRO-901</span>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY TAB SELECTOR */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers size={16} className="text-emerald-400" />
          <span>Select Function Category:</span>
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const firstFn = excelFunctionsCatalog.find((f) => f.category === cat);
                if (firstFn) setSelectedFunctionName(firstFn.name);
              }}
              className={`shrink-0 rounded-xl px-4 py-2.5 transition font-semibold border ${
                selectedCategory === cat
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-950/50"
                  : "border-slate-800 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN TUTORIAL WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SIDEBAR: FUNCTIONS IN CATEGORY */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>Functions in {selectedCategory}</span>
            <span className="text-emerald-400">{categoryFunctions.length} Methods</span>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {categoryFunctions.map((fn) => (
              <button
                key={fn.name}
                onClick={() => setSelectedFunctionName(fn.name)}
                className={`w-full text-left rounded-xl p-3 transition flex items-center justify-between border ${
                  activeFunction.name === fn.name
                    ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                    : "border-slate-800/80 bg-slate-950/50 text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <div>
                  <div className="font-mono text-sm font-bold text-emerald-400">{fn.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{fn.description}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 shrink-0">
                  {fn.priority}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE TUTORIAL DETAIL CARD */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 shadow-xl">
            {/* Header Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-white font-mono text-emerald-400">
                    ={activeFunction.name}()
                  </h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                    {activeFunction.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Mapped Module: {activeFunction.mappedModule}</p>
              </div>

              <button
                onClick={() => copyFormula(activeFunction.syntax)}
                className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-emerald-300 px-3.5 py-1.5 text-xs font-bold transition"
              >
                {copiedFormula ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>Copy Syntax</span>
              </button>
            </div>

            {/* Explanation & Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BookOpen size={14} className="text-emerald-400" />
                <span>Concept &amp; Description:</span>
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {activeFunction.description}
              </p>
            </div>

            {/* Formula Syntax Box */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Terminal size={14} className="text-amber-400" />
                <span>Formula Syntax Signature:</span>
              </h4>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-amber-300">
                <code>{activeFunction.syntax}</code>
              </div>
            </div>

            {/* Live Example & Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-400 block">Practical Formula Example:</span>
                <code className="font-mono text-xs text-emerald-300 block bg-slate-900 p-2.5 rounded border border-slate-800">
                  {activeFunction.example}
                </code>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-400 block">Expected Screen Display / Memory Result:</span>
                <span className="font-mono text-xs text-amber-300 block bg-slate-900 p-2.5 rounded border border-slate-800 font-bold">
                  {activeFunction.result || "Calculated Value"}
                </span>
              </div>
            </div>

            {/* Workplace Use Case */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Zap size={14} className="text-sky-400" />
                <span>Real Workplace Application:</span>
              </h4>
              <div className="rounded-xl border border-sky-500/20 bg-sky-950/10 p-4 text-xs text-slate-200 leading-relaxed">
                {activeFunction.useCase}
              </div>
            </div>

            {/* Sukanta Hui's Mentor Audit Tip */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Lightbulb size={16} />
                <span>Sukanta Hui's Master Mentor Audit Tip:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "When implementing {activeFunction.name} in commercial spreadsheets, always verify cell reference locks ($) and data types before copying across large data ranges to prevent calculation propagation errors."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
