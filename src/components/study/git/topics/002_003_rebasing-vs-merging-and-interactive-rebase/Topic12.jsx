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
  Split,
  FolderGit2,
  Check,
  Award
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
 * Topic 12: Classroom Deep-Dive: Sukanta Sir demonstrating how to transform a messy 12-commit feature branch into 2 pristine, review-ready conventional commits
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic12() {
  const [activeTab, setActiveTab] = useState("after"); // 'before' | 'todo' | 'after'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 12;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/11`;
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                  Masterclass Case Study
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-400" />
                Classroom Masterclass: 12 Messy Commits to 2 Pristine Commits
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
                Live Classroom Scenario (Barrackpore Edition)
              </span>
              <h2 className="text-2xl font-bold text-white">
                Debangshu's 4-Day GST Feature Sprint
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                At <strong className="text-cyan-300">Coder & AccoTax Barrackpore</strong>, senior student <strong className="text-emerald-300">Debangshu</strong> built a full-stack
                ₹ GST Invoicing & PDF generation system over 4 days.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                His local branch contained 12 disorganized commits: typo fixes, console log debugging, half-baked PDF margins, and emergency test fixes.
                Instead of submitting a messy PR, <strong className="text-amber-300">Sukanta Sir</strong> guided Debangshu through a surgical interactive rebase,
                transforming the 12 noisy commits into exactly <strong className="text-purple-300">TWO pristine Conventional Commits</strong>!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: RESTRUCTURING ARCHITECTURE ───────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 12-to-2 Commit Architecture Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-emerald-900/50 bg-emerald-950/20 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">Target Commit 1 (Core Engine)</div>
              <h3 className="text-base font-bold text-white font-mono">feat(invoice): implement invoice generation & ₹ GST calc engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Consolidates commits 1 (start form), 2 (fixed typo in state), 3 (added GST calc), 4 (fixed rounding bug), 10 (fixed unit test), and 11 (clean up code).
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                Scope: Form State • 18% GST Logic • ₹50,000 Threshold • Unit Tests
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase">Target Commit 2 (PDF Export)</div>
              <h3 className="text-base font-bold text-white font-mono">feat(pdf): add PDF export generator with Barrackpore regional header</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Consolidates commits 5 (pdf library), 6 (pdf layout), 7 (pdf margins), 9 (company logo), and 12 (final touches).
                <strong> Drops commit 8 (console.log debug)!</strong>
              </p>
              <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                Scope: PDF Canvas • Regional AccoTax Header • Clean Export Styles
              </div>
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
                <h2 className="text-xl font-bold text-white">Interactive Transformation Visualizer</h2>
                <p className="text-xs text-slate-400">Switch tabs to see the raw 12 commits vs the rebase TODO script vs final 2 commits</p>
              </div>
            </div>

            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab("before")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  activeTab === "before" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                12 Messy Commits
              </button>
              <button
                onClick={() => setActiveTab("todo")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  activeTab === "todo" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Rebase TODO Script
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  activeTab === "after" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Final 2 Commits
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 250"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              {activeTab === "before" && (
                <g>
                  <text x="30" y="30" fill="#f43f5e" fontSize="13" fontWeight="bold">DEBANGSHU'S 12 NOISY COMMITS (BEFORE REBASE)</text>
                  <line x1="50" y1="125" x2="800" y2="125" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, i) => (
                    <g key={num}>
                      <circle cx={70 + i * 62} cy="125" r="14" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x={70 + i * 62} y="129" fill="#fda4af" fontSize="9" textAnchor="middle">c{num}</text>
                    </g>
                  ))}
                  <text x="425" y="175" fill="#fda4af" fontSize="11" textAnchor="middle">12 Commits • Typos • Console Logs • Broken Tests</text>
                </g>
              )}

              {activeTab === "todo" && (
                <g>
                  <rect x="40" y="15" width="770" height="220" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="60" y="35" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace"># GROUP 1: INVOICE ENGINE</text>
                  <text x="60" y="55" fill="#34d399" fontSize="11" fontFamily="monospace">pick   a1b2c3d feat(invoice): implement invoice generation & GST calc</text>
                  <text x="60" y="75" fill="#818cf8" fontSize="11" fontFamily="monospace">fixup  e4f5g6h fixed typo in state</text>
                  <text x="60" y="95" fill="#818cf8" fontSize="11" fontFamily="monospace">fixup  i7j8k9l added gst calculation</text>
                  <text x="60" y="115" fill="#818cf8" fontSize="11" fontFamily="monospace">fixup  m0n1o2p fixed gst rounding bug</text>

                  <text x="60" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace"># GROUP 2: PDF GENERATOR</text>
                  <text x="60" y="165" fill="#38bdf8" fontSize="11" fontFamily="monospace">pick   q3r4s5t feat(pdf): add PDF export with Barrackpore header</text>
                  <text x="60" y="185" fill="#818cf8" fontSize="11" fontFamily="monospace">fixup  u6v7w8x pdf layout & logo</text>
                  <text x="60" y="205" fill="#f43f5e" fontSize="11" fontFamily="monospace">drop   c2d3e4f console.log debug statements</text>
                </g>
              )}

              {activeTab === "after" && (
                <g>
                  <text x="30" y="30" fill="#34d399" fontSize="13" fontWeight="bold">RESULT: 2 PRISTINE CONVENTIONAL COMMITS</text>
                  <line x1="80" y1="125" x2="280" y2="125" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="280" y1="125" x2="560" y2="125" stroke="#10b981" strokeWidth="3" />

                  <circle cx="80" cy="125" r="18" fill="#1e3a8a" />
                  <text x="80" y="130" fill="#fff" fontSize="11" textAnchor="middle">main</text>

                  <rect x="200" y="90" width="280" height="70" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                  <text x="340" y="118" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">feat(invoice): GST Core Engine</text>
                  <text x="340" y="138" fill="#a7f3d0" fontSize="9" textAnchor="middle">Absorbed 6 commits • 100% Tests Pass</text>

                  <rect x="520" y="90" width="280" height="70" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                  <text x="660" y="118" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">feat(pdf): PDF Generator</text>
                  <text x="660" y="138" fill="#a7f3d0" fontSize="9" textAnchor="middle">Absorbed 5 commits • Dropped Logs</text>
                </g>
              )}
            </svg>
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
              Classroom Dialogue: Debangshu & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Debangshu (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, when the client saw my 2 commits, they approved the pull request in literally 3 minutes!
                  What did they say?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "The client said your PR looked like it was written by a 10-year veteran architect!
                  Clean commit history shows discipline, respect for reviewers' time, and true software craftsmanship.
                  Remember: <strong>Code is read 10 times more often than it is written!</strong>"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 12: Classroom Deep-Dive (Printable Notes)" />
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
                28 masterclass interview questions on real-world commit history restructuring
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Automating with Autosquash
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Hands-on Terminal Lab <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
