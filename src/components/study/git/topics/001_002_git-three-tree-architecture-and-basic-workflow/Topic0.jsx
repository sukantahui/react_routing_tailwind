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
  Eye,
  Package,
  Boxes,
  Archive,
  RefreshCw,
  FolderTree
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
 * Topic 0: Git's Three-Tree Architecture: Working Directory -> Staging Area (Index) -> Repository (HEAD Commit)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [activeTree, setActiveTree] = useState("staging");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/001_001_introduction-to-version-control-and-git-architecture/14`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const treeDetails = {
    working: {
      title: "Tree 1: Working Directory (The Workbench)",
      location: "Project files on disk (your workspace outside .git/)",
      state: "Mutable & Editable",
      desc: "This is your active sandbox. When you open VS Code, create variables, or delete CSS rules, changes happen here in real-time. Git does not protect unstaged/uncommitted files in the working directory from being overwritten by external disk tools.",
      command: "Edit code directly in your IDE / editor",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300",
      icon: FolderTree
    },
    staging: {
      title: "Tree 2: Staging Area (The Shipping Box / Index)",
      location: ".git/index (High-speed binary cache)",
      state: "Mutable Preparation Area",
      desc: "The photographic viewfinder of Git. When you run 'git add', Git captures a snapshot of the staged files as immutable blobs in .git/objects/ and registers their paths in .git/index. This allows you to selectively curate which changes enter the next commit.",
      command: "git add <file>  |  git add -p  |  git restore --staged <file>",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300",
      icon: Boxes
    },
    repository: {
      title: "Tree 3: Repository / HEAD (The Sealed Vault)",
      location: ".git/objects/ & .git/refs/heads/ (Commit history)",
      state: "Immutable Cryptographic Snapshots",
      desc: "The permanent historical record. When you run 'git commit', Git seals the exact tree from the Staging Area into a commit object with an author, timestamp, parent pointer, and cryptographic SHA hash.",
      command: "git commit -m 'feat: ...'  |  git log  |  git checkout",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
      icon: Archive
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
                <span className="text-cyan-400">Topic 0 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Layers className="w-8 h-8 text-cyan-400" />
                Git's Three-Tree Architecture: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">Working Directory → Index → HEAD</code>
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev Module
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
              <Clock className="w-3 h-3 text-cyan-400" /> Est. Reading Time: 16 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              <Layers className="w-3 h-3 text-cyan-400" /> Core Mental Model
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Fundamental Invariant
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
            <Layers className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                The Workbench, Shipping Box & Vault Analogy
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Imagine you are an artisan craftsman at a workshop in Barrackpore building custom electronics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1.5">
                  <span className="text-sky-400 font-bold text-xs uppercase flex items-center gap-1.5">
                    <FolderTree className="w-4 h-4" /> 1. The Workbench
                  </span>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Working Directory:</strong> Tools, loose screws, and half-cut wires on your table. You can modify anything freely, but if you spill coffee, unstaged work is lost.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                  <span className="text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5">
                    <Boxes className="w-4 h-4" /> 2. The Shipping Box
                  </span>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Staging Area (Index):</strong> You place only the finished, polished circuit board into the packing box (<code className="text-amber-300">git add</code>) while leaving unfinished tools on the table.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                  <span className="text-emerald-400 font-bold text-xs uppercase flex items-center gap-1.5">
                    <Archive className="w-4 h-4" /> 3. The Sealed Vault
                  </span>
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Repository (HEAD):</strong> You seal the box with tamper-proof security tape, print a barcode invoice (<code className="text-emerald-300">git commit</code>), and store it in the immutable vault forever.
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
                Interactive Architecture: State Transitions Across the Three Trees
              </h2>
              <p className="text-slate-400 text-sm">
                Click on any tree below to explore its storage mechanism, lifecycle role, and state transitions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tree Navigation Selector */}
            <div className="lg:col-span-1 space-y-2.5">
              {[
                { id: "working", label: "Tree 1: Working Directory", role: "Editable disk sandbox" },
                { id: "staging", label: "Tree 2: Staging Area (Index)", role: "Binary snapshot cache" },
                { id: "repository", label: "Tree 3: Repository (HEAD)", role: "Immutable commit vault" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTree(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition flex flex-col gap-1 ${
                    activeTree === item.id
                      ? "bg-cyan-950/60 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                  }`}
                >
                  <span className="font-semibold text-sm text-cyan-300">{item.label}</span>
                  <span className="text-xs text-slate-500">{item.role}</span>
                </button>
              ))}
            </div>

            {/* Tree Details Card */}
            <div className={`lg:col-span-2 p-6 rounded-2xl border ${treeDetails[activeTree].color} flex flex-col justify-between space-y-4`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    {React.createElement(treeDetails[activeTree].icon, { className: "w-5 h-5 text-cyan-400" })}
                    {treeDetails[activeTree].title}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                    {treeDetails[activeTree].state}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <span className="font-semibold text-slate-300">Physical Storage Location:</span>
                  <div className="font-mono text-cyan-300 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                    {treeDetails[activeTree].location}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {treeDetails[activeTree].desc}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Primary Command Interaction:
                </span>
                <code className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 block overflow-x-auto">
                  $ {treeDetails[activeTree].command}
                </code>
              </div>
            </div>
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
                The Three-Tree Command Diff & Inspection Matrix
              </h2>
              <p className="text-slate-400 text-sm">
                How to inspect and navigate between the three states with precision
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                cmd: "git diff",
                source: "Working Tree vs Staging Area",
                desc: "Shows unstaged modifications you made in your IDE that are not yet staged.",
                badge: "Unstaged Edits"
              },
              {
                cmd: "git diff --staged (or --cached)",
                source: "Staging Area vs HEAD",
                desc: "Shows exactly what changes have been staged with 'git add' and will enter the next commit.",
                badge: "Pending Snapshot"
              },
              {
                cmd: "git diff HEAD",
                source: "Working Tree vs HEAD",
                desc: "Shows all changes combined (staged + unstaged) compared to the last commit.",
                badge: "Total Workspace Diff"
              },
              {
                cmd: "git restore <file>",
                source: "Staging Area -> Working Tree",
                desc: "Discards unstaged changes in your working tree, replacing them with the staged version.",
                badge: "Discard Edits"
              },
              {
                cmd: "git restore --staged <file>",
                source: "HEAD -> Staging Area",
                desc: "Unstages a file from the index while keeping your local code edits untouched in the working tree.",
                badge: "Unstage File"
              },
              {
                cmd: "git ls-files --stage",
                source: "Direct .git/index Dump",
                desc: "Prints raw file permissions, staged blob SHA hashes, and stages recorded in the binary cache.",
                badge: "Index Inspection"
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
                <div className="text-[11px] text-indigo-300 font-mono">{item.source}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: REAL-WORLD FAILURE SCENARIOS & ANTIPATTERNS ───────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Real-World Failures: The "Dual-State" Confusion & Gotchas
              </h2>
              <p className="text-slate-400 text-sm">
                Case studies of common junior developer pitfalls with the Three Trees
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> The Dual-State Staging Trap
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A developer edited <code className="text-slate-300">auth.js</code>, ran <code className="text-cyan-300">git add auth.js</code>, and then added a quick fix on line 50. They ran <code className="text-cyan-300">git commit</code> assuming their fix was included. Because they didn't run <code className="text-cyan-300">git add</code> again, the commit only included version 1, deploying broken code!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Git stages exact snapshots, not files. Always check git status before commit!
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Blind `git add .` Pollution
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A student ran <code className="text-slate-300">git add .</code> blindly without a <code className="text-slate-300">.gitignore</code> file, staging 450 MB of <code className="text-slate-300">node_modules/</code> and a <code className="text-slate-300">.env</code> secret file into the index, locking huge binary blobs permanently in their object store.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Always review git status and use git diff --staged before committing.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Destructive `git reset --hard` Loss
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A programmer had 4 hours of unstaged experiment code in their Working Tree. To discard one staged test file, they typed <code className="text-slate-300">git reset --hard</code> instead of <code className="text-cyan-300">git restore --staged</code>, wiping all 4 hours of uncommitted work irrecoverably.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Use modern `git restore` commands to avoid accidental hard resets.
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
                Classroom Dialogue: Sukanta Sir Mentors Barrackpore Cohort
              </h2>
              <p className="text-slate-400 text-sm">
                Barrackpore Lab: Sachin, Mahima, and Susmita unravel the Three Trees
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Sachin:</span>
              <p className="text-slate-300">
                "Sir, why can't Git just commit directly from my disk like SVN did? Why did Linus Torvalds introduce the extra step of 'git add'?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Think about your actual coding workflow, Sachin. While working on a customer login feature, you fixed a typo in the navbar, refactored a database utility, and started a new API endpoint. In SVN, you were forced to commit all 3 unrelated changes together in one messy blob. With Git's Staging Area, you can stage ONLY the navbar typo, commit it as <code className="text-emerald-400">fix(nav): correct typo</code>, then stage the database refactor as <code className="text-emerald-400">refactor(db): optimize connection pool</code>. The Staging Area gives you surgical precision to craft clean, atomic commits!"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Mahima:</span>
              <p className="text-slate-300">
                "Sir, what happens when I run <code className="text-cyan-300">git diff</code> vs <code className="text-cyan-300">git diff --staged</code>?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "<code className="text-cyan-300">git diff</code> asks: <em className='text-white'>'What did I edit in my IDE that hasn't been put into the shipping box yet?'</em> While <code className="text-cyan-300">git diff --staged</code> asks: <em className='text-white'>'What is packed inside the shipping box right now, waiting to be sealed into the next commit?'</em> Remembering this distinction prevents 90% of commit mistakes."
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
                Interactive Lab Playground: Inspect the Three Trees
              </h2>
              <p className="text-slate-400 text-sm">
                Try these commands to observe the three trees in your terminal
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 1. Check status with short flag:</div>
              <div className="text-cyan-300 select-all">$ git status -s</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 2. View unstaged changes on disk:</div>
              <div className="text-cyan-300 select-all">$ git diff</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 3. View staged changes pending commit:</div>
              <div className="text-cyan-300 select-all">$ git diff --staged</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 4. Dump the raw staging index entries:</div>
              <div className="text-cyan-300 select-all">$ git ls-files --stage</div>
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
                Sukanta Sir's 7 Commandments of the Three Trees
              </h2>
              <p className="text-slate-400 text-sm">
                Architectural rules for clean and safe local version control
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Always check 'git status' before and after running 'git add'.",
              "Rule 2: Never commit blindly with 'git commit -a' without reviewing unstaged changes.",
              "Rule 3: Use 'git diff --staged' as your pre-commit inspection checklist.",
              "Rule 4: Remember that Git stages snapshots, not files—editing a file after staging requires re-adding.",
              "Rule 5: Use 'git restore --staged <file>' to cleanly unstage without losing code.",
              "Rule 6: Keep the Working Tree clean by committing or stashing before switching branches.",
              "Rule 7: Master the Three Trees, and you will master all of Git!"
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
                Three-tree architecture and workflow questions curated for technical interviews
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="mod2_topic0" />
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

          <PlainTextPrint noteText={noteText} fileName="mod2_topic0_three_trees_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Module 001_001 Assessment (Topic 14)
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 1: Lifecycle of File Status <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
