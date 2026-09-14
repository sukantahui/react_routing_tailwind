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
  GitPullRequest,
  Split,
  Diff
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic 12: Comparing Branches: git diff branchA..branchB (two-dot) vs git diff branchA...branchB (three-dot diff from merge base)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [selectedDiffMode, setSelectedDiffMode] = useState("three_dot");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
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
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 12 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Comparing Branches: Two-Dot (<code className="text-amber-300 font-mono text-lg">..</code>) vs Three-Dot (<code className="text-cyan-300 font-mono text-lg">...</code>)
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
              <Diff className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Code Review & Diff Precision</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Understanding Merge-Base Comparison Is Essential for Pull Requests
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                When comparing two diverged branches, Git offers two fundamentally different comparison methodologies: <strong>Two-Dot Diff (<code className="text-amber-300 font-mono">..</code>)</strong> and <strong>Three-Dot Diff (<code className="text-cyan-300 font-mono">...</code>)</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Two-dot diff directly compares the tips of both branches, including new commits added to the base branch. In contrast, <strong>Three-Dot Diff</strong> calculates the common ancestor (merge base) and compares that ancestor snapshot against the feature tip. This isolates <em>strictly what the feature branch created</em>, which is why GitHub, GitLab, and Bitbucket Pull Requests exclusively use three-dot diffs!
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
              Explain Like I'm 10 (ELI10): Comparing Sachin's Desk Today vs Monday Morning
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> set up two desks with students <strong>Sachin</strong> and <strong>Mahima</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Split className="w-4 h-4" />
                  <span>Two-Dot Diff (Sachin's Desk vs Mahima's Desk)</span>
                </div>
                <p className="text-xs text-slate-300">
                  You stand between Sachin's desk and Mahima's desk today. You list every difference between them: Sachin has a coffee mug; Mahima has a calculator. It shows everything different at this exact second.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-cyan-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <GitPullRequest className="w-4 h-4" />
                  <span>Three-Dot Diff (Mahima's Work Since Monday Morning)</span>
                </div>
                <p className="text-xs text-slate-300">
                  You look at what Mahima's desk looked like on Monday morning (the fork point) and compare it only to what Mahima added herself. You ignore whatever new coffee cups Sachin brought to his desk in the meantime!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-cyan-500 pl-3">
              "Mahima said: 'So three-dot diff only grades my homework without getting distracted by Sachin's desk!' Exactly." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE COMPARISON SIMULATOR ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Diff Inspector</span>
              <h3 className="text-xl font-bold text-white">Compare Two-Dot vs Three-Dot Output</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDiffMode("two_dot")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedDiffMode === "two_dot"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                git diff main..feature (Two-Dot)
              </button>
              <button
                onClick={() => setSelectedDiffMode("three_dot")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedDiffMode === "three_dot"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                git diff main...feature (Three-Dot / PR)
              </button>
            </div>
          </div>

          {/* Diff Output Window */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
              <span>
                Command:{" "}
                <code className="text-cyan-300 font-bold">
                  $ git diff {selectedDiffMode === "two_dot" ? "main..feature-gst" : "main...feature-gst"}
                </code>
              </span>
              <span className="text-purple-400">
                {selectedDiffMode === "two_dot" ? "Direct Tip Snapshot Comparison" : "Merge-Base to Feature Comparison"}
              </span>
            </div>

            <div className="space-y-1.5">
              {selectedDiffMode === "two_dot" ? (
                <>
                  <div className="text-slate-500">diff --git a/ledger_header.txt b/ledger_header.txt</div>
                  <div className="text-rose-400">- # Main Branch Header Update v2.0 (From Commit M1 on main)</div>
                  <div className="text-emerald-400">+ # Original Common Base Header v1.0</div>
                  <div className="text-slate-500 pt-2">diff --git a/gst_calc.js b/gst_calc.js</div>
                  <div className="text-emerald-400">+ function calcGST(amt) &#123; return amt * 0.18; &#125;</div>
                </>
              ) : (
                <>
                  <div className="text-slate-500">diff --git a/gst_calc.js b/gst_calc.js</div>
                  <div className="text-slate-500">--- /dev/null (Merge base C1)</div>
                  <div className="text-slate-500">+++ b/gst_calc.js (Feature Tip F1)</div>
                  <div className="text-emerald-400">+ function calcGST(amt) &#123; return amt * 0.18; &#125;</div>
                  <div className="text-emerald-400">+ export default calcGST;</div>
                  <div className="pt-2 text-cyan-400 font-sans text-[11px]">
                    ✓ Clean Pull Request View: Shows only the code written on feature-gst without noise from main!
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Merge-Base Calculation in 3-Dot Diff
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="compArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Common Ancestor C1 */}
                <circle cx="200" cy="120" r="22" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                <text x="190" y="125" fill="#a7f3d0" fontWeight="bold">C1</text>
                <text x="140" y="165" fill="#10b981" fontWeight="bold">Merge Base (Common Ancestor)</text>

                {/* Main Branch Commit M1 */}
                <path d="M 222 110 L 418 70" stroke="#10b981" strokeWidth="2" />
                <circle cx="440" cy="65" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="430" y="70" fill="#a7f3d0" fontWeight="bold">M1</text>
                <rect x="470" y="50" width="60" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="480" y="67" fill="#a7f3d0" fontWeight="bold">main</text>

                {/* Feature Branch Commit F1 */}
                <path d="M 222 130 L 418 170" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="440" cy="175" r="20" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="432" y="180" fill="#a5f3fc" fontWeight="bold">F1</text>
                <rect x="470" y="160" width="80" height="26" rx="4" fill="#164e63" stroke="#06b6d4" />
                <text x="480" y="177" fill="#a5f3fc" fontWeight="bold">feature</text>

                {/* Two-Dot direct line */}
                {selectedDiffMode === "two_dot" ? (
                  <path d="M 440 85 L 440 155" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                ) : (
                  <path d="M 222 120 C 300 120, 360 175, 418 175" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 2">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                )}

                <text x="580" y="80" fill="#94a3b8" fontSize="11">
                  {selectedDiffMode === "two_dot"
                    ? "Two-Dot: Direct M1 <-> F1 comparison (includes M1 noise)"
                    : "Three-Dot: C1 (Merge Base) <-> F1 (Pure feature delta)"}
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: SYNTAX COMPARISON MATRIX ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Two-Dot vs Three-Dot Syntax Behavior Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Git Command</th>
                  <th className="p-3 font-semibold text-amber-400">Two-Dot (`..`) Meaning</th>
                  <th className="p-3 font-semibold text-cyan-400">Three-Dot (`...`) Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-200">git diff A B</td>
                  <td className="p-3 text-amber-300">Direct comparison between tip A and tip B</td>
                  <td className="p-3 text-cyan-300">Comparison from merge-base(A,B) to tip B (PR Diff)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-200">git log A B</td>
                  <td className="p-3 text-amber-300">Commits reachable from B but NOT from A</td>
                  <td className="p-3 text-purple-300">Symmetric difference: Commits on A or B, but NOT both</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Daily Code Review Diff Commands</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Preview Pull Request diff before pushing</span>
              <p className="text-cyan-400">$ git diff main...HEAD</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. View file names only in PR</span>
              <p className="text-cyan-400">$ git diff --name-only main...HEAD</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. View line change stats in PR</span>
              <p className="text-cyan-400">$ git diff --stat main...HEAD</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="Junior developers often run `git diff main feature` and panic when they see 200 lines of code marked as deleted. I show them: those deletions aren't yours; they are commits someone else merged to main! Switch to `git diff main...feature`, and suddenly you only see your clean 20-line contribution."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Branch Comparison Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Confusing `git diff ...` with `git log ...`</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In `git log`, three dots mean symmetric difference (commits on either branch). In `git diff`, three dots mean diff from merge base.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Using Two-Dot Diff for PR Reviews</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Running two-dot diff shows irrelevant changes if the base branch moved forward. Always use three-dot diff for PR reviews.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 12 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 12 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 11: Recovering from Detached HEAD</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 13: Classroom Case Study</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
