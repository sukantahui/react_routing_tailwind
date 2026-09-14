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
  BarChart2,
  FileDiff,
  PlusCircle,
  MinusCircle
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic 6: Viewing Detailed Changes in Log: git log -p (inline diffs) and git log --stat (file modification statistics)
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [activeDiffView, setActiveDiffView] = useState("statView");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/5`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/7`;

  const diffViews = {
    statView: {
      title: "1. Modification Statistics (--stat)",
      cmd: "git log --stat -1",
      desc: "Summarizes file change counts, visual histograms, and total insertions/deletions for high-level review.",
      output: [
        "commit 7b1e4a8c90df1b8943f25c81d3920e872ba18512 (HEAD -> main)",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 18:30:15 2026 +0530",
        "",
        "    fix(invoice): fix floating point rounding on total invoice amount",
        "",
        " invoice_service.js | 2 +-",
        " README.md          | 4 ++++",
        " 2 files changed, 5 insertions(+), 1 deletion(-)"
      ],
      badge: "High-Level Metrics",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    patchView: {
      title: "2. Inline Unified Diff Patch (-p)",
      cmd: "git log -p -1",
      desc: "Renders the full unified diff showing exact line insertions and deletions underneath the commit message.",
      output: [
        "commit 7b1e4a8c90df1b8943f25c81d3920e872ba18512 (HEAD -> main)",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 18:30:15 2026 +0530",
        "",
        "    fix(invoice): fix floating point rounding on total invoice amount",
        "",
        "diff --git a/invoice_service.js b/invoice_service.js",
        "--- a/invoice_service.js",
        "+++ b/invoice_service.js",
        "@@ -8,3 +8,3 @@ InvoiceService.prototype.createInvoice = function(amount, taxRate) {",
        "   const tax = amount * (taxRate / 100);",
        "-  const total = amount + tax;",
        "+  const total = Number((amount + tax).toFixed(2));",
        "   return { amount, tax, total };"
      ],
      badge: "Line-by-Line Forensics",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    numstatView: {
      title: "3. Machine-Readable Numbers (--numstat)",
      cmd: "git log --numstat -1 --oneline",
      desc: "Outputs raw integer counts (<added>\\t<deleted>\\t<filename>) perfect for automated scripts and CI pipelines.",
      output: [
        "7b1e4a8 fix(invoice): fix floating point rounding on total invoice amount",
        "1\t1\tinvoice_service.js",
        "4\t0\tREADME.md"
      ],
      badge: "CI / Automation Ready",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
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
                <span>Git Module 001_003 &bull; Topic 6 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Viewing Detailed Changes: <code className="text-cyan-300 font-mono text-lg">git log -p</code> &amp; <code className="text-cyan-300 font-mono text-lg">git log --stat</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 5: Path-Specific History</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 7: Inspecting with git show</span>
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
              <span>Inspection &amp; Verification Mastery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Moving Beyond Commit Messages into Actual Code Changes
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              A commit message tells you what the developer <em>intended</em> to do; the diff shows you what they <em>actually did</em>. When conducting code reviews, investigating regressions, or auditing pull requests, combining <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">--stat</code> (for broad file metrics) and <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">-p</code> (for exact unified patches) gives you complete transparency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>--stat Overview</span>
                </div>
                <p className="text-slate-400">
                  Quickly assesses scope: displays modified files and visual +/- histogram bars to spot bloated commits immediately.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <FileDiff className="w-4 h-4" />
                  <span>-p Inline Unified Diff</span>
                </div>
                <p className="text-slate-400">
                  Inspects line-level mutations: hunk coordinates, green additions (<code className="text-emerald-300 font-mono">+</code>), and red deletions (<code className="text-rose-300 font-mono">-</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>--numstat Scriptability</span>
                </div>
                <p className="text-slate-400">
                  Tab-delimited numbers for DevOps scripts to calculate team velocity, code churn, and test-to-code ratios.
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
                <span>Interactive Diff Inspector</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Compare Diff &amp; Stat Output Formats
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Switch inspection views to examine terminal formats
            </span>
          </div>

          {/* View Mode Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(diffViews).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveDiffView(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeDiffView === key
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
                <span>$ <strong className="text-cyan-300">{diffViews[activeDiffView].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${diffViews[activeDiffView].color}`}>
                {diffViews[activeDiffView].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {diffViews[activeDiffView].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {diffViews[activeDiffView].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.startsWith("+") && !line.startsWith("+++") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.startsWith("-") && !line.startsWith("---") ? (
                    <span className="text-rose-400 font-semibold">{line}</span>
                  ) : line.startsWith("@@") ? (
                    <span className="text-cyan-400 font-bold">{line}</span>
                  ) : line.includes("changed,") ? (
                    <span className="text-amber-300 font-bold">{line}</span>
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
            <span>Diff &amp; Stat Flag Comparison</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Inspection Flag Matrix
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Flag</th>
                  <th className="p-4 text-cyan-400">Level of Detail</th>
                  <th className="p-4 text-purple-400">Primary Output Content</th>
                  <th className="p-4 text-emerald-400">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">git log --stat</td>
                  <td className="p-4 text-sky-400">High-Level Summary</td>
                  <td className="p-4">File list, +/- histogram bars, insertion/deletion counts</td>
                  <td className="p-4">Code reviews and PR sizing</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">git log -p (or --patch)</td>
                  <td className="p-4 text-emerald-400">Full Granular</td>
                  <td className="p-4">Unified diff hunks showing exact added/removed lines</td>
                  <td className="p-4">Debugging bugs and forensic code tracing</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">git log --shortstat</td>
                  <td className="p-4 text-slate-400">Ultra-Compact</td>
                  <td className="p-4">Single line: 'X files changed, Y insertions(+), Z deletions(-)'</td>
                  <td className="p-4">Quick quantitative commit summaries</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">git log --numstat</td>
                  <td className="p-4 text-amber-400">Machine Data</td>
                  <td className="p-4">Tab-separated raw integers: &lt;added&gt;\t&lt;deleted&gt;\t&lt;path&gt;</td>
                  <td className="p-4">DevOps analytics and bash scripting</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-cyan-300 font-bold">git log -p -w</td>
                  <td className="p-4 text-emerald-400">Noise-Free Patch</td>
                  <td className="p-4">Unified diff ignoring all indentation/whitespace shifts</td>
                  <td className="p-4">Reviewing code after linter or Prettier reformatting</td>
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
            Sukanta Sir Mentors Sachin &amp; Susmita on Code Review Forensics
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Sachin, when a developer submits a pull request with the commit message 'refactor: tidy code', how do you verify if they accidentally modified business logic inside our GST calculation engine?"
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
                  "Sir, I run <code className="text-amber-300 font-mono">git log -p -1</code>! The <code className="text-amber-300 font-mono">-p</code> flag reveals the exact unified diff patch with line-by-line red deletions and green additions. If I see formula variables changed, I know it wasn't just a simple tidy-up!"
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
                  "Spot on! And Susmita, what if the PR touched 40 files and you only want to quickly check which files were modified and how many lines were inserted or deleted in each?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SM
              </div>
              <div>
                <div className="font-semibold text-emerald-300 text-xs mb-1">Susmita Database (Student)</div>
                <p className="text-slate-300">
                  "I use <code className="text-emerald-300 font-mono">git log --stat -1</code>! It displays a clean histogram showing exact insertion/deletion counts per file, so I immediately see if a database migration or configuration file was touched without wading through 1000 lines of diff!"
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
            The 7 Commandments of Diff &amp; Stat Inspection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Run --stat before -p on large commits",
                desc: "Check the high-level file list and histogram first so you know the scope before reading line diffs.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Always add -w when reviewing after linter runs",
                desc: "Passing -w suppresses whitespace shifts so you only review genuine logical alterations.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Combine with count bounds (e.g. -p -1)",
                desc: "Never run bare git log -p in large repos; limit it with -n to prevent endless terminal pagination.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Scope diffs to target paths (git log -p -- <file>)",
                desc: "Combine pathspecs with patch diffs to follow a single function or module's evolution.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Use --numstat for CI/CD metrics",
                desc: "Parse raw tab-delimited counts in automated deployment scripts rather than scraping human text.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Use --word-diff for prose and markdown files",
                desc: "Word-level diff highlighting makes documentation and text copy changes effortless to read.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Verify diff pre-image (---) vs post-image (+++)",
                desc: "Understand that --- a/ refers to the parent state and +++ b/ represents the new state.",
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
              topic6_files/git_log_patch_stat_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Inspecting Diffs &amp; Modification Statistics
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct code changes, inspect visual stat histograms, and review inline diff patches.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_patch_stat_lab.sh
./git_log_patch_stat_lab.sh

# 2. Key Commands Executed:
git log --stat -n 2
git log --oneline --stat -n 2
git log --numstat -n 2
git log -p -1`}
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
                q: "What is the difference between git log -p and git show?",
                a: "'git log -p' traverses commit history backwards from HEAD, rendering diffs for all reachable commits. 'git show' focuses by default on a single specified commit (or HEAD)."
              },
              {
                q: "How can I view diffs with word-level highlighting instead of full line changes?",
                a: "Add the '--word-diff' flag: 'git log -p --word-diff'."
              },
              {
                q: "What does 'git log --stat' display when binary files are changed?",
                a: "For binary files (e.g., PNG images), Git outputs 'Bin 1024 -> 2048 bytes' instead of calculating text line additions/deletions."
              },
              {
                q: "How can I suppress whitespace changes when reviewing diffs?",
                a: "Pass '-w' (or '--ignore-all-space') to ignore all whitespace variations when calculating diffs."
              },
              {
                q: "What does git log --numstat output?",
                a: "It outputs tab-separated integer columns: <added_lines> <deleted_lines> <filepath>, which is ideal for programmatic scripting."
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
            Topic 6 Assessment: Patch Diffs &amp; Modification Statistics
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of unified diff anatomy, hunk headers, statistics summaries, and scriptable metrics.
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
          <PlainTextPrint content={noteText} fileName="git_log_patch_stat_notes.txt" />
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
            <span>Prev: Topic 5 – Path-Specific History</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 7 – Inspecting with git show</span>
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
