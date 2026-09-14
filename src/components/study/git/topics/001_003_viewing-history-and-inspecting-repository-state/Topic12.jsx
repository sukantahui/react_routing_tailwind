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
  FolderInput,
  FileSpreadsheet,
  CornerDownRight,
  Split
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic 12: Tracking Renamed and Moved Files: git log --follow <file> across historical refactorings
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [activeFollowMode, setActiveFollowMode] = useState("withFollow");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/11`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/13`;

  const followModes = {
    withoutFollow: {
      title: "1. Without --follow (Truncated at Rename)",
      cmd: "git log --oneline -- src/tax/gst_calculator.js",
      desc: "Standard pathspec logging stops at the rename commit, hiding all pre-rename history from the developer.",
      output: [
        "a91f4b2 chore(exports): export module helpers",
        "c81d290 refactor(structure): move old_tax_calc.js to src/tax/gst_calculator.js"
      ],
      badge: "Truncated Lineage",
      color: "border-rose-500/50 bg-rose-950/20 text-rose-300"
    },
    withFollow: {
      title: "2. With --follow (Complete Lineage)",
      cmd: "git log --follow --oneline -- src/tax/gst_calculator.js",
      desc: "Traces dynamically through the rename boundary all the way back to the root creation commit under the old filename.",
      output: [
        "a91f4b2 chore(exports): export module helpers",
        "c81d290 refactor(structure): move old_tax_calc.js to src/tax/gst_calculator.js",
        "e4a9012 feat(tax): add 1% Cess calculation helper [as old_tax_calc.js]",
        "3a4f891 feat(tax): initial legacy tax calculator in old_tax_calc.js [ROOT]"
      ],
      badge: "Full Historical Lineage",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    followStat: {
      title: "3. Rename Transformation Stats",
      cmd: "git log --follow --stat -n 2 -- src/tax/gst_calculator.js",
      desc: "Displays the transformation as '{old_name => new_name}' alongside line insertion and deletion counts.",
      output: [
        "commit c81d290... (HEAD -> main)",
        "Author: Swadeep SeniorDev <swadeep@barrackpore-devs.org>",
        "Date:   Thu Sep 10 16:30:00 2026 +0530",
        "",
        "    refactor(structure): move old_tax_calc.js to src/tax/gst_calculator.js",
        "",
        " {old_tax_calc.js => src/tax/gst_calculator.js} | 0",
        " 1 file changed, 0 insertions(+), 0 deletions(-)"
      ],
      badge: "Rename Mutation Stats",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
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
                <span>Git Module 001_003 &bull; Topic 12 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Tracking Renamed &amp; Moved Files: <code className="text-cyan-300 font-mono text-lg">git log --follow</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 11: Pickaxe Operator</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 13: Case Study: Forensics</span>
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
              <span>Architectural Refactoring Continuity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Never Lose File History When Reorganizing Codebases
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When projects transition from prototypes to enterprise architectures, files are routinely moved into clean directories (e.g. <code className="text-cyan-300 font-mono">old_calc.js</code> &rarr; <code className="text-cyan-300 font-mono">src/tax/gst_calculator.js</code>). Without <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">--follow</code>, Git acts as if the file was created yesterday, hiding years of valuable commit discussions and bug fix records.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <FolderInput className="w-4 h-4" />
                  <span>Dynamic Rename Detection</span>
                </div>
                <p className="text-slate-400">
                  Git does not rely on fragile filesystem metadata; it compares content hashes between tree snapshots to detect moves dynamically.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <CornerDownRight className="w-4 h-4" />
                  <span>Iterative Lineage Traversal</span>
                </div>
                <p className="text-slate-400">
                  Follows files through 1, 2, or 10 historical renames and folder migrations all the way back to the root genesis commit.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Refactoring Best Practice</span>
                </div>
                <p className="text-slate-400">
                  Always commit pure file moves in a separate commit (100% similarity) before applying functional code modifications.
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
                <span>Interactive Refactoring Tracker</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Compare History With vs. Without <code className="text-cyan-300 font-mono">--follow</code>
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Toggle modes to observe rename traversal behavior
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(followModes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveFollowMode(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeFollowMode === key
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
                <span>$ <strong className="text-cyan-300">{followModes[activeFollowMode].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${followModes[activeFollowMode].color}`}>
                {followModes[activeFollowMode].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {followModes[activeFollowMode].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {followModes[activeFollowMode].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.includes("ROOT") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.includes("old_tax_calc.js") ? (
                    <span className="text-amber-300 font-medium">{line}</span>
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
            <span>Rename Detection Flag Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            File Tracking &amp; Rename Modifiers
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Command Syntax</th>
                  <th className="p-4 text-cyan-400">Rename Behavior</th>
                  <th className="p-4 text-emerald-400">Pre-Rename History Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-rose-300 font-bold">git log -- file.js</td>
                  <td className="p-4 text-slate-400">Strict path literal match</td>
                  <td className="p-4 text-rose-400 font-semibold">Hidden (stops at rename)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-emerald-950/10">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">git log --follow -- file.js</td>
                  <td className="p-4 text-emerald-300">Dynamic content similarity tracking</td>
                  <td className="p-4 text-emerald-400 font-bold">Visible all the way to root genesis</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">git log --follow -M80% -- file.js</td>
                  <td className="p-4 text-sky-300">Requires 80% content similarity threshold</td>
                  <td className="p-4 text-emerald-400">Visible for high-similarity moves</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">git blame -C -- file.js</td>
                  <td className="p-4 text-purple-300">Traces line attribution across file copies/moves</td>
                  <td className="p-4 text-emerald-400">Preserves original author credit</td>
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
            Sukanta Sir Mentors Debangshu &amp; Susmita on Investigating Refactored Files
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Debangshu, you are reviewing our updated GST calculator at <code className="text-cyan-300 font-mono">src/tax/gst_calculator.js</code>. When you run <code className="text-cyan-300 font-mono">git log -- src/tax/gst_calculator.js</code>, you only see 2 commits! But you know Susmita wrote the initial version 3 weeks ago under <code className="text-cyan-300 font-mono">old_tax_calc.js</code>. Why is Git hiding her commits?"
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
                  "Because standard <code className="text-amber-300 font-mono">git log</code> strictly matches the string path <code className="text-amber-300 font-mono">src/tax/gst_calculator.js</code>! As soon as it encounters the commit where Swadeep moved the file from <code className="text-amber-300 font-mono">old_tax_calc.js</code>, Git stops and omits everything prior!"
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
                  "Exactly! And Susmita, what single flag unlocks your entire previous commit history?"
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
                  "You add <code className="text-emerald-300 font-mono">--follow</code>! Running <code className="text-emerald-300 font-mono">git log --follow --oneline -- src/tax/gst_calculator.js</code> instructs Git's similarity engine to traverse across past renames, showing my genesis commit under <code className="text-emerald-300 font-mono">old_tax_calc.js</code> perfectly!"
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
            The 7 Commandments of Tracking Renamed Files
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always use --follow when auditing moved files",
                desc: "Never assume a file only has 2 commits just because standard git log stops at the rename.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Separate pure renames from functional edits",
                desc: "Do git mv in commit 1 (100% similarity), and code modifications in commit 2.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Remember --follow only works on single files",
                desc: "Git does not support --follow on directory pathspecs; run it on individual target files.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Use --stat to see the {old => new} mapping",
                desc: "git log --follow --stat visually displays historical filenames and directory shifts.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Combine with --reverse to locate the root creator",
                desc: "git log --follow --reverse --oneline -- <file> prints the original author who created the file.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Tune similarity threshold with -M if needed",
                desc: "Use -M70% or -M90% if aggressive refactoring altered more than 50% of the file content.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Pair with -p to inspect diffs across all names",
                desc: "git log --follow -p -- <file> provides seamless line diff continuity across decades of history.",
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
              topic12_files/git_log_follow_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Traversing Renamed Files Across Refactorings
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct a file, move it to a nested directory, and practice following history across renames.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_follow_lab.sh
./git_log_follow_lab.sh

# 2. Key Commands Executed:
git log --oneline -- src/tax/gst_calculator.js        # Stops at rename
git log --follow --oneline -- src/tax/gst_calculator.js # Full traversal
git log --follow --stat -n 3 -- src/tax/gst_calculator.js`}
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
                q: "Why does git log not follow renames by default?",
                a: "Pathspec checking is optimized for performance. Calculating content similarity hashes across thousands of historical trees adds compute overhead, so Git requires explicit '--follow' for iterative rename traversal."
              },
              {
                q: "Can I use git log --follow on a directory?",
                a: "No. The '--follow' flag is currently implemented strictly for single file pathspecs in Git."
              },
              {
                q: "What is the default similarity percentage Git uses to detect a rename?",
                a: "Git defaults to 50% content similarity. You can adjust this threshold with the '-M' option (e.g. '-M80%')."
              },
              {
                q: "Does git blame need --follow?",
                a: "No. 'git blame' automatically tracks line attribution through file renames and moves by default."
              },
              {
                q: "What is the best way to rename a file so Git never loses its history?",
                a: "Use 'git mv old_file new_file' and commit the move separately before making functional code edits."
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
            Topic 12 Assessment: Tracking Renamed &amp; Moved Files (<code className="text-cyan-300 font-mono">--follow</code>)
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of dynamic rename heuristics, similarity thresholds (-M), single-file limitations, and root lineage extraction.
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
          <PlainTextPrint content={noteText} fileName="git_log_follow_notes.txt" />
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
            <span>Prev: Topic 11 – The Pickaxe Operator (-S)</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 13 – Case Study: Production Bug Diagnosis</span>
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
