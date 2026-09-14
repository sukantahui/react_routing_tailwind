import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  History,
  GitBranch,
  Terminal,
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
  Users
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0: What is Version Control and why software projects fail without it
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [activeTab, setActiveTab] = useState("concept");
  const [simulatedScenario, setSimulatedScenario] = useState("manual");
  const [showSolution, setShowSolution] = useState(false);

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const hasNext = currentIndex < totalTopics - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* ─── 1. Header Section ──────────────────────────────────────── */}
        <header className="space-y-4 border-b border-slate-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              to={`/${folder}/roadmap`}
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <FolderGit2 size={14} className="text-sky-400" />
              <span>Git Mastery Track</span>
            </Link>
            <span>/</span>
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="hover:text-sky-400 transition-colors"
            >
              Module 001_001
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Topic 0</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
              <Sparkles size={13} />
              Foundation Segment
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck size={13} />
              Core Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What is Version Control and Why Software Projects Fail Without It
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Discover why manual file copying creates catastrophic software failures, how modern Version Control Systems (VCS) provide an immutable audit ledger, and why Git is the bedrock of modern software engineering.
          </p>
        </header>

        {/* ─── 2. Dedicated Simple Language Section ───────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl font-bold shrink-0 shadow-inner">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                In Simple Words (The Everyday Analogy)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understand the core concept in plain English before exploring technical terminology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed text-slate-300">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                The Video Game Checkpoint Analogy:
              </h3>
              <p>
                Imagine you are playing an intense adventure game. Before opening a mysterious dungeon door with a dangerous boss monster inside, what do you always do? You <strong>save your game at a checkpoint</strong>.
              </p>
              <p className="text-slate-400 text-xs">
                If the dragon breathes fire and wipes out your team, you don't throw away your console or start from Level 1—you simply reload from your checkpoint and try a new strategy with 100% peace of mind.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-200 font-mono">
                &ldquo;In Git, every commit is an indestructible game save point for your code.&rdquo;
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                The Barrackpore Classroom Story:
              </h3>
              <p>
                At <strong>Coder & AccoTax</strong> in Barrackpore, <strong>Sukanta Sir</strong> asks his students <strong>Sachin</strong> and <strong>Mahima</strong> to build a student registration form.
              </p>
              <p className="text-slate-400 text-xs">
                Without Version Control, Sachin changes the database port to 5000 and emails the zip file. Mahima changes the same file to port 8080 and uploads it to a shared drive. Whoever saves last <strong>silently wipes out the other person's hard work</strong>!
              </p>
              <p className="text-emerald-300 text-xs font-semibold">
                Version Control stops this disaster by acting as an impartial referee who keeps both contributions safe and alerts the team if lines overlap.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. Dedicated Topic Description (What, Why, How, When) ──── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Comprehensive Conceptual Breakdown
              </h2>
              <p className="text-xs text-slate-400">
                The 6 essential dimensions of Version Control Systems
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-xs">1</span>
                What is it?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A system that records changes to a set of files over time, building a cryptographic timeline of project states that can be reviewed, branched, and restored at will.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xs">2</span>
                Why does it exist?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                To eliminate file overwrites, provide blame-free auditability, enable non-linear branching for team members, and ensure zero data loss during catastrophic bugs.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs">3</span>
                How does it work?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                By maintaining an append-only database of content-addressed snapshots (objects), tracking file differences, and moving branch pointers along a directed acyclic graph (DAG).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs">4</span>
                How is it used?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engineers stage intentional atomic changes, record descriptive commit messages, open pull requests for peer review, and trigger automated CI/CD deployment pipelines.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-lg bg-rose-500/20 flex items-center justify-center text-xs">5</span>
                What mistakes occur?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Failing to commit frequently, committing build artifacts (`node_modules`), writing vague messages like "fixed bug", and treating cloud drives like true VCS.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs">6</span>
                How do I practice?
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Initialize clean practice repositories on Git Bash, modify code deliberately, inspect `git status` after every step, and execute reproducible terminal drills.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 4. Semantic Visual SVG Diagram ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
              <span>📊</span> Visual Architecture: The Two Approaches
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSimulatedScenario("manual")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  simulatedScenario === "manual"
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-950"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Manual Zip Chaos
              </button>
              <button
                onClick={() => setSimulatedScenario("git")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  simulatedScenario === "git"
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                Git Snapshot Timeline
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
            {simulatedScenario === "manual" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold">
                  <AlertTriangle size={18} />
                  <span>The Manual Backup Nightmare (Zip File Duplication & Silent Overwriting)</span>
                </div>
                <svg
                  viewBox="0 0 800 240"
                  className="w-full h-auto bg-slate-900/80 rounded-xl border border-slate-800 p-2"
                >
                  <defs>
                    <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#881337" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Manual Folder Nodes */}
                  <g>
                    <rect x="40" y="30" width="160" height="60" rx="10" fill="url(#roseGrad)" stroke="#fb7185" strokeWidth="1.5" />
                    <text x="120" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">project_v1.zip</text>
                    <text x="120" y="75" fill="#fecdd3" fontSize="10" textAnchor="middle">Sachin: 10:00 AM</text>

                    {/* Arrow 1 */}
                    <path d="M 200 60 L 260 60" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />

                    <rect x="260" y="30" width="180" height="60" rx="10" fill="url(#roseGrad)" stroke="#fb7185" strokeWidth="1.5" />
                    <text x="350" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">project_final.zip</text>
                    <text x="350" y="75" fill="#fecdd3" fontSize="10" textAnchor="middle">Mahima: 11:30 AM</text>

                    {/* Arrow 2 */}
                    <path d="M 440 60 L 500 60" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />

                    <rect x="500" y="30" width="240" height="60" rx="10" fill="url(#roseGrad)" stroke="#f43f5e" strokeWidth="2" />
                    <text x="620" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">project_FINAL_v2_really.zip</text>
                    <text x="620" y="75" fill="#fda4af" fontSize="10" textAnchor="middle">Overwrote Mahima's work!</text>
                  </g>

                  {/* Catastrophe Indicator */}
                  <g transform="translate(0, 120)">
                    <rect x="40" y="10" width="700" height="70" rx="12" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                    <text x="60" y="38" fill="#fca5a5" fontSize="13" fontWeight="bold">
                      ⚠️ PRODUCTION INCIDENT: Port Conflict &amp; Code Loss
                    </text>
                    <text x="60" y="60" fill="#fecaca" fontSize="11">
                      No audit trail • No diff available • Unable to identify who altered `server.js` • ₹45,000 deployment downtime
                    </text>
                  </g>
                </svg>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 size={18} />
                  <span>The Git Directed Acyclic Graph (Immutable Commit Timeline with SHA Hashes)</span>
                </div>
                <svg
                  viewBox="0 0 800 240"
                  className="w-full h-auto bg-slate-900/80 rounded-xl border border-slate-800 p-2"
                >
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Main Trunk Commit Line */}
                  <line x1="80" y1="120" x2="680" y2="120" stroke="#334155" strokeWidth="4" />

                  {/* Commit C1 */}
                  <g>
                    <circle cx="120" cy="120" r="28" fill="url(#skyGrad)" stroke="#38bdf8" strokeWidth="2">
                      <animate attributeName="r" values="28;30;28" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <text x="120" y="116" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">C1</text>
                    <text x="120" y="130" fill="#bae6fd" fontSize="9" textAnchor="middle font-mono">e3f89a1</text>
                    <text x="120" y="170" fill="#94a3b8" fontSize="10" textAnchor="middle">init repo</text>
                  </g>

                  {/* Commit C2 */}
                  <g>
                    <line x1="148" y1="120" x2="272" y2="120" stroke="#38bdf8" strokeWidth="3" />
                    <circle cx="300" cy="120" r="28" fill="url(#skyGrad)" stroke="#38bdf8" strokeWidth="2" />
                    <text x="300" y="116" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">C2</text>
                    <text x="300" y="130" fill="#bae6fd" fontSize="9" textAnchor="middle font-mono">9b4a2c0</text>
                    <text x="300" y="170" fill="#94a3b8" fontSize="10" textAnchor="middle">auth module</text>
                  </g>

                  {/* Commit C3 (Feature Branch) */}
                  <g>
                    <path d="M 320 100 Q 400 40 480 50" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 3" />
                    <circle cx="480" cy="50" r="24" fill="url(#emeraldGrad)" stroke="#34d399" strokeWidth="2">
                      <animate attributeName="r" values="24;26;24" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="480" y="47" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">C3</text>
                    <text x="480" y="60" fill="#a7f3d0" fontSize="8" textAnchor="middle font-mono">d17c4f8</text>
                    <text x="480" y="20" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">feature: tax calc</text>
                  </g>

                  {/* Commit C4 (Main trunk) */}
                  <g>
                    <line x1="328" y1="120" x2="452" y2="120" stroke="#38bdf8" strokeWidth="3" />
                    <circle cx="480" cy="120" r="28" fill="url(#skyGrad)" stroke="#38bdf8" strokeWidth="2" />
                    <text x="480" y="116" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">C4</text>
                    <text x="480" y="130" fill="#bae6fd" fontSize="9" textAnchor="middle font-mono">7a89e12</text>
                    <text x="480" y="170" fill="#94a3b8" fontSize="10" textAnchor="middle">port 8080</text>
                  </g>

                  {/* Commit C5 (Merge Commit) */}
                  <g>
                    <path d="M 504 50 Q 580 60 640 105" fill="none" stroke="#10b981" strokeWidth="2.5" />
                    <line x1="508" y1="120" x2="632" y2="120" stroke="#38bdf8" strokeWidth="3" />
                    <circle cx="660" cy="120" r="30" fill="url(#emeraldGrad)" stroke="#6ee7b7" strokeWidth="2.5" />
                    <text x="660" y="116" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">C5</text>
                    <text x="660" y="130" fill="#a7f3d0" fontSize="9" textAnchor="middle font-mono">ff45a19</text>
                    <text x="660" y="170" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">main (HEAD)</text>
                  </g>

                  {/* Branch Pointer Pill */}
                  <g transform="translate(620, 195)">
                    <rect x="0" y="0" width="80" height="24" rx="12" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="40" y="16" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">HEAD → main</text>
                  </g>
                </svg>
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. Deep Technical Breakdown & State Table ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The 4 Pillars of Version Control Architecture
              </h2>
              <p className="text-xs text-slate-400">
                How distributed VCS guarantees high velocity and data integrity
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-400 text-sm flex items-center gap-2">
                <ShieldCheck size={16} />
                1. Immutable Cryptographic Snapshots
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In Git, files are not saved as loose text files; they are hashed into cryptographic 160-bit SHA-1 (or SHA-256) IDs. If a single comma in your source code changes, its hash changes completely, making silent tampering or corruption physically impossible.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <History size={16} />
                2. Complete Historical Auditability (5 W's)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every commit permanently logs the <strong>Author</strong> (Who), the <strong>Timestamp</strong> (When), the <strong>Parent commit</strong> (Where in the DAG), the <strong>Line diff</strong> (What), and the <strong>Commit message</strong> (Why).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-400 text-sm flex items-center gap-2">
                <GitBranch size={16} />
                3. Zero-Risk Non-Linear Branching
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branching in Git is instantaneous because a branch is simply a 41-byte pointer to a commit hash. Developers in Barrackpore or Kolkata can test experimental features on isolated branches without ever risking the stable `main` production branch.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Users size={16} />
                4. Automated Reconciliation & 3-Way Merging
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When Sachin and Mahima edit separate functions in the same file, Git uses a common ancestor commit to perform an automated 3-way merge. If they edit the exact same line, Git halts safely and requires manual confirmation, preventing data obliteration.
              </p>
            </div>
          </div>

          {/* Comparison Table Requirement */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl mt-6">
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 font-bold text-sm text-white flex items-center gap-2">
              <span>⚖️</span> Architecture Comparison: Manual Backups vs Cloud Drives vs Git VCS
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-300 border-b border-slate-800">
                    <th className="p-3.5 font-semibold">Capability</th>
                    <th className="p-3.5 font-semibold text-rose-400">Manual Zip Folders</th>
                    <th className="p-3.5 font-semibold text-amber-400">Google Drive / Dropbox</th>
                    <th className="p-3.5 font-semibold text-emerald-400">Git Distributed VCS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3.5 font-medium text-white">Line-by-Line Diff</td>
                    <td className="p-3.5 text-rose-400 font-mono">❌ None</td>
                    <td className="p-3.5 text-rose-400 font-mono">❌ None (whole file only)</td>
                    <td className="p-3.5 text-emerald-400 font-mono">✅ Exact (`git diff`)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3.5 font-medium text-white">Concurrent Editing</td>
                    <td className="p-3.5 text-rose-400">Silent overwrites</td>
                    <td className="p-3.5 text-amber-400">Creates "conflicted copy" files</td>
                    <td className="p-3.5 text-emerald-400">Automated 3-way merge reconciliation</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3.5 font-medium text-white">Branch Isolation</td>
                    <td className="p-3.5 text-rose-400">Requires duplicating gigabytes</td>
                    <td className="p-3.5 text-rose-400">Not supported</td>
                    <td className="p-3.5 text-emerald-400">Instant (41-byte pointer)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3.5 font-medium text-white">Offline Capabilities</td>
                    <td className="p-3.5 text-rose-400">High risk of out-of-sync files</td>
                    <td className="p-3.5 text-amber-400">Partial sync queue</td>
                    <td className="p-3.5 text-emerald-400">100% full local commit &amp; branch DAG</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3.5 font-medium text-white">Cryptographic Integrity</td>
                    <td className="p-3.5 text-rose-400">None</td>
                    <td className="p-3.5 text-rose-400">None</td>
                    <td className="p-3.5 text-emerald-400">SHA-1 / SHA-256 DAG Merkle Tree</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── 6. CLI Terminal Demonstration Panel ────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
              <Terminal size={22} /> Live Terminal Demonstration &amp; Workflow
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Git Bash (Primary) · Windows / macOS / Linux
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs sm:text-sm">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-medium">terminal@coder-accotax: ~/project-vcs-demo</span>
              </div>
              <span className="text-[11px] text-slate-500">git version 2.45+</span>
            </div>

            {/* Terminal Command Execution Body */}
            <div className="p-4 sm:p-5 space-y-4 overflow-x-auto text-slate-300 leading-relaxed">
              <div>
                <div className="text-slate-500 font-sans italic text-xs mb-1">
                  # 1. Initialize a brand-new Git repository in our project folder:
                </div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200 font-bold">git init</span>
                <div className="text-sky-300 pl-4 mt-1">
                  Initialized empty Git repository in E:/projects/project-vcs-demo/.git/
                </div>
              </div>

              <div>
                <div className="text-slate-500 font-sans italic text-xs mb-1">
                  # 2. Check the initial status of the working tree:
                </div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200 font-bold">git status</span>
                <div className="text-slate-400 pl-4 mt-1 space-y-1">
                  <p>On branch main</p>
                  <p>No commits yet</p>
                  <p>Untracked files:</p>
                  <p className="text-rose-400 pl-2">  server.js</p>
                  <p className="text-slate-500 text-[11px]">(use "git add &lt;file&gt;..." to include in what will be committed)</p>
                </div>
              </div>

              <div>
                <div className="text-slate-500 font-sans italic text-xs mb-1">
                  # 3. Stage the file into the index and record an immutable atomic commit:
                </div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200 font-bold">git add server.js</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200 font-bold">git commit -m "feat(server): initialize Express listener on port 5000"</span>
                <div className="text-slate-400 pl-4 mt-1 space-y-1">
                  <p className="text-sky-300">[main (root-commit) 4a7f29b] feat(server): initialize Express listener on port 5000</p>
                  <p> 1 file changed, 14 insertions(+)</p>
                  <p> create mode 100644 server.js</p>
                </div>
              </div>

              <div>
                <div className="text-slate-500 font-sans italic text-xs mb-1">
                  # 4. View the cryptographic history log:
                </div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200 font-bold">git log --oneline</span>
                <div className="text-emerald-400 pl-4 mt-1 font-bold">
                  4a7f29b <span className="text-slate-300 font-normal">(HEAD -&gt; main) feat(server): initialize Express listener on port 5000</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Common Pitfalls & Mandatory Misconception Handling ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Critical Pitfalls &amp; Misconception Handling
              </h2>
              <p className="text-xs text-slate-400">
                Avoid the most common beginner traps before they cause data loss
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Misconception 1 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold text-sm flex items-center gap-2">
                <span>❌ Misconception:</span> &ldquo;Google Drive or Dropbox is sufficient for code backups.&rdquo;
              </div>
              <div className="text-emerald-400 font-semibold text-xs flex items-center gap-2">
                <span>✅ Correct Understanding:</span> Cloud drives sync whole files without line-by-line diffing, causing accidental overwrites and corrupted conflict files during simultaneous editing.
              </div>
              <div className="text-slate-400 text-xs flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-amber-400 font-bold">💡 Why people get confused:</span> Both cloud drives and Git protect against laptop hard drive failures, so beginners assume cloud drives provide versioning. They overlook that Git tracks line-level logic and branch isolation.
              </div>
            </div>

            {/* Misconception 2 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold text-sm flex items-center gap-2">
                <span>❌ Misconception:</span> &ldquo;Git and GitHub are the exact same thing.&rdquo;
              </div>
              <div className="text-emerald-400 font-semibold text-xs flex items-center gap-2">
                <span>✅ Correct Understanding:</span> Git is the local open-source command-line tool. GitHub is a cloud hosting service that hosts Git repositories on the internet.
              </div>
              <div className="text-slate-400 text-xs flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-amber-400 font-bold">💡 Why people get confused:</span> Beginners often install Git and register on GitHub on the same day, assuming the web interface is what creates the version control engine.
              </div>
            </div>

            {/* Misconception 3 */}
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold text-sm flex items-center gap-2">
                <span>❌ Misconception:</span> &ldquo;Deleting a leaked API key in a new commit removes it from Git.&rdquo;
              </div>
              <div className="text-emerald-400 font-semibold text-xs flex items-center gap-2">
                <span>✅ Correct Understanding:</span> Git history is immutable. The secret remains permanently readable in the previous commit unless history is rewritten or the key is revoked.
              </div>
              <div className="text-slate-400 text-xs flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-amber-400 font-bold">💡 Why people get confused:</span> In standard text editors, pressing backspace deletes the text. In Git, past snapshots are permanent photos that never change.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. Defensive Best Practices & Hint Section ─────────────── */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-sky-800/40 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <Lightbulb size={18} />
            <span>Think About This (Pro Developer Habit):</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Whenever you begin work on a new feature, ask yourself: <em>&ldquo;If my laptop battery died right now, what is the exact last working checkpoint I could reload?&rdquo;</em>
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Commit early, commit often, and keep each commit focused on one single, logical objective. Small, atomic commits make code reviews enjoyable and rollbacks trivial.
          </p>
        </section>

        {/* ─── 9. Practice Challenge ──────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                🎯
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Hands-on Practice Challenge</h2>
                <p className="text-xs text-slate-400">Test your mastery with an executable terminal drill</p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Lab Exercise 0.1
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm space-y-3 text-slate-300">
            <h3 className="font-bold text-white text-sm">Challenge Scenario:</h3>
            <p>
              You are hired as a junior developer for a software firm in Barrackpore. You are tasked with creating a project folder named <code>billing-portal</code>, creating an initial configuration file <code>config.json</code> with <code>{"{ \"taxRate\": 0.18 }"}</code>, initializing Git, and making your very first commit.
            </p>
            <div className="space-y-1 font-mono text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <p className="text-sky-300">Target Requirements:</p>
              <p>1. Initialize Git in <code>billing-portal/</code></p>
              <p>2. Verify status with <code>git status</code></p>
              <p>3. Stage and commit with message: <code>"feat: initialize GST tax config at 18%"</code></p>
              <p>4. Verify the commit appears in <code>git log --oneline</code></p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition"
            >
              {showSolution ? "Hide Teacher Solution" : "Reveal Teacher Solution"}
            </button>
            <span className="text-xs text-slate-400">Always test in Git Bash or Terminal</span>
          </div>

          {showSolution && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 font-mono text-xs text-emerald-300 animate-in fade-in duration-300">
              <div className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Teacher's Verified Command Sequence:
              </div>
              <pre className="p-3 bg-slate-900 rounded-lg overflow-x-auto text-slate-200 border border-slate-800 leading-relaxed">
{`mkdir billing-portal
cd billing-portal
git init
echo '{"taxRate": 0.18}' > config.json
git status -s
git add config.json
git commit -m "feat: initialize GST tax config at 18%"
git log --oneline`}
              </pre>
              <p className="text-slate-400 text-[11px] font-sans">
                💡 Expected Output: `[main (root-commit) xxxxxx] feat: initialize GST tax config at 18%`
              </p>
            </div>
          )}
        </section>

        {/* ─── 10. FAQ Section (<FAQTemplate>) ────────────────────────── */}
        <FAQTemplate
          title="Version Control Foundations & Architecture FAQs"
          questions={questions}
        />

        {/* ─── 11. Plain Text Printable Note (<PlainTextPrint>) ────────── */}
        <PlainTextPrint
          content={noteText}
          filename="git_topic0_version_control_foundations.txt"
          title="Version Control Foundations Printable Study Note"
        />

        {/* ─── 12. Teacher's Note (<Teacher>) ──────────────────────────── */}
        <Teacher
          note="Principle: Code without Version Control is an impending liability, not an engineering asset. Warning: Never treat cloud sync drives or zip copies as a backup strategy! Habit: Always initialize Git (`git init`) before typing your first line of code. Motivation: Once you master the Git commit DAG, you will code fearlessly without ever dreading a broken build! — Sukanta Hui, Coder & AccoTax, Barrackpore"
        />

        {/* ─── 13. Next & Previous Topic Navigation ────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          {hasPrev ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Previous Topic</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Ready for Topic {currentIndex + 2}: Evolution of VCS</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-sm hover:bg-emerald-900 transition"
            >
              <span>Complete Module Overview</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </nav>

      </div>
    </div>
  );
}
