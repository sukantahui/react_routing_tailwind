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
  Filter,
  Code2,
  Wand2,
  Scissors
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic 10: Advanced git blame Filtering: Ignoring whitespace changes (-w) and restricting line ranges (-L start,end)
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [activeAdvBlame, setActiveAdvBlame] = useState("whitespaceIgnore");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 10;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/9`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/11`;

  const advBlameModes = {
    standardPolluted: {
      title: "1. Standard Blame (Polluted by Linter)",
      cmd: "git blame tax_service.js",
      desc: "Mass-reformatting commit overwrote line authorship, falsely showing Swadeep as the creator of every line.",
      output: [
        "c81d290f (Swadeep 2026-09-14 10:00:00 +0530 6) function calculateGST(subtotal) {",
        "c81d290f (Swadeep 2026-09-14 10:00:00 +0530 7)     const rate = 0.18;",
        "c81d290f (Swadeep 2026-09-14 10:00:00 +0530 8)     return subtotal * rate;",
        "c81d290f (Swadeep 2026-09-14 10:00:00 +0530 9) }"
      ],
      badge: "Polluted by Reformat",
      color: "border-rose-500/50 bg-rose-950/20 text-rose-300"
    },
    whitespaceIgnore: {
      title: "2. Whitespace Filter (-w)",
      cmd: "git blame -w tax_service.js",
      desc: "Ignores whitespace modifications, looking past the Prettier commit to reveal Susmita as the true logic author.",
      output: [
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 6) function calculateGST(subtotal) {",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 7)     const rate = 0.18;",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 8)     return subtotal * rate;",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 9) }"
      ],
      badge: "True Author Revealed",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    lineRange: {
      title: "3. Line Range Scoping (-L 6,9)",
      cmd: "git blame -w -L 6,9 tax_service.js",
      desc: "Restricts blame calculation strictly to lines 6 through 9, avoiding terminal spam on large files.",
      output: [
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 6) function calculateGST(subtotal) {",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 7)     const rate = 0.18;",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 8)     return subtotal * rate;",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 9) }"
      ],
      badge: "Surgical Range",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    ignoreRevs: {
      title: "4. Ignore Revisions File (--ignore-rev)",
      cmd: "git blame --ignore-rev c81d290f -L 6,9 tax_service.js",
      desc: "Explicitly bypasses the specified commit SHA during blame attribution (matching .git-blame-ignore-revs behavior).",
      output: [
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 6) function calculateGST(subtotal) {",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 7)     const rate = 0.18;",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 8)     return subtotal * rate;",
        "98ca7a41 (Susmita 2026-09-08 11:00:00 +0530 9) }"
      ],
      badge: "Enterprise Standard",
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
                <span>Git Module 001_003 &bull; Topic 10 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Advanced <code className="text-cyan-300 font-mono text-lg">git blame</code>: Whitespace (<code className="text-cyan-300 font-mono text-lg">-w</code>) &amp; Ranges (<code className="text-cyan-300 font-mono text-lg">-L</code>)
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 9: Basic git blame</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 11: The Pickaxe Operator (-S)</span>
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
              <span>Overcoming the "Linter Destroyer" Problem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Defeating Formatting Commits &amp; Pinpointing Functions
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When an automated code formatter (like Prettier or Black) re-indents a 3,000-line codebase, standard <code className="text-cyan-300 font-mono">git blame</code> attributes every single line to the person who ran the formatting script! By mastering <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">-w</code> (ignoring whitespace), <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">-L</code> (line ranges), and <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">.git-blame-ignore-revs</code>, you can see right through the formatting noise to find the real author.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Wand2 className="w-4 h-4" />
                  <span>The -w Transparency Shield</span>
                </div>
                <p className="text-slate-400">
                  Bypasses commits that only touched spaces, tabs, and indentation, attributing lines to the true business logic creator.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Scissors className="w-4 h-4" />
                  <span>Surgical Line Windows (-L)</span>
                </div>
                <p className="text-slate-400">
                  Target exact line ranges (<code className="text-sky-300 font-mono">-L 15,30</code>) or function names (<code className="text-sky-300 font-mono">-L :calculateTax</code>) without terminal buffer overload.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>.git-blame-ignore-revs</span>
                </div>
                <p className="text-slate-400">
                  Configure repository-wide ignore lists for mass reformatting passes so all teammates see clean blame history automatically.
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
                <span>Interactive Advanced Blame Inspector</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Compare Standard vs. Whitespace-Filtered Blame
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Switch tabs to see how -w and -L clean up attribution
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(advBlameModes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveAdvBlame(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeAdvBlame === key
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
                <span>$ <strong className="text-cyan-300">{advBlameModes[activeAdvBlame].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${advBlameModes[activeAdvBlame].color}`}>
                {advBlameModes[activeAdvBlame].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {advBlameModes[activeAdvBlame].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {advBlameModes[activeAdvBlame].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition font-mono">
                  <span className="text-amber-400 font-bold">{line.substring(0, 8)} </span>
                  <span className={activeAdvBlame === "standardPolluted" ? "text-rose-300 font-semibold" : "text-emerald-300 font-semibold"}>
                    {line.substring(9, line.indexOf(")") + 1)}
                  </span>
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
            <span>Advanced Blame Syntax Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Advanced Blame Modifiers &amp; Range Syntax
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Modifier</th>
                  <th className="p-4 text-cyan-400">Syntax Example</th>
                  <th className="p-4 text-emerald-400">Behavior &amp; Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">-w / --ignore-all-space</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -w app.js</td>
                  <td className="p-4">Bypasses commits that only altered indentation, tabs, or spaces.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">-L start,end</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -L 20,45 app.js</td>
                  <td className="p-4">Scopes blame output strictly to line numbers 20 through 45 inclusive.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">-L :funcname</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -L :calculateGST tax.js</td>
                  <td className="p-4">Automatically discovers and blames the entire body of function 'calculateGST'.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">--ignore-rev</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame --ignore-rev &lt;SHA&gt; app.js</td>
                  <td className="p-4">Ignores a specific mass-refactor commit SHA during attribution.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">-C / -CC / -CCC</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git blame -CCC app.js</td>
                  <td className="p-4">Tracks lines copied or moved from other files across the entire repo history.</td>
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
            Sukanta Sir Mentors Swadeep &amp; Susmita on Handling Linter Formatting Commits
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Susmita, yesterday Swadeep ran an automated code re-indenter that converted 2 spaces to 4 spaces across our entire billing project. When you ran <code className="text-cyan-300 font-mono">git blame</code> on your GST calculation function, why did Swadeep's name show up on every line?"
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
                  "Because Swadeep's commit was technically the last commit to touch those lines on disk! But all he did was change indentation whitespace—he didn't write any of the tax logic!"
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
                  "Exactly! And Swadeep, how can Susmita tell Git to look right past your reformatting commit and see her original authorship?"
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
                  "She adds <code className="text-purple-300 font-mono">-w</code>! Running <code className="text-purple-300 font-mono">git blame -w -L 6,10 tax_service.js</code> ignores my indentation changes and proves that Susmita is the true author of lines 6 to 10!"
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
            The 7 Commandments of Advanced Blame Filtering
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always try -w first when auditing legacy code",
                desc: "Never let mass formatting passes obscure the true engineers who wrote the business algorithms.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Always scope large files with -L",
                desc: "Blaming a 2,000-line file without -L wastes time; scope it with -L start,end or -L :funcname.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Create a .git-blame-ignore-revs file for the team",
                desc: "Record the commit hashes of all mass-formatting and linter rollouts in repo root.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Configure blame.ignoreRevsFile in local git config",
                desc: "Run git config blame.ignoreRevsFile .git-blame-ignore-revs to automate ignore filtering.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Use -C to trace code copied across files",
                desc: "Detects if a developer copied a helper function from another file during a refactoring pass.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Use -M to trace code moved within the same file",
                desc: "Discovers original authors even when helper functions are rearranged inside the same file.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Use regex line boundaries for dynamic files",
                desc: "git blame -L '/function init/',/^}/ file.js finds functions even when line numbers shift.",
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
              topic10_files/git_blame_advanced_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Overcoming Linter Commits with -w &amp; -L
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to create a business logic commit, a 4-space reformatting pass, and test -w and -L filtering.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_blame_advanced_lab.sh
./git_blame_advanced_lab.sh

# 2. Key Commands Executed:
git blame tax_service.js               # Standard polluted output
git blame -w tax_service.js            # Whitespace filtered (true author)
git blame -w -L 6,10 tax_service.js    # Scoped line range
git blame --ignore-rev <SHA> tax_service.js # Explicit commit bypass`}
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
                q: "Why does git blame -w not ignore variable renaming?",
                a: "'-w' strictly ignores whitespace, indentation, spaces, and tabs. If alphanumeric characters or variable identifiers are changed, that constitutes a genuine code change, and Git attributes the line accordingly."
              },
              {
                q: "How does git blame -L :functionName find the function?",
                a: "Git uses language-specific regex rules (such as JavaScript, Python, C++ function signatures) to detect the starting and closing braces of the function."
              },
              {
                q: "What is .git-blame-ignore-revs and how do I enable it?",
                a: "It is a text file in your repository listing commit hashes (one per line) of mass-formatting commits. Enable it with: 'git config blame.ignoreRevsFile .git-blame-ignore-revs'."
              },
              {
                q: "What is the difference between git blame -C and git blame -M?",
                a: "'-M' detects code moved or copied within the *same* file. '-C' detects code moved or copied from *other* files modified in the same commit."
              },
              {
                q: "Can I blame multiple discontinuous line ranges in a single command?",
                a: "Yes. Pass multiple '-L' flags: 'git blame -L 10,20 -L 80,95 file.js'."
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
            Topic 10 Assessment: Advanced <code className="text-cyan-300 font-mono">git blame</code> Filtering
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of whitespace suppression, line ranges, function targeting, copy detection (-C/-M), and ignore lists.
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
          <PlainTextPrint content={noteText} fileName="git_blame_advanced_notes.txt" />
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
            <span>Prev: Topic 9 – Basic git blame</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 11 – The Pickaxe Operator (-S)</span>
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
