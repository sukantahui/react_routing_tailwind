import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
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
  Scissors,
  Split,
  FileCode,
  Check,
  RotateCcw
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
 * Topic 9: Reordering Commits and Splitting a Large Commit into Atomic Commits during Interactive Rebase
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [splitStep, setSplitStep] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 9;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/8`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const splitWorkflow = [
    {
      step: 1,
      title: "Mark with `edit`",
      cmd: "git rebase -i HEAD~N",
      desc: "Change `pick` to `edit` on the megacommit line in the TODO script and save."
    },
    {
      step: 2,
      title: "Uncommit to Working Tree",
      cmd: "git reset HEAD~",
      desc: "Undoes the megacommit while leaving all file changes safely in the working directory."
    },
    {
      step: 3,
      title: "Craft Atomic Commits",
      cmd: "git add file1 && git commit -m 'feat: ...'\ngit add file2 && git commit -m 'fix: ...'",
      desc: "Stage and commit distinct logical features into separate clean commits."
    },
    {
      step: 4,
      title: "Resume & Finalize",
      cmd: "git rebase --continue",
      desc: "Git advances to the next commit in the rebase queue and finalizes the branch."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 border border-purple-700/50 text-purple-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Atomic Surgery
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Split className="w-6 h-6 text-purple-400" />
                Reordering & Splitting Commits Interactively
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-600/50 bg-purple-950/60 hover:bg-purple-900/80 text-xs font-medium text-purple-300 transition shadow-sm shadow-purple-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: ELI10 / REAL WORLD ANALOGY ──────────────────────── */}
        <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                ELI10 & Everyday Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Grocery Bag Sorting: Separating Dairy from Detergent
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine coming home from a supermarket in <strong className="text-cyan-300">Barrackpore</strong> with one massive plastic bag crammed with
                fresh milk, sweets, dishwashing soap, and a new screwdriver.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                You don't put the whole giant bag into the refrigerator! You unpack the items onto the kitchen counter (<code className="text-purple-300 bg-slate-950 px-1 rounded">git reset HEAD~</code>),
                put the sweets and milk into a clean food container (<code className="text-emerald-300">Commit 1: feat(dairy)</code>),
                and put the detergent in the cleaning cabinet (<code className="text-cyan-300">Commit 2: fix(cleaning)</code>).
                Everything is neat, isolated, and perfectly categorized!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: STEP-BY-STEP SPLIT WORKFLOW ─────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Scissors className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 4-Step Commit Splitting Recipe
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {splitWorkflow.map((s) => (
              <button
                key={s.step}
                onClick={() => setSplitStep(s.step)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  splitStep === s.step
                    ? "bg-purple-950/80 border-purple-500 shadow-md shadow-purple-950"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="text-xs font-mono font-bold text-purple-400 mb-1">
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

          {/* Active Step Details */}
          {(() => {
            const cur = splitWorkflow.find((x) => x.step === splitStep);
            return (
              <div className="p-6 rounded-2xl border border-purple-900/40 bg-slate-900/80 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-purple-300 font-bold text-base font-mono">
                    Phase {cur.step}: {cur.title}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Interactive Surgery</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{cur.desc}</p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-line">
                  {cur.cmd}
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
              <h2 className="text-xl font-bold text-white">Visual Breakdown: Megacommit to Atomic Commits</h2>
              <p className="text-xs text-slate-400">1 Monolithic node transforming into 2 pristine atomic commit objects</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <marker id="splitArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              {/* BEFORE (TOP) */}
              <text x="30" y="30" fill="#f43f5e" fontSize="12" fontWeight="bold">BEFORE SPLIT: MONOLITHIC MEGACOMMIT</text>
              <line x1="80" y1="70" x2="300" y2="70" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#splitArrow)" />
              <circle cx="80" cy="70" r="16" fill="#1e3a8a" />
              <text x="80" y="74" fill="#fff" fontSize="10" textAnchor="middle">Base</text>

              <rect x="250" y="45" width="280" height="50" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="390" y="66" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Megacommit: Penalty + Database URI</text>
              <text x="390" y="84" fill="#fecdd3" fontSize="9" textAnchor="middle">(2 unrelated tasks in 1 commit)</text>

              {/* DIVIDER */}
              <line x1="30" y1="120" x2="820" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* AFTER (BOTTOM) */}
              <text x="30" y="145" fill="#34d399" fontSize="12" fontWeight="bold">AFTER SPLIT: 2 CLEAN ATOMIC CONVENTIONAL COMMITS</text>
              <line x1="80" y1="190" x2="300" y2="190" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#splitArrow)" />
              <line x1="300" y1="190" x2="560" y2="190" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#splitArrow)" />

              <circle cx="80" cy="190" r="16" fill="#1e3a8a" />
              <text x="80" y="194" fill="#fff" fontSize="10" textAnchor="middle">Base</text>

              <rect x="230" y="165" width="220" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="340" y="186" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Commit 1: fix(db)</text>
              <text x="340" y="202" fill="#6ee7b7" fontSize="9" textAnchor="middle">Update MongoDB connection</text>

              <rect x="490" y="165" width="250" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="615" y="186" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Commit 2: feat(gst)</text>
              <text x="615" y="202" fill="#6ee7b7" fontSize="9" textAnchor="middle">₹5,000 late filing penalty calc</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Swadeep & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Swadeep (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, what happens if I run `git reset --hard HEAD~` while trying to split a commit?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "DON'T DO THAT! <code className="text-rose-300">--hard</code> erases all your code changes permanently from disk!
                  Always use standard mixed reset (<code className="text-cyan-300">git reset HEAD~</code>).
                  Mixed reset undoes the commit wrapper while leaving all your modified code safely in your working directory!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 9: Reordering & Splitting Commits (Printable Notes)" />
        </section>

        {/* ─── SECTION 7: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 interview questions on commit reordering and splitting mechanics
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Command Directives
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Squashing WIP & Bugfix Commits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
