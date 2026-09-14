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
  Terminal,
  Play,
  Copy
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic 13: Hands-on Terminal Lab: Simulating divergent branches, triggering 3-way merge conflicts, visual resolution in VS Code, and verifying merge base commits
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [activeTab, setActiveTab] = useState("script");
  const [copied, setCopied] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const labScript = `#!/usr/bin/env bash
# ==============================================================================
# BASH LAB: 3-WAY MERGE CONFLICT SIMULATION & RESOLUTION SANDBOX
# MODULE: 002_002 (Topic 13) - Coder & AccoTax, Barrackpore
# ==============================================================================
set -euo pipefail
LAB_DIR="$HOME/git_conflict_lab_002_002"
rm -rf "$LAB_DIR" && mkdir -p "$LAB_DIR" && cd "$LAB_DIR"

git init -b main
git config user.name "Sukanta Hui" && git config user.email "sukanta@coderaccotax.in"
git config merge.conflictStyle zdiff3

# Baseline
echo "function tax(a) { return a * 0.18; }" > tax.js
git add tax.js && git commit -m "feat: base 18% GST"

# Branch feature/corporate
git switch -c feature/corporate
echo "function tax(a) { return a * 0.28; }" > tax.js
git commit -am "feat: luxury 28% GST"

# Branch main
git switch main
echo "function tax(a) { return a * 0.12; }" > tax.js
git commit -am "feat: essential 12% GST"

# Verify Merge Base
echo "Merge Base SHA: $(git merge-base main feature/corporate)"

# Trigger Conflict
set +e
git merge feature/corporate
set -e

# Resolve & Stage
echo "function tax(a, tier) { return (tier==='corp')? a*0.28 : a*0.12; }" > tax.js
git add tax.js
git commit -m "merge: resolve conflict with tiered GST slabs"
git log --graph --oneline --all`;

  const copyLab = () => {
    navigator.clipboard.writeText(labScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <span className="text-amber-400 font-mono">Topic-13</span>
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
              <Terminal className="w-3.5 h-3.5" />
              Terminal Sandbox Lab
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
              Intermediate • 50 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Full Module Practical
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Hands-on Terminal Lab: 3-Way Conflict Simulation
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Putting theory into complete terminal execution: establishing divergent branches, computing merge bases with <code className="text-emerald-400 font-mono">git merge-base</code>, triggering realistic 3-way collisions, inspecting index stages 1, 2, 3, and finalizing verified merge commits.
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
                Explain Like I'm 10: The Flight Simulator for Git Pilots
              </h2>
              <p className="text-xs text-emerald-300">
                Sukanta Sir motivates Sachin, Mahima, and Abhronila in the Barrackpore lab
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Before commercial airline pilots fly Boeing 777s over the Himalayas, where do they train?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Mahima
              </div>
              <p>
                <strong className="text-rose-300">Mahima:</strong> "In a flight simulator! Because in the simulator, they deliberately trigger engine fires, storm turbulence, and crosswinds so that when it happens in real life, they remain 100% calm and know the exact checklists."
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Exactly! This terminal lab is your Git flight simulator. We will intentionally trigger severe 3-way merge conflicts across multiple files, inspect index stages, calculate the merge base, synthesize solutions, and verify commits. Once you run this script 3 times, you will never fear a merge conflict again!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive Lab Script Explorer ──────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                Standalone Executable Sandbox Script
              </h2>
              <p className="text-xs text-slate-400">
                Run this standalone script in your Linux, macOS, or Git Bash terminal
              </p>
            </div>

            <button
              onClick={copyLab}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied to Clipboard!" : "Copy Lab Script"}
            </button>
          </div>

          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span>hands_on_merge_conflict_terminal_lab.sh</span>
              <span className="text-emerald-400 flex items-center gap-1 font-sans text-xs">
                <Play className="w-3.5 h-3.5" /> Ready to execute
              </span>
            </div>
            <pre className="p-4 text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
              {labScript}
            </pre>
          </div>
        </div>

        {/* ─── Section 4: Deep Technical Analysis: The 8-Phase Checklist ───── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Terminal Lab Execution Phases
            </h2>
            <p className="text-sm text-slate-400">
              The complete progression from blank directory to verified 2-parent merge commit
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-emerald-400 font-bold">PHASE 1-2</div>
              <h3 className="text-xs font-semibold text-white">Init &amp; Baseline</h3>
              <p className="text-xs text-slate-400">Init repo, configure zdiff3, commit base C1.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-sky-400 font-bold">PHASE 3-4</div>
              <h3 className="text-xs font-semibold text-white">Divergence</h3>
              <p className="text-xs text-slate-400">Create corporate &amp; essential tax commits.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-amber-400 font-bold">PHASE 5-6</div>
              <h3 className="text-xs font-semibold text-white">Base &amp; Collision</h3>
              <p className="text-xs text-slate-400">Verify merge-base SHA &amp; trigger conflict.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs font-mono text-indigo-400 font-bold">PHASE 7-8</div>
              <h3 className="text-xs font-semibold text-white">Synthesis &amp; Verify</h3>
              <p className="text-xs text-slate-400">Stage clean code &amp; verify 2 parents.</p>
            </div>
          </div>
        </div>

        {/* ─── Section 5: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Abhronila:</strong> "Sir, how do I know my merge commit is 100% genuine and has 2 parents?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Run <code className="text-emerald-300 font-mono font-bold">git rev-list --parents -n 1 HEAD</code>! If it prints 3 SHA tokens (the commit SHA followed by 2 parent SHAs), you have created a genuine, rock-solid 3-way merge commit!"
            </p>
          </div>
        </div>

        {/* ─── Section 6: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Essential Verification Commands
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 font-mono text-xs">
              <li><span className="text-emerald-400">git merge-base A B</span> &rarr; Common ancestor</li>
              <li><span className="text-sky-400">git ls-files -u</span> &rarr; Unmerged index stages</li>
              <li><span className="text-amber-400">git diff --check</span> &rarr; Check leftover markers</li>
              <li><span className="text-indigo-400">git log --graph</span> &rarr; Visual DAG convergence</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Lab Best Practice
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Execute this lab script in an isolated folder (<code className="text-slate-200 font-mono">~/git_conflict_lab</code>). Practice modifying the conflict resolution code to build muscle memory!
            </p>
          </div>
        </div>

        {/* ─── Section 7: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Hands-on Terminal Lab (3-Way Conflict Simulation)"
          content={noteText}
        />

        {/* ─── Section 8: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Terminal Lab & Merge Base Verification"
          questions={questions}
        />

        {/* ─── Section 9: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 10: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Classroom Drama: AuthController Collision
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Module 002_002 Self-Assessment Quiz &amp; Short Questions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
