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
  Calendar,
  Filter,
  UserCheck,
  Hash
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic 3: Limiting and Filtering History: Limiting by count (-n), date ranges (--since, --until), and author (--author)
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [activeFilter, setActiveFilter] = useState("authorFilter");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 3;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/2`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/4`;

  const filterScenarios = {
    countFilter: {
      title: "1. Numeric Count Limit (-n / -<count>)",
      cmd: "git log -n 2 --oneline",
      desc: "Instantly caps output to the N most recent commits, preventing terminal buffer overflow in massive repositories.",
      output: [
        "a91f4b2 (HEAD -> main) docs(api): update REST endpoints documentation",
        "7b1e4a8 fix(auth): fix session token timeout bug"
      ],
      badge: "Count Limit",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    authorFilter: {
      title: "2. Author Filtering (--author)",
      cmd: "git log --author='Debangshu' --oneline",
      desc: "Filters commits where the author name or email matches the regex pattern 'Debangshu'.",
      output: [
        "a91f4b2 (HEAD -> main) docs(api): update REST endpoints documentation",
        "c81d290 feat(core): initialize billing database schema"
      ],
      badge: "Author Specific",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    dateFilter: {
      title: "3. Calendar & Relative Date Range (--since / --until)",
      cmd: "git log --since='2026-09-08' --until='2026-09-13' --oneline",
      desc: "Filters commits created within a strict date window, supporting ISO dates and human relative phrases like 'yesterday' or '1 week ago'.",
      output: [
        "7b1e4a8 fix(auth): fix session token timeout bug [2026-09-12]",
        "98ca7a4 feat(tax): implement CGST and SGST calculation splits [2026-09-09]"
      ],
      badge: "Date Window",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    combinedFilter: {
      title: "4. Multi-Criteria Combined Filter",
      cmd: "git log --author='Susmita' --since='7 days ago' --oneline",
      desc: "Composes author, date, and formatting flags into a surgical forensic query.",
      output: [
        "98ca7a4 feat(tax): implement CGST and SGST calculation splits"
      ],
      badge: "Precision Audit",
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
                <span>Git Module 001_003 &bull; Topic 3 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Limiting &amp; Filtering History: <code className="text-cyan-300 font-mono text-lg">-n</code>, <code className="text-cyan-300 font-mono text-lg">--since</code>, &amp; <code className="text-cyan-300 font-mono text-lg">--author</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 2: Pretty Print</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 4: Grep Messages</span>
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
              <span>Forensic Precision &amp; Sprint Audits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Surgical Filtering in Massive Repositories
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When working in repositories containing tens of thousands of commits spanning multiple years, scrolling through unfiltered history is a recipe for frustration. Filtering by count, date windows, and specific author identities allows you to perform sprint retrospectives, calculate team velocity, and isolate regressions introduced during specific releases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Hash className="w-4 h-4" />
                  <span>Count Bounds (-n)</span>
                </div>
                <p className="text-slate-400">
                  Quickly check recent activity without paginating through thousands of historical commits.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Date Windows (--since / --until)</span>
                </div>
                <p className="text-slate-400">
                  Isolate changes made during a 2-week sprint cycle or pinpoint commits preceding a production outage.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Author Attribution (--author)</span>
                </div>
                <p className="text-slate-400">
                  Search commits written by specific colleagues or contractor emails using regex matching.
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
                <span>Interactive Filter Laboratory</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Test Git History Filtering Scenarios
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Click a scenario tab to inspect command flags and results
            </span>
          </div>

          {/* Filter Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(filterScenarios).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeFilter === key
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
                <span>Terminal Query: <strong className="text-cyan-300">{filterScenarios[activeFilter].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${filterScenarios[activeFilter].color}`}>
                {filterScenarios[activeFilter].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {filterScenarios[activeFilter].desc}
            </p>

            {/* Simulated Output */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {filterScenarios[activeFilter].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Filtering Flags Cheat Sheet</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            History Limiting &amp; Filtering Syntax Matrix
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Filter Flag</th>
                  <th className="p-4 text-cyan-400">Syntax Example</th>
                  <th className="p-4 text-emerald-400">Behavior &amp; Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">-n / -N</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -n 5 (or git log -5)</td>
                  <td className="p-4">Restricts output to the top N commits reachable from HEAD.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">--since / --after</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --since="2 weeks ago"</td>
                  <td className="p-4">Includes commits whose AuthorDate is on or after the specified time.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">--until / --before</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --until="2026-09-01"</td>
                  <td className="p-4">Includes commits created on or before the specified date.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">--author</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --author="Debangshu"</td>
                  <td className="p-4">Regex search on author name and email. Case-insensitive with <code className="text-cyan-300 font-mono">-i</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">--committer</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --committer="Sukanta"</td>
                  <td className="p-4">Regex search on the committer identity (the entity who merged/rebased the patch).</td>
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
            Sukanta Sir Mentors Debangshu &amp; Susmita on Sprint Retrospective Auditing
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Debangshu, today is our Friday sprint review at Coder &amp; AccoTax. We need to list all commits created by Susmita over the last 7 days so we can review her database migrations. How do you query this in one line?"
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
                  "Sir! I run <code className="text-amber-300 font-mono">git log --author=\"Susmita\" --since=\"7 days ago\" --oneline</code>. Git immediately lists only Susmita's commits from this past week, completely ignoring older code and commits from other team members!"
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
                  "Perfect! And Susmita, what if Debangshu used different casing like 'susmita' in lowercase?"
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
                  "He just adds the <code className="text-emerald-300 font-mono">-i</code> flag! <code className="text-emerald-300 font-mono">git log --author=\"susmita\" -i --since=\"7 days ago\"</code> ensures case-insensitive pattern matching across both my name and my email domain!"
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
            The 7 Commandments of History Filtering
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always limit count (-n) in huge repositories",
                desc: "Never run bare git log in enterprise repos with 100k+ commits; use -n 20 to preserve terminal responsiveness.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Combine with -i for forgiving author matches",
                desc: "Developer display names often vary in capitalization (e.g., 'debangshu' vs 'Debangshu'); pass -i for case insensitivity.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Understand --since filters by AuthorDate",
                desc: "Be aware that backdated or cherry-picked commits are evaluated by when the code was written, not merged.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Use natural language dates freely",
                desc: "Expressions like 'yesterday noon', '2 weeks ago', and 'midnight' work reliably without manual timestamp math.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Filter by email domain to capture entire squads",
                desc: "Running git log --author='@clientcompany.com' lists all contributions from an external vendor team.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Pair filters with --oneline or custom format strings",
                desc: "Raw filtered output is much easier to scan when condensed onto single lines.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Use --committer when auditing automated CI merges",
                desc: "Bots and maintainers appear as committer rather than original author in squash merges.",
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
              topic3_files/git_log_filtering_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Filtering History by Count, Author, &amp; Date
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct a multi-author dated timeline and practice surgical filtering queries.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_filtering_lab.sh
./git_log_filtering_lab.sh

# 2. Key Commands Executed:
git log -n 2 --oneline
git log --author="Debangshu" --oneline
git log --since="2026-09-08" --oneline
git log --author="Susmita" --since="7 days ago" --oneline`}
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
                q: "What is the difference between --since and --after?",
                a: "There is no difference; '--since' and '--after' are identical aliases in Git's CLI parser."
              },
              {
                q: "How can I filter commits authored by either Alice OR Bob?",
                a: "Since '--author' accepts regular expressions, you can use alternation: 'git log --author=\"Alice\\|Bob\"' or with regex extensions 'git log -E --author=\"Alice|Bob\"'."
              },
              {
                q: "Does --author search the commit message?",
                a: "No. '--author' strictly inspects the Author Name and Author Email fields. To search inside commit messages, use '--grep'."
              },
              {
                q: "Can I combine --author with --graph and --all?",
                a: "Yes. Git allows you to freely compose flags: 'git log --graph --oneline --all --author=\"Debangshu\"'."
              },
              {
                q: "How does Git parse relative dates like '2.weeks.ago'?",
                a: "Git includes a flexible date parser (approxidate) that natively understands periods, hyphens, and spaces in relative time phrases."
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
            Topic 3 Assessment: Log Limiting &amp; Filtering
          </h2>
          <p className="text-slate-400 text-sm">
            Verify your mastery of count bounds, date intervals, author regex filters, and combined queries.
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
          <PlainTextPrint content={noteText} fileName="git_log_filtering_notes.txt" />
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
            <span>Prev: Topic 2 – Custom Pretty Print</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 4 – Filtering by Commit Message (--grep)</span>
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
