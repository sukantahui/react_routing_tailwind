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
  FolderPlus
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
 * Topic 5: Creating and Switching in One Step: git switch -c <branch> and git checkout -b <branch>
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [createdBranches, setCreatedBranches] = useState([
    { name: "main", isCurrent: false },
    { name: "feature/epf-calc", isCurrent: true }
  ]);
  const [newBranchName, setNewBranchName] = useState("");
  const [useUppercaseC, setUseUppercaseC] = useState(false);
  const [logOutput, setLogOutput] = useState("Switched to a new branch 'feature/epf-calc'");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const handleAtomicCreate = (e) => {
    e.preventDefault();
    const clean = newBranchName.trim();
    if (!clean) return;

    const exists = createdBranches.some((b) => b.name === clean);

    if (exists && !useUppercaseC) {
      setLogOutput(`fatal: a branch named '${clean}' already exists.`);
      return;
    }

    if (exists && useUppercaseC) {
      const updated = createdBranches.map((b) => ({
        ...b,
        isCurrent: b.name === clean
      }));
      setCreatedBranches(updated);
      setLogOutput(`Reset branch '${clean}' and switched to it.`);
      setNewBranchName("");
      return;
    }

    // New branch addition
    const updated = createdBranches.map((b) => ({ ...b, isCurrent: false }));
    updated.push({ name: clean, isCurrent: true });
    setCreatedBranches(updated);
    setLogOutput(`Switched to a new branch '${clean}'`);
    setNewBranchName("");
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
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 5 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Creating & Switching in One Step: <code className="text-cyan-300 font-mono text-lg">git switch -c</code> / <code className="text-purple-300 font-mono text-lg">git checkout -b</code>
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
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Atomic Muscle Memory</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                The Daily Workhorse Command of Professional Software Engineering
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                In day-to-day software development, engineers rarely execute two separate commands (<code className="text-cyan-300">git branch name</code> followed by <code className="text-cyan-300">git switch name</code>). Instead, 99% of feature development begins with the atomic command:
              </p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-cyan-300 text-sm">
                $ git switch -c &lt;new-branch-name&gt;
              </div>
              <p className="text-slate-300 leading-relaxed text-base">
                This writes the 41-byte branch ref file and updates <code className="text-slate-100 font-mono">.git/HEAD</code> in a single transaction, ensuring you never accidentally write and commit code to the wrong branch.
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
              Explain Like I'm 10 (ELI10): Labeling and Opening a Fresh Tax Ledger Folder
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> set up a practical drill with student <strong>Debangshu Poddar</strong>:
            </p>

            <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                Debangshu was calculating Employee Provident Fund (EPF) deductions. Instead of taking a folder, pasting a label on it, and leaving it on the back shelf (the 2-step <code className="text-slate-100">git branch</code> mistake), Sukanta showed him how to:
              </p>
              <ul className="text-xs text-emerald-300 list-disc pl-5 space-y-1">
                <li>Grab the fresh folder labeled <strong>"feature/epf-calc"</strong></li>
                <li>Immediately open it right in front of his pen on the working desk!</li>
              </ul>
            </div>

            <p className="italic text-slate-400 border-l-2 border-emerald-500 pl-3">
              "Sukanta sir said: 'If you use git switch -c, your pen is guaranteed to be writing on the new folder. You will never accidentally scribble your draft equations on the Government Audit master ledger!'" — Debangshu Poddar
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE ATOMIC CREATOR SIMULATOR ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Simulator</span>
            <h3 className="text-xl font-bold text-white">Execute <code className="text-cyan-300 font-mono">git switch -c</code></h3>
          </div>

          <form onSubmit={handleAtomicCreate} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-500">
                  $ git switch {useUppercaseC ? "-C" : "-c"}
                </span>
                <input
                  type="text"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  placeholder="feature/bonus-calculation"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-32 pr-4 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Create & Switch</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={useUppercaseC}
                  onChange={(e) => setUseUppercaseC(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-600 focus:ring-cyan-500"
                />
                <span className={useUppercaseC ? "text-amber-400 font-semibold" : ""}>
                  Use uppercase <code>-C</code> (Force Reset existing branch)
                </span>
              </label>
            </div>
          </form>

          {/* Terminal Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-500"># Command feedback:</div>
            <p className={logOutput.startsWith("fatal:") ? "text-rose-400 font-semibold" : "text-emerald-400"}>
              {logOutput}
            </p>
          </div>

          {/* Active Branch Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {createdBranches.map((b, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border font-mono text-xs space-y-1 transition ${
                  b.isCurrent
                    ? "bg-emerald-950/40 border-emerald-700 text-emerald-300 shadow-md shadow-emerald-950/30"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{b.name}</span>
                  {b.isCurrent && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-900 border border-emerald-600 text-emerald-200 text-[10px] font-sans">
                      HEAD (Active)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 break-all">.git/refs/heads/{b.name}</div>
              </div>
            ))}
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Atomic Ref Creation + HEAD Redirection
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="atomicArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                  <marker id="headStepArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Step 1: Branch created */}
                <rect x="50" y="30" width="220" height="60" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="65" y="55" fill="#67e8f9" fontWeight="bold">Step 1: Write Ref File</text>
                <text x="65" y="75" fill="#94a3b8" fontSize="10">.git/refs/heads/feature (41 B)</text>

                {/* Arrow Step 1 to Step 2 */}
                <path d="M 270 60 L 330 60" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#atomicArrow)">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                </path>

                {/* Step 2: Update HEAD */}
                <rect x="340" y="30" width="220" height="60" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="355" y="55" fill="#fda4af" fontWeight="bold">Step 2: Update HEAD</text>
                <text x="355" y="75" fill="#94a3b8" fontSize="10">.git/HEAD = ref: refs/.../feat</text>

                {/* Arrow Step 2 to Result */}
                <path d="M 560 60 L 620 60" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#atomicArrow)" />

                {/* Result */}
                <rect x="630" y="30" width="180" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="645" y="55" fill="#a7f3d0" fontWeight="bold">Result: Atomic Success</text>
                <text x="645" y="75" fill="#6ee7b7" fontSize="10">Working tree ready for work</text>

                {/* Footer notes in SVG */}
                <text x="50" y="140" fill="#94a3b8" fontSize="11">
                  1. Execution time: ~2 milliseconds total.
                </text>
                <text x="50" y="165" fill="#94a3b8" fontSize="11">
                  2. Uncommitted modifications automatically follow you to the new branch without needing a stash.
                </text>
                <text x="50" y="190" fill="#38bdf8" fontSize="11">
                  3. Command: <tspan fill="#a7f3d0">git switch -c feature/epf-calc</tspan>
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: FLAG MATRIX & USE CASES ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Creation Flags Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Flag / Syntax</th>
                  <th className="p-3 font-semibold">Legacy Syntax</th>
                  <th className="p-3 font-semibold text-cyan-400">Behavior & Safety Guard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">git switch -c &lt;name&gt;</td>
                  <td className="p-3 text-slate-400">git checkout -b &lt;name&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Creates and switches; aborts if name already exists.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-amber-300 font-bold">git switch -C &lt;name&gt;</td>
                  <td className="p-3 text-slate-400">git checkout -B &lt;name&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Force creates/resets branch pointer if it already exists.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">git switch -c &lt;name&gt; &lt;sha&gt;</td>
                  <td className="p-3 text-slate-400">git checkout -b &lt;name&gt; &lt;sha&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Creates branch starting from historical commit &lt;sha&gt;.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-300 font-bold">git switch --orphan &lt;name&gt;</td>
                  <td className="p-3 text-slate-400">git checkout --orphan &lt;name&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Creates an isolated branch with clean slate and zero parents.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL CHEATSHEET ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Common Terminal Scenarios</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># Scenario 1: Started editing on main by mistake; move edits to new branch</span>
              <p className="text-cyan-400">$ git switch -c feature/epf-calculation</p>
              <p className="text-emerald-400">Switched to a new branch 'feature/epf-calculation'</p>
              <p className="text-slate-500"># (All uncommitted edits now safely belong to the new branch!)</p>
            </div>
            <div>
              <span className="text-slate-500"># Scenario 2: Create a hotfix branch starting from release tag v1.0.0</span>
              <p className="text-cyan-400">$ git switch -c hotfix/login-patch v1.0.0</p>
              <p className="text-emerald-400">Switched to a new branch 'hotfix/login-patch'</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When Debangshu and Swadeep began working on the AccoTax tax engine, they kept typing `git checkout -b`. I reminded them: while `-b` still works everywhere, `git switch -c` is self-documenting code. `-c` clearly stands for '--create'. It forms great habits for modern team codebases."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Pitfalls with `-c` and `-C`</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Accidental History Overwrites with Uppercase `-C`</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Using <code className="text-slate-100">git switch -C main</code> by accident forces the <code className="text-slate-100">main</code> pointer to reset to your current commit, potentially detaching previous main commits. Always stick to lowercase <code className="text-cyan-300">-c</code> unless resetting is intentional.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Forgetting to Verify Branch Before Running Migrations</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always run <code className="text-slate-100">git branch --show-current</code> to double-check that you are on your newly created branch before running database seeders or structural refactors.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 5 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 5 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 4: Switching Branches</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 6: Listing & Inspecting Branches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
