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
  Flame,
  Lock,
  GitCommit
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic 4: Understanding Commit Rewriting Risks: Why amending pushed commits causes diverged remote history
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [activeScenario, setActiveScenario] = useState("divergence");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 4;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const scenarios = {
    divergence: {
      title: "Why Non-Fast-Forward Rejection Happens",
      badge: "Architecture Root Cause",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "When you amend commit C1 to create C1', both C1 and C1' branch off from C0. Because C1' does not contain C1 in its parent history, Git refuses to overwrite remote C1 without a force push.",
      command: "git push origin main\n# ! [rejected] main -> main (non-fast-forward)\n# hint: Updates were rejected because the tip of your current branch is behind\n# hint: its remote counterpart.",
      impact: "Prevents accidental erasure of remote commit history."
    },
    forcePushPitfall: {
      title: "The Disaster of `git push --force`",
      badge: "High Risk",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Force-pushing forcefully sets the remote branch to C1'. When your teammate (e.g., Mahima or Debangshu) pulls, their local repo has C1 + their new commit C2. Git creates a messy merge or resurrects old buggy C1 code.",
      command: "git push --force origin main # DANGEROUS!\n# Overwrites origin/main from 7a3f89 (C1) to e41b9c (C1')",
      impact: "Team collaboration chaos, duplicate commits, lost work."
    },
    safeLease: {
      title: "The Defensive Pattern: `--force-with-lease`",
      badge: "Industry Best Practice",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "On private feature branches, use `--force-with-lease`. It verifies that nobody else has pushed commits to the remote branch since your last fetch before performing the overwrite.",
      command: "git push --force-with-lease origin feat-billing-gst",
      impact: "Protects against race conditions and teammate data loss on PR branches."
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
                <span>Git Module 001_004 &bull; Topic 4 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Understanding Commit Rewriting Risks & Remote Divergence
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Why amending pushed commits causes diverged histories, the perils of force-pushing, and the Golden Rule of Git hygiene.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-800">
                <AlertTriangle className="w-3.5 h-3.5" /> High-Risk Operation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Defensive Git
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
                Explain Like I&apos;m 10: The Printed Newspaper & The Black Magic Pen
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding why editing things that others have already received causes massive confusion.
              </p>
            </div>
          </div>

          {/* Everyday Analogy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Real-Life Analogy: The Morning Newspaper
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine you run a newspaper in <strong>Barrackpore</strong>. You print 1,000 copies of today&apos;s morning paper and distribute them to every house. Later at noon, you spot a spelling mistake on page 1.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You cannot use white-out on the papers already sitting in 1,000 living rooms! If you print a new version for yourself, your version no longer matches what everyone else holds in their hands. In Git, <strong>pushing is like distributing the newspaper</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <Flame className="w-4 h-4" /> The Classroom Discussion at Coder & AccoTax
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Sachin:</strong> &quot;Sir, I amended a commit locally, but when I ran <code className="text-cyan-300">git push</code>, Git yelled <em>[rejected - non-fast-forward]</em>. Why?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Because when you amended, Git created a brand new commit with a new SHA hash. Remote GitHub still holds your old commit! Git is protecting your teammates from having the ground pulled out from under their feet!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION & THE GOLDEN RULE ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              The Golden Rule of Git History Rewriting
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-slate-900 border border-emerald-800/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Private Local History
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Commits on your private local branch that have <strong>NEVER</strong> been pushed to a remote repository can be amended, squashed, or reordered freely.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/50 p-2 rounded border border-emerald-800">
                git commit --amend &bull; SAFE
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-rose-800/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-4 h-4" /> Shared / Public Branches
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Commits on branches like <code className="text-rose-300 font-mono">main</code> or shared release branches must <strong>NEVER</strong> be rewritten. Rewriting creates divergent histories for everyone.
              </p>
              <div className="text-[11px] font-mono text-rose-300 bg-rose-950/50 p-2 rounded border border-rose-800">
                git commit --amend &bull; FORBIDDEN
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-cyan-800/50 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" /> Public Solution: Revert
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                To fix an error on a shared branch, use <code className="text-cyan-300 font-mono">git revert</code>. It creates a brand new inverse commit without altering historical hashes.
              </p>
              <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 p-2 rounded border border-cyan-800">
                git revert &lt;SHA&gt; &bull; BEST PRACTICE
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC ANIMATED SVG DAG DIAGRAM ────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual DAG: How Amending Creates Remote Divergence
                </h2>
                <p className="text-xs text-slate-400">
                  Observe how original commit C1 on remote and amended commit C1&apos; on local branch off from C0 as siblings.
                </p>
              </div>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 320"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              <defs>
                <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="gradRose" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
                <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                <marker
                  id="arrow-cyan"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
                </marker>
              </defs>

              {/* Grid Background Lines */}
              <line x1="50" y1="160" x2="750" y2="160" stroke="#1e293b" strokeDasharray="4,4" />

              {/* Common Base Commit C0 */}
              <circle cx="120" cy="160" r="32" fill="#1e293b" stroke="#475569" strokeWidth="3" />
              <text x="120" y="156" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">C0</text>
              <text x="120" y="174" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">9a1c22</text>
              <text x="120" y="215" textAnchor="middle" fill="#64748b" fontSize="11">Initial Commit</text>

              {/* Upper Path: Remote Commit C1 */}
              <path
                d="M 152 145 C 240 100, 320 80, 420 80"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                markerEnd="url(#arrow)"
              />
              <circle cx="450" cy="80" r="32" fill="#881337" stroke="#f43f5e" strokeWidth="3" />
              <text x="450" y="76" textAnchor="middle" fill="#ffe4e6" fontSize="13" fontWeight="bold">C1</text>
              <text x="450" y="94" textAnchor="middle" fill="#fda4af" fontSize="10" fontFamily="monospace">7a3f89</text>

              {/* Remote Tag */}
              <rect x="500" y="65" width="160" height="30" rx="6" fill="#4c0519" stroke="#be123c" strokeWidth="1.5" />
              <text x="580" y="84" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">origin/main (GitHub)</text>

              {/* Lower Path: Amended Local Commit C1' */}
              <path
                d="M 152 175 C 240 220, 320 240, 420 240"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                markerEnd="url(#arrow-cyan)"
              />
              <circle cx="450" cy="240" r="32" fill="url(#gradCyan)" stroke="#38bdf8" strokeWidth="3">
                <animate attributeName="r" values="32;35;32" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="450" y="236" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">C1&apos;</text>
              <text x="450" y="254" textAnchor="middle" fill="#cffafe" fontSize="10" fontFamily="monospace">e41b9c</text>

              {/* Local Tag */}
              <rect x="500" y="225" width="170" height="30" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="585" y="244" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">HEAD -&gt; main (Local Amended)</text>

              {/* Divergence Notice Box */}
              <rect x="230" y="135" width="220" height="50" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
              <text x="340" y="155" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">⚡ HISTORIES DIVERGED</text>
              <text x="340" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">Non-Fast-Forward Push Rejected</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: DEEP TECHNICAL BREAKDOWN & SCENARIO TABS ─────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Scenario Analysis: Divergence, Force-Push & Leases
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {Object.entries(scenarios).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveScenario(key)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeScenario === key
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
                {scenarios[activeScenario].title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${scenarios[activeScenario].badgeColor}`}>
                {scenarios[activeScenario].badge}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {scenarios[activeScenario].description}
            </p>

            {/* Code Panel */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
              {scenarios[activeScenario].command}
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Operational Impact:</span>
              <span>{scenarios[activeScenario].impact}</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & REMEDIATION ────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Common Pitfalls, False Assumptions & Recovery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Pitfall 1: Force-Pushing on Main
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-rose-300 font-mono">git push -f origin main</code> after fixing a typo locally.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Correct Action
              </div>
              <p className="text-xs text-slate-400">
                Commit a separate fix with <code className="text-cyan-300 font-mono">git commit -m &quot;fix: typo&quot;</code> and push normally.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Pitfall 2: Confused Teammate Pulls
              </div>
              <p className="text-xs text-slate-300">
                A teammate pulls without knowing main was rewritten, causing duplicate merge commits.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Correct Action
              </div>
              <p className="text-xs text-slate-400">
                Teammate must run <code className="text-cyan-300 font-mono">git fetch origin &amp;&amp; git reset --hard origin/main</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Pitfall 3: Not Using Reflog to Rescue
              </div>
              <p className="text-xs text-slate-300">
                Believing the original commit before the amend is lost forever.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Correct Action
              </div>
              <p className="text-xs text-slate-400">
                Inspect <code className="text-cyan-300 font-mono">git reflog</code> to find the old SHA and reset back anytime.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Thinking Exercise: The 3-Way Divergence Test
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Run <code className="text-cyan-300 font-mono">git log --graph --oneline --left-right HEAD...origin/main</code> whenever you suspect divergence. The left arrow (<code className="text-cyan-300">&lt;</code>) marks your unique local commits, while the right arrow (<code className="text-rose-300">&gt;</code>) marks commits only present on GitHub.
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Commit Rewriting & Remote Divergence FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Git History Rewriting & Divergence Revision Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Revision Note"
          downloadFileName="git_rewriting_risks_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Golden Rule: Amending private local commits before review is craftsmanship; amending shared commits after push is vandalism! If a commit is already in production or shared with colleagues in Barrackpore, always fix forward with a new commit or git revert. — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 3 (Amending Commits)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 5: Demystifying git reset</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
