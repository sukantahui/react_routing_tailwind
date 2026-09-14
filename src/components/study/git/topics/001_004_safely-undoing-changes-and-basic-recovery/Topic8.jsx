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
  GitPullRequest,
  GitBranch,
  Split,
  GitCommit,
  RefreshCw
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic 8: Safe Undo for Public/Shared Branches: git revert <commit> to create a new inverse snapshot without rewriting history
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [activeWorkflow, setActiveWorkflow] = useState("single");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const workflows = {
    single: {
      title: "Revert Single Faulty Commit",
      badge: "Standard Production Rollback",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "Reverts the exact changes introduced in a specific commit SHA, automatically generating an inverse patch and committing it.",
      command: "git revert 7a8b9c0 --no-edit\ngit push origin main",
      result: "Appends 'Revert \"feat(tax): ...\"' cleanly without altering prior commit history."
    },
    noCommit: {
      title: "Batch Revert Without Auto-Commit (-n)",
      badge: "Multi-Commit Rollback",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "Unstages inverse changes into the Index so you can inspect, combine, or tweak them before creating one single consolidated revert commit.",
      command: "git revert -n HEAD~2..HEAD\ngit commit -m \"revert(pay): rollback v2 billing pipeline\"",
      result: "Consolidates multiple reverted commits into one clean release rollback."
    },
    reRevert: {
      title: "Re-Reverting (Bringing Code Back)",
      badge: "Feature Resurrection",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800",
      description: "When the underlying bug in a reverted feature is fixed, revert the revert commit itself to restore the original code changes seamlessly.",
      command: "git revert <sha-of-the-revert-commit>\ngit push origin main",
      result: "The original feature is re-introduced into the codebase without re-typing or copy-pasting."
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
                <span>Git Module 001_004 &bull; Topic 8 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Safe Public History Rollback with git revert
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Why non-destructive inverse commits are the gold standard for shared team branches and production deployments.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Shared-Branch Safe
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <RefreshCw className="w-3.5 h-3.5" /> Forward History
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
                Explain Like I&apos;m 10: The Accounting Ledger Correction
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding why professional businesses never tear pages out of their books.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Database className="w-4 h-4" /> Real-Life Analogy: The Bank Statement
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If an accountant at <strong>AccoTax Barrackpore</strong> accidentally credits ₹5,000 to an account on Monday, they do <strong>NOT</strong> tear Monday&apos;s page out of the ledger with a razor blade!
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instead, on Tuesday they write a new entry: <em>&quot;Debit ₹5,000 (Adjustment for Monday error)&quot;</em>. The balance is restored, and the audit trail remains 100% honest and intact. That is exactly what <strong>git revert</strong> does!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Discussion at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Abhronila:</strong> &quot;Sir, why should I use <code className="text-cyan-300">git revert</code> instead of <code className="text-rose-300">git reset</code> on our shared GitHub branch?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Because git revert moves history FORWARD with a new commit! When Tuhina and Mahima run <code className="text-cyan-300">git pull</code>, they get your fix instantly with zero conflicts or broken histories!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: REVERT VS RESET COMPARISON ───────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Split className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              git reset vs git revert: Which One to Choose?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-amber-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400 font-mono">git reset</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-semibold">
                  Private Local Only
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Rewinds the branch pointer backward in time.</li>
                <li>Rewrites history, changing or orphaning commit SHAs.</li>
                <li>Requires dangerous <code className="text-rose-300 font-mono">git push --force</code> if already shared.</li>
                <li>Hides/destroys the mistake from <code className="text-slate-400 font-mono">git log</code>.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400 font-mono">git revert</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
                  Public & Shared Branches
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                <li>Appends a brand new inverse commit forward in time.</li>
                <li>Preserves all historical commit SHAs and DAG ancestors.</li>
                <li>Pushes cleanly with standard <code className="text-emerald-300 font-mono">git push origin main</code>.</li>
                <li>Maintains a complete, tamper-proof enterprise audit trail.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC ANIMATED SVG REVERT DAG ─────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual DAG: How git revert Appends Forward History
                </h2>
                <p className="text-xs text-slate-400">
                  Observe how buggy commit C1 is preserved, while new commit C2 applies its exact inverse diff (+ to -).
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 240"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              <defs>
                <linearGradient id="gradRevert" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <marker
                  id="arr-rev"
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

              {/* Commit C0 */}
              <circle cx="120" cy="120" r="30" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <text x="120" y="116" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">C0</text>
              <text x="120" y="134" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">1a2b3c</text>
              <text x="120" y="175" textAnchor="middle" fill="#64748b" fontSize="10">Base App</text>

              {/* Arrow C0 -> C1 */}
              <line x1="150" y1="120" x2="310" y2="120" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr-rev)" />

              {/* Commit C1 (Buggy commit) */}
              <circle cx="340" cy="120" r="30" fill="#881337" stroke="#f43f5e" strokeWidth="2.5" />
              <text x="340" y="116" textAnchor="middle" fill="#ffe4e6" fontSize="13" fontWeight="bold">C1</text>
              <text x="340" y="134" textAnchor="middle" fill="#fda4af" fontSize="10" fontFamily="monospace">7a8b9c</text>
              <text x="340" y="175" textAnchor="middle" fill="#fda4af" fontSize="10">Buggy Logic (+bug)</text>

              {/* Arrow C1 -> C2 */}
              <line x1="370" y1="120" x2="530" y2="120" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr-rev)" />

              {/* Commit C2 (Revert Commit) */}
              <circle cx="560" cy="120" r="32" fill="url(#gradRevert)" stroke="#34d399" strokeWidth="3">
                <animate attributeName="stroke-width" values="3;5;3" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="560" y="116" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">C2</text>
              <text x="560" y="134" textAnchor="middle" fill="#d1fae5" fontSize="10" fontFamily="monospace">9f8e7d</text>
              <text x="560" y="175" textAnchor="middle" fill="#34d399" fontSize="10">Revert C1 (-bug)</text>

              {/* HEAD Pointer */}
              <rect x="500" y="35" width="120" height="30" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="560" y="54" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">HEAD -&gt; main</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: INTERACTIVE WORKFLOW TABS ────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Revert Workflows & Commands
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {Object.entries(workflows).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveWorkflow(key)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWorkflow === key
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white">
                {workflows[activeWorkflow].title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${workflows[activeWorkflow].badgeColor}`}>
                {workflows[activeWorkflow].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {workflows[activeWorkflow].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
              {workflows[activeWorkflow].command}
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Outcome:</span>
              <span>{workflows[activeWorkflow].result}</span>
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
              Common git revert Pitfalls & Conflicts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Revert Conflicts
              </div>
              <p className="text-xs text-slate-300">
                When later commits modified the same lines, revert will produce merge conflicts.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Resolution
              </div>
              <p className="text-xs text-slate-400">
                Resolve conflicts manually, <code className="text-cyan-300 font-mono">git add .</code>, and run <code className="text-cyan-300 font-mono">git revert --continue</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Getting Stuck Mid-Revert
              </div>
              <p className="text-xs text-slate-300">
                Not knowing how to cancel an in-progress messy revert.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Resolution
              </div>
              <p className="text-xs text-slate-400">
                Simply execute <code className="text-cyan-300 font-mono">git revert --abort</code> to reset back safely.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Resetting on Public Branches
              </div>
              <p className="text-xs text-slate-300">
                Defaulting to <code className="text-rose-300 font-mono">git reset</code> on shared main branches.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Resolution
              </div>
              <p className="text-xs text-slate-400">
                Always use <code className="text-cyan-300 font-mono">git revert</code> for shared repos!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Practical Drill: The Rollback and Resurrection Exercise
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create a file <code className="text-cyan-300 font-mono">discount.js</code> with a function, commit it, and revert it with <code className="text-cyan-300 font-mono">git revert HEAD</code>. Verify the file is removed. Now run <code className="text-amber-300 font-mono">git revert HEAD</code> again! Notice how the file reappears instantly!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="git revert & Shared Branch Undo FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git revert Public Branch Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Revision Note"
          downloadFileName="git_revert_basics_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Rule of Thumb: When working alone on a private branch, reset is your scalpel. When collaborating with colleagues in Barrackpore or deploying to production, revert is your shield. Never break someone else's build when revert is only one command away! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 7 (Safety of Hard Reset)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 9: Reverting Merge Commits</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
