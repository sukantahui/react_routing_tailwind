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
  Code2,
  Copy,
  CheckSquare,
  ListOrdered
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
 * Topic 7: Step-by-Step Conflict Resolution Workflow: Identifying conflicting files via git status, reviewing diffs, editing markers, staging, and completing the merge
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [activeStep, setActiveStep] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const stepsData = [
    {
      step: 1,
      title: "Identify Conflicted Files",
      command: "git status",
      output: `On branch main\nYou have unmerged paths.\n  (fix conflicts and run "git commit")\n\nUnmerged paths:\n  (use "git add <file>..." to mark resolution)\n\tboth modified:   src/payroll.js`,
      desc: "Run git status to immediately see all paths requiring attention under 'Unmerged paths'."
    },
    {
      step: 2,
      title: "Review Diffs & Markers",
      command: "git diff",
      output: `diff --cc src/payroll.js\nindex a1b2c3d,e4f5a6b..0000000\n--- a/src/payroll.js\n+++ b/src/payroll.js\n<<<<<<< HEAD\n    const HRA_PERCENT = 0.27;\n=======\n    const HRA_PERCENT = 0.24;\n>>>>>>> feature/metro-hra`,
      desc: "Inspect the raw conflict markers and understand the competing business requirements."
    },
    {
      step: 3,
      title: "Edit, Clean Markers & Test",
      command: "code src/payroll.js && npm test",
      output: `PASS  __tests__/payroll.test.js\n✓ calculates Kolkata metro HRA correctly (24%)\n✓ calculates Revised national HRA correctly (27%)\n\nTest Suites: 1 passed, 1 total`,
      desc: "Remove ALL marker delimiters (<<<<<<<, =======, >>>>>>>), combine business logic, and verify test suite passes."
    },
    {
      step: 4,
      title: "Stage Resolved Files",
      command: "git add src/payroll.js",
      output: `On branch main\nAll conflicts fixed but you are still merging.\n  (use "git commit" to conclude merge)\n\nChanges to be committed:\n\tmodified:   src/payroll.js`,
      desc: "Staging converts index stages 1, 2, 3 into a single resolved Stage 0 blob."
    },
    {
      step: 5,
      title: "Finalize Merge Commit",
      command: "git commit -m 'merge: resolve payroll conflict with tiered metro HRA'",
      output: `[main 8a9b1c2] merge: resolve payroll conflict with tiered metro HRA\n 1 file changed, 4 insertions(+), 2 deletions(-)`,
      desc: "Mints the official merge commit with 2 parents and cleans up .git/MERGE_HEAD."
    }
  ];

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
          <span className="text-amber-400 font-mono">Topic-07</span>
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <ListOrdered className="w-3.5 h-3.5" />
              Standard Operating Procedure
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
              Intermediate • 45 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              5-Step Lifecycle
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Step-by-Step Conflict Resolution Workflow
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            The complete 5-step professional protocol for resolving merge collisions: identifying conflicted paths via <code className="text-sky-400 font-mono">git status</code>, reviewing diffs, safely editing markers, staging resolutions, and finalizing merge commits.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Explain Like I'm 10: The 5-Step Recipe for Peace
              </h2>
              <p className="text-xs text-emerald-300">
                Sukanta Sir trains Sachin and Debangshu at Coder & AccoTax, Barrackpore
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Debangshu
              </div>
              <p>
                <strong className="text-rose-300">Debangshu:</strong> "Sir, every time a conflict happens, I panic, close my terminal, and hope it goes away on its own. How do senior developers resolve conflicts without breaking sweat?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "By following a strict 5-step checklist, Debangshu! Just like a pilot preparing for takeoff:
                <br />
                <span className="text-emerald-300 font-semibold">1. Status</span> (Find what's stuck) &rarr;
                <span className="text-sky-300 font-semibold"> 2. Diff</span> (Read the competing lines) &rarr;
                <span className="text-amber-300 font-semibold"> 3. Edit & Test</span> (Erase the marker fences and verify code) &rarr;
                <span className="text-indigo-300 font-semibold"> 4. Stage</span> (<code className="text-slate-200 font-mono">git add</code> to mark fixed) &rarr;
                <span className="text-emerald-400 font-semibold"> 5. Commit</span> (Seal the deal)."
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-amber-300">Sachin:</strong> "And what if I realize mid-way that I need to talk to the client before deciding?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "You run <code className="text-rose-400 font-mono">git merge --abort</code>! It acts as a time machine, resetting the repository safely to the exact state before you initiated the merge."
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive 5-Step Workflow Stepper ──────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" />
                Interactive 5-Step Resolution Stepper
              </h2>
              <p className="text-xs text-slate-400">
                Click through each phase to inspect exact terminal commands and live simulated outputs
              </p>
            </div>

            {/* Step Navigation Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setActiveStep(num)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                    activeStep === num
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          {(() => {
            const current = stepsData.find((s) => s.step === activeStep);
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                    {current.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{current.title}</h3>
                    <p className="text-xs text-slate-400">{current.desc}</p>
                  </div>
                </div>

                {/* Terminal Window */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-[11px] text-slate-400 ml-2">Terminal: Sukanta Hui @ Barrackpore Lab</span>
                    </span>
                    <span className="text-[10px] text-slate-500">Step {current.step} of 5</span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-emerald-400 font-bold">$ </span>
                      <span className="text-white font-semibold">{current.command}</span>
                    </div>

                    <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                      {current.output}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ─── Section 4: Deep Technical Analysis ─────────────────────────── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Internal State Transitions in Git
            </h2>
            <p className="text-sm text-slate-400">
              What happens inside the <code className="text-slate-200">.git</code> folder during the conflict lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Active Conflict State (Steps 1-3)
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-bold">•</span>
                  <span>
                    <code className="text-slate-200 font-mono">.git/MERGE_HEAD</code> holds the commit SHA of the incoming branch.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-bold">•</span>
                  <span>
                    <code className="text-slate-200 font-mono">.git/MERGE_MSG</code> holds the auto-generated commit message draft.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-bold">•</span>
                  <span>
                    Index holds Stages 1 (Base), 2 (Ours), and 3 (Theirs) for unmerged paths.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Resolved &amp; Finalized State (Steps 4-5)
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">•</span>
                  <span>
                    <code className="text-slate-200 font-mono">git add</code> compresses resolved file into a new blob and sets Stage 0.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">•</span>
                  <span>
                    <code className="text-slate-200 font-mono">git commit</code> mints a new 2-parent merge commit and deletes <code className="text-slate-200">.git/MERGE_HEAD</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">•</span>
                  <span>
                    Working directory returns to clean status.
                  </span>
                </li>
              </ul>
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
              <strong className="text-amber-400">Swadeep:</strong> "Sir, what if my teammate and I disagree on how the conflict should be resolved?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Never guess or push your resolution unilaterally! In production teams, conflict resolution is a collaborative agreement. Pick up the phone or do a quick screen-share with your peer. Once both agree, write the clean code together and run your test suite."
            </p>
          </div>
        </div>

        {/* ─── Section 6: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Conflict Resolution Checklist
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Always check <code className="text-slate-200">git status</code> first.</li>
              <li>Inspect full context before modifying.</li>
              <li>Remove 100% of conflict marker lines.</li>
              <li>Run your unit test suite before <code className="text-slate-200">git commit</code>.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency Bailout
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If things become confusing or messy, cancel everything with:
              <br />
              <code className="text-rose-400 font-mono font-bold bg-slate-950 px-2 py-1 rounded block mt-1">
                git merge --abort
              </code>
            </p>
          </div>
        </div>

        {/* ─── Section 7: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Step-by-Step Conflict Resolution Workflow"
          content={noteText}
        />

        {/* ─── Section 8: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Conflict Resolution Workflow"
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
            Previous: Anatomy of Conflict Markers
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Using Graphical &amp; Visual Merge Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
