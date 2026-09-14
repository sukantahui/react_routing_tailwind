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
  Trash2,
  Sliders,
  Check,
  Flame,
  LifeBuoy,
  Lock,
  GitCommit
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic 7: The Golden Safety Rule of git reset --hard: Understanding what is permanently unrecoverable vs what is in Git's object store
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [activeTab, setActiveTab] = useState("committed");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const safetyCategories = {
    committed: {
      title: "Committed Data (In Object Store)",
      statusBadge: "100% Safe & Recoverable",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "Any code that has been committed is stored as an immutable commit object in .git/objects/ and logged in git reflog. Even if you run git reset --hard HEAD~10, you can restore all 10 commits instantly using git reflog.",
      recoveryMethod: "git reflog\ngit reset --hard HEAD@{1} # Restores the exact prior state!"
    },
    staged: {
      title: "Staged Data (Ran 'git add', not committed)",
      statusBadge: "Stored as Blob in .git/objects",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "When you run git add, Git immediately writes compressed blob objects into .git/objects/. If you hard reset before committing, the blob becomes dangling but can be recovered using git fsck --lost-found.",
      recoveryMethod: "git fsck --lost-found\n# Look inside .git/lost-found/other/ for dangling blobs"
    },
    uncommitted: {
      title: "Uncommitted & Unstaged Working Tree Edits",
      statusBadge: "PERMANENTLY LOST BY GIT",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Edits in files on your hard disk that have never been staged (git add) or committed exist solely in operating system memory/disk. git reset --hard overwrites them immediately. Git has zero record of this content.",
      recoveryMethod: "Check VS Code 'Timeline / Local History' or OS file recovery (Git cannot help)."
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 7 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Golden Safety Rule of git reset --hard
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Committed safety vs uncommitted data loss, disaster recovery with reflog, and the defensive checkpoint workflow.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <LifeBuoy className="w-3.5 h-3.5" /> Reflog Safety Net
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-800">
                <AlertTriangle className="w-3.5 h-3.5" /> Permanent Loss Boundary
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: SIMPLE LANGUAGE EXPLANATION (ELI10) ─────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Explain Like I&apos;m 10: The Bank Vault vs The Sticky Note on Your Table
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding what Git guarantees to protect versus what is left outside.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" /> The Bank Locker Analogy
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you deposit gold jewelry inside a <strong>bank locker (a Git Commit)</strong>, the bank keeps a ledger (git reflog) of everything you deposit. Even if you move to a new apartment or lose your key, the bank records will prove your deposit exists.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                However, if you leave a loose ₹500 rupee note on your desk (uncommitted code) and the cleaning staff sweeps the room (<code className="text-rose-300 font-mono">git reset --hard</code>), that note is gone forever because the bank never knew it existed!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Guidance at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Debangshu:</strong> &quot;Sir, is there ANY case where <code className="text-rose-300 font-mono">git reset --hard</code> can cause unrecoverable loss?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;YES! If you have uncommitted changes in your files that were never committed or staged, hard reset wipes them completely. That is why we ALWAYS commit or stash before resetting!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION & THREE DATA TIERS ─────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              The Three Tiers of Data Safety in Git
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {Object.entries(safetyCategories).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === key
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Tab Details Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white">
                {safetyCategories[activeTab].title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${safetyCategories[activeTab].badgeColor}`}>
                {safetyCategories[activeTab].statusBadge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {safetyCategories[activeTab].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">Recovery Procedure:</span>
              <pre className="font-mono text-xs text-cyan-300 whitespace-pre-wrap">
                {safetyCategories[activeTab].recoveryMethod}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC ANIMATED SVG SAFETY HIERARCHY ───────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual Diagram: The Reflog Safety Net vs The Hard Reset Cliff
                </h2>
                <p className="text-xs text-slate-400">
                  How git reflog catches committed snapshots while uncommitted edits fall off the edge.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 300"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              <defs>
                <linearGradient id="safeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
              </defs>

              {/* Safe Zone Container */}
              <rect x="50" y="40" width="330" height="220" rx="12" fill="#064e3b" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="215" y="70" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                SAFE ZONE (.git/objects + Reflog)
              </text>
              <circle cx="140" cy="140" r="28" fill="url(#safeGrad)" stroke="#6ee7b7" strokeWidth="2" />
              <text x="140" y="145" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Commit C1</text>
              <circle cx="280" cy="140" r="28" fill="url(#safeGrad)" stroke="#6ee7b7" strokeWidth="2" />
              <text x="280" y="145" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Commit C2</text>
              <text x="215" y="215" textAnchor="middle" fill="#a7f3d0" fontSize="11">
                Recoverable via `git reflog` (90-day grace period)
              </text>

              {/* Danger Zone Container */}
              <rect x="420" y="40" width="330" height="220" rx="12" fill="#7f1d1d" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="585" y="70" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">
                VOLATILE ZONE (Working Directory Only)
              </text>
              <rect x="490" y="115" width="190" height="50" rx="8" fill="url(#dangerGrad)" stroke="#fca5a5" strokeWidth="2">
                <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" />
              </rect>
              <text x="585" y="145" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                Uncommitted Edits on Disk
              </text>
              <text x="585" y="215" textAnchor="middle" fill="#fca5a5" fontSize="11">
                PERMANENTLY DESTROYED by `git reset --hard`
              </text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: STEP-BY-STEP REFLOG RESCUE WALKTHROUGH ───────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Emergency Step-by-Step Reflog Rescue Procedure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase">Step 1: Check Reflog</span>
              <p className="text-xs text-slate-300">
                Run <code className="text-cyan-300 font-mono">git reflog</code> to find the commit SHA right before the reset operation.
              </p>
              <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-400">
                HEAD@&#123;1&#125;: commit: feat(gst)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase">Step 2: Inspect or Branch</span>
              <p className="text-xs text-slate-300">
                Create a rescue branch with <code className="text-amber-300 font-mono">git branch rescue HEAD@&#123;1&#125;</code> to inspect safely.
              </p>
              <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-400">
                git branch rescue 8f2a10
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Step 3: Reset Forward</span>
              <p className="text-xs text-slate-300">
                Or rewind back to the top with <code className="text-emerald-300 font-mono">git reset --hard HEAD@&#123;1&#125;</code>.
              </p>
              <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-400">
                git reset --hard HEAD@&#123;1&#125;
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS ──────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Common Reset Recovery Pitfalls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Panicking and Deleting .git
              </div>
              <p className="text-xs text-slate-300">
                When a bad reset happens, deleting the <code className="text-rose-300 font-mono">.git</code> folder wipes the reflog and database forever.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proper Action
              </div>
              <p className="text-xs text-slate-400">
                Never delete <code className="text-cyan-300 font-mono">.git</code>! Everything is safe in reflog.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Resetting Without Status Check
              </div>
              <p className="text-xs text-slate-300">
                Running hard reset blindly while having uncommitted scratch notes on disk.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proper Action
              </div>
              <p className="text-xs text-slate-400">
                Run <code className="text-cyan-300 font-mono">git status</code> first; stash if needed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Running git gc Immediately
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-rose-300 font-mono">git gc --prune=now</code> before checking reflog.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Proper Action
              </div>
              <p className="text-xs text-slate-400">
                Leave garbage collection to automated background routines.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Emergency Survival Muscle Memory Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create 2 commits. Intentionally run <code className="text-rose-300 font-mono">git reset --hard HEAD~2</code> to simulate an accidental wipe. Now immediately run <code className="text-cyan-300 font-mono">git reflog</code> and restore your files with <code className="text-amber-300 font-mono">git reset --hard HEAD@&#123;1&#125;</code>. Practice this until fear turns into confidence!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="git reset --hard & Data Permanence FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Git Data Permanence & Reflog Safety Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Revision Note"
          downloadFileName="git_hard_reset_safety_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Core Principle: If you committed it, Git will not lose it. If you only typed it in your editor and never staged or committed it, Git cannot protect it. Make frequent small commits, and git reflog will always be your guardian angel! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 6 (Three Modes of Reset)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 8: Safe Undo for Shared Branches (git revert)</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
