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
  Activity,
  Compass,
  FileCheck2
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
 * Topic 12: Classroom Troubleshooting: Sukanta Sir guiding Abhronila and Tuhina through restoring accidentally modified database migration scripts
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [activeStep, setActiveStep] = useState(1);

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const steps = [
    {
      step: 1,
      title: "Step 1: Forensic Inspection & Triage",
      badge: "Zero Destruction",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "First rule of emergency recovery: Do not touch anything until you inspect what is Staged, what is Unstaged, and what is Untracked.",
      command: "git status\ngit diff --staged db/migrations/\ngit diff db/migrations/",
      explanation: "Shows that 001 and 002 are staged (green), 003 and 004 are unstaged (red), and scratch dumps are untracked."
    },
    {
      step: 2,
      title: "Step 2: Unstage the Staged Migrations",
      badge: "Index Recovery",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "Safely unstage the modified SQL scripts from the Index back to the working tree without losing any edits.",
      command: "git restore --staged db/migrations/001_users.sql db/migrations/002_tax_rates.sql",
      explanation: "The files move from 'Changes to be committed' to 'Changes not staged for commit'."
    },
    {
      step: 3,
      title: "Step 3: Surgical Restore of Migration Directory",
      badge: "Working Tree Rollback",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "Discard all unstaged working tree edits in db/migrations/ to match the pristine HEAD commit snapshot.",
      command: "git restore db/migrations/",
      explanation: "All 4 production SQL migration scripts are restored to perfect pristine HEAD state."
    },
    {
      step: 4,
      title: "Step 4: Prune Untracked Scratch Dumps",
      badge: "Untracked Pruning",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800",
      description: "Perform a dry-run preview followed by safe removal of the temporary SQL dump files.",
      command: "git clean -nd\ngit clean -fd",
      explanation: "Working tree status returns to: 'nothing to commit, working tree clean'."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 12 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Classroom Troubleshooting: Database Migration Recovery
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-world forensic recovery case study: Sukanta Sir guiding Abhronila and Tuhina through a multi-tier git disaster.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <Activity className="w-3.5 h-3.5" /> Case Study
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <ShieldCheck className="w-3.5 h-3.5" /> 4-Step Protocol
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
                The Emergency Scenario at Coder &amp; AccoTax (Barrackpore Lab)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A classic high-stress situation that happens in every software engineering company.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" /> The Accidental Schema Modification
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                During a live debugging session for a GST billing app, <strong>Abhronila</strong> tested experimental queries directly inside production migration files in <code className="text-cyan-300 font-mono">db/migrations/</code>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina</strong> inadvertently staged half the files (<code className="text-amber-300 font-mono">001_users.sql</code>, <code className="text-amber-300 font-mono">002_tax_rates.sql</code>), while 2 other files were left unstaged, and 5 scratch dump files were untracked. Panic erupted: <em>&quot;If we commit this, the database crashes! If we reset blindly, we destroy valid work!&quot;</em>
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Compass className="w-4 h-4" /> Sukanta Sir&apos;s Golden Advice
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Take your hands off the keyboard! Never run <code className="text-rose-300 font-mono">git reset --hard</code> blindly during an emergency. We will solve this in 4 calm, surgical steps using the Three Trees!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: STEP-BY-STEP PROTOCOL INTERACTIVE EXPLORER ───────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              The 4-Step Forensic Restoration Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((s) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeStep === s.step
                    ? "bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Step {s.step}
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">{s.title.split(": ")[1]}</div>
                <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded border mt-2 ${s.badgeColor}`}>
                  {s.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Detailed Inspection Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white">
                {steps[activeStep - 1].title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${steps[activeStep - 1].badgeColor}`}>
                {steps[activeStep - 1].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {steps[activeStep - 1].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">Terminal Commands:</span>
              <pre className="font-mono text-xs text-cyan-300 whitespace-pre-wrap">
                {steps[activeStep - 1].command}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Tree Impact:</span>
              <span>{steps[activeStep - 1].explanation}</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: VISUAL RESTORATION FLOW DIAGRAM ──────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual Protocol: Multi-Tier State Resolution
                </h2>
                <p className="text-xs text-slate-400">
                  How staged, unstaged, and untracked artifacts are resolved sequentially.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 240"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              {/* Box 1: Staged (Index) */}
              <rect x="50" y="40" width="200" height="160" rx="10" fill="#064e3b" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
              <text x="150" y="70" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Staged in Index</text>
              <text x="150" y="95" textAnchor="middle" fill="#a7f3d0" fontSize="10 font-mono">001_users.sql</text>
              <text x="150" y="115" textAnchor="middle" fill="#a7f3d0" fontSize="10 font-mono">002_tax_rates.sql</text>
              <rect x="70" y="140" width="160" height="26" rx="5" fill="#065f46" />
              <text x="150" y="157" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">git restore --staged</text>

              {/* Arrow */}
              <line x1="250" y1="120" x2="290" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Box 2: Working Tree */}
              <rect x="300" y="40" width="200" height="160" rx="10" fill="#78350f" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="400" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Working Directory</text>
              <text x="400" y="95" textAnchor="middle" fill="#fde68a" fontSize="10 font-mono">003_invoices.sql</text>
              <text x="400" y="115" textAnchor="middle" fill="#fde68a" fontSize="10 font-mono">004_payments.sql</text>
              <rect x="320" y="140" width="160" height="26" rx="5" fill="#92400e" />
              <text x="400" y="157" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">git restore db/migrations/</text>

              {/* Arrow */}
              <line x1="500" y1="120" x2="540" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Box 3: Untracked */}
              <rect x="550" y="40" width="200" height="160" rx="10" fill="#701a75" fillOpacity="0.2" stroke="#d946ef" strokeWidth="1.5" />
              <text x="650" y="70" textAnchor="middle" fill="#e879f9" fontSize="12" fontWeight="bold">Untracked Dumps</text>
              <text x="650" y="95" textAnchor="middle" fill="#fae8ff" fontSize="10 font-mono">temp_dump.sql</text>
              <text x="650" y="115" textAnchor="middle" fill="#fae8ff" fontSize="10 font-mono">scratch.txt</text>
              <rect x="570" y="140" width="160" height="26" rx="5" fill="#86198f" />
              <text x="650" y="157" textAnchor="middle" fill="#fae8ff" fontSize="10" fontWeight="bold">git clean -fd</text>
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
              Troubleshooting Lessons for Engineering Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Global Blind Reset
              </div>
              <p className="text-xs text-slate-300">
                Running <code className="text-rose-300 font-mono">git reset --hard</code> wipes valid uncommitted edits in other directories.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solution
              </div>
              <p className="text-xs text-slate-400">
                Use scoped restore: <code className="text-cyan-300 font-mono">git restore &lt;folder-path&gt;</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Committing Out of Panic
              </div>
              <p className="text-xs text-slate-300">
                Pushing corrupt migrations to GitHub hoping to fix them later.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solution
              </div>
              <p className="text-xs text-slate-400">
                Clean locally before committing. Never push bad schema scripts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Skipping Diff Audits
              </div>
              <p className="text-xs text-slate-300">
                Restoring without verifying which lines were altered.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solution
              </div>
              <p className="text-xs text-slate-400">
                Always run <code className="text-cyan-300 font-mono">git diff</code> to audit before restoring.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Classroom Simulation Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Run the companion lab script <code className="text-cyan-300 font-mono">classroom_migration_recovery_lab.sh</code> in your terminal. Observe how it creates a contaminated repository state and guides you through all 4 recovery steps to achieve 100% clean verification!
          </p>
        </section>

        {/* ─── SECTION 7: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Database Migration Troubleshooting FAQs"
          questions={questions}
        />

        {/* ─── SECTION 8: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Classroom Troubleshooting Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 12 Revision Note"
          downloadFileName="classroom_migration_recovery_revision_note.txt"
        />

        {/* ─── SECTION 9: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Emergency Rule: When a mistake happens in production or schema files, panic is your worst enemy. Step 1 is always non-destructive inspection (git status & git diff). Step 2 is surgical un-staging. Step 3 is scoped directory restore. Step 4 is clean. Stay calm and trust the Three Trees! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 10: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 11 (Interactive Clean)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 13: Full Terminal Recovery Lab</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
