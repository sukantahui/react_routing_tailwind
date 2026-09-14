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
  GitCompare,
  Split,
  FileDiff,
  Check
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic 8: Comparing Revisions with git diff: Comparing Working Tree to HEAD, Index to HEAD, and arbitrary commits (git diff commitA commitB)
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [activeDiffMode, setActiveDiffMode] = useState("unstaged");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/7`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/9`;

  const diffModes = {
    unstaged: {
      title: "1. Unstaged (Working Tree vs. Index)",
      cmd: "git diff",
      desc: "Compares current working directory modifications against what is cached in the Staging Area (Index).",
      output: [
        "diff --git a/billing.js b/billing.js",
        "--- a/billing.js",
        "+++ b/billing.js",
        "@@ -4,3 +4,4 @@ function calculateTotal(subtotal) {",
        "   return subtotal + tax;",
        " }",
        "+// Unstaged comment in working directory"
      ],
      badge: "Unstaged Edits",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    staged: {
      title: "2. Staged (Index vs. HEAD)",
      cmd: "git diff --staged",
      desc: "Reveals exactly what will be permanently committed into history if you execute 'git commit' right now.",
      output: [
        "diff --git a/billing.js b/billing.js",
        "--- a/billing.js",
        "+++ b/billing.js",
        "@@ -1,4 +1,4 @@",
        "-function calculateTotal(subtotal) {",
        "+function calculateInvoiceTotal(subtotal) {"
      ],
      badge: "Staged for Commit",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    worktreeHead: {
      title: "3. Working Tree vs. HEAD",
      cmd: "git diff HEAD",
      desc: "Compares all changes in your active workspace (both staged and unstaged) directly against the last commit.",
      output: [
        "diff --git a/billing.js b/billing.js",
        "--- a/billing.js",
        "+++ b/billing.js",
        "@@ -1,4 +1,5 @@",
        "-function calculateTotal(subtotal) {",
        "+function calculateInvoiceTotal(subtotal) {",
        "+// Unstaged comment in working directory"
      ],
      badge: "Total Workspace Diff",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    branchCompare: {
      title: "4. Branch vs. Branch (main vs feature)",
      cmd: "git diff main feature/tax-reform",
      desc: "Compares two branches or commit snapshots to see all differences between their full trees.",
      output: [
        "diff --git a/billing.js b/billing.js",
        "--- a/billing.js",
        "+++ b/billing.js",
        "@@ -2,3 +2,4 @@ function calculateTotal(subtotal) {",
        "-  const tax = subtotal * 0.05;",
        "-  return subtotal + tax;",
        "+  const gst = subtotal * 0.18;",
        "+  const cess = subtotal * 0.01;",
        "+  return subtotal + gst + cess;"
      ],
      badge: "Cross-Branch Snapshot",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
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
                <History className="w-4 h-4" />
                <span>Git Module 001_003 &bull; Topic 8 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Comparing Revisions with <code className="text-cyan-300 font-mono text-lg">git diff</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 7: Inspecting with git show</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 9: Code Forensics with git blame</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: REAL-WORLD MOTIVATION & THE "WHY" ────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-4 h-4" />
              <span>Snapshot Comparison Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Comparing Any Two Points in Space and Time
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              In Git's Three-Tree architecture, modifications constantly flow from your Working Tree to the Staging Area (Index) and into Repository commits. Understanding exactly what <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git diff</code>, <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git diff --staged</code>, and <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git diff A B</code> compare prevents committing half-baked code or shipping regressions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Split className="w-4 h-4" />
                  <span>Unstaged vs Staged Split</span>
                </div>
                <p className="text-slate-400">
                  Know whether changes are still in your editor buffer (<code className="text-sky-300 font-mono">git diff</code>) or locked in the staging cache (<code className="text-sky-300 font-mono">git diff --staged</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <GitCompare className="w-4 h-4" />
                  <span>Two-Dot (..) vs Three-Dot (...)</span>
                </div>
                <p className="text-slate-400">
                  Two-dot compares branch endpoints; three-dot compares from the common merge base (how GitHub displays Pull Requests).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pre-Commit Verification</span>
                </div>
                <p className="text-slate-400">
                  Use <code className="text-purple-300 font-mono">git diff --check</code> to flag leftover conflict markers and trailing whitespace errors before committing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TECHNICAL ARCHITECTURE & INTERACTIVE SIMULATOR ──── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Layers className="w-4 h-4" />
                <span>Interactive Diff Simulator</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Simulate the 4 Core Git Diff Modes
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Switch comparison modes to examine exact diff boundaries
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(diffModes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveDiffMode(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeDiffMode === key
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* Terminal Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>$ <strong className="text-cyan-300">{diffModes[activeDiffMode].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${diffModes[activeDiffMode].color}`}>
                {diffModes[activeDiffMode].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {diffModes[activeDiffMode].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {diffModes[activeDiffMode].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.startsWith("+") && !line.startsWith("+++") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.startsWith("-") && !line.startsWith("---") ? (
                    <span className="text-rose-400 font-semibold">{line}</span>
                  ) : line.startsWith("@@") ? (
                    <span className="text-cyan-400 font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Comparison Boundaries Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Git Diff Target Comparison Rules
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Command Syntax</th>
                  <th className="p-4 text-cyan-400">Left Side (Pre-image)</th>
                  <th className="p-4 text-emerald-400">Right Side (Post-image)</th>
                  <th className="p-4 text-amber-400">Typical Developer Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">git diff</td>
                  <td className="p-4">Staging Area (Index)</td>
                  <td className="p-4">Working Directory</td>
                  <td className="p-4">"What have I typed in my editor that I haven't staged yet?"</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">git diff --staged</td>
                  <td className="p-4">HEAD Commit</td>
                  <td className="p-4">Staging Area (Index)</td>
                  <td className="p-4">"What will be stored if I run 'git commit' right now?"</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">git diff HEAD</td>
                  <td className="p-4">HEAD Commit</td>
                  <td className="p-4">Working Directory</td>
                  <td className="p-4">"Show everything changed in my workspace since last commit."</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">git diff A B</td>
                  <td className="p-4">Snapshot of Commit A</td>
                  <td className="p-4">Snapshot of Commit B</td>
                  <td className="p-4">"What code changed between version 1.0.0 and version 2.0.0?"</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">git diff main...feature</td>
                  <td className="p-4">Common Merge Base</td>
                  <td className="p-4">Tip of feature branch</td>
                  <td className="p-4">"Show Pull Request changes introduced solely on feature."</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 5: SUKANTA HUI CLASSROOM MENTORSHIP DIALOGUE ───────── */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Barrackpore Dev Classroom Mentorship</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Sukanta Sir Mentors Sachin &amp; Swadeep on git diff vs git diff --staged
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Sachin, you just added an 18% GST calculation formula to <code className="text-cyan-300 font-mono">billing.js</code> and ran <code className="text-cyan-300 font-mono">git add billing.js</code>. When you type <code className="text-cyan-300 font-mono">git diff</code>, why is the terminal screen completely blank?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SK
              </div>
              <div>
                <div className="font-semibold text-amber-300 text-xs mb-1">Sachin Kumar (Student)</div>
                <p className="text-slate-300">
                  "Sir, because <code className="text-amber-300 font-mono">git diff</code> compares the Working Directory to the Staging Area! Since I ran <code className="text-amber-300 font-mono">git add</code>, my working directory and the staging area have identical contents!"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Exactly! And Swadeep, how should Sachin inspect the changes he staged before committing?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SS
              </div>
              <div>
                <div className="font-semibold text-purple-300 text-xs mb-1">Swadeep SeniorDev (Student)</div>
                <p className="text-slate-300">
                  "He must run <code className="text-purple-300 font-mono">git diff --staged</code> (or <code className="text-purple-300 font-mono">git diff --cached</code>)! That compares the Staging Area to HEAD, revealing the staged GST formula ready for commit!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: 7 COMMANDMENTS / PRODUCTION RULES ───────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Production Rules</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The 7 Commandments of Revision Comparison with git diff
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always run git diff --staged before git commit",
                desc: "Never commit blindly; inspect your staged diff line-by-line to guarantee zero unintended changes.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Use three-dot diff (A...B) for Pull Requests",
                desc: "git diff main...feature shows changes introduced on feature since it branched, ignoring main's later merges.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use git diff --check to catch conflict residue",
                desc: "Flags stray <<<<<<< and trailing spaces before pushing to remote CI pipelines.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Use -w to ignore re-indentation passes",
                desc: "Eliminates tab-vs-space noise so you can focus strictly on logic changes.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Use --stat for multi-file PR reviews",
                desc: "git diff --stat main feature provides an instant overview of files affected across branches.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Use --no-index for comparing arbitrary disks",
                desc: "git diff --no-index dirA dirB turns Git into an ultra-fast local folder comparison tool.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Leverage --exit-code in CI validation scripts",
                desc: "Makes git diff return exit code 1 if uncommitted drift or formatter differences exist.",
                color: "text-teal-400"
              }
            ].map((cmd) => (
              <div
                key={cmd.num}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex items-start gap-3.5"
              >
                <div className={`text-xl font-mono font-bold ${cmd.color} shrink-0`}>
                  #{cmd.num}
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{cmd.rule}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{cmd.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: AUTOMATED BASH LAB SCRIPT VIEW ──────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Automated Bash Terminal Lab</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              topic8_files/git_diff_revisions_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Mastering Unstaged, Staged, &amp; Cross-Branch Diffs
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct staged/unstaged edits and compare branch revisions across your repository.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_diff_revisions_lab.sh
./git_diff_revisions_lab.sh

# 2. Key Commands Executed:
git diff                 # Unstaged modifications (Working Tree vs Index)
git diff --staged        # Staged modifications (Index vs HEAD)
git diff HEAD            # All workspace edits vs HEAD
git diff main feature/tax-reform # Direct branch comparison`}
            </pre>
          </div>
        </section>

        {/* ─── SECTION 8: FAQ TEMPLATE ────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Developer Clarifications &amp; Edge Cases
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "What is the difference between git diff and git diff --staged?",
                a: "'git diff' compares changes in your working directory that are NOT yet added to the index. 'git diff --staged' (or --cached) compares staged changes in the index against the last commit (HEAD)."
              },
              {
                q: "What does git diff branchA...branchB (three dots) do?",
                a: "Three dots compare the common ancestor (merge base) of branchA and branchB against the tip of branchB, showing only changes introduced on branchB (identical to GitHub Pull Request views)."
              },
              {
                q: "How can I compare two files on disk outside any Git repository?",
                a: "Run 'git diff --no-index fileA.txt fileB.txt'. Git uses its internal Myers diff algorithm on any two arbitrary files."
              },
              {
                q: "How can I ignore indentation/whitespace changes in git diff?",
                a: "Pass '-w' (or '--ignore-all-space') to suppress all whitespace diff hunks."
              },
              {
                q: "What does git diff --check look for?",
                a: "'git diff --check' scans your changes for trailing whitespace, blank lines added at the end of files, and unresolved merge conflict markers."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: QUIZ COMPANION ──────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>Knowledge Verification</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Topic 8 Assessment: Comparing Revisions with <code className="text-cyan-300 font-mono">git diff</code>
          </h2>
          <p className="text-slate-400 text-sm">
            Verify your expertise in staged vs unstaged comparisons, dot ranges, whitespace modifiers, and pre-commit checks.
          </p>

          <QuizSection questions={questions} />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT NOTES ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <FileCode className="w-4 h-4" />
            <span>Printable Study Notes</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Downloadable Quick Revision Reference
          </h2>
          <PlainTextPrint content={noteText} fileName="git_diff_revisions_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER COMPONENT ──────────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BUTTONS ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: Topic 7 – Inspecting with git show</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 9 – Line-by-Line Forensics with git blame</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

// ─── QUIZ SECTION COMPONENT ─────────────────────────────────────────────
function QuizSection({ questions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = questions.find((item) => item.id === parseInt(qId, 10));
    return q && q.correctAnswer === optIdx ? acc + 1 : acc;
  }, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="space-y-6">
        {questions.slice(0, 5).map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-800/80 bg-slate-950/70 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-cyan-400 font-mono uppercase">
                  Question {idx + 1} of {questions.length}
                </span>
                {showResults && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                {q.question}
              </h4>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  let btnClass = "border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800/70";

                  if (isSelected) {
                    btnClass = "border-cyan-500 bg-cyan-950/40 text-cyan-200";
                  }
                  if (showResults) {
                    if (optIdx === q.correctAnswer) {
                      btnClass = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                    } else if (isSelected && !isCorrect) {
                      btnClass = "border-rose-500 bg-rose-950/50 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {showResults && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-cyan-300">Technical Explanation:</div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setShowResults(!showResults)}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition"
        >
          {showResults ? "Hide Explanations" : "Submit & Check Answers"}
        </button>

        {showResults && (
          <div className="text-sm font-semibold text-slate-200">
            Score: <span className="text-cyan-400">{score}</span> / 5 sample questions shown
          </div>
        )}
      </div>
    </div>
  );
}
