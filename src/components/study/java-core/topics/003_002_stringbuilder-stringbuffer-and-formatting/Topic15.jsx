// src/components/study/java-core/topics/003_002_stringbuilder-stringbuffer-and-formatting/Topic15.jsx

import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  Code2,
  ShieldCheck,
  Zap,
  Terminal,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Cpu
} from "lucide-react";
import functionsData from "./stringbuilder-function-list.json";

export default function Topic15() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedReturnType, setSelectedReturnType] = useState("All");
  const [selectedThreadSafety, setSelectedThreadSafety] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => {
    // Expand the first 10 functions by default
    const map = {};
    (functionsData || []).slice(0, 10).forEach((fn) => {
      map[fn.id] = true;
    });
    return map;
  });

  // Unique categories
  const categories = useMemo(() => {
    const list = ["All"];
    (functionsData || []).forEach((fn) => {
      if (fn.category && !list.includes(fn.category)) {
        list.push(fn.category);
      }
    });
    return list;
  }, []);

  // Unique classes
  const classSources = useMemo(() => {
    const list = ["All"];
    (functionsData || []).forEach((fn) => {
      if (fn.classSource && !list.includes(fn.classSource)) {
        list.push(fn.classSource);
      }
    });
    return list;
  }, []);

  // Unique return types
  const returnTypes = useMemo(() => {
    const list = ["All"];
    (functionsData || []).forEach((fn) => {
      if (fn.returnType && !list.includes(fn.returnType)) {
        list.push(fn.returnType);
      }
    });
    return list;
  }, []);

  // Filtered functions
  const filteredFunctions = useMemo(() => {
    return (functionsData || []).filter((fn) => {
      // Category filter
      if (selectedCategory !== "All" && fn.category !== selectedCategory) {
        return false;
      }
      // Class filter
      if (selectedClass !== "All" && fn.classSource !== selectedClass) {
        return false;
      }
      // Return type filter
      if (selectedReturnType !== "All" && fn.returnType !== selectedReturnType) {
        return false;
      }
      // Thread safety filter
      if (selectedThreadSafety === "thread-safe" && !fn.isThreadSafe) {
        return false;
      }
      if (selectedThreadSafety === "unsynchronized" && fn.isThreadSafe) {
        return false;
      }
      // Keyword search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = fn.name.toLowerCase().includes(query);
        const matchesSig = fn.signature.toLowerCase().includes(query);
        const matchesUse = fn.use.toLowerCase().includes(query);
        const matchesCategory = fn.category.toLowerCase().includes(query);
        const matchesReturnType = fn.returnType.toLowerCase().includes(query);
        const matchesArgs = (fn.arguments || []).some(
          (arg) =>
            arg.name.toLowerCase().includes(query) ||
            arg.type.toLowerCase().includes(query) ||
            arg.description.toLowerCase().includes(query)
        );
        if (
          !matchesName &&
          !matchesSig &&
          !matchesUse &&
          !matchesCategory &&
          !matchesReturnType &&
          !matchesArgs
        ) {
          return false;
        }
      }
      return true;
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedClass,
    selectedReturnType,
    selectedThreadSafety,
  ]);

  const handleCopy = useCallback((text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  }, []);

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const toggleExpandAll = useCallback(() => {
    const allExpanded = filteredFunctions.every((fn) => expandedIds[fn.id]);
    if (allExpanded) {
      setExpandedIds({});
    } else {
      const map = {};
      filteredFunctions.forEach((fn) => {
        map[fn.id] = true;
      });
      setExpandedIds(map);
    }
  }, [filteredFunctions, expandedIds]);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedClass("All");
    setSelectedReturnType("All");
    setSelectedThreadSafety("All");
  }, []);

  // Return type styling badge
  const getReturnTypeBadge = (type) => {
    switch (type) {
      case "StringBuilder":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "StringBuffer":
        return "bg-teal-500/10 text-teal-400 border-teal-500/30";
      case "String":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "void":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "int":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "char":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "boolean":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "PrintStream":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "Formatter":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="mt-6 space-y-10 text-slate-200 leading-relaxed max-w-7xl mx-auto pb-20 px-4 sm:px-6">
      {/* ========================================================================= */}
      {/* HERO BANNER */}
      {/* ========================================================================= */}
      <header className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6 overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-sky-500/15 text-sky-300 border border-sky-500/30 rounded-full shadow-inner flex items-center gap-1.5">
              <Cpu size={13} className="text-sky-400" />
              Java Core · Module 003_002 · Topic 15
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-400" />
              Comprehensive Function &amp; Method Reference
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full">
              Java SE 21 Ready
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
            Function List: StringBuilder, StringBuffer &amp; String Formatting
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            The authoritative master reference guide to all essential functions, signatures, return types,
            arguments, internal mechanics, performance tips, and runnable code examples across{" "}
            <span className="text-emerald-300 font-semibold">StringBuilder</span>,{" "}
            <span className="text-teal-300 font-semibold">StringBuffer</span>,{" "}
            <span className="text-sky-300 font-semibold">String.format() / printf()</span>, and{" "}
            <span className="text-purple-300 font-semibold">Java 15+ Text Blocks</span>.
          </p>

          {/* METRIC PILLS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-center">
              <div className="text-xs text-slate-400 font-medium">Total Functions</div>
              <div className="text-xl sm:text-2xl font-bold text-sky-400">
                {functionsData.length} Methods
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-center">
              <div className="text-xs text-slate-400 font-medium">Core Categories</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">
                {categories.length - 1} Modules
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-center">
              <div className="text-xs text-slate-400 font-medium">Examples Included</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400">
                100% Code &amp; Out
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3.5 text-center">
              <div className="text-xs text-slate-400 font-medium">Thread Safety</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400">
                Full Concurrency Map
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* INTERACTIVE CONTROLS: SEARCH & FILTERS */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5 backdrop-blur-xl">
        {/* Search Bar & Toggle All */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by function name, argument (e.g. offset, str), return type, or use case..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-400 text-sm transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={toggleExpandAll}
              className="px-4 py-3 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5 cursor-pointer"
            >
              {filteredFunctions.every((fn) => expandedIds[fn.id]) ? (
                <>
                  <ChevronUp size={15} />
                  <span>Collapse All</span>
                </>
              ) : (
                <>
                  <ChevronDown size={15} />
                  <span>Expand All</span>
                </>
              )}
            </button>

            {(searchTerm ||
              selectedCategory !== "All" ||
              selectedClass !== "All" ||
              selectedReturnType !== "All" ||
              selectedThreadSafety !== "All") && (
              <button
                type="button"
                onClick={resetFilters}
                className="px-3.5 py-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Layers size={13} className="text-sky-400" />
            <span>Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? functionsData.length
                  : functionsData.filter((x) => x.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-slate-950/30 text-slate-900" : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Dimensional Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-800/80">
          {/* Class Filter */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Source Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
            >
              {classSources.map((c) => (
                <option key={c} value={c}>
                  Class: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Return Type Filter */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Return Type</label>
            <select
              value={selectedReturnType}
              onChange={(e) => setSelectedReturnType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
            >
              {returnTypes.map((rt) => (
                <option key={rt} value={rt}>
                  Returns: {rt}
                </option>
              ))}
            </select>
          </div>

          {/* Thread Safety Filter */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Thread Concurrency</label>
            <select
              value={selectedThreadSafety}
              onChange={(e) => setSelectedThreadSafety(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
            >
              <option value="All">All Concurrency Models</option>
              <option value="thread-safe">Thread-Safe Only (Synchronized)</option>
              <option value="unsynchronized">Unsynchronized Only (High-Performance)</option>
            </select>
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <span>
            Showing <strong className="text-sky-300">{filteredFunctions.length}</strong> of{" "}
            {functionsData.length} functions
          </span>
          {filteredFunctions.length === 0 && (
            <span className="text-amber-400">No functions match current filters.</span>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FUNCTIONS LISTING CARDS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        {filteredFunctions.map((fn, index) => {
          const isExpanded = !!expandedIds[fn.id];
          const hasArgs = Array.isArray(fn.arguments) && fn.arguments.length > 0;

          return (
            <article
              key={fn.id}
              className={`rounded-3xl border transition duration-200 overflow-hidden backdrop-blur-xl ${
                isExpanded
                  ? "bg-slate-900/90 border-sky-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-md"
              }`}
            >
              {/* CARD HEADER / SUMMARY ROW */}
              <div
                onClick={() => toggleExpand(fn.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 select-none hover:bg-slate-800/30 transition"
              >
                <div className="space-y-2 flex-1">
                  {/* BADGES ROW */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono text-[11px] font-bold">
                      #{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-semibold border border-slate-700/60">
                      {fn.classSource}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/30 font-medium">
                      {fn.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md border text-[11px] font-mono font-bold ${getReturnTypeBadge(
                        fn.returnType
                      )}`}
                    >
                      return: {fn.returnType}
                    </span>
                    {fn.isThreadSafe ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[11px] flex items-center gap-1">
                        <ShieldCheck size={12} />
                        Thread-Safe (Synchronized)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] flex items-center gap-1">
                        <Zap size={12} />
                        Fast &amp; Unsynchronized
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-medium">
                      Since: {fn.since}
                    </span>
                  </div>

                  {/* METHOD SIGNATURE DISPLAY */}
                  <div className="flex items-center gap-3">
                    <code className="text-base sm:text-lg font-mono font-bold text-white tracking-tight break-all">
                      <span className="text-sky-400">{fn.name}</span>
                      <span className="text-slate-400">
                        ({(fn.arguments || []).map((a) => `${a.type} ${a.name}`).join(", ")})
                      </span>
                    </code>
                  </div>

                  {/* BRIEF SUMMARY (Visible when collapsed) */}
                  {!isExpanded && (
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-1">
                      {fn.use}
                    </p>
                  )}
                </div>

                {/* EXPAND / COLLAPSE BUTTON */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <button
                    type="button"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* EXPANDED CONTENT BODY */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-slate-800 space-y-6 animate-fade-in">
                  {/* FULL SIGNATURE BLOCK WITH COPY BUTTON */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Code2 size={13} className="text-sky-400" />
                        Complete Method Signature
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(fn.signature, `sig_${fn.id}`);
                        }}
                        className="text-xs text-slate-400 hover:text-sky-300 flex items-center gap-1 transition"
                      >
                        {copiedId === `sig_${fn.id}` ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Signature</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-sky-300 overflow-x-auto shadow-inner">
                      {fn.signature}
                    </div>
                  </div>

                  {/* 2-COLUMN GRID: ARGUMENTS & RETURN VALUE */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* ARGUMENTS SECTION (7 Cols) */}
                    <div className="md:col-span-7 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <BookOpen size={13} className="text-amber-400" />
                        <span>Parameters &amp; Arguments</span>
                      </div>

                      {hasArgs ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold">
                                <th className="p-2.5 pl-3.5">Name</th>
                                <th className="p-2.5">Type</th>
                                <th className="p-2.5 pr-3.5">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 font-sans">
                              {fn.arguments.map((arg, aIdx) => (
                                <tr key={aIdx} className="hover:bg-slate-800/30">
                                  <td className="p-2.5 pl-3.5 font-mono text-amber-300 font-semibold">
                                    {arg.name}
                                  </td>
                                  <td className="p-2.5 font-mono text-sky-400 text-[11px]">
                                    {arg.type}
                                  </td>
                                  <td className="p-2.5 pr-3.5 text-slate-300 leading-relaxed">
                                    {arg.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/60 text-xs text-slate-400 italic">
                          No arguments required. This is a zero-argument parameterless method.
                        </div>
                      )}
                    </div>

                    {/* RETURN TYPE SECTION (5 Cols) */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Terminal size={13} className="text-emerald-400" />
                        <span>Return Type &amp; Behavior</span>
                      </div>
                      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Returns:</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md font-mono font-bold border ${getReturnTypeBadge(
                              fn.returnType
                            )}`}
                          >
                            {fn.returnType}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {fn.returnType === "StringBuilder" || fn.returnType === "StringBuffer" ? (
                            <>
                              Returns <strong className="text-white">this</strong> reference to
                              allow fluent method chaining (e.g.{" "}
                              <code className="text-emerald-300 font-mono">
                                sb.append(a).append(b)
                              </code>
                              ) without allocating extra heap objects.
                            </>
                          ) : fn.returnType === "void" ? (
                            <>
                              Mutates the character buffer in-place directly. Does{" "}
                              <strong className="text-amber-300">not</strong> return a reference,
                              meaning it cannot be chained in a single line.
                            </>
                          ) : fn.returnType === "String" ? (
                            <>
                              Produces an <strong className="text-purple-300">immutable String</strong>{" "}
                              instance on the heap. The original buffer remains completely intact.
                            </>
                          ) : (
                            <>Returns the primitive or object value representing the requested sequence query.</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* USE & MECHANICS SECTION */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-sky-400" />
                      <span>Use, Mechanics &amp; Edge Cases</span>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80 text-sm text-slate-300 leading-relaxed">
                      {fn.use}
                    </div>
                  </div>

                  {/* PRO TIP / GOTCHA BOX */}
                  {fn.notes && (
                    <div className="p-3.5 rounded-2xl bg-sky-950/25 border border-sky-800/40 flex items-start gap-3 text-xs text-sky-200">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold uppercase text-[10px] tracking-wider shrink-0 mt-0.5">
                        Pro Tip
                      </span>
                      <p className="leading-relaxed">{fn.notes}</p>
                    </div>
                  )}

                  {/* CODE EXAMPLE & OUTPUT */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Terminal size={13} className="text-emerald-400" />
                        <span>Runnable Java Example &amp; Expected Output</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(fn.example, `code_${fn.id}`);
                        }}
                        className="text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition"
                      >
                        {copiedId === `code_${fn.id}` ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                      {/* Code Snippet Box (7 cols) */}
                      <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
                        <pre className="whitespace-pre leading-relaxed">{fn.example}</pre>
                      </div>

                      {/* Console Output Box (5 cols) */}
                      <div className="lg:col-span-5 rounded-2xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                            Terminal / Console Output:
                          </div>
                          <pre className="text-emerald-400 whitespace-pre leading-relaxed font-semibold">
                            {fn.exampleOutput}
                          </pre>
                        </div>
                        <div className="text-[10px] text-slate-600 mt-2">
                          Standard JVM Standard Output (stdout)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* ========================================================================= */}
      {/* QUICK COMPARISON REFERENCE MATRIX */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen size={13} />
            <span>Architecture &amp; Cheat Sheet</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Comprehensive Comparison Matrix: String vs StringBuilder vs StringBuffer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Quick reference comparison to choose the correct sequence class for your specific production use case.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5 pl-4">Feature / Property</th>
                <th className="p-3.5 text-purple-400">java.lang.String</th>
                <th className="p-3.5 text-emerald-400">java.lang.StringBuilder</th>
                <th className="p-3.5 text-teal-400">java.lang.StringBuffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">Mutability</td>
                <td className="p-3.5 text-purple-300 font-medium">Immutable (Cannot change)</td>
                <td className="p-3.5 text-emerald-300 font-medium">Mutable (Modifies in-place)</td>
                <td className="p-3.5 text-teal-300 font-medium">Mutable (Modifies in-place)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">Thread Safety</td>
                <td className="p-3.5 text-emerald-400 font-medium">Yes (Inherently safe via immutability)</td>
                <td className="p-3.5 text-rose-400 font-medium">No (Unsynchronized, fast)</td>
                <td className="p-3.5 text-teal-400 font-medium">Yes (Synchronized methods)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">Execution Speed</td>
                <td className="p-3.5 text-slate-400">Slow for frequent loop concatenations</td>
                <td className="p-3.5 text-emerald-400 font-bold">Fastest (Zero locking overhead)</td>
                <td className="p-3.5 text-slate-400">Moderate (Lock acquisition penalty)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">Storage Location</td>
                <td className="p-3.5 text-slate-300">Heap + String Constant Pool (SCP)</td>
                <td className="p-3.5 text-slate-300">Heap only (Never enters SCP)</td>
                <td className="p-3.5 text-slate-300">Heap only (Never enters SCP)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">Growth Algorithm</td>
                <td className="p-3.5 text-slate-400">N/A (Creates new object every time)</td>
                <td className="p-3.5 font-mono text-emerald-300">(oldCapacity * 2) + 2</td>
                <td className="p-3.5 font-mono text-teal-300">(oldCapacity * 2) + 2</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">equals() Behavior</td>
                <td className="p-3.5 text-purple-300">Overrides Object (Compares character values)</td>
                <td className="p-3.5 text-amber-300">Inherits Object (Reference equality ==)</td>
                <td className="p-3.5 text-amber-300">Inherits Object (Reference equality ==)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3.5 pl-4 font-semibold text-slate-200">Java Version Introduced</td>
                <td className="p-3.5 text-slate-400">Java 1.0 (1996)</td>
                <td className="p-3.5 text-emerald-400 font-semibold">Java 1.5 (2004)</td>
                <td className="p-3.5 text-slate-400">Java 1.0 (1996)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ACADEMY FOOTER */}
      {/* ========================================================================= */}
      <footer className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-center text-xs text-slate-500 space-y-2">
        <p className="text-slate-400 font-medium">
          Coder &amp; AccoTax · Institute of Professional Software Development &amp; Tax Consultancy
        </p>
        <p>
          Barrackpore, West Bengal ·{" "}
          <a
            href="https://www.codernaccotax.co.in"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline"
          >
            www.codernaccotax.co.in
          </a>
        </p>
      </footer>
    </div>
  );
}
