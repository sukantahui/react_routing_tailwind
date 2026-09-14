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
  ShieldAlert,
  AlertOctagon,
  Lock,
  Unlock
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic 4: THE GOLDEN RULE OF REBASING: Never rebase commits that have been pushed to a public/shared repository branch!
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [activeZone, setActiveZone] = useState("safe"); // 'safe' | 'danger'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 4;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/3`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-rose-500/30 selection:text-rose-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950 border border-rose-700/50 text-rose-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 border border-amber-700/50 text-amber-300">
                  Critical Safety Rule
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
                The Golden Rule of Rebasing
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-600/50 bg-rose-950/60 hover:bg-rose-900/80 text-xs font-medium text-rose-300 transition shadow-sm shadow-rose-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: THE GOLDEN RULE CARD ────────────────────────────── */}
        <section className="rounded-2xl border-2 border-rose-500/60 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-400 shrink-0">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                Fundamental Law of Version Control
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                "NEVER REBASE COMMITS THAT EXIST OUTSIDE YOUR PRIVATE REPOSITORY!"
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                If a commit has been pushed to a shared remote branch (such as <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">main</code>, <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">staging</code>, or a collaborative team feature branch),
                <strong> you must never rebase it</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: WHAT HAPPENS WHEN YOU BREAK THE RULE? ────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Anatomy of a Disaster: The Duplicate Commit Trap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">STEP 1: Push</span>
              <p className="text-slate-300">
                Alice pushes commits <strong className="text-cyan-300">C</strong> and <strong className="text-cyan-300">D</strong> to the shared GitHub repository.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400">STEP 2: Pull & Build</span>
              <p className="text-slate-300">
                Bob pulls the branch and builds new commit <strong className="text-amber-300">E</strong> directly on top of commit D.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-rose-900/50 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400">STEP 3: Illegal Rebase</span>
              <p className="text-slate-300">
                Alice rebases her branch, creating <strong className="text-rose-300">C'</strong> and <strong className="text-rose-300">D'</strong>, and force-pushes with <code className="text-rose-300 bg-slate-950 px-1 rounded">--force</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-rose-900/50 bg-rose-950/30 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400">STEP 4: Zombie Havoc</span>
              <p className="text-slate-300">
                Bob runs <code className="text-rose-300">git pull</code>. Git resurrects old commits C & D alongside C' & D', creating catastrophic duplicate diffs!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG DIAGRAM ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Visual Breakdown: Safe vs Forbidden Rebase Zones</h2>
                <p className="text-xs text-slate-400">Explore which branch states allow rebasing and which strictly forbid it</p>
              </div>
            </div>

            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveZone("safe")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  activeZone === "safe"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Safe Local Zone
              </button>
              <button
                onClick={() => setActiveZone("danger")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  activeZone === "danger"
                    ? "bg-rose-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Forbidden Public Zone
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
                <linearGradient id="safeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <marker id="zArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
                </marker>
              </defs>

              {activeZone === "safe" ? (
                <g>
                  <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">SAFE REBASE ZONE: LOCAL UNPUSHED BRANCH</text>

                  {/* Main Line */}
                  <line x1="80" y1="140" x2="220" y2="140" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#zArrow)" />
                  <line x1="220" y1="140" x2="360" y2="140" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#zArrow)" />
                  <line x1="360" y1="140" x2="500" y2="140" stroke="#10b981" strokeWidth="3" markerEnd="url(#zArrow)" />
                  <line x1="500" y1="140" x2="640" y2="140" stroke="#10b981" strokeWidth="3" markerEnd="url(#zArrow)" />

                  <circle cx="80" cy="140" r="16" fill="#1e3a8a" />
                  <text x="80" y="144" fill="#fff" fontSize="11" textAnchor="middle">A</text>

                  <circle cx="220" cy="140" r="16" fill="#1e3a8a" />
                  <text x="220" y="144" fill="#fff" fontSize="11" textAnchor="middle">B</text>

                  <circle cx="360" cy="140" r="16" fill="#1e3a8a" />
                  <text x="360" y="144" fill="#fff" fontSize="11" textAnchor="middle">F (main)</text>

                  <circle cx="500" cy="140" r="17" fill="url(#safeGrad)" stroke="#34d399" strokeWidth="2" />
                  <text x="500" y="144" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">C'</text>
                  <text x="500" y="175" fill="#34d399" fontSize="10" textAnchor="middle">Local Only</text>

                  <circle cx="640" cy="140" r="17" fill="url(#safeGrad)" stroke="#34d399" strokeWidth="2" />
                  <text x="640" y="144" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D'</text>
                  <text x="640" y="175" fill="#34d399" fontSize="10" textAnchor="middle">Local Only</text>

                  <rect x="440" y="55" width="260" height="30" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                  <text x="570" y="75" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">✅ SAFE: Only on your machine</text>
                </g>
              ) : (
                <g>
                  <text x="30" y="30" fill="#f43f5e" fontSize="13" fontWeight="bold">FORBIDDEN ZONE: SHARED BRANCH REWRITING (ZOMBIE COMMITS)</text>

                  {/* Forked line */}
                  <line x1="80" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="220" y1="120" x2="360" y2="120" stroke="#f43f5e" strokeWidth="2.5" />
                  <line x1="360" y1="120" x2="500" y2="120" stroke="#f43f5e" strokeWidth="2.5" />

                  {/* Lower duplicated line */}
                  <line x1="220" y1="120" x2="360" y2="190" stroke="#f59e0b" strokeWidth="2.5" />
                  <line x1="360" y1="190" x2="500" y2="190" stroke="#f59e0b" strokeWidth="2.5" />
                  <line x1="500" y1="190" x2="640" y2="190" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* Alice rewritten */}
                  <circle cx="360" cy="120" r="15" fill="url(#dangerGrad)" />
                  <text x="360" y="124" fill="#fff" fontSize="10" textAnchor="middle">C'</text>

                  <circle cx="500" cy="120" r="15" fill="url(#dangerGrad)" />
                  <text x="500" y="124" fill="#fff" fontSize="10" textAnchor="middle">D'</text>
                  <text x="500" y="100" fill="#f43f5e" fontSize="9" textAnchor="middle">Alice Force-Pushed</text>

                  {/* Bob original zombies */}
                  <circle cx="360" cy="190" r="15" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="360" y="194" fill="#fef3c7" fontSize="10" textAnchor="middle">C</text>

                  <circle cx="500" cy="190" r="15" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="500" y="194" fill="#fef3c7" fontSize="10" textAnchor="middle">D</text>

                  <circle cx="640" cy="190" r="15" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                  <text x="640" y="194" fill="#fff" fontSize="10" textAnchor="middle">E</text>
                  <text x="640" y="220" fill="#f59e0b" fontSize="9" textAnchor="middle">Bob's Work (Broken!)</text>

                  <rect x="250" y="45" width="360" height="28" rx="6" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
                  <text x="430" y="64" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">🚫 DISASTER: Duplicated C+D and C'+D' in repo!</text>
                </g>
              )}
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: SAFETY DECISION MATRIX ──────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-rose-400" /> Rebase Safety Decision Matrix
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-3.5">Scenario / Branch Type</th>
                  <th className="p-3.5">Safe to Rebase?</th>
                  <th className="p-3.5">Recommended Command</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Private local branch (unpushed)</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">✅ 100% Safe</td>
                  <td className="p-3.5 font-mono text-cyan-300">git rebase main</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Private PR branch (you are sole author)</td>
                  <td className="p-3.5 text-emerald-400 font-semibold">✅ Safe (with lease)</td>
                  <td className="p-3.5 font-mono text-cyan-300">git push --force-with-lease</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Shared feature branch (multiple developers)</td>
                  <td className="p-3.5 text-rose-400 font-semibold">🚫 FORBIDDEN</td>
                  <td className="p-3.5 font-mono text-indigo-300">git merge main</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Main / Master / Production / Staging</td>
                  <td className="p-3.5 text-rose-400 font-semibold">🚫 STRICTLY FORBIDDEN</td>
                  <td className="p-3.5 font-mono text-indigo-300">git merge / PR squash</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 6: CASE STUDY ───────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">Classroom Incident Drill</span>
              <h2 className="text-xl font-bold text-white">AccoTax Barrackpore: The Staging Branch Disaster</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            At <strong>Coder & AccoTax Barrackpore</strong>, junior developer <strong className="text-rose-400">Abhronila</strong> decided to "clean up" the shared
            <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded ml-1">staging</code> branch by running <code className="text-rose-300">git rebase main</code> and force-pushing to origin.
          </p>
          <div className="p-4 rounded-xl border border-rose-900/40 bg-rose-950/20 space-y-2 text-xs text-slate-300 leading-relaxed">
            <strong className="text-rose-400">The Impact:</strong> When teammate <strong className="text-cyan-300">Tuhina</strong> pushed her ₹25 Lakhs audit validator,
            Git merged both the old and new histories, causing 14 duplicated functions and breaking the entire automated CI test suite.
            <br />
            <strong>The Resolution:</strong> Sukanta Sir stepped in, retrieved the original commit SHA from <code className="text-cyan-300">git reflog show origin/staging</code>,
            and reset the server branch back to safety.
          </div>
        </section>

        {/* ─── SECTION 7: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
        <section className="rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6 sm:p-8 space-y-6">
          <Teacher
            name="Sukanta Hui"
            role="Senior Software Architect & Lead Instructor"
            location="Coder & AccoTax, Barrackpore"
          />

          <div className="space-y-4 pt-2 border-t border-indigo-900/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Classroom Dialogue: Abhronila & Tuhina Ask Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                  <span>Abhronila (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, I thought I was making history cleaner by rebasing staging. Why did everything break?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Because Git tracks commits by their exact cryptographic hashes! When you rebased, you gave those commits new names.
                  Tuhina's computer still knew them by their old names.
                  When she pulled, Git thought they were two completely different sets of features and combined both!
                  Remember: <strong>Treat public commits as stone, and private local commits as clay!</strong>"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 4: The Golden Rule of Rebasing (Printable Notes)" />
        </section>

        {/* ─── SECTION 9: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 core questions on the Golden Rule of Rebasing and repository safety
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Under the Hood Mechanics
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-500/50 bg-rose-950 hover:bg-rose-900 text-sm font-semibold text-rose-200 shadow-lg shadow-rose-950/60 transition"
            >
              Next Topic: Handling Conflicts During Rebase <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
