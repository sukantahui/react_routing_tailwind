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
  Minimize2
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic 10: Squash Merging: Consolidating an entire feature branch's commits into a single commit using git merge --squash
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [viewMode, setViewMode] = useState("squash"); // "standard" vs "squash"

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 10;
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
          <span className="text-amber-400 font-mono">Topic-10</span>
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Minimize2 className="w-3.5 h-3.5" />
              History Compression
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Intermediate • 40 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Single-Parent Linearization
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Squash Merging: Consolidating Feature Commits
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Mastering <code className="text-indigo-400 font-mono">git merge --squash</code>: compressing an entire sequence of local work-in-progress micro-commits into a single, clean, production-ready atomic commit with a single parent on the target branch.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-indigo-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-indigo-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Explain Like I'm 10: The Chef's Rough Notes vs The Printed Menu
              </h2>
              <p className="text-xs text-indigo-300">
                Sukanta Sir explains squash merges to Sachin and Susmita at Coder & AccoTax
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-amber-300">Sachin:</strong> "Sir, while coding the GST invoice generator, I made 12 messy commits: <em>'WIP button'</em>, <em>'fix typo'</em>, <em>'try again'</em>, <em>'oops semicolon missing'</em>. If I merge these into main, my boss will see all my clumsy trial-and-error!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Haha! Think of a master chef inventing a new dessert in Barrackpore. In the kitchen, the chef scribbles on 12 scrap napkins: <em>'add 5g sugar'</em>, <em>'oops too sweet'</em>, <em>'add lemon juice'</em>. But when the restaurant opens, does the chef hand 12 dirty napkins to the customer? No! The menu simply reads: <strong className="text-emerald-400 font-semibold">'Lemon Soufflé - ₹450'</strong>. That is a squash merge—it rolls up all 12 scrap napkins into one perfect final dish!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Susmita
              </div>
              <p>
                <strong className="text-indigo-300">Susmita:</strong> "And what happens to the DAG history on main? Does it create a merge knot with 2 parents?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "No! It creates a normal single-parent commit. The main branch timeline stays 100% straight and linear, making git log beautiful to read!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive Visual DAG Animation ────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-400" />
                Standard 3-Way Merge vs Squash Merge Topology
              </h2>
              <p className="text-xs text-slate-400">
                Observe the difference in DAG commit history and parent node pointers
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode("standard")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  viewMode === "standard"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Standard Merge (2 Parents)
              </button>
              <button
                onClick={() => setViewMode("squash")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  viewMode === "squash"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Squash Merge (1 Parent)
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
              {/* Main Line */}
              <line x1="80" y1="80" x2="680" y2="80" stroke="#38bdf8" strokeWidth="3" />

              {/* Commits on main */}
              <circle cx="100" cy="80" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
              <text x="100" y="84" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                C1
              </text>

              <circle cx="220" cy="80" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="4" />
              <text x="220" y="84" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                Base
              </text>

              {/* Feature Branch (4 micro commits) */}
              <path d="M 220 80 C 270 80, 280 180, 330 180 L 530 180" stroke="#fbbf24" strokeWidth="3" strokeDasharray={viewMode === "squash" ? "4 3" : "none"} />

              <circle cx="330" cy="180" r="14" fill="#78350f" stroke="#fbbf24" strokeWidth="2" opacity={viewMode === "squash" ? 0.4 : 1} />
              <text x="330" y="184" fill="#fef3c7" fontSize="9" textAnchor="middle">
                WIP1
              </text>

              <circle cx="400" cy="180" r="14" fill="#78350f" stroke="#fbbf24" strokeWidth="2" opacity={viewMode === "squash" ? 0.4 : 1} />
              <text x="400" y="184" fill="#fef3c7" fontSize="9" textAnchor="middle">
                WIP2
              </text>

              <circle cx="470" cy="180" r="14" fill="#78350f" stroke="#fbbf24" strokeWidth="2" opacity={viewMode === "squash" ? 0.4 : 1} />
              <text x="470" y="184" fill="#fef3c7" fontSize="9" textAnchor="middle">
                WIP3
              </text>

              <circle cx="540" cy="180" r="14" fill="#78350f" stroke="#fbbf24" strokeWidth="2" opacity={viewMode === "squash" ? 0.4 : 1} />
              <text x="540" y="184" fill="#fef3c7" fontSize="9" textAnchor="middle">
                Done
              </text>

              {viewMode === "standard" ? (
                // Standard Merge Commit (2 parents)
                <g>
                  <path d="M 540 180 C 580 180, 600 80, 640 80" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="640" cy="80" r="20" fill="#78350f" stroke="#f59e0b" strokeWidth="4" />
                  <text x="640" y="84" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Merge
                  </text>
                  <text x="640" y="50" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                    2 Parents (Knot)
                  </text>
                </g>
              ) : (
                // Squash Merge Commit (1 parent)
                <g>
                  {/* Squeeze effect arrow */}
                  <path d="M 435 160 C 520 160, 580 90, 640 80" stroke="#818cf8" strokeWidth="3" strokeDasharray="4 2">
                    <animate attributeName="stroke-dashoffset" values="16;0" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  <circle cx="640" cy="80" r="20" fill="#4338ca" stroke="#818cf8" strokeWidth="4" />
                  <text x="640" y="84" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Squash
                  </text>
                  <text x="640" y="50" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    1 Parent (Linear)
                  </text>
                </g>
              )}
            </svg>

            <div className="mt-3 text-xs text-slate-400 text-center max-w-xl">
              {viewMode === "squash" ? (
                <p>
                  <strong className="text-indigo-400">Squash Topology:</strong> All 4 WIP commits are compressed into a single atomic commit on <code className="text-sky-400">main</code>. The resulting commit has only <strong>1 parent</strong>, keeping the production history perfectly linear!
                </p>
              ) : (
                <p>
                  <strong className="text-amber-400">Standard Topology:</strong> All 4 WIP commits remain visible in DAG history, joined by a 2-parent merge commit knot.
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
              Squash Merge vs Standard Merge vs Interactive Rebase
            </h2>
            <p className="text-sm text-slate-400">
              Comparative analysis of architectural mechanics and tradeoffs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-indigo-900/40 space-y-2">
              <div className="text-indigo-400 font-bold text-sm">git merge --squash</div>
              <h3 className="text-xs font-semibold text-white">Target-Side Compression</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Applies all changes to the target branch as staged index modifications. Source branch commits are untouched. Creates 1-parent commit.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-amber-900/40 space-y-2">
              <div className="text-amber-400 font-bold text-sm">git merge --no-ff</div>
              <h3 className="text-xs font-semibold text-white">Full Historical Knot</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preserves every single individual commit made on the branch, joining them with an explicit 2-parent merge commit.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-emerald-900/40 space-y-2">
              <div className="text-emerald-400 font-bold text-sm">git rebase -i</div>
              <h3 className="text-xs font-semibold text-white">Source-Side History Rewrite</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Directly combines and rewrites commits on the feature branch itself before merging into main via fast-forward.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 5: The Golden Rule: Branch Deletion ──────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-lg border-b border-slate-800 pb-3">
            <AlertTriangle className="w-5 h-5" />
            The Golden Rule: Delete Feature Branch Immediately After Squash
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Because a squash merge does <strong>NOT</strong> record a DAG merge link, Git cannot determine that the feature branch was integrated. If you keep developing on the same feature branch, your future merges will trigger messy duplicate conflicts!
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <p className="text-slate-500"># Always delete the branch after squash-committing:</p>
            <p className="text-emerald-400">$ git switch main</p>
            <p className="text-emerald-400">$ git merge --squash feature/invoice-engine</p>
            <p className="text-emerald-400">$ git commit -m "feat(invoice): comprehensive invoice engine"</p>
            <p className="text-rose-400">$ git branch -D feature/invoice-engine  # Clean retirement!</p>
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
              <strong className="text-amber-400">Mahima:</strong> "Sir, why did Git make me use <code className="text-slate-200 font-mono">-D</code> instead of <code className="text-slate-200 font-mono">-d</code> when deleting the squash-merged branch?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Great observation, Mahima! The safe delete flag <code className="text-slate-200 font-mono">-d</code> inspects commit parentage. Because a squash commit has only 1 parent (HEAD), Git's safety check doesn't see a merge commit connecting the branch tip. So Git warns: <em>'The branch is not fully merged.'</em> Using capital <code className="text-rose-400 font-mono">-D</code> overrides this check because you know the code is already squashed into main!"
            </p>
          </div>
        </div>

        {/* ─── Section 7: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              When to Squash Merge
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Pull Requests containing dozens of exploratory WIP commits.</li>
              <li>Small bugfixes and minor feature tasks.</li>
              <li>Teams enforcing a 100% linear git commit log policy.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              When NOT to Squash Merge
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Long-lived shared branches that will continue development.</li>
              <li>Complex architectural multi-stage refactoring where atomic commit audit trail is required.</li>
            </ul>
          </div>
        </div>

        {/* ─── Section 8: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Squash Merging Mechanics"
          content={noteText}
        />

        {/* ─── Section 9: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Squash Merging"
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
            Previous: Aborting a Merge Safely
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Merge Strategies &amp; Algorithms (ORT vs Recursive)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
