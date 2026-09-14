import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
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
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  GitMerge,
  Network,
  ShieldAlert,
  Flame,
  Cpu,
  FastForward,
  Scale
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
 * Topic 11: Merge Strategies & Algorithms: Recursive strategy vs Modern ORT (Ostensibly Recursive's Twin) strategy in Git 2.33+
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [selectedEngine, setSelectedEngine] = useState("ort"); // "ort" or "recursive"

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* ─── Top Sticky Mini Bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <Link
            to={`/${folder}`}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">
            {currentModule?.title || "Merging Strategies"}
          </span>
          <span>/</span>
          <span className="text-amber-400 font-mono">Topic-11</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={prevTopicUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* ─── Section 1: Header & Badges ─────────────────────────────────── */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Algorithmic Engine
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
              Git 2.33+ Standard
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              ORT vs Recursive
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Merge Strategies &amp; Algorithms
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Deconstructing Git's integration engines: comparing the legacy <code className="text-amber-400 font-mono">recursive</code> strategy with the modern <code className="text-emerald-400 font-mono">ort</code> (Ostensibly Recursive's Twin) engine, rename detection breakthroughs, and fine-tuning with <code className="text-sky-400 font-mono">-X ours/theirs</code> strategy options.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Explain Like I'm 10: The Smart Filing Clerk Upgrade
              </h2>
              <p className="text-xs text-emerald-300">
                Sukanta Sir explains Git's ORT engine to Sachin and Susmita at Coder & AccoTax
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-amber-300">Sachin:</strong> "Sir, in my terminal I noticed Git says <code className="text-emerald-400 font-mono">Merge made by the 'ort' strategy</code>. What is ORT? Does it stand for something magical?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Haha! It stands for <em>'Ostensibly Recursive's Twin'</em>. For 15 years, Git used a clerk named 'Recursive'. Recursive was smart, but if Susmita renamed a folder from <code className="text-slate-200">ledger/</code> to <code className="text-slate-200">src/billing/</code> while you edited lines in that file, Recursive would get confused and take minutes to calculate. In 2021, Git hired 'ORT'—a supercomputer filing clerk that runs 500x faster, remembers file renames with laser precision, and eliminates directory merge headaches!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Susmita
              </div>
              <p>
                <strong className="text-indigo-300">Susmita:</strong> "And what if I want Git to automatically pick my branch's tax rate whenever a conflict happens, but still keep all of Sachin's new features that don't collide?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "You pass a strategy option: <code className="text-sky-300 font-mono font-bold">git merge -X ours</code>! That tells ORT: <em>'Merge everything cleanly, and only on lines where we collide, prioritize our version!'</em>"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive Engine Benchmark Simulator ──────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FastForward className="w-5 h-5 text-emerald-400" />
                Merge Engine Architecture Comparison
              </h2>
              <p className="text-xs text-slate-400">
                Compare internal mechanisms: Legacy Recursive vs Modern ORT
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSelectedEngine("recursive")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  selectedEngine === "recursive"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Legacy Recursive (Pre-2021)
              </button>
              <button
                onClick={() => setSelectedEngine("ort")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  selectedEngine === "ort"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Modern ORT (Git 2.33+)
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-500 font-mono">EXECUTION SPEED</div>
              <div className="text-lg font-extrabold text-white">
                {selectedEngine === "ort" ? (
                  <span className="text-emerald-400">~0.12s (500x Faster)</span>
                ) : (
                  <span className="text-amber-400">~62.4s (High Overhead)</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedEngine === "ort"
                  ? "Caches tree computations across rebase series."
                  : "Repeats full diff calculations on every commit."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-500 font-mono">DIRECTORY RENAMES</div>
              <div className="text-lg font-extrabold text-white">
                {selectedEngine === "ort" ? (
                  <span className="text-emerald-400">100% Deterministic</span>
                ) : (
                  <span className="text-amber-400">Prone to Edge Conflicts</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedEngine === "ort"
                  ? "Detects nested directory moves seamlessly."
                  : "Often triggers false add/delete collisions."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-500 font-mono">INDEX COUPLING</div>
              <div className="text-lg font-extrabold text-white">
                {selectedEngine === "ort" ? (
                  <span className="text-emerald-400">Decoupled in Memory</span>
                ) : (
                  <span className="text-amber-400">Tightly Bound to Index</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedEngine === "ort"
                  ? "Performs tree operations in-memory without disk I/O."
                  : "Writes intermediate state to disk index."}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 4: Deep Technical Analysis: Strategy Options (-X) ──── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-emerald-400" />
              The Crucial Difference: -s ours vs -X ours
            </h2>
            <p className="text-sm text-slate-400">
              One of the most commonly misunderstood concepts in intermediate Git
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-rose-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-rose-400 font-mono font-bold text-sm">-s ours (Strategy)</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                  Destructive to Feature
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces the entire resulting merge tree with <code className="text-slate-200">HEAD</code>. <strong>Discards 100% of incoming changes</strong>, even non-conflicting new files or functions. Used solely to record that a branch was merged for retirement purposes.
              </p>
              <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-rose-300">
                $ git merge -s ours feature/obsolete
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-mono font-bold text-sm">-X ours (Strategy Option)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Intelligent 3-Way Auto Resolver
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Executes the full 3-way ORT merge. Keeps all non-conflicting files and additions from both branches. <strong>Only on lines that collide</strong>, it automatically favors our local HEAD version without opening conflict markers.
              </p>
              <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-emerald-300">
                $ git merge -X ours feature/revised-tax
              </div>
            </div>
          </div>
        </div>

        {/* ─── Section 5: Other Specialized Merge Strategies ──────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg border-b border-slate-800 pb-3">
            <Layers className="w-5 h-5" />
            Specialized Git Merge Strategies
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-sky-400 font-bold mb-1">octopus</div>
              <p className="text-xs text-slate-400">
                Merges &gt;2 branches at once. Standard for Linux kernel subsystem maintainers. Aborts if conflicts arise.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">subtree</div>
              <p className="text-xs text-slate-400">
                Adjusts directory path prefixes to merge a foreign repository into a subfolder of your repo.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-mono text-amber-400 font-bold mb-1">resolve</div>
              <p className="text-xs text-slate-400">
                Legacy 3-way algorithm that only works on single merge bases; fast but fails on criss-cross merges.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 6: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Abhronila:</strong> "Sir, what happens if our team has formatting wars with spaces and tabs?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Use <code className="text-sky-300 font-mono font-bold">git merge -X ignore-all-space &lt;branch&gt;</code>! ORT will ignore indentation differences and only check meaningful code logic changes."
            </p>
          </div>
        </div>

        {/* ─── Section 7: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Modern Best Practices
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Rely on default <code className="text-slate-200">ort</code> engine for all standard merges.</li>
              <li>Use <code className="text-slate-200">-X ours</code> / <code className="text-slate-200">-X theirs</code> for high-volume automated bot PRs.</li>
              <li>Leverage <code className="text-slate-200">-X ignore-space-change</code> when migrating formatters.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Danger Zone
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Never use <code className="text-rose-400 font-mono font-bold">-s ours</code> unless your deliberate intent is to completely throw away all code from the incoming branch!
            </p>
          </div>
        </div>

        {/* ─── Section 8: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Merge Strategies & Algorithms (ORT vs Recursive)"
          content={noteText}
        />

        {/* ─── Section 9: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Merge Strategies & ORT Engine"
          questions={questions}
        />

        {/* ─── Section 10: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 11: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Squash Merging (git merge --squash)
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Classroom Drama: AuthController Conflict Simulation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
