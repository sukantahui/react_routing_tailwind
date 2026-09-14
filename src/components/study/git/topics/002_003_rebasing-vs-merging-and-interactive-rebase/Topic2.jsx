import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
  Users,
  Eye,
  Bookmark,
  FastForward,
  Terminal,
  Play,
  FileText,
  Check,
  Copy
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic 2: Step-by-Step Standard Rebase Workflow: git switch feature && git rebase main
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 2;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/1`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const workflowSteps = [
    {
      step: 1,
      title: "Clean Working Tree",
      cmd: "git status",
      desc: "Ensure all changes are either committed or shelved with git stash.",
      tip: "Pro Tip: Use `git rebase --autostash main` to automatically stash and unstash uncommitted work."
    },
    {
      step: 2,
      title: "Update Upstream Base",
      cmd: "git switch main && git pull origin main",
      desc: "Sync your local main branch with the latest changes pushed to GitHub.",
      tip: "Shortcut: Run `git fetch origin` and rebase directly onto `origin/main` without switching to local main!"
    },
    {
      step: 3,
      title: "Execute Rebase",
      cmd: "git switch feature/eway-export && git rebase main",
      desc: "Git unwinds feature commits, fast-forwards to main, and replays commits one by one.",
      tip: "Alternative single-line command: `git rebase main feature/eway-export`"
    },
    {
      step: 4,
      title: "Integrate & Push",
      cmd: "git switch main && git merge feature/eway-export",
      desc: "Perform a clean, fast-forward merge into main with 0 merge bubbles.",
      tip: "If updating an existing PR branch on GitHub, push using `git push --force-with-lease`."
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
                  Standard Practice
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <FastForward className="w-6 h-6 text-cyan-400" />
                Step-by-Step Standard Rebase Workflow
              </h1>
            </div>

            {/* Quick Navigation Top */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev Topic
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
                ELI10 & Everyday Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Board Train Departure at Barrackpore Station
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine you are assembling train bogies at <strong className="text-cyan-300">Barrackpore Railway Yard</strong>.
                You are building 3 new AC coach compartments (<code className="text-emerald-300 bg-slate-950 px-1 rounded">Bogies C1, C2, C3</code>) on a siding track.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                While you were working, the main engine pulled in 2 new general coaches (<code className="text-amber-300 bg-slate-950 px-1 rounded">Bogies G1, G2</code>) to the front of the main train.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Instead of welding an awkward zig-zag bridge across both tracks, you uncouple your 3 AC bogies from the yard siding,
                roll the main train forward, and couple C1, C2, and C3 directly behind G2.
                The entire train is now one perfect, continuous straight line ready for full-speed departure!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: STEP-BY-STEP INTERACTIVE WORKFLOW ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Standard 4-Step Rebase Recipe
            </h2>
          </div>

          {/* Steps Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {workflowSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveStepTab(s.step)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeStepTab === s.step
                    ? "bg-cyan-950/80 border-cyan-500 shadow-md shadow-cyan-950"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                  PHASE 0{s.step}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {s.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  {s.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Showcase Card */}
          {(() => {
            const cur = workflowSteps.find((s) => s.step === activeStepTab);
            return (
              <div className="p-6 rounded-2xl border border-cyan-900/40 bg-slate-900/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
                    <Play className="w-4 h-4" /> Step {cur.step}: {cur.title}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Step {cur.step} of 4
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300">
                    <code>{cur.cmd}</code>
                    <button
                      onClick={() => copyToClipboard(cur.cmd, `step-${cur.step}`)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Copy Command"
                    >
                      {copiedCmd === `step-${cur.step}` ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{cur.desc}</p>
                  <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
                    {cur.tip}
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG DIAGRAM ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Execution Visualization: Feature Rebase on Main</h2>
              <p className="text-xs text-slate-400">Step-by-step replay progression onto the newest base tip</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <linearGradient id="stepMainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="stepReplayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <marker id="stepArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                <marker id="stepArrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
                </marker>
              </defs>

              <text x="30" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">REPLAYING COMMIT DELTAS ON TOP OF MAIN TIP (COMMIT F)</text>

              {/* Main Line */}
              <line x1="80" y1="130" x2="200" y2="130" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#stepArrow)" />
              <line x1="200" y1="130" x2="320" y2="130" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#stepArrow)" />
              <line x1="320" y1="130" x2="440" y2="130" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#stepArrow)" />

              {/* Replayed Line */}
              <line x1="440" y1="130" x2="570" y2="130" stroke="#10b981" strokeWidth="3" markerEnd="url(#stepArrowCyan)" />
              <line x1="570" y1="130" x2="700" y2="130" stroke="#10b981" strokeWidth="3" markerEnd="url(#stepArrowCyan)" />

              {/* Main Commit Nodes */}
              <circle cx="80" cy="130" r="16" fill="url(#stepMainGrad)" />
              <text x="80" y="135" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>

              <circle cx="200" cy="130" r="16" fill="url(#stepMainGrad)" />
              <text x="200" y="135" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>

              <circle cx="320" cy="130" r="16" fill="url(#stepMainGrad)" />
              <text x="320" y="135" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

              <circle cx="440" cy="130" r="18" fill="url(#stepMainGrad)" stroke="#60a5fa" strokeWidth="2" />
              <text x="440" y="135" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">F</text>
              <rect x="410" y="165" width="60" height="20" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
              <text x="440" y="179" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">main</text>

              {/* Replayed Feature Nodes */}
              <circle cx="570" cy="130" r="18" fill="url(#stepReplayGrad)" stroke="#34d399" strokeWidth="2" />
              <text x="570" y="135" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">C'</text>
              <text x="570" y="100" fill="#34d399" fontSize="10" textAnchor="middle">Applied 1st</text>

              <circle cx="700" cy="130" r="18" fill="url(#stepReplayGrad)" stroke="#34d399" strokeWidth="2" />
              <text x="700" y="135" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D'</text>
              <text x="700" y="100" fill="#34d399" fontSize="10" textAnchor="middle">Applied 2nd</text>
              <rect x="645" y="165" width="110" height="22" rx="4" fill="#042f2e" stroke="#10b981" strokeWidth="1" />
              <text x="700" y="180" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">feature/eway-export</text>

              {/* Animated Replay indicator */}
              <circle cx="700" cy="130" r="24" fill="none" stroke="#34d399" strokeWidth="1.5">
                <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: TERMINAL SIMULATOR ──────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Terminal Walkthrough</h2>
              <p className="text-xs text-slate-400">Real terminal outputs during standard rebase execution</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  bash - Sachin@CoderAccoTax: ~/gst-portal
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-mono">Git Terminal</span>
            </div>

            <div className="p-5 font-mono text-xs text-slate-300 space-y-3 leading-relaxed">
              <div>
                <span className="text-emerald-400">sachin@coderaccotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git status</span>
              </div>
              <div className="text-slate-400 pl-4">
                On branch feature/eway-export<br />
                nothing to commit, working tree clean
              </div>

              <div>
                <span className="text-emerald-400">sachin@coderaccotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git fetch origin</span>
              </div>
              <div className="text-cyan-400 pl-4">
                From github.com:accotax/gst-portal<br />
                &nbsp;&nbsp;4b8c912..e51a82f &nbsp;main &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; origin/main
              </div>

              <div>
                <span className="text-emerald-400">sachin@coderaccotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git rebase origin/main</span>
              </div>
              <div className="text-cyan-300 pl-4 space-y-0.5">
                <div>First, rewinding head to replay your work on top of it...</div>
                <div>Applying: feat: add eway bill export helper</div>
                <div>Applying: feat: configure ₹5,000 threshold validation</div>
                <div className="text-emerald-400 font-bold">Successfully rebased and updated refs/heads/feature/eway-export.</div>
              </div>

              <div>
                <span className="text-emerald-400">sachin@coderaccotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git push --force-with-lease origin feature/eway-export</span>
              </div>
              <div className="text-emerald-400 pl-4">
                To github.com:accotax/gst-portal.git<br />
                &nbsp;+ 92a10b1...7f3c4e2 feature/eway-export -&gt; feature/eway-export (forced update)
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRO TIPS & PITFALLS ─────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-emerald-900/40 bg-emerald-950/10 space-y-3">
            <h3 className="text-base font-semibold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Pro Tips for Painless Rebase
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Use `--force-with-lease` over `--force`:</strong> Protects remote changes if a teammate pushed a hotfix commit while you were rebasing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enable global autostash:</strong> Run <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">git config --global rebase.autoStash true</code> so you never get blocked by dirty files.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Rebase directly on `origin/main`:</strong> Saves 3 extra branch-switching commands during fast sprint cycles.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-rose-900/40 bg-rose-950/10 space-y-3">
            <h3 className="text-base font-semibold text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" /> Common Mistakes to Avoid
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Forgetting to pull `main` before rebasing:</strong> Rebasing onto an outdated local `main` means you are still behind remote `origin/main`.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Running `git commit` when conflicts occur:</strong> Always use `git add` + `git rebase --continue`.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Force pushing on `main`:</strong> Never force-push on default production branches!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── SECTION 7: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Sachin & Mahima Ask Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Sachin (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, why did Git reject my regular `git push` after I finished rebasing my branch?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Because rebasing created brand new commit hashes locally! When you try to do a normal push,
                  GitHub notices that your local commit hashes no longer match the remote branch's history and rejects it with a
                  <code className="text-rose-300 bg-slate-950 px-1 rounded ml-1">[rejected - non-fast-forward]</code> error.
                  For your private feature branch, push using <code className="text-cyan-300 bg-slate-950 px-1 rounded">git push --force-with-lease origin feature-name</code>."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 2: Step-by-Step Standard Rebase Workflow (Printable Notes)" />
        </section>

        {/* ─── SECTION 9: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 structured questions on standard git rebase workflows and command execution
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Rebase vs Merge Philosophy
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 bg-cyan-950 hover:bg-cyan-900 text-sm font-semibold text-cyan-200 shadow-lg shadow-cyan-950/60 transition"
            >
              Next Topic: How Rebase Works Under the Hood <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
