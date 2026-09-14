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
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  Edit3,
  CloudUpload,
  FolderSync
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
 * Topic 7: Renaming Branches: git branch -m <old_name> <new_name> and renaming current branch with git branch -M <new_name>
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [activeBranch, setActiveBranch] = useState("feat-gst-typo");
  const [inputRename, setInputRename] = useState("feature/gst-calculation");
  const [historyLog, setHistoryLog] = useState([
    "Initial branch created as 'feat-gst-typo'"
  ]);

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const handleRename = (e) => {
    e.preventDefault();
    const clean = inputRename.trim();
    if (!clean || clean === activeBranch) return;

    const old = activeBranch;
    setActiveBranch(clean);
    setHistoryLog((prev) => [
      `$ git branch -m ${clean} -> Renamed '${old}' to '${clean}'`,
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 7 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Renaming Branches: <code className="text-cyan-300 font-mono text-lg">git branch -m</code> & Modern Remote Sync
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition shadow-lg shadow-cyan-950/50"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: TOPIC OVERVIEW & HIGH-LEVEL INTRO ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400 mt-1">
              <Edit3 className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Pointer Refactoring</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Effortless Branch Refactoring with Zero Risk of Data Loss
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                In Git, renaming a branch is one of the safest operations possible. Because a branch is merely a 41-byte text file on disk, running <code className="text-cyan-300 font-mono">git branch -m &lt;new-name&gt;</code> simply renames the pointer file inside <code className="text-emerald-300 font-mono">.git/refs/heads/</code> and updates <code className="text-purple-300 font-mono">.git/HEAD</code>.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                All commit objects, history trees, blobs, and even branch reflogs are 100% preserved. However, when working with remote repositories (like GitHub or GitLab), renaming requires a 3-step synchronization protocol to update the remote server cleanly.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 border border-amber-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-950 border border-amber-800 rounded-lg text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-200">
              Explain Like I'm 10 (ELI10): Changing the Label on a Bank Document Folder
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, student <strong>Tuhina Mukherjee</strong> created a branch named <code className="text-rose-300 font-mono">feat-gsts-typo</code> by mistake. She asked <strong>Sukanta Hui</strong> if she had to delete all her commits and start over:
            </p>

            <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                Sukanta sir picked up a plastic folder containing 50 invoice papers. "Tuhina, if you misspell the label on the outside of this plastic folder, do you burn all 50 invoices inside?"
              </p>
              <p className="text-xs text-emerald-300 font-semibold">
                "No! You simply peel off the sticker that says 'feat-gsts-typo' and stick on a clean new sticker that says 'feature/gst-calculation'. All 50 invoices stay untouched!"
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-amber-500 pl-3">
              "Tuhina learned: `git branch -m` only renames the sticker. Commit history and code are completely safe." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE RENAME SIMULATOR ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Simulator</span>
            <h3 className="text-xl font-bold text-white">Execute <code className="text-cyan-300 font-mono">git branch -m</code></h3>
          </div>

          {/* Current Branch Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-xs">
            <div className="space-y-1">
              <span className="text-slate-500">Current Active Branch:</span>
              <p className="text-emerald-400 font-bold text-sm">{activeBranch}</p>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-slate-500">Disk Location:</span>
              <p className="text-purple-300">.git/refs/heads/{activeBranch}</p>
            </div>
          </div>

          {/* Rename Form */}
          <form onSubmit={handleRename} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-500">$ git branch -m</span>
              <input
                type="text"
                value={inputRename}
                onChange={(e) => setInputRename(e.target.value)}
                placeholder="new-branch-name"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-32 pr-4 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50"
            >
              <Edit3 className="w-4 h-4" />
              <span>Rename Branch</span>
            </button>
          </form>

          {/* Activity Log */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-1.5">
            <div className="text-slate-500"># Git Event Stream:</div>
            {historyLog.map((log, i) => (
              <p key={i} className="text-cyan-300">
                {log}
              </p>
            ))}
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Filesystem mv & HEAD Update During Branch Rename
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="renameArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {/* Old Pointer Box */}
                <rect x="50" y="40" width="220" height="60" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="65" y="65" fill="#94a3b8" fontWeight="bold">OLD: .git/refs/heads/typo</text>
                <text x="65" y="85" fill="#f87171" fontSize="10">File moved/renamed</text>

                {/* Moving Arrow */}
                <path d="M 280 70 L 370 70" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#renameArrow)">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                <text x="290" y="60" fill="#10b981" fontSize="10">git branch -m</text>

                {/* New Pointer Box */}
                <rect x="380" y="40" width="240" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="395" y="65" fill="#a7f3d0" fontWeight="bold">NEW: .git/refs/heads/feature</text>
                <text x="395" y="85" fill="#6ee7b7" fontSize="10">41-byte text file preserved</text>

                {/* Unchanged Commits */}
                <rect x="660" y="30" width="150" height="80" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="675" y="55" fill="#a5f3fc" fontWeight="bold">Commit Object C2</text>
                <text x="675" y="75" fill="#cbd5e1" fontSize="10">SHA: 7a8b9c0d</text>
                <text x="675" y="95" fill="#34d399" fontSize="9">100% Intact & Untouched</text>

                <text x="50" y="160" fill="#94a3b8" fontSize="11">
                  1. Reflog moved: <tspan fill="#a7f3d0">.git/logs/refs/heads/old -&gt; .git/logs/refs/heads/new</tspan>
                </text>
                <text x="50" y="185" fill="#94a3b8" fontSize="11">
                  2. Config updated: <tspan fill="#a7f3d0">[branch "new"] tracking settings preserved in .git/config</tspan>
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: 3-STEP REMOTE SYNC PROTOCOL ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <CloudUpload className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">The 3-Step Protocol to Rename Remote Branches on GitHub</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Because Git is decentralized, renaming locally does not automatically rename on GitHub. Follow this standard 3-step sequence:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">Step 1: Rename Local</span>
              <p className="text-slate-400 font-sans">Rename your branch locally on your machine:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                $ git branch -m old-name new-name
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">Step 2: Push & Reset Upstream</span>
              <p className="text-slate-400 font-sans">Push the new branch and set upstream tracking:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                $ git push -u origin new-name
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">Step 3: Delete Old Remote</span>
              <p className="text-slate-400 font-sans">Delete the old branch name from GitHub:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-rose-300">
                $ git push origin --delete old-name
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Renaming Cheatsheet Commands</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Rename current checked-out branch</span>
              <p className="text-cyan-400">$ git branch -m feature/gst-calculation</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Rename another branch while standing on main</span>
              <p className="text-cyan-400">$ git branch -m temp-calc feature/fast-discount</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Rename default master to main</span>
              <p className="text-cyan-400">$ git branch -m master main</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When industry teams transitioned their default branches from `master` to `main` across thousands of GitHub repositories, the foundation was just `git branch -m master main`. It proves how clean Git's design is: a pointer is just a name tag, easily replaced without touching a single commit."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Branch Renaming Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Forgetting to Delete Old Remote Branch</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Renaming locally and pushing the new branch creates two parallel branches on GitHub. Always complete Step 3: <code className="text-slate-100">git push origin --delete old-name</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Renaming While Teammates Have Open PRs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If teammates have active pull requests based on the old branch name, renaming it will break their PR base until they update their base branch in GitHub's settings.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 7 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 7 Frequently Asked Questions & Interview Questions"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between border-t border-slate-800 pt-6">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-200 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic 6: Listing & Inspecting Branches</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 8: Deleting Branches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
