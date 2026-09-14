import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
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
  Trash2,
  Sliders,
  Check,
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  GitMerge,
  Network,
  ShieldAlert,
  Flame,
  SplitSquareVertical
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic 5: What Causes Merge Conflicts? Concurrent modifications to the same lines in the same file across divergent branches
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [conflictType, setConflictType] = useState("content"); // "content", "modify_delete", "rename"
  const [activeTab, setActiveTab] = useState("theory");

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* ─── Top Sticky Mini Bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <Link
            to={`/${folder}`}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">
            {currentModule?.title || "Merging Strategies"}
          </span>
          <span>/</span>
          <span className="text-amber-400 font-mono">Topic-05</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={prevTopicUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* ─── Section 1: Header & Badges ─────────────────────────────────── */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              Conflict Anatomy
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Intermediate • 45 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Git ORT / 3-Way Engine
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            What Causes Merge Conflicts?
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Understanding the algorithmic triggers of Git merge conflicts: why concurrent modifications to the same line blocks break automated reconciliation, how 3-way comparisons evaluate intent, and why conflicts are safe checkpoints, not repository disasters.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border border-rose-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-rose-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Explain Like I'm 10: The Shared Ledger at Barrackpore
              </h2>
              <p className="text-xs text-rose-300">
                Sukanta Sir explains merge conflicts to Sachin and Susmita at Coder & AccoTax
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-amber-300">Sachin:</strong> "Sukanta Sir! My heart skipped a beat today. I ran <code className="text-rose-400 font-mono">git merge feature/luxury-tax</code> and terminal screamed <em className="text-rose-400 font-semibold">CONFLICT (content): Merge conflict in server.js</em>! Did I corrupt the client's accounting repository?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Not at all, Sachin! Relax. Imagine our physical accounting ledger at Coder & AccoTax. On Monday, line 15 stated that the consultation fee was <strong className="text-amber-400 font-semibold">₹500</strong>. On Tuesday, you photocopied the page to work on regular billing and changed line 15 to <strong className="text-emerald-400 font-semibold">₹1,200</strong>. Simultaneously, Susmita photocopied the same page for luxury corporate clients and changed line 15 to <strong className="text-indigo-400 font-semibold">₹3,500</strong>."
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Susmita
              </div>
              <p>
                <strong className="text-indigo-300">Susmita:</strong> "And when we bring both photocopies back to the main ledger, what should the master bookkeeper write on line 15? ₹1,200 or ₹3,500?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Exactly! Git is that honest bookkeeper. Git says: <em>'Both Sachin and Susmita branched from ₹500, but both changed line 15 to different numbers. If I guess, I might cause financial damage. I will stop, highlight both changes, and let the developers decide.'</em> That is a merge conflict—a protective safety feature, not a bug!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive SVG Animation ───────────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-rose-400" />
                Animated 3-Way Conflict Trigger Visualization
              </h2>
              <p className="text-xs text-slate-400">
                Visualizing how divergent modifications from a common ancestor (Merge Base) trigger conflict checkpoints
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setConflictType("content")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  conflictType === "content"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Line Content Conflict
              </button>
              <button
                onClick={() => setConflictType("modify_delete")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  conflictType === "modify_delete"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Modify vs Delete
              </button>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
            <svg
              viewBox="0 0 760 260"
              className="w-full max-w-2xl h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Background */}
              <defs>
                <pattern id="grid5" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="conflictGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <rect width="760" height="260" fill="url(#grid5)" opacity="0.7" />

              {/* Branch Connecting Lines */}
              <path
                d="M 120 130 L 260 130"
                stroke="#64748b"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              <path
                d="M 260 130 C 330 130, 350 70, 430 70 L 560 70"
                stroke="#38bdf8"
                strokeWidth="3"
              />
              <path
                d="M 260 130 C 330 130, 350 190, 430 190 L 560 190"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              {/* Merge Attempt Dashed Lines converging to Conflict */}
              <path
                d="M 560 70 C 620 70, 640 120, 670 125"
                stroke="#f43f5e"
                strokeWidth="3"
                strokeDasharray="5 3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="16;0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M 560 190 C 620 190, 640 140, 670 135"
                stroke="#f43f5e"
                strokeWidth="3"
                strokeDasharray="5 3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="16;0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Commit Nodes */}
              {/* C0 Initial */}
              <circle cx="120" cy="130" r="16" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
              <text x="120" y="135" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                C0
              </text>
              <text x="120" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">
                Initial
              </text>

              {/* C1 Merge Base */}
              <circle cx="260" cy="130" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="4" />
              <text x="260" y="134" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                C1
              </text>
              <text x="260" y="100" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                Merge Base (O)
              </text>
              <text x="260" y="165" fill="#64748b" fontSize="10" textAnchor="middle">
                GST = 18%
              </text>

              {/* C2 Sachin on main */}
              <circle cx="430" cy="70" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
              <text x="430" y="74" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                C2
              </text>
              <circle cx="560" cy="70" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              <text x="560" y="74" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                C3 (HEAD)
              </text>
              <text x="560" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                main (Sachin)
              </text>
              <text x="560" y="98" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                {conflictType === "content" ? "Line 6: PORT=5000" : "server.js edited"}
              </text>

              {/* C4 Susmita on feature */}
              <circle cx="430" cy="190" r="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
              <text x="430" y="194" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                C4
              </text>
              <circle cx="560" cy="190" r="18" fill="#d97706" stroke="#fbbf24" strokeWidth="3" />
              <text x="560" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                C5 (feat)
              </text>
              <text x="560" y="222" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                feature (Susmita)
              </text>
              <text x="560" y="240" fill="#fde68a" fontSize="10" textAnchor="middle">
                {conflictType === "content" ? "Line 6: PORT=8080" : "server.js deleted"}
              </text>

              {/* Conflict Halt Icon */}
              <g transform="translate(660, 110)">
                <rect width="70" height="40" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="35" y="24" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">
                  ! CONFLICT
                </text>
              </g>
            </svg>

            <div className="mt-4 text-xs text-slate-400 text-center max-w-xl">
              {conflictType === "content" ? (
                <p>
                  <strong className="text-rose-400">Content Collision:</strong> Both branches originated from Base commit C1 where <code className="text-slate-200">PORT = 3000</code>. Branch <code className="text-sky-400">main</code> changed it to 5000, while branch <code className="text-amber-400">feature</code> changed it to 8080. Git flags an unresolvable collision.
                </p>
              ) : (
                <p>
                  <strong className="text-amber-400">Modify vs Delete:</strong> Sachin refactored <code className="text-sky-400">server.js</code> on main while Susmita ran <code className="text-amber-400">git rm server.js</code> on feature. Git cannot decide whether to preserve edits or honor the deletion.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Section 4: Deep Technical Analysis ─────────────────────────── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              The 3-Way Merge Decision Matrix
            </h2>
            <p className="text-sm text-slate-400">
              How Git's ORT algorithm calculates whether changes can be automatically resolved or must trigger a conflict
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Clean Auto-Merge Scenarios (0 Conflicts)
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">1.</span>
                  <span>
                    <strong>Only One Branch Modified:</strong> If Base = ₹500, HEAD = ₹1,200, Feature = ₹500 &rarr; Git accepts ₹1,200 automatically.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">2.</span>
                  <span>
                    <strong>Different Files:</strong> Sachin creates <code className="text-slate-200">tax.js</code>, Susmita creates <code className="text-slate-200">invoice.js</code> &rarr; Git adds both cleanly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">3.</span>
                  <span>
                    <strong>Non-overlapping Lines:</strong> Sachin edits line 10, Susmita edits line 140 &rarr; Git seamlessly weaves both changes together.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">4.</span>
                  <span>
                    <strong>Identical Changes:</strong> Both branches independently changed line 10 from ₹500 to ₹1,000 &rarr; Git treats this as agreement and merges cleanly.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-rose-900/40 space-y-3">
              <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Conflict Triggers (Human Resolution Required)
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono font-bold">1.</span>
                  <span>
                    <strong>Line Content Collision:</strong> Base = ₹500, HEAD = ₹1,200, Feature = ₹3,500 &rarr; Git halts with <code className="text-rose-300">CONFLICT (content)</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono font-bold">2.</span>
                  <span>
                    <strong>Modify / Delete:</strong> HEAD modified file while Feature removed it &rarr; Git halts with <code className="text-rose-300">CONFLICT (modify/delete)</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono font-bold">3.</span>
                  <span>
                    <strong>Add / Add Collision:</strong> Both branches added a new file named <code className="text-slate-200">config.json</code> with different contents &rarr; <code className="text-rose-300">both added</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-mono font-bold">4.</span>
                  <span>
                    <strong>Rename / Rename:</strong> HEAD renamed <code className="text-slate-200">app.js</code> to <code className="text-slate-200">server.js</code> while Feature renamed it to <code className="text-slate-200">main.js</code>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Section 5: The Three Git Index Stages ───────────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg border-b border-slate-800 pb-3">
            <Database className="w-5 h-5" />
            Under the Hood: Index Stages in an Unmerged State
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            When a merge conflict occurs, Git's staging area (index) holds up to <strong>three versions</strong> of the conflicted file instead of the usual Stage 0:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">STAGE 1: Common Base</div>
              <p className="text-xs text-slate-400">
                The version of the file as it existed in the common ancestor commit (<code className="text-slate-300 font-mono">merge-base</code>).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-sky-400 font-bold mb-1">STAGE 2: Target (HEAD / Ours)</div>
              <p className="text-xs text-slate-400">
                The version of the file from the branch you were currently on when you ran the merge command.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-amber-400 font-bold mb-1">STAGE 3: Incoming (Theirs)</div>
              <p className="text-xs text-slate-400">
                The version of the file from the branch you are actively merging in.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <p className="text-slate-500"># Inspect all active unmerged stages:</p>
            <p className="text-emerald-400">$ git ls-files -u</p>
            <p className="text-slate-400">100644 4b825dc... 1  src/server.js  (Stage 1: Base)</p>
            <p className="text-slate-400">100644 a1b2c3d... 2  src/server.js  (Stage 2: Ours/HEAD)</p>
            <p className="text-slate-400">100644 f9e8d7c... 3  src/server.js  (Stage 3: Theirs/Feature)</p>
          </div>
        </div>

        {/* ─── Section 6: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Swadeep:</strong> "Sir, why didn't Git just choose Sachin's commit since he committed last?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Timestamp ordering is dangerous in distributed development. Sachin might have committed 2 seconds later while Susmita was offline on the train from Sealdah. Timestamps have zero correlation with business logic authority. In Coder & AccoTax billing software, picking by timestamp could overwrite GST slab updates with obsolete testing values!"
            </p>
            <p>
              <strong className="text-rose-400">Debangshu:</strong> "What if I get overwhelmed by a huge conflict?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "You can always run <code className="text-amber-300 font-mono">git merge --abort</code>. Git will cleanly undo the attempt and return your workspace to the exact state before you started."
            </p>
          </div>
        </div>

        {/* ─── Section 7: Key Takeaways & Best Practices ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Proactive Strategies to Prevent Conflicts
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Keep feature branches short-lived (1-3 days maximum).</li>
              <li>Pull and integrate <code className="text-slate-200">main</code> into your feature branch daily.</li>
              <li>Break large monolithic files into modular single-responsibility files.</li>
              <li>Communicate with teammates before refactoring shared core utilities.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Common Beginner Mistakes
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Panicking and deleting the <code className="text-slate-200">.git</code> folder.</li>
              <li>Committing raw conflict marker tags (<code className="text-rose-400">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>) into production.</li>
              <li>Assuming conflicts mean data loss (all 3 versions are safe in index).</li>
              <li>Resolving conflicts without talking to the author of the incoming branch.</li>
            </ul>
          </div>
        </div>

        {/* ─── Section 8: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: What Causes Merge Conflicts"
          content={noteText}
        />

        {/* ─── Section 9: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Understanding Merge Conflicts"
          questions={questions}
        />

        {/* ─── Section 10: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 11: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Preserving Branch Topologies (--no-ff)
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Anatomy of Conflict Markers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
