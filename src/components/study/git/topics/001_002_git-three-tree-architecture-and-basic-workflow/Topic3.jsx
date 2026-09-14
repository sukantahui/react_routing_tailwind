import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
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
  Users,
  Database,
  Activity,
  Search,
  Eye,
  Columns
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
 * Topic 3: Inspecting Working Tree Status: git status and short status format (git status -s)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [selectedStatus, setSelectedStatus] = useState("MM");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 3;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  // Interactive Short Status Decoder Data
  const statusCodes = {
    "??": {
      title: "?? Untracked File",
      colX: "? (Untracked in Index)",
      colY: "? (Untracked on disk)",
      desc: "File exists in the working directory on disk but has NEVER been staged or committed, and is not ignored by .gitignore.",
      color: "text-red-400 border-red-500/30 bg-red-950/20",
      action: "Run 'git add <file>' to begin tracking, or add to '.gitignore' if it is build output/secret."
    },
    "A ": {
      title: "A  Staged New File (Added)",
      colX: "A (Added to Index)",
      colY: "  (Matches Index in Working Tree)",
      desc: "A newly created file that was added to the staging area (Index) and is ready for the upcoming commit.",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
      action: "Run 'git commit -m \"...\"' to record the file snapshot into HEAD repository history."
    },
    " M": {
      title: " M Tracked & Modified (Unstaged)",
      colX: "  (Index matches HEAD)",
      colY: "M (Modified in Working Tree)",
      desc: "A tracked file was edited in the working directory, but the changes have NOT yet been staged into the Index.",
      color: "text-amber-400 border-amber-500/30 bg-amber-950/20",
      action: "Run 'git add <file>' to stage changes, or 'git restore <file>' to discard working tree edits."
    },
    "M ": {
      title: "M  Modified & Staged for Commit",
      colX: "M (Index differs from HEAD)",
      colY: "  (Working Tree matches Index)",
      desc: "Modifications to a tracked file were staged with 'git add'. The staging area is ahead of HEAD.",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20",
      action: "Run 'git commit' to seal into HEAD, or 'git restore --staged <file>' to unstage back to working tree."
    },
    "MM": {
      title: "MM Staged AND Modified Again (Dual State)",
      colX: "M (Staged snapshot in Index)",
      colY: "M (Further unstaged edits on disk)",
      desc: "You staged an edit into the Index, but then continued modifying the file in your editor without re-staging!",
      color: "text-purple-400 border-purple-500/30 bg-purple-950/20",
      action: "Run 'git diff' to see unstaged edits; 'git diff --staged' to see staged edits. Run 'git add <file>' to update Index."
    },
    " D": {
      title: " D Deleted in Working Tree (Unstaged Deletion)",
      colX: "  (Index still holds file)",
      colY: "D (File deleted on disk)",
      desc: "The file was deleted from your hard drive via OS file explorer or 'rm', but the deletion hasn't been staged in Git.",
      color: "text-rose-400 border-rose-500/30 bg-rose-950/20",
      action: "Run 'git add <file>' or 'git rm <file>' to stage the deletion, or 'git restore <file>' to restore it."
    },
    "D ": {
      title: "D  Staged Deletion",
      colX: "D (Index removed file)",
      colY: "  (File absent on disk)",
      desc: "The deletion is staged in the Index. Upon commit, the file will be removed in the new snapshot.",
      color: "text-red-400 border-red-500/30 bg-red-950/20",
      action: "Run 'git commit' to complete removal, or 'git restore --staged <file>' to cancel staged deletion."
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
                <Link to={`/${folder}`} className="hover:underline flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5" /> Git Master Roadmap
                </Link>
                <span>/</span>
                <span className="text-slate-400">Module 001_002</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 3 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Activity className="w-8 h-8 text-cyan-400" />
                Inspecting Working Tree Status: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git status -s</code>
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Prev Topic
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
              >
                Next Topic <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: MOTIVATION & PEDAGOGICAL HOOK ────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Repository Diagnostic Cockpit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Understanding Where Your Code Lives in the 3-Tree Cycle
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Before issuing a commit or switching branches, you must have perfect situational awareness. 
              <code className="text-cyan-300 font-mono mx-1">git status</code> is your real-time diagnostic dashboard that interrogates the relationship between the 
              <strong> Working Tree</strong> (files on disk), the <strong>Staging Area Index</strong> (files prepared for commit), and the <strong>HEAD Commit</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Total Observability
                </h3>
                <p className="text-slate-400 text-xs">
                  Reveals unstaged edits, staged changes ready to be written, and untracked files sitting on disk.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Columns className="w-4 h-4" /> XY Column Matrix
                </h3>
                <p className="text-slate-400 text-xs">
                  The short format <code className="text-emerald-400 font-mono">git status -s</code> packs multi-tree diagnostic status into 2 unambiguous columns.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Commit Insurance
                </h3>
                <p className="text-slate-400 text-xs">
                  Prevents committing unintended temporary files, API secrets, or half-finished code edits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TECHNICAL ARCHITECTURE & XY MATRIX ──────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">The XY Status Architecture</h2>
              <p className="text-slate-400 text-sm">Decoding the Left Column (Index vs HEAD) and Right Column (Working Tree vs Index)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ASCII & Graphical Schema */}
            <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" /> Short Format Anatomy: <code className="text-cyan-300 font-mono">XY PATH</code>
              </h3>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto leading-relaxed">
                <pre>{`┌─────────────────────────────────────────────────────────────┐
│  git status -s OUTPUT ANATOMY                               │
│                                                             │
│       X  Y   filename.ext                                   │
│       │  │                                                  │
│       │  └── COLUMN 2 (Right): Working Tree vs Index        │
│       │      - ' ' = Working tree matches Index             │
│       │      - 'M' = Working tree modified (unstaged)       │
│       │      - 'D' = Working tree deleted (unstaged)        │
│       │                                                     │
│       └───── COLUMN 1 (Left): Index vs HEAD (Staging Area)  │
│              - ' ' = Index matches HEAD snapshot            │
│              - 'M' = Staged modification                    │
│              - 'A' = Staged new file (added)                │
│              - 'D' = Staged deletion                        │
│              - 'R' = Staged rename                          │
│                                                             │
│       Special: "??" = Untracked file (both trees unaware)   │
│                "!!" = Ignored file by .gitignore            │
└─────────────────────────────────────────────────────────────┘`}</pre>
              </div>

              <div className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <strong className="text-cyan-300">Pro-Tip from Sukanta Hui:</strong> Whenever you see 
                <span className="text-purple-400 font-mono font-bold mx-1">MM</span> in the status, it means the file is in a <em>dual state</em>. You have one version staged in Index and a newer uncommitted edit sitting in your working tree!
              </div>
            </div>

            {/* Interactive Status Decoder Tool */}
            <div className="lg:col-span-6 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Interactive Status Code Decoder
              </h3>
              <p className="text-xs text-slate-400">Click any 2-letter status code to inspect its Three-Tree meaning and recommended action:</p>

              {/* Code Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(statusCodes).map((code) => (
                  <button
                    key={code}
                    onClick={() => setSelectedStatus(code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                      selectedStatus === code
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              {/* Detail Card for Selected Code */}
              {statusCodes[selectedStatus] && (
                <div className={`p-4 rounded-xl border ${statusCodes[selectedStatus].color} space-y-3`}>
                  <h4 className="font-bold text-sm flex items-center justify-between">
                    <span>{statusCodes[selectedStatus].title}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700">Code: {selectedStatus}</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block">Col 1 (Index/HEAD):</span>
                      <strong className="text-slate-200">{statusCodes[selectedStatus].colX}</strong>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                      <span className="text-slate-400 block">Col 2 (Tree/Index):</span>
                      <strong className="text-slate-200">{statusCodes[selectedStatus].colY}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">{statusCodes[selectedStatus].desc}</p>
                  <div className="pt-2 border-t border-slate-700/50 text-xs">
                    <strong className="text-cyan-300">Action Required: </strong>
                    <span className="text-slate-300">{statusCodes[selectedStatus].action}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Full Long Status vs Short Status Formats</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">Command Flag</th>
                  <th className="p-3 font-semibold">Output Style</th>
                  <th className="p-3 font-semibold">Terminal Footprint</th>
                  <th className="p-3 font-semibold">Best Used When</th>
                  <th className="p-3 font-semibold">Includes Branch & Ahead/Behind?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-semibold">git status</td>
                  <td className="p-3">Verbose text with instructional hints (e.g. `use "git restore..."`)</td>
                  <td className="p-3 text-amber-400">Large (15–30 lines)</td>
                  <td className="p-3">Learning Git or debugging confusing multi-file changes</td>
                  <td className="p-3 text-emerald-400">Yes (detailed)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-semibold">git status -s</td>
                  <td className="p-3">Compact 2-column format (XY path)</td>
                  <td className="p-3 text-emerald-400">Minimal (1 line per file)</td>
                  <td className="p-3">Daily quick audit; automated scripts & IDE extensions</td>
                  <td className="p-3 text-red-400">No (files only)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-semibold">git status -sb</td>
                  <td className="p-3">Compact 2-column + Branch header (`## main...origin/main`)</td>
                  <td className="p-3 text-emerald-400">Minimal + 1 header line</td>
                  <td className="p-3 text-cyan-300 font-bold">Recommended default daily alias (`git st`)</td>
                  <td className="p-3 text-emerald-400">Yes (compact header)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-semibold">git status -uall</td>
                  <td className="p-3">Expands all untracked folder contents individually</td>
                  <td className="p-3 text-amber-400">Medium to Large</td>
                  <td className="p-3">Ensuring no unexpected nested build artifacts are lurking</td>
                  <td className="p-3 text-slate-400">Same as chosen mode</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & REAL-WORLD SCENARIO ────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Barrackpore Incident</h2>
              <p className="text-slate-400 text-sm">Real-life debugging session with Sachin, Mahima, and Susmita</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Problem Encountered by Sachin
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sachin was working on an accounting module in Barrackpore. He edited <code className="text-cyan-300 font-mono">tax_calculator.js</code>, added it to staging with <code className="text-cyan-300 font-mono">git add tax_calculator.js</code>, and immediately found a formula bug.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                He quickly fixed the formula in VS Code and committed:
                <code className="text-cyan-300 font-mono block bg-slate-900 p-2 rounded mt-1">git commit -m "fix: GST formula"</code>
                When Susmita reviewed his commit on GitHub, the formula fix was missing! Sachin was baffled: <em>"I edited the file right on my screen!"</em>
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> The Mentor's Diagnosis & Solution
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui walked to Sachin's terminal and asked him to run <code className="text-cyan-300 font-mono">git status -s</code>. The terminal displayed:
                <code className="text-purple-400 font-mono block bg-slate-900 p-2 rounded mt-1"> M tax_calculator.js</code>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong>Sukanta explained:</strong> <em>"Git stages snapshots, not files! When you ran `git add`, you staged snapshot #1. When you fixed the formula, snapshot #2 remained in your working tree unstaged. When you committed, Git committed snapshot #1 from the Index!"</em>
              </p>
              <p className="text-slate-300 text-xs">
                <strong>Lesson:</strong> Always run <code className="text-cyan-300 font-mono">git status</code> right before <code className="text-cyan-300 font-mono">git commit</code> to ensure no trailing <code className="text-purple-400 font-mono">MM</code> or <code className="text-amber-400 font-mono"> M</code> states exist!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF GIT STATUS ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Repository Inspection</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Never Commit Blindly</span>
              <p className="text-slate-400">Always run `git status` or `git status -s` immediately before writing a commit message.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Understand Left vs Right</span>
              <p className="text-slate-400">Left column is Staged (Index vs HEAD); Right column is Unstaged (Working Tree vs Index).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Beware of the MM Trap</span>
              <p className="text-slate-400">If you edit after `git add`, the new changes are NOT in the staging area until you `git add` again.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Alias git status -sb</span>
              <p className="text-slate-400">Configure `git config --global alias.st "status -sb"` for high-velocity repository audits.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Guard Against Untracked ??</span>
              <p className="text-slate-400">Ensure any file starting with `??` is either tracked or added to `.gitignore` before merging.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Check Unmerged UU States</span>
              <p className="text-slate-400">During a merge conflict, `UU` signals conflicting files that must be hand-resolved.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Inspect Untracked Folders</span>
              <p className="text-slate-400">Use `git status -uall` to ensure no sensitive nested configs are hiding inside untracked directories.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: EXECUTABLE TERMINAL LAB SCRIPT ──────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Hands-On Bash Verification Lab</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic3_files/git_status_inspection_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Run this bash lab script to automatically synthesize files in all possible states (<code className="text-cyan-300 font-mono">??</code>, <code className="text-emerald-300 font-mono">A </code>, <code className="text-amber-300 font-mono"> M</code>, <code className="text-purple-300 font-mono">MM</code>, <code className="text-rose-300 font-mono"> D</code>) and inspect both long and short status outputs.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic3_files/git_status_inspection_lab.sh`}</pre>
          </div>
        </section>

        {/* ─── SECTION 8: FAQ ACCORDION ───────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <FAQTemplate
            faqs={[
              {
                question: "Why does `git status` show both red and green colors in terminal?",
                answer: "In standard Git terminal configurations: Green represents files in the Staging Area (Index) ready to be committed. Red represents unstaged modifications in the Working Tree or untracked files."
              },
              {
                question: "What is the difference between `git status -s` and `git status --short`?",
                answer: "They are completely identical. `-s` is simply the short-hand flag for `--short`."
              },
              {
                question: "Can `git status` modify any of my files or commit anything?",
                answer: "No! `git status` is a strictly read-only diagnostic command. It queries disk hashes and compares them to index and HEAD, without altering a single byte of your files or commit history."
              },
              {
                question: "Why does `git status -s` output `?? my-folder/` instead of listing individual files?",
                answer: "Git collapses untracked directories to save screen space. To see all individual untracked files inside subdirectories, pass the flag `-uall` (e.g. `git status -s -uall`)."
              },
              {
                question: "How do I see files that are being ignored by `.gitignore`?",
                answer: "Run `git status --ignored` (or `git status -s --ignored`). Ignored files will appear prefixed with `!!` in the short status matrix."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 3 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of short status matrix codes, column interpretations, and diagnostic flags.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.slice(0, 6).map((q) => (
              <div key={q.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-400">Q{q.id}:</span>
                  <span className="text-xs font-medium text-slate-200">{q.question}</span>
                </div>
                <div className="text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-500/20 mt-2">
                  <strong>Correct:</strong> {q.options[q.correctAnswer]}
                  <p className="text-slate-400 text-[11px] mt-1">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT & NOTE EXPORT ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Printable Reference Note</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic3_files/topic3_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic3_git_status_notes.txt" />
        </section>

        {/* ─── SECTION 11: EDUCATOR PROFILE CARD ──────────────────────────── */}
        <section className="pt-6 border-t border-slate-800">
          <Teacher />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-6 border-t border-slate-800 text-sm">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 2 (git init vs clone)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 4 (Staging Changes: git add variations) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
