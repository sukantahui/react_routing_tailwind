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
  HelpCircle,
  Sparkles,
  Layers,
  FolderGit2,
  Zap,
  Users,
  PlusSquare,
  Filter,
  Trash2,
  FolderTree
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic 4: Staging Changes: git add <file>, git add . vs git add -A (understanding deletions vs new files)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [activeCommand, setActiveCommand] = useState("file");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 4;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const commandDetails = {
    file: {
      cmd: "git add src/Invoice.jsx",
      scope: "Single Target File",
      newFiles: "Yes (if target is new)",
      modifications: "Yes (if target is modified)",
      deletions: "Yes (if target was deleted)",
      safety: "Ultra Safe & Targeted",
      description: "Stages changes strictly for the specified file path. Zero risk of accidentally staging unrelated files or secrets."
    },
    dir: {
      cmd: "git add src/components/",
      scope: "Directory Subtree",
      newFiles: "Yes (inside dir)",
      modifications: "Yes (inside dir)",
      deletions: "Yes (inside dir)",
      safety: "Scoped & Modular",
      description: "Stages all additions, edits, and deletions located inside the given folder tree, ignoring outside files."
    },
    dot: {
      cmd: "git add .",
      scope: "Current Directory downwards",
      newFiles: "Yes (current dir & children)",
      modifications: "Yes (current dir & children)",
      deletions: "Yes (in Git 2.0+)",
      safety: "Moderate (path-dependent)",
      description: "Stages everything from your current terminal directory down. Does NOT stage changes in parent directories above '.'!"
    },
    all: {
      cmd: "git add -A (or git add --all)",
      scope: "Entire Repository Root",
      newFiles: "Yes (Everywhere)",
      modifications: "Yes (Everywhere)",
      deletions: "Yes (Everywhere)",
      safety: "Broad (requires .gitignore)",
      description: "Stages all additions, modifications, and deletions across the entire repository regardless of which subdirectory your terminal is in."
    },
    update: {
      cmd: "git add -u (or git add --update)",
      scope: "Tracked Files ONLY",
      newFiles: "NO (Ignores untracked ?? files)",
      modifications: "Yes (All tracked files)",
      deletions: "Yes (All tracked files)",
      safety: "Very Safe for refactoring",
      description: "Stages all edits and deletions of already-tracked files, ensuring no new untracked temporary files accidentally enter the index."
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
                <span className="text-cyan-400">Topic 4 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <PlusSquare className="w-8 h-8 text-cyan-400" />
                Staging Changes: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git add . vs git add -A</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Intentional Curation vs Accidental Staging
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The Art of Curating the Staging Area Index
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Many developers fall into the habit of blindly typing <code className="text-amber-300 font-mono">git add .</code> for every commit. 
              In professional engineering, staging is your curation canvas. Understanding the precise behavior of 
              <code className="text-cyan-300 font-mono mx-1">git add &lt;file&gt;</code>, 
              <code className="text-cyan-300 font-mono mx-1">git add .</code>, 
              <code className="text-cyan-300 font-mono mx-1">git add -A</code>, and 
              <code className="text-cyan-300 font-mono mx-1">git add -u</code> ensures you stage only what is intended, cleanly handling deletions and preventing secret leaks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Pathspec Scoping
                </h3>
                <p className="text-slate-400 text-xs">
                  Learn how directory scoping works and why `.` behaves differently when inside subfolders.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-rose-300 mb-1 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Deletion Handling
                </h3>
                <p className="text-slate-400 text-xs">
                  Discover how modern Git tracks removed files without requiring manual deletion commands.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Secret Protection
                </h3>
                <p className="text-slate-400 text-xs">
                  Avoid the junior developer pitfall of staging `.env` tokens or temporary test logs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE STAGING COMMAND EXPLORER ─────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Staging Variation Explorer</h2>
              <p className="text-slate-400 text-sm">Compare behavioral guarantees across all `git add` options</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Command Navigation List */}
            <div className="lg:col-span-4 space-y-2">
              {Object.keys(commandDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCommand(key)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    activeCommand === key
                      ? "bg-cyan-500/10 border-cyan-400/50 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-cyan-300 mb-1">
                    {commandDetails[key].cmd}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Scope: {commandDetails[key].scope}</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {commandDetails[key].safety}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Command Detail Card */}
            <div className="lg:col-span-8 bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono text-sm text-cyan-300 font-bold">
                  {commandDetails[activeCommand].cmd}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {commandDetails[activeCommand].scope}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {commandDetails[activeCommand].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Stages New Files (??):</span>
                  <strong className="text-emerald-400 font-mono">{commandDetails[activeCommand].newFiles}</strong>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Stages Modifications (M):</span>
                  <strong className="text-cyan-400 font-mono">{commandDetails[activeCommand].modifications}</strong>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block mb-1">Stages Deletions (D):</span>
                  <strong className="text-amber-400 font-mono">{commandDetails[activeCommand].deletions}</strong>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                <strong className="text-cyan-300">Operational Guideline: </strong>
                {activeCommand === "update" && "Use when you have made refactorings across existing files and want zero risk of staging new temporary or mock files."}
                {activeCommand === "file" && "The gold standard for crafting clean, atomic single-concern commits."}
                {activeCommand === "dir" && "Ideal when completing a self-contained component or API endpoint residing in a folder."}
                {activeCommand === "dot" && "Safe when run from project root with a properly configured .gitignore."}
                {activeCommand === "all" && "Equivalent to root-level staging. Captures all files across the whole repo."}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD STAGING MATRIX ────────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <FolderTree className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Comparative Staging Matrix: Git 2.0+ Standard</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">Invocation</th>
                  <th className="p-3 font-semibold">New Untracked Files (??)</th>
                  <th className="p-3 font-semibold">Modified Tracked Files ( M)</th>
                  <th className="p-3 font-semibold">Deleted Files ( D)</th>
                  <th className="p-3 font-semibold">Subdirectory Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">git add &lt;file&gt;</td>
                  <td className="p-3 text-emerald-400">Target only</td>
                  <td className="p-3 text-cyan-400">Target only</td>
                  <td className="p-3 text-amber-400">Target only</td>
                  <td className="p-3 text-slate-400">Exact path</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">git add .</td>
                  <td className="p-3 text-emerald-400">Yes (inside .)</td>
                  <td className="p-3 text-cyan-400">Yes (inside .)</td>
                  <td className="p-3 text-emerald-400">Yes (inside .)</td>
                  <td className="p-3 text-amber-400 font-semibold">Current folder & children ONLY</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">git add -A / --all</td>
                  <td className="p-3 text-emerald-400">Yes (Repo-wide)</td>
                  <td className="p-3 text-cyan-400">Yes (Repo-wide)</td>
                  <td className="p-3 text-emerald-400">Yes (Repo-wide)</td>
                  <td className="p-3 text-emerald-400 font-semibold">Entire Repository Root</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">git add -u / --update</td>
                  <td className="p-3 text-red-400 font-bold">NO (Skipped)</td>
                  <td className="p-3 text-cyan-400">Yes (Tracked)</td>
                  <td className="p-3 text-emerald-400">Yes (Tracked)</td>
                  <td className="p-3 text-emerald-400">Repo-wide tracked</td>
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
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Subdirectory Mystery</h2>
              <p className="text-slate-400 text-sm">Debangshu and Swadeep debugging nested terminal staging</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Confusion Encountered
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu was in the terminal located in <code className="text-cyan-300 font-mono">my-project/src/components/</code>. He modified <code className="text-cyan-300 font-mono">Button.jsx</code> and also updated the root <code className="text-cyan-300 font-mono">README.md</code>.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                He ran <code className="text-cyan-300 font-mono">git add .</code> followed by <code className="text-cyan-300 font-mono">git commit -m "docs & ui update"</code>.
                When Swadeep checked GitHub, <code className="text-cyan-300 font-mono">README.md</code> was NOT updated! Debangshu insisted: <em>"I ran git add dot!"</em>
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> The Mentor's Explanation
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui explained: <em>"In UNIX and Git, '.' stands for the current working directory. Because your terminal was inside <code>src/components/</code>, <code>git add .</code> only staged files inside that subdirectory. It never looked at <code>README.md</code> in the parent root!"</em>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong>Solution:</strong> Either navigate to root (<code className="text-cyan-300 font-mono">cd ../..</code>) or use <code className="text-cyan-300 font-mono">git add -A</code> to stage repo-wide regardless of current location.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF GIT ADD ────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Safe Staging</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Check Status Before Add</span>
              <p className="text-slate-400">Always run `git status -s` prior to adding to avoid surprise files entering the index.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Use git add -u for Refactors</span>
              <p className="text-slate-400">When modifying existing files, `-u` prevents temporary files from getting staged.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Remember Directory Scope</span>
              <p className="text-slate-400">`git add .` is scoped to the current directory; use `git add -A` for whole-repo staging.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Quote Path Wildcards</span>
              <p className="text-slate-400">Use `git add '*.js'` with quotes to let Git search subdirectories recursively.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Never Force Secrets</span>
              <p className="text-slate-400">Never use `git add -f` on `.env` or configuration tokens containing real keys.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Unstage Mistakes Instantly</span>
              <p className="text-slate-400">Accidental stage? Run `git restore --staged &lt;file&gt;` immediately.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Atomic Scope Commitment</span>
              <p className="text-slate-400">Stage files related to one logical bug fix or feature per commit.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic4_files/git_add_variations_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this lab script to witness the behavioral difference between <code className="text-cyan-300 font-mono">git add -u</code>, <code className="text-cyan-300 font-mono">git add .</code>, and low-level index inspection with <code className="text-cyan-300 font-mono">git ls-files --stage</code>.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic4_files/git_add_variations_lab.sh`}</pre>
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
                question: "What is the difference between `git add *` and `git add .`?",
                answer: "`git add *` relies on your shell expanding the wildcard, which misses dotfiles (like `.gitignore` or `.env.example`) and fails if there are thousands of files. `git add .` is handled natively by Git's pathspec engine, processing all hidden files and folders safely."
              },
              {
                question: "Does `git add` upload my files to GitHub or remote servers?",
                answer: "No! `git add` is a purely local operation that stages files into `.git/index` on your local hard drive. Remote synchronization only occurs when you run `git push`."
              },
              {
                question: "If I run `git add` on a large binary file by mistake, how do I remove it?",
                answer: "Run `git restore --staged <file>` to unstage it from the index. To keep it untracked permanently, add its pattern to `.gitignore`."
              },
              {
                question: "Why does `git add` create files in `.git/objects/` before I even commit?",
                answer: "Because Git computes the SHA-1 hash and zlib-compresses the contents immediately during staging to store the immutable blob object, ready for tree linking during commit."
              },
              {
                question: "What does `git rm --cached <file>` do?",
                answer: "It deletes the file from the Git index (staging area) while leaving the physical file untouched on your hard drive. This is the classic technique to untrack a file that was committed by mistake."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 4 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your mastery of Git staging command variations, pathspec scoping, and deletion handling.
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
            <span className="text-xs text-slate-400 font-mono">topic4_files/topic4_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic4_git_add_variations_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 3 (Inspecting Status)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 5 (Interactive Staging: git add -p) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
