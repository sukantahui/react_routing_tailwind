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
  ListFilter,
  Search,
  Globe
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic 6: Listing and Inspecting Branches: git branch, git branch -v (with last commit), and git branch -vv (with upstream tracking)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [selectedListingMode, setSelectedListingMode] = useState("vv");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const branchesData = [
    {
      name: "main",
      active: true,
      sha: "7a8b9c0",
      upstream: "origin/main",
      syncStatus: "ahead 1, behind 0",
      subject: "feat: release billing system v1.2",
      merged: true
    },
    {
      name: "feature/gst-slab",
      active: false,
      sha: "3f4a5b6",
      upstream: "origin/feature/gst-slab",
      syncStatus: "up to date",
      subject: "feat: add 18% and 28% GST rules",
      merged: false
    },
    {
      name: "hotfix/login-null",
      active: false,
      sha: "9e8d7c6",
      upstream: "origin/hotfix/login-null",
      syncStatus: "ahead 2, behind 1",
      subject: "fix: handle null token in auth middleware",
      merged: false
    },
    {
      name: "experiment/legacy-calc",
      active: false,
      sha: "1a2b3c4",
      upstream: "none",
      syncStatus: "local only",
      subject: "chore: test old depreciation formulas",
      merged: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 6 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Listing & Inspecting Branches: <code className="text-cyan-300 font-mono text-lg">git branch</code>, <code className="text-emerald-300 font-mono text-lg">-v</code>, & <code className="text-purple-300 font-mono text-lg">-vv</code>
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
              <ListFilter className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Repository Forensics & Audit</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Gaining Complete Visibility Over Your Local and Remote Branch Ecosystem
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                As software repositories expand, developers juggle dozens of local feature branches, hotfixes, and remote-tracking pointers. Running simple <code className="text-cyan-300 font-mono">git branch</code> only reveals names.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Mastering the inspection flags (<code className="text-emerald-300 font-mono">-v</code>, <code className="text-purple-300 font-mono">-vv</code>, <code className="text-amber-300 font-mono">--merged</code>, <code className="text-rose-300 font-mono">--no-merged</code>, and <code className="text-cyan-300 font-mono">--sort=-committerdate</code>) transforms the terminal into an interactive dashboard, showing ahead/behind sync counts, latest commit subjects, and safe deletion candidates at a glance.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 border border-purple-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-950 border border-purple-800 rounded-lg text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-purple-200">
              Explain Like I'm 10 (ELI10): The Airport Flight Status Radar Board
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> taught student <strong>Swadeep Sarkar</strong> how to inspect branches:
            </p>

            <div className="p-4 bg-slate-950/80 border border-purple-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                "If you ask the airport guard: <em>'What flights exist?'</em>, he gives you a list of flight names (<code className="text-cyan-300">git branch</code>). That's not helpful if you need to know who is landing!"
              </p>
              <p className="text-xs text-purple-300">
                "Running <code className="text-emerald-300">git branch -vv</code> is like looking at the live electronic radar board at Kolkata Airport: it displays the flight number, the pilot's last radio check, and whether the flight is 15 minutes ahead or 30 minutes behind schedule!"
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-purple-500 pl-3">
              "Swadeep learned: Always check the radar board (<code className="text-purple-300">git branch -vv</code>) before deleting or pushing, so you never accidentally wipe an unmerged flight!" — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE BRANCH INSPECTOR DASHBOARD ────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Command Lab</span>
              <h3 className="text-xl font-bold text-white">Compare Branch Output Modes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedListingMode("standard")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedListingMode === "standard"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                git branch
              </button>
              <button
                onClick={() => setSelectedListingMode("v")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedListingMode === "v"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                git branch -v
              </button>
              <button
                onClick={() => setSelectedListingMode("vv")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedListingMode === "vv"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                git branch -vv
              </button>
              <button
                onClick={() => setSelectedListingMode("merged")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedListingMode === "merged"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                --merged
              </button>
            </div>
          </div>

          {/* Terminal Emulation Output */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-2 overflow-x-auto">
            <div className="text-slate-500">
              # Output for command: $ git branch {selectedListingMode === "standard" ? "" : selectedListingMode === "merged" ? "--merged" : `-${selectedListingMode}`}
            </div>

            <div className="space-y-1.5 pt-2">
              {branchesData
                .filter((b) => (selectedListingMode === "merged" ? b.merged : true))
                .map((b, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 ${
                      b.active ? "text-emerald-400 font-bold bg-emerald-950/20 px-2 py-1 rounded" : "text-slate-300"
                    }`}
                  >
                    <span className="w-4 text-center">{b.active ? "*" : " "}</span>
                    <span className="w-48">{b.name}</span>

                    {selectedListingMode === "v" && (
                      <>
                        <span className="text-purple-400">{b.sha}</span>
                        <span className="text-slate-400">{b.subject}</span>
                      </>
                    )}

                    {selectedListingMode === "vv" && (
                      <>
                        <span className="text-purple-400">{b.sha}</span>
                        <span className={b.upstream !== "none" ? "text-cyan-400" : "text-slate-500"}>
                          [{b.upstream !== "none" ? `${b.upstream}: ${b.syncStatus}` : "local only"}]
                        </span>
                        <span className="text-slate-400">{b.subject}</span>
                      </>
                    )}

                    {selectedListingMode === "merged" && (
                      <span className="text-emerald-400 text-[11px] font-sans">[Fully integrated into HEAD - Safe to delete]</span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Ahead / Behind Upstream Tracking Comparison
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="syncArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Local Branch Track */}
                <rect x="40" y="30" width="360" height="80" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="55" y="55" fill="#a7f3d0" fontWeight="bold">Local Branch: main</text>
                <circle cx="160" cy="80" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="153" y="84" fill="#a7f3d0" fontSize="10">C1</text>
                <line x1="174" y1="80" x2="230" y2="80" stroke="#10b981" strokeWidth="2" />
                <circle cx="245" cy="80" r="14" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="238" y="84" fill="#a7f3d0" fontSize="10">C2</text>
                <line x1="259" y1="80" x2="315" y2="80" stroke="#10b981" strokeWidth="2" />
                <circle cx="330" cy="80" r="14" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                <text x="323" y="84" fill="#ecfdf5" fontSize="10">C3</text>
                <text x="315" y="105" fill="#34d399" fontSize="9">+1 Ahead</text>

                {/* Remote Branch Track */}
                <rect x="450" y="30" width="360" height="80" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="465" y="55" fill="#a5f3fc" fontWeight="bold">Remote: origin/main (GitHub)</text>
                <circle cx="570" cy="80" r="14" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="563" y="84" fill="#a5f3fc" fontSize="10">C1</text>
                <line x1="584" y1="80" x2="640" y2="80" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="655" cy="80" r="14" fill="#164e63" stroke="#22d3ee" strokeWidth="2" />
                <text x="648" y="84" fill="#ecfeff" fontSize="10">C2</text>

                {/* Status Bar */}
                <rect x="40" y="135" width="770" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="60" y="165" fill="#c7d2fe" fontWeight="bold" fontSize="12">
                  git branch -vv output: <tspan fill="#a7f3d0">main 7a8b9c0 [origin/main: ahead 1] feat: release billing v1.2</tspan>
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: ADVANCED FILTERING & SORTING TABLE ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Advanced Inspection Flags Reference</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Command / Flag</th>
                  <th className="p-3 font-semibold">Purpose & Practical Use</th>
                  <th className="p-3 font-semibold text-cyan-400">Sample Output Highlight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">git branch -v</td>
                  <td className="p-3 font-sans">Shows latest commit SHA & subject line for each local branch</td>
                  <td className="p-3 text-slate-300">main 7a8b9c0 feat: add billing</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-300 font-bold">git branch -vv</td>
                  <td className="p-3 font-sans">Shows upstream tracking branch and ahead/behind commit delta counts</td>
                  <td className="p-3 text-cyan-300">[origin/main: ahead 2, behind 1]</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-emerald-300 font-bold">git branch --merged</td>
                  <td className="p-3 font-sans">Filters branches completely merged into current HEAD (safe to prune)</td>
                  <td className="p-3 text-emerald-400">feature/login-v1 (ready to delete)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-rose-300 font-bold">git branch --no-merged</td>
                  <td className="p-3 font-sans">Filters branches with unintegrated commits (deleting will lose work)</td>
                  <td className="p-3 text-rose-400">feature/gst-calc (active WIP)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-amber-300 font-bold">git branch --sort=-committerdate</td>
                  <td className="p-3 font-sans">Sorts branches chronologically with the most recently updated on top</td>
                  <td className="p-3 text-slate-300">Most active branch first</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL AUDIT SCRIPT ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Terminal Inspection Patterns</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Audit all local branches with upstream sync status</span>
              <p className="text-cyan-400">$ git branch -vv</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Find merged branches ready for safe deletion</span>
              <p className="text-cyan-400">$ git branch --merged</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. List branches sorted by last activity date</span>
              <p className="text-cyan-400">$ git branch --sort=-committerdate --format="%(refname:short) | %(committerdate:relative)"</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="In busy software houses, developers often accumulate 40 stale branches on their local laptops over 6 months. I teach students at AccoTax: every Friday afternoon, run `git fetch -p`, run `git branch --merged`, and clean up. A tidy branch list keeps your cognitive load zero and prevents merging mistakes."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Branch Inspection Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Deleting Branches Without Checking `--no-merged`</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assuming a branch is merged because your teammate merged their PR on GitHub can lead to data loss if your local branch had extra unpushed commits. Always verify with <code className="text-slate-100">git branch --merged</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Relying on Stale Upstream Status Without `git fetch`</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-slate-100">git branch -vv</code> compares your branch against your <em>local copy</em> of remote tracking refs. If you haven't run <code className="text-slate-100">git fetch</code>, the ahead/behind numbers will be outdated!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 6 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 6 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 5: Create & Switch in One Step</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 7: Renaming Branches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
