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
  Package,
  Scissors,
  Flame,
  GitCommit
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
 * Topic 6: The Three Modes of git reset: --soft, --mixed, and --hard
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [selectedMode, setSelectedMode] = useState("mixed");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const modes = {
    soft: {
      name: "--soft",
      badge: "Squashing & Re-packaging",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "Rewinds HEAD to target commit. Index (Staging) and Working Tree are untouched. All changes remain staged in green.",
      useCase: "Collapse 3-5 messy experimental commits into 1 clean commit.",
      command: "git reset --soft HEAD~3\ngit commit -m \"feat(billing): implement invoice generator with tests\"",
      head: "Rewound to target SHA",
      index: "Preserved (Staged in GREEN)",
      workTree: "Untouched (Files safe)"
    },
    mixed: {
      name: "--mixed (Default)",
      badge: "Splitting & Re-staging",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "Rewinds HEAD AND updates Index to match target commit. Changes remain in your Working Directory as unstaged edits (red).",
      useCase: "Split a bulky commit into multiple atomic commits by selective staging.",
      command: "git reset HEAD~1\ngit add auth.js && git commit -m \"feat: auth\"\ngit add db.js && git commit -m \"feat: schema\"",
      head: "Rewound to target SHA",
      index: "Synced with target (Unstaged in RED)",
      workTree: "Untouched (Files safe)"
    },
    hard: {
      name: "--hard",
      badge: "Complete Discard (DANGER)",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Rewinds HEAD, updates Index, AND forcibly overwrites Working Tree files. All changes made since target commit are wiped from disk.",
      useCase: "Completely discard a failed experimental attempt and reset to clean slate.",
      command: "git reset --hard HEAD~1\n# CAUTION: Uncommitted edits on disk are destroyed!",
      head: "Rewound to target SHA",
      index: "Synced with target",
      workTree: "Overwritten to match target (WIP destroyed)"
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
                <span>Git Module 001_004 &bull; Topic 6 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Three Modes of git reset: --soft, --mixed, and --hard
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Comparative architecture, state transition matrix, and practical industry workflows for all three reset modes.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <Package className="w-3.5 h-3.5" /> --soft
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-800">
                <Scissors className="w-3.5 h-3.5" /> --mixed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-800">
                <Flame className="w-3.5 h-3.5" /> --hard
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
                Explain Like I&apos;m 10: The Amazon Delivery Box Analogy
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding the 3 levels of opening a packaged parcel before shipping.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Package className="w-4 h-4" /> Real-Life Analogy: The Gift Parcel
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine you packed a gift box for your friend in Kolkata:
              </p>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong className="text-cyan-300">--soft:</strong> You remove the outer shipping label so you can repackage the box, but the items stay neatly bundled inside.</li>
                <li><strong className="text-amber-300">--mixed:</strong> You open the box and unpack all items onto your study table so you can pick and choose what to repack.</li>
                <li><strong className="text-rose-300">--hard:</strong> You throw the entire box and all its items into the garbage bin!</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Dialogue at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Mahima:</strong> &quot;Sir, which reset should I use if I made 5 tiny commits like &apos;fix typo&apos;, &apos;try again&apos; and want to submit just 1 clean commit?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Use <code className="text-cyan-300 font-mono">git reset --soft HEAD~5</code>! It unwraps the 5 commits right back into your staging area so you can commit once with a beautiful Conventional Commit message!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION & STATE MATRIX ─────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              State Comparison Matrix: Soft vs Mixed vs Hard
            </h2>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/70 text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Reset Mode</th>
                  <th className="py-3.5 px-4">Moves HEAD?</th>
                  <th className="py-3.5 px-4">Syncs Index (Staging)?</th>
                  <th className="py-3.5 px-4">Overwrites Working Tree?</th>
                  <th className="py-3.5 px-4">Safety Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr className="hover:bg-cyan-950/10 transition">
                  <td className="py-3.5 px-4 font-bold text-cyan-400">git reset --soft</td>
                  <td className="py-3.5 px-4 text-emerald-400">YES</td>
                  <td className="py-3.5 px-4 text-slate-400">NO (Staged in Green)</td>
                  <td className="py-3.5 px-4 text-slate-400">NO (Files Safe)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-sans font-semibold">Very Safe</td>
                </tr>
                <tr className="hover:bg-amber-950/10 transition">
                  <td className="py-3.5 px-4 font-bold text-amber-400">git reset --mixed (Default)</td>
                  <td className="py-3.5 px-4 text-emerald-400">YES</td>
                  <td className="py-3.5 px-4 text-amber-400">YES (Unstaged in Red)</td>
                  <td className="py-3.5 px-4 text-slate-400">NO (Files Safe)</td>
                  <td className="py-3.5 px-4 text-amber-400 font-sans font-semibold">Safe (Default)</td>
                </tr>
                <tr className="hover:bg-rose-950/10 transition">
                  <td className="py-3.5 px-4 font-bold text-rose-400">git reset --hard</td>
                  <td className="py-3.5 px-4 text-emerald-400">YES</td>
                  <td className="py-3.5 px-4 text-rose-400">YES</td>
                  <td className="py-3.5 px-4 text-rose-400 font-bold">YES (Overwrites Disk!)</td>
                  <td className="py-3.5 px-4 text-rose-400 font-sans font-semibold">DANGEROUS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE MODE EXPLORER ────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Mode Inspector
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(modes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedMode(key)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedMode === key
                    ? "bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white font-mono">{item.name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {item.useCase}
                </p>
              </button>
            ))}
          </div>

          {/* Selected Mode Detail Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white font-mono">
                {modes[selectedMode].name} Breakdown
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${modes[selectedMode].badgeColor}`}>
                {modes[selectedMode].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {modes[selectedMode].description}
            </p>

            {/* Tree State Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-cyan-400">HEAD Status:</span>
                <p className="text-xs text-slate-300 font-mono">{modes[selectedMode].head}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-amber-400">Staging Area (Index):</span>
                <p className="text-xs text-slate-300 font-mono">{modes[selectedMode].index}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-rose-400">Working Directory:</span>
                <p className="text-xs text-slate-300 font-mono">{modes[selectedMode].workTree}</p>
              </div>
            </div>

            {/* Terminal Command Example */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
              {modes[selectedMode].command}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: COMMON PITFALLS & DEFENSIVE ADVICE ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Defensive Best Practices for Resetting
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> The Uncommitted Work Trap
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-rose-300 font-mono">git reset --hard</code> while having unstaged work in progress.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Golden Defense
              </div>
              <p className="text-xs text-slate-400">
                Always create a quick safety backup branch: <code className="text-cyan-300 font-mono">git branch backup-safe</code> before running hard reset.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Resetting Shared Branches
              </div>
              <p className="text-xs text-slate-300">
                Using <code className="text-rose-300 font-mono">git reset</code> on branches pushed to origin/main.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Golden Defense
              </div>
              <p className="text-xs text-slate-400">
                Use <code className="text-cyan-300 font-mono">git revert</code> for public branches to create inverse commits safely.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Forgetting the Default
              </div>
              <p className="text-xs text-slate-300">
                Assuming <code className="text-amber-300 font-mono">git reset</code> defaults to <code className="text-rose-300 font-mono">--hard</code>.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Golden Defense
              </div>
              <p className="text-xs text-slate-400">
                Default is <code className="text-amber-300 font-mono">--mixed</code>. Your physical files on disk are completely safe!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Terminal Challenge: The Commit Splitter Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create a single commit containing both <code className="text-cyan-300 font-mono">header.html</code> and <code className="text-cyan-300 font-mono">footer.html</code>. Now unwrap it with <code className="text-amber-300 font-mono">git reset HEAD~1</code>, and commit them separately as two distinct atomic commits!
          </p>
        </section>

        {/* ─── SECTION 7: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="The Three Modes of git reset FAQs"
          questions={questions}
        />

        {/* ─── SECTION 8: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git reset Modes Comparison Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Revision Note"
          downloadFileName="git_reset_modes_revision_note.txt"
        />

        {/* ─── SECTION 9: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Mnemonic to remember forever: Soft = Squash (keeps staged). Mixed = Split (unstages to disk). Hard = Destroy (overwrites disk). When in doubt, always start with --soft or --mixed! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 10: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 5 (Demystifying git reset)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 7: The Golden Safety Rule of git reset --hard</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
