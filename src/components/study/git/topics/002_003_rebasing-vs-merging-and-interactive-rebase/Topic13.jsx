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
  FolderGit2,
  Check,
  Award,
  TerminalSquare
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic 13: Hands-on Terminal Lab: Linearizing a divergent feature branch, performing interactive rebase, squashing WIP commits, and testing with exec
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [activeDrill, setActiveDrill] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/12`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const drills = [
    {
      id: 1,
      title: "Drill 1: Sandbox & Test Suite Init",
      cmd: "git init && chmod +x test.sh && git commit -m 'feat: initial'",
      desc: "Sets up a fresh Git repo with an automated test suite verifying tax compliance rules."
    },
    {
      id: 2,
      title: "Drill 2: Divergent Development",
      cmd: "git switch -c feature/tax-audit\n# Add 4 commits (WIP, typo, debug, feature)\ngit switch main\n# Add 1 commit on main",
      desc: "Simulates real-world sprint divergence where main and feature both move forward simultaneously."
    },
    {
      id: 3,
      title: "Drill 3: Branch Linearization",
      cmd: "git switch feature/tax-audit && git rebase main",
      desc: "Replays the 4 feature commits cleanly on top of main's latest commit."
    },
    {
      id: 4,
      title: "Drill 4: Interactive Rebase & Exec",
      cmd: "git rebase -i --exec './test.sh' main",
      desc: "Squashes typo commits, drops debug logs, and runs test.sh after each replayed commit."
    },
    {
      id: 5,
      title: "Drill 5: Fast-Forward Merge",
      cmd: "git switch main && git merge feature/tax-audit",
      desc: "Integrates the pristine, linear branch into main without creating messy merge bubbles."
    },
    {
      id: 6,
      title: "Drill 6: Verification & DAG Check",
      cmd: "git log --graph --oneline --decorate --all",
      desc: "Verifies the 100% straight, linear commit history across the repository."
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                  Hands-on Sandbox Lab
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <TerminalSquare className="w-6 h-6 text-purple-400" />
                Hands-on Terminal Lab: Linearization & Interactive Rebase
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
                Next Topic: Final Exam <ArrowRight className="w-3.5 h-3.5" />
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
                Practical Sandbox Walkthrough
              </span>
              <h2 className="text-2xl font-bold text-white">
                The AccoTax Terminal Flight Simulator
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Welcome to the official <strong className="text-cyan-300">AccoTax Barrackpore Lab Sandbox</strong>!
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                In this terminal flight simulator, you will create divergent branches, rebase them linearly onto <code className="text-cyan-300 bg-slate-950 px-1 rounded">main</code>,
                run automated compliance test scripts during rebase using <code className="text-purple-300 bg-slate-950 px-1 rounded">exec</code>, and verify a 100% straight commit DAG!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE 6 DRILLS SELECTOR ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 6 Practical Terminal Drills
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {drills.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrill(d.id)}
                className={`p-3.5 rounded-xl border text-center transition-all ${
                  activeDrill === d.id
                    ? "bg-purple-950/80 border-purple-500 shadow-md shadow-purple-950"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="text-xs font-mono font-bold text-purple-400 mb-1">DRILL 0{d.id}</div>
                <div className="text-xs font-semibold text-white truncate">{d.title.split(":")[1] || d.title}</div>
              </button>
            ))}
          </div>

          {/* Active Drill Card */}
          {(() => {
            const cur = drills.find((x) => x.id === activeDrill);
            return (
              <div className="p-6 rounded-2xl border border-purple-900/40 bg-slate-900/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-purple-300 font-bold text-base font-mono">
                    {cur.title}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    Phase {cur.id} of 6
                  </span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{cur.desc}</p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-line">
                  {cur.cmd}
                </div>
              </div>
            );
          })()}
        </section>

        {/* ─── SECTION 4: INTERACTIVE TERMINAL SIMULATOR ──────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-purple-400 border border-slate-700">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interactive Terminal Simulator Output</h2>
              <p className="text-xs text-slate-400">Complete execution output of all 6 drills combined</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl font-mono text-xs text-slate-300 leading-relaxed">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">bash - Swadeep@CoderAccoTax: ~/git_rebase_lab</span>
              <span className="text-emerald-400">LAB COMPLETE</span>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <span className="text-emerald-400">swadeep@accotax:~/git_rebase_lab$</span>{" "}
                <span className="text-white font-bold">git log --graph --oneline --all --decorate</span>
              </div>
              <div className="text-cyan-300 pl-4 space-y-0.5">
                <div>* <span className="text-amber-400">b9a10ef</span> (HEAD -&gt; main, feature/tax-audit) feat(audit): implement ₹10 Lakh threshold tax audit rule</div>
                <div>* <span className="text-amber-400">7f2c81d</span> feat(audit): add initial tax compliance rules</div>
                <div>* <span className="text-cyan-400">e4b190a</span> feat: configure FY 2026-27 constants</div>
                <div>* <span className="text-slate-500">11c80ea</span> feat: initial ledger core and test runner</div>
              </div>
              <div className="text-emerald-400 pl-4 font-bold">
                ✓ History is 100% linear! Zero merge bubbles. Tests: 100% PASS.
              </div>
            </div>
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
              Classroom Dialogue: Tuhina & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Tuhina (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, I ran the lab script and my final git log graph was a single straight line! Is this how senior developers work every day?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Yes, Tuhina! Top engineering teams at Google, GitHub, and high-stakes financial firms rely on this exact discipline.
                  You now possess the muscle memory to handle complex interactive rebasing with zero fear!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 13: Hands-on Terminal Lab (Printable Notes)" />
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
                28 practical interview questions on the complete terminal rebase lifecycle
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Classroom Deep-Dive
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Final Exam & Graduation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
