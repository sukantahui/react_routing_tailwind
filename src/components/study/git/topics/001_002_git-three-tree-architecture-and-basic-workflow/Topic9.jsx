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
  Eye,
  GitCompare,
  FileDiff,
  Code2
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
 * Topic 9: Inspecting Unstaged vs Staged Changes: git diff (working tree vs index) and git diff --staged (index vs HEAD)
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [activeDiffMode, setActiveDiffMode] = useState("unstaged");

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 9;
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
                <span className="text-cyan-400">Topic 9 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <GitCompare className="w-8 h-8 text-cyan-400" />
                Inspecting Diff: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git diff vs git diff --staged</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Line-by-Line Code Inspection
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Viewing Code Mutations Across the Three Trees
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              While <code className="text-cyan-300 font-mono">git status</code> reveals <em>which</em> files were touched, 
              <code className="text-cyan-300 font-mono mx-1">git diff</code> shows the exact line-by-line additions, deletions, and replacements. 
              By mastering the difference between <code className="text-amber-300 font-mono">git diff</code> (Unstaged on disk vs Staging Index) and 
              <code className="text-emerald-300 font-mono">git diff --staged</code> (Staged Index vs HEAD), you gain complete control over your code history before committing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Unstaged Diff (`git diff`)
                </h3>
                <p className="text-slate-400 text-xs">
                  Inspects modifications in your working tree that have NOT yet been staged with `git add`.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Staged Diff (`--staged`)
                </h3>
                <p className="text-slate-400 text-xs">
                  Audits the exact changes queued in the Staging Index that will form the next commit snapshot.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Total Diff (`git diff HEAD`)
                </h3>
                <p className="text-slate-400 text-xs">
                  Reveals the sum total of all uncommitted work residing across both working tree and staging index.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE THREE-TREE DIFF COMPARATOR ────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Three-Tree Diff Visualizer</h2>
              <p className="text-slate-400 text-sm">Toggle comparison modes to inspect real-time unified diff output</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Diff Mode Selector */}
            <div className="lg:col-span-4 space-y-3">
              <button
                onClick={() => setActiveDiffMode("unstaged")}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeDiffMode === "unstaged"
                    ? "bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-amber-300">git diff</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                    Unstaged
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">Working Tree vs Index</h4>
                <p className="text-[11px] text-slate-400 mt-1">Shows edits on disk not yet added to staging.</p>
              </button>

              <button
                onClick={() => setActiveDiffMode("staged")}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeDiffMode === "staged"
                    ? "bg-emerald-500/10 border-emerald-400 shadow-md shadow-emerald-500/10"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-emerald-300">git diff --staged</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Staged
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">Index vs HEAD</h4>
                <p className="text-[11px] text-slate-400 mt-1">Shows changes ready for `git commit`.</p>
              </button>

              <button
                onClick={() => setActiveDiffMode("head")}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeDiffMode === "head"
                    ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                    : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-300">git diff HEAD</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Total
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">Working Tree vs HEAD</h4>
                <p className="text-[11px] text-slate-400 mt-1">Shows all uncommitted edits across entire repo.</p>
              </button>
            </div>

            {/* Simulated Diff Terminal Pane */}
            <div className="lg:col-span-8 bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Terminal Output: <code className="text-cyan-300">{activeDiffMode === "unstaged" ? "git diff" : activeDiffMode === "staged" ? "git diff --staged" : "git diff HEAD"}</code>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Target: tax.js
                </span>
              </div>

              {/* Dynamic Diff Content */}
              {activeDiffMode === "unstaged" && (
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto space-y-0.5 leading-relaxed">
                  <div className="text-slate-500">diff --git a/tax.js b/tax.js</div>
                  <div className="text-slate-500">--- a/tax.js (Staging Index)</div>
                  <div className="text-slate-500">+++ b/tax.js (Working Tree on Disk)</div>
                  <div className="text-cyan-400">@@ -8,4 +8,6 @@</div>
                  <div className="text-slate-400"> function calculateGST(amount) {"{"}</div>
                  <div className="text-slate-400">   const rate = 0.18;</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  console.log("DEBUG: raw amount input", amount);</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  const rounded = Math.round(amount * rate * 100) / 100;</div>
                  <div className="text-rose-400 bg-rose-950/30 px-1">-  return amount * rate;</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  return rounded;</div>
                  <div className="text-slate-400"> {"}"}</div>
                </div>
              )}

              {activeDiffMode === "staged" && (
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto space-y-0.5 leading-relaxed">
                  <div className="text-slate-500">diff --git a/tax.js b/tax.js</div>
                  <div className="text-slate-500">--- a/tax.js (HEAD Commit)</div>
                  <div className="text-slate-500">+++ b/tax.js (Staging Index)</div>
                  <div className="text-cyan-400">@@ -1,5 +1,8 @@</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+export const TAX_BRACKETS = {"{"}</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  standard: 0.18,</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  exempt: 0.00</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+{"}"};</div>
                  <div className="text-slate-400"> </div>
                  <div className="text-slate-400"> function calculateGST(amount) {"{"}</div>
                </div>
              )}

              {activeDiffMode === "head" && (
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto space-y-0.5 leading-relaxed">
                  <div className="text-slate-500">diff --git a/tax.js b/tax.js</div>
                  <div className="text-slate-500">--- a/tax.js (HEAD Commit)</div>
                  <div className="text-slate-500">+++ b/tax.js (Working Tree on Disk)</div>
                  <div className="text-cyan-400">@@ -1,5 +1,12 @@</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+export const TAX_BRACKETS = {"{"} standard: 0.18, exempt: 0.00 {"}"};</div>
                  <div className="text-slate-400"> function calculateGST(amount) {"{"}</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  console.log("DEBUG: raw amount input", amount);</div>
                  <div className="text-rose-400 bg-rose-950/30 px-1">-  return amount * 0.18;</div>
                  <div className="text-emerald-400 bg-emerald-950/30 px-1">+  return Math.round(amount * 0.18 * 100) / 100;</div>
                  <div className="text-slate-400"> {"}"}</div>
                </div>
              )}

              <div className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <strong className="text-cyan-300">Auditing Insight: </strong>
                {activeDiffMode === "unstaged" && "This diff represents what will be staged if you run `git add tax.js`."}
                {activeDiffMode === "staged" && "This diff represents what will be committed if you run `git commit` right now."}
                {activeDiffMode === "head" && "This diff represents the cumulative difference between your physical files on disk and the latest committed snapshot in HEAD."}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: UNIFIED DIFF SYNTAX BREAKDOWN ─────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <FileDiff className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Anatomy of the Unified Diff Format</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-slate-300 font-bold">--- a/path +++ b/path</span>
              <p className="text-slate-400">`a/` designates the baseline source; `b/` designates the modified target version.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">@@ -l,s +l,s @@</span>
              <p className="text-slate-400">Hunk header showing starting line `l` and line count `s` in old (-) and new (+) files.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-bold">- deleted line</span>
              <p className="text-slate-400">Prefixed with `-` in red: line was removed or replaced from the baseline version.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold">+ added line</span>
              <p className="text-slate-400">Prefixed with `+` in green: line was added or inserted in the target version.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & REAL-WORLD SCENARIO ────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Invisible Blank Diff</h2>
              <p className="text-slate-400 text-sm">Susmita asking why `git diff` returned nothing after `git add`</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Susmita's Panic
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Susmita added 40 lines of code to <code className="text-cyan-300 font-mono">InvoiceGenerator.jsx</code>. She ran <code className="text-cyan-300 font-mono">git add .</code> to stage it. 
                Immediately after, she typed <code className="text-cyan-300 font-mono">git diff</code> to review her work.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                The terminal printed nothing and immediately returned to the command prompt. Susmita panicked: <em>"Sir! Did Git wipe out all my changes? `git diff` is completely empty!"</em>
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Sukanta's Three-Tree Explanation
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta smiled and explained: <em>"`git diff` compares your Working Directory against the Staging Area Index. When you ran `git add .`, you synchronized your Working Tree with your Staging Area. Because they are identical right now, there is zero diff between them!"</em>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                <em>"To see what you are about to commit, compare the Staging Area against HEAD by running <code>git diff --staged</code>!"</em> Susmita ran it, and all 40 lines appeared in bright green.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF GIT DIFF ────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Diff Inspection</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Diff Before Add</span>
              <p className="text-slate-400">Run `git diff` before `git add` to review what changes exist on disk.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Diff --staged Before Commit</span>
              <p className="text-slate-400">Run `git diff --staged` before `git commit` to audit the upcoming snapshot.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Use -w to Strip Whitespace</span>
              <p className="text-slate-400">`git diff -w` filters out indentation noise when auditing logic changes.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Word Diff for Precision</span>
              <p className="text-slate-400">Use `git diff --word-diff` to highlight small variable changes inside long lines.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Stat Summaries for Large PRs</span>
              <p className="text-slate-400">Run `git diff --stat` to get a file-by-file count of insertions and deletions.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Scope Diffs by Path</span>
              <p className="text-slate-400">Use `git diff -- path/to/file` to isolate diff inspection on a single file.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Check Whitespace Errors</span>
              <p className="text-slate-400">Run `git diff --check` to catch trailing spaces and broken conflict markers.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic9_files/git_diff_inspection_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to construct simultaneous staged and unstaged modifications in <code className="text-cyan-300 font-mono">calculation.js</code> and run <code className="text-cyan-300 font-mono">git diff</code>, <code className="text-cyan-300 font-mono">git diff --staged</code>, and <code className="text-cyan-300 font-mono">git diff HEAD</code>.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic9_files/git_diff_inspection_lab.sh`}</pre>
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
                question: "Why is `git diff --cached` identical to `git diff --staged`?",
                answer: "In early versions of Git, the staging area was referred to primarily as the 'cache' (hence `git diff --cached`). In newer versions of Git, `--staged` was added as an alias because 'staging area' is easier for developers to understand. Both flags execute the exact same operation."
              },
              {
                question: "Can I use `git diff` to compare two arbitrary files that aren't in a Git repo?",
                answer: "Yes! Running `git diff --no-index file1.txt file2.txt` uses Git's powerful colorized diff engine to compare any two files on your filesystem."
              },
              {
                question: "How do I see diffs between two commits from 3 weeks ago?",
                answer: "Pass the two commit hashes: `git diff <old-sha> <new-sha>`."
              },
              {
                question: "What is the difference between `git diff A..B` and `git diff A...B`?",
                answer: "`git diff A..B` compares the exact tips of branch A and branch B. `git diff A...B` (triple-dot) compares the common ancestor (merge base) of A and B against the tip of B, showing only what was introduced on branch B."
              },
              {
                question: "How can I launch a visual side-by-side diff tool from Git?",
                answer: "Run `git difftool` (or `git difftool --staged`). You can configure VS Code or Beyond Compare as your default difftool via `git config --global diff.tool vscode`."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 9 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of Git diff comparison trees, unified diff syntax, hunk headers, and filtering flags.
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
            <span className="text-xs text-slate-400 font-mono">topic9_files/topic9_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic9_git_diff_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 8 (Conventional Commits)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 10 (Ignoring Files with .gitignore) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
