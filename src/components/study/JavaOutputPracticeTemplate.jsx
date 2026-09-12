// src/components/study/JavaOutputPracticeTemplate.jsx

import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Code2,
  Terminal,
  Eye,
  EyeOff,
  Sparkles,
  RotateCcw,
  BookOpen,
  Filter,
  Layers,
  ChevronDown,
  CheckCircle2,
  FileCode,
  Copy,
  Check
} from "lucide-react";
import JavaCodeBlock from "../common/JavaCodeBlock";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Automatically wraps and formats a raw Java snippet into a clean, well-indented BlueJ class & main method.
 */
function formatAsFullProgram(rawCode = "", id = 1) {
  if (!rawCode) return "";

  const trimmed = rawCode.trim();

  // If the code is already a full class definition, return it formatted
  if (trimmed.includes("class ") && (trimmed.includes("main(") || trimmed.includes("public static void main"))) {
    return trimmed;
  }

  // Clean lines and indent for main method body (8 spaces)
  const lines = trimmed.split("\n");
  const formattedBody = lines
    .map((line) => {
      const cleanLine = line.replace(/\t/g, "    ");
      return cleanLine.length > 0 ? "        " + cleanLine : "";
    })
    .join("\n");

  const className = `OutputDemo${id}`;

  return `public class ${className} {\n    public static void main(String[] args) {\n${formattedBody}\n    }\n}`;
}

/**
 * Nicely indents raw snippets if snippet-only mode is selected.
 */
function formatSnippet(rawCode = "") {
  if (!rawCode) return "";
  return rawCode
    .split("\n")
    .map((line) => line.replace(/\t/g, "    "))
    .join("\n");
}

export default function JavaOutputPracticeTemplate({ data }) {
  const [showAns, setShowAns] = useState([]);
  const [level, setLevel] = useState("all");
  const [limit, setLimit] = useState(30);
  const [viewMode, setViewMode] = useState("program"); // "program" | "snippet"
  const [started, setStarted] = useState(false);
  const [sessionQ, setSessionQ] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  if (!data || !data.questions) {
    return (
      <div className="p-8 text-center text-rose-400 bg-rose-950/20 border border-rose-900/50 rounded-2xl max-w-xl mx-auto my-12">
        <p className="font-semibold text-lg">No questions found in dataset.</p>
      </div>
    );
  }

  const filteredByLevel = useMemo(() => {
    if (level === "all") return data.questions;
    return data.questions.filter((q) => q.difficulty?.toLowerCase() === level.toLowerCase());
  }, [data.questions, level]);

  const toggle = (id) => {
    setShowAns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (showAns.length === sessionQ.length) {
      setShowAns([]);
    } else {
      setShowAns(sessionQ.map((q) => q.id));
    }
  };

  const handleStart = () => {
    setShowAns([]);
    const pool = shuffleArray(filteredByLevel);
    setSessionQ(limit === "all" ? pool : pool.slice(0, Number(limit)));
    setStarted(true);
  };

  const handleReset = () => {
    setStarted(false);
    setShowAns([]);
    setSessionQ([]);
  };

  const copyOutput = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const revealedCount = showAns.length;
  const totalInSession = sessionQ.length;
  const isAllRevealed = totalInSession > 0 && revealedCount === totalInSession;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ================= HEADER ================= */}
        <header className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-transparent border border-sky-500/30 shadow-lg shadow-sky-500/10">
                <Code2 className="w-8 h-8 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {data.board || "ICSE"} Class {data.class || "X"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Interactive Output Lab
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {data.topic || "Java Output Prediction & Tracing"}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {data.subject || "Computer Applications"} • Master Section A output questions & trace tables with BlueJ formatting
                </p>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-stretch sm:self-auto justify-center">
              <button
                type="button"
                onClick={() => setViewMode("program")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "program"
                    ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Wrap snippet in full BlueJ Class & main() method"
              >
                <FileCode size={14} />
                <span>Full Program View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("snippet")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "snippet"
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Show raw snippet code only"
              >
                <Code2 size={14} />
                <span>Snippet Only</span>
              </button>
            </div>
          </div>
        </header>

        {/* ================= CONTROL PANEL ================= */}
        <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-sky-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Difficulty:</span>
              <select
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                  setStarted(false);
                }}
                className="bg-slate-950 border border-slate-700 hover:border-sky-500 text-slate-200 text-xs px-3 py-1.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/30 transition-all font-medium cursor-pointer"
              >
                <option value="all">All Levels ({data.questions.length})</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Moderate">Moderate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Question Count Limit */}
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-indigo-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Count:</span>
              <select
                value={limit}
                onChange={(e) => {
                  const val = e.target.value;
                  setLimit(val === "all" ? "all" : Number(val));
                  setStarted(false);
                }}
                className="bg-slate-950 border border-slate-700 hover:border-indigo-500 text-slate-200 text-xs px-3 py-1.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-medium cursor-pointer"
              >
                <option value="all">All Available</option>
                {[5, 10, 20, 30, 40, 50].map((n) => (
                  <option key={n} value={n}>
                    {n} Questions
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {started && (
              <>
                {/* Stats Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 font-mono">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>
                    {revealedCount}/{totalInSession} Revealed
                  </span>
                </div>

                {/* Global Toggle All Answers */}
                <button
                  type="button"
                  onClick={toggleAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-indigo-500/40 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  {isAllRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{isAllRevealed ? "Hide All" : "Reveal All"}</span>
                </button>

                {/* Reset */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all"
                  title="Reset practice session"
                >
                  <RotateCcw size={15} />
                </button>
              </>
            )}

            {!started ? (
              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all cursor-pointer"
              >
                Start Practice ({filteredByLevel.length})
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStart}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
              >
                Shuffle & Re-test
              </button>
            )}
          </div>
        </section>

        {/* ================= QUESTIONS CONTAINER ================= */}
        {started ? (
          <div className="space-y-6">
            {sessionQ.map((q, index) => {
              const isRevealed = showAns.includes(q.id);
              const formattedCode =
                viewMode === "program"
                  ? formatAsFullProgram(q.code, q.id)
                  : formatSnippet(q.code);

              return (
                <div
                  key={q.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 space-y-4"
                >
                  {/* Question Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold font-mono">
                        Q{index + 1}
                      </span>
                      <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
                        {q.question || "Predict the output of the following Java program:"}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400">
                        ID: #{q.id}
                      </span>
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                          q.difficulty === "Beginner"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : q.difficulty === "Intermediate" || q.difficulty === "Moderate"
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {q.difficulty || "Standard"}
                      </span>
                    </div>
                  </div>

                  {/* Code Snippet Box (Well-Indented Program) */}
                  <div className="rounded-xl overflow-hidden border border-slate-800/80 shadow-inner bg-slate-950">
                    <JavaCodeBlock
                      code={formattedCode}
                      title={viewMode === "program" ? `OutputDemo${q.id}.java (BlueJ Standard)` : `Code Snippet Q${index + 1}`}
                    />
                  </div>

                  {/* Action Bar / Answer Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => toggle(q.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        isRevealed
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                          : "bg-sky-500/10 text-sky-400 border-sky-500/30 hover:bg-sky-500/20"
                      }`}
                    >
                      {isRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
                      <span>{isRevealed ? "Hide Output & Trace" : "Reveal Output & Explanation"}</span>
                    </button>

                    <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                      {isRevealed ? "✓ Solution active" : "Click to verify answer"}
                    </span>
                  </div>

                  {/* Answer & Step-by-Step Explanation Drawer */}
                  {isRevealed && (
                    <div className="p-4 sm:p-5 bg-slate-950/90 border border-emerald-500/30 rounded-xl space-y-3 animate-[fadeIn_0.3s_ease-out]">
                      {/* Expected Terminal Output Box */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <Terminal size={14} /> Expected Console Output:
                          </span>
                          <button
                            type="button"
                            onClick={() => copyOutput(q.output, q.id)}
                            className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 transition"
                            title="Copy output"
                          >
                            {copiedId === q.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            <span>{copiedId === q.id ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                        <pre className="p-3 bg-black/80 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
                          {q.output}
                        </pre>
                      </div>

                      {/* Explanation Note */}
                      {q.explanation && (
                        <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-1">
                          <strong className="text-sky-300 font-semibold flex items-center gap-1.5">
                            <BookOpen size={13} /> Step-by-Step Execution Trace:
                          </strong>
                          <p className="pl-4 text-slate-300 whitespace-pre-line font-sans">
                            {q.explanation}
                          </p>
                        </div>
                      )}

                      {/* Learning Outcome if present */}
                      {q.learningOutcome && (
                        <div className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg flex items-start gap-1.5">
                          <Sparkles size={13} className="text-amber-400 mt-0.5 shrink-0" />
                          <span><b>Key Takeaway:</b> {q.learningOutcome}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty / Get Started State */
          <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800/60 rounded-3xl space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Terminal size={28} />
            </div>
            <h3 className="text-lg font-bold text-white">Ready for Output Prediction Practice?</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Select your preferred difficulty level and number of questions above, then click <b>Start Practice</b> to begin testing your execution tracing skills!
            </p>
            <button
              type="button"
              onClick={handleStart}
              className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/20 transition cursor-pointer"
            >
              Start Practice Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
