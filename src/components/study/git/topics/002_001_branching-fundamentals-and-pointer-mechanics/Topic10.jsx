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
  FlaskConical,
  Recycle,
  AlertOctagon
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
 * Topic 10: Navigating and Experimenting in Detached HEAD: Why commits made in detached HEAD are at risk of garbage collection
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [inDetachedMode, setInDetachedMode] = useState(true);
  const [detachedCommits, setDetachedCommits] = useState([
    { sha: "d9e8f7a", message: "feat: experimental neural tax formula", isDangling: false }
  ]);
  const [attachedBranch, setAttachedBranch] = useState(null);

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 10;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const handleAddExperimentCommit = () => {
    const newSha = Math.random().toString(16).substring(2, 9);
    setDetachedCommits([
      ...detachedCommits,
      { sha: newSha, message: `feat: prototype iteration #${detachedCommits.length + 1}`, isDangling: false }
    ]);
  };

  const handleSwitchToMain = () => {
    setInDetachedMode(false);
    if (!attachedBranch) {
      setDetachedCommits(detachedCommits.map((c) => ({ ...c, isDangling: true })));
    }
  };

  const handleAttachBranch = () => {
    setAttachedBranch("feature/neural-tax-calc");
    setDetachedCommits(detachedCommits.map((c) => ({ ...c, isDangling: false })));
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
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 10 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Experimenting in Detached HEAD & Garbage Collection Risks
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
              <FlaskConical className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Sandbox Prototyping Mechanics</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                The Zero-Risk Prototyping Sandbox & The Danger of Dangling Commits
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Committing in a Detached HEAD state is Git's built-in sandbox. You can write code, create 10 commits, test radical algorithms, and benchmark without creating temporary clutter.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                However, because these commits are not referenced by any branch pointer in <code className="text-cyan-300 font-mono">.git/refs/heads/</code>, switching back to <code className="text-slate-100 font-mono">main</code> leaves them <strong>dangling and unreachable</strong>. While they stay in Git's reflog for 30 days, Git's garbage collector (<code className="text-rose-400 font-mono">git gc</code>) will eventually prune them unless rescued into a named branch.
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
              Explain Like I'm 10 (ELI10): The Scratchpad Notes on the Classroom Desk
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> explained dangling commits to student <strong>Swadeep Sarkar</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <FlaskConical className="w-4 h-4" />
                  <span>The Loose Sheet of Paper</span>
                </div>
                <p className="text-xs text-slate-300">
                  You pull out a loose sheet of paper from your bag to calculate rough tax estimates. You write 3 equations. The paper is sitting loose on the desk with no file clip or folder holding it.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-rose-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                  <Recycle className="w-4 h-4" />
                  <span>The Nightly Cleaning Janitor (git gc)</span>
                </div>
                <p className="text-xs text-slate-300">
                  At 8 PM, the office cleaner sweeps the room. Any paper not filed inside a labeled plastic folder gets tossed into the recycle bin! If you want to keep the rough equations, you MUST staple them into a folder (<code className="text-cyan-300">git switch -c new-feature</code>) before walking out!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-amber-500 pl-3">
              "Swadeep learned: Never leave the desk without putting valuable calculations into a labeled folder!" — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE EXPERIMENTATION SIMULATOR ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Simulator</span>
              <h3 className="text-xl font-bold text-white">Detached HEAD Commit & Rescue Lab</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAddExperimentCommit}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>+ Commit in Detached HEAD</span>
              </button>
              {inDetachedMode && (
                <button
                  onClick={handleAttachBranch}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Attach Branch Ref</span>
                </button>
              )}
              {inDetachedMode ? (
                <button
                  onClick={handleSwitchToMain}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1"
                >
                  <span>Switch to 'main'</span>
                </button>
              ) : (
                <button
                  onClick={() => setInDetachedMode(true)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
                >
                  <span>Re-enter Detached HEAD</span>
                </button>
              )}
            </div>
          </div>

          {/* Current Status */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Location:</span>
              <span className={inDetachedMode ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                {inDetachedMode ? "HEAD (Detached at commit)" : "refs/heads/main"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Attached Branch Pointer:</span>
              <span className={attachedBranch ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                {attachedBranch ? attachedBranch : "NONE (Commits at risk of GC)"}
              </span>
            </div>
          </div>

          {/* Commits List */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400 font-mono">Commits created in this session:</div>
            <div className="space-y-2">
              {detachedCommits.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between ${
                    c.isDangling
                      ? "bg-rose-950/40 border-rose-800/80 text-rose-300"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 font-bold">{c.sha}</span>
                    <span className="text-slate-300">{c.message}</span>
                  </div>
                  <div>
                    {c.isDangling ? (
                      <span className="px-2 py-0.5 rounded bg-rose-900 border border-rose-700 text-rose-200 text-[10px] font-sans font-semibold flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" />
                        Dangling (Unreferenced)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-sans">
                        Protected in Branch
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Dangling Commits Branching Off Lineage
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="gcArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                  <marker id="danglingArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Main Lineage */}
                <circle cx="150" cy="140" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="142" y="144" fill="#a7f3d0" fontWeight="bold">C1</text>

                <line x1="168" y1="140" x2="332" y2="140" stroke="#10b981" strokeWidth="2" />

                <circle cx="350" cy="140" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="342" y="144" fill="#a7f3d0" fontWeight="bold">C2</text>

                {/* main branch ref */}
                <rect x="310" y="180" width="80" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="330" y="197" fill="#a7f3d0" fontWeight="bold">main</text>

                {/* Detached lineage branching off C1 */}
                <path d="M 160 125 C 220 50, 400 50, 480 65" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" fill="none" markerEnd="url(#danglingArrow)">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.5s" repeatCount="indefinite" />
                </path>

                <circle cx="500" cy="65" r="18" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="492" y="69" fill="#fca5a5" fontWeight="bold">E1</text>

                <line x1="518" y1="65" x2="632" y2="65" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#danglingArrow)" />

                <circle cx="650" cy="65" r="18" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="642" y="69" fill="#fca5a5" fontWeight="bold">E2</text>

                {/* Warning note */}
                <rect x="540" y="120" width="280" height="50" rx="6" fill="#881337" stroke="#f43f5e" />
                <text x="555" y="140" fill="#fecdd3" fontWeight="bold">⚠️ Dangling Commits E1 & E2</text>
                <text x="555" y="155" fill="#fda4af" fontSize="10">Subject to 'git gc' pruning after 30 days</text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: RESCUE & RECOVERY PROTOCOL ───────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">How to Rescue Dangling Commits</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">1. Find SHA via Reflog</span>
              <p className="text-slate-400 font-sans">Locate the commit hash from Git's audit log:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-purple-300">
                $ git reflog<br />
                d9e8f7a HEAD@&#123;1&#125;: commit: experimental neural tax
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">2. Attach a Branch Pointer</span>
              <p className="text-slate-400 font-sans">Create a named branch pointing to that SHA:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-400">
                $ git switch -c feature/neural-tax d9e8f7a
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Terminal Inspection Patterns</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Check for unreachable commits in repo</span>
              <p className="text-cyan-400">$ git fsck --lost-found</p>
              <p className="text-amber-400">dangling commit d9e8f7a6b5c4...</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. View full reflog history</span>
              <p className="text-cyan-400">$ git reflog</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When Swadeep came to me panicked after typing `git switch main` and thinking his 3 hours of experimental math were gone forever, I ran `git reflog`, copied the hash, and ran `git switch -c rescue-calc <hash>`. He saw his files reappear in 1 second. In Git, nothing is truly lost if you made a commit!"
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Detached HEAD Experimentation Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Running `git gc --prune=now` on Unsaved Commits</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Manually running garbage collection with prune-now forces immediate deletion of all unreachable commits, eliminating the 30-day reflog safety net.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Leaving Detached Work Uncommitted</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uncommitted file edits are not saved in the object database or reflog. Always run <code className="text-slate-100">git commit</code> before switching branches.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 10 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 10 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 9: The Detached HEAD State</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 11: Recovering from Detached HEAD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
