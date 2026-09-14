import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
  Users,
  Eye,
  Bookmark,
  FastForward,
  Terminal,
  Play,
  Scissors,
  Minimize2,
  FileCode,
  Check,
  RotateCcw,
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
 * Topic 10: Squashing Work-in-Progress (WIP) and Bugfix Commits before Submitting a Pull Request
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [viewState, setViewState] = useState("after"); // 'before' | 'after'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 10;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/9`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 border border-purple-700/50 text-purple-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  PR Hygiene & Polish
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Minimize2 className="w-6 h-6 text-purple-400" />
                Squashing WIP Commits Before Pull Request Submission
              </h1>
            </div>

            {/* Quick Navigation Top */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev Topic
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-600/50 bg-purple-950/60 hover:bg-purple-900/80 text-xs font-medium text-purple-300 transition shadow-sm shadow-purple-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: ELI10 / REAL WORLD ANALOGY ──────────────────────── */}
        <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                ELI10 & Everyday Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Clay Sculptor: Polishing the Statue before Unveiling
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine sculpting an idol in <strong className="text-cyan-300">Kumartuli or Barrackpore</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                While working in private, you throw clay, shave off rough edges, add water, patch cracks, and drop tools on the floor 50 times.
                When you present the statue to the temple committee, you don't present the 50 piles of clay shavings—you unveil the finished, polished statue.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                <strong className="text-purple-300">Squashing</strong> allows you to commit freely during development for local safety, and then consolidate all the rough shavings into one pristine, review-ready masterpiece!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: BEFORE VS AFTER VISUALIZER ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Comparison: Messy WIP vs Polished PR</h2>
                <p className="text-xs text-slate-400">Toggle between the messy 5-commit local history and the squashed Conventional Commit</p>
              </div>
            </div>

            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setViewState("before")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewState === "before"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Messy WIP History
              </button>
              <button
                onClick={() => setViewState("after")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  viewState === "after"
                    ? "bg-purple-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Squashed Conventional Commit
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 250"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <defs>
                <marker id="wipArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              {viewState === "before" ? (
                <g>
                  <text x="30" y="30" fill="#f43f5e" fontSize="13" fontWeight="bold">MESSY WIP BRANCH HISTORY (5 NOISY COMMITS)</text>
                  <line x1="80" y1="130" x2="200" y2="130" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#wipArrow)" />
                  <line x1="200" y1="130" x2="320" y2="130" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#wipArrow)" />
                  <line x1="320" y1="130" x2="440" y2="130" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#wipArrow)" />
                  <line x1="440" y1="130" x2="560" y2="130" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#wipArrow)" />
                  <line x1="560" y1="130" x2="680" y2="130" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#wipArrow)" />

                  <circle cx="80" cy="130" r="14" fill="#334155" />
                  <text x="80" y="134" fill="#fff" fontSize="10" textAnchor="middle">Base</text>

                  <circle cx="200" cy="130" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="200" y="134" fill="#fda4af" fontSize="9" textAnchor="middle">wip 1</text>

                  <circle cx="320" cy="130" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="320" y="134" fill="#fda4af" fontSize="9" textAnchor="middle">typo</text>

                  <circle cx="440" cy="130" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="440" y="134" fill="#fda4af" fontSize="9" textAnchor="middle">debug</text>

                  <circle cx="560" cy="130" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="560" y="134" fill="#fda4af" fontSize="9" textAnchor="middle">logic</text>

                  <circle cx="680" cy="130" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="680" y="134" fill="#fda4af" fontSize="9" textAnchor="middle">clean</text>
                </g>
              ) : (
                <g>
                  <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">SQUASHED PR BRANCH HISTORY (1 ATOMIC CONVENTIONAL COMMIT)</text>
                  <line x1="80" y1="130" x2="350" y2="130" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#wipArrow)" />

                  <circle cx="80" cy="130" r="18" fill="#1e3a8a" />
                  <text x="80" y="135" fill="#fff" fontSize="11" textAnchor="middle">Base</text>

                  <rect x="300" y="90" width="460" height="75" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                  <text x="530" y="120" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">feat(compliance): add automated GSTR-1 quarterly JSON export</text>
                  <text x="530" y="145" fill="#a7f3d0" fontSize="10" textAnchor="middle">✅ 100% Review-Ready • Zero Intermediate Noise</text>
                </g>
              )}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 4: CONVENTIONAL COMMITS CHEAT SHEET ─────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-purple-400" /> Conventional Commits Format Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="font-mono text-emerald-400 font-bold">feat(scope): ...</span>
              <p className="text-slate-300">Introduces a new user-facing feature or capability.</p>
              <div className="font-mono text-[11px] text-slate-400">Example: feat(gst): add ₹50,000 threshold check</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="font-mono text-cyan-400 font-bold">fix(scope): ...</span>
              <p className="text-slate-300">Patches a bug or resolves an issue in existing code.</p>
              <div className="font-mono text-[11px] text-slate-400">Example: fix(auth): correct token expiry window</div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="font-mono text-purple-400 font-bold">refactor(scope): ...</span>
              <p className="text-slate-300">Code change that neither fixes a bug nor adds a feature.</p>
              <div className="font-mono text-[11px] text-slate-400">Example: refactor(ledger): simplify reducer logic</div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Abhronila & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Abhronila (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, is it bad practice to commit small 'wip' changes while I'm coding?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Not at all! In fact, committing every 30 minutes locally is great for personal safety.
                  The rule is simply: <strong>Clean up your room before guests arrive!</strong>
                  Squash your local WIP commits into 1 or 2 clean Conventional Commits before submitting your Pull Request."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 10: Squashing WIP Commits (Printable Notes)" />
        </section>

        {/* ─── SECTION 7: FAQ & STRUCTURED Q&A ────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Exam Prep
              </h2>
              <p className="text-xs text-slate-400">
                28 interview questions on squashing WIP commits and PR preparation
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} />

          {/* Bottom Sequential Navigation Bar */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800">
            <Link
              to={prevTopicUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-sm font-medium text-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Reordering & Splitting
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Automating Fixups with Autosquash <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
