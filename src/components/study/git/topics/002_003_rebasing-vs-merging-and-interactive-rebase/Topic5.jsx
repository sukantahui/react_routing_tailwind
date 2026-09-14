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
  RotateCcw,
  Check,
  XCircle,
  FileCode
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic 5: Handling Conflicts During Rebase: Resolving conflicts, staging resolved files, and continuing with git rebase --continue (No git commit!)
 * Module: 002_003_rebasing-vs-merging-and-interactive-rebase
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [conflictStep, setConflictStep] = useState(1);

  // Navigation Logic
  const moduleSlug = "002_003_rebasing-vs-merging-and-interactive-rebase";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/4`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 border border-amber-700/50 text-amber-300">
                  Topic {currentIndex} of {totalTopics - 1}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  Conflict Masterclass
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                  Module 002_003
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                Handling Conflicts During Rebase & Staging
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-600/50 bg-cyan-950/60 hover:bg-cyan-900/80 text-xs font-medium text-cyan-300 transition shadow-sm shadow-cyan-950"
              >
                Next Topic <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: ELI10 / REAL WORLD ANALOGY ──────────────────────── */}
        <section className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-600/20 border border-amber-500/30 text-amber-400 shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                ELI10 & Everyday Analogy
              </span>
              <h2 className="text-2xl font-bold text-white">
                The Assembly Line Inspector: Pause, Fix, and Press Green
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Imagine an automated bookbinding machine in <strong className="text-cyan-300">Barrackpore</strong> inserting 3 new index pages into a tax handbook.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Page 1 slots in perfectly. But when inserting Page 2, the machine detects that both you and the chief editor edited Section 87A on paragraph 4.
                The machine safely halts with a yellow warning light.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                You don't throw away the whole book! You sit down, combine the two sentences, put the page in the feeder (<code className="text-emerald-300 bg-slate-950 px-1 rounded">git add</code>),
                and press the <strong className="text-emerald-400">GREEN RESUME BUTTON</strong> (<code className="text-emerald-300 bg-slate-950 px-1 rounded">git rebase --continue</code>).
                The conveyor belt immediately resumes for Page 3!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE 3-STEP CONFLICT RESOLUTION WORKFLOW ──────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 3-Step Rebase Conflict Resolution Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setConflictStep(1)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                conflictStep === 1
                  ? "bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="text-xs font-mono font-bold text-amber-400 mb-1">STEP 01</div>
              <h3 className="text-base font-semibold text-white mb-2">Inspect & Edit Markers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Run <code className="text-cyan-300">git status</code> to find conflicting files. Open them and resolve the diff markers cleanly.
              </p>
            </div>

            <div
              onClick={() => setConflictStep(2)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                conflictStep === 2
                  ? "bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="text-xs font-mono font-bold text-amber-400 mb-1">STEP 02</div>
              <h3 className="text-base font-semibold text-white mb-2">Stage with `git add`</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stage the resolved files to tell Git that this chunk is ready: <code className="text-cyan-300">git add &lt;file&gt;</code>.
              </p>
            </div>

            <div
              onClick={() => setConflictStep(3)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                conflictStep === 3
                  ? "bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1">STEP 03</div>
              <h3 className="text-base font-semibold text-white mb-2">Resume: `git rebase --continue`</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Run <code className="text-emerald-300">git rebase --continue</code>. <strong>DO NOT RUN `git commit`!</strong>
              </p>
            </div>
          </div>

          {/* CRITICAL WARNING CARD */}
          <div className="p-4 rounded-xl border border-rose-900/50 bg-rose-950/30 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
            <div className="text-xs text-slate-300">
              <strong className="text-rose-400">CRITICAL WARNING:</strong> Never run <code className="text-rose-300 font-bold bg-slate-950 px-1 rounded">git commit</code> during a rebase conflict!
              Running `git commit` creates an orphaned detached commit and breaks Git's internal rebase queue. Always use <code className="text-emerald-300 font-bold bg-slate-950 px-1 rounded">git rebase --continue</code>.
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE SVG DIAGRAM ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Rebase Conflict Marker Anatomy</h2>
              <p className="text-xs text-slate-400">Understanding what HEAD and incoming commit hash represent during a rebase pause</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center overflow-x-auto shadow-2xl">
            <svg
              viewBox="0 0 850 240"
              className="w-full max-w-4xl h-auto"
              style={{ minWidth: "600px" }}
            >
              <rect x="50" y="20" width="750" height="200" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

              {/* Marker 1: HEAD */}
              <rect x="70" y="40" width="710" height="30" rx="4" fill="#1e293b" />
              <text x="85" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current Base: Target Branch / main)</text>

              {/* Content 1 */}
              <text x="85" y="90" fill="#94a3b8" fontSize="12" fontFamily="monospace">const taxRate = income &gt; 1500000 ? 0.15 : 0.10; // From main branch</text>

              {/* Marker 2: Separator */}
              <line x1="70" y1="110" x2="780" y2="110" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
              <text x="425" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">======= (Conflict Separator) =======</text>

              {/* Content 2 */}
              <text x="85" y="155" fill="#34d399" fontSize="12" fontFamily="monospace">const taxRate = income &lt;= 700000 ? 0.00 : 0.10; // Sachin's Rebated Feature</text>

              {/* Marker 3: Incoming Commit */}
              <rect x="70" y="175" width="710" height="30" rx="4" fill="#1e293b" />
              <text x="85" y="195" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="monospace">&gt;&gt;&gt;&gt;&gt;&gt;&gt; 9c1f24d (Incoming Patch: feat: add section 87A rebate)</text>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: THE FLIPPED OURS VS THEIRS GOTCHA ────────────────── */}
        <section className="p-6 rounded-2xl border border-indigo-900/50 bg-slate-900/60 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            The Mind-Bending Gotcha: `--ours` vs `--theirs` in Rebase
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            In standard <code className="text-cyan-300">git merge</code>, <code className="text-amber-300">--ours</code> refers to your current branch and <code className="text-emerald-300">--theirs</code> refers to the incoming branch.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
            <div className="text-amber-400 font-bold">⚠️ IN GIT REBASE, THE ROLES ARE REVERSED!</div>
            <div>• <span className="text-cyan-400 font-semibold">--ours:</span> Represents the upstream base branch (`main`), because HEAD is parked on it!</div>
            <div>• <span className="text-emerald-400 font-semibold">--theirs:</span> Represents YOUR feature branch patch being applied onto main!</div>
          </div>
        </section>

        {/* ─── SECTION 6: TERMINAL SIMULATOR ──────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Terminal Walkthrough: Conflict to Resolution</h2>
              <p className="text-xs text-slate-400">Step-by-step shell output when resolving rebase conflicts</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl font-mono text-xs text-slate-300 leading-relaxed">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">bash - Sachin@CoderAccoTax: ~/gst-portal</span>
              <span className="text-amber-400">REBASE 1/3</span>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <span className="text-emerald-400">sachin@accotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git rebase main</span>
              </div>
              <div className="text-amber-300 pl-4 space-y-0.5">
                <div>Auto-merging TaxEngine.js</div>
                <div className="text-rose-400 font-bold">CONFLICT (content): Merge conflict in TaxEngine.js</div>
                <div>error: could not apply 9c1f24d... feat: add section 87A rebate</div>
                <div>hint: Resolve all conflicts manually, mark them with "git add &lt;paths&gt;"</div>
                <div>hint: and run "git rebase --continue".</div>
              </div>

              <div>
                <span className="text-emerald-400">sachin@accotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git add TaxEngine.js</span>
              </div>

              <div>
                <span className="text-emerald-400">sachin@accotax:~/gst-portal$</span>{" "}
                <span className="text-white font-bold">git rebase --continue</span>
              </div>
              <div className="text-emerald-400 pl-4 font-bold">
                Applying: feat: add section 87A rebate<br />
                Applying: feat: export PDF ledger<br />
                Successfully rebased and updated refs/heads/feature/tax-rebate.
              </div>
            </div>
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
              Classroom Dialogue: Sachin & Susmita Ask Sukanta Sir
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <span>Sachin (Student, Barrackpore):</span>
                </div>
                <p className="text-xs text-slate-300">
                  "Sir, what happens if I run `git commit` by mistake during a rebase conflict?"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 space-y-1.5 ml-4 sm:ml-8">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <span>Sukanta Sir:</span>
                </div>
                <p className="text-xs text-slate-300">
                  "If you run <code className="text-rose-300">git commit</code>, you commit the changes manually to the detached HEAD.
                  When you subsequently run <code className="text-cyan-300">git rebase --continue</code>, Git will complain:
                  <em>'No changes - did you forget to use git add?'</em>.
                  To avoid this confusion: stage with <code className="text-emerald-300">git add</code>, and always let <code className="text-emerald-300">git rebase --continue</code> do the commit for you!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: PRINTABLE NOTES & LAB SCRIPT ────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint content={noteText} title="Topic 5: Handling Conflicts During Rebase (Printable Notes)" />
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
                28 practical interview questions on resolving rebase conflicts without panic
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
              <ArrowLeft className="w-4 h-4" /> Previous Topic: The Golden Rule of Rebasing
            </Link>

            <Link
              to={nextTopicUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-500/50 bg-amber-950 hover:bg-amber-900 text-sm font-semibold text-amber-200 shadow-lg shadow-amber-950/60 transition"
            >
              Next Topic: Rebase Control Commands (--skip & --abort) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
