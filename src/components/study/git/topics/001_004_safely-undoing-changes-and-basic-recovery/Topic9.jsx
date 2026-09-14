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
  GitMerge,
  GitCommit,
  GitBranch,
  Split,
  RefreshCw
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
 * Topic 9: Reverting Reverts and Handling Merge Commit Reverts: Overview of git revert -m 1 <merge_commit>
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [selectedParent, setSelectedParent] = useState(1);

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 9;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 9 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Reverting Merge Commits & The Re-Merge Workflow (git revert -m 1)
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Mastering parent selection flags, avoiding the Linus Torvalds re-merge trap, and resurrecting reverted features cleanly.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-950/80 text-purple-300 border border-purple-800">
                <GitMerge className="w-3.5 h-3.5" /> -m 1 Mainline
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <RefreshCw className="w-3.5 h-3.5" /> Re-Reverting
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
                Explain Like I&apos;m 10: The Two-Way Highway Junction
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding why a merge commit needs a compass direction before Git can undo it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Split className="w-4 h-4" /> The Grand Trunk Road Junction Analogy
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine driving on <strong>Grand Trunk Road in Barrackpore (Parent 1: Main Highway)</strong> and an <strong>Expressway Ramp (Parent 2: Side Branch)</strong> merges into your lane.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If the police want to undo the traffic blockage at the merger, they need to know: <em>&quot;Which road is our main highway?&quot;</em>. Passing <code className="text-cyan-300 font-mono">-m 1</code> tells Git: <em>&quot;Keep the main highway clear and remove all vehicles that came from the ramp!&quot;</em>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Guidance at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Sachin:</strong> &quot;Sir, why did Git give me an error when I ran <code className="text-cyan-300">git revert 9b8a7c</code> on a merge commit?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Because a merge commit has 2 parents! Git doesn&apos;t know which side you want to preserve as your mainline. You must tell it <code className="text-cyan-300 font-mono">-m 1</code> to preserve main!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: DEEP ARCHITECTURAL BREAKDOWN OF -M 1 ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Understanding Parent Numbers in Merge Commits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => setSelectedParent(1)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                selectedParent === 1
                  ? "bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-emerald-400 font-mono">git revert -m 1 &lt;sha&gt;</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
                  STANDARD (99.9% Use Case)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Treats <strong>Parent 1 (the branch that received the merge, e.g. main)</strong> as the baseline. Inverts all code modifications introduced by the incoming feature branch (Parent 2).
              </p>
            </div>

            <div
              onClick={() => setSelectedParent(2)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                selectedParent === 2
                  ? "bg-slate-900 border-purple-500 ring-2 ring-purple-500/40 shadow-xl"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-purple-400 font-mono">git revert -m 2 &lt;sha&gt;</span>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-semibold">
                  RARE / SPECIALIZED
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Treats <strong>Parent 2 (the incoming feature branch)</strong> as the baseline. Inverts all code that existed on main prior to the merge. Rarely what developers intend.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC ANIMATED SVG MERGE DAG ──────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GitMerge className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual DAG: Merge Parentage & Revert with -m 1
                </h2>
                <p className="text-xs text-slate-400">
                  Observe Parent 1 (main) and Parent 2 (feature) converging into Merge Commit M, followed by Revert Commit R.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 280"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              <defs>
                <linearGradient id="gradMerge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="gradRevM" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <marker
                  id="arr-m"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              {/* Main Line: C0 -> C1 */}
              <circle cx="100" cy="80" r="26" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <text x="100" y="84" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">C0</text>

              <line x1="126" y1="80" x2="214" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />

              <circle cx="240" cy="80" r="26" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <text x="240" y="84" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">C1</text>
              <text x="240" y="40" textAnchor="middle" fill="#94a3b8" fontSize="10">Parent 1 (Mainline)</text>

              {/* Feature Line: F1 -> F2 */}
              <path d="M 126 95 C 160 180, 180 200, 214 200" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arr-m)" />
              <circle cx="240" cy="200" r="26" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
              <text x="240" y="204" textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="bold">F1</text>
              <text x="240" y="245" textAnchor="middle" fill="#c084fc" fontSize="10">Parent 2 (Feature)</text>

              {/* Convergence to Merge Commit M */}
              <line x1="266" y1="80" x2="414" y2="135" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />
              <line x1="266" y1="200" x2="414" y2="145" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arr-m)" />

              <circle cx="440" cy="140" r="30" fill="url(#gradMerge)" stroke="#c084fc" strokeWidth="2.5" />
              <text x="440" y="136" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">M</text>
              <text x="440" y="154" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontFamily="monospace">9b8a7c</text>
              <text x="440" y="195" textAnchor="middle" fill="#c084fc" fontSize="10">Merge Commit</text>

              {/* Arrow M -> R */}
              <line x1="470" y1="140" x2="610" y2="140" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr-m)" />

              {/* Revert Commit R */}
              <circle cx="640" cy="140" r="32" fill="url(#gradRevM)" stroke="#34d399" strokeWidth="3">
                <animate attributeName="stroke-width" values="3;5;3" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="640" y="136" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">R</text>
              <text x="640" y="154" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="monospace">Revert -m 1</text>
              <text x="640" y="195" textAnchor="middle" fill="#34d399" fontSize="10">Rolls back F1</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: THE LINUS TORVALDS RE-MERGE TRAP ─────────────────── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-amber-800/40 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">
              The Famous &quot;Linus Torvalds Re-Merge Trap&quot; &amp; How to Solve It
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When you revert a merge commit with <code className="text-cyan-300 font-mono">-m 1</code>, Git removes the code changes from <code className="text-slate-200">main</code>, but <strong>leaves the merge node in the commit DAG history</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase">The Problem:</span>
              <p className="text-xs text-slate-300">
                If the feature developer fixes the bug and attempts to merge the feature branch again, Git assumes all earlier commits were already merged, bringing in ONLY the new bug-fix and leaving the original feature code MISSING!
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">The Solution (Re-Revert):</span>
              <p className="text-xs text-slate-300">
                Run <code className="text-emerald-300 font-mono">git revert &lt;revert-commit-sha&gt;</code> on main before or during the new merge, OR rebase the feature branch onto new main to generate fresh commit SHAs!
              </p>
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
              Common Merge Revert Mistakes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Omitting the -m Flag
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-rose-300 font-mono">git revert &lt;merge_sha&gt;</code> without <code className="text-cyan-300 font-mono">-m 1</code>.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fix
              </div>
              <p className="text-xs text-slate-400">
                Always supply <code className="text-cyan-300 font-mono">-m 1</code> for merge commits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Passing -m 2 by Accident
              </div>
              <p className="text-xs text-slate-300">
                Inverting main instead of the incoming feature branch.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fix
              </div>
              <p className="text-xs text-slate-400">
                Mainline receiving branch is Parent 1.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Forgetting to Re-Revert
              </div>
              <p className="text-xs text-slate-300">
                Re-merging without re-reverting the previous rollback.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fix
              </div>
              <p className="text-xs text-slate-400">
                Revert the revert commit first to bring the base code back.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Terminal Challenge: Merge Revert &amp; Re-Revert Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create a branch <code className="text-cyan-300 font-mono">feat-tax</code>, commit a file, merge it to main with <code className="text-cyan-300 font-mono">git merge --no-ff</code>. Now revert it on main with <code className="text-amber-300 font-mono">git revert -m 1 HEAD</code>. Inspect <code className="text-cyan-300 font-mono">git log --graph --oneline</code>. Finally, re-revert the revert commit and watch the file reappear!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Reverting Merge Commits & git revert -m 1 FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git revert -m 1 Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 9 Revision Note"
          downloadFileName="git_revert_merge_commit_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Golden Rule for Merges: A merge commit joins two parent timelines. Always specify '-m 1' to keep main safe and strip out the feature branch. And remember Linus's advice: when you are ready to bring that feature back, re-revert the revert! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 8 (Safe Public Rollback)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 10: Cleaning Untracked Files (git clean)</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
