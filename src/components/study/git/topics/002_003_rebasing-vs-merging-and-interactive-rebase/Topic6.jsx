import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
  Users,
  Eye,
  Bookmark,
  FastForward,
  Terminal,
  RotateCcw,
  SkipForward,
  Play,
  XCircle,
  Sliders
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic 6: Rebase Control Commands: git rebase --skip (discarding redundant commit) and git rebase --abort (safe bailout)
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [activeAction, setActiveAction] = useState("abort"); // 'continue' | 'skip' | 'abort'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/5`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 border border-amber-700/50 text-amber-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Control Toolkit
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sliders className="w-6 h-6 text-amber-400" />
                Rebase Control Commands: --skip & --abort
              </h1>
            </div>

            {/* Quick Navigation Top */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev Topic
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-600/50 bg-cyan-950/60 hover:bg-cyan-900/80 text-xs font-medium text-cyan-300 transition shadow-sm shadow-cyan-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: ELI10 / REAL WORLD ANALOGY ──────────────────────── */}
        <section className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                ELI10 & Everyday Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The GPS Rerouting Console: Continue, Skip Toll, or Turn Back
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                When driving through <strong className="text-cyan-300">Barrackpore Trunk Road (BT Road)</strong>, your GPS recalculates your route on a new highway.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" /> 1. Continue
                  </div>
                  You pay the toll and proceed down the highway (`--continue`).
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                    <SkipForward className="w-3.5 h-3.5" /> 2. Skip
                  </div>
                  The toll booth is already open and free; you bypass it without stopping (`--skip`).
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" /> 3. Abort
                  </div>
                  There is a massive flood ahead; you take the immediate U-turn and return safely home (`--abort`).
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE 3 REBASE CONTROLS ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Steering Controls of Git Rebase
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveAction("continue")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                activeAction === "continue"
                  ? "bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400">COMMAND 1</span>
                <Play className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-semibold text-white font-mono mb-1">git rebase --continue</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Records your staged conflict fixes as the replayed commit and advances to the next patch in the queue.
              </p>
            </div>

            <div
              onClick={() => setActiveAction("skip")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                activeAction === "skip"
                  ? "bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-400">COMMAND 2</span>
                <SkipForward className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-semibold text-white font-mono mb-1">git rebase --skip</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discards the current conflicting commit entirely. Used when the patch's changes already exist in the base.
              </p>
            </div>

            <div
              onClick={() => setActiveAction("abort")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                activeAction === "abort"
                  ? "bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-rose-400">COMMAND 3</span>
                <RotateCcw className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-base font-semibold text-white font-mono mb-1">git rebase --abort</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The universal safety eject. Halts the rebase and cleanly restores the repo to the exact pre-rebase state.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG VISUALIZATION ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">DAG Effect: --continue vs --skip vs --abort</h2>
              <p className="text-xs text-slate-400">Visualizing how each command alters the resulting Git history</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <marker id="ctrlArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              {activeAction === "continue" && (
                <g>
                  <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">EFFECT OF --CONTINUE: APPLIES ALL COMMITS LINEARLY</text>
                  <line x1="80" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />
                  <line x1="220" y1="120" x2="360" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />
                  <line x1="360" y1="120" x2="500" y2="120" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />
                  <line x1="500" y1="120" x2="640" y2="120" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />

                  <circle cx="80" cy="120" r="16" fill="#1e3a8a" />
                  <text x="80" y="124" fill="#fff" fontSize="11" textAnchor="middle">A</text>
                  <circle cx="220" cy="120" r="16" fill="#1e3a8a" />
                  <text x="220" y="124" fill="#fff" fontSize="11" textAnchor="middle">B</text>
                  <circle cx="360" cy="120" r="16" fill="#1e3a8a" />
                  <text x="360" y="124" fill="#fff" fontSize="11" textAnchor="middle">F (main)</text>

                  <circle cx="500" cy="120" r="17" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                  <text x="500" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">C'</text>
                  <circle cx="640" cy="120" r="17" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                  <text x="640" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D'</text>
                </g>
              )}

              {activeAction === "skip" && (
                <g>
                  <text x="30" y="30" fill="#f59e0b" fontSize="13" fontWeight="bold">EFFECT OF --SKIP: DROPS REDUNDANT COMMIT C', APPLIES D'</text>
                  <line x1="80" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />
                  <line x1="220" y1="120" x2="360" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />
                  <line x1="360" y1="120" x2="550" y2="120" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#ctrlArrow)" />

                  <circle cx="80" cy="120" r="16" fill="#1e3a8a" />
                  <text x="80" y="124" fill="#fff" fontSize="11" textAnchor="middle">A</text>
                  <circle cx="220" cy="120" r="16" fill="#1e3a8a" />
                  <text x="220" y="124" fill="#fff" fontSize="11" textAnchor="middle">B</text>
                  <circle cx="360" cy="120" r="16" fill="#1e3a8a" />
                  <text x="360" y="124" fill="#fff" fontSize="11" textAnchor="middle">F (main)</text>

                  {/* Skipped ghost C' */}
                  <circle cx="450" cy="60" r="14" fill="#334155" stroke="#f59e0b" strokeDasharray="3 3" />
                  <text x="450" y="64" fill="#fef3c7" fontSize="10" textAnchor="middle">C (Dropped)</text>

                  {/* Applied D' */}
                  <circle cx="550" cy="120" r="17" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                  <text x="550" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D'</text>
                </g>
              )}

              {activeAction === "abort" && (
                <g>
                  <text x="30" y="30" fill="#f43f5e" fontSize="13" fontWeight="bold">EFFECT OF --ABORT: IMMEDIATE ROLLBACK TO ORIGINAL STARTING STATE</text>
                  <line x1="80" y1="140" x2="220" y2="140" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="220" y1="140" x2="360" y2="140" stroke="#3b82f6" strokeWidth="2.5" />
                  <path d="M 220 140 C 260 140, 260 80, 300 80" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                  <line x1="300" y1="80" x2="440" y2="80" stroke="#06b6d4" strokeWidth="2.5" />

                  <circle cx="80" cy="140" r="16" fill="#1e3a8a" />
                  <text x="80" y="144" fill="#fff" fontSize="11" textAnchor="middle">A</text>
                  <circle cx="220" cy="140" r="16" fill="#1e3a8a" />
                  <text x="220" y="144" fill="#fff" fontSize="11" textAnchor="middle">B</text>
                  <circle cx="360" cy="140" r="16" fill="#1e3a8a" />
                  <text x="360" y="144" fill="#fff" fontSize="11" textAnchor="middle">F (main)</text>

                  <circle cx="300" cy="80" r="16" fill="#042f2e" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="300" y="84" fill="#fff" fontSize="11" textAnchor="middle">C</text>
                  <circle cx="440" cy="80" r="16" fill="#042f2e" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="440" y="84" fill="#fff" fontSize="11" textAnchor="middle">D</text>

                  <rect x="520" y="65" width="260" height="30" rx="6" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
                  <text x="650" y="85" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">🛡️ 100% Safe: 0 Changes made</text>
                </g>
              )}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Mahima & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Mahima (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, when Git says 'The previous cherry-pick is now empty', should I always run `--skip`?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Yes! That message means the changes you made in that commit already exist in `main` (perhaps merged via another PR).
                  Running <code className="text-amber-300">git rebase --skip</code> cleanly drops the empty commit so your new branch stays lean!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 6: Rebase Control Commands (Printable Notes)" />
        </section>

        {/* ─── SECTION 7: FAQ & STRUCTURED Q&A ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Exam Prep
              </h2>
              <p className="text-xs text-slate-400">
                28 core questions on git rebase --skip and git rebase --abort
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} />

          {/* Bottom Sequential Navigation Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800">
            <Link
              to={prevTopicUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm font-medium text-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Handling Conflicts During Rebase
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/50 bg-amber-950 hover:bg-amber-900 text-sm font-semibold text-amber-200 shadow-lg shadow-amber-950/60 transition"
            >
              Next Topic: Interactive Rebase Mastery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
