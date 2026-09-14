import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Layers,
  Clock,
  FolderGit2,
  Zap,
  Users,
  Database,
  Eye,
  Check,
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  GitMerge,
  Split,
  FastForward,
  Terminal,
  Play
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic 0: What is Git Rebase? Replaying a sequence of commits on top of a new base tip
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState("after"); // 'before' | 'after'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/002_002_merging-strategies-and-conflict-resolution/14`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const rebaseSteps = [
    {
      title: "1. Divergence Detected",
      desc: "Branch 'feature' starts from commit B, but 'main' has moved forward to commit F with new updates.",
      detail: "Git calculates merge-base (Commit B) and lists commits C and D to be replayed."
    },
    {
      title: "2. Save Diffs as Patches",
      desc: "Git converts commits C and D into temporary patch files in .git/rebase-merge/ and clears the staging area.",
      detail: "The working tree is temporarily reset to commit F (tip of main)."
    },
    {
      title: "3. Reapply Commits Sequentially",
      desc: "Git applies patch C onto F to create C' (new hash!), then applies patch D onto C' to create D'.",
      detail: "HEAD moves forward step-by-step in a detached state until all patches are replayed."
    },
    {
      title: "4. Update Branch Reference",
      desc: "The 'feature' branch pointer is updated from D to D'. The branch is now completely linear!",
      detail: "Old commits C & D become orphaned and will eventually be cleaned by git garbage collection."
    }
  ];

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
                  Intermediate to Advanced
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <FastForward className="w-6 h-6 text-cyan-400" />
                What is Git Rebase? Replaying Commits on a New Base Tip
              </h1>
            </div>

            {/* Quick Navigation Top */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev Module Exam
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
                ELI10 & Real-World Analogy (Barrackpore Edition)
              </span>
              <h2 className="text-2xl font-bold text-white">
                The AccoTax Spiral Ledger vs Re-writing on Fresh Pages
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine you are an accountant at <strong className="text-cyan-300">AccoTax Barrackpore</strong>.
                On Monday morning, you take page 10 of the cash ledger and start writing notes for a new
                <strong className="text-emerald-300"> ₹ GST Calculator feature</strong> on sticky notes labeled <em>Note C</em> and <em>Note D</em>.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                While you were working, <strong className="text-amber-300">Sukanta Sir</strong> added two new official ledger pages:
                <em>Page E</em> and <em>Page F</em> (FY 2026-27 updates) directly to the main binder.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-1">
                    <GitMerge className="w-4 h-4" /> Option A: Git Merge (The Stapler)
                  </div>
                  <p className="text-xs text-slate-400">
                    You staple your sticky notes to the binder with an extra summary tag ("Merged Page 10 Notes into Binder").
                    History stays non-linear and messy.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-cyan-800/40 bg-cyan-950/20">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm mb-1">
                    <FastForward className="w-4 h-4" /> Option B: Git Rebase (Fresh Clean Re-write)
                  </div>
                  <p className="text-xs text-slate-400">
                    You peel off sticky notes C and D, read Sukanta Sir's newest Page F, and rewrite your notes as clean new pages C' and D'
                    directly on top of Page F. The binder looks like one continuous, uninterrupted chapter!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: CORE CONCEPT & THEORY ───────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Core Concept: The Rebase Mechanism & DAG Transformation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                In Git, <strong>rebasing</strong> is an automated sequence that picks up the commit changes
                from your active branch and replays them onto the tip of another branch (or commit).
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                Unlike a 3-way merge which creates a new commit containing two parent hashes, a rebase computes the
                <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded ml-1">patch delta</code> of each commit
                relative to the common ancestor, rewinds your branch pointer to the target branch tip, and sequentially applies
                each patch to create completely new single-parent commit objects.
              </p>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Why Do Commits Get Brand New Hashes?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Git commit hashes are calculated via cryptographic hashing (SHA-1/SHA-256) over the tree content,
                  author metadata, committer timestamp, and <em>the parent commit hash</em>. Because commit C' now has parent
                  <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded mx-1">F</code> instead of parent
                  <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded mx-1">B</code>, its SHA-1 hash is mathematically different.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Key Rebase Properties
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Linearity:</strong> Produces a straight line of commit history without merge bubbles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Clean Bisecting:</strong> Simplifies automated regression testing (`git bisect`).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Single-Parent:</strong> Rebased commits have only one parent commit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>History Rewriting:</strong> Never rebase commits that have been pushed to shared branches!</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG VISUALIZATION ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Interactive DAG: Before vs After Rebase</h2>
                <p className="text-xs text-slate-400">Toggle views to witness how the commit pointers and DAG branches shift</p>
              </div>
            </div>

            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setViewMode("before")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewMode === "before"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Divergent State (Before)
              </button>
              <button
                onClick={() => setViewMode("after")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewMode === "after"
                    ? "bg-cyan-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Linear State (After Rebase)
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 260"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="featGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="orphanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
                </marker>
              </defs>

              {/* Background Grid Accent */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {viewMode === "before" ? (
                /* BEFORE REBASE SVG */
                <g className="transition-all duration-500">
                  <text x="30" y="30" fill="#94a3b8" fontSize="13" fontWeight="bold">DIVERGENT COMMIT TOPOLOGY (BEFORE REBASE)</text>

                  {/* Main branch line */}
                  <line x1="80" y1="170" x2="200" y2="170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
                  <line x1="200" y1="170" x2="340" y2="170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
                  <line x1="340" y1="170" x2="480" y2="170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* Feature branch line */}
                  <path d="M 200 170 C 240 170, 240 80, 280 80" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="4 2" />
                  <line x1="280" y1="80" x2="420" y2="80" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrow-cyan)" />

                  {/* Commit Nodes on Main */}
                  {/* A */}
                  <circle cx="80" cy="170" r="18" fill="url(#mainGrad)" />
                  <text x="80" y="175" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
                  <text x="80" y="205" fill="#64748b" fontSize="10" textAnchor="middle">Init</text>

                  {/* B (Merge Base) */}
                  <circle cx="200" cy="170" r="20" fill="url(#mainGrad)" stroke="#38bdf8" strokeWidth="2" />
                  <text x="200" y="175" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
                  <text x="200" y="208" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Merge Base</text>

                  {/* E */}
                  <circle cx="340" cy="170" r="18" fill="url(#mainGrad)" />
                  <text x="340" y="175" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">E</text>

                  {/* F (Tip of main) */}
                  <circle cx="480" cy="170" r="18" fill="url(#mainGrad)" />
                  <text x="480" y="175" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">F</text>
                  <rect x="445" y="210" width="70" height="22" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
                  <text x="480" y="225" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">main</text>

                  {/* Commit Nodes on Feature */}
                  {/* C */}
                  <circle cx="280" cy="80" r="18" fill="url(#featGrad)" />
                  <text x="280" y="85" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>
                  <text x="280" y="55" fill="#67e8f9" fontSize="10" textAnchor="middle">GST Calc</text>

                  {/* D (Tip of feature) */}
                  <circle cx="420" cy="80" r="18" fill="url(#featGrad)" />
                  <text x="420" y="85" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">D</text>
                  <rect x="375" y="15" width="90" height="22" rx="4" fill="#042f2e" stroke="#06b6d4" strokeWidth="1" />
                  <text x="420" y="30" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">feature/gst-calc</text>

                  {/* Animated pulse on feature tip */}
                  <circle cx="420" cy="80" r="24" fill="none" stroke="#06b6d4" strokeWidth="1.5">
                    <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              ) : (
                /* AFTER REBASE SVG */
                <g className="transition-all duration-500">
                  <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">LINEAR DAG TOPOLOGY (AFTER GIT REBASE MAIN)</text>

                  {/* Straight Main Line */}
                  <line x1="80" y1="160" x2="190" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
                  <line x1="190" y1="160" x2="300" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
                  <line x1="300" y1="160" x2="410" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />

                  {/* Linear Continuation (Rebased commits) */}
                  <line x1="410" y1="160" x2="530" y2="160" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                  <line x1="530" y1="160" x2="650" y2="160" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-cyan)" />

                  {/* Main Commits */}
                  <circle cx="80" cy="160" r="17" fill="url(#mainGrad)" />
                  <text x="80" y="165" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>

                  <circle cx="190" cy="160" r="17" fill="url(#mainGrad)" />
                  <text x="190" y="165" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>

                  <circle cx="300" cy="160" r="17" fill="url(#mainGrad)" />
                  <text x="300" y="165" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

                  <circle cx="410" cy="160" r="17" fill="url(#mainGrad)" />
                  <text x="410" y="165" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">F</text>
                  <rect x="380" y="195" width="60" height="20" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
                  <text x="410" y="209" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">main</text>

                  {/* Replaced / Replayed Commits */}
                  <circle cx="530" cy="160" r="19" fill="url(#featGrad)" stroke="#34d399" strokeWidth="2" />
                  <text x="530" y="165" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">C'</text>
                  <text x="530" y="130" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">New Hash</text>

                  <circle cx="650" cy="160" r="19" fill="url(#featGrad)" stroke="#34d399" strokeWidth="2" />
                  <text x="650" y="165" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D'</text>
                  <rect x="595" y="195" width="110" height="22" rx="4" fill="#042f2e" stroke="#10b981" strokeWidth="1" />
                  <text x="650" y="210" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">feature/gst-calc</text>

                  {/* Ghost Orphan Commits */}
                  <g opacity="0.35">
                    <circle cx="280" cy="65" r="14" fill="url(#orphanGrad)" stroke="#94a3b8" strokeDasharray="2 2" />
                    <text x="280" y="69" fill="#cbd5e1" fontSize="10" textAnchor="middle">C</text>
                    <circle cx="380" cy="65" r="14" fill="url(#orphanGrad)" stroke="#94a3b8" strokeDasharray="2 2" />
                    <text x="380" y="69" fill="#cbd5e1" fontSize="10" textAnchor="middle">D</text>
                    <line x1="294" y1="65" x2="366" y2="65" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="330" y="45" fill="#94a3b8" fontSize="9" textAnchor="middle">Orphaned (GC-bound)</text>
                  </g>

                  {/* Pulsing indicator on new tip */}
                  <circle cx="650" cy="160" r="26" fill="none" stroke="#10b981" strokeWidth="1.5">
                    <animate attributeName="r" values="22;32;22" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: STEP-BY-STEP REBASE WORKFLOW ─────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Under the Hood: The 4-Step Rebase Life Cycle
            </h2>
          </div>

          {/* Interactive Steps Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {rebaseSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeStep === idx
                    ? "bg-cyan-950/70 border-cyan-500 shadow-md shadow-cyan-950"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                  STEP 0{idx + 1}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {step.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  {step.desc}
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-cyan-900/40 bg-slate-900/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
                <Play className="w-4 h-4" /> {rebaseSteps[activeStep].title}
              </div>
              <span className="text-xs font-mono text-slate-400">
                Phase {activeStep + 1} of 4
              </span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {rebaseSteps[activeStep].desc}
            </p>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
              💡 Engine Detail: {rebaseSteps[activeStep].detail}
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: TERMINAL SIMULATOR & WORKFLOW COMMANDS ───────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Standard Rebase Execution Workflow</h2>
              <p className="text-xs text-slate-400">Command line sequence to safely rebase a feature branch on main</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  bash - Sukanta@Barrackpore-DevStation: ~/accotax-billing
                </span>
              </div>
              <span className="text-xs text-cyan-400 font-mono">git v2.43+</span>
            </div>

            <div className="p-5 font-mono text-xs text-slate-300 space-y-3 leading-relaxed">
              <div>
                <span className="text-emerald-400">sukanta@accotax:~/accotax-billing$</span>{" "}
                <span className="text-white font-bold">git switch feature/gst-calc</span>
              </div>
              <div className="text-slate-400 pl-4">
                Switched to branch 'feature/gst-calc'
              </div>

              <div>
                <span className="text-emerald-400">sukanta@accotax:~/accotax-billing$</span>{" "}
                <span className="text-white font-bold">git rebase main</span>
              </div>
              <div className="text-cyan-300 pl-4 space-y-1">
                <div>Auto-merging gst.js</div>
                <div>Applying: feat: implement 18% GST calculation</div>
                <div>Applying: feat: add compensation cess</div>
                <div className="text-emerald-400 font-bold">Successfully rebased and updated refs/heads/feature/gst-calc.</div>
              </div>

              <div>
                <span className="text-emerald-400">sukanta@accotax:~/accotax-billing$</span>{" "}
                <span className="text-white font-bold">git log --oneline --graph</span>
              </div>
              <div className="text-slate-300 pl-4 font-mono space-y-0.5">
                <div>* <span className="text-amber-400">9c1f24d</span> (HEAD -&gt; feature/gst-calc) feat: add compensation cess</div>
                <div>* <span className="text-amber-400">3a4e18b</span> feat: implement 18% GST calculation</div>
                <div>* <span className="text-cyan-400">8d712f0</span> (main) feat: register Barrackpore regional office code</div>
                <div>* <span className="text-cyan-400">5b293c1</span> feat: add Rupee currency constant</div>
                <div>* <span className="text-slate-500">11a09ef</span> feat: add FY 2026-27 settings</div>
                <div>* <span className="text-slate-500">e27041a</span> feat: initial ledger setup</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: PRO TIPS & COMMON PITFALLS ──────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-emerald-900/40 bg-emerald-950/10 space-y-3">
            <h3 className="text-base font-semibold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Best Practices & Pro Tips
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Rebase local feature branches before PR submission:</strong> Ensures reviewers see your commits directly on top of the newest `main`.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Create a safety bookmark branch:</strong> Run <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">git branch backup-feat</code> before your first complex rebase.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Use git reflog as your safety net:</strong> If anything goes wrong, you can always recover the old branch tip in 5 seconds.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-rose-900/40 bg-rose-950/10 space-y-3">
            <h3 className="text-base font-semibold text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" /> Common Pitfalls to Avoid
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>NEVER rebase public shared branches:</strong> Rewriting commits that collaborators have pulled will wreak havoc across your team.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Do not run `git commit` during rebase conflicts:</strong> Always stage with `git add` and run `git rebase --continue`.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Don't panic on conflicts:</strong> Use <code className="text-rose-300 bg-slate-900 px-1 py-0.5 rounded">git rebase --abort</code> to instantly rewind to the clean start state.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── SECTION 8: REAL-WORLD SCENARIO / CASE STUDY ─────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Enterprise Case Study</span>
              <h2 className="text-xl font-bold text-white">AccoTax Barrackpore: GST Invoicing Release 2026-27</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            During the annual tax filing rush in Barrackpore, developer <strong className="text-cyan-300">Mahima</strong> created
            a feature branch <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">feature/eway-bill-generation</code>.
            While she spent 3 days adding automated JSON generation for ₹50,000+ invoices,
            senior architect <strong className="text-amber-300">Sukanta Sir</strong> merged 6 urgent security patches into <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">main</code>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <div className="text-xs font-semibold text-rose-400 uppercase mb-1">The Cluttered Way (git merge)</div>
              <p className="text-xs text-slate-400">
                If Mahima ran <code className="text-rose-300">git merge main</code> every day, her branch history would contain 3 separate
                "Merge branch 'main' into feature" commits, obscuring her actual GST logic in the code review.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-800/40 bg-emerald-950/20">
              <div className="text-xs font-semibold text-emerald-400 uppercase mb-1">The Clean Way (git rebase)</div>
              <p className="text-xs text-slate-400">
                By running <code className="text-emerald-300">git rebase main</code>, Mahima replayed her 2 JSON generator commits cleanly on top of
                Sukanta Sir's latest security fixes. The Pull Request was approved in 10 minutes!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: KEY TAKEAWAYS / SUMMARY MATRIX ───────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-cyan-400" /> Comparison Matrix: Rebase vs Merge at a Glance
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-3.5">Feature / Metric</th>
                  <th className="p-3.5 text-cyan-400">git rebase</th>
                  <th className="p-3.5 text-indigo-400">git merge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Commit Graph Topology</td>
                  <td className="p-3.5 text-cyan-300 font-medium">100% Linear (Straight line)</td>
                  <td className="p-3.5 text-indigo-300 font-medium">Divergent with diamond merge nodes</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">History Preservation</td>
                  <td className="p-3.5">Rewrites commit hashes & dates</td>
                  <td className="p-3.5">Preserves exact original timeline & hashes</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Number of Parents</td>
                  <td className="p-3.5">1 parent per replayed commit</td>
                  <td className="p-3.5">2 parents for 3-way merge commit</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Best Used For</td>
                  <td className="p-3.5">Local feature cleanup before pull requests</td>
                  <td className="p-3.5">Public branch integrations (e.g. merging PR into main)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Safety on Shared Branches</td>
                  <td className="p-3.5 text-rose-400 font-semibold">⚠️ DANGEROUS (Golden Rule)</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">✅ 100% Safe (Non-destructive)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 10: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Sachin & Susmita Ask Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Sachin (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, if rebasing changes all the commit hashes, doesn't that mean we are creating duplicate work in the repository?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Great question Sachin! In terms of disk space, commit objects and patch deltas are only a few hundred bytes.
                  The old commits become orphaned references. Git will keep them safely in your local <code className="text-cyan-300">reflog</code> for 30 days
                  in case you need to undo. Later, <code className="text-cyan-300">git gc</code> automatically sweeps them away.
                  So your repo remains light, fast, and pristine!"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <span>Susmita (Student, Shyamnagar):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, when should I NOT rebase under any circumstances?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Memorize the <strong>Golden Rule of Rebasing</strong>: Never rebase commits that exist outside your own private sandbox!
                  If your branch is already pushed to GitHub and other engineers like Abhronila or Debangshu are pulling from it,
                  use <code className="text-cyan-300">git merge</code>. Only rebase your local, private branches."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 11: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 0: What is Git Rebase? (Printable Notes)" />
        </section>

        {/* ─── SECTION 12: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 carefully curated technical interview questions on Git Rebase mechanics
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
              <ArrowLeft className="w-4 h-4" /> Previous Module (Merge & Conflicts)
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 bg-cyan-950 hover:bg-cyan-900 text-sm font-semibold text-cyan-200 shadow-lg shadow-cyan-950/60 transition"
            >
              Next Topic: Rebase vs Merge Philosophy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
