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
  Undo2,
  ShieldX
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic 9: Aborting a Merge Safely: Canceling an in-progress merge with git merge --abort to return to a clean working state
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [isAborted, setIsAborted] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 9;
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
          <span className="text-amber-400 font-mono">Topic-09</span>
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
              <Undo2 className="w-3.5 h-3.5" />
              Atomic Rollback
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Intermediate • 35 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Zero Data Loss Safety
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Aborting a Merge Safely
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Canceling an in-progress merge with <code className="text-rose-400 font-mono">git merge --abort</code>: how Git dismantles <code className="text-slate-300 font-mono">.git/MERGE_HEAD</code>, cleans up index stages 1, 2, and 3, strips conflict markers from working tree files, and restores pristine pre-merge states.
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
                Explain Like I'm 10: The Big Red "Undo" Button
              </h2>
              <p className="text-xs text-rose-300">
                Tuhina and Sachin learn how to gracefully back out of messy merges with Sukanta Sir
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Tuhina
              </div>
              <p>
                <strong className="text-indigo-300">Tuhina:</strong> "Sir! I accidentally merged the experimental AI Tax feature into the main client branch instead of the standard bugfix branch. Now 14 files have conflict markers everywhere! Am I in deep trouble?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Not at all, Tuhina! Have you typed <code className="text-slate-200 font-mono">git commit</code> yet?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Tuhina
              </div>
              <p>
                <strong className="text-indigo-300">Tuhina:</strong> "No Sir! The terminal is still showing unmerged paths."
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Then you have full superpower! Type <code className="text-rose-400 font-mono font-bold">git merge --abort</code>. Git will instantly throw away all 14 sets of conflict markers, rip down its temporary merge scaffolding, and return every single file to the pristine state you had 5 minutes ago. It's like the mistake never happened!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive SVG Rollback Simulator ──────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-rose-400" />
                Animated Merge State vs Aborted Rollback
              </h2>
              <p className="text-xs text-slate-400">
                Toggle between the active in-progress conflict state and the post-abort clean restoration
              </p>
            </div>

            <button
              onClick={() => setIsAborted(!isAborted)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                isAborted
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                  : "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
              }`}
            >
              {isAborted ? <RotateCcw className="w-3.5 h-3.5" /> : <Undo2 className="w-3.5 h-3.5" />}
              {isAborted ? "Simulate New Conflict" : "Execute: git merge --abort"}
            </button>
          </div>

          {/* SVG Canvas */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
            <svg
              viewBox="0 0 760 260"
              className="w-full max-w-2xl h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* DAG Nodes */}
              <circle cx="120" cy="130" r="16" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
              <text x="120" y="135" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                C1
              </text>

              <line x1="136" y1="130" x2="264" y2="130" stroke="#64748b" strokeWidth="3" />

              <circle cx="280" cy="130" r="16" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
              <text x="280" y="135" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                Base
              </text>

              {/* Branch paths */}
              <path d="M 296 130 C 350 130, 370 70, 440 70" stroke="#38bdf8" strokeWidth="3" />
              <path d="M 296 130 C 350 130, 370 190, 440 190" stroke="#f59e0b" strokeWidth="3" />

              {/* Head Commit */}
              <circle cx="456" cy="70" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
              <text x="456" y="74" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                HEAD
              </text>
              <text x="456" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                main (Clean)
              </text>

              {/* Feature Commit */}
              <circle cx="456" cy="190" r="18" fill="#d97706" stroke="#fbbf24" strokeWidth="3" />
              <text x="456" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Feat
              </text>
              <text x="456" y="222" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                experimental
              </text>

              {/* State Container */}
              {!isAborted ? (
                <g transform="translate(560, 60)">
                  <rect width="170" height="140" rx="10" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                  <text x="85" y="28" fill="#fda4af" fontSize="12" fontWeight="bold" textAnchor="middle">
                    ACTIVE CONFLICT
                  </text>
                  <text x="85" y="52" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    • .git/MERGE_HEAD active
                  </text>
                  <text x="85" y="72" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    • Index Stages 1, 2, 3 open
                  </text>
                  <text x="85" y="92" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    • Markers inside files
                  </text>
                  <text x="85" y="120" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                    [git merge --abort needed]
                  </text>
                </g>
              ) : (
                <g transform="translate(560, 60)">
                  <rect width="170" height="140" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="85" y="28" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                    RESTORED CLEAN
                  </text>
                  <text x="85" y="52" fill="#d1fae5" fontSize="10" textAnchor="middle">
                    ✓ .git/MERGE_HEAD deleted
                  </text>
                  <text x="85" y="72" fill="#d1fae5" fontSize="10" textAnchor="middle">
                    ✓ Index reset to Stage 0
                  </text>
                  <text x="85" y="92" fill="#d1fae5" fontSize="10" textAnchor="middle">
                    ✓ All markers removed
                  </text>
                  <text x="85" y="120" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Tree Pristine &amp; Ready
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* ─── Section 4: Deep Technical Analysis ─────────────────────────── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Internal Rollback Steps Executed by Git
            </h2>
            <p className="text-sm text-slate-400">
              The atomic operations performed under the hood when <code className="text-slate-200">git merge --abort</code> is invoked
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-mono font-bold text-xs">PHASE 1</div>
              <h3 className="text-sm font-semibold text-white">Metadata Deletion</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Git permanently deletes <code className="text-slate-200">.git/MERGE_HEAD</code>, <code className="text-slate-200">.git/MERGE_MSG</code>, and <code className="text-slate-200">.git/MERGE_MODE</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-sky-400 font-mono font-bold text-xs">PHASE 2</div>
              <h3 className="text-sm font-semibold text-white">Index Stage Reset</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clears unmerged Stages 1, 2, and 3 from Git's index and resets Stage 0 to the exact tree hash of current HEAD.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-mono font-bold text-xs">PHASE 3</div>
              <h3 className="text-sm font-semibold text-white">Working Tree Restoration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces conflicted files in your working directory with the original pre-merge versions, discarding all conflict delimiters.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 5: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Sachin:</strong> "Sir, what happens if I already committed the merge by mistake? Does <code className="text-slate-200 font-mono">git merge --abort</code> still work?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "No! Once committed, the merge is part of the permanent DAG history. To undo a committed merge, you use <code className="text-sky-400 font-mono">git reset --hard HEAD~1</code> (if local and unpushed) or <code className="text-amber-300 font-mono">git revert -m 1 &lt;commit_sha&gt;</code> (if already pushed to GitHub)."
            </p>
          </div>
        </div>

        {/* ─── Section 6: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              When to Use git merge --abort
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>You merged the wrong feature branch.</li>
              <li>The conflict is far larger than anticipated and requires team alignment.</li>
              <li>You made bad manual edits and want a fresh start.</li>
              <li>CI/CD scripts checking if branches merge cleanly.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
              <ShieldX className="w-4 h-4" />
              What NOT to Do
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Do NOT delete conflicted files with <code className="text-slate-200">rm</code>.</li>
              <li>Do NOT delete the <code className="text-slate-200">.git</code> folder.</li>
              <li>Do NOT commit broken files just to clear the merge prompt.</li>
            </ul>
          </div>
        </div>

        {/* ─── Section 7: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Aborting a Merge Safely"
          content={noteText}
        />

        {/* ─── Section 8: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Aborting Merges"
          questions={questions}
        />

        {/* ─── Section 9: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 10: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Graphical &amp; Visual Merge Tools
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Squash Merging (git merge --squash)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
