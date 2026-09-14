import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
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
  Trash2,
  Sliders,
  Check,
  Terminal,
  Filter,
  ListOrdered,
  HelpCircle as QuestionIcon,
  LogOut
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
 * Topic 11: Interactive Cleaning: Running git clean -i for safe step-by-step interactive pruning
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [activeMenuOption, setActiveMenuOption] = useState("selectNumbers");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const menuOptions = {
    clean: {
      number: "1: clean",
      title: "Execute Deletion",
      badge: "Action Command",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Permanently deletes all currently selected untracked candidate files and directories immediately.",
      cliSnippet: "What now> 1\nRemoving scratch.txt\nRemoving debug_dump.log",
      advice: "Only select when you have verified that no precious files remain in the selection list."
    },
    filterPattern: {
      number: "2: filter by pattern",
      title: "Exclude Files by Glob",
      badge: "Batch Exclude",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "Prompts you to enter an exclusion glob pattern (e.g. *.sql or *.env) to remove matching files from the deletion queue.",
      cliSnippet: "What now> 2\nInput ignore patterns>> *.env\nWould remove: scratch.txt, debug.log (protected: .env.local)",
      advice: "Ideal for protecting configuration and database dump files on the fly."
    },
    selectNumbers: {
      number: "3: select by numbers",
      title: "Choose Specific Items",
      badge: "Most Popular",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "Displays a numbered list of all candidates. Type individual numbers (1, 3) or ranges (4-7) to select/deselect items marked with an asterisk (*).",
      cliSnippet: "What now> 3\n 1: *scratch.txt    2:  keep_me.txt    3: *test.log\nSelect items to delete>> 1, 3\n(Press Enter to confirm)",
      advice: "Provides absolute surgical control over exactly which files are pruned."
    },
    askEach: {
      number: "4: ask each",
      title: "Prompt on Every File",
      badge: "Sequential Verification",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "Steps through every untracked file one by one, asking 'Remove <path> [y/N]?' before deleting.",
      cliSnippet: "What now> 4\nRemove scratch.txt [y/N]? y\nRemove keep_me.txt [y/N]? n",
      advice: "Best when you have 3-5 files and want a quick yes/no prompt on each."
    },
    quit: {
      number: "5: quit",
      title: "Safe Exit Without Changes",
      badge: "Emergency Exit",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800",
      description: "Immediately exits interactive mode and returns to your shell prompt without modifying or deleting anything.",
      cliSnippet: "What now> 5\nBye.",
      advice: "Use this anytime you feel unsure or need to review file contents first."
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
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 11 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Interactive Cleaning with git clean -i
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Step-by-step interactive pruning, numbered item selection, pattern filtering, and zero-risk workspace cleanup.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <Terminal className="w-3.5 h-3.5" /> Interactive CLI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Granular Control
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: SIMPLE LANGUAGE EXPLANATION (ELI10) ─────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Explain Like I&apos;m 10: The Sorting Assistant
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding why having a helpful assistant asking about each item is safer than a bulldozer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <ListOrdered className="w-4 h-4" /> The Wardrobe Cleaning Analogy
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you clean out your old clothes wardrobe in <strong>Barrackpore</strong>, you don&apos;t close your eyes and throw the entire shelf into the incinerator!
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                You pick up each shirt: <em>&quot;Shirt 1: Donate? Yes. Shirt 2: Favorite jacket? Keep! Shirt 3: Old socks? Throw away.&quot;</em> In Git, <code className="text-cyan-300 font-mono">git clean -i</code> is your smart assistant that holds up each untracked file so you can decide item by item!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Guidance at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Susmita:</strong> &quot;Sir, I have 15 test files and 1 database backup script in my folder. I am terrified of running <code className="text-rose-300">git clean -fd</code>.&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Run <code className="text-cyan-300 font-mono">git clean -id</code> instead! It gives you an interactive menu where you can uncheck your database backup and clean only the 15 test files safely!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE MENU EXPLORER ────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Menu Command Explorer (1 to 5)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {Object.entries(menuOptions).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveMenuOption(key)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  activeMenuOption === key
                    ? "bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="text-xs font-bold text-white font-mono">{item.number}</div>
                <div className="text-xs font-semibold text-slate-300 mt-1">{item.title}</div>
                <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded border mt-2 ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Menu Detail Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white font-mono">
                Command: {menuOptions[activeMenuOption].number} &bull; {menuOptions[activeMenuOption].title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${menuOptions[activeMenuOption].badgeColor}`}>
                {menuOptions[activeMenuOption].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {menuOptions[activeMenuOption].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">Terminal CLI Interaction:</span>
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">
                {menuOptions[activeMenuOption].cliSnippet}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Teacher&apos;s Advice:</span>
              <span>{menuOptions[activeMenuOption].advice}</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: VISUAL MENU STATE SVG ────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual Flow: The Interactive Clean Decision Loop
                </h2>
                <p className="text-xs text-slate-400">
                  How Git loops through filter, select, and prompt stages before executing deletions.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 240"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              {/* Box 1: Launch */}
              <rect x="40" y="80" width="160" height="80" rx="10" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="120" y="115" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">git clean -id</text>
              <text x="120" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">Scans untracked</text>

              {/* Arrow */}
              <line x1="200" y1="120" x2="270" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Box 2: Menu Options */}
              <rect x="280" y="40" width="220" height="160" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              <text x="390" y="70" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Interactive Menu</text>
              <text x="310" y="100" fill="#cbd5e1" fontSize="11 font-mono">1: clean</text>
              <text x="310" y="125" fill="#38bdf8" fontSize="11 font-mono">2: filter pattern</text>
              <text x="310" y="150" fill="#34d399" fontSize="11 font-mono">3: select numbers</text>
              <text x="310" y="175" fill="#c084fc" fontSize="11 font-mono">5: quit (safe)</text>

              {/* Arrow */}
              <line x1="500" y1="120" x2="570" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Box 3: Execution */}
              <rect x="580" y="80" width="180" height="80" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="670" y="115" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Safe Deletion</text>
              <text x="670" y="135" textAnchor="middle" fill="#a7f3d0" fontSize="10">Targeted files only</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: COMMON PITFALLS ──────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Clean Pitfalls &amp; Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Forgetting to Press Enter
              </div>
              <p className="text-xs text-slate-300">
                In `select by numbers`, typing numbers without pressing Enter with an empty line to confirm.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fix
              </div>
                <p className="text-xs text-slate-400">
                  Press Enter on a blank line to return to the main <code className="text-slate-200">What now&gt;</code> menu.
                </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Selecting Option 1 Immediately
              </div>
              <p className="text-xs text-slate-300">
                Typing `1` right away deletes ALL candidates without filtering!
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fix
              </div>
              <p className="text-xs text-slate-400">
                Use option 2 or 3 to curate your list BEFORE selecting option 1.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Not Supplying -d
              </div>
              <p className="text-xs text-slate-300">
                Running `git clean -i` without `-d` skips untracked directories.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fix
              </div>
              <p className="text-xs text-slate-400">
                Always run <code className="text-cyan-300 font-mono">git clean -id</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Interactive Terminal Challenge
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create 5 untracked files in your sandbox: <code className="text-cyan-300 font-mono">touch log1.txt log2.txt keep.sql data.csv temp.bin</code>. Run <code className="text-cyan-300 font-mono">git clean -id</code>, use Option 2 to filter out <code className="text-amber-300 font-mono">*.sql</code>, then select Option 1 to clean. Verify that <code className="text-cyan-300 font-mono">keep.sql</code> survived!
          </p>
        </section>

        {/* ─── SECTION 7: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Interactive Cleaning & git clean -i FAQs"
          questions={questions}
        />

        {/* ─── SECTION 8: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git clean -i Interactive Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 11 Revision Note"
          downloadFileName="git_clean_interactive_revision_note.txt"
        />

        {/* ─── SECTION 9: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Whenever you have a mixed directory with both disposable logs and valuable experiment files, never run blind force-cleans. Type 'git clean -id', take 30 seconds to select what you want, and sleep peacefully knowing your work is safe! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 10: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 10 (Cleaning Untracked Files)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 12: Classroom Troubleshooting Case Study</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
