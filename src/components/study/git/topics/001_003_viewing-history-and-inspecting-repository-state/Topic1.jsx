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
  Tag,
  GitMerge,
  Split
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic 1: Formatting Log Output: git log --oneline, --decorate, and graphical branching view with git log --graph --all
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [activeViewMode, setActiveViewMode] = useState("allGraph");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 1;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/0`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/2`;

  const viewModes = {
    standard: {
      title: "1. Standard git log --oneline",
      cmd: "git log --oneline",
      desc: "Shows commits strictly reachable from current HEAD in compact single-line format.",
      output: [
        "7b1e4a8 merge: integrate feature/discount into main",
        "98ca7a4 feat(tax): configure standard 18% GST constant",
        "c81d290 feat(discount): add festive promo coupon calculator",
        "e4a9012 feat(core): setup base application entrypoint",
        "3a4f891 feat(core): initial repository setup"
      ],
      badge: "Linear View",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    decorate: {
      title: "2. Ref-Decorated View (git log --oneline --decorate)",
      cmd: "git log --oneline --decorate",
      desc: "Adds branch pointers, tags, and HEAD position badges alongside commit hashes.",
      output: [
        "7b1e4a8 (HEAD -> main, origin/main) merge: integrate feature/discount",
        "98ca7a4 feat(tax): configure standard 18% GST constant",
        "c81d290 (feature/discount) feat(discount): add festive promo coupon",
        "e4a9012 (tag: v1.0.0) feat(core): setup base application entrypoint",
        "3a4f891 feat(core): initial repository setup"
      ],
      badge: "Ref Aware",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    allGraph: {
      title: "3. Full Topology View (git log --graph --oneline --decorate --all)",
      cmd: "git log --graph --oneline --decorate --all",
      desc: "Visualizes the complete repository Directed Acyclic Graph (DAG) including unmerged feature branches and stashes.",
      output: [
        "* 2d89f10 (feature/audit) feat(audit): initialize compliance audit logging",
        "*   7b1e4a8 (HEAD -> main, origin/main) merge: integrate feature/discount",
        "|\\",
        "| * c81d290 (feature/discount) feat(discount): add festive promo coupon",
        "| * a1b2c3d feat(discount): support VIP tier discount overrides",
        "* | 98ca7a4 feat(tax): configure standard 18% GST constant",
        "|/",
        "* e4a9012 (tag: v1.0.0) feat(core): setup base application entrypoint",
        "* 3a4f891 feat(core): initial repository setup"
      ],
      badge: "Full DAG Power",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
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
                <span>Git Module 001_003 &bull; Topic 1 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Formatting Log Output: <code className="text-cyan-300 font-mono text-lg">--oneline</code>, <code className="text-cyan-300 font-mono text-lg">--decorate</code>, &amp; <code className="text-cyan-300 font-mono text-lg">--graph --all</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 0: Log Deep Dive</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 2: Pretty Print</span>
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
              <span>Developer Workflow Speed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              From Multi-Page Scrolling to Instant Visual Clarity
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              Default <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git log</code> prints 6–10 lines for every single commit. In busy engineering repositories with 50+ commits a week, default log output floods your terminal screen. By combining condensed hashes, branch decoration tags, and ASCII DAG graph rendering, you can inspect 30 commits and complex branching topologies in a single glance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Split className="w-4 h-4" />
                  <span>--oneline Density</span>
                </div>
                <p className="text-slate-400">
                  Condenses each commit into exactly one line: 7-character short SHA + subject message. Fits 30 commits on a standard laptop display.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <Tag className="w-4 h-4" />
                  <span>--decorate Context</span>
                </div>
                <p className="text-slate-400">
                  Instantly displays where <code className="text-purple-300 font-mono">HEAD</code>, local branches, remote tracking branches (<code className="text-purple-300 font-mono">origin/main</code>), and release tags are positioned.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <GitMerge className="w-4 h-4" />
                  <span>--graph --all Topology</span>
                </div>
                <p className="text-slate-400">
                  Draws the full tree graph in ASCII characters, exposing unmerged feature branches, parallel spikes, and merge conflicts at once.
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
                <span>Interactive Terminal View Modes</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Compare Git History Output Modes
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Switch modes to compare output formats
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(viewModes).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => setActiveViewMode(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeViewMode === key
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>{mode.title}</span>
              </button>
            ))}
          </div>

          {/* Terminal Simulator Window */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>$ <strong className="text-cyan-300">{viewModes[activeViewMode].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${viewModes[activeViewMode].color}`}>
                {viewModes[activeViewMode].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {viewModes[activeViewMode].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {viewModes[activeViewMode].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.includes("*") ? (
                    <span className="text-amber-400 font-bold">{line.substring(0, line.indexOf(" ") + 1)}</span>
                  ) : null}
                  <span className={line.includes("HEAD") ? "text-cyan-300 font-semibold" : ""}>
                    {line.includes("*") ? line.substring(line.indexOf(" ") + 1) : line}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Configure the supreme developer shortcut now:</span>
              </div>
              <code className="bg-slate-900 px-3 py-1 rounded text-cyan-300 font-mono border border-slate-800 select-all">
                git config --global alias.lg "log --graph --oneline --decorate --all"
              </code>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Command Feature Comparison</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Log Formatting Flags Matrix
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Flag</th>
                  <th className="p-4 text-cyan-400">Lines per Commit</th>
                  <th className="p-4 text-purple-400">Branch &amp; Tag Refs</th>
                  <th className="p-4 text-emerald-400">Visual Graph</th>
                  <th className="p-4 text-amber-400">Includes Unmerged Branches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-white font-semibold">git log</td>
                  <td className="p-4 text-rose-400">6–10 lines (Full)</td>
                  <td className="p-4 text-slate-400">Auto in Git 2.13+</td>
                  <td className="p-4 text-slate-500">No</td>
                  <td className="p-4 text-slate-500">No (HEAD only)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-white font-semibold">git log --oneline</td>
                  <td className="p-4 text-emerald-400 font-semibold">1 line (7-hex SHA)</td>
                  <td className="p-4 text-slate-400">Auto in Git 2.13+</td>
                  <td className="p-4 text-slate-500">No</td>
                  <td className="p-4 text-slate-500">No (HEAD only)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-white font-semibold">git log --graph</td>
                  <td className="p-4 text-amber-400">Full block + graph line</td>
                  <td className="p-4 text-slate-400">Auto</td>
                  <td className="p-4 text-emerald-400 font-semibold">Yes (* | / \)</td>
                  <td className="p-4 text-slate-500">No (HEAD only)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-emerald-950/10">
                  <td className="p-4 font-mono text-xs text-cyan-300 font-semibold">git log --graph --oneline --decorate --all</td>
                  <td className="p-4 text-emerald-400 font-semibold">1 line per commit</td>
                  <td className="p-4 text-purple-300 font-semibold">Full color decorations</td>
                  <td className="p-4 text-emerald-400 font-semibold">Yes (ASCII DAG)</td>
                  <td className="p-4 text-emerald-400 font-semibold">Yes (All refs &amp; remotes)</td>
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
            Sukanta Sir Mentors Sachin &amp; Mahima on Visualizing Branch Merges
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Sachin, yesterday you asked why your feature branch <code className="text-cyan-300 font-mono">feature/discount</code> disappeared from <code className="text-cyan-300 font-mono">git log</code> when you switched back to <code className="text-cyan-300 font-mono">main</code>. What command were you running?"
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
                  "Sir, I was on <code className="text-amber-300 font-mono">main</code> and typed <code className="text-amber-300 font-mono">git log --oneline</code>. I panicked because my discount feature commits were completely missing! I thought Git deleted my work."
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
                  "Remember: <code className="text-cyan-300 font-mono">git log</code> only follows parent links starting from your active <code className="text-cyan-300 font-mono">HEAD</code>. If you haven't merged your feature branch into <code className="text-cyan-300 font-mono">main</code> yet, <code className="text-cyan-300 font-mono">main</code> has no pointers to it! Mahima, tell Sachin how to see every branch simultaneously."
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
                  "You add <code className="text-emerald-300 font-mono">--all</code>! Running <code className="text-emerald-300 font-mono">git log --graph --oneline --decorate --all</code> shows all branch tips, including unmerged branches, remote tracking branches, and tags, with the ASCII graph branch lines showing exactly where they split!"
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
            The 7 Commandments of Git Log Formatting
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Set up the 'git lg' alias on day one",
                desc: "Never type 40 characters when git lg provides instant graph visualization across all branches.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Keep commit titles under 50 characters",
                desc: "Single-line log views look cleanest when subject headers are concise and follow Conventional Commits.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Always include --all during branch audits",
                desc: "Omitting --all hides unmerged feature branches and remote changes, leading to false assumptions.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Watch for diverging remotes in decoration tags",
                desc: "If origin/main is on a different commit than main, you have either unpushed commits or pending pulls.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Use --graph before executing complex rebases",
                desc: "Inspect the topological merge parents visually before deciding to squash, rebase, or fast-forward.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Combine with -n to prevent runaway terminal output",
                desc: "In huge monorepos, use git lg -n 20 to restrict graph rendering to recent milestones.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Leverage tags to mark release checkpoints",
                desc: "Tags appear in bright yellow decorations in git log, making release boundaries effortless to spot.",
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
              topic1_files/git_log_formatting_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Building Branch Topologies &amp; Log Aliases
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to construct a multi-branch repository with merge commits, tags, and custom Git aliases.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_log_formatting_lab.sh
./git_log_formatting_lab.sh

# 2. Key Commands in Action:
git log --oneline
git log --oneline --decorate
git log --graph --oneline --decorate --all

# 3. Create persistent alias:
git config --global alias.lg "log --graph --oneline --decorate --all"
git lg`}
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
                q: "What does 'HEAD -> main' mean in the decorated output?",
                a: "'HEAD -> main' means your current active branch is 'main', and the HEAD symbolic reference is pointing to the tip of 'main'."
              },
              {
                q: "Why do some commits show '(tag: v1.0.0)' in the log?",
                a: "This indicates that an annotated or lightweight Git tag named 'v1.0.0' points directly to that commit object in the database."
              },
              {
                q: "Can I customize the colors used by git log --graph?",
                a: "Yes. You can customize colors in your ~/.gitconfig under '[color \"decorate\"]' and '[color \"branch\"]', or use custom pretty format placeholders."
              },
              {
                q: "What is the difference between git log --all and git log without --all?",
                a: "Without '--all', git log starts strictly from your current HEAD and only lists ancestor commits. With '--all', git log traverses all local branches, remote tracking branches, tags, and stashes."
              },
              {
                q: "How do I exit the git log pager when the screen fills up?",
                a: "Press 'q' on your keyboard to quit the pager (less) and return to your terminal prompt."
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
            Topic 1 Assessment: Log Formatting &amp; Graph Topology
          </h2>
          <p className="text-slate-400 text-sm">
            Test your command-line expertise on flags, decorations, aliases, and DAG interpretation.
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
          <PlainTextPrint content={noteText} fileName="git_log_formatting_notes.txt" />
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
            <span>Prev: Topic 0 – Log Deep Dive</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 2 – Custom Pretty Print</span>
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
