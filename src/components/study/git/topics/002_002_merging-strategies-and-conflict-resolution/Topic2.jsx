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
  Scale,
  GitMerge,
  SplitSquareVertical
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic 2: Three-Way (3-Way) Merges: Finding the Common Ancestor (Merge Base via git merge-base branchA branchB)
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activeScenario, setActiveScenario] = useState("theirs_changed");

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 2;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const scenarios = {
    theirs_changed: {
      title: "Scenario A: Incoming Branch Modified the Line",
      baseText: "const taxRate = 0.15;",
      oursText: "const taxRate = 0.15; (Unchanged)",
      theirsText: "const taxRate = 0.18; (Mahima updated to 18%)",
      resolution: "const taxRate = 0.18;",
      status: "AUTOMATIC MERGE (Accepts 'Theirs')",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
    },
    ours_changed: {
      title: "Scenario B: Current Branch Modified the Line",
      baseText: "const discount = 0.05;",
      oursText: "const discount = 0.10; (Sachin updated to 10%)",
      theirsText: "const discount = 0.05; (Unchanged)",
      resolution: "const discount = 0.10;",
      status: "AUTOMATIC MERGE (Preserves 'Ours')",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800"
    },
    conflict: {
      title: "Scenario C: Both Branches Modified the Same Line Differently",
      baseText: "const currency = 'INR';",
      oursText: "const currency = '₹ (Rupees)'; (Sachin)",
      theirsText: "const currency = 'INR (₹)'; (Mahima)",
      resolution: "<<<<<<< HEAD\nconst currency = '₹ (Rupees)';\n=======\nconst currency = 'INR (₹)';\n>>>>>>> feature-tax",
      status: "MERGE CONFLICT (Requires Human Resolution)",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800"
    }
  };

  const currentScenario = scenarios[activeScenario];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <GitMerge className="w-4 h-4" />
                <span>Segment 2: Merging & Conflicts • Module 002_002 • Topic 2 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Three-Way (3-Way) Merges & Calculating the Merge Base
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
              <Scale className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Algorithmic History Reconciliation</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why a 3-Way Comparison Solves What 2-Way Diffs Cannot
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                When two branches have diverged with independent commits, a simple 2-way comparison (comparing branch A against branch B) is insufficient because it cannot determine <em>who introduced which modification</em>.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Git resolves this by finding the <strong>Merge Base</strong> (the lowest common ancestor in the DAG) and performing a <strong>3-Way Merge</strong> across three distinct snapshots: <em>Base</em>, <em>Ours (HEAD)</em>, and <em>Theirs (Incoming)</em>. By checking each line against the Base, Git automatically merges non-overlapping edits and triggers conflicts only when both sides edited the exact same line.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 border border-purple-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-950 border border-purple-800 rounded-lg text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-purple-200">
              Explain Like I'm 10 (ELI10): The Master Blueprint on the Architect's Table
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, instructor <strong>Sukanta Hui</strong> demonstrated the 3-way merge to students <strong>Sachin</strong> and <strong>Mahima</strong> using a master blueprint analogy:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400 font-semibold font-sans">1. The Base Blueprint (Monday)</span>
                <p className="text-slate-300">The original blueprint had a 2-bedroom floor plan.</p>
              </div>
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                <span className="text-emerald-400 font-semibold font-sans">2. Sachin's Copy (Ours)</span>
                <p className="text-slate-300">Sachin added an air-conditioning unit to Bedroom 1.</p>
              </div>
              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
                <span className="text-cyan-400 font-semibold font-sans">3. Mahima's Copy (Theirs)</span>
                <p className="text-slate-300">Mahima added modern wooden flooring to Bedroom 2.</p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-purple-500 pl-3">
              "Because Sukanta compares both copies against Monday's original blueprint, he sees that Sachin only touched Bedroom 1 and Mahima only touched Bedroom 2. He combines both additions onto the master blueprint with zero confusion!"
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE 3-WAY DECISION MATRIX LAB ────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Logic Engine</span>
              <h3 className="text-xl font-bold text-white">The 3-Way Merge Decision Engine</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveScenario("theirs_changed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeScenario === "theirs_changed"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Theirs Changed
              </button>
              <button
                onClick={() => setActiveScenario("ours_changed")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeScenario === "ours_changed"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Ours Changed
              </button>
              <button
                onClick={() => setActiveScenario("conflict")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  activeScenario === "conflict"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Both Changed (Conflict)
              </button>
            </div>
          </div>

          {/* Decision Matrix Box */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <span className="font-bold text-white text-sm">{currentScenario.title}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-mono ${currentScenario.badgeColor}`}>
                {currentScenario.status}
              </span>
            </div>

            {/* 3 Snapshot Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-sans">1. BASE (Common Ancestor)</span>
                <p className="text-slate-300 font-bold">{currentScenario.baseText}</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-sans">2. OURS (HEAD / main)</span>
                <p className="text-emerald-300 font-bold">{currentScenario.oursText}</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-sans">3. THEIRS (feature-tax)</span>
                <p className="text-cyan-300 font-bold">{currentScenario.theirsText}</p>
              </div>
            </div>

            {/* Synthesized Output */}
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
              <span className="text-slate-400 font-sans">Synthesized Merge Result:</span>
              <pre className="text-purple-300 font-bold whitespace-pre-wrap">
                {currentScenario.resolution}
              </pre>
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Merge Base (LCA) Finding in Commit Graph
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="baseArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                  <marker id="featArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Common Ancestor C1 */}
                <circle cx="150" cy="120" r="22" fill="#064e3b" stroke="#10b981" strokeWidth="2.5">
                  <animate attributeName="r" values="22;24;22" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="140" y="125" fill="#a7f3d0" fontWeight="bold">C1</text>
                <text x="80" y="160" fill="#10b981" fontWeight="bold">Merge Base (LCA)</text>
                <text x="80" y="175" fill="#6ee7b7" fontSize="9">git merge-base main feature</text>

                {/* Main Branch Commit M1 */}
                <path d="M 172 110 L 328 65" stroke="#10b981" strokeWidth="2" markerEnd="url(#baseArrow)" />
                <circle cx="350" cy="65" r="20" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="342" y="70" fill="#a7f3d0" fontWeight="bold">M1</text>

                <rect x="390" y="50" width="70" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="405" y="67" fill="#a7f3d0" fontWeight="bold">main</text>

                {/* Feature Branch Commit F1 */}
                <path d="M 172 130 L 328 175" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#featArrow)" />
                <circle cx="350" cy="175" r="20" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="342" y="180" fill="#a5f3fc" fontWeight="bold">F1</text>

                <rect x="390" y="160" width="90" height="26" rx="4" fill="#164e63" stroke="#06b6d4" />
                <text x="400" y="177" fill="#a5f3fc" fontWeight="bold">feature-tax</text>

                {/* Merge Commit M */}
                <path d="M 370 65 L 528 110" stroke="#10b981" strokeWidth="2" markerEnd="url(#baseArrow)" />
                <path d="M 370 175 L 528 130" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#featArrow)" />

                <circle cx="550" cy="120" r="24" fill="#581c87" stroke="#c084fc" strokeWidth="2.5" />
                <text x="542" y="125" fill="#f3e8ff" fontWeight="bold">M</text>
                <text x="500" y="165" fill="#c084fc" fontSize="10">2 Parents (M1, F1)</text>

                <text x="600" y="125" fill="#cbd5e1" fontSize="11">
                  Merge commit synthesizes all 3 snapshots!
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PLUMBING COMMANDS SUMMARY ────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Merge Base Plumbing Commands</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Command</th>
                  <th className="p-3 font-semibold">Output / Purpose</th>
                  <th className="p-3 font-semibold text-cyan-400">Practical Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-300 font-bold">git merge-base A B</td>
                  <td className="p-3 font-sans text-slate-300">Outputs the SHA-1 of the common ancestor commit</td>
                  <td className="p-3 text-slate-300">git merge-base main feature</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-emerald-400 font-bold">git merge-base --is-ancestor A B</td>
                  <td className="p-3 font-sans text-slate-300">Returns 0 if A is an ancestor of B, 1 otherwise</td>
                  <td className="p-3 text-slate-300">git merge-base --is-ancestor main feature</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-400 font-bold">git merge-base --all A B</td>
                  <td className="p-3 font-sans text-slate-300">Outputs all common ancestors in criss-cross merges</td>
                  <td className="p-3 text-slate-300">git merge-base --all branchA branchB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Inspecting Merge Bases in the Terminal</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Find the merge base between main and feature</span>
              <p className="text-cyan-400">$ git merge-base main feature-tax</p>
              <p className="text-emerald-400">7a8b9c0d1e2f3456789abcdef0123456789abcde</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. View what feature introduced since that base</span>
              <p className="text-cyan-400">$ git diff $(git merge-base main feature-tax) feature-tax</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When candidates come to technical interviews, they often say: 'Git compares the two branches.' I always correct them: 'No, Git performs a 3-way comparison including the common ancestor.' Once you mention the Merge Base, interviewers know you understand the mathematics of version control."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">3-Way Merging Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Assuming 3-Way Merges Always Trigger Conflicts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Many beginners dread 3-way merges. In reality, Git merges non-overlapping edits 100% automatically without any conflict markers.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Criss-Cross Merge Confusion</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Frequently back-merging `main` into feature branches and feature into `main` creates multiple merge bases. Modern Git handles this automatically via the `ort` strategy.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_002 Topic 2 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 2 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 1: Fast-Forward Merges</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 3: The Merge Commit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
