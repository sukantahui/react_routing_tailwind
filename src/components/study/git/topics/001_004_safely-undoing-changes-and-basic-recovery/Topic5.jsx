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
  GitCommit,
  GitBranch,
  Split
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic 5: Demystifying git reset: How reset moves the HEAD pointer and adjusts Index and Working Tree
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [selectedPhase, setSelectedPhase] = useState(1);

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const phaseData = [
    {
      phase: 1,
      name: "Phase 1: Move HEAD Ref",
      flag: "--soft",
      color: "border-cyan-500 bg-cyan-950/30 text-cyan-400",
      description: "Git adjusts the active branch reference file (.git/refs/heads/main) to point to the target commit SHA. The Staging Index and Working Tree are untouched.",
      statusIndex: "Untouched (changes remain staged in green)",
      statusWorkTree: "Untouched (local files unchanged)"
    },
    {
      phase: 2,
      name: "Phase 2: Sync Staging Index",
      flag: "--mixed (Default)",
      color: "border-amber-500 bg-amber-950/30 text-amber-400",
      description: "In addition to moving HEAD, Git updates the Index (.git/index) to match the file snapshot of the target commit. Staged modifications are un-staged.",
      statusIndex: "Synced with target commit (changes un-staged into red)",
      statusWorkTree: "Untouched (your physical edits are preserved)"
    },
    {
      phase: 3,
      name: "Phase 3: Overwrite Working Tree",
      flag: "--hard",
      color: "border-rose-500 bg-rose-950/30 text-rose-400",
      description: "In addition to Phases 1 & 2, Git forces all files in your physical working directory to match the target commit snapshot. Uncommitted edits are wiped.",
      statusIndex: "Synced with target commit",
      statusWorkTree: "Overwritten to match target commit (uncommitted edits destroyed)"
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
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 5 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Demystifying git reset & Pointer Mechanics
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                How git reset rewinds branch references, and the three cumulative phases across HEAD, Index, and Working Tree.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <Layers className="w-3.5 h-3.5" /> Three Trees
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-800">
                <Sliders className="w-3.5 h-3.5" /> Pointer Rewind
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: SIMPLE LANGUAGE EXPLANATION (ELI10) ─────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Explain Like I&apos;m 10: The Tape Recorder & The Bookmark
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding why git reset is not a deleter, but a bookmark rewind tool.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Clock className="w-4 h-4" /> Real-Life Analogy: The Cassette Rewind Button
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine listening to a music cassette or an audiobook. When you press the <strong>Rewind button</strong>, the songs on the tape are not erased! The playback head just slides back to track 2.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Git, <strong>git reset</strong> simply moves the branch bookmark backwards. The previous commits remain safely recorded in the background.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Discussion at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Swadeep:</strong> &quot;Sir, when I run <code className="text-cyan-300">git reset HEAD~1</code>, does it erase the commit from disk?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Not at all, Swadeep! It only changes the number written inside <code className="text-cyan-300 font-mono">.git/refs/heads/main</code>. The commit object is still alive in the database and visible in <code className="text-cyan-300 font-mono">git reflog</code>!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION & THREE TREES ──────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              The Three Trees Impacted by git reset
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-slate-900 border border-cyan-800/50 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <GitCommit className="w-4 h-4" /> 1. HEAD (Commit History)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Points to the last commit snapshot on the current branch. Moving HEAD rewinds the official branch history.
              </p>
              <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 p-2 rounded border border-cyan-800">
                Phase 1: Moves HEAD (--soft)
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-amber-800/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <FileCode className="w-4 h-4" /> 2. Index (Staging Area)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The staging cache preparing the next commit. Syncing the index matches it with the target commit snapshot.
              </p>
              <div className="text-[11px] font-mono text-amber-300 bg-amber-950/50 p-2 rounded border border-amber-800">
                Phase 2: Syncs Index (--mixed)
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-rose-800/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Database className="w-4 h-4" /> 3. Working Directory
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The actual source files on your hard drive. Overwriting this forces your code to match the historical snapshot.
              </p>
              <div className="text-[11px] font-mono text-rose-300 bg-rose-950/50 p-2 rounded border border-rose-800">
                Phase 3: Overwrites Disk (--hard)
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC ANIMATED SVG POINTER REWIND DIAGRAM ──────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual Mechanics: Rewinding the Branch Pointer
                </h2>
                <p className="text-xs text-slate-400">
                  Observe how HEAD and `main` rewind from C2 to C1 when executing `git reset HEAD~1`.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 280"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              <defs>
                <linearGradient id="gradReset" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <marker
                  id="arr"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
                <marker
                  id="arr-rewind"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Commit Nodes */}
              {/* C0 */}
              <circle cx="150" cy="140" r="30" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <text x="150" y="136" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">C0</text>
              <text x="150" y="154" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">1a2b3c</text>

              {/* Arrow C0 -> C1 */}
              <line x1="180" y1="140" x2="330" y2="140" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr)" />

              {/* C1 (Target of Reset) */}
              <circle cx="360" cy="140" r="32" fill="url(#gradReset)" stroke="#38bdf8" strokeWidth="3">
                <animate attributeName="stroke-width" values="3;5;3" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="360" y="136" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">C1</text>
              <text x="360" y="154" textAnchor="middle" fill="#cffafe" fontSize="10" fontFamily="monospace">4d5e6f</text>

              {/* Arrow C1 -> C2 */}
              <line x1="392" y1="140" x2="540" y2="140" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr)" />

              {/* C2 (Orphaned / Rewound Commit) */}
              <circle cx="570" cy="140" r="30" fill="#0f172a" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
              <text x="570" y="136" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold">C2</text>
              <text x="570" y="154" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">7g8h9i</text>
              <text x="570" y="195" textAnchor="middle" fill="#64748b" fontSize="10">(In Reflog)</text>

              {/* Reset Rewind Arc */}
              <path
                d="M 570 95 C 500 40, 430 40, 370 95"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                markerEnd="url(#arr-rewind)"
              />
              <text x="470" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                git reset HEAD~1
              </text>

              {/* New HEAD pointer tag */}
              <rect x="290" y="215" width="140" height="30" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="360" y="234" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">HEAD -&gt; main (at C1)</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: INTERACTIVE 3-PHASE BREAKDOWN ────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              The Three Cumulative Phases of git reset
            </h2>
          </div>

          {/* Phase Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {phaseData.map((p) => (
              <button
                key={p.phase}
                onClick={() => setSelectedPhase(p.phase)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedPhase === p.phase
                    ? `${p.color} ring-2 ring-cyan-400/50 shadow-lg`
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">{p.name}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                    {p.flag}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {p.description}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Phase Inspection Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-400" />
              Detailed Tree Status for {phaseData[selectedPhase - 1].name} ({phaseData[selectedPhase - 1].flag})
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {phaseData[selectedPhase - 1].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-amber-400">Staging Area (Index) Status:</span>
                <p className="text-xs text-slate-300 font-mono">{phaseData[selectedPhase - 1].statusIndex}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-rose-400">Working Directory (Disk) Status:</span>
                <p className="text-xs text-slate-300 font-mono">{phaseData[selectedPhase - 1].statusWorkTree}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS ──────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Common Reset Misconceptions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> &quot;Reset deletes commits permanently&quot;
              </div>
              <p className="text-xs text-slate-300">
                False. Git keeps the commit object in <code className="text-cyan-300 font-mono">.git/objects/</code> and logs it in <code className="text-cyan-300 font-mono">git reflog</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> &quot;git reset always touches working files&quot;
              </div>
              <p className="text-xs text-slate-300">
                False. Only <code className="text-rose-300 font-mono">--hard</code> touches working files. <code className="text-cyan-300 font-mono">--soft</code> and <code className="text-amber-300 font-mono">--mixed</code> never modify your local files.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> &quot;Resetting HEAD~1 moves backwards in time forever&quot;
              </div>
              <p className="text-xs text-slate-300">
                You can reset forward in time just as easily by passing a future commit SHA from reflog!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Try This in Your Terminal: The Soft Squash Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Make 3 quick commits: <code className="text-cyan-300 font-mono">git commit -m &quot;c1&quot;</code>, <code className="text-cyan-300 font-mono">&quot;c2&quot;</code>, <code className="text-cyan-300 font-mono">&quot;c3&quot;</code>. Now run <code className="text-amber-300 font-mono">git reset --soft HEAD~3</code>. Check <code className="text-cyan-300 font-mono">git status</code>; all 3 changes are sitting neatly in the staging area ready for one clean commit!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="git reset Fundamentals & Three Trees FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git reset Mechanics Revision Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 5 Revision Note"
          downloadFileName="git_reset_mechanics_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Remember the 3-Phase Rule: Phase 1 moves HEAD (--soft). Phase 2 syncs the Index (--mixed). Phase 3 overwrites the disk (--hard). Once you understand this hierarchy, you will never be afraid of git reset again! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 4 (Rewriting Risks)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 6: The Three Modes of git reset</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
