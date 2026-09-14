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
  History,
  Terminal
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic 1: Discarding Unstaged Changes: Modern git restore <file> vs legacy git checkout -- <file>
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [selectedExample, setSelectedExample] = useState("singleFile");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 1;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const examples = {
    singleFile: {
      title: "Discarding Edits in One File",
      command: "git restore src/App.jsx",
      legacy: "git checkout -- src/App.jsx",
      scenario: "You tested an experimental styling tweak in App.jsx and decided to discard it.",
      effect: "App.jsx is reset to the state currently recorded in the Staging Area / HEAD."
    },
    allFiles: {
      title: "Discarding All Unstaged Files in Workspace",
      command: "git restore .",
      legacy: "git checkout -- .",
      scenario: "You ran a test script that dirtied 15 different files across your repo.",
      effect: "Every tracked file in the current directory and subdirectories is reset instantly."
    },
    deletedFile: {
      title: "Restoring an Accidentally Deleted Tracked File",
      command: "git restore src/assets/logo.svg",
      legacy: "git checkout -- src/assets/logo.svg",
      scenario: "You accidentally pressed Shift+Delete on logo.svg in VS Code file explorer.",
      effect: "Git pulls logo.svg back out of the Index snapshot and recreates it on disk."
    },
    sourceSnapshot: {
      title: "Restoring from an Older Commit Snapshot",
      command: "git restore --source=HEAD~2 src/config/database.js",
      legacy: "git checkout HEAD~2 -- src/config/database.js",
      scenario: "You want database.js back exactly as it was 2 commits ago without moving your branch.",
      effect: "Copies the file from commit HEAD~2 directly into your current working tree."
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
                <span>Git Module 001_004 &bull; Topic 1 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Discarding Unstaged Changes: <code className="text-cyan-300 font-mono text-lg">git restore</code> vs Legacy <code className="text-slate-400 font-mono text-lg">git checkout --</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 0</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-950 transition"
              >
                <span>Topic 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Terminal className="w-3 h-3 text-cyan-400" /> Git 2.23+ Standard
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <AlertTriangle className="w-3 h-3 text-rose-400" /> Irreversible Disk Overwrite
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-amber-400" /> 15 Mins Study
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
              Mentor: Sukanta Hui · Barrackpore
            </span>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ─── SECTION 2: DEDICATED SIMPLE LANGUAGE SECTION ────────────────── */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl font-bold">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                In Simple Words (The Drawing Board Eraser)
              </h2>
              <p className="text-xs text-slate-400">
                How git restore wipes out messy pencil drafts without touching your master blueprint
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                The Classroom Story:
              </h3>
              <p className="text-slate-300">
                In Barrackpore, Abhronila was trying out three different color schemes for an invoice header. She scribbled quick CSS changes directly into her editor. When she realized the new colors looked terrible, she didn&apos;t have to manually press Ctrl+Z a hundred times!
              </p>
              <p className="text-slate-400 text-xs">
                She simply typed <code className="text-cyan-300 font-mono">git restore style.css</code>. Git grabbed the clean, pristine copy from her last commit and instantly replaced the messy draft on her disk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                The Big Warning:
              </h3>
              <p className="text-slate-300">
                Sukanta Sir warned the class: <em>&quot;Once you rub off pencil marks with git restore, you can NEVER un-rub them. If you spent 3 hours writing code and never committed or staged it, git restore will wipe it into the void!&quot;</em>
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-rose-300 font-mono">
                &ldquo;Always git diff before git restore: Look before you leap!&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION ────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Understanding Modern <code className="text-cyan-300 font-mono">git restore</code>
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Prior to Git 2.23 (released in August 2019), <code className="text-slate-400 font-mono">git checkout</code> was notoriously overloaded. It switched branches, created branches, detached HEADs, and discarded file modifications. Modern Git introduced <code className="text-cyan-300 font-mono">git restore</code> to make file restoration safe, intuitive, and dedicated.
          </p>

          {/* Interactive Examples Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {Object.keys(examples).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                className={`p-3 rounded-xl border text-left transition text-xs font-medium ${
                  selectedExample === key
                    ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1">
                  CASE {Object.keys(examples).indexOf(key) + 1}
                </div>
                <div>{examples[key].title}</div>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 mt-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
              {examples[selectedExample].title}
            </h3>
            <p className="text-xs text-slate-400">{examples[selectedExample].scenario}</p>
            <p className="text-sm text-slate-200">{examples[selectedExample].effect}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Modern Command (Recommended)</span>
                <span className="text-cyan-300 font-bold">{examples[selectedExample].command}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Legacy Equivalent</span>
                <span className="text-slate-400">{examples[selectedExample].legacy}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC VISUAL SVG DIAGRAM ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Data Flow: How <code className="text-cyan-300 font-mono">git restore</code> Overwrites Working Tree
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto shadow-2xl">
            <svg viewBox="0 0 800 240" className="w-full min-w-[650px] h-auto font-mono text-xs">
              <defs>
                <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Staging Area Box */}
              <g>
                <rect x="50" y="40" width="260" height="150" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="180" y="70" fill="#34d399" fontWeight="bold" fontSize="13" textAnchor="middle">Staging Area (Index / HEAD)</text>
                <text x="180" y="90" fill="#64748b" fontSize="10" textAnchor="middle">Clean Known Snapshot</text>
                <rect x="75" y="110" width="210" height="45" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="180" y="138" fill="#e2e8f0" fontSize="11" textAnchor="middle">App.jsx [Pristine v1.0]</text>
              </g>

              {/* Flow Arrow */}
              <path d="M 310 132 L 480 132" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowCyan)" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" values="0;18" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="395" y="115" fill="#38bdf8" fontWeight="bold" fontSize="11" textAnchor="middle">git restore App.jsx</text>
              <text x="395" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Copies clean blob to disk</text>

              {/* Working Tree Box */}
              <g>
                <rect x="490" y="40" width="260" height="150" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="620" y="70" fill="#f87171" fontWeight="bold" fontSize="13" textAnchor="middle">Working Tree (On Disk)</text>
                <text x="620" y="90" fill="#64748b" fontSize="10" textAnchor="middle">Volatile Disk Buffer</text>
                <rect x="515" y="110" width="210" height="45" rx="6" fill="#450a0a" stroke="#991b1b" />
                <text x="620" y="132" fill="#fca5a5" fontSize="10" textAnchor="middle">App.jsx [Broken Edits]</text>
                <text x="620" y="148" fill="#ef4444" fontSize="9" textAnchor="middle font-bold">OVERWRITTEN PERMANENTLY</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: TECHNICAL SYNTAX COMPARISON ─────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Command Matrix: Modern vs Legacy Syntax
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Action</th>
                  <th className="p-3">Modern Command (Git 2.23+)</th>
                  <th className="p-3">Legacy Command</th>
                  <th className="p-3">Source Tree</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Discard file edits</td>
                  <td className="p-3 text-cyan-300 font-bold">git restore &lt;file&gt;</td>
                  <td className="p-3 text-slate-400">git checkout -- &lt;file&gt;</td>
                  <td className="p-3 text-emerald-400">Staging Area / HEAD</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Discard all edits in repo</td>
                  <td className="p-3 text-cyan-300 font-bold">git restore .</td>
                  <td className="p-3 text-slate-400">git checkout -- .</td>
                  <td className="p-3 text-emerald-400">Staging Area / HEAD</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Restore from historical commit</td>
                  <td className="p-3 text-cyan-300 font-bold">git restore --source=HEAD~2 &lt;f&gt;</td>
                  <td className="p-3 text-slate-400">git checkout HEAD~2 -- &lt;f&gt;</td>
                  <td className="p-3 text-sky-400">Commit Object HEAD~2</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Interactive hunk discard</td>
                  <td className="p-3 text-cyan-300 font-bold">git restore -p &lt;file&gt;</td>
                  <td className="p-3 text-slate-400">git checkout -p -- &lt;file&gt;</td>
                  <td className="p-3 text-amber-400">Interactive Diff Hunk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 6: LIVE TERMINAL DEMONSTRATION ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
              <FileCode className="w-6 h-6" /> Live Terminal Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Git Bash · Working Tree Drill
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-medium">abhronila@barrackpore-lab: ~/tax-portal</span>
              </div>
              <span className="text-[11px] text-slate-500">git v2.45+</span>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-slate-300 overflow-x-auto">
              <div>
                <span className="text-slate-500"># 1. Check status of modified and deleted files</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git status -s</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-rose-400"> M src/components/Header.jsx</p>
                  <p className="text-rose-400"> D public/favicon.ico</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500"># 2. Review the exact unstaged diff before discarding</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git diff src/components/Header.jsx</span>
              </div>

              <div>
                <span className="text-slate-500"># 3. Discard Header.jsx edits and recover deleted favicon.ico</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git restore src/components/Header.jsx public/favicon.ico</span>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git status</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-emerald-400">nothing to commit, working tree clean</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: COMMON PITFALLS & GOTCHAS ────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Misconceptions &amp; Defensive Habits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 1
              </div>
              <p className="text-slate-300">
                <em>&quot;git restore can recover untracked files I deleted.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Git has no knowledge of untracked files. <code className="text-cyan-300">git restore</code> only restores tracked files with existing snapshots.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 2
              </div>
              <p className="text-slate-300">
                <em>&quot;git restore unstages files by default.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Without flags, <code className="text-cyan-300">git restore</code> operates ONLY on the Working Tree. You must pass <code className="text-cyan-300 font-mono">--staged</code> to unstage from the index.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 3
              </div>
              <p className="text-slate-300">
                <em>&quot;I must keep using git checkout -- because everyone does.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Modern enterprise engineering teams standardize on <code className="text-cyan-300">git restore</code> and <code className="text-cyan-300">git switch</code> for safety and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Hands-On Challenge: Surgical Restore with Patch Mode
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Modify two different sections of a single file. Run <code className="text-cyan-300 font-mono">git restore -p filename</code> and discard only the first change while keeping the second change intact on disk. Verify with <code className="text-cyan-300 font-mono">git diff</code>!
          </p>
        </section>

        {/* ─── SECTION 9: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Discarding Changes & git restore FAQs"
          questions={questions}
        />

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE NOTE ───────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git restore Quick Revision Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Revision Note"
          downloadFileName="git_restore_revision_note.txt"
        />

        {/* ─── SECTION 11: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Principle: Modern Git separates branch switching (git switch) from file restoration (git restore). Warning: Always run 'git diff' before 'git restore .' because uncommitted edits are gone forever! Habit: Use patch mode (-p) for surgical hunk-by-hunk discards. Motivation: Clear tools build confident engineers! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 12: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev Topic (Decision Matrix)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 2: Unstaging with git restore --staged</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
