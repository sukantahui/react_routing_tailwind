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
  FastForward,
  TrendingUp,
  GitMerge
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic 1: Fast-Forward (FF) Merges: Moving the target pointer forward without creating a merge commit
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [isMerged, setIsMerged] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 1;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
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
                <GitMerge className="w-4 h-4" />
                <span>Segment 2: Merging & Conflicts • Module 002_002 • Topic 1 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Fast-Forward (FF) Merges: Zero-Commit Pointer Advancement
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
              <FastForward className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Linear History Optimization</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                When Git Merges by Simply Sliding the Target Pointer Forward
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                A <strong>Fast-Forward (FF) merge</strong> is Git's default behavior when integrating a branch whose lineage is directly descended from your current branch without any divergence on the target branch.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Because no intermediate commits landed on <code className="text-slate-100 font-mono">main</code> while the feature was developed, Git does not generate a merge commit or run a three-way diff algorithm. Instead, Git simply updates the <code className="text-emerald-400 font-mono">.git/refs/heads/main</code> text file to point directly to the latest commit SHA of the feature branch.
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
              Explain Like I'm 10 (ELI10): Walking Down a Straight Corridor in Barrackpore
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> demonstrated fast-forward merging in the classroom hallway with students <strong>Sachin</strong> and <strong>Mahima</strong>:
            </p>

            <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                Both students stood at Tile 1 (Commit C1). Sachin stayed still at Tile 1. Mahima walked 3 tiles ahead in the straight hallway to Tile 4 (Commits C2, C3, C4).
              </p>
              <p className="text-xs text-emerald-300 font-semibold">
                To catch up with Mahima, does Sachin need to build a new bridge or construct a second floor? No! Sachin simply walks 3 steps forward along the exact same straight line to Tile 4. That is a Fast-Forward merge!
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-emerald-500 pl-3">
              "Sachin asked: 'Why didn't Git make a merge commit?' Sukanta replied: 'Because you never took a side turn! Why build an intersection on a straight road?'"
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE FAST-FORWARD SIMULATOR ───────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Simulator</span>
              <h3 className="text-xl font-bold text-white">Execute Fast-Forward Merge</h3>
            </div>
            <button
              onClick={() => setIsMerged(!isMerged)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 shadow-lg shadow-cyan-950/50"
            >
              <FastForward className="w-4 h-4" />
              <span>{isMerged ? "Reset Simulation" : "Execute git merge feature-gst"}</span>
            </button>
          </div>

          {/* Status Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Target Branch: <span className="text-emerald-400 font-bold">main</span></span>
              <span className="text-slate-400">Incoming Branch: <span className="text-cyan-400 font-bold">feature-gst</span></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500">.git/refs/heads/main points to:</span>
                <p className="text-emerald-400 font-bold text-sm">
                  {isMerged ? "3f4a5b6 (Commit C3 - Advanced!)" : "7a8b9c0 (Commit C1)"}
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-500">.git/refs/heads/feature-gst points to:</span>
                <p className="text-cyan-400 font-bold text-sm">3f4a5b6 (Commit C3)</p>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300">
              <span className="text-slate-500">Terminal Feedback:</span>
              <pre className="text-emerald-400 text-xs mt-1">
                {isMerged
                  ? "Updating 7a8b9c0..3f4a5b6\nFast-forward\n gst_calc.js | 6 ++++++\n 1 file changed, 6 insertions(+)"
                  : "On branch main. Ready to merge."}
              </pre>
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: main Pointer Sliding Forward to C3
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="ffArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Commit C1 */}
                <circle cx="150" cy="110" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="142" y="115" fill="#a7f3d0" fontWeight="bold">C1</text>

                {/* Arrow C1 -> C2 */}
                <line x1="170" y1="110" x2="330" y2="110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#ffArrow)" />

                {/* Commit C2 */}
                <circle cx="350" cy="110" r="20" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="342" y="115" fill="#a5f3fc" fontWeight="bold">C2</text>

                {/* Arrow C2 -> C3 */}
                <line x1="370" y1="110" x2="530" y2="110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#ffArrow)" />

                {/* Commit C3 */}
                <circle cx="550" cy="110" r="20" fill="#164e63" stroke="#22d3ee" strokeWidth="2.5" />
                <text x="542" y="115" fill="#ecfeff" fontWeight="bold">C3</text>

                {/* main branch pointer */}
                <rect
                  x={isMerged ? "500" : "100"}
                  y="30"
                  width="100"
                  height="28"
                  rx="4"
                  fill="#064e3b"
                  stroke="#10b981"
                  strokeWidth="2"
                  className="transition-all duration-700"
                />
                <text x={isMerged ? "520" : "120"} y="48" fill="#a7f3d0" fontWeight="bold">
                  main
                </text>

                {/* feature branch pointer */}
                <rect x="500" y="160" width="100" height="28" rx="4" fill="#164e63" stroke="#06b6d4" strokeWidth="2" />
                <text x="510" y="178" fill="#a5f3fc" fontWeight="bold">
                  feature-gst
                </text>

                <text x="640" y="115" fill="#94a3b8" fontSize="11">
                  {isMerged
                    ? "✓ main slid to C3 in O(1) time."
                    : "main is at C1. feature is at C3."}
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMAND FLAGS COMPARISON MATRIX ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Controlling Fast-Forward Behavior</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Command / Config</th>
                  <th className="p-3 font-semibold">Behavior</th>
                  <th className="p-3 font-semibold text-cyan-400">Typical Industry Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">git merge &lt;branch&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Fast-forwards if possible; creates 3-way merge commit if diverged.</td>
                  <td className="p-3 font-sans text-slate-400">Default Git behavior for daily local development.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-emerald-400 font-bold">git merge --ff-only &lt;branch&gt;</td>
                  <td className="p-3 font-sans text-emerald-300">Guarantees fast-forward; aborts with error if branches diverged.</td>
                  <td className="p-3 font-sans text-slate-400">Defensive scripting & git pull integration on CI/CD servers.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-400 font-bold">git merge --no-ff &lt;branch&gt;</td>
                  <td className="p-3 font-sans text-purple-300">Always creates an explicit merge commit even if fast-forward is possible.</td>
                  <td className="p-3 font-sans text-slate-400">Preserving feature release boundaries in GitFlow workflows.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Fast-Forward Terminal Commands</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Ensure target branch is clean and active</span>
              <p className="text-cyan-400">$ git switch main</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Merge with fast-forward only safety guard</span>
              <p className="text-cyan-400">$ git merge --ff-only feature-gst</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Verify clean linear history</span>
              <p className="text-cyan-400">$ git log --oneline --graph</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="In modern teams that favor linear histories (Trunk-Based Development), fast-forward merging is the gold standard. When paired with `git rebase`, it produces a repository history that reads like an impeccably formatted chronological storybook."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Fast-Forward Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Expecting a Merge Commit when None was Created</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developers sometimes think their merge failed because they don't see a `Merge branch...` commit in the log. A fast-forward merge simply advances the pointer without creating an extra commit.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Accidental History Flattening in GitFlow</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If your company requires explicit merge commit artifacts to track release pull requests, use <code className="text-slate-100 font-mono">git merge --no-ff</code> instead.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_002 Topic 1 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 1 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 0: Concept of Merging</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 2: Three-Way Merges & Merge Base</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
