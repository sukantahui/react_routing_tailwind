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
  Unlink,
  Tag,
  History
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic 9: The Detached HEAD State: What causes it (checking out a commit SHA, tag, or remote branch directly)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [selectedTrigger, setSelectedTrigger] = useState("sha");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 9;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const triggerScenarios = {
    sha: {
      title: "Trigger 1: Direct Commit SHA Checkout",
      command: "$ git switch --detach 7a8b9c0",
      headValue: "7a8b9c0d1e2f3456789abcdef0123456789abcde",
      description: "Directly checking out a 40-character commit hash to inspect or debug historical repository state.",
      warning: "HEAD detached at 7a8b9c0"
    },
    tag: {
      title: "Trigger 2: Checking Out a Release Tag",
      command: "$ git checkout v1.0.0",
      headValue: "3f4a5b6c7d8e9f0123456789abcdef0123456789",
      description: "Tags are immutable release markers. Checking out a tag detaches HEAD because tags cannot move with new commits.",
      warning: "HEAD detached at v1.0.0"
    },
    remote: {
      title: "Trigger 3: Checking Out a Remote Branch Directly",
      command: "$ git checkout origin/main",
      headValue: "9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d",
      description: "Remote tracking branches are read-only bookmarks from the server. Checking out origin/main enters detached HEAD.",
      warning: "HEAD detached at origin/main"
    }
  };

  const currentScenario = triggerScenarios[selectedTrigger];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 9 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Detached HEAD State: Causes & Direct Commit Navigation
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
              <Unlink className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Direct Pointer Navigation</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Demystifying Detached HEAD: Time Travel Without a Branch Cable
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                The "Detached HEAD" warning is one of the most intimidating messages for Git newcomers. Beginners often panic, believing their repository is broken or corrupt.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                In reality, Detached HEAD is a safe, standard, and indispensable feature. It simply means that <code className="text-cyan-300 font-mono">.git/HEAD</code> is pointing <strong>directly to a commit SHA</strong> rather than pointing to a branch name. You can explore, build, test, and experiment in complete isolation without disturbing any existing branches.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 border border-amber-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-950 border border-amber-800 rounded-lg text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-200">
              Explain Like I'm 10 (ELI10): The Elevator Cable vs The Glass Observation Deck
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> explained the state to student <strong>Mahima Ghosh</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <GitBranch className="w-4 h-4" />
                  <span>Attached HEAD: Riding in the Elevator</span>
                </div>
                <p className="text-xs text-slate-300">
                  You are inside an elevator hooked to the strong steel cable named <code className="text-emerald-300">main</code>. As you travel up to new floors (commits), the cable moves with you automatically!
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Unlink className="w-4 h-4" />
                  <span>Detached HEAD: Stepping Out on the Observation Deck</span>
                </div>
                <p className="text-xs text-slate-300">
                  You step out of the elevator onto Floor 45 to take photos and look through binoculars. The elevator cable stays behind. You can walk around freely, but to go to a new floor permanently, you need to call or build a new elevator!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-amber-500 pl-3">
              "Mahima smiled: 'So detached HEAD just means I stepped out of the branch elevator to look at an old commit!' Exactly." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE TRIGGER SIMULATOR ────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Simulator</span>
              <h3 className="text-xl font-bold text-white">Detached HEAD Triggers</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTrigger("sha")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedTrigger === "sha"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                1. Commit SHA
              </button>
              <button
                onClick={() => setSelectedTrigger("tag")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedTrigger === "tag"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                2. Release Tag
              </button>
              <button
                onClick={() => setSelectedTrigger("remote")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedTrigger === "remote"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                3. Remote Branch
              </button>
            </div>
          </div>

          {/* Trigger Card */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentScenario.title}</span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-amber-800 text-amber-400 bg-amber-950/40 font-mono">
                {currentScenario.warning}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-sans">Command Executed:</span>
                <p className="text-cyan-300 font-bold">{currentScenario.command}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-sans">Content of .git/HEAD:</span>
                <p className="text-purple-300 font-bold break-all">{currentScenario.headValue}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">{currentScenario.description}</p>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Attached HEAD vs Detached HEAD
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="detachedHeadArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                  </marker>
                  <marker id="attachedHeadArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {/* Left Side: Attached State */}
                <rect x="30" y="20" width="370" height="200" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="45" y="45" fill="#a7f3d0" fontWeight="bold" fontSize="13">Attached HEAD (Normal)</text>

                <rect x="50" y="70" width="90" height="35" rx="5" fill="#881337" stroke="#f43f5e" />
                <text x="75" y="92" fill="#fecdd3" fontWeight="bold">HEAD</text>

                <path d="M 140 87 L 200 87" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#attachedHeadArrow)" />

                <rect x="205" y="70" width="160" height="35" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="215" y="92" fill="#a7f3d0" fontWeight="bold">refs/heads/main</text>

                <path d="M 285 105 L 285 145" stroke="#10b981" strokeWidth="2" markerEnd="url(#attachedHeadArrow)" />

                <circle cx="285" cy="165" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="277" y="169" fill="#a7f3d0" fontWeight="bold">C2</text>
                <text x="50" y="200" fill="#94a3b8" fontSize="10">Two-step dereference (HEAD → main → C2)</text>

                {/* Right Side: Detached State */}
                <rect x="440" y="20" width="380" height="200" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="455" y="45" fill="#fde68a" fontWeight="bold" fontSize="13">Detached HEAD State</text>

                <rect x="460" y="70" width="90" height="35" rx="5" fill="#881337" stroke="#f43f5e" />
                <text x="485" y="92" fill="#fecdd3" fontWeight="bold">HEAD</text>

                {/* Direct line bypassing branch pointer */}
                <path d="M 550 87 C 640 87, 680 120, 680 145" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#detachedHeadArrow)">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.5s" repeatCount="indefinite" />
                </path>
                <text x="560" y="80" fill="#f59e0b" fontSize="10">Direct pointer (No branch ref)</text>

                <circle cx="680" cy="165" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="672" y="169" fill="#fde68a" fontWeight="bold">C1</text>
                <text x="460" y="200" fill="#fca5a5" fontSize="10">⚠️ HEAD points straight to Commit C1 SHA!</text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMON USE CASES TABLE ──────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Why Developers Use Detached HEAD Deliberately</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Practical Use Case</th>
                  <th className="p-3 font-semibold">Command Syntax</th>
                  <th className="p-3 font-semibold text-cyan-400">Why It's Safe & Effective</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Time-Travel Bug Reproduction</td>
                  <td className="p-3 text-cyan-300">git switch --detach 7a8b9c0</td>
                  <td className="p-3 font-sans text-slate-300">Test if bug existed in release 3 weeks ago without creating dummy branches.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Building Release from Tag</td>
                  <td className="p-3 text-purple-300">git checkout v1.2.0</td>
                  <td className="p-3 font-sans text-slate-300">Compile exact production release binary.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Disposable Sandbox Prototyping</td>
                  <td className="p-3 text-amber-300">git switch --detach HEAD</td>
                  <td className="p-3 font-sans text-slate-300">Test an experimental refactor; discard effortlessly by switching back to main.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL LAB ───────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Detached HEAD Navigation Cheatsheet</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Enter detached HEAD safely to inspect an older commit</span>
              <p className="text-cyan-400">$ git switch --detach 7a8b9c0</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Check current status</span>
              <p className="text-cyan-400">$ git status</p>
              <p className="text-amber-300">HEAD detached at 7a8b9c0</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Return safely to your main branch</span>
              <p className="text-cyan-400">$ git switch main</p>
              <p className="text-emerald-400">Switched to branch 'main'</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When beginners see the word 'DETACHED', they feel something broke. I tell students: think of it as uncoupling a train car in a railway yard so you can inspect its wheels. You haven't derailed the train; you're just doing maintenance!"
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Detached HEAD Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Committing Without Attaching a Branch</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Writing 5 major commits in detached HEAD and switching back to <code className="text-slate-100">main</code> leaves those commits unreferenced. Always create a branch (<code className="text-cyan-300">git switch -c rescue</code>) before leaving!
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Assuming `git checkout origin/main` Updates GitHub</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Checking out a remote branch directly puts you in detached HEAD; you cannot push from there without creating a local branch.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 9 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 9 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 8: Deleting Branches</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 10: Navigating in Detached HEAD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
