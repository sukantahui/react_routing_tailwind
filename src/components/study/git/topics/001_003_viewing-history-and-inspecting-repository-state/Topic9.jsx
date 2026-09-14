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
  UserCheck,
  Search,
  Code2,
  Calendar
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
 * Topic 9: Line-by-Line Code Forensics with git blame: Identifying author, commit hash, and timestamp for every line in a file
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic9() {
  const [activeBlameMode, setActiveBlameMode] = useState("standard");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 9;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/8`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/10`;

  const blameModes = {
    standard: {
      title: "1. Standard git blame",
      cmd: "git blame src/tax/gst_engine.js",
      desc: "Annotates every line with abbreviated 8-character commit hash, author name, timestamp, and line number.",
      output: [
        "3a4f891b (Sukanta Hui 2026-09-10 10:00:00 +0530 1) // Barrackpore FinTech GST Engine",
        "98ca7a41 (Susmita    2026-09-12 14:30:00 +0530 2) function computeInvoiceGST(amount, isService = true) {",
        "7b1e4a8c (Swadeep    2026-09-14 16:00:00 +0530 3)   if (typeof amount !== 'number' || amount <= 0) return 0;",
        "98ca7a41 (Susmita    2026-09-12 14:30:00 +0530 4)   const baseRate = isService ? 0.18 : 0.12;",
        "7b1e4a8c (Swadeep    2026-09-14 16:00:00 +0530 5)   return Number((amount * baseRate).toFixed(2));",
        "3a4f891b (Sukanta Hui 2026-09-10 10:00:00 +0530 6) }",
        "3a4f891b (Sukanta Hui 2026-09-10 10:00:00 +0530 7) module.exports = { computeInvoiceGST };"
      ],
      badge: "Standard Annotation",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    shortDate: {
      title: "2. Short Date (--date=short)",
      cmd: "git blame --date=short src/tax/gst_engine.js",
      desc: "Formats timestamps in clean YYYY-MM-DD format for uniform column width and scannability.",
      output: [
        "3a4f891b (Sukanta Hui 2026-09-10 1) // Barrackpore FinTech GST Engine",
        "98ca7a41 (Susmita    2026-09-12 2) function computeInvoiceGST(amount, isService = true) {",
        "7b1e4a8c (Swadeep    2026-09-14 3)   if (typeof amount !== 'number' || amount <= 0) return 0;",
        "98ca7a41 (Susmita    2026-09-12 4)   const baseRate = isService ? 0.18 : 0.12;",
        "7b1e4a8c (Swadeep    2026-09-14 5)   return Number((amount * baseRate).toFixed(2));",
        "3a4f891b (Sukanta Hui 2026-09-10 6) }",
        "3a4f891b (Sukanta Hui 2026-09-10 7) module.exports = { computeInvoiceGST };"
      ],
      badge: "Clean Columns",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    relativeDate: {
      title: "3. Relative Date (--date=relative)",
      cmd: "git blame --date=relative src/tax/gst_engine.js",
      desc: "Displays human elapsed time ('2 days ago', '4 days ago') to pinpoint how recently code lines were edited.",
      output: [
        "3a4f891b (Sukanta Hui 4 days ago 1) // Barrackpore FinTech GST Engine",
        "98ca7a41 (Susmita    2 days ago 2) function computeInvoiceGST(amount, isService = true) {",
        "7b1e4a8c (Swadeep    2 hours ago 3)   if (typeof amount !== 'number' || amount <= 0) return 0;",
        "98ca7a41 (Susmita    2 days ago 4)   const baseRate = isService ? 0.18 : 0.12;",
        "7b1e4a8c (Swadeep    2 hours ago 5)   return Number((amount * baseRate).toFixed(2));",
        "3a4f891b (Sukanta Hui 4 days ago 6) }",
        "3a4f891b (Sukanta Hui 4 days ago 7) module.exports = { computeInvoiceGST };"
      ],
      badge: "Elapsed Timeline",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    emailView: {
      title: "4. Author Email (-e)",
      cmd: "git blame -e --date=short src/tax/gst_engine.js",
      desc: "Displays author emails enclosed in angle brackets, useful in multi-team enterprise setups.",
      output: [
        "3a4f891b (<sukanta@barrackpore-devs.org> 2026-09-10 1) // Barrackpore FinTech GST Engine",
        "98ca7a41 (<susmita@barrackpore-devs.org> 2026-09-12 2) function computeInvoiceGST(amount, isService = true) {",
        "7b1e4a8c (<swadeep@barrackpore-devs.org> 2026-09-14 3)   if (typeof amount !== 'number' || amount <= 0) return 0;",
        "98ca7a41 (<susmita@barrackpore-devs.org> 2026-09-12 4)   const baseRate = isService ? 0.18 : 0.12;",
        "7b1e4a8c (<swadeep@barrackpore-devs.org> 2026-09-14 5)   return Number((amount * baseRate).toFixed(2));",
        "3a4f891b (<sukanta@barrackpore-devs.org> 2026-09-10 6) }",
        "3a4f891b (<sukanta@barrackpore-devs.org> 2026-09-10 7) module.exports = { computeInvoiceGST };"
      ],
      badge: "Team Attribution",
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
                <span>Git Module 001_003 &bull; Topic 9 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Line-by-Line Code Forensics with <code className="text-cyan-300 font-mono text-lg">git blame</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 8: Comparing with git diff</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 10: Advanced git blame Filtering</span>
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
              <span>Context Discovery &amp; Architectural Archeology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              "Who Wrote This Line, When, and Why?"
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When encountering an unusual conditional check, a tricky regular expression, or a suspicious tax rounding formula in production, senior software engineers do not guess. They use <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git blame</code> to identify the exact commit hash and author for every single line of code, unlocking the full historical context behind every technical design decision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Author Attribution</span>
                </div>
                <p className="text-slate-400">
                  Find out who originally wrote the code line so you can reach out for domain knowledge and architectural clarification.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Search className="w-4 h-4" />
                  <span>Commit Hash Extraction</span>
                </div>
                <p className="text-slate-400">
                  Copy the commit SHA from git blame and run <code className="text-emerald-300 font-mono">git show &lt;SHA&gt;</code> to read the full rationale in the commit message.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Chronological Timelines</span>
                </div>
                <p className="text-slate-400">
                  Observe how a file evolved line-by-line across different sprint releases and developer refactoring passes.
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
                <span>Interactive Blame Annotator</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Inspect Line-by-Line git blame Formats
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Switch formatting modes to test blame outputs
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(blameModes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveBlameMode(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeBlameMode === key
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
                <span>$ <strong className="text-cyan-300">{blameModes[activeBlameMode].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${blameModes[activeBlameMode].color}`}>
                {blameModes[activeBlameMode].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {blameModes[activeBlameMode].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {blameModes[activeBlameMode].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition font-mono">
                  <span className="text-amber-400 font-bold">{line.substring(0, 8)} </span>
                  <span className="text-sky-300">{line.substring(9, line.indexOf(")") + 1)}</span>
                  <span className="text-slate-100">{line.substring(line.indexOf(")") + 1)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>git blame Flag Cheat Sheet</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Essential <code className="text-cyan-300 font-mono">git blame</code> Modifiers
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Modifier Flag</th>
                  <th className="p-4 text-cyan-400">Syntax Example</th>
                  <th className="p-4 text-emerald-400">Forensic Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">-e / --show-email</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -e app.js</td>
                  <td className="p-4">Displays author email addresses in angle brackets instead of display names.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">--date=short</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame --date=short app.js</td>
                  <td className="p-4">Formats dates as YYYY-MM-DD for aligned terminal output.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">--date=relative</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame --date=relative app.js</td>
                  <td className="p-4">Shows human elapsed time (e.g., '2 days ago', '4 weeks ago').</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">-l / --long-hash</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -l app.js</td>
                  <td className="p-4">Prints the full 40-hex SHA-1 hash for each line.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">-s / --suppress</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -s app.js</td>
                  <td className="p-4">Suppresses author names and timestamps, showing only commit hashes.</td>
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
            Sukanta Sir Mentors Swadeep &amp; Susmita on the Ethics &amp; Science of git blame
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Swadeep, when you run <code className="text-cyan-300 font-mono">git blame</code> on a legacy file in our Barrackpore billing engine and discover a strange rounding edge case, what is your first step?"
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
                  "Sir, I look at the commit hash annotated next to that line! I copy the SHA (like <code className="text-purple-300 font-mono">7b1e4a8c</code>) and run <code className="text-purple-300 font-mono">git show 7b1e4a8c</code> to read the commit message and understand what problem the original developer was trying to solve!"
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
                  "Exactly! That is the hallmark of a senior engineer. Never use <code className="text-cyan-300 font-mono">git blame</code> for finger-pointing. Use it for context discovery. And Susmita, what if a line in <code className="text-cyan-300 font-mono">git blame</code> starts with a caret <code className="text-cyan-300 font-mono">^3a4f891</code>?"
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
                  "The caret <code className="text-emerald-300 font-mono">^</code> means the line has never been touched since the initial boundary (root) commit when the repository was first created!"
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
            The 7 Commandments of git blame Forensics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Pair git blame with git show",
                desc: "Never stop at the author name; always run git show <SHA> to read the architectural commit message.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Use --date=short for clean column alignment",
                desc: "ISO short dates prevent erratic column jumping caused by differing time zone strings.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Blame is for context discovery, not blame-culture",
                desc: "Use author info to ask informed questions, not to assign personal fault during incidents.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Blame historical tags with git blame <tag> -- <file>",
                desc: "Inspect how code was authored at specific release milestones without checking out branches.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Notice the 'Not Committed Yet' boundary",
                desc: "Uncommitted local edits in your working tree appear with 00000000 hashes in git blame.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Use -e in large multi-organization projects",
                desc: "Displays corporate email domains to identify contractor vs internal team authorship.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Remember -w ignores formatting commits",
                desc: "Prevents mass linter/Prettier passes from obscuring the real author (Topic 10).",
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
              topic9_files/git_blame_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Multi-Author Line Attribution
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct a file modified across three developer commits and inspect line attributions.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_blame_lab.sh
./git_blame_lab.sh

# 2. Key Commands Executed:
git blame gst_engine.js
git blame -e --date=short gst_engine.js
git blame --date=relative gst_engine.js`}
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
                q: "What does git blame show for lines I just edited in my IDE but haven't committed yet?",
                a: "Git blame displays '00000000 (Not Committed Yet)' for lines modified in your active working tree."
              },
              {
                q: "What does the caret symbol (^) mean next to a commit hash in git blame?",
                a: "The caret '^' indicates a boundary commit (typically the initial root commit when the file was first added)."
              },
              {
                q: "Can I run git blame on a historical version of a file without checking it out?",
                a: "Yes. Use 'git blame <revision> -- <filepath>' (e.g. 'git blame v1.0.0 -- app.js')."
              },
              {
                q: "Why does git blame show the author of a Prettier/formatting PR instead of the logic author?",
                a: "Because git blame tracks the *last* commit to modify the line. If a formatter reformatted the indentation, that formatter commit is technically the latest modification. Use 'git blame -w' to ignore whitespace modifications."
              },
              {
                q: "How can I see git blame output formatted for automated tools?",
                a: "Use 'git blame --line-porcelain <file>', which provides machine-readable key-value blocks for each line."
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
            Topic 9 Assessment: Line-by-Line Code Forensics with <code className="text-cyan-300 font-mono">git blame</code>
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of line attribution, date formatting, boundary commits, and context discovery workflows.
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
          <PlainTextPrint content={noteText} fileName="git_blame_notes.txt" />
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
            <span>Prev: Topic 8 – Comparing with git diff</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 10 – Advanced git blame Filtering (-w, -L)</span>
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
