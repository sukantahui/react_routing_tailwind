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
  GitMerge,
  Network,
  ShieldAlert
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
 * Topic 4: Preserving Branch Topologies: Using git merge --no-ff to enforce explicit merge commits for feature tracking
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [mergeMode, setMergeMode] = useState("no_ff"); // "ff" or "no_ff"

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 4;
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
                <span>Segment 2: Merging & Conflicts • Module 002_002 • Topic 4 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Preserving Branch Topologies: <code className="text-cyan-300 font-mono text-lg">git merge --no-ff</code>
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
              <Network className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Topology & Traceability Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Enterprise Teams Force Explicit Merge Commits
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                While Fast-Forward merges produce clean linear histories, they flatten the visual boundary between the feature and the main branch. Once the feature branch pointer is deleted, it becomes difficult to determine which commits were authored together as part of a distinct feature sprint.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                The <strong><code className="text-cyan-300 font-mono">--no-ff</code> (No Fast-Forward)</strong> flag forces Git to generate an explicit merge commit even when a fast-forward is possible. This preserves the branch topology "bubble" in graph logs, establishes clear audit milestones, and allows <strong>one-step rollback of entire multi-commit features</strong> via <code className="text-emerald-400 font-mono">git revert -m 1 &lt;merge-sha&gt;</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-950 border border-cyan-800 rounded-lg text-cyan-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-cyan-200">
              Explain Like I'm 10 (ELI10): Stapling 10 Receipts in a Manila Envelope vs Loose in the Box
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, senior instructor <strong>Sukanta Hui</strong> explained `--no-ff` to student <strong>Abhronila Das</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Fast-Forward: Dumping Loose Receipts</span>
                </div>
                <p className="text-xs text-slate-300">
                  You bring 10 individual hotel receipts and dump them directly into the master tax archive box. Three months later, nobody can tell which 10 receipts belonged to the Mumbai client trip vs the Delhi client trip!
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>--no-ff: The Labeled Manila Envelope</span>
                </div>
                <p className="text-xs text-slate-300">
                  You place all 10 hotel receipts inside a single labeled manila envelope ("Mumbai Trip March 2026") and place the envelope in the master box. If the entire trip is canceled, Sukanta can pull out the single envelope in 1 second!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-cyan-500 pl-3">
              "Abhronila noted: '--no-ff is the envelope that keeps related receipts bound together!' Exactly." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE TOPOLOGY SIMULATOR ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Topology Explorer</span>
              <h3 className="text-xl font-bold text-white">Compare Graph History Shape</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMergeMode("ff")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  mergeMode === "ff"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Fast-Forward (--ff)
              </button>
              <button
                onClick={() => setMergeMode("no_ff")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  mergeMode === "no_ff"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Enforced Merge Commit (--no-ff)
              </button>
            </div>
          </div>

          {/* Mode Card */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-sans">
              <span className="font-bold text-white text-sm">
                {mergeMode === "ff" ? "Linear History (Flattened)" : "Preserved Feature Topology (Branch Bubble)"}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                mergeMode === "ff" ? "bg-amber-950/50 text-amber-300 border-amber-800" : "bg-cyan-950/50 text-cyan-300 border-cyan-800"
              }`}>
                {mergeMode === "ff" ? "git merge feature" : "git merge --no-ff feature"}
              </span>
            </div>

            <div className="text-slate-300 font-sans leading-relaxed text-xs">
              {mergeMode === "ff" ? (
                <p>
                  <strong>Result:</strong> Commits C2, C3, and C4 are placed directly on the mainline. If the feature branch is deleted, you cannot easily distinguish which commits belonged to the feature.
                </p>
              ) : (
                <p>
                  <strong>Result:</strong> A merge commit <strong>M</strong> is created with Parent 1 (C1) and Parent 2 (C4). The 3 feature commits remain grouped in their historical arc even after branch deletion.
                </p>
              )}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Linear Flat Line vs Enclosed Feature Bubble
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="noFfArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                  <marker id="noFfMainArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {mergeMode === "ff" ? (
                  <>
                    {/* Linear FF */}
                    <circle cx="100" cy="120" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    <text x="92" y="124" fill="#a7f3d0" fontWeight="bold">C1</text>

                    <line x1="118" y1="120" x2="252" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#noFfMainArrow)" />

                    <circle cx="270" cy="120" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="262" y="124" fill="#a5f3fc" fontWeight="bold">C2</text>

                    <line x1="288" y1="120" x2="422" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#noFfArrow)" />

                    <circle cx="440" cy="120" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="432" y="124" fill="#a5f3fc" fontWeight="bold">C3</text>

                    <line x1="458" y1="120" x2="592" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#noFfArrow)" />

                    <circle cx="610" cy="120" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="602" y="124" fill="#a5f3fc" fontWeight="bold">C4</text>

                    <text x="660" y="125" fill="#f59e0b" fontSize="11">
                      Fast-Forward: Flattened into straight line.
                    </text>
                  </>
                ) : (
                  <>
                    {/* Preserved Bubble */}
                    <circle cx="120" cy="120" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    <text x="112" y="125" fill="#a7f3d0" fontWeight="bold">C1</text>

                    {/* Feature Lineage arc */}
                    <path d="M 138 105 L 262 55" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#noFfArrow)" />
                    <circle cx="280" cy="50" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="272" y="55" fill="#a5f3fc" fontWeight="bold">C2</text>

                    <line x1="298" y1="50" x2="402" y2="50" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#noFfArrow)" />
                    <circle cx="420" cy="50" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="412" y="55" fill="#a5f3fc" fontWeight="bold">C3</text>

                    <line x1="438" y1="50" x2="542" y2="50" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#noFfArrow)" />
                    <circle cx="560" cy="50" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="552" y="55" fill="#a5f3fc" fontWeight="bold">C4</text>

                    {/* Main direct line to Merge Commit */}
                    <line x1="140" y1="120" x2="678" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#noFfMainArrow)" />

                    {/* Feature line to Merge Commit */}
                    <path d="M 578 55 L 682 105" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#noFfArrow)" />

                    {/* Merge Commit M */}
                    <circle cx="700" cy="120" r="24" fill="#581c87" stroke="#c084fc" strokeWidth="3" />
                    <text x="692" y="125" fill="#f3e8ff" fontWeight="bold" fontSize="13">M</text>

                    <text x="200" y="210" fill="#38bdf8" fontSize="11">
                      --no-ff preserves the visual feature bubble forever!
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: ENTERPRISE USE CASES TABLE ───────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Why --no-ff Is Standard in Production Releases</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Benefit / Capability</th>
                  <th className="p-3 font-semibold text-emerald-400">With --no-ff</th>
                  <th className="p-3 font-semibold text-amber-400">With Fast-Forward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Atomic Rollback Capability</td>
                  <td className="p-3 text-emerald-300">1 single command: git revert -m 1 &lt;merge-sha&gt;</td>
                  <td className="p-3 text-rose-400">Must revert 10+ individual commits in reverse order</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Audit & Pull Request Tracking</td>
                  <td className="p-3 text-emerald-300">Explicit merge commit message references PR #</td>
                  <td className="p-3 text-amber-300">No PR merge commit recorded in history</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Top-Level History Filtering</td>
                  <td className="p-3 text-emerald-300">git log --first-parent shows high-level milestones</td>
                  <td className="p-3 text-amber-300">Shows all granular micro-commits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Daily --no-ff Commands</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Merge feature branch with explicit merge commit</span>
              <p className="text-cyan-400">$ git switch main</p>
              <p className="text-cyan-400">$ git merge --no-ff feature-gst -m "Merge feature/gst-calc (Release v1.2)"</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. View first-parent release history</span>
              <p className="text-cyan-400">$ git log --first-parent --oneline</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Emergency rollback of entire feature</span>
              <p className="text-cyan-400">$ git revert -m 1 &lt;merge-commit-sha&gt;</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="In the GitFlow workflow used across thousands of enterprise banks and accounting firms, `--no-ff` is mandatory for merging release branches. The ability to revert an entire broken release in 1 second using `git revert -m 1` is why DevOps teams insist on preserving merge commit nodes."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">--no-ff Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Creating Superfluous Merges for 1-Line Typo Fixes</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Using `--no-ff` on tiny 1-line typo fixes clutters the commit log. Reserve `--no-ff` for multi-commit feature branches and release PRs.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Reverting Without Testing in Staging</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you run `git revert -m 1`, Git reverts the code changes, but the original feature branch commits remain part of history. Re-merging that feature branch in the future requires cherry-picking or reverting the revert commit.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_002 Topic 4 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 4 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 3: The Merge Commit</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 5: What Causes Merge Conflicts?</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
