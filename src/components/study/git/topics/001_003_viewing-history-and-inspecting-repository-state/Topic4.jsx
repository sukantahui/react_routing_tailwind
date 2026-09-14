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
  Search,
  Key,
  Bug,
  Tag
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
 * Topic 4: Filtering History by Commit Message: Searching messages with git log --grep
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [activeGrepScenario, setActiveGrepScenario] = useState("ticketSearch");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 4;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/3`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/5`;

  const grepScenarios = {
    ticketSearch: {
      title: "1. Issue Ticket Tracking (JIRA / GitHub Issue)",
      cmd: "git log --grep='JIRA-102' --oneline",
      desc: "Instantly locates commits tagged with a specific task or bug tracking identifier across your repository timeline.",
      output: [
        "c81d290 fix(security): prevent header injection in auth tokens [JIRA-102]"
      ],
      badge: "Issue Tracker Lookup",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    conventionalSearch: {
      title: "2. Conventional Commits Regex (^fix: / ^feat:)",
      cmd: "git log --grep='^fix' --oneline",
      desc: "Uses regex anchoring (^) to list all bug fixes or features conforming to Conventional Commits standards.",
      output: [
        "c81d290 fix(security): prevent header injection in auth tokens [JIRA-102]"
      ],
      badge: "Conventional Commits",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    orLogic: {
      title: "3. Multi-Pattern OR Search (--grep A --grep B)",
      cmd: "git log --grep='discount' --grep='tax' -i --oneline",
      desc: "Evaluates multiple patterns with OR logic to find commits affecting either discount or tax calculation systems.",
      output: [
        "e4a9012 feat(discount): add festive promo coupon discount logic",
        "98ca7a4 feat(tax): implement 18% standard GST helper [JIRA-101]"
      ],
      badge: "Subsystem Search",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    invertedSearch: {
      title: "4. Inverted Search (--invert-grep)",
      cmd: "git log --invert-grep --grep='refactor' --oneline",
      desc: "Excludes noise commits such as formatting passes, chore bumps, or merge commits from the changelog view.",
      output: [
        "e4a9012 feat(discount): add festive promo coupon discount logic",
        "c81d290 fix(security): prevent header injection in auth tokens [JIRA-102]",
        "98ca7a4 feat(tax): implement 18% standard GST helper [JIRA-101]",
        "3a4f891 feat(server): initialize HTTP server on port 8080"
      ],
      badge: "Noise Filtering",
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
                <span>Git Module 001_003 &bull; Topic 4 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Filtering History by Commit Message: <code className="text-cyan-300 font-mono text-lg">git log --grep</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 3: Limiting &amp; Filtering</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 5: Path-Specific History</span>
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
              <span>Traceability &amp; Bug Triage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Finding Needles in the Commit Haystack
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When production QA flags a defect linked to ticket <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">JIRA-402</code>, or when an auditor inquires about when a cryptography patch was applied, you need immediate message-level lookup. <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git log --grep</code> scans subject lines and extended bodies at lightning speed without checking out old commits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Tag className="w-4 h-4" />
                  <span>Ticket Traceability</span>
                </div>
                <p className="text-slate-400">
                  Instantly locate the commit where a feature was launched or a bug fix was applied by searching Jira/GitHub issue numbers.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Bug className="w-4 h-4" />
                  <span>Conventional Commits Synergy</span>
                </div>
                <p className="text-slate-400">
                  Extract pure changelogs by querying <code className="text-emerald-300 font-mono">--grep="^feat"</code> or <code className="text-emerald-300 font-mono">--grep="BREAKING CHANGE"</code>.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <Search className="w-4 h-4" />
                  <span>Boolean Logic &amp; Regex</span>
                </div>
                <p className="text-slate-400">
                  Combine multiple patterns using OR logic or strict AND matching with <code className="text-purple-300 font-mono">--all-match</code>.
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
                <span>Interactive Grep Search</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Simulate Commit Message Regex Searches
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Click a scenario to see the command and output
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(grepScenarios).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveGrepScenario(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeGrepScenario === key
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
                <span>Command: <strong className="text-cyan-300">{grepScenarios[activeGrepScenario].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${grepScenarios[activeGrepScenario].color}`}>
                {grepScenarios[activeGrepScenario].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {grepScenarios[activeGrepScenario].desc}
            </p>

            {/* Terminal Output */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {grepScenarios[activeGrepScenario].output.map((line, idx) => (
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
            <span>Search Flag Syntax Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Commit Message Grep &amp; Boolean Modifiers
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Modifier Flag</th>
                  <th className="p-4 text-cyan-400">Syntax Example</th>
                  <th className="p-4 text-emerald-400">Behavior &amp; Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">--grep</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --grep="JIRA-101"</td>
                  <td className="p-4">Matches substring pattern against commit subject and body text.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">-i / --regexp-ignore-case</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --grep="gst" -i</td>
                  <td className="p-4">Makes pattern matching case-insensitive (matches 'GST', 'Gst', 'gst').</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">--all-match</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --all-match --grep="fix" --grep="auth"</td>
                  <td className="p-4">Enforces boolean AND: only commits containing ALL specified grep patterns are logged.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">--invert-grep</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log --invert-grep --grep="Merge"</td>
                  <td className="p-4">Enforces boolean NOT: outputs commits that do NOT match the pattern.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">-E / --extended-regexp</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git log -E --grep="fix(auth|tax)"</td>
                  <td className="p-4">Enables modern POSIX Extended Regular Expressions without escaping parentheses.</td>
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
            Sukanta Sir Mentors Abhronila &amp; Debangshu on Production Bug Tracking
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Abhronila, a support ticket came in saying issue <code className="text-cyan-300 font-mono">BUG-891</code> regarding GST invoice PDF generation was supposedly fixed last month. How can you find the exact commit hash and developer who worked on it?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                AB
              </div>
              <div>
                <div className="font-semibold text-pink-300 text-xs mb-1">Abhronila QualityAssurance (Student)</div>
                <p className="text-slate-300">
                  "Sir! I run <code className="text-pink-300 font-mono">git log --grep=\"BUG-891\" -i --oneline</code>. Git scans the entire repository commit log, pinpoints the commit immediately, and gives me the 7-character hash!"
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
                  "Brilliant! And Debangshu, what is the difference between <code className="text-cyan-300 font-mono">git grep</code> and <code className="text-cyan-300 font-mono">git log --grep</code>?"
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
                  "<code className="text-amber-300 font-mono">git grep</code> searches inside our actual JavaScript source code files on disk. But <code className="text-amber-300 font-mono">git log --grep</code> searches inside the commit messages and descriptions recorded in the Git history graph!"
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
            The 7 Commandments of Commit Message Searching
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always include issue keys in commit headers",
                desc: "Prefixing messages with '[JIRA-101]' or '#42' makes git log --grep 100% reliable for project managers.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Always add -i for case-insensitive keyword searches",
                desc: "Keywords like 'OAuth', 'OAUTH', or 'oauth' will be missed unless -i is included.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use ^ anchor for Conventional Commits",
                desc: "git log --grep='^feat' ensures you only match features, not commits mentioning 'feature' in passing.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Remember multiple --grep flags default to OR",
                desc: "If you want both terms present, you must explicitly supply the --all-match flag.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Use --invert-grep to filter out merge churn",
                desc: "Run git log --invert-grep --grep='Merge' to see only genuine code modifications.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Combine with --author and --since for surgical precision",
                desc: "Targeting author, time window, and ticket key simultaneously yields instant results.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Differentiate git grep from git log --grep",
                desc: "Use git grep for source code search and git log --grep for commit history message search.",
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
              topic4_files/git_log_grep_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Regex Commit Message Searching
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct commits with issue keys and practice boolean grep queries.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_grep_lab.sh
./git_log_grep_lab.sh

# 2. Key Commands Executed:
git log --grep="JIRA-102" --oneline
git log --grep="discount" --grep="tax" -i --oneline
git log --grep="^fix" --oneline
git log --invert-grep --grep="refactor" --oneline`}
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
                q: "Does git log --grep search the code changes inside the commit?",
                a: "No. '--grep' strictly searches the commit message text (subject and body). To search commits that changed specific lines of code, use the pickaxe operator 'git log -S' or 'git log -G'."
              },
              {
                q: "How do I make multiple --grep flags work with AND logic instead of OR?",
                a: "Include the '--all-match' flag: 'git log --all-match --grep=\"fix\" --grep=\"security\"'."
              },
              {
                q: "How can I search for commits matching a phrase with spaces?",
                a: "Enclose the entire search phrase in quotes: 'git log --grep=\"database connection timeout\"'."
              },
              {
                q: "What does --invert-grep do?",
                a: "It filters the log to show only commits whose messages do not match the specified grep patterns."
              },
              {
                q: "Can I use Perl-compatible regular expressions with git log --grep?",
                a: "Yes. Pass the '-P' or '--perl-regexp' flag to use PCRE syntax (e.g., lookaheads, lookbehinds)."
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
            Topic 4 Assessment: Commit Message Grep &amp; Regex
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of pattern matching, issue tracking lookup, boolean logic, and invert filtering.
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
          <PlainTextPrint content={noteText} fileName="git_log_grep_notes.txt" />
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
            <span>Prev: Topic 3 – Limiting &amp; Filtering</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 5 – Path-Specific History</span>
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
