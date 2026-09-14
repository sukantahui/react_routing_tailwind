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
  Radio,
  MapPin,
  Cpu
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic 2: The Role of HEAD: Understanding HEAD as a symbolic reference pointing to the current branch ref (.git/HEAD)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activeBranchState, setActiveBranchState] = useState("main");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 2;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const headScenarios = {
    main: {
      title: "Attached to 'main' Branch",
      headContent: "ref: refs/heads/main",
      branchRef: ".git/refs/heads/main",
      commitSha: "7a8b9c0d1e2f3456789abcdef0123456789abcde",
      commitDesc: "Commit C3 (feat: stable billing module v1.0)",
      isDetached: false,
      badge: "Attached Symbolic Ref",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
    },
    feature: {
      title: "Attached to 'feature-gst' Branch",
      headContent: "ref: refs/heads/feature-gst",
      branchRef: ".git/refs/heads/feature-gst",
      commitSha: "f4a5b6c7d8e90123456789abcdef0123456789ab",
      commitDesc: "Commit F2 (feat: 18% GST tax calculation handler)",
      isDetached: false,
      badge: "Attached Feature Ref",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800"
    },
    detached: {
      title: "Detached HEAD State (Direct Commit)",
      headContent: "1e2f3a4b5c6d7e8f90123456789abcdef0123456",
      branchRef: "NONE (Direct Commit Hash)",
      commitSha: "1e2f3a4b5c6d7e8f90123456789abcdef0123456",
      commitDesc: "Commit C1 (Initial repo setup)",
      isDetached: true,
      badge: "Detached Raw Hash",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800"
    }
  };

  const currentScenario = headScenarios[activeBranchState];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 2 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Role of HEAD: Understanding the Symbolic Reference (.git/HEAD)
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
              <Radio className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Internal Pointer Mechanics</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                HEAD: The "You Are Here" Marker of Your Entire Git Universe
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                In Git, <strong>HEAD</strong> is the single most important navigational reference. It answers the fundamental question: <em>"Which branch or commit is currently checked out into my working tree and staging index?"</em>
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Under normal conditions, HEAD is a <strong>symbolic reference (symref)</strong>. It does not store a raw 40-character commit hash directly. Instead, the file <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">.git/HEAD</code> contains text pointing to a branch reference file, such as <code className="text-emerald-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">ref: refs/heads/main</code>. When you make a commit, Git moves the branch pointer that HEAD points to, keeping your active workspace seamlessly aligned.
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
              Explain Like I'm 10 (ELI10): The Vinyl Record Needle & The Mall Map Red Pin
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              In the Barrackpore classroom, <strong>Sukanta Hui</strong> demonstrated HEAD to students <strong>Sachin</strong>, <strong>Mahima</strong>, and <strong>Swadeep</strong> using two physical analogies:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-slate-950/80 border border-cyan-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>The Mall Directory "You Are Here" Pin</span>
                </div>
                <p className="text-xs text-slate-300">
                  When you enter the 3-floor shopping mall in Barrackpore, the giant floor plan has a glowing red pin labeled <strong>"YOU ARE HERE"</strong>. The mall buildings don't move; the red pin tells you which shop you are currently standing in front of. In Git, HEAD is that glowing red pin!
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-purple-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  <Radio className="w-4 h-4" />
                  <span>The Cassette Player Read/Write Magnetic Head</span>
                </div>
                <p className="text-xs text-slate-300">
                  On a tape recorder or turntable, the magnetic <em>read/write head</em> rests on a specific groove of the tape. As the tape plays, sound comes out from that position. If you hit record, the head writes new sound at that exact spot!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-purple-500 pl-3">
              "Mahima asked: 'Sir, does HEAD hold all my files?' No! HEAD is just a microscopic note on the desk saying 'We are currently working on Sachin's ledger branch'. When Sachin types <code className="text-cyan-300">git commit</code>, Git looks at the note, finds Sachin's ledger, and writes the new invoice there!" — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE HEAD POINTER SIMULATOR ───────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Reference Inspector</span>
              <h3 className="text-xl font-bold text-white">Simulate .git/HEAD State Changes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveBranchState("main")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeBranchState === "main"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                On 'main'
              </button>
              <button
                onClick={() => setActiveBranchState("feature")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeBranchState === "feature"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                On 'feature-gst'
              </button>
              <button
                onClick={() => setActiveBranchState("detached")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeBranchState === "detached"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Detached HEAD
              </button>
            </div>
          </div>

          {/* Current State Display */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentScenario.title}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-mono ${currentScenario.badgeColor}`}>
                {currentScenario.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-sans">1. File: .git/HEAD</span>
                <p className="text-cyan-300 font-bold break-all">{currentScenario.headContent}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-sans">2. Intermediate Branch Ref</span>
                <p className="text-purple-300 font-bold break-all">{currentScenario.branchRef}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-sans">3. Resolved Commit Object</span>
                <p className="text-emerald-400 font-bold break-all">{currentScenario.commitSha.substring(0, 16)}...</p>
                <p className="text-slate-400 text-[10px] font-sans">{currentScenario.commitDesc}</p>
              </div>
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Two-Step Pointer Dereference (HEAD → Branch → Commit)
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="headArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                  </marker>
                  <marker id="branchArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                  <marker id="commitArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {/* Level 1: HEAD Symref */}
                <rect x="40" y="30" width="160" height="50" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="55" y="55" fill="#fecdd3" fontWeight="bold" fontSize="13">HEAD (.git/HEAD)</text>
                <text x="55" y="70" fill="#fda4af" fontSize="10">
                  {activeBranchState === "detached" ? "Raw Commit SHA" : "ref: refs/heads/..."}
                </text>

                {/* Level 2: Branch Pointer Box */}
                {activeBranchState !== "detached" ? (
                  <>
                    <path
                      d="M 200 55 L 310 55"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      markerEnd="url(#headArrow)"
                    >
                      <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    <text x="215" y="45" fill="#f43f5e" fontSize="9">symref link</text>

                    <rect x="320" y="30" width="180" height="50" rx="8" fill="#164e63" stroke="#06b6d4" strokeWidth="2" />
                    <text x="335" y="55" fill="#a5f3fc" fontWeight="bold" fontSize="13">
                      {activeBranchState === "main" ? "refs/heads/main" : "refs/heads/feature-gst"}
                    </text>
                    <text x="335" y="70" fill="#67e8f9" fontSize="10">41-byte text file</text>

                    <path
                      d="M 500 55 C 570 55, 540 140, 580 140"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      markerEnd="url(#branchArrow)"
                    />
                  </>
                ) : (
                  <path
                    d="M 200 55 C 380 55, 360 140, 420 140"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    markerEnd="url(#headArrow)"
                  />
                )}

                {/* Level 3: Commit Nodes */}
                {/* Commit C1 */}
                <circle cx="450" cy="140" r="22" fill="#1e293b" stroke={activeBranchState === "detached" ? "#f43f5e" : "#334155"} strokeWidth="2.5" />
                <text x="440" y="145" fill="#cbd5e1" fontWeight="bold">C1</text>
                <text x="425" y="180" fill="#64748b" fontSize="9">1e2f3a4</text>

                {/* Commit C2 */}
                <line x1="475" y1="140" x2="570" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#commitArrow)" />
                <circle cx="600" cy="140" r="22" fill="#1e293b" stroke={activeBranchState === "main" ? "#10b981" : "#334155"} strokeWidth="2.5" />
                <text x="590" y="145" fill="#cbd5e1" fontWeight="bold">C2</text>
                <text x="575" y="180" fill="#64748b" fontSize="9">7a8b9c0</text>

                {/* Commit F1 (Feature) */}
                <path d="M 470 130 C 510 90, 680 90, 715 125" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#branchArrow)" />
                <circle cx="730" cy="140" r="22" fill="#1e293b" stroke={activeBranchState === "feature" ? "#06b6d4" : "#334155"} strokeWidth="2.5" />
                <text x="720" y="145" fill="#cbd5e1" fontWeight="bold">F1</text>
                <text x="710" y="180" fill="#64748b" fontSize="9">f4a5b6c</text>

                {/* Footer notes in SVG */}
                <text x="40" y="220" fill="#94a3b8" fontSize="10">
                  {activeBranchState === "detached"
                    ? "⚠️ DETACHED HEAD: HEAD bypasses the branch ref layer and points directly to Commit C1."
                    : "✓ ATTACHED HEAD: Two-level dereference. HEAD -> refs/heads/name -> Commit SHA."}
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: INSPECTING HEAD WITH PLUMBING COMMANDS ───────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Inspecting HEAD with Git Plumbing Commands</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Git provides low-level plumbing commands to query HEAD programmatically without parsing porcelain output:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-semibold font-sans">git symbolic-ref HEAD</span>
              <p className="text-slate-400 font-sans">Outputs the active branch reference path:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-400">
                $ git symbolic-ref HEAD<br />
                refs/heads/main
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-semibold font-sans">git rev-parse HEAD</span>
              <p className="text-slate-400 font-sans">Resolves HEAD to its 40-character commit SHA:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-purple-400">
                $ git rev-parse HEAD<br />
                7a8b9c0d1e2f3456789abcdef0123456789abcde
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: RELATIVE ANCESTRY NOTATION (~ and ^) ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Navigating Relative Ancestry from HEAD</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Git provides powerful relative revision qualifiers to reference past commits based on HEAD:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Notation</th>
                  <th className="p-3 font-semibold">Meaning / Resolves To</th>
                  <th className="p-3 font-semibold text-cyan-400">Example Command</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">HEAD (or @)</td>
                  <td className="p-3 font-sans">The current commit checked out</td>
                  <td className="p-3 text-slate-300">git show HEAD</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">HEAD~1 (or HEAD^)</td>
                  <td className="p-3 font-sans">The immediate parent commit (1 commit back)</td>
                  <td className="p-3 text-slate-300">git diff HEAD~1 HEAD</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">HEAD~2 (or HEAD^^)</td>
                  <td className="p-3 font-sans">The grandparent commit (2 commits back)</td>
                  <td className="p-3 text-slate-300">git log HEAD~2..HEAD</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">HEAD^2</td>
                  <td className="p-3 font-sans">The second parent of a merge commit (the merged branch tip)</td>
                  <td className="p-3 text-slate-300">git show HEAD^2</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">@&#123;-1&#125;</td>
                  <td className="p-3 font-sans">The previously checked-out branch name</td>
                  <td className="p-3 text-slate-300">git switch @&#123;-1&#125;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When Swadeep accidentally broke his repo by opening .git/HEAD in Notepad and replacing it with random text, Git threw a fatal error on every single command. That's because Git treats .git/HEAD as its sacred compass. Always inspect it with `cat .git/HEAD` or `git symbolic-ref HEAD`, but let Git's porcelain commands modify it safely."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Common HEAD Pointer Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Making Commits While in Detached HEAD Without Realizing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you checkout a commit SHA directly (<code className="text-slate-100">git checkout 7a8b9c0</code>) and make 3 new commits, HEAD moves forward, but no branch ref points to them. Switching back to <code className="text-slate-100">main</code> leaves those commits orphaned and subject to garbage collection!
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Confusing `HEAD~2` with `HEAD^2`</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-slate-100">HEAD~2</code> goes back 2 generations on the main lineage. <code className="text-slate-100">HEAD^2</code> chooses the 2nd parent of a merge commit. Mixing these up causes developers to view the wrong ancestor commit.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 2 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 2 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 1: Git vs Other VCS</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 3: Creating Branches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
