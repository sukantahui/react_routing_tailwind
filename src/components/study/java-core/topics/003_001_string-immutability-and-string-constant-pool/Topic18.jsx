// src/components/study/java-core/topics/003_001_string-immutability-and-string-constant-pool/Topic18.jsx

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
  Cpu,
  Bookmark
} from "lucide-react";
import functionsData from "./string-function-list.json";

export default function Topic18() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedReturnType, setSelectedReturnType] = useState("All");
  const [selectedMethodType, setSelectedMethodType] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => {
    // Expand the first 8 functions by default
    const map = {};
    (functionsData || []).slice(0, 8).forEach((fn) => {
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
      // Return type filter
      if (selectedReturnType !== "All" && fn.returnType !== selectedReturnType) {
        return false;
      }
      // Method type filter
      if (selectedMethodType === "static" && !fn.isStatic) {
        return false;
      }
      if (selectedMethodType === "instance" && fn.isStatic) {
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
        const matchesNotes = (fn.notes || "").toLowerCase().includes(query);
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
          !matchesNotes &&
          !matchesArgs
        ) {
          return false;
        }
      }
      return true;
    });
  }, [searchTerm, selectedCategory, selectedReturnType, selectedMethodType]);

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
    setSelectedReturnType("All");
    setSelectedMethodType("All");
  }, []);

  // Return type styling badge
  const getReturnTypeBadge = (type) => {
    switch (type) {
      case "String":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "boolean":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "int":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "char":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "char[]":
      case "byte[]":
      case "String[]":
        return "bg-teal-500/10 text-teal-400 border-teal-500/30";
      case "void":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "CharSequence":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Stream<String>":
      case "IntStream":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
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
              Java Core · Module 003_001 · Topic 18
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-400" />
              Master Method &amp; Function Reference
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full">
              Java SE 21 Ready
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
            Function List: java.lang.String Complete Method Reference
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            The definitive master reference guide to all essential methods of <code className="text-sky-300 font-mono">java.lang.String</code>.
            Explore exact method signatures, return types, parameter definitions, immutability behavior,
            String Constant Pool (SCP) interaction, and copy-pasteable runnable code demonstrations.
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
                Immutable / Thread-Safe
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* INTERACTIVE CONTROLS: SEARCH & FILTERS */}
      {/* ========================================================================= */}
      <section className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 backdrop-blur-xl">
        {/* Search & Action Row */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search methods by name, signature, description, parameter, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-400 focus:outline-none text-sm transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={toggleExpandAll}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/60"
            >
              <Layers size={14} className="text-sky-400" />
              <span>
                {filteredFunctions.every((fn) => expandedIds[fn.id]) ? "Collapse All" : "Expand All"}
              </span>
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/60"
              title="Reset all filters"
            >
              <RotateCcw size={14} className="text-amber-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Category Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter size={12} className="text-sky-400" />
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Return Type Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Code2 size={12} className="text-emerald-400" />
              Return Type:
            </label>
            <select
              value={selectedReturnType}
              onChange={(e) => setSelectedReturnType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
            >
              {returnTypes.map((rt) => (
                <option key={rt} value={rt}>
                  {rt === "All" ? "All Return Types" : rt}
                </option>
              ))}
            </select>
          </div>

          {/* Method Type (Static vs Instance) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Zap size={12} className="text-amber-400" />
              Method Type:
            </label>
            <select
              value={selectedMethodType}
              onChange={(e) => setSelectedMethodType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:ring-1 focus:ring-sky-500 focus:outline-none"
            >
              <option value="All">All Methods (Static &amp; Instance)</option>
              <option value="instance">Instance Methods Only (s.method())</option>
              <option value="static">Static Methods Only (String.method())</option>
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
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800/90 text-slate-300 font-semibold border border-slate-700/60 font-mono">
                      String
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
                    {fn.isStatic ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[11px] font-semibold flex items-center gap-1">
                        <Sparkles size={12} />
                        static
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 text-[11px]">
                        instance
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
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* EXPANDED CONTENT BODY */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-slate-800 space-y-6">
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
                        className="text-xs text-slate-400 hover:text-sky-300 flex items-center gap-1 transition cursor-pointer"
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
                        <Layers size={13} className="text-amber-400" />
                        Arguments ({fn.arguments ? fn.arguments.length : 0})
                      </div>
                      {hasArgs ? (
                        <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/60">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                              <tr>
                                <th className="p-2.5">Parameter</th>
                                <th className="p-2.5">Type</th>
                                <th className="p-2.5">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                              {fn.arguments.map((arg, aIdx) => (
                                <tr key={aIdx} className="hover:bg-slate-800/30 transition">
                                  <td className="p-2.5 font-mono text-sky-300 font-semibold whitespace-nowrap">
                                    {arg.name}
                                  </td>
                                  <td className="p-2.5 font-mono text-amber-300 whitespace-nowrap">
                                    {arg.type}
                                  </td>
                                  <td className="p-2.5 text-slate-400 leading-relaxed">
                                    {arg.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-400 italic">
                          No arguments required. Invoked directly on the String instance or class.
                        </div>
                      )}
                    </div>

                    {/* RETURN VALUE SECTION (5 Cols) */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-emerald-400" />
                        Return Type &amp; Output
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Type:</span>
                          <span
                            className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold border ${getReturnTypeBadge(
                              fn.returnType
                            )}`}
                          >
                            {fn.returnType}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {fn.returnType === "String" &&
                            "Returns a String instance. Because String is immutable, this is either a new object or an existing pooled/cached reference (original string is never mutated in-place)."}
                          {fn.returnType === "boolean" &&
                            "Returns a primitive boolean (true or false) indicating the result of the evaluation."}
                          {fn.returnType === "int" &&
                            "Returns a primitive 32-bit signed integer (length, character index, code point, or comparison difference)."}
                          {fn.returnType === "char" &&
                            "Returns a 16-bit Unicode UTF-16 character code unit at the specified index."}
                          {fn.returnType === "char[]" &&
                            "Returns a newly allocated defensive copy of the character array backing the String."}
                          {fn.returnType === "byte[]" &&
                            "Returns a newly allocated byte array encoded according to the specified or default charset."}
                          {fn.returnType === "String[]" &&
                            "Returns an array of String tokens parsed from this string."}
                          {fn.returnType === "void" &&
                            "Performs an in-place buffer operation without returning a value."}
                          {fn.returnType === "CharSequence" &&
                            "Returns a readable sequence of characters adhering to the CharSequence interface."}
                          {["Stream<String>", "IntStream"].includes(fn.returnType) &&
                            "Returns a lazy, sequential primitive or object stream for functional processing."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* USE & PURPOSE SECTION */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen size={13} className="text-sky-400" />
                      Detailed Explanation &amp; Mechanics
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {fn.use}
                    </div>
                  </div>

                  {/* RUNNABLE EXAMPLE & OUTPUT SECTION */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Terminal size={13} className="text-emerald-400" />
                        Runnable Java Example
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(fn.example, `code_${fn.id}`);
                        }}
                        className="text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition cursor-pointer"
                      >
                        {copiedId === `code_${fn.id}` ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Code Copied</span>
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
                      {/* Code Block */}
                      <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-sky-200 overflow-x-auto shadow-inner">
                        <pre className="leading-relaxed whitespace-pre">{fn.example}</pre>
                      </div>

                      {/* Output Terminal */}
                      <div className="lg:col-span-5 rounded-2xl bg-black/90 border border-emerald-950/50 p-4 font-mono text-xs space-y-2 shadow-inner">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-400 font-bold border-b border-emerald-900/40 pb-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Console Output</span>
                        </div>
                        <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                          {fn.exampleOutput}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* PRO TIPS & PITFALLS (NOTES) */}
                  {fn.notes && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300/90 flex items-start gap-2.5">
                      <Bookmark size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-200 font-bold uppercase tracking-wider mr-1.5 text-[10px]">
                          Architectural Note:
                        </strong>
                        <span>{fn.notes}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
