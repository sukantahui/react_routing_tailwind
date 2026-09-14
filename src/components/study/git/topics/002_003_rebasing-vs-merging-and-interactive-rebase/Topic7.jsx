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
  Sliders,
  FileCode,
  ArrowDownUp,
  Scissors
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic 7: Interactive Rebase Mastery: git rebase -i HEAD~N and git rebase -i <base_commit>
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [selectedRange, setSelectedRange] = useState("head-n"); // 'head-n' | 'base-branch'

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/6`;
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
                  Interactive Power Tool
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Scissors className="w-6 h-6 text-purple-400" />
                Interactive Rebase Mastery: git rebase -i
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
                The Film Video Editor's Timeline Cut
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine editing a short documentary film at a studio in <strong className="text-cyan-300">Barrackpore</strong>.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                You filmed 6 raw video clips. Clip 2 was a shaky blooper, Clip 3 had bad audio, and Clip 4 was a 5-second correction of Clip 1.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                You don't publish raw bloopers to YouTube! You open the video editing software timeline (<code className="text-purple-300 bg-slate-950 px-1 rounded">git rebase -i</code>),
                cut out the blooper (<code className="text-rose-300">drop</code>), merge the correction into Clip 1 (<code className="text-emerald-300">squash</code>),
                and rename the clips (<code className="text-cyan-300">reword</code>).
                The audience sees one seamless, Oscar-worthy masterpiece!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: CORE COMMAND SYNTAX ─────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Targeting Commit Ranges with `git rebase -i`
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedRange("head-n")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedRange === "head-n"
                  ? "bg-purple-950/60 border-purple-500 shadow-lg shadow-purple-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="text-xs font-mono font-bold text-purple-400 mb-1">TARGET OPTION 1</div>
              <h3 className="text-base font-semibold text-white font-mono mb-2">git rebase -i HEAD~N</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Opens the last <code className="text-purple-300">N</code> commits on the current branch.
                Perfect for quick local cleanup before a push!
              </p>
            </div>

            <div
              onClick={() => setSelectedRange("base-branch")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedRange === "base-branch"
                  ? "bg-purple-950/60 border-purple-500 shadow-lg shadow-purple-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="text-xs font-mono font-bold text-purple-400 mb-1">TARGET OPTION 2</div>
              <h3 className="text-base font-semibold text-white font-mono mb-2">git rebase -i main</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interactively cleans up ALL commits on your feature branch since it branched from <code className="text-cyan-300">main</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: THE CHRONOLOGICAL ORDERING GOTCHA ────────────────── */}
        <section className="p-6 rounded-2xl border border-amber-900/50 bg-amber-950/20 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <ArrowDownUp className="w-5 h-5" />
            CRITICAL GOTCHA: The Inverse Order of the Rebase TODO File
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            In <code className="text-cyan-300">git log</code>, commits are listed in <strong>reverse chronological order</strong> (newest commit on TOP).
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-amber-300 font-bold">⚠️ In the `git rebase -i` TODO file, the order is CHRONOLOGICAL:</div>
            <div>• <span className="text-cyan-400 font-semibold">LINE 1 (TOP):</span> OLDEST commit (replayed 1st)</div>
            <div>• <span className="text-emerald-400 font-semibold">LAST LINE (BOTTOM):</span> NEWEST commit (replayed last)</div>
          </div>
        </section>

        {/* ─── SECTION 5: INTERACTIVE SVG DIAGRAM ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Anatomy of the Interactive Rebase Script</h2>
              <p className="text-xs text-slate-400">How Git processes the TODO buffer from top to bottom</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 250"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <rect x="40" y="20" width="770" height="210" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Title bar */}
              <rect x="40" y="20" width="770" height="30" rx="8" fill="#1e293b" />
              <text x="60" y="40" fill="#a855f7" fontSize="12" fontWeight="bold" fontFamily="monospace">git-rebase-todo (Executed Top to Bottom)</text>

              {/* Line 1 */}
              <rect x="60" y="65" width="730" height="26" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <text x="80" y="82" fill="#6ee7b7" fontSize="12" fontFamily="monospace">pick 3a1f94d feat: initial GST calculation (Oldest commit - Replayed 1st)</text>

              {/* Line 2 */}
              <rect x="60" y="100" width="730" height="26" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <text x="80" y="117" fill="#c7d2fe" fontSize="12" fontFamily="monospace">reword 8d2c01a fix: correct tax rebate percentage (Opens editor to edit msg)</text>

              {/* Line 3 */}
              <rect x="60" y="135" width="730" height="26" rx="4" fill="#3b0764" stroke="#c084fc" strokeWidth="1" />
              <text x="80" y="152" fill="#f5d0fe" fontSize="12" fontFamily="monospace">squash 7f4b82e fix: typo in invoice label (Melds into commit above!)</text>

              {/* Line 4 */}
              <rect x="60" y="170" width="730" height="26" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
              <text x="80" y="187" fill="#fda4af" fontSize="12" fontFamily="monospace">drop 9c0e21a wip: test console logs (Deletes commit completely!)</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 6: TEACHER'S NOTE & CLASSROOM DIALOGUE ─────────────── */}
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
                  "Sir, what happens if I accidentally delete all text in the interactive rebase TODO file and save?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "If you delete everything in the TODO file and save, Git interprets that as a command to <strong>cancel the rebase completely</strong>!
                  Your branch is left 100% untouched. It is a fantastic shortcut when you want to bail out before Git even starts!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 7: Interactive Rebase Mastery (Printable Notes)" />
        </section>

        {/* ─── SECTION 8: FAQ & STRUCTURED Q&A ────────────────────────────── */}
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
                28 comprehensive interview questions on interactive rebase syntax and mechanics
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: Rebase Control Commands
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-500/50 bg-purple-950 hover:bg-purple-900 text-sm font-semibold text-purple-200 shadow-lg shadow-purple-950/60 transition"
            >
              Next Topic: Interactive Directives (pick, squash, etc.) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
