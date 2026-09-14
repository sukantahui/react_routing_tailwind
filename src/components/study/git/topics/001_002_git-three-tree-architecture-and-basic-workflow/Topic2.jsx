import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Users,
  Database,
  FolderPlus,
  Copy,
  Server,
  CloudDownload,
  HardDrive
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
 * Topic 2: Creating a Local Repository: git init vs Cloning an Existing Repository (git clone)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activeMode, setActiveMode] = useState("init");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 2;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

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
                <span className="text-cyan-400">Topic 2 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <FolderPlus className="w-8 h-8 text-cyan-400" />
                Creating a Local Repository: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git init vs git clone</code>
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </Link>
              <Link
                to={nextTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition shadow-md shadow-cyan-900/30"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-cyan-400" /> Est. Reading Time: 15 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              <HardDrive className="w-3 h-3 text-cyan-400" /> Repository Genesis
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Essential CLI Pattern
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              <Users className="w-3 h-3 text-purple-400" /> Sukanta Hui Mentorship
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: INTUITIVE REAL-WORLD ANALOGY ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 rounded-2xl border border-cyan-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <FolderPlus className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Building an Original House vs Duplicating a Fully Furnished Villa
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Imagine you want a home in Barrackpore:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1.5">
                  <span className="text-sky-400 font-bold text-xs uppercase flex items-center gap-1.5">
                    <FolderPlus className="w-4 h-4" /> git init (Building from Scratch)
                  </span>
                  <p className="text-xs text-slate-300">
                    You purchase a plot of land and lay the foundation yourself. You start with zero walls, zero furniture, and complete creative freedom. You decide when and how to build the first room.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                  <span className="text-emerald-400 font-bold text-xs uppercase flex items-center gap-1.5">
                    <CloudDownload className="w-4 h-4" /> git clone (Replicating a Villa)
                  </span>
                  <p className="text-xs text-slate-300">
                    An architectural firm teleports a 100% exact replica of an existing mansion onto your plot, complete with every brick, past blueprint revisions, furniture history, and an automatic hotline (<code className="text-emerald-300">origin</code>) to headquarters!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TECHNICAL ARCHITECTURE & DEEP DIVE ────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Technical Comparison: <code className="text-cyan-300">git init</code> vs <code className="text-cyan-300">git clone</code>
              </h2>
              <p className="text-slate-400 text-sm">
                Explore the internal setup differences between both approaches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveMode("init")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                activeMode === "init"
                  ? "bg-cyan-950 text-cyan-300 border-cyan-500"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              1. Deep Dive: `git init` (Local Genesis)
            </button>
            <button
              onClick={() => setActiveMode("clone")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                activeMode === "clone"
                  ? "bg-cyan-950 text-cyan-300 border-cyan-500"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              2. Deep Dive: `git clone` (Remote Replication)
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            {activeMode === "init" ? (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-cyan-400" /> Inside the `git init` Pipeline
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  When you execute <code className="text-cyan-300">git init</code>, Git creates a bare skeleton directory structure inside <code className="text-indigo-300">.git/</code>. It contains an empty object store (<code className="text-slate-400">.git/objects/</code>), a pointer file (<code className="text-slate-400">.git/HEAD</code> pointing to <code className="text-slate-400">refs/heads/main</code>), and default hooks templates.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-slate-400 block font-sans font-semibold mb-1">Standard Initial Command Sequence:</span>
                  <div className="text-cyan-300">$ git init my-project</div>
                  <div className="text-cyan-300">$ cd my-project</div>
                  <div className="text-cyan-300">$ echo "# My Project" &gt; README.md</div>
                  <div className="text-cyan-300">$ git add README.md</div>
                  <div className="text-emerald-400">$ git commit -m "feat: initial commit"</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CloudDownload className="w-5 h-5 text-emerald-400" /> Inside the `git clone` Pipeline
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  When you execute <code className="text-cyan-300">git clone &lt;url&gt;</code>, Git establishes a secure TLS/SSH handshake with the remote host, transfers the entire packed object database, reconstructs the <code className="text-indigo-300">.git</code> folder, configures a remote pointer named <code className="text-amber-400">origin</code>, and checks out the default branch into your working tree in one automated step.
                </p>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-slate-400 block font-sans font-semibold mb-1">Advanced Clone Variations:</span>
                  <div className="text-cyan-300">$ git clone https://github.com/user/repo.git custom-folder</div>
                  <div className="text-cyan-300">$ git clone --depth 1 https://github.com/user/repo.git  # Shallow clone</div>
                  <div className="text-cyan-300">$ git clone --recurse-submodules https://github.com/user/repo.git</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD KEY COMMANDS MATRIX ─────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                High-Yield Initialization & Clone Commands Matrix
              </h2>
              <p className="text-slate-400 text-sm">
                Essential repository creation commands and flags
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                cmd: "git init",
                desc: "Initializes a blank Git repository in the current directory.",
                badge: "Genesis"
              },
              {
                cmd: "git init --initial-branch=main",
                desc: "Initializes a repository explicitly naming the root branch 'main'.",
                badge: "Modern Default"
              },
              {
                cmd: "git clone <url>",
                desc: "Clones a remote repository with full history and auto-configures 'origin'.",
                badge: "Full Clone"
              },
              {
                cmd: "git clone --depth 1 <url>",
                desc: "Performs a shallow clone fetching only the latest commit for fast CI/CD.",
                badge: "Shallow Clone"
              },
              {
                cmd: "git clone --single-branch -b <name> <url>",
                desc: "Clones strictly a single branch, reducing download bandwidth.",
                badge: "Single Branch"
              },
              {
                cmd: "git init --bare",
                desc: "Creates a server-side bare repository without a working directory.",
                badge: "Server Hub"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition space-y-2">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-xs sm:text-sm text-cyan-300 font-semibold bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {item.cmd}
                  </code>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: REAL-WORLD FAILURE SCENARIOS ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Real-World Failures & Repository Disasters
              </h2>
              <p className="text-slate-400 text-sm">
                Critical mistakes beginners make when initializing and cloning repositories
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Initializing in Home Directory
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A student accidentally typed <code className="text-cyan-300">git init</code> in <code className="text-slate-300">C:\Users\Sachin</code>. Git treated every download, video, and desktop shortcut as uncommitted files, freezing VS Code with 200,000 pending changes!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: Delete the hidden `~/.git` folder to remove the unwanted root repository.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Nested Repository Inside a Clone
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A developer cloned a starter repo, unzipped a second project inside it that had its own <code className="text-slate-300">.git</code> folder, and ran <code className="text-cyan-300">git add .</code>. Git treated the inner folder as an unlinked submodule, skipping its code files!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: Always remove inner `.git` folders before staging third-party folders.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Shallow Clone CI/CD Bisect Failure
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A CI script used <code className="text-cyan-300">git clone --depth 1</code> to speed up builds. When a release regression occurred, automated <code className="text-slate-300">git bisect</code> crashed because commit history before the latest commit was missing!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: Run `git fetch --unshallow` before running historical debuggers.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: CLASSROOM MENTORSHIP DIALOGUE ─────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/30 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Classroom Dialogue: Sukanta Sir Mentors Barrackpore Students
              </h2>
              <p className="text-slate-400 text-sm">
                Barrackpore Lab: Debangshu and Sachin learn when to init vs clone
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Debangshu:</span>
              <p className="text-slate-300">
                "Sir, when I join an IT company or open-source project, should I run <code className="text-cyan-300">git init</code> first and then download the files?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Never, Debangshu! When joining an existing project, you use <code className="text-cyan-300">git clone &lt;repo-url&gt;</code>. Running <code className="text-slate-300">git init</code> and downloading a ZIP would lose all branch history, commit logs, and author attributions. <code className="text-emerald-400">git clone</code> automatically creates the folder, configures the remote <code className="text-indigo-300">origin</code>, and links your local branches to the remote repository in one clean command!"
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: INTERACTIVE TERMINAL PLAYGROUND ────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Interactive Lab Playground: Init & Clone Commands
              </h2>
              <p className="text-slate-400 text-sm">
                Copy and run these commands in your sandbox
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 1. Initialize a new repo with custom branch:</div>
              <div className="text-cyan-300 select-all">$ git init --initial-branch=main my-project</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 2. Clone a repo with shallow depth:</div>
              <div className="text-cyan-300 select-all">$ git clone --depth 1 https://github.com/torvalds/linux.git</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 3. Check remote connection of any clone:</div>
              <div className="text-cyan-300 select-all">$ git remote -v</div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: SUKANTA SIR'S 7 COMMANDMENTS ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/40 p-6 sm:p-8 rounded-2xl border border-indigo-900/40 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Sukanta Sir's 7 Repository Genesis Commandments
              </h2>
              <p className="text-slate-400 text-sm">
                Golden rules for initializing and cloning projects safely
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Never run 'git init' in your User Home directory (~ or C:\\Users\\Name).",
              "Rule 2: Use 'git clone' when joining existing codebases to preserve 100% of commit history.",
              "Rule 3: Always check 'git remote -v' after cloning to verify your upstream endpoints.",
              "Rule 4: Remove inner .git folders before adding third-party directories to avoid broken submodules.",
              "Rule 5: Use kebab-case for repository naming (e.g. 'barrackpore-portal').",
              "Rule 6: Use shallow clones (--depth 1) in automated CI/CD build runners to save bandwidth.",
              "Rule 7: Set up a comprehensive .gitignore file immediately after running 'git init'."
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 9: 25 COMPREHENSIVE FAQ SECTION ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Exam Prep (25 Questions)
              </h2>
              <p className="text-slate-400 text-sm">
                git init vs git clone questions curated for technical interviews and viva exams
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="mod2_topic2" />
        </section>

        {/* ─── SECTION 10: PRINTABLE REFERENCE NOTE ──────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Printable ASCII Quick Reference
              </h2>
              <p className="text-slate-400 text-sm">
                Download or copy pure ASCII reference notes for offline revision
              </p>
            </div>
          </div>

          <PlainTextPrint noteText={noteText} fileName="mod2_topic2_init_vs_clone_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 1: Lifecycle of File Status
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 3: Inspecting Working Tree Status <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
