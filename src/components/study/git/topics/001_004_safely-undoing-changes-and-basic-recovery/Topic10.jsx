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
  FolderMinus,
  Sparkle
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
 * Topic 10: Cleaning Untracked Files and Directories: git clean with dry-run (-n), force (-f), recursive directory (-d), and ignored file (-x) options
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [selectedFlag, setSelectedFlag] = useState("dryRun");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 10;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const flagGuide = {
    dryRun: {
      flag: "-n (--dry-run)",
      badge: "Mandatory Safety Preview",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "Shows exactly what untracked files and directories would be deleted without deleting anything.",
      command: "git clean -nd",
      output: "Would remove scratch.txt\nWould remove temp_build/"
    },
    forceDir: {
      flag: "-fd",
      badge: "Standard Workspace Clean",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "Forcibly deletes untracked files AND untracked directories, while preserving files listed in .gitignore.",
      command: "git clean -fd",
      output: "Removing scratch.txt\nRemoving temp_build/"
    },
    allIgnored: {
      flag: "-fdx",
      badge: "Nuclear Clean (Deletes .gitignore matches)",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Deletes untracked files, folders, AND all ignored items like node_modules/ and dist/ build outputs.",
      command: "git clean -fdx",
      output: "Removing node_modules/\nRemoving dist/\nRemoving scratch.txt"
    },
    onlyIgnored: {
      flag: "-fdX",
      badge: "Build Artifact Purge Only",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800",
      description: "Purges ONLY ignored files/build artifacts, safely preserving your new un-staged source files.",
      command: "git clean -fdX",
      output: "Removing node_modules/\nRemoving dist/"
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
                <span>Git Module 001_004 &bull; Topic 10 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Cleaning Untracked Files and Directories with git clean
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Mastering -n (dry-run), -f (force), -d (directories), -x (ignored), and bulletproof workspace hygiene.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <Trash2 className="w-3.5 h-3.5" /> Untracked Pruning
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Dry-Run Guard
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
                Explain Like I&apos;m 10: The Workspace Sweeper
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understanding why Git has a special broom for things it has never seen before.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Trash2 className="w-4 h-4" /> The Study Table Analogy
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imagine your study desk at home in <strong>Barrackpore</strong>. Your official textbooks and notebooks are <strong>Tracked Files</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you cut scrap paper, leave chocolate wrappers, or create rough doodle notes, those are <strong>Untracked Files</strong>. Commands like <code className="text-cyan-300 font-mono">git reset</code> only organize your textbooks. To sweep away all the scrap paper in one go, you use <strong>git clean</strong>!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Guidance at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-amber-300">Mahima:</strong> &quot;Sir, why does <code className="text-cyan-300">git clean</code> refuse to run when I don&apos;t give it any options?&quot;
                </p>
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Because untracked file deletions are PERMANENT and bypass the Recycle Bin! Git refuses to clean until you prove you know what you are doing by running <code className="text-cyan-300 font-mono">git clean -nd</code> first!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION & FLAG EXPLORER ────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Interactive Flag Navigator: -n, -f, -d, -x &amp; -X
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(flagGuide).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setSelectedFlag(key)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  selectedFlag === key
                    ? "bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="text-sm font-bold text-white font-mono mb-1">{item.flag}</div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <p className="text-xs text-slate-300 line-clamp-2 mt-2">
                  {item.description}
                </p>
              </button>
            ))}
          </div>

          {/* Detailed Flag Inspection Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white font-mono">
                Command: {flagGuide[selectedFlag].command}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${flagGuide[selectedFlag].badgeColor}`}>
                {flagGuide[selectedFlag].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {flagGuide[selectedFlag].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">Simulated Terminal Output:</span>
              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap">
                {flagGuide[selectedFlag].output}
              </pre>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: VISUAL FILE FILTERING FLOW SVG ───────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual Filtering Diagram: How git clean Filters Files
                </h2>
                <p className="text-xs text-slate-400">
                  Tracked files vs Untracked files vs Ignored (.gitignore) files.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 240"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              {/* Box 1: Tracked Files (Protected) */}
              <rect x="50" y="40" width="210" height="160" rx="10" fill="#064e3b" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
              <text x="155" y="70" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">Tracked Files</text>
              <text x="155" y="100" textAnchor="middle" fill="#f8fafc" fontSize="11 font-mono">src/app.js</text>
              <text x="155" y="125" textAnchor="middle" fill="#f8fafc" fontSize="11 font-mono">package.json</text>
              <rect x="70" y="150" width="170" height="26" rx="5" fill="#065f46" />
              <text x="155" y="167" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">100% IGNORED BY CLEAN</text>

              {/* Box 2: Untracked Files */}
              <rect x="295" y="40" width="210" height="160" rx="10" fill="#78350f" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="400" y="70" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Untracked Files</text>
              <text x="400" y="100" textAnchor="middle" fill="#f8fafc" fontSize="11 font-mono">scratch.txt</text>
              <text x="400" y="125" textAnchor="middle" fill="#f8fafc" fontSize="11 font-mono">temp_folder/</text>
              <rect x="315" y="150" width="170" height="26" rx="5" fill="#92400e" />
              <text x="400" y="167" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">PURGED BY `git clean -fd`</text>

              {/* Box 3: Ignored Files (.gitignore) */}
              <rect x="540" y="40" width="210" height="160" rx="10" fill="#701a75" fillOpacity="0.2" stroke="#d946ef" strokeWidth="1.5" />
              <text x="645" y="70" textAnchor="middle" fill="#e879f9" fontSize="13" fontWeight="bold">Ignored Files (.gitignore)</text>
              <text x="645" y="100" textAnchor="middle" fill="#f8fafc" fontSize="11 font-mono">node_modules/</text>
              <text x="645" y="125" textAnchor="middle" fill="#f8fafc" fontSize="11 font-mono">dist/ &bull; .env</text>
              <rect x="560" y="150" width="170" height="26" rx="5" fill="#86198f" />
              <text x="645" y="167" textAnchor="middle" fill="#fae8ff" fontSize="10" fontWeight="bold">PURGED BY `git clean -fdx`</text>
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
              Defensive Best Practices for git clean
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Accidental .env Deletion
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-rose-300 font-mono">git clean -fdx</code> purges ignored local secret keys in <code className="text-rose-300 font-mono">.env</code>.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prevention
              </div>
              <p className="text-xs text-slate-400">
                Pass <code className="text-cyan-300 font-mono">-e &quot;.env*&quot;</code> to protect your credentials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Forgetting the -d Flag
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-amber-300 font-mono">git clean -f</code> leaves empty untracked directories behind on disk.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prevention
              </div>
              <p className="text-xs text-slate-400">
                Always use <code className="text-cyan-300 font-mono">-fd</code> for full folder cleaning.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Skipping Dry-Run
              </div>
              <p className="text-xs text-slate-300">
                Force-deleting without previewing what files will be destroyed.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prevention
              </div>
              <p className="text-xs text-slate-400">
                Always run <code className="text-cyan-300 font-mono">git clean -nd</code> first!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Terminal Challenge: The Ultimate Repository Nuke
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Whenever a local development environment gets completely broken with stale npm modules and strange cache bugs, run: <code className="text-cyan-300 font-mono">git reset --hard HEAD &amp;&amp; git clean -fdx</code>. This pair returns your repo to 100% clone-fresh state!
          </p>
        </section>

        {/* ─── SECTION 7: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="git clean & Untracked Files FAQs"
          questions={questions}
        />

        {/* ─── SECTION 8: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git clean Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 10 Revision Note"
          downloadFileName="git_clean_revision_note.txt"
        />

        {/* ─── SECTION 9: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Rule of Hygiene: Never leave untracked scratch files cluttering your project. But always remember: git clean bypasses the Recycle Bin! Develop the reflex of typing 'git clean -nd' first, verify the list, and only then execute 'git clean -fd'! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 10: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 9 (Merge Reverts)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 11: Interactive Cleaning (git clean -i)</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
