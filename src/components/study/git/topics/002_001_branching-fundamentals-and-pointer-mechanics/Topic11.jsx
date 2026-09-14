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
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  LifeBuoy,
  Anchor,
  GitMerge
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
 * Topic 11: Recovering from Detached HEAD: Saving experimental commits by creating a new branch (git switch -c new_feature_branch)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [stage, setStage] = useState("detached"); // "detached", "switched_away", "rescued", "merged"
  const [rescueBranchName, setRescueBranchName] = useState("feature/ai-tax-rescued");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 11 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recovering from Detached HEAD: Saving Experimental Commits
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition shadow-lg shadow-cyan-950/50"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: TOPIC OVERVIEW & HIGH-LEVEL INTRO ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400 mt-1">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Emergency Recovery & Branch Anchoring</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Turning Dangling Experiments into Permanent Production Branches
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Whether you are currently in Detached HEAD with working code or you accidentally switched back to <code className="text-slate-100 font-mono">main</code> and panicked when your files vanished, recovering your experimental commits is 100% deterministic and painless.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                By leveraging <code className="text-cyan-300 font-mono">git switch -c &lt;new-branch-name&gt; [commit-sha]</code> and <code className="text-purple-300 font-mono">git reflog</code>, you can anchor any floating commit object into a full-fledged, permanent branch pointer with zero data loss.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-emerald-200">
              Explain Like I'm 10 (ELI10): Tying a Helium Balloon to a Bench
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> gave student <strong>Debangshu Poddar</strong> this vivid mental model:
            </p>

            <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                "Debangshu, imagine your experimental commits are a cluster of bright helium balloons floating in the air. Right now, your hand (HEAD) is holding the string."
              </p>
              <p className="text-xs text-amber-300 font-semibold">
                "If you let go of the string and walk away to the cafeteria (switching to main), the balloons float up into the sky (dangling commits)."
              </p>
              <p className="text-xs text-emerald-300 font-semibold">
                "Running <code className="text-cyan-300">git switch -c feature/my-work</code> is simply tying that balloon string tightly to a heavy park bench! Now the balloons can never float away, and you can come back anytime!"
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-emerald-500 pl-3">
              "Debangshu said: 'So a branch is just the anchor string that keeps my commits grounded!' Exactly." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE RESCUE SIMULATOR ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Rescue Workflow</span>
              <h3 className="text-xl font-bold text-white">Simulate the 4-Stage Recovery Pipeline</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStage("detached")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  stage === "detached" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                1. Detached State
              </button>
              <button
                onClick={() => setStage("switched_away")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  stage === "switched_away" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                2. Switched Away
              </button>
              <button
                onClick={() => setStage("rescued")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  stage === "rescued" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                3. Rescued Branch
              </button>
              <button
                onClick={() => setStage("merged")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  stage === "merged" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                4. Merged to Main
              </button>
            </div>
          </div>

          {/* Current Stage Display */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <span className="font-bold text-white">
                {stage === "detached" && "Stage 1: Commits Made in Detached HEAD"}
                {stage === "switched_away" && "Stage 2: Accidental Switch to Main (Commits Dangling)"}
                {stage === "rescued" && "Stage 3: Rescued via git switch -c"}
                {stage === "merged" && "Stage 4: Clean Integration into Main"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full border text-xs font-mono bg-cyan-950/40 text-cyan-400 border-cyan-800">
                Commit SHA: d9e8f7a
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 space-y-1">
              <span className="text-slate-500">Terminal Command:</span>
              <p className="text-cyan-300 font-bold">
                {stage === "detached" && "$ git switch --detach 7a8b9c0 && git commit -m 'feat: AI tax engine'"}
                {stage === "switched_away" && "$ git switch main  # (Warning: leaving 1 commit behind)"}
                {stage === "rescued" && "$ git switch -c feature/ai-tax-rescued d9e8f7a"}
                {stage === "merged" && "$ git switch main && git merge feature/ai-tax-rescued"}
              </p>
            </div>

            <p className="text-slate-400 font-sans leading-relaxed">
              {stage === "detached" && "Your commits exist in object store. You can rescue immediately with git switch -c."}
              {stage === "switched_away" && "Files seem gone from your folder, but d9e8f7a is preserved in git reflog."}
              {stage === "rescued" && "A new 41-byte pointer .git/refs/heads/feature/ai-tax-rescued now protects the commit."}
              {stage === "merged" && "The experimental work is now permanently part of main production lineage!"}
            </p>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Dangling Floating Node Anchored with New Branch Ref
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="rescueArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {/* Commit C1 */}
                <circle cx="150" cy="140" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="142" y="144" fill="#a7f3d0" fontWeight="bold">C1</text>

                <line x1="168" y1="140" x2="332" y2="140" stroke="#10b981" strokeWidth="2" />

                {/* Commit C2 */}
                <circle cx="350" cy="140" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="342" y="144" fill="#a7f3d0" fontWeight="bold">C2</text>

                {/* main branch */}
                <rect x="310" y="180" width="80" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="330" y="197" fill="#a7f3d0" fontWeight="bold">main</text>

                {/* Experimental commit E1 */}
                <circle cx="520" cy="70" r="20" fill="#1e293b" stroke={stage === "switched_away" ? "#f43f5e" : "#10b981"} strokeWidth="2.5" />
                <text x="510" y="75" fill={stage === "switched_away" ? "#fca5a5" : "#a7f3d0"} fontWeight="bold">E1</text>
                <text x="495" y="105" fill="#64748b" fontSize="9">d9e8f7a</text>

                <path d="M 160 125 C 220 70, 420 70, 500 70" stroke="#06b6d4" strokeWidth="2" fill="none" />

                {/* Rescued Branch pointer */}
                {stage === "rescued" || stage === "merged" ? (
                  <>
                    <rect x="620" y="55" width="180" height="30" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="630" y="75" fill="#a7f3d0" fontWeight="bold">feature/ai-tax-rescued</text>
                    <line x1="620" y1="70" x2="545" y2="70" stroke="#10b981" strokeWidth="2" markerEnd="url(#rescueArrow)" />
                  </>
                ) : (
                  <text x="560" y="75" fill="#f43f5e" fontSize="10">Floating / Unanchored</text>
                )}
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: STEP-BY-STEP RESCUE SEQUENCE ─────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Anchor className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">The Definitive Recovery Protocol</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">Step 1: Check Reflog</span>
              <p className="text-slate-400 font-sans">Find the commit hash of your lost experiment:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-purple-300">
                $ git reflog<br />
                d9e8f7a HEAD@&#123;1&#125;: commit: AI tax
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">Step 2: Create Rescue Branch</span>
              <p className="text-slate-400 font-sans">Anchor the hash to a named branch:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                $ git switch -c rescue-branch d9e8f7a
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-cyan-400 font-sans font-semibold">Step 3: Integrate into Main</span>
              <p className="text-slate-400 font-sans">Switch back to main and merge cleanly:</p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                $ git switch main<br />
                $ git merge rescue-branch
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL CHEATSHEET ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Emergency Recovery Commands</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># Scenario A: Still in detached HEAD</span>
              <p className="text-cyan-400">$ git switch -c feature/my-work</p>
            </div>
            <div>
              <span className="text-slate-500"># Scenario B: Already left detached HEAD</span>
              <p className="text-cyan-400">$ git reflog</p>
              <p className="text-cyan-400">$ git switch -c feature/my-work &lt;commit-sha&gt;</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="In 15 years of teaching, I've had hundreds of students rush up in tears thinking they lost days of work after a detached HEAD mishap. Every single time, `git reflog` and `git switch -c` brought their work back in seconds. Memorize this recovery pattern; it will save your career."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Recovery Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Running `git reset --hard` in Panic</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When code seems missing, running random reset commands can destroy uncommitted files in your working directory. Stay calm, don't run resets, and inspect <code className="text-slate-100">git reflog</code> first.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Waiting Over 30 Days</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unreferenced commits are pruned by garbage collection after 30 days. Rescue your commits promptly as soon as you realize they were left behind.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 11 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 11 Frequently Asked Questions & Interview Questions"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between border-t border-slate-800 pt-6">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-200 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic 10: Navigating in Detached HEAD</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 12: Comparing Branches (.. vs ...)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
