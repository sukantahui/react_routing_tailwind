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
  Check
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
 * Topic 0: The Decision Matrix for Undoing Changes in Git
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [selectedState, setSelectedState] = useState("unstaged");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/001_003_viewing-history-and-inspecting-repository-state/15`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const matrixStates = {
    unstaged: {
      title: "Level 1: Unstaged Working Tree Changes",
      subtitle: "Files modified on disk, not yet added to Staging Area",
      command: "git restore <file>",
      altCommand: "git restore . (all files)",
      safety: "DESTRUCTIVE TO UNCOMMITTED DISK EDITS",
      safetyColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Discards working tree modifications and resets the file to match the current Staging Area (or HEAD if nothing is staged).",
      example: "git restore src/services/invoiceService.js",
      statusOutput: " M src/services/invoiceService.js (Red text in git status -s)"
    },
    staged: {
      title: "Level 2: Staged Changes in Index",
      subtitle: "Files added via 'git add', waiting for commit",
      command: "git restore --staged <file>",
      altCommand: "git restore -S <file>",
      safety: "100% NON-DESTRUCTIVE TO DISK EDITS",
      safetyColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "Copies the file state from HEAD into the Index. The file is un-staged while your code edits remain safe on disk.",
      example: "git restore --staged src/config/database.js",
      statusOutput: "M  src/config/database.js (Green text -> turns Red unstaged)"
    },
    localCommit: {
      title: "Level 3: Private Local Commit",
      subtitle: "Committed locally, not yet pushed to GitHub",
      command: "git commit --amend  OR  git reset --soft HEAD~1",
      altCommand: "git reset --mixed HEAD~1 (default)",
      safety: "SAFE LOCALLY (Recoverable via Reflog)",
      safetyColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "Allows modifying commit messages, adding forgotten files, or rewinding HEAD while keeping your changes staged or in working directory.",
      example: "git reset --soft HEAD~1\n# Make tweaks then recommit",
      statusOutput: "Your branch is ahead of 'origin/main' by 1 commit."
    },
    pushedCommit: {
      title: "Level 4: Pushed Public Commit",
      subtitle: "Shared on GitHub, pulled by other developers",
      command: "git revert <commit-sha>",
      altCommand: "git revert -n <commit-sha>",
      safety: "100% SAFE FOR COLLABORATIVE REPOSITORIES",
      safetyColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "Creates a brand new commit that applies the exact inverse diff of the target commit. Never rewrites existing history.",
      example: "git revert a8f9c12 -m \"revert: rollback broken GST calculator\"",
      statusOutput: "[main 9c2b4f1] Revert \"feat: broken GST calculator\""
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
                <span>Git Module 001_004 &bull; Topic 0 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Decision Matrix for Undoing Changes in Git
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Module</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-950 transition"
              >
                <span>Topic 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Layers className="w-3 h-3 text-cyan-400" /> Three-Tree Architecture
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Disaster Prevention
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-amber-400" /> 12 Mins Study
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
                In Simple Words (The Everyday Analogy)
              </h2>
              <p className="text-xs text-slate-400">
                Understand the 4 undo boundaries before touching technical terminal commands
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                The 4-Stage Restaurant Kitchen Analogy:
              </h3>
              <p className="text-slate-300">
                Imagine you are preparing a dish at a famous restaurant in Barrackpore:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong className="text-amber-200">Cutting Board (Working Tree):</strong> Chopping raw vegetables. If you mess up, you brush them into the trash (<code className="text-cyan-300 font-mono">git restore</code>).</li>
                <li><strong className="text-amber-200">Plating Tray (Staging Area):</strong> Arranging dishes to serve. If an extra plate is there, you slide it back to the counter without tossing it (<code className="text-cyan-300 font-mono">git restore --staged</code>).</li>
                <li><strong className="text-amber-200">Kitchen Window (Local Commit):</strong> Ready for the waiter. You can still swap the garnish or fix the order tag (<code className="text-cyan-300 font-mono">git commit --amend</code>).</li>
                <li><strong className="text-amber-200">Customer Table (Pushed Public Commit):</strong> The dish has been served. You cannot snatch it off their plate; you bring a complimentary replacement dish (<code className="text-cyan-300 font-mono">git revert</code>).</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Sukanta Sir&apos;s Golden Rule:
              </h3>
              <p className="text-slate-300">
                When teaching Sachin, Mahima, and Susmita, Sukanta Sir emphasizes:
                <em> &quot;Never run an undo command until you know exactly which of the 4 rooms your mistake is sitting in!&quot;</em>
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-200/90 font-mono">
                &ldquo;Diagnosis first, execution second: git status is your diagnostic stethoscope!&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION ────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Why a Decision Matrix is Essential
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Git provides multiple undo commands—<code className="text-cyan-300 font-mono">restore</code>, <code className="text-cyan-300 font-mono">reset</code>, <code className="text-cyan-300 font-mono">revert</code>, <code className="text-cyan-300 font-mono">checkout</code>, <code className="text-cyan-300 font-mono">clean</code>, and <code className="text-cyan-300 font-mono">--amend</code>. Beginners often panic and run <code className="text-rose-400 font-mono">git reset --hard</code>, destroying uncommitted work. The Decision Matrix maps each state in the Three-Tree Architecture to its precise, safe, non-destructive remedy.
          </p>

          {/* Interactive State Selector Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {Object.keys(matrixStates).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedState(key)}
                className={`p-3 rounded-xl border text-left transition text-xs font-medium ${
                  selectedState === key
                    ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1">
                  {key.toUpperCase()}
                </div>
                <div>{matrixStates[key].title.split(":")[0]}</div>
              </button>
            ))}
          </div>

          {/* Selected State Detail Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 mt-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                {matrixStates[selectedState].title}
              </h3>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-mono font-bold ${matrixStates[selectedState].safetyColor}`}>
                {matrixStates[selectedState].safety}
              </span>
            </div>
            <p className="text-xs text-slate-400">{matrixStates[selectedState].subtitle}</p>
            <p className="text-sm text-slate-200">{matrixStates[selectedState].description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Recommended Command</span>
                <span className="text-cyan-300 font-bold">{matrixStates[selectedState].command}</span>
                <span className="text-slate-400 block mt-1 text-[11px]">{matrixStates[selectedState].altCommand}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">Diagnostic Clue (git status)</span>
                <span className="text-amber-300">{matrixStates[selectedState].statusOutput}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC VISUAL SVG DIAGRAM ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Visualizing the 4 Undo Lifecycles in Git
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto shadow-2xl">
            <svg viewBox="0 0 900 320" className="w-full min-w-[700px] h-auto font-mono text-xs">
              <defs>
                <linearGradient id="gradWT" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="1%" stopColor="#ef4444" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="gradIdx" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="1%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="gradHead" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                  <stop offset="1%" stopColor="#38bdf8" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="gradRemote" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                  <stop offset="1%" stopColor="#a855f7" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* 4 Pillars */}
              <g>
                <rect x="20" y="30" width="190" height="240" rx="14" fill="url(#gradWT)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="115" y="60" fill="#f87171" fontWeight="bold" fontSize="13" textAnchor="middle">1. Working Tree</text>
                <text x="115" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">(Unstaged edits)</text>
                <rect x="35" y="110" width="160" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="115" y="135" fill="#fca5a5" fontSize="11" textAnchor="middle font-bold">git restore &lt;file&gt;</text>
                <text x="115" y="210" fill="#ef4444" fontSize="10" textAnchor="middle">⚠️ Discards disk edits</text>
              </g>

              <g>
                <rect x="240" y="30" width="190" height="240" rx="14" fill="url(#gradIdx)" stroke="#10b981" strokeWidth="1.5" />
                <text x="335" y="60" fill="#34d399" fontWeight="bold" fontSize="13" textAnchor="middle">2. Staging Index</text>
                <text x="335" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">(Staged with git add)</text>
                <rect x="255" y="110" width="160" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="335" y="135" fill="#6ee7b7" fontSize="11" textAnchor="middle font-bold">git restore --staged</text>
                <text x="335" y="210" fill="#10b981" fontSize="10" textAnchor="middle">✅ Keeps disk edits safe</text>
              </g>

              <g>
                <rect x="460" y="30" width="190" height="240" rx="14" fill="url(#gradHead)" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="555" y="60" fill="#38bdf8" fontWeight="bold" fontSize="13" textAnchor="middle">3. Local HEAD</text>
                <text x="555" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">(Committed, unpushed)</text>
                <rect x="475" y="110" width="160" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="555" y="135" fill="#7dd3fc" fontSize="11" textAnchor="middle font-bold">git reset / --amend</text>
                <text x="555" y="210" fill="#38bdf8" fontSize="10" textAnchor="middle">🔄 Reflog safe</text>
              </g>

              <g>
                <rect x="680" y="30" width="190" height="240" rx="14" fill="url(#gradRemote)" stroke="#a855f7" strokeWidth="1.5" />
                <text x="775" y="60" fill="#c084fc" fontWeight="bold" fontSize="13" textAnchor="middle">4. Shared Remote</text>
                <text x="775" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">(Pushed to GitHub)</text>
                <rect x="695" y="110" width="160" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="775" y="135" fill="#d8b4fe" fontSize="11" textAnchor="middle font-bold">git revert &lt;sha&gt;</text>
                <text x="775" y="210" fill="#a855f7" fontSize="10" textAnchor="middle">🛡️ Non-destructive</text>
              </g>

              {/* Connecting animated flows */}
              <path d="M 210 130 L 240 130" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 430 130 L 460 130" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M 650 130 L 680 130" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" values="0;12" dur="2s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: DEEP TECHNICAL COMPARISON TABLE ─────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Master Comparison: The Undo Command Spectrum
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Scenario</th>
                  <th className="p-3">Command</th>
                  <th className="p-3">Affects Disk?</th>
                  <th className="p-3">Rewrites DAG?</th>
                  <th className="p-3">Team Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Discard unstaged edits</td>
                  <td className="p-3 text-cyan-300">git restore &lt;file&gt;</td>
                  <td className="p-3 text-rose-400 font-bold">YES (Overwrites)</td>
                  <td className="p-3 text-slate-400">NO</td>
                  <td className="p-3 text-emerald-400">Local Only</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Unstage from Index</td>
                  <td className="p-3 text-emerald-300">git restore --staged &lt;f&gt;</td>
                  <td className="p-3 text-emerald-400">NO (Safe)</td>
                  <td className="p-3 text-slate-400">NO</td>
                  <td className="p-3 text-emerald-400">Local Only</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Amend last commit</td>
                  <td className="p-3 text-amber-300">git commit --amend</td>
                  <td className="p-3 text-emerald-400">NO</td>
                  <td className="p-3 text-amber-400">YES (New SHA)</td>
                  <td className="p-3 text-amber-400">Safe if unpushed</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Rewind unpushed HEAD</td>
                  <td className="p-3 text-sky-300">git reset --soft HEAD~1</td>
                  <td className="p-3 text-emerald-400">NO (Keeps Staged)</td>
                  <td className="p-3 text-amber-400">YES (Moves HEAD)</td>
                  <td className="p-3 text-amber-400">Safe if unpushed</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Nuclear reset</td>
                  <td className="p-3 text-rose-300">git reset --hard HEAD~1</td>
                  <td className="p-3 text-rose-400 font-bold">YES (Wipes Disk)</td>
                  <td className="p-3 text-rose-400">YES (Moves HEAD)</td>
                  <td className="p-3 text-rose-400 font-bold">DANGEROUS</td>
                </tr>
                <tr className="hover:bg-slate-850">
                  <td className="p-3 font-sans text-slate-200">Shared branch undo</td>
                  <td className="p-3 text-purple-300">git revert &lt;sha&gt;</td>
                  <td className="p-3 text-emerald-400">Applies Inverted Diff</td>
                  <td className="p-3 text-emerald-400">NO (Adds Commit)</td>
                  <td className="p-3 text-emerald-400 font-bold">100% TEAM SAFE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 6: LIVE TERMINAL DEMONSTRATION ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
              <FileCode className="w-6 h-6" /> Live Terminal Decision Matrix Drill
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Git Bash · Sandbox Workspace
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-medium">debangshu@barrackpore-lab: ~/invoice-engine</span>
              </div>
              <span className="text-[11px] text-slate-500">git v2.45+</span>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-slate-300 overflow-x-auto">
              <div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git status -s</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-rose-400"> M src/services/taxCalculation.js  <span className="text-slate-500"># Level 1: Unstaged</span></p>
                  <p className="text-emerald-400">M  src/config/appConstants.js     <span className="text-slate-500"># Level 2: Staged</span></p>
                </div>
              </div>

              <div>
                <span className="text-slate-500"># Action 1: Discard unstaged changes in taxCalculation.js</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git restore src/services/taxCalculation.js</span>
              </div>

              <div>
                <span className="text-slate-500"># Action 2: Unstage appConstants.js without losing disk edits</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git restore --staged src/config/appConstants.js</span>
              </div>

              <div>
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git status -s</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-rose-400"> M src/config/appConstants.js <span className="text-emerald-400">(Now unstaged, code safe on disk!)</span></p>
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
              Common Misconceptions &amp; Gotchas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 1
              </div>
              <p className="text-slate-300">
                <em>&quot;git restore and git reset are the same thing.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                <code className="text-cyan-300">git restore</code> operates on specific files in working tree/index. <code className="text-cyan-300">git reset</code> moves the branch HEAD pointer across commit objects.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 2
              </div>
              <p className="text-slate-300">
                <em>&quot;I can use git reflog to recover unstaged files overwritten by git restore.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Reflog only records committed HEAD movements. Uncommitted files never entered Git&apos;s database and are lost forever.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 3
              </div>
              <p className="text-slate-300">
                <em>&quot;I should force-push to main after resetting a bad commit.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Force-pushing shared branches breaks colleagues&apos; repositories. Always use <code className="text-cyan-300">git revert</code> on shared team branches.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Practice Challenge: The 30-Second Diagnosis Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In your terminal sandbox, create a repo, modify a file without staging, stage another file, and make a local commit. Run <code className="text-cyan-300 font-mono">git status -s</code> and identify the exact command required to undo each one without checking notes.
          </p>
        </section>

        {/* ─── SECTION 9: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Git Decision Matrix & Safe Undo FAQ"
          questions={questions}
        />

        {/* ─── SECTION 10: PLAIN TEXT PRINTABLE NOTE ───────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Git Decision Matrix Printable Revision Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Revision Note"
          downloadFileName="git_undo_decision_matrix_note.txt"
        />

        {/* ─── SECTION 11: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Principle: Git is an immutable append-only ledger that rarely loses committed data. Warning: Never run git reset --hard with unstaged work! Habit: Always run git status -s before and after any undo operation. Motivation: Once you master the Decision Matrix, you will experiment boldly with zero fear of breaking code! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 12: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev Module (001_003)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 1: Discarding Unstaged Changes</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
