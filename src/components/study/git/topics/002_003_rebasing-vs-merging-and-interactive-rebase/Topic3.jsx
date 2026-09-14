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
  Cpu,
  FolderTree,
  FileCode,
  HardDrive
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic 3: How Rebase Works Under the Hood: Finding merge base, saving patch deltas to temporary files, fast-forwarding target branch, and reapplying commits one by one
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [selectedPhase, setSelectedPhase] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 3;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/2`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const enginePhases = [
    {
      id: 1,
      title: "1. Merge-Base Calculation",
      engine: "git merge-base main feature",
      summary: "Identifies the lowest common ancestor (LCA) commit node between target base and current branch tip.",
      details: "Git traverses the DAG backwards from both branch pointers until it locates the common ancestor commit hash (e.g. Commit B)."
    },
    {
      id: 2,
      title: "2. Patch Delta Extraction",
      engine: "format-patch into .git/rebase-merge/",
      summary: "Computes commit diffs since the merge-base and stores them as structured patch files on disk.",
      details: "Git creates control files (head-name, onto, orig-head, git-rebase-todo) inside the hidden .git/rebase-merge/ folder."
    },
    {
      id: 3,
      title: "3. Detached HEAD Reset",
      engine: "HEAD points to <onto> (tip of main)",
      summary: "Working tree and Index are reset to the target base tip in detached HEAD state.",
      details: "HEAD moves to the tip of main (Commit F). The active branch reference remains temporarily detached."
    },
    {
      id: 4,
      title: "4. Sequential Patch Replay",
      engine: "Automated Cherry-Pick Loop",
      summary: "Each patch is applied one-by-one via 3-way merge logic, minting brand new single-parent commit objects.",
      details: "Commit C becomes C' (parent: F), and Commit D becomes D' (parent: C'). Cryptographic hashes are completely recalculated."
    },
    {
      id: 5,
      title: "5. Ref Update & Cleanup",
      engine: "Update refs/heads/feature to D'",
      summary: "Branch pointer is moved to the top replayed commit and temporary rebase control files are deleted.",
      details: "HEAD attaches back to feature. Old commits C and D become orphaned in object storage until garbage collection."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 border border-purple-700/50 text-purple-300">
                  Git Internals & Plumbing
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400" />
                How Git Rebase Works Under the Hood
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-600/50 bg-cyan-950/60 hover:bg-cyan-900/80 text-xs font-medium text-cyan-300 transition shadow-sm shadow-cyan-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: ELI10 / REAL WORLD ANALOGY ──────────────────────── */}
        <section className="rounded-2xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                ELI10 & Mechanical Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Audio Tape Recorder Splicing Machine
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine an old-school magnetic cassette recorder at a studio in <strong className="text-cyan-300">Barrackpore</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                You recorded a guitar solo on a side tape spool starting from Track 2. But the lead singer just added Tracks 3 & 4 to the master tape.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To combine them cleanly: The studio engineer measures where you started (Track 2), records your guitar solo into temporary audio buffers,
                fast-forwards the master tape to the end of Track 4, and re-records your solo straight onto the master tape after Track 4.
                The old side tape is discarded, leaving one continuous, studio-grade master recording!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: CORE INTERNAL ARCHITECTURE ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 5 Internal Engine Phases
            </h2>
          </div>

          {/* Interactive Phase Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {enginePhases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedPhase === phase.id
                    ? "bg-cyan-950/80 border-cyan-500 shadow-md shadow-cyan-950"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                  PHASE {phase.id}
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {phase.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Phase Explanation Card */}
          {(() => {
            const p = enginePhases.find((x) => x.id === selectedPhase);
            return (
              <div className="p-6 rounded-2xl border border-cyan-900/40 bg-slate-900/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-base">
                    <Cpu className="w-5 h-5" /> {p.title}
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    Engine: {p.engine}
                  </span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{p.summary}</p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <strong className="text-cyan-400">Deep-Dive Mechanics:</strong>
                  <p>{p.details}</p>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ─── SECTION 4: INSIDE .GIT/REBASE-MERGE DIRECTORY ──────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Anatomy of .git/rebase-merge/</h2>
              <p className="text-xs text-slate-400">The temporary directory created by Git to orchestrate the rebase lifecycle</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs space-y-2">
              <div className="text-amber-400 font-bold flex items-center gap-2">
                <FileCode className="w-4 h-4" /> Control Files in .git/rebase-merge/
              </div>
              <ul className="space-y-2 text-slate-300 pl-2">
                <li><span className="text-cyan-400 font-bold">onto:</span> SHA of target commit (tip of main)</li>
                <li><span className="text-cyan-400 font-bold">orig-head:</span> Original feature branch tip hash</li>
                <li><span className="text-cyan-400 font-bold">head-name:</span> Branch reference being rebased (refs/heads/feature)</li>
                <li><span className="text-cyan-400 font-bold">git-rebase-todo:</span> Ordered queue of commit instructions</li>
                <li><span className="text-cyan-400 font-bold">done:</span> History of commits already processed</li>
                <li><span className="text-cyan-400 font-bold">stopped-sha:</span> SHA of commit paused due to conflict</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-xs space-y-2.5">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Crash Resilience & Safety
              </div>
              <p className="text-slate-300 leading-relaxed">
                Because all rebase state is written to disk in <code className="text-cyan-300 bg-slate-950 px-1 rounded">.git/rebase-merge/</code>,
                Git can survive unexpected power outages, IDE crashes, or system reboots in the middle of a rebase.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Running <code className="text-cyan-300 bg-slate-950 px-1 rounded">git rebase --abort</code> reads <code className="text-amber-300">orig-head</code> and
                safely resets the repo to the exact pre-rebase state!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: SVG LOW-LEVEL ENGINE DIAGRAM ────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Commit Graph Hash Regeneration</h2>
              <p className="text-xs text-slate-400">Cryptographic DAG rewriting mechanism during rebase</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <linearGradient id="hoodMain" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="hoodReplay" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <marker id="hoodArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                <marker id="hoodArrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              <text x="30" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold">LOW-LEVEL SHA RE-COMPUTATION PIPELINE</text>

              {/* Main Commits */}
              <line x1="90" y1="120" x2="210" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#hoodArrow)" />
              <line x1="210" y1="120" x2="330" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#hoodArrow)" />
              <line x1="330" y1="120" x2="450" y2="120" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#hoodArrow)" />

              {/* Replayed Commits */}
              <line x1="450" y1="120" x2="580" y2="120" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#hoodArrowGreen)" />
              <line x1="580" y1="120" x2="710" y2="120" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#hoodArrowGreen)" />

              {/* Commit Nodes */}
              <circle cx="90" cy="120" r="16" fill="url(#hoodMain)" />
              <text x="90" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
              <text x="90" y="150" fill="#64748b" fontSize="9" textAnchor="middle">SHA: e2a91</text>

              <circle cx="210" cy="120" r="16" fill="url(#hoodMain)" />
              <text x="210" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>
              <text x="210" y="150" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Merge-Base</text>

              <circle cx="330" cy="120" r="16" fill="url(#hoodMain)" />
              <text x="330" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">E</text>

              <circle cx="450" cy="120" r="17" fill="url(#hoodMain)" stroke="#60a5fa" strokeWidth="2" />
              <text x="450" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">F</text>
              <text x="450" y="150" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">onto (tip)</text>

              {/* Replayed C' */}
              <circle cx="580" cy="120" r="18" fill="url(#hoodReplay)" stroke="#34d399" strokeWidth="2" />
              <text x="580" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">C'</text>
              <text x="580" y="90" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Parent: F</text>
              <text x="580" y="150" fill="#34d399" fontSize="9" textAnchor="middle">SHA: 7f41a</text>

              {/* Replayed D' */}
              <circle cx="710" cy="120" r="18" fill="url(#hoodReplay)" stroke="#34d399" strokeWidth="2" />
              <text x="710" y="124" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D'</text>
              <text x="710" y="90" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Parent: C'</text>
              <text x="710" y="150" fill="#34d399" fontSize="9" textAnchor="middle">SHA: b819c</text>

              {/* Pulse effect */}
              <circle cx="710" cy="120" r="24" fill="none" stroke="#10b981" strokeWidth="1.5">
                <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 6: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Debangshu & Swadeep Ask Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Debangshu (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, when Git creates C', does it copy all files or just the changes?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Remember our Git Object storage model! Git creates a new commit object pointing to a new tree object.
                  Unmodified files share the exact same blob SHA references in <code className="text-cyan-300">.git/objects/</code>.
                  Only the modified files get new blob objects. It is lightning fast and takes almost zero extra storage!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 3: How Rebase Works Under the Hood (Printable Notes)" />
        </section>

        {/* ─── SECTION 8: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 technical interview questions on low-level Git rebase engine internals
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Standard Rebase Workflow
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/50 bg-cyan-950 hover:bg-cyan-900 text-sm font-semibold text-cyan-200 shadow-lg shadow-cyan-950/60 transition"
            >
              Next Topic: The Golden Rule of Rebasing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
