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
  GitMerge,
  FastForward,
  Terminal,
  Scale,
  BookOpen,
  FileCheck2
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic 1: Rebase vs Merge Philosophical Comparison: Historical Truth vs Clean Linear Storytelling
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [activePhilosophy, setActivePhilosophy] = useState("rebase"); // 'merge' | 'rebase' | 'hybrid'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 1;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/0`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                  Core Architecture
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Scale className="w-6 h-6 text-cyan-400" />
                Rebase vs Merge: Historical Truth vs Clean Storytelling
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
        <section className="rounded-2xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                ELI10 & Philosophical Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Courtroom Transcript vs The Published Novel
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Think of Git commit history in two distinct ways:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-indigo-800/40 bg-indigo-950/30">
                  <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm mb-1">
                    <BookOpen className="w-4 h-4" /> Camp 1: The Courtroom Transcript (Merge)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A court stenographer records <em>every single pause, stutter, cough, and objection</em> exactly when it occurred.
                    Nothing is edited out. It is 100% historically true, even if it contains 50 pages of side arguments.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-cyan-800/40 bg-cyan-950/30">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm mb-1">
                    <FileCheck2 className="w-4 h-4" /> Camp 2: The Bestselling Novel (Rebase)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    An author writes rough drafts, corrects spelling mistakes, deletes boring plot detours, and delivers a
                    polished, beautifully structured book. The reader gets pure narrative clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: CORE PHILOSOPHY BREAKDOWN ────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Great Debate: Historical Record vs Curated Story
            </h2>
          </div>

          {/* Philosophy Switcher Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActivePhilosophy("rebase")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activePhilosophy === "rebase"
                  ? "bg-cyan-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              The Rebase Philosophy (Linear Story)
            </button>
            <button
              onClick={() => setActivePhilosophy("merge")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activePhilosophy === "merge"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              The Merge Philosophy (Historical Truth)
            </button>
            <button
              onClick={() => setActivePhilosophy("hybrid")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activePhilosophy === "hybrid"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              The Pragmatic Hybrid Approach (Industry Standard)
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            {activePhilosophy === "rebase" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                  <FastForward className="w-5 h-5" /> Storytelling: Clean, Linear, and Intentional
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Proponents of rebasing argue that commit history is primarily a tool for <strong>future developers</strong> who need to understand
                  how features were built, conduct automated regression tests (<code className="text-cyan-300 bg-slate-950 px-1 rounded">git bisect</code>),
                  and review Pull Requests.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-emerald-400">Pros:</strong> Eliminates meaningless merge noise like "Merge branch main into feature".
                    Every commit is atomic, compiles cleanly, and tells a coherent story.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-rose-400">Cons:</strong> Rewrites commit SHA-1 hashes. Unsafe on public branches where other developers
                    have based their work.
                  </div>
                </div>
              </div>
            )}

            {activePhilosophy === "merge" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
                  <GitMerge className="w-5 h-5" /> Historical Truth: Preserving Every Real-World Event
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Proponents of merging believe that altering commit hashes is a form of revisionism. The repository should accurately
                  reflect what happened in chronological reality, including when branches were split and integrated.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-emerald-400">Pros:</strong> 100% non-destructive. Never invalidates teammate pull operations.
                    Full audit compliance for financial/banking software.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-rose-400">Cons:</strong> Git graph graphs can turn into complex "spider webs" (merge knots) that are
                    hard to navigate and visually inspect.
                  </div>
                </div>
              </div>
            )}

            {activePhilosophy === "hybrid" && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> The Modern Hybrid: Best of Both Worlds
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Most modern engineering organizations (Google, GitHub, Stripe) follow a pragmatic compromise:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-2">
                  <li><strong>Local Private Work:</strong> Rebase freely to keep your branch up-to-date and squash messy WIP commits.</li>
                  <li><strong>Pull Request Merge:</strong> Use "Squash and Merge" for single atomic features, or standard merge commits for major release branches.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG VISUAL COMPARISON ────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Visual Comparison: Merge DAG vs Rebase DAG</h2>
              <p className="text-xs text-slate-400">Observe how the commit graph structure behaves under each paradigm</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 280"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <linearGradient id="mergeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="rebaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              {/* SECTION A: MERGE GRAPH (TOP) */}
              <text x="30" y="30" fill="#a5b4fc" fontSize="12" fontWeight="bold">GIT MERGE TOPOLOGY (PRESERVES NON-LINEAR BRANCH KNOTS)</text>

              <line x1="80" y1="90" x2="180" y2="90" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="180" y1="90" x2="280" y2="90" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="280" y1="90" x2="380" y2="90" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

              {/* Branch curve */}
              <path d="M 180 90 C 210 90, 210 50, 240 50" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
              <line x1="240" y1="50" x2="320" y2="50" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              {/* Merge commit line */}
              <path d="M 320 50 C 350 50, 350 90, 380 90" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

              {/* Nodes */}
              <circle cx="80" cy="90" r="14" fill="#334155" />
              <text x="80" y="94" fill="#fff" fontSize="10" textAnchor="middle">A</text>

              <circle cx="180" cy="90" r="14" fill="#334155" />
              <text x="180" y="94" fill="#fff" fontSize="10" textAnchor="middle">B</text>

              <circle cx="280" cy="90" r="14" fill="#334155" />
              <text x="280" y="94" fill="#fff" fontSize="10" textAnchor="middle">E</text>

              <circle cx="240" cy="50" r="14" fill="#e11d48" />
              <text x="240" y="54" fill="#fff" fontSize="10" textAnchor="middle">C</text>

              <circle cx="320" cy="50" r="14" fill="#e11d48" />
              <text x="320" y="54" fill="#fff" fontSize="10" textAnchor="middle">D</text>

              {/* Merge Commit Node */}
              <circle cx="380" cy="90" r="16" fill="url(#mergeGrad)" stroke="#a855f7" strokeWidth="2" />
              <text x="380" y="94" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">M</text>
              <text x="380" y="118" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">Merge (2 parents)</text>

              {/* DIVIDER */}
              <line x1="30" y1="140" x2="820" y2="140" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* SECTION B: REBASE GRAPH (BOTTOM) */}
              <text x="30" y="170" fill="#67e8f9" fontSize="12" fontWeight="bold">GIT REBASE TOPOLOGY (STRICT 100% LINEAR HISTORY)</text>

              <line x1="80" y1="225" x2="180" y2="225" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="180" y1="225" x2="280" y2="225" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="280" y1="225" x2="380" y2="225" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
              <line x1="380" y1="225" x2="480" y2="225" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

              {/* Rebase Nodes */}
              <circle cx="80" cy="225" r="14" fill="#334155" />
              <text x="80" y="229" fill="#fff" fontSize="10" textAnchor="middle">A</text>

              <circle cx="180" cy="225" r="14" fill="#334155" />
              <text x="180" y="229" fill="#fff" fontSize="10" textAnchor="middle">B</text>

              <circle cx="280" cy="225" r="14" fill="#334155" />
              <text x="280" y="229" fill="#fff" fontSize="10" textAnchor="middle">E</text>

              <circle cx="380" cy="225" r="15" fill="url(#rebaseGrad)" stroke="#34d399" strokeWidth="2" />
              <text x="380" y="229" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">C'</text>
              <text x="380" y="255" fill="#34d399" fontSize="9" textAnchor="middle">Replayed</text>

              <circle cx="480" cy="225" r="15" fill="url(#rebaseGrad)" stroke="#34d399" strokeWidth="2" />
              <text x="480" y="229" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">D'</text>
              <text x="480" y="255" fill="#34d399" fontSize="9" textAnchor="middle">New Base Tip</text>

              {/* Animated pulse on rebased tip */}
              <circle cx="480" cy="225" r="22" fill="none" stroke="#10b981" strokeWidth="1.5">
                <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: FULL COMPARISON MATRIX ──────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-cyan-400" /> Exhaustive Comparison Matrix
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-3.5">Dimension</th>
                  <th className="p-3.5 text-indigo-400">Git Merge (Historical Truth)</th>
                  <th className="p-3.5 text-cyan-400">Git Rebase (Curated Story)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Philosophy</td>
                  <td className="p-3.5">Record everything that happened faithfully</td>
                  <td className="p-3.5">Deliver a clean, logical story for future readers</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Commit Hashes</td>
                  <td className="p-3.5 text-emerald-400">Untouched (Immutable)</td>
                  <td className="p-3.5 text-amber-400">Recalculated (Brand new SHA-1s)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Graph Shape</td>
                  <td className="p-3.5">Branching tree / multiple paths</td>
                  <td className="p-3.5 text-cyan-300 font-medium">Single linear timeline</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Merge Commits</td>
                  <td className="p-3.5">Explicit 2-parent merge commits created</td>
                  <td className="p-3.5">Zero merge commits (Fast-forwardable)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Bug Hunting (`git bisect`)</td>
                  <td className="p-3.5">Complex across non-linear branches</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">Effortless and 100% reliable</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Safety on Remote Branches</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">100% Safe</td>
                  <td className="p-3.5 text-rose-400 font-semibold">Dangerous (breaks teammates' clones)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 6: CASE STUDY ───────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Barrackpore Enterprise Audit</span>
              <h2 className="text-xl font-bold text-white">AccoTax Financial Compliance vs Daily Sprint Agility</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            At <strong>Coder & AccoTax Barrackpore</strong>, senior students <strong className="text-cyan-300">Debangshu</strong> and <strong className="text-emerald-300">Swadeep</strong> were
            debating which strategy to use for the ₹1.5 Crore GST compliance engine overhaul.
          </p>
          <div className="p-4 rounded-xl border border-indigo-800/40 bg-indigo-950/20 space-y-2">
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Sukanta Sir's Architectural Verdict:</strong> "When Debangshu works on his private feature branch, he uses <code className="text-cyan-300">git rebase main</code> to ensure
              his 4 commits apply cleanly on the latest code. However, when we integrate the quarterly release tag into <code className="text-indigo-300">production-main</code>, we create an explicit
              <code className="text-amber-300"> git merge --no-ff</code> commit so the Indian Income Tax department's audit team can verify the exact timestamp of the release integration!"
            </p>
          </div>
        </section>

        {/* ─── SECTION 7: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Tuhina & Abhronila Ask Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Tuhina (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, if rebasing is so clean, why doesn't every company ban merging completely?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Because rebasing changes the past! If Abhronila pushes a branch, and you rebase it and force-push back to GitHub,
                  anyone who pulled Abhronila's original commits will get a diverged repository error.
                  Merging is always safe because it only creates new history without modifying existing commits."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 1: Rebase vs Merge Philosophical Comparison (Printable Notes)" />
        </section>

        {/* ─── SECTION 9: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 deep-dive questions on git merge vs git rebase philosophies
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: What is Git Rebase?
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 bg-cyan-950 hover:bg-cyan-900 text-sm font-semibold text-cyan-200 shadow-lg shadow-cyan-950/60 transition"
            >
              Next Topic: Standard Rebase Workflow <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
