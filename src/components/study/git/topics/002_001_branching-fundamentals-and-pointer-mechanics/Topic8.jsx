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
  ShieldAlert,
  Flame
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic 8: Deleting Branches: Safe deletion with git branch -d vs force deletion with git branch -D
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [branches, setBranches] = useState([
    { name: "main", isMerged: true, sha: "7a8b9c0", isCurrent: true },
    { name: "feature-merged-billing", isMerged: true, sha: "4b5c6d7", isCurrent: false },
    { name: "experiment-tax-hack", isMerged: false, sha: "9e8f7a6", isCurrent: false }
  ]);
  const [terminalLog, setTerminalLog] = useState("Ready for branch deletion experiments.");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const handleDeleteSafe = (targetBranch) => {
    if (targetBranch.isCurrent) {
      setTerminalLog(`error: Cannot delete branch '${targetBranch.name}' checked out at '.'`);
      return;
    }

    if (!targetBranch.isMerged) {
      setTerminalLog(
        `error: The branch '${targetBranch.name}' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D ${targetBranch.name}'.`
      );
      return;
    }

    setBranches(branches.filter((b) => b.name !== targetBranch.name));
    setTerminalLog(`Deleted branch ${targetBranch.name} (was ${targetBranch.sha}).`);
  };

  const handleDeleteForce = (targetBranch) => {
    if (targetBranch.isCurrent) {
      setTerminalLog(`error: Cannot delete branch '${targetBranch.name}' checked out at '.'`);
      return;
    }

    setBranches(branches.filter((b) => b.name !== targetBranch.name));
    setTerminalLog(`Deleted branch ${targetBranch.name} (was ${targetBranch.sha}) [FORCED].`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 8 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Deleting Branches: Safe Deletion (<code className="text-emerald-300 font-mono text-lg">-d</code>) vs Force (<code className="text-rose-400 font-mono text-lg">-D</code>)
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
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Repository Hygiene</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Safe Deletion with Guardrails vs Unconditional Override
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Deleting a Git branch removes the 41-byte pointer file from <code className="text-cyan-300 font-mono">.git/refs/heads/</code>. Git incorporates built-in defensive guards to protect developers from accidentally discarding unmerged feature work.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Running <code className="text-emerald-300 font-mono">git branch -d &lt;name&gt;</code> performs an automatic merge-base check. If any unique commits exist on the branch that have not been integrated into the current HEAD, Git refuses to delete it. When you intentionally wish to discard an experiment, uppercase <code className="text-rose-400 font-mono">git branch -D &lt;name&gt;</code> overrides the safety lock.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-rose-950/40 border border-rose-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-950 border border-rose-800 rounded-lg text-rose-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-rose-200">
              Explain Like I'm 10 (ELI10): The Smart Paper Shredder vs The Emergency Override
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> demonstrated the difference using an office shredder analogy with student <strong>Sachin Sharma</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Smart Shredder: git branch -d</span>
                </div>
                <p className="text-xs text-slate-300">
                  You feed a folder into a smart scanner. It checks if the tax returns inside have already been filed and recorded in the government database. If yes, it safely destroys the duplicate cover. If no, it beeps loudly and refuses to shred!
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-rose-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>The Incinerator Override: git branch -D</span>
                </div>
                <p className="text-xs text-slate-300">
                  You know the folder contains bad math or discarded scribbles. You flip open the red safety switch and throw it straight into the incinerator. No checks, no questions asked!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-rose-500 pl-3">
              "Sachin asked: 'Sir, what if I accidentally -D an important branch?' Sukanta replied: 'Git keeps a 30-day safety net called reflog. We can rescue the commit SHA in 5 seconds!'"
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE DELETION SIMULATOR ────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Simulator</span>
            <h3 className="text-xl font-bold text-white">Live Safe Delete vs Force Delete Lab</h3>
          </div>

          {/* Branch Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {branches.map((b) => (
              <div
                key={b.name}
                className={`p-4 rounded-xl border font-mono text-xs flex flex-col justify-between space-y-3 ${
                  b.isCurrent
                    ? "bg-slate-900/80 border-cyan-700 text-cyan-300"
                    : b.isMerged
                    ? "bg-slate-950 border-emerald-900/60 text-slate-300"
                    : "bg-slate-950 border-amber-900/60 text-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{b.name}</span>
                    {b.isCurrent && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/80 border border-cyan-600 text-cyan-200">
                        HEAD
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">SHA: {b.sha}</div>
                  <div className="text-[11px] mt-1 font-sans">
                    Status:{" "}
                    <span className={b.isMerged ? "text-emerald-400" : "text-amber-400 font-bold"}>
                      {b.isMerged ? "Merged (Safe)" : "Unmerged (Has unique work)"}
                    </span>
                  </div>
                </div>

                {!b.isCurrent && (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleDeleteSafe(b)}
                      className="flex-1 px-2 py-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 rounded text-emerald-300 text-[11px] transition font-sans font-semibold"
                    >
                      Safe -d
                    </button>
                    <button
                      onClick={() => handleDeleteForce(b)}
                      className="flex-1 px-2 py-1 bg-rose-950 hover:bg-rose-900 border border-rose-700 rounded text-rose-300 text-[11px] transition font-sans font-semibold"
                    >
                      Force -D
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Terminal Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-500"># Command Log:</div>
            <pre className={`whitespace-pre-wrap ${terminalLog.startsWith("error:") ? "text-rose-400 font-semibold" : "text-emerald-400"}`}>
              {terminalLog}
            </pre>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Pointer Removal While Commit Objects Persist in DAG
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="delArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Commit C1 */}
                <circle cx="200" cy="110" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="192" y="114" fill="#a5f3fc" fontWeight="bold">C1</text>

                <line x1="218" y1="110" x2="380" y2="110" stroke="#06b6d4" strokeWidth="2" />

                {/* Commit C2 */}
                <circle cx="400" cy="110" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="392" y="114" fill="#a5f3fc" fontWeight="bold">C2</text>

                {/* main branch pointer */}
                <rect x="360" y="30" width="80" height="28" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="380" y="48" fill="#a7f3d0" fontWeight="bold">main</text>
                <line x1="400" y1="58" x2="400" y2="90" stroke="#10b981" strokeWidth="2" markerEnd="url(#delArrow)" />

                {/* Deleted pointer with X */}
                <rect x="540" y="30" width="130" height="28" rx="4" fill="#881337" stroke="#f43f5e" strokeDasharray="3 2" />
                <text x="550" y="48" fill="#fecdd3" textDecoration="line-through">feature (Deleted)</text>
                <line x1="530" y1="25" x2="680" y2="65" stroke="#f43f5e" strokeWidth="2.5" />
                <line x1="680" y1="25" x2="530" y2="65" stroke="#f43f5e" strokeWidth="2.5" />

                {/* Dangling Commit F1 */}
                <path d="M 415 100 C 470 60, 560 60, 595 95" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                <circle cx="610" cy="110" r="18" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="602" y="114" fill="#94a3b8" fontWeight="bold">F1</text>
                <text x="560" y="150" fill="#f87171" fontSize="10">Dangling Commit (In Reflog)</text>

                <text x="50" y="195" fill="#94a3b8" fontSize="11">
                  Branch pointer <code className="text-rose-400">.git/refs/heads/feature</code> was deleted, but Commit <code className="text-cyan-300">F1</code> remains safe in object store.
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMPARISON MATRIX ───────────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Safe Deletion vs Force Deletion Comparison</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Flag / Command</th>
                  <th className="p-3 font-semibold">Merge Check Status</th>
                  <th className="p-3 font-semibold text-cyan-400">Appropriate Scenario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-emerald-400 font-bold">git branch -d &lt;name&gt;</td>
                  <td className="p-3 font-sans text-emerald-300">Enforces full merge check</td>
                  <td className="p-3 font-sans text-slate-300">Cleaning up feature branches merged into main.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-rose-400 font-bold">git branch -D &lt;name&gt;</td>
                  <td className="p-3 font-sans text-rose-300">Bypasses all checks</td>
                  <td className="p-3 font-sans text-slate-300">Discarding abandoned experiments or GitHub Squash-merged branches.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-400 font-bold">git push origin --delete &lt;name&gt;</td>
                  <td className="p-3 font-sans text-purple-300">Remote server deletion</td>
                  <td className="p-3 font-sans text-slate-300">Pruning completed feature branches from GitHub repository.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL CHEATSHEET ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Branch Deletion Cheatsheet</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Switch to main before deleting a branch</span>
              <p className="text-cyan-400">$ git switch main</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Safely delete merged feature branch</span>
              <p className="text-cyan-400">$ git branch -d feature-billing</p>
              <p className="text-emerald-400">Deleted branch feature-billing (was 4b5c6d7).</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Force delete failed experiment</span>
              <p className="text-cyan-400">$ git branch -D experiment-tax-hack</p>
              <p className="text-rose-400">Deleted branch experiment-tax-hack (was 9e8f7a6).</p>
            </div>
            <div>
              <span className="text-slate-500"># 4. Delete remote branch on GitHub</span>
              <p className="text-cyan-400">$ git push origin --delete feature-billing</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When a branch is deleted, Git prints `(was 7a8b9c0)`. Never ignore that hash! If someone screams 2 hours later that their unmerged accounting formula was on that deleted branch, you simply type `git switch -c rescue-branch 7a8b9c0` and everything is restored instantly."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Branch Deletion Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Attempting to Delete the Active Branch</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You cannot delete the branch currently checked out to your HEAD. Always switch to <code className="text-slate-100">main</code> first.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Using -D Habitually Without Thinking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developers who make <code className="text-slate-100">git branch -D</code> a subconscious habit will eventually delete a feature branch containing days of unintegrated work. Always try <code className="text-emerald-300">-d</code> first!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 8 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 8 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 7: Renaming Branches</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 9: The Detached HEAD State</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
