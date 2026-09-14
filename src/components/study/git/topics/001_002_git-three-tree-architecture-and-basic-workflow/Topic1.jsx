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
  RefreshCw,
  FolderTree,
  FileQuestion,
  FileCheck,
  FileEdit,
  FilePlus
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
 * Topic 1: The Lifecycle of File Status: Untracked, Unmodified, Modified, and Staged
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [activeState, setActiveState] = useState("modified");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 1;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const stateDetails = {
    untracked: {
      title: "1. Untracked (Status Code: '??')",
      desc: "The file exists in your working directory on disk, but Git has never recorded it in a past commit snapshot and it is not currently staged in the index.",
      action: "To begin tracking and staging: git add <file>",
      color: "border-slate-700 bg-slate-900 text-slate-300",
      badge: "?? Untracked",
      icon: FileQuestion
    },
    staged: {
      title: "2. Staged (Status Code: 'A ' or 'M ')",
      desc: "The file's current snapshot has been copied into the .git/index binary staging area, ready to be written to the repository on the next commit.",
      action: "To commit: git commit -m '...' | To unstage: git restore --staged <file>",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
      badge: "M_ / A_ Staged",
      icon: FileCheck
    },
    unmodified: {
      title: "3. Unmodified (Clean State: No status output)",
      desc: "The file in the working tree is 100% identical to the version sealed in the latest HEAD commit. Git has nothing new to record.",
      action: "To edit: modify in editor | To stop tracking: git rm --cached <file>",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300",
      badge: "Clean / In Sync",
      icon: ShieldCheck
    },
    modified: {
      title: "4. Modified (Status Code: ' M')",
      desc: "The file was previously committed or tracked, but you have edited its content on disk in the Working Tree since the last commit or staging.",
      action: "To stage: git add <file> | To discard edits: git restore <file>",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300",
      badge: "_M Modified",
      icon: FileEdit
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
                <span className="text-cyan-400">Topic 1 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-cyan-400" />
                The Lifecycle of File Status in Git
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
              <RefreshCw className="w-3 h-3 text-cyan-400" /> State Transition Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Core Workflow Mastery
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
            <RefreshCw className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                The Library Book Borrowing & Publishing Analogy
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Think of files in Git like books in the Barrackpore Public Library:
              </p>
              <ul className="text-slate-300 text-sm sm:text-base space-y-2 list-disc list-inside">
                <li><strong className="text-slate-100">Untracked:</strong> A new manuscript you just wrote in your notebook that has not been cataloged in the library system yet.</li>
                <li><strong className="text-emerald-300">Staged:</strong> You place your manuscript in the librarian's <em className="text-white">"Approved for Binding"</em> tray (<code className="text-cyan-300">git add</code>).</li>
                <li><strong className="text-sky-300">Unmodified:</strong> The book is printed, hardbound, cataloged, and resting safely on the library shelf (<code className="text-cyan-300">git commit</code>).</li>
                <li><strong className="text-amber-300">Modified:</strong> You pull the book from the shelf and highlight 3 sentences in your notebook. Until you submit those edits to the binding tray, the library shelf holds the original version!</li>
              </ul>
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
                Interactive State Transition Machine
              </h2>
              <p className="text-slate-400 text-sm">
                Click on any of the 4 file states to see how Git transitions between them
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {[
              { id: "untracked", label: "Untracked", code: "??" },
              { id: "staged", label: "Staged", code: "M_ / A_" },
              { id: "unmodified", label: "Unmodified", code: "Clean" },
              { id: "modified", label: "Modified", code: "_M" }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveState(st.id)}
                className={`p-4 rounded-xl border text-left transition flex flex-col gap-1 ${
                  activeState === st.id
                    ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/40"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-cyan-300">{st.label}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {st.code}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active State Details */}
          <div className={`p-6 rounded-2xl border ${stateDetails[activeState].color} space-y-4`}>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                {React.createElement(stateDetails[activeState].icon, { className: "w-5 h-5 text-cyan-400" })}
                {stateDetails[activeState].title}
              </h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                {stateDetails[activeState].badge}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {stateDetails[activeState].desc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                How to transition from this state:
              </span>
              <code className="font-mono text-xs text-emerald-400">
                {stateDetails[activeState].action}
              </code>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SHORT STATUS CODE DECODER ──────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Short Status Code Decoder (<code className="text-cyan-300">git status -s</code>)
              </h2>
              <p className="text-slate-400 text-sm">
                Understand the 2-column short status output format used by senior developers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: "??", meaning: "Untracked", desc: "New file in working tree, not yet staged or committed." },
              { code: "A ", meaning: "Staged Addition", desc: "Brand new file staged in index, ready for first commit." },
              { code: " M", meaning: "Unstaged Modified", desc: "Tracked file edited on disk, not yet staged." },
              { code: "M ", meaning: "Staged Modified", desc: "Modifications staged in index, ready for commit." },
              { code: "MM", meaning: "Dual State", desc: "Staged in index, then modified AGAIN on disk before commit." },
              { code: " D", meaning: "Unstaged Deletion", desc: "File deleted on disk, deletion not yet staged." },
              { code: "D ", meaning: "Staged Deletion", desc: "File deletion staged in index, ready for commit." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-cyan-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                    {item.code}
                  </span>
                  <span className="text-xs font-semibold text-white">{item.meaning}</span>
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
                Real-World Failures & Status Misunderstandings
              </h2>
              <p className="text-slate-400 text-sm">
                Critical lifecycle mistakes that cause broken builds and missing code
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> The Untracked Helper File Omission
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A developer created <code className="text-slate-300">utils/validator.js</code> and imported it into <code className="text-slate-300">form.js</code>. They committed <code className="text-slate-300">form.js</code> with <code className="text-cyan-300">git commit -am</code>, but because <code className="text-slate-300">validator.js</code> was Untracked, it was left behind, breaking the CI/CD build!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: `git commit -a` NEVER tracks new untracked files. Always check `git status`!
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> The Accidental `git clean -f` Wipe
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A student had 6 hours of new draft code files in Untracked state. They copied a command <code className="text-slate-300">git clean -df</code> from the web to clean build artifacts. Git instantly deleted all untracked draft files with zero chance of recovery!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Always run `git clean -n` first to preview what would be deleted.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Staged vs Unstaged Code Drift
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A developer tested their code in the browser, saw a bug, fixed it in VS Code, and immediately pushed their commit. The commit contained the PREVIOUS staged bug because they forgot to re-add the fix to the Staging Index!
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Look for 'MM' in `git status -s`—it means your working tree has unstaged fixes.
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
                Classroom Dialogue: Sukanta Sir Unpacks the Lifecycle
              </h2>
              <p className="text-slate-400 text-sm">
                Barrackpore Lab: Sachin, Mahima, and Susmita solve file state mysteries
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Susmita:</span>
              <p className="text-slate-300">
                "Sir, when I run <code className="text-cyan-300">git status -s</code>, I see <code className="text-amber-400">MM server.js</code>. Why is there an M in both columns?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "That is the classic <strong className="text-white">Dual State</strong>, Susmita! The first <code className="text-emerald-400">M</code> (in column 1) means you staged changes to <code className="text-slate-200">server.js</code> into the index. The second <code className="text-rose-400">M</code> (in column 2) means you continued typing in VS Code after staging! If you commit right now, only the first version will be committed. If you want your latest edits included, simply run <code className="text-cyan-300">git add server.js</code> again to update the index snapshot."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Mahima:</span>
              <p className="text-slate-300">
                "Sir, how can I stop tracking a config file like <code className="text-cyan-300">config.json</code> without deleting it from my hard drive?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Use <code className="text-cyan-300">git rm --cached config.json</code>. That command removes the file from Git's index tracking (moving it back to Untracked status) while leaving the physical file untouched on your hard drive. Then add <code className="text-indigo-300">config.json</code> to your <code className="text-indigo-300">.gitignore</code> so it is never accidentally staged again."
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
                Interactive Lab Playground: Test Lifecycle Commands
              </h2>
              <p className="text-slate-400 text-sm">
                Try these commands to observe file lifecycle transitions in your terminal
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 1. Check status in short format:</div>
              <div className="text-cyan-300 select-all">$ git status -s</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 2. Stage a modified file:</div>
              <div className="text-cyan-300 select-all">$ git add app.js</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 3. Unstage without losing edits:</div>
              <div className="text-cyan-300 select-all">$ git restore --staged app.js</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 4. Preview untracked files cleanup safely (dry run):</div>
              <div className="text-cyan-300 select-all">$ git clean -nd</div>
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
                Sukanta Sir's 7 Lifecycle Commandments
              </h2>
              <p className="text-slate-400 text-sm">
                Golden rules to avoid losing work and maintain pristine status hygiene
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Never assume file state; always verify with 'git status -s'.",
              "Rule 2: Understand that 'git commit -a' only applies to tracked files, never untracked files.",
              "Rule 3: Look out for 'MM' dual state before committing to ensure all latest edits are included.",
              "Rule 4: Use 'git restore <file>' to discard working tree modifications safely.",
              "Rule 5: Use 'git restore --staged <file>' to unstage without losing your code.",
              "Rule 6: Never run 'git clean -f' without running 'git clean -n' (dry run) first.",
              "Rule 7: Stop tracking private files safely with 'git rm --cached <file>' and add them to .gitignore."
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
                File status lifecycle and short status questions curated for technical interviews
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="mod2_topic1" />
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

          <PlainTextPrint noteText={noteText} fileName="mod2_topic1_file_lifecycle_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 0: Three-Tree Architecture
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 2: git init vs git clone <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
