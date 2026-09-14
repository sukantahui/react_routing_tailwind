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
  Wand2,
  Scissors,
  Check,
  RotateCcw
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
 * Topic 11: Automating Fixups with Autosquash: git commit --fixup <commit_hash> and git rebase -i --autosquash main
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [autosquashActive, setAutosquashActive] = useState(true);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/10`;
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
                  Workflow Automation
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-purple-400" />
                Automating Fixups with Git Autosquash
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
                The Smart Filing Clerk: Auto-Sorting Sticky Notes
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine managing a filing cabinet at <strong className="text-cyan-300">AccoTax Barrackpore</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Whenever you notice a small mistake in Folder #3, you don't open the cabinet and manually re-sort 50 folders.
                You write a sticky note with a barcode tagged <code className="text-purple-300 bg-slate-950 px-1 rounded">"Attach to Folder #3"</code> (<code className="text-emerald-300">git commit --fixup</code>) and drop it in the in-tray.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                At the end of the day, the automated filing clerk (<code className="text-purple-300 bg-slate-950 px-1 rounded">git rebase -i --autosquash</code>)
                scans the barcodes, finds Folder #3, slips the correction inside, and shreds the sticky note automatically!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE 2-STEP WORKFLOW ─────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 2-Step Autosquash Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
              <div className="text-xs font-mono font-bold text-cyan-400">STEP 01: CREATE TARGETED FIXUP</div>
              <h3 className="text-base font-semibold text-white font-mono">git commit --fixup &lt;target_sha&gt;</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creates a commit with the special header <code className="text-cyan-300 font-mono">fixup! &lt;original subject&gt;</code> that Git uses to link the fix directly to its origin.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-purple-900/50 bg-purple-950/20 space-y-3">
              <div className="text-xs font-mono font-bold text-purple-400">STEP 02: AUTO-REPLAY & SQUASH</div>
              <h3 className="text-base font-semibold text-white font-mono">git rebase -i --autosquash main</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Git automatically rearranges the TODO script, placing the fixup commit directly below the target commit with the <code className="text-purple-300 font-mono">fixup</code> directive!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG VISUALIZATION ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Autosquash TODO List Transformation</h2>
                <p className="text-xs text-slate-400">Witness how Git automatically reorganizes the TODO queue</p>
              </div>
            </div>

            <button
              onClick={() => setAutosquashActive(!autosquashActive)}
              className="px-3 py-1.5 rounded-lg border border-purple-700/60 bg-purple-950 text-xs font-semibold text-purple-300 hover:bg-purple-900 transition"
            >
              Toggle View: {autosquashActive ? "Autosquash Active" : "Standard (Unsorted)"}
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <rect x="40" y="20" width="770" height="200" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <rect x="40" y="20" width="770" height="30" rx="8" fill="#1e293b" />
              <text x="60" y="40" fill="#a855f7" fontSize="12" fontWeight="bold" fontFamily="monospace">
                {autosquashActive ? "git-rebase-todo (AFTER AUTOSQUASH REORDERING)" : "git-rebase-todo (BEFORE AUTOSQUASH - UNSORTED)"}
              </text>

              {autosquashActive ? (
                <g>
                  {/* Target 1 */}
                  <rect x="60" y="65" width="730" height="26" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                  <text x="80" y="82" fill="#6ee7b7" fontSize="11" fontFamily="monospace">pick  3a1f94d feat: add GST calculation</text>

                  {/* Fixup for Target 1 (Auto-reordered right beneath!) */}
                  <rect x="60" y="100" width="730" height="26" rx="4" fill="#3b0764" stroke="#c084fc" strokeWidth="1" />
                  <text x="80" y="117" fill="#f5d0fe" fontSize="11" fontFamily="monospace">fixup 9c0e21a fixup! feat: add GST calculation (Auto-moved here!)</text>

                  {/* Target 2 */}
                  <rect x="60" y="135" width="730" height="26" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                  <text x="80" y="152" fill="#6ee7b7" fontSize="11" fontFamily="monospace">pick  8d2c01a feat: add TDS export module</text>

                  {/* Pulse on auto-moved */}
                  <circle cx="750" cy="113" r="6" fill="#c084fc">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              ) : (
                <g>
                  <text x="70" y="80" fill="#94a3b8" fontSize="11" fontFamily="monospace">pick 3a1f94d feat: add GST calculation</text>
                  <text x="70" y="115" fill="#94a3b8" fontSize="11" fontFamily="monospace">pick 8d2c01a feat: add TDS export module</text>
                  <text x="70" y="150" fill="#f43f5e" fontSize="11" fontFamily="monospace">pick 9c0e21a fixup! feat: add GST calculation (Sitting at bottom of queue)</text>
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
              Classroom Dialogue: Sachin & Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Sachin (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, can I enable autosquash permanently so I never have to type `--autosquash` again?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Absolutely! Run <code className="text-cyan-300">git config --global rebase.autoSquash true</code> once.
                  From that day forward, whenever Git sees a commit beginning with <code className="text-purple-300 font-mono">fixup!</code> or <code className="text-purple-300 font-mono">squash!</code>,
                  it will automatically reorder and squash it during every interactive rebase!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 11: Automating Fixups with Autosquash (Printable Notes)" />
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
                28 core questions on git commit --fixup and autosquash automation
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Squashing WIP Commits
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Classroom Deep-Dive Drama <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
