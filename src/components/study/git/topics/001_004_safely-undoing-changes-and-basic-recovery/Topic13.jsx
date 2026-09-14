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
  PlayCircle,
  CheckCheck
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
 * Topic 13: Hands-on Terminal Lab: Practicing git restore, commit --amend, soft/mixed/hard resets, and safe git revert
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [activeDrill, setActiveDrill] = useState(1);

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const drills = [
    {
      id: 1,
      name: "Drill 1: git restore & Unstaging",
      badge: "Working Tree & Index",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "Practice discarding uncommitted edits from working tree files and unstaging staged modifications cleanly.",
      scriptCommands: "# 1. Modify and discard working file\necho 'broken' >> app.js\ngit restore app.js\n\n# 2. Stage and unstage\necho 'staged' >> app.js && git add app.js\ngit restore --staged app.js",
      verification: "git status reports: 'working tree clean' after second restore"
    },
    {
      id: 2,
      name: "Drill 2: git commit --amend",
      badge: "Tip Commit Polish",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "Absorb a newly staged forgotten file into the latest commit without editing its message.",
      scriptCommands: "# Stage forgotten file and amend\ngit add test/calc.test.js\ngit commit --amend --no-edit",
      verification: "git log shows only 1 commit containing both app.js and calc.test.js"
    },
    {
      id: 3,
      name: "Drill 3: Reset Modes & Reflog",
      badge: "Pointer Rewind & Rescue",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800",
      description: "Execute a hard reset and immediately recover the wiped commit using git reflog.",
      scriptCommands: "# 1. Hard reset to simulate disaster\ngit reset --hard HEAD~1\n\n# 2. Reflog recovery\ngit reflog -n 3\ngit reset --hard HEAD@{1}",
      verification: "git log confirms the commit is 100% restored"
    },
    {
      id: 4,
      name: "Drill 4: git revert & Re-Reverting",
      badge: "Public Rollback",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800",
      description: "Rollback a buggy commit by appending an inverse commit, then re-revert to bring the code back forward in time.",
      scriptCommands: "# 1. Revert the buggy commit\ngit revert --no-edit <buggy_sha>\n\n# 2. Re-revert the revert commit\ngit revert --no-edit HEAD",
      verification: "git log shows both rollback and resurrection commits recorded linearly"
    },
    {
      id: 5,
      name: "Drill 5: Workspace Sanitization (git clean)",
      badge: "Untracked Pruning",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800",
      description: "Preview untracked files and directories with dry-run (-nd), then execute force pruning (-fd).",
      scriptCommands: "# 1. Dry run preview\ngit clean -nd\n\n# 2. Force deletion\ngit clean -fd",
      verification: "git status shows zero untracked files remaining"
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
                <span>Git Module 001_004 &bull; Topic 13 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Hands-on Terminal Lab: Module 004 Master Drills
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Five hands-on interactive CLI drills: restore, amend, soft/mixed/hard resets, reflog recovery, and git clean.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <Terminal className="w-3.5 h-3.5" /> 5 Master Drills
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <CheckCheck className="w-3.5 h-3.5" /> Auto-Verified
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
                Explain Like I&apos;m 10: The Flight Simulator for Version Control
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Why practicing emergency maneuvers in a safe sandbox makes you an unflappable software architect.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <PlayCircle className="w-4 h-4" /> The Flight Simulator Analogy
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Airline pilots spend hundreds of hours inside high-tech flight simulators practicing engine failures and turbulence before flying commercial planes.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                This lab is your <strong>Git Flight Simulator</strong>. You will intentionally trigger disasters (accidental hard resets, broken commits, messy directories) and solve them using precision commands until your reflexes are instantaneous!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Users className="w-4 h-4" /> Classroom Guidance at Barrackpore
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  <strong className="text-cyan-300">Sukanta Sir:</strong> &quot;Real mastery comes from terminal muscle memory. Run through all 5 drills in your sandbox directory today. When you finish, you will never panic in a real engineering job!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: 5-DRILL INTERACTIVE EXPLORER ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              The 5 Lab Drills Navigator
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {drills.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrill(d.id)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  activeDrill === d.id
                    ? "bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40 shadow-xl"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="text-xs font-bold text-white mb-1">Drill {d.id}</div>
                <div className="text-xs font-semibold text-slate-300 line-clamp-1">{d.name.split(": ")[1]}</div>
                <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded border mt-2 ${d.badgeColor}`}>
                  {d.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Drill Details Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white">
                {drills[activeDrill - 1].name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${drills[activeDrill - 1].badgeColor}`}>
                {drills[activeDrill - 1].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {drills[activeDrill - 1].description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">Terminal Commands:</span>
              <pre className="font-mono text-xs text-cyan-300 whitespace-pre-wrap">
                {drills[activeDrill - 1].scriptCommands}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">Success Verification:</span>
              <span>{drills[activeDrill - 1].verification}</span>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: VISUAL LAB ARCHITECTURE SVG ──────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Visual Architecture: 5 Lab Drill Verification Flow
                </h2>
                <p className="text-xs text-slate-400">
                  From working tree edits to reflog recovery and pristine clean tree status.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800">
            <svg
              viewBox="0 0 800 220"
              className="w-full max-w-3xl mx-auto min-w-[650px] font-sans"
            >
              {/* Drill 1 */}
              <circle cx="90" cy="110" r="30" fill="#083344" stroke="#06b6d4" strokeWidth="2" />
              <text x="90" y="106" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">D1</text>
              <text x="90" y="122" textAnchor="middle" fill="#cffafe" fontSize="9">Restore</text>

              <line x1="120" y1="110" x2="190" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Drill 2 */}
              <circle cx="220" cy="110" r="30" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="220" y="106" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">D2</text>
              <text x="220" y="122" textAnchor="middle" fill="#d1fae5" fontSize="9">Amend</text>

              <line x1="250" y1="110" x2="320" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Drill 3 */}
              <circle cx="350" cy="110" r="30" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
              <text x="350" y="106" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">D3</text>
              <text x="350" y="122" textAnchor="middle" fill="#fef3c7" fontSize="9">Reflog</text>

              <line x1="380" y1="110" x2="450" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Drill 4 */}
              <circle cx="480" cy="110" r="30" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
              <text x="480" y="106" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">D4</text>
              <text x="480" y="122" textAnchor="middle" fill="#f3e8ff" fontSize="9">Revert</text>

              <line x1="510" y1="110" x2="580" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Drill 5 */}
              <circle cx="610" cy="110" r="30" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
              <text x="610" y="106" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">D5</text>
              <text x="610" y="122" textAnchor="middle" fill="#ffe4e6" fontSize="9">Clean</text>

              <line x1="640" y1="110" x2="710" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#arr-m)" />

              {/* Verified Clean Checkmark */}
              <circle cx="735" cy="110" r="22" fill="#065f46" stroke="#34d399" strokeWidth="2" />
              <text x="735" y="115" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">✔</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: COMMON LAB PITFALLS ──────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Common Lab Mistakes to Avoid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Not Checking Exit Status
              </div>
              <p className="text-xs text-slate-300">
                Assuming a script worked without verifying <code className="text-cyan-300 font-mono">echo $?</code> equals 0.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Hard Reset Without Reflog
              </div>
              <p className="text-xs text-slate-300">
                Forgetting that `git reflog` holds the exact commit hash before the reset occurred.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4" /> Skipping git clean -nd
              </div>
              <p className="text-xs text-slate-300">
                Running `git clean -fd` directly without performing the preview dry-run first.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: HINT & SCRIPT RUN INSTRUCTIONS ────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Execute the Lab Script in Your Terminal
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Run: <code className="text-cyan-300 font-mono">bash topic13_files/module_004_full_recovery_lab.sh</code>. It automatically executes all 5 drills and verifies clean completion!
          </p>
        </section>

        {/* ─── SECTION 7: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Terminal Lab & Master Drill FAQs"
          questions={questions}
        />

        {/* ─── SECTION 8: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="Terminal Lab Master Drill Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 13 Revision Note"
          downloadFileName="module_004_terminal_lab_revision_note.txt"
        />

        {/* ─── SECTION 9: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Practice makes permanent! Run through this complete 5-drill lab at least twice in your terminal sandbox. Once you can execute restore, amend, reset, reflog rescue, revert, and clean without hesitation, you have mastered Git's undo engine! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 10: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev: Topic 12 (Troubleshooting Case Study)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 14: Module 004 Self-Assessment & Viva</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
