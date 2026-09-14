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
  Play,
  Terminal,
  Award
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic 14: Hands-on Terminal Lab: Complete Branching Drills
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic14() {
  const [activeDrill, setActiveDrill] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const drills = [
    {
      id: 1,
      title: "Drill 1: Multi-Feature Branch Creation",
      cmd: "$ git switch -c feature/billing-v1",
      output: "Switched to a new branch 'feature/billing-v1'",
      focus: "Atomic pointer creation + HEAD update in under 5ms."
    },
    {
      id: 2,
      title: "Drill 2: Detached HEAD Time-Travel Sandbox",
      cmd: "$ git switch --detach 7a8b9c0 && git commit -m 'experiment'",
      output: "[detached HEAD d9e8f7a] experiment",
      focus: "Making unreferenced commits in temporary sandbox."
    },
    {
      id: 3,
      title: "Drill 3: Rescuing Experimental Commits",
      cmd: "$ git switch -c feature/ai-tax-rescued d9e8f7a",
      output: "Switched to a new branch 'feature/ai-tax-rescued'",
      focus: "Anchoring floating commits using reflog SHA hashes."
    },
    {
      id: 4,
      title: "Drill 4: Three-Dot Pull Request Comparison",
      cmd: "$ git diff main...feature/billing-v1",
      output: "diff --git a/billing.js b/billing.js\n+ function bill() {}",
      focus: "Reviewing pure feature deltas calculated from merge base."
    },
    {
      id: 5,
      title: "Drill 5: Merging and Safe Branch Deletion",
      cmd: "$ git switch main && git merge feature/billing-v1 && git branch -d feature/billing-v1",
      output: "Deleted branch feature/billing-v1 (was 3f4a5b6).",
      focus: "Integrating code and maintaining clean repository hygiene."
    }
  ];

  const currentDrill = drills.find((d) => d.id === activeDrill) || drills[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 14 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Hands-on Terminal Lab: Complete Branching & Pointer Drills
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
              <Terminal className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Practical Mastery Sandbox</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                End-to-End Terminal Mastery: From Pointer Creation to Rescue & Deletion
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                This comprehensive lab consolidates all core skills covered in Module 002_001. By executing this sequential drill suite, you will master the full lifecycle of Git branch pointers: atomic creation, switching, navigating detached HEAD states, rescuing lost work via the reflog, performing code reviews with three-dot diffs, and pruning merged references safely.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-indigo-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-950 border border-indigo-800 rounded-lg text-indigo-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-indigo-200">
              Explain Like I'm 10 (ELI10): The Flight Simulator for Version Control
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> set up the terminal drills like a pilot flight simulator:
            </p>

            <div className="p-4 bg-slate-950/80 border border-indigo-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                "In a flight simulator, you practice takeoff (creating branches), flying into storm clouds (detached HEAD experimentation), emergency engine restart (rescuing commits via reflog), and smooth landing on the runway (merging and deleting branches). Once you master the simulator drills, flying a real production aircraft is effortless!"
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-indigo-500 pl-3">
              "Every student who runs these 5 terminal drills develops instant confidence and zero fear of branching." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE LAB DRILL PLAYER ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Lab Suite</span>
              <h3 className="text-xl font-bold text-white">Select Drill to Inspect Runbook</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {drills.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDrill(d.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    activeDrill === d.id
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Drill {d.id}
                </button>
              ))}
            </div>
          </div>

          {/* Drill Card */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <span className="font-bold text-white text-sm">{currentDrill.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                Drill {currentDrill.id} of 5
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-sans">Command Line Execution:</span>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-cyan-300 font-bold">
                {currentDrill.cmd}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-sans">Terminal Feedback Output:</span>
              <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-emerald-400 whitespace-pre-wrap">
                {currentDrill.output}
              </pre>
            </div>

            <div className="pt-2 border-t border-slate-800 text-slate-300 font-sans">
              <strong>Core Engineering Objective:</strong> {currentDrill.focus}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Complete 5-Stage Branch Lifecycle Pipeline
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="labArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {/* Pipeline Step 1 */}
                <rect x="30" y="40" width="130" height="60" rx="6" fill="#0f172a" stroke="#06b6d4" />
                <text x="40" y="65" fill="#67e8f9" fontWeight="bold">1. switch -c</text>
                <text x="40" y="85" fill="#94a3b8" fontSize="10">Branch created</text>

                {/* Arrow 1 to 2 */}
                <line x1="160" y1="70" x2="190" y2="70" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#labArrow)" />

                {/* Pipeline Step 2 */}
                <rect x="195" y="40" width="130" height="60" rx="6" fill="#0f172a" stroke="#f59e0b" />
                <text x="205" y="65" fill="#fde68a" fontWeight="bold">2. Detached</text>
                <text x="205" y="85" fill="#94a3b8" fontSize="10">Sandbox commit</text>

                {/* Arrow 2 to 3 */}
                <line x1="325" y1="70" x2="355" y2="70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#labArrow)" />

                {/* Pipeline Step 3 */}
                <rect x="360" y="40" width="130" height="60" rx="6" fill="#0f172a" stroke="#10b981" />
                <text x="370" y="65" fill="#a7f3d0" fontWeight="bold">3. Rescue</text>
                <text x="370" y="85" fill="#94a3b8" fontSize="10">Reflog recovery</text>

                {/* Arrow 3 to 4 */}
                <line x1="490" y1="70" x2="520" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#labArrow)" />

                {/* Pipeline Step 4 */}
                <rect x="525" y="40" width="130" height="60" rx="6" fill="#0f172a" stroke="#a855f7" />
                <text x="535" y="65" fill="#d8b4fe" fontWeight="bold">4. 3-Dot Diff</text>
                <text x="535" y="85" fill="#94a3b8" fontSize="10">Code review</text>

                {/* Arrow 4 to 5 */}
                <line x1="655" y1="70" x2="685" y2="70" stroke="#a855f7" strokeWidth="2" markerEnd="url(#labArrow)" />

                {/* Pipeline Step 5 */}
                <rect x="690" y="40" width="130" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="700" y="65" fill="#a7f3d0" fontWeight="bold">5. Clean Merge</text>
                <text x="700" y="85" fill="#6ee7b7" fontSize="10">Safe delete -d</text>

                {/* Footer notes */}
                <text x="30" y="160" fill="#94a3b8" fontSize="11">
                  1. Script file: <tspan fill="#67e8f9">master_branching_terminal_lab.sh</tspan>
                </text>
                <text x="30" y="185" fill="#94a3b8" fontSize="11">
                  2. Full drill runtime: ~1.5 seconds automated execution in bash.
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMPLETE DRILL RUNBOOK ───────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Full Lab Shell Runbook</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># Step 1: Initialize & make first commit</span>
              <p className="text-cyan-400">$ git init && echo 'App Base' &gt; app.js &amp;&amp; git add . &amp;&amp; git commit -m 'feat: base'</p>
            </div>
            <div>
              <span className="text-slate-500"># Step 2: Create feature branch</span>
              <p className="text-cyan-400">$ git switch -c feature/billing</p>
              <p className="text-cyan-400">$ echo 'billing code' &gt;&gt; app.js &amp;&amp; git commit -am 'feat: billing'</p>
            </div>
            <div>
              <span className="text-slate-500"># Step 3: Enter detached HEAD & experiment</span>
              <p className="text-cyan-400">$ git switch --detach HEAD~1</p>
              <p className="text-cyan-400">$ echo 'experiment' &gt;&gt; app.js &amp;&amp; git commit -am 'experiment'</p>
            </div>
            <div>
              <span className="text-slate-500"># Step 4: Rescue experimental commits</span>
              <p className="text-cyan-400">$ git switch -c feature/rescued-experiment</p>
            </div>
            <div>
              <span className="text-slate-500"># Step 5: Merge and cleanup</span>
              <p className="text-cyan-400">$ git switch main &amp;&amp; git merge feature/billing &amp;&amp; git branch -d feature/billing</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="If you can execute these 5 drills in your terminal without checking notes, you possess stronger Git branching fundamentals than 80% of working industry developers. You are now fully prepared for Topic 15's final mastery assessment!"
          />
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 14 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 14 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 13: Classroom Case Study</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 15: Module Self-Assessment Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
