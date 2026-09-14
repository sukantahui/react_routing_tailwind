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
  ToggleLeft,
  ArrowLeftRight,
  Split
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
 * Topic 4: Switching Branches: Modern git switch <branch> vs legacy git checkout <branch>
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [currentBranch, setCurrentBranch] = useState("main");
  const [hasDirtyEdits, setHasDirtyEdits] = useState(false);
  const [terminalMessage, setTerminalMessage] = useState("Switched to branch 'main'");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 4;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const branches = ["main", "feature-gst", "hotfix-tax-rate"];

  const handleSwitchBranch = (target) => {
    if (target === currentBranch) return;

    if (hasDirtyEdits && target === "hotfix-tax-rate") {
      setTerminalMessage(
        `error: Your local changes to 'tax_calculator.js' would be overwritten by checkout.\nPlease commit your changes or stash them before you switch branches.\nAborting.`
      );
      return;
    }

    setCurrentBranch(target);
    setTerminalMessage(`Switched to branch '${target}'`);
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
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 4 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Switching Branches: Modern <code className="text-cyan-300 font-mono text-lg">git switch</code> vs Legacy <code className="text-amber-300 font-mono text-lg">git checkout</code>
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
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Modern Workflow Revolution</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Git Split the Overloaded <code className="text-amber-300">checkout</code> Command
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                For over a decade, <code className="text-amber-300 font-mono">git checkout</code> was burdened with two dangerous and mutually conflicting roles: switching branches (navigating commit history) and discarding uncommitted file changes. If a developer misspelled a branch name, Git could misinterpret the command as a request to wipe unstaged file edits!
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                In Git 2.23 (August 2019), Git introduced two clear, dedicated commands: <code className="text-cyan-300 font-mono">git switch</code> (strictly for navigating branches) and <code className="text-emerald-300 font-mono">git restore</code> (strictly for reverting working tree and staged index files).
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-950 border border-cyan-800 rounded-lg text-cyan-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-cyan-200">
              Explain Like I'm 10 (ELI10): The Swiss Army Knife with Dangerous Hidden Blades
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> illustrated this problem to student <strong>Abhronila Das</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Split className="w-4 h-4" />
                  <span>The Old Way: git checkout (Overloaded Knife)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Imagine a pocket knife where the button to turn on the reading light is right next to a razor blade spring. If your finger slips, instead of lighting your book, you shred your ledger page! That was <code className="text-amber-300">git checkout</code>.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-cyan-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <ToggleLeft className="w-4 h-4" />
                  <span>The Modern Way: git switch & git restore</span>
                </div>
                <p className="text-xs text-slate-300">
                  Now, Git gave you a dedicated steering wheel (<code className="text-cyan-300">git switch</code>) that ONLY steers the car between branches, and a dedicated eraser (<code className="text-emerald-300">git restore</code>) that only erases pencil marks. You can never accidentally erase code when steering!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-cyan-500 pl-3">
              "Abhronila remembered: 'Use git switch to steer between branches, and git restore to undo mistakes. Never confuse steering with erasing!'" — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SWITCH SIMULATOR ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Switch Lab</span>
              <h3 className="text-xl font-bold text-white">Live Branch Switching & Dirty Tree Guard</h3>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasDirtyEdits}
                  onChange={(e) => setHasDirtyEdits(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-600 focus:ring-cyan-500"
                />
                <span className={hasDirtyEdits ? "text-amber-400 font-bold" : ""}>Simulate Dirty Uncommitted Edits</span>
              </label>
            </div>
          </div>

          {/* Branch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => handleSwitchBranch(b)}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                  currentBranch === b
                    ? "bg-cyan-950/50 border-cyan-700 text-cyan-200 shadow-lg shadow-cyan-950/40"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold">{b}</span>
                  {currentBranch === b && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-2">$ git switch {b}</span>
              </button>
            ))}
          </div>

          {/* Terminal Output */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-500"># Terminal output after operation:</div>
            <pre className={`whitespace-pre-wrap ${terminalMessage.startsWith("error:") ? "text-rose-400 font-semibold" : "text-emerald-400"}`}>
              {terminalMessage}
            </pre>
            <div className="pt-2 border-t border-slate-800/80 text-slate-400 flex items-center justify-between text-[11px]">
              <span>Active HEAD: <span className="text-cyan-300 font-bold">refs/heads/{currentBranch}</span></span>
              <span>Shortcut to toggle back: <code className="text-purple-300">$ git switch -</code></span>
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: HEAD Switching Pointers Between Branch References
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="headSwitchArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                  </marker>
                  <marker id="branchCommitArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* HEAD Node */}
                <rect x="50" y="90" width="120" height="50" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="80" y="115" fill="#fecdd3" fontWeight="bold" fontSize="13">HEAD</text>
                <text x="65" y="130" fill="#fda4af" fontSize="9">.git/HEAD</text>

                {/* Branch 1: main */}
                <rect
                  x="280"
                  y="40"
                  width="160"
                  height="45"
                  rx="6"
                  fill={currentBranch === "main" ? "#064e3b" : "#1e293b"}
                  stroke={currentBranch === "main" ? "#10b981" : "#334155"}
                  strokeWidth="2"
                />
                <text x="295" y="65" fill={currentBranch === "main" ? "#a7f3d0" : "#94a3b8"} fontWeight="bold">
                  refs/heads/main
                </text>

                {/* Branch 2: feature-gst */}
                <rect
                  x="280"
                  y="145"
                  width="160"
                  height="45"
                  rx="6"
                  fill={currentBranch === "feature-gst" ? "#164e63" : "#1e293b"}
                  stroke={currentBranch === "feature-gst" ? "#06b6d4" : "#334155"}
                  strokeWidth="2"
                />
                <text x="295" y="170" fill={currentBranch === "feature-gst" ? "#a5f3fc" : "#94a3b8"} fontWeight="bold">
                  refs/heads/feature-gst
                </text>

                {/* Dynamic arrow from HEAD */}
                {currentBranch === "main" ? (
                  <path
                    d="M 170 115 C 220 115, 230 65, 275 65"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    markerEnd="url(#headSwitchArrow)"
                  />
                ) : (
                  <path
                    d="M 170 115 C 220 115, 230 165, 275 165"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    markerEnd="url(#headSwitchArrow)"
                  />
                )}

                {/* Commit C1 and C2 */}
                <circle cx="560" cy="62" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="552" y="66" fill="#a7f3d0" fontWeight="bold">C2</text>
                <path d="M 440 62 L 538 62" stroke="#10b981" strokeWidth="2" markerEnd="url(#branchCommitArrow)" />

                {/* Commit F1 */}
                <circle cx="560" cy="167" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="552" y="171" fill="#a5f3fc" fontWeight="bold">F1</text>
                <path d="M 440 167 L 538 167" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#branchCommitArrow)" />

                {/* Notes */}
                <text x="620" y="70" fill="#94a3b8" fontSize="10">Working tree matches C2</text>
                <text x="620" y="175" fill="#94a3b8" fontSize="10">Working tree matches F1</text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMAND SYNTAX COMPARISON MATRIX ───────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Modern `git switch` vs Legacy `git checkout`</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Desired Action</th>
                  <th className="p-3 font-semibold text-cyan-400">Modern Command (Git 2.23+)</th>
                  <th className="p-3 font-semibold text-amber-400">Legacy Command (Ambiguous)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Switch to existing branch</td>
                  <td className="p-3 text-cyan-300">git switch feature-gst</td>
                  <td className="p-3 text-amber-300">git checkout feature-gst</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Toggle to previous branch</td>
                  <td className="p-3 text-cyan-300">git switch -</td>
                  <td className="p-3 text-amber-300">git checkout -</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Discard unstaged file changes</td>
                  <td className="p-3 text-emerald-400">git restore invoice.js</td>
                  <td className="p-3 text-rose-400">git checkout -- invoice.js (Risky!)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Unstage a staged file</td>
                  <td className="p-3 text-emerald-400">git restore --staged invoice.js</td>
                  <td className="p-3 text-amber-300">git reset HEAD invoice.js</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Navigate to commit (detached)</td>
                  <td className="p-3 text-cyan-300">git switch --detach 7a8b9c0</td>
                  <td className="p-3 text-amber-300">git checkout 7a8b9c0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Daily Workflow Switching Patterns</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Switch to feature branch</span>
              <p className="text-cyan-400">$ git switch feature-gst</p>
              <p className="text-emerald-400">Switched to branch 'feature-gst'</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Toggle back to main quickly</span>
              <p className="text-cyan-400">$ git switch -</p>
              <p className="text-emerald-400">Switched to branch 'main'</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Switch to a remote tracking branch (automatic guess)</span>
              <p className="text-cyan-400">$ git switch release-v2</p>
              <p className="text-emerald-400">Branch 'release-v2' set up to track remote branch 'release-v2' from 'origin'.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When interviewing junior developers in Kolkata tech parks, one of my favorite screening questions is: 'What is the difference between git switch and git checkout?' If a candidate explains the Git 2.23 refactoring and how `git switch` protects developers from accidental file wiping, they immediately stand out as an informed professional."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Switching Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Ignoring Dirty File Block Warnings</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When Git blocks a branch switch because local files would be overwritten, running <code className="text-slate-100">git switch -f</code> wipes those uncommitted edits irretrievably. Always use <code className="text-slate-100">git stash</code> instead.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Unintentionally Entering Detached HEAD</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Running <code className="text-slate-100">git checkout 7a8b9c0</code> enters detached HEAD. With <code className="text-slate-100">git switch</code>, Git requires you to explicitly specify <code className="text-slate-100">git switch --detach 7a8b9c0</code>, preventing accidental detaching.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 4 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 4 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 3: Creating Branches</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 5: Create & Switch in One Step</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
