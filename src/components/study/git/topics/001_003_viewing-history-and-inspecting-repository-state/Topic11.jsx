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
  Pickaxe,
  Search,
  Code2,
  RefreshCw
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic 11: The Pickaxe Operator: Searching history for commits that added or removed specific code strings with git log -S 'search_string'
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [activePickaxeView, setActivePickaxeView] = useState("stringPickaxe");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/10`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/12`;

  const pickaxeScenarios = {
    stringPickaxe: {
      title: "1. Exact String Pickaxe (-S)",
      cmd: "git log -S 'calculateFestiveDiscount' --oneline",
      desc: "Finds the exact commits where the count of 'calculateFestiveDiscount' changed (creation and deletion).",
      output: [
        "c81d290 (HEAD -> main) refactor(cleanup): streamline core app entrypoint [DELETION]",
        "3a4f891 feat(promo): add 15% festive discount calculation helper [CREATION]"
      ],
      badge: "String Count Delta",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    patchInspection: {
      title: "2. Pickaxe with Unified Diff (-S -p)",
      cmd: "git log -S 'calculateFestiveDiscount' -p -1",
      desc: "Renders the exact line deletion diff where the function was removed from the codebase.",
      output: [
        "commit c81d290... (HEAD -> main)",
        "Author: Swadeep SeniorDev <swadeep@barrackpore-devs.org>",
        "Date:   Sat Sep 12 16:30:00 2026 +0530",
        "",
        "    refactor(cleanup): streamline core app entrypoint",
        "",
        "diff --git a/app.js b/app.js",
        "@@ -1,5 +1,2 @@",
        " console.log(\"App starting...\");",
        "-function calculateFestiveDiscount(total) {",
        "-  return total * 0.15; // 15% Puja Festival Discount",
        "-}",
        " const DB_URI = 'postgres://localhost:5432/barrackpore';"
      ],
      badge: "Diff Forensics",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    regexPickaxe: {
      title: "3. Regex Diff Hunter (-G)",
      cmd: "git log -G 'function.*Discount' --oneline",
      desc: "Scans diff hunks where added or modified lines match the regular expression pattern.",
      output: [
        "c81d290 refactor(cleanup): streamline core app entrypoint",
        "3a4f891 feat(promo): add 15% festive discount calculation helper"
      ],
      badge: "Regex Diff Scanner",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    revivalRecipe: {
      title: "4. Reviving Deleted Code",
      cmd: "git show c81d290~1:app.js",
      desc: "Dumps the pre-deletion state from the parent commit (~1), recovering the deleted function in seconds.",
      output: [
        "console.log(\"App starting...\");",
        "function calculateFestiveDiscount(total) {",
        "  return total * 0.15; // 15% Puja Festival Discount",
        "}",
        "const DB_URI = 'postgres://localhost:5432/barrackpore';"
      ],
      badge: "Instant Recovery",
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
                <span>Git Module 001_003 &bull; Topic 11 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Pickaxe Operator: <code className="text-cyan-300 font-mono text-lg">git log -S</code> &amp; <code className="text-cyan-300 font-mono text-lg">-G</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 10: Advanced Blame</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 12: Tracking Renames</span>
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
              <span>Historical Code Retrieval Superpower</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Digging Up Deleted Functions and Buried Code
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When a crucial discount calculation formula or database connector disappears from your codebase, standard <code className="text-cyan-300 font-mono">git grep</code> cannot find it (because the file on disk no longer contains it), and <code className="text-cyan-300 font-mono">git log --grep</code> fails (unless the commit message explicitly mentioned the variable). The Pickaxe Operator (<code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git log -S</code>) acts like a historical metal detector, scanning the diff stream of every commit ever recorded to find when that exact code was introduced or deleted.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Pickaxe className="w-4 h-4" />
                  <span>The String Pickaxe (-S)</span>
                </div>
                <p className="text-slate-400">
                  Tracks changes in the occurrence count of a string across repository history. Flags both genesis and deletion commits.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Search className="w-4 h-4" />
                  <span>The Regex Pickaxe (-G)</span>
                </div>
                <p className="text-slate-400">
                  Matches modified diff lines against regular expressions, catching variable updates even when line counts stay identical.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Revival Recipe</span>
                </div>
                <p className="text-slate-400">
                  Once the deletion commit SHA is found with -S, use <code className="text-purple-300 font-mono">git show &lt;SHA&gt;~1:path</code> to restore the function in seconds.
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
                <span>Interactive Pickaxe Simulator</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Simulate Historical Pickaxe Queries
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Switch modes to test string mining and code recovery
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(pickaxeScenarios).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActivePickaxeView(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activePickaxeView === key
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
                <span>$ <strong className="text-cyan-300">{pickaxeScenarios[activePickaxeView].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${pickaxeScenarios[activePickaxeView].color}`}>
                {pickaxeScenarios[activePickaxeView].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {pickaxeScenarios[activePickaxeView].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {pickaxeScenarios[activePickaxeView].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.startsWith("+") && !line.startsWith("+++") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.startsWith("-") && !line.startsWith("---") ? (
                    <span className="text-rose-400 font-semibold">{line}</span>
                  ) : line.startsWith("@@") ? (
                    <span className="text-cyan-400 font-bold">{line}</span>
                  ) : line.includes("DELETION") ? (
                    <span className="text-rose-300 font-bold">{line}</span>
                  ) : line.includes("CREATION") ? (
                    <span className="text-emerald-300 font-bold">{line}</span>
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
            <span>Search Tool Comparison Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            When to Use <code className="text-cyan-300 font-mono">git grep</code> vs. <code className="text-cyan-300 font-mono">--grep</code> vs. <code className="text-cyan-300 font-mono">-S</code> vs. <code className="text-cyan-300 font-mono">-G</code>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Search Command</th>
                  <th className="p-4 text-cyan-400">Search Target Scope</th>
                  <th className="p-4 text-purple-400">Finds Deleted Code?</th>
                  <th className="p-4 text-emerald-400">Primary Superpower</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">git grep "string"</td>
                  <td className="p-4">Active working tree / tracked files on disk</td>
                  <td className="p-4 text-rose-400 font-semibold">No</td>
                  <td className="p-4">Instant source code keyword search in active workspace.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">git log --grep="string"</td>
                  <td className="p-4">Commit message subjects and descriptions</td>
                  <td className="p-4 text-slate-400">Only if mentioned in message</td>
                  <td className="p-4">Locating Jira tickets and Conventional Commit keywords.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-emerald-950/10">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">git log -S "string"</td>
                  <td className="p-4">Code diffs across entire history DAG</td>
                  <td className="p-4 text-emerald-400 font-bold">YES (100%)</td>
                  <td className="p-4 text-emerald-300 font-semibold">Finds when a string was added or deleted anywhere in history.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">git log -G "regex"</td>
                  <td className="p-4">Patch diff lines matching regex pattern</td>
                  <td className="p-4 text-emerald-400 font-bold">YES</td>
                  <td className="p-4">Finds commits where lines matching regex were modified.</td>
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
            Sukanta Sir Guides Debangshu &amp; Swadeep on Recovering Lost Functions
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Debangshu, our client in Barrackpore wants to re-enable our 15% Puja Festival discount helper, but someone accidentally deleted it during a cleanup last month. <code className="text-cyan-300 font-mono">git grep</code> says 'not found'. How do you find the deleted code?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                DT
              </div>
              <div>
                <div className="font-semibold text-amber-300 text-xs mb-1">Debangshu Technical (Student)</div>
                <p className="text-slate-300">
                  "Sir! I use the Pickaxe operator! <code className="text-amber-300 font-mono">git log -S \"calculateFestiveDiscount\" --oneline</code>. Git digs through the historical diffs and instantly returns two commits: the commit where I created it, and the commit where Swadeep deleted it!"
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
                  "Brilliant! And Swadeep, once Debangshu has the deletion commit hash <code className="text-cyan-300 font-mono">c81d290</code>, how do you recover the exact code without checking out old branches?"
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
                  "We inspect the parent snapshot right before the deletion: <code className="text-purple-300 font-mono">git show c81d290~1:app.js</code>! That dumps the entire pre-deletion file, letting us copy the function back into our current branch immediately!"
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
            The 7 Commandments of the Pickaxe Operator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Use -S when code is deleted from current disk",
                desc: "Never assume lost code is gone forever; git log -S digs it out of the immutable object database.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Combine with -p to see exact line additions/deletions",
                desc: "git log -S <string> -p shows the exact unified diff hunk where the string was created or destroyed.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use -G when string count did not change",
                desc: "If an argument inside a function call was modified, use -G to catch the line modification.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Add --all to search across deleted/stale branches",
                desc: "Include --all to unearth code committed on experimental branches that were never merged into main.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Recover code from parent snapshot (<SHA>~1:path)",
                desc: "Always inspect the parent of the deletion commit to extract clean, working pre-deletion source code.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Scope pickaxe with -- <path> to speed up monorepos",
                desc: "In massive repositories, adding pathspecs restricts the pickaxe to relevant subsystem directories.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Use --reverse to find the original introduction",
                desc: "git log -S <string> --reverse --oneline puts the genesis commit right at the top of output.",
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
              topic11_files/git_pickaxe_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Digging Up Deleted Code with git log -S
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to create a function, delete it in a cleanup commit, and practice unearthing and reviving it with pickaxe.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_pickaxe_lab.sh
./git_pickaxe_lab.sh

# 2. Key Commands Executed:
git log -S "calculateFestiveDiscount" --oneline
git log -S "calculateFestiveDiscount" -p
git show <DELETION_SHA>~1:app.js`}
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
                q: "What is the difference between git log -S and git log -G?",
                a: "'git log -S <string>' only matches commits where the number of occurrences of the string changed. 'git log -G <regex>' matches any commit where added or removed lines in the diff match the regex pattern (even if the total count remains identical)."
              },
              {
                q: "Can git log -S find code deleted months ago?",
                a: "Yes. Git commits are immutable snapshots. As long as the commit is reachable in history, git log -S will find the exact commit where the string was removed."
              },
              {
                q: "How can I find when a deleted function was first introduced in history?",
                a: "Run 'git log -S \"functionName\" --reverse --oneline'. The very first commit listed is the one that introduced the function."
              },
              {
                q: "What does --pickaxe-all do?",
                a: "By default, when a commit matches -S, git log -p only shows the diff for the file containing the matched string. '--pickaxe-all' shows the full changeset across all files modified in that commit."
              },
              {
                q: "Can I use regular expressions with git log -S?",
                a: "Yes. Pass the '--pickaxe-regex' flag along with '-S' to treat the search string as a regular expression."
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
            Topic 11 Assessment: The Pickaxe Operator (<code className="text-cyan-300 font-mono">git log -S</code> &amp; <code className="text-cyan-300 font-mono">-G</code>)
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of pickaxe delta counts, regex diff matching (-G), code revival workflows, and path scoping.
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
          <PlainTextPrint content={noteText} fileName="git_pickaxe_notes.txt" />
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
            <span>Prev: Topic 10 – Advanced Blame Filtering</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 12 – Tracking Renamed &amp; Moved Files (--follow)</span>
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
