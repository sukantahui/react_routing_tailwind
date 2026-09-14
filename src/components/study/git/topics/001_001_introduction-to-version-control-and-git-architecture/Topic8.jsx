import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  Server,
  Laptop,
  Database,
  RefreshCw,
  Cpu,
  FileText,
  AlignLeft,
  FileDiff
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8: Handling Line Endings Across Operating Systems: core.autocrlf (true on Windows, input on macOS/Linux)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [selectedOS, setSelectedOS] = useState("windows");
  const [showHex, setShowHex] = useState(false);

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const hasNext = currentIndex < totalTopics - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ─── 1. Header Section ──────────────────────────────────────── */}
        <header className="space-y-4 border-b border-slate-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              to={`/${folder}/roadmap`}
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <FolderGit2 size={14} className="text-sky-400" />
              <span>Git Mastery Track</span>
            </Link>
            <span>/</span>
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="hover:text-sky-400 transition-colors"
            >
              Module 001_001
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Topic 09 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              Cross-Platform Normalization
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              CRLF vs LF &amp; .gitattributes
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Handling Line Endings Across Operating Systems: CRLF vs LF
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Eliminate invisible phantom diffs and broken Linux Docker/cloud deployments. Master <code className="text-sky-300 font-mono">core.autocrlf</code> for Windows, macOS, and Linux, enforce repository-wide standards with <code className="text-sky-300 font-mono">.gitattributes</code>, and learn repository renormalization.
          </p>
        </header>

        {/* ─── 2. Dedicated Simple Language Section ───────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl font-bold shrink-0 shadow-inner">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                In Simple Words (The Invisible Carriage Return)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Why pressing Enter looks different to Windows vs Linux computers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed text-slate-300">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-300 flex items-center gap-2 text-base">
                <Laptop size={16} />
                Windows: Two Hidden Characters (CRLF)
              </h3>
              <p>
                When you press Enter on Windows, it inserts TWO invisible characters: <strong>\r</strong> (Carriage Return - return to start of line) and <strong>\n</strong> (Line Feed - go down to next line).
              </p>
              <div className="text-xs font-mono text-amber-200 bg-slate-900 p-2 rounded border border-slate-800">
                &quot;Hello World\r\n&quot; (2 bytes for newline)
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 flex items-center gap-2 text-base">
                <Server size={16} />
                Linux / macOS: One Hidden Character (LF)
              </h3>
              <p>
                When you press Enter on Linux or Mac, it inserts ONLY ONE character: <strong>\n</strong> (Line Feed).
              </p>
              <div className="text-xs font-mono text-sky-200 bg-slate-900 p-2 rounded border border-slate-800">
                &quot;Hello World\n&quot; (1 byte for newline)
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. The Core.autocrlf Configuration Matrix ─────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The core.autocrlf Solution Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Windows Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Windows OS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  core.autocrlf = true
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Converts LF &rarr; CRLF when checking out to your Windows working tree, and converts CRLF &rarr; LF when committing to Git.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300">
                $ git config --global core.autocrlf true
              </div>
            </div>

            {/* macOS & Linux Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">macOS &amp; Linux</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  core.autocrlf = input
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Leaves LF untouched on checkout. If an accidental CRLF file is copied in, converts CRLF &rarr; LF when committing.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                $ git config --global core.autocrlf input
              </div>
            </div>

            {/* CI / Strict Servers Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">CI &amp; Strict Servers</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  .gitattributes
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Relies on version-controlled <code className="text-emerald-300">.gitattributes</code> to enforce rules across all team machines automatically.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                * text=auto eol=lf
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. The Gold Standard: .gitattributes ──────────────────── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="text-amber-400" size={20} />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Enterprise Gold Standard: .gitattributes Template
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Place in repo root</span>
          </div>

          <p className="text-sm text-slate-300">
            Create a file named <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">.gitattributes</code> in your repository root. Commit it to Git so every developer and CI/CD server follows the exact same normalization:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 space-y-1 leading-relaxed">
            <p className="text-slate-500"># 1. Auto-detect all text files and normalize to LF in repository</p>
            <p className="text-sky-300">* text=auto eol=lf</p>
            <p className="text-slate-500 mt-2"># 2. Force Unix LF explicitly for shell scripts, code, and config</p>
            <p className="text-emerald-300">*.sh text eol=lf</p>
            <p className="text-emerald-300">*.js text eol=lf</p>
            <p className="text-emerald-300">*.jsx text eol=lf</p>
            <p className="text-emerald-300">*.py text eol=lf</p>
            <p className="text-emerald-300">Dockerfile text eol=lf</p>
            <p className="text-slate-500 mt-2"># 3. Mark binary files so Git NEVER attempts line ending conversion</p>
            <p className="text-purple-300">*.png binary</p>
            <p className="text-purple-300">*.jpg binary</p>
            <p className="text-purple-300">*.pdf binary</p>
            <p className="text-purple-300">*.zip binary</p>
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: The Broken Docker Build
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Susmita (Student):</span>
              <p>
                &ldquo;Sir, my Node.js application ran perfectly on my Windows laptop in Barrackpore. But when we deployed the Docker container to AWS Linux, the container crashed with <code className="text-rose-400 bg-slate-900 px-1 py-0.5 rounded font-mono">/bin/sh^M: bad interpreter: No such file or directory</code>. We spent 3 hours trying to debug the JavaScript code!&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;That is the classic invisible <code className="text-rose-400 font-mono font-bold">^M</code> (Carriage Return) trap, Susmita! When you wrote <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">entrypoint.sh</code> on Windows without LF normalization, Windows saved <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">#!/bin/sh\r\n</code>. Linux looked for a binary named <code className="text-rose-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono">/bin/sh\r</code> which does not exist! By adding <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">*.sh text eol=lf</code> in <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">.gitattributes</code>, Git guarantees your shell scripts are clean Unix LF on every server!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Line Endings (CRLF vs LF): Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring core.autocrlf, .gitattributes, and repository renormalization"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 09 Study Note: Handling Line Endings (CRLF vs LF)"
            downloadFileName="git_topic08_line_endings_crlf_lf_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Never let invisible CRLF characters break your Linux cloud deployments or pollute your git diffs. Set 'core.autocrlf true' on Windows, 'input' on Mac/Linux, and commit a '.gitattributes' file. Warning: Always mark binary files (PNG, JPG, PDF) as 'binary' in .gitattributes so Git never corrupts raw bytes! Habit: Run 'git add --renormalize .' whenever you clean up an inherited codebase. Motivation: Mastering cross-platform line ending normalization proves you are a defensive, enterprise-ready software engineer! — Sukanta Hui, Coder & AccoTax"
          />
        </section>

        {/* ─── 9. Next & Previous Navigation ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          {hasPrev ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Previous: Essential Preferences (Topic 8)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Configuration Hierarchy (Topic 10)</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-sm hover:bg-emerald-900 transition"
            >
              <span>Module Overview</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </nav>

      </div>
    </div>
  );
}
