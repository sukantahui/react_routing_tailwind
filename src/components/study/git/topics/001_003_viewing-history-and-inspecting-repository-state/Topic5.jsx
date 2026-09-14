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
  FolderTree,
  FileSearch,
  Filter,
  Code
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic 5: Path-Specific History: Tracking commits affecting specific files or folders (git log -- <path>)
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [activePathScenario, setActivePathScenario] = useState("singleFile");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/4`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/6`;

  const pathScenarios = {
    singleFile: {
      title: "1. Single File Evolution",
      cmd: "git log --oneline -- src/tax/gst_calculator.js",
      desc: "Filters out all repository noise and shows only the commits that modified this specific file.",
      output: [
        "c81d290 feat(tax): export calculateGST calculation function",
        "3a4f891 feat(tax): initialize GST calculator with 18% base rate"
      ],
      badge: "Targeted File",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    directoryTree: {
      title: "2. Entire Directory Subsystem",
      cmd: "git log --oneline -- src/tax/",
      desc: "Captures changes across all files and nested folders within the tax module.",
      output: [
        "c81d290 feat(tax): export calculateGST calculation function",
        "98ca7a4 feat(tax): add CGST and SGST split configuration",
        "3a4f891 feat(tax): initialize GST calculator with 18% base rate"
      ],
      badge: "Directory Scope",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    patchDiffs: {
      title: "3. Inline Diffs per Commit (-p)",
      cmd: "git log -p -1 -- src/tax/gst_calculator.js",
      desc: "Displays the commit message along with the exact line-by-line diff patch introduced by that commit.",
      output: [
        "commit c81d290... (HEAD -> main)",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 18:30:00 2026 +0530",
        "",
        "    feat(tax): export calculateGST calculation function",
        "",
        "diff --git a/src/tax/gst_calculator.js b/src/tax/gst_calculator.js",
        "--- a/src/tax/gst_calculator.js",
        "+++ b/src/tax/gst_calculator.js",
        "@@ -1,1 +1,2 @@",
        " const GST_RATE = 0.18;",
        "+function calculateGST(amt) { return amt * 0.18; }"
      ],
      badge: "Patch Inspection",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    wildcardGlob: {
      title: "4. Wildcard Glob Pattern (*.sql)",
      cmd: "git log --oneline -- \"*.sql\"",
      desc: "Matches all database migration scripts across the entire repository regardless of folder depth.",
      output: [
        "e4a9012 feat(db): add 2026_09_14_create_invoices.sql",
        "98ca7a4 feat(db): add 2026_09_10_create_customers.sql"
      ],
      badge: "Glob Pattern",
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
                <span>Git Module 001_003 &bull; Topic 5 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Path-Specific History: <code className="text-cyan-300 font-mono text-lg">git log -- &lt;path&gt;</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 4: Grep Messages</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 6: Detailed Diffs &amp; Stats</span>
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
              <span>Targeted Code Forensics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Focus Strictly on the File You Are Debugging
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              In large production monorepos with hundreds of microservices and frontend modules, 99% of repository commits have nothing to do with the specific file on your screen. Pathspec filtering allows you to isolate the chronological lifetime of an exact file, folder, or glob pattern, discovering who modified it and why.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <FileSearch className="w-4 h-4" />
                  <span>The Double-Dash (--) Guard</span>
                </div>
                <p className="text-slate-400">
                  Prevents catastrophic ambiguities between branch names and filenames (e.g., <code className="text-sky-300 font-mono">git log -- file.js</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <FolderTree className="w-4 h-4" />
                  <span>Subsystem Scoping</span>
                </div>
                <p className="text-slate-400">
                  Inspect entire architectural modules (e.g. <code className="text-emerald-300 font-mono">src/billing/</code>) to review cross-component refactors.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Code className="w-4 h-4" />
                  <span>Inline Patch History (-p)</span>
                </div>
                <p className="text-slate-400">
                  Watch code grow line-by-line across every commit with full unified diff rendering.
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
                <span>Interactive Pathspec Explorer</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Simulate Path-Specific History Queries
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Select a path scenario to inspect command syntax and simulated terminal output
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(pathScenarios).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActivePathScenario(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activePathScenario === key
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
                <span>Terminal Query: <strong className="text-cyan-300">{pathScenarios[activePathScenario].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${pathScenarios[activePathScenario].color}`}>
                {pathScenarios[activePathScenario].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {pathScenarios[activePathScenario].desc}
            </p>

            {/* Terminal Output */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {pathScenarios[activePathScenario].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.startsWith("+") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.startsWith("-") ? (
                    <span className="text-rose-400 font-semibold">{line}</span>
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
            <span>Pathspec Syntax Cheat Sheet</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Pathspec Patterns &amp; Modifiers
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Pathspec Type</th>
                  <th className="p-4 text-cyan-400">Syntax Example</th>
                  <th className="p-4 text-emerald-400">Behavior &amp; Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">Exact File</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -- src/index.js</td>
                  <td className="p-4">Logs commits modifying strictly 'src/index.js'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">Directory Tree</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -- src/components/</td>
                  <td className="p-4">Logs commits touching any file in 'src/components/' or its subfolders.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">Wildcard Glob</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -- "*.sql"</td>
                  <td className="p-4">Matches all files matching the glob anywhere in the repository tree.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">Exclude Magic Path</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -- ":(exclude)tests/"</td>
                  <td className="p-4">Excludes commits whose changes were isolated purely inside 'tests/'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">Deleted File</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -- legacy_api.js</td>
                  <td className="p-4">Shows complete historical records up to and including when the file was removed.</td>
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
            Sukanta Sir Mentors Swadeep &amp; Mahima on Pathspec Disambiguation
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Swadeep, suppose you create a feature branch named <code className="text-cyan-300 font-mono">tax_calc.js</code>, and there is also a source file on disk named <code className="text-cyan-300 font-mono">tax_calc.js</code>. If you run <code className="text-cyan-300 font-mono">git log tax_calc.js</code>, what will happen?"
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
                  "Sir, Git gets confused because <code className="text-purple-300 font-mono">tax_calc.js</code> matches both a branch reference and a file path on disk! Git throws an ambiguous argument warning."
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
                  "Exactly! And Mahima, how do we explicitly tell Git: 'Treat this as a file path, NOT a branch'?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                MM
              </div>
              <div>
                <div className="font-semibold text-emerald-300 text-xs mb-1">Mahima Mitra (Student)</div>
                <p className="text-slate-300">
                  "We put the double-dash <code className="text-emerald-300 font-mono">--</code> separator before the path! Running <code className="text-emerald-300 font-mono">git log -- tax_calc.js</code> tells Git unambiguously that everything after the double-dash is a file pathspec!"
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
            The 7 Commandments of Path-Specific History
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always include the double-dash (--) separator",
                desc: "Never run git log <filename> without -- to prevent naming collision with branches or tags.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Always quote glob wildcards in shell commands",
                desc: "Run git log -- '*.sql' so your shell does not expand the glob before passing it to Git.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use -p to see exact line changes per commit",
                desc: "Combining git log -p -- <file> lets you understand not just that a file changed, but what changed.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Use trailing slashes for directory pathspecs",
                desc: "Explicitly write git log -- src/tax/ to make directory tree intentions clear.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Use git log -- <deleted_file> to recover lost context",
                desc: "Git keeps the history of deleted files intact; query its path to find out why it was removed.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Combine pathspecs with author filters",
                desc: "Running git log --author='Susmita' -- src/api.js isolates a specific engineer's work on that file.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Remember --follow is required for renamed files",
                desc: "Standard pathspec logging stops at renames; use --follow if the file was ever renamed (Topic 12).",
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
              topic5_files/git_log_pathspec_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Scoped History Tracking
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct a multi-directory project and practice pathspec queries.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_pathspec_lab.sh
./git_log_pathspec_lab.sh

# 2. Key Commands Executed:
git log --oneline -- src/tax/gst_calculator.js
git log --oneline -- src/tax/
git log -p -2 -- src/tax/gst_calculator.js`}
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
                q: "Why do I need the double dash (--) before file paths in git log?",
                a: "The double-dash '--' explicitly separates Git flags and branch revisions from filesystem paths, preventing ambiguities when a branch and a file share the same name."
              },
              {
                q: "Can I inspect the commit history of a file that has been deleted?",
                a: "Yes. Git remembers all historical snapshots. Running 'git log -- path/to/deleted_file.js' outputs all commits that affected the file up to and including its deletion."
              },
              {
                q: "How can I see commits for multiple unrelated files simultaneously?",
                a: "List the paths separated by spaces after the double-dash: 'git log --oneline -- fileA.js fileB.js'."
              },
              {
                q: "Why does git log -- <path> stop showing commits after a file was renamed?",
                a: "By default, Git evaluates history strictly based on the current file path. To follow the file across past renames and directory moves, pass the '--follow' flag."
              },
              {
                q: "How can I exclude a specific directory like 'tests/' from my log search?",
                a: "Use the exclusion magic pathspec: 'git log -- \":(exclude)tests/\"'."
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
            Topic 5 Assessment: Path-Specific History &amp; Scoping
          </h2>
          <p className="text-slate-400 text-sm">
            Verify your skills in pathspec disambiguation, directory traversal, wildcard globs, and inline patch inspection.
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
          <PlainTextPrint content={noteText} fileName="git_log_pathspec_notes.txt" />
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
            <span>Prev: Topic 4 – Grep Messages</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 6 – Detailed Diffs &amp; Modification Stats</span>
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
