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
  Bookmark
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
 * Topic 0: What is a Branch in Git? Demystifying branches as lightweight 41-byte text pointers containing SHA-1 commit hashes
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [selectedBranch, setSelectedBranch] = useState("main");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/001_004_safely-undoing-changes-and-basic-recovery/14`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const branchRefs = {
    main: {
      name: "main",
      path: ".git/refs/heads/main",
      sha: "7a8b9c0d1e2f3456789abcdef0123456789abcde",
      size: "41 bytes (40 hex chars + \\n)",
      target: "Commit C2 (feat: stable billing module v1.0)",
      badge: "Default Production Ref",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
    },
    featureGst: {
      name: "feature-gst-calc",
      path: ".git/refs/heads/feature-gst-calc",
      sha: "3f4a5b6c7d8e9f0123456789abcdef0123456789",
      size: "41 bytes (40 hex chars + \\n)",
      target: "Commit F1 (feat: implement 18% standard GST helper)",
      badge: "Feature Pointer",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800"
    },
    hotfix: {
      name: "hotfix-login-null",
      path: ".git/refs/heads/hotfix-login-null",
      sha: "7a8b9c0d1e2f3456789abcdef0123456789abcde",
      size: "41 bytes (Points to same commit C2)",
      target: "Commit C2 (Shared pointer before new hotfix commit)",
      badge: "Zero-Cost Branch",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800"
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
                <GitBranch className="w-4 h-4" />
                <span>Segment 2 &bull; Module 002_001 &bull; Topic 0 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                What is a Branch in Git? The 41-Byte Text Pointer
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Demystifying branches as lightweight movable text files containing 40-character SHA-1 hashes inside <code className="text-cyan-300 font-mono">.git/refs/heads/</code>.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <Bookmark className="w-3.5 h-3.5" /> 41-Byte Pointer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero-Cost Branching
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
                Explain Like I&apos;m 10: The Bookmark on the Bookshelf
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Why creating a branch in Git is like sticking a tiny colored Post-It note onto a book page.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Bookmark className="w-4 h-4" /> Real-Life Analogy: The Sticky Note Bookmark
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine you and your friend in <strong>Barrackpore</strong> are reading the same heavy 1,000-page encyclopedia.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In old version control systems (like SVN), creating a branch meant photocoping all 1,000 pages and placing them in a whole new binder!
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In <strong>Git</strong>, creating a branch simply means placing a tiny colored <strong>Sticky Note (a 41-byte text file)</strong> on page 42. It weighs nothing, takes 1 millisecond to attach, and copies zero pages!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Dialogue at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Sachin:</strong> &quot;Sir, when I run <code className="text-cyan-300">git branch feature-login</code>, does Git duplicate my 500MB project folder?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Not a single byte of your source code is duplicated, Sachin! Git literally creates a 41-byte text file inside <code className="text-cyan-300 font-mono">.git/refs/heads/feature-login</code> containing the 40-character commit SHA hash. That is why branching in Git is 100% instantaneous!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION & POINTER ANATOMY ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Anatomy of a Git Branch Pointer on Disk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-slate-900 border border-cyan-800/50 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <FileCode className="w-4 h-4" /> 1. Physical Location
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Branch references live directly inside <code className="text-cyan-300 font-mono">.git/refs/heads/</code>. Every branch is an individual text file.
              </p>
              <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-slate-800">
                .git/refs/heads/&lt;branch-name&gt;
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-emerald-800/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Bookmark className="w-4 h-4" /> 2. Exact File Content
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The file contains exactly 40 hexadecimal characters (the SHA-1 hash of the tip commit) followed by a newline byte (<code className="text-emerald-300 font-mono">\n</code>).
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800">
                40 chars + 1 byte = 41 bytes
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-purple-800/50 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Zap className="w-4 h-4" /> 3. Automatic Advancement
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you make a new commit while on that branch, Git writes the new commit object and overwrites this 41-byte text file with the new SHA.
              </p>
              <div className="text-[11px] font-mono text-purple-300 bg-slate-950 p-2 rounded border border-slate-800">
                Pointer slides forward in O(1)
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC ANIMATED SVG BRANCH POINTER DIAGRAM ──────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual DAG: Multiple Branch Pointers Over Immutable Commits
                </h2>
                <p className="text-xs text-slate-400">
                  Observe how <code className="text-emerald-400">main</code> and <code className="text-cyan-400">feature-gst</code> point to commit nodes without duplicating files.
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
                <linearGradient id="gradCommit" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="gradFeat" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <marker
                  id="arr-ptr"
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
                  id="arr-down"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="6"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 1 0 L 5 10 L 9 0 z" fill="#10b981" />
                </marker>
                <marker
                  id="arr-down-cyan"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="6"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 1 0 L 5 10 L 9 0 z" fill="#06b6d4" />
                </marker>
              </defs>

              {/* Commit C0 */}
              <circle cx="120" cy="150" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <text x="120" y="146" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">C0</text>
              <text x="120" y="164" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">9a1c22</text>

              {/* Line C0 -> C1 */}
              <line x1="148" y1="150" x2="272" y2="150" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr-ptr)" />

              {/* Commit C1 */}
              <circle cx="300" cy="150" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              <text x="300" y="146" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">C1</text>
              <text x="300" y="164" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">4b8e10</text>

              {/* Line C1 -> C2 (Main branch path) */}
              <line x1="328" y1="150" x2="472" y2="150" stroke="#475569" strokeWidth="2.5" markerEnd="url(#arr-ptr)" />

              {/* Commit C2 (Tip of main) */}
              <circle cx="500" cy="150" r="30" fill="url(#gradCommit)" stroke="#38bdf8" strokeWidth="3" />
              <text x="500" y="146" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">C2</text>
              <text x="500" y="164" textAnchor="middle" fill="#cffafe" fontSize="10" fontFamily="monospace">7a8b9c</text>

              {/* Branch pointer: main (.git/refs/heads/main) */}
              <rect x="425" y="45" width="150" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="500" y="68" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">refs/heads/main</text>
              <line x1="500" y1="81" x2="500" y2="114" stroke="#10b981" strokeWidth="2" markerEnd="url(#arr-down)" />

              {/* Feature branch path: C1 -> F1 */}
              <path d="M 328 165 C 380 230, 420 230, 472 230" fill="none" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#arr-ptr)" />
              <circle cx="500" cy="230" r="28" fill="url(#gradFeat)" stroke="#67e8f9" strokeWidth="2.5" />
              <text x="500" y="226" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">F1</text>
              <text x="500" y="244" textAnchor="middle" fill="#cffafe" fontSize="10" fontFamily="monospace">3f4a5b</text>

              {/* Branch pointer: feature-gst */}
              <rect x="610" y="212" width="160" height="36" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="690" y="235" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">refs/heads/feature-gst</text>
              <line x1="610" y1="230" x2="535" y2="230" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arr-ptr)" />
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: INTERACTIVE BRANCH REF INSPECTOR ─────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Branch Ref File Inspector
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {Object.entries(branchRefs).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedBranch(key)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  selectedBranch === key
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-950"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white font-mono">
                {branchRefs[selectedBranch].path}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${branchRefs[selectedBranch].badgeColor}`}>
                {branchRefs[selectedBranch].badge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-cyan-400">File Contents (SHA-1 Hash):</span>
                <p className="text-xs text-slate-300 font-mono break-all">{branchRefs[selectedBranch].sha}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-emerald-400">Filesystem Footprint:</span>
                <p className="text-xs text-slate-300 font-mono">{branchRefs[selectedBranch].size}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Points To:</span>
              <span>{branchRefs[selectedBranch].target}</span>
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
              Common Branching Misconceptions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> &quot;Branches copy files&quot;
              </div>
              <p className="text-xs text-slate-300">
                Believing that creating a branch copies the entire project directory.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Truth
              </div>
              <p className="text-xs text-slate-400">
                Git only writes a 41-byte hash pointer to <code className="text-cyan-300 font-mono">.git/refs/heads/</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> &quot;Deleting a branch deletes code&quot;
              </div>
              <p className="text-xs text-slate-300">
                Fearing that deleting a branch erases the commit objects.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Truth
              </div>
              <p className="text-xs text-slate-400">
                Only the 41-byte text pointer is removed; commits stay in the database!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> &quot;Branches consume heavy RAM&quot;
              </div>
              <p className="text-xs text-slate-300">
                Hesitating to create branches for small experimental tasks.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Truth
              </div>
              <p className="text-xs text-slate-400">
                Creating branches is zero-cost. Create as many as needed!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Terminal Discovery Drill: Inspecting .git/refs/heads/
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Open your terminal and run: <code className="text-cyan-300 font-mono">cat .git/refs/heads/main</code>. Notice that it prints a single 40-character hexadecimal SHA-1 string! Create a new branch with <code className="text-cyan-300 font-mono">git branch test-ptr</code>, then run <code className="text-amber-300 font-mono">cat .git/refs/heads/test-ptr</code>. They contain the exact same hash!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Git Branch Pointers & Fundamentals FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Git Branch Pointer Architecture Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Revision Note"
          downloadFileName="git_branch_pointer_fundamentals_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Core Architectural Insight: Never be afraid to branch in Git. A branch is not a heavy copy of your codebase; it is literally a 41-byte sticky note pointing to a commit in the DAG. Branch frequently, isolate features fearlessly, and merge cleanly! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Module 001_004 Final Assessment</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 1: Git Branching vs Other VCS</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
