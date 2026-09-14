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
  Split,
  Combine
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic 0: The Concept of Merging: Integrating divergent histories into a unified line of development
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [selectedMergeType, setSelectedMergeType] = useState("ff");

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/002_001_branching-fundamentals-and-pointer-mechanics/15`;
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
                <span>Segment 2: Merging & Conflicts • Module 002_002 • Topic 0 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Concept of Merging: Integrating Divergent Histories
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Module (002_001 Quiz)</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition shadow-lg shadow-cyan-950/50"
              >
                <span>Topic 1: Fast-Forward Merges</span>
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
              <GitMerge className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">History Synthesis Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Unifying Independent Lines of Development Back into Production
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Branching in Git allows engineers to isolate experimental work, implement business features, and fix critical bugs without disrupting the main production branch. However, isolated work must eventually rejoin the primary codebase.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                <strong>Merging (<code className="text-cyan-300 font-mono">git merge</code>)</strong> is Git’s automated engine for analyzing divergent timelines, finding their common historical ancestor (the <em>Merge Base</em>), reconciling modifications, and uniting them into a cohesive repository history.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-blue-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-950 border border-blue-800 rounded-lg text-blue-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-blue-200">
              Explain Like I'm 10 (ELI10): Compiling the Annual Barrackpore Tax Audit
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax in Barrackpore</strong>, senior consultant <strong>Sukanta Hui</strong> set up two accounting tasks with students <strong>Sachin Sharma</strong> and <strong>Mahima Ghosh</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 border border-cyan-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Split className="w-4 h-4" />
                  <span>The Branching Phase: Independent Tasks</span>
                </div>
                <p className="text-xs text-slate-300">
                  On Monday morning, Sachin started auditing company payments on his desk (<code className="text-slate-100 font-mono">main</code>), while Mahima took a draft folder to audit GST calculations (<code className="text-cyan-300 font-mono">feature-gst</code>).
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Combine className="w-4 h-4" />
                  <span>The Merging Phase: Unified Master File</span>
                </div>
                <p className="text-xs text-slate-300">
                  On Friday afternoon, Sukanta Hui takes both completed drafts. Because Sachin worked on Section A and Mahima worked on Section B, Sukanta seamlessly staples both audited sections into the final master filing ledger!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-blue-500 pl-3">
              "Sukanta sir noted: 'Merging is simply combining two people's audited sections into the primary ledger. Git does 95% of this automatically unless both people scribbled conflicting notes on the exact same row!'"
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE MERGE PARADIGM LAB ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Merge Explorer</span>
              <h3 className="text-xl font-bold text-white">Compare the Two Primary Merge Paradigms</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMergeType("ff")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedMergeType === "ff"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                1. Fast-Forward Merge (Linear)
              </button>
              <button
                onClick={() => setSelectedMergeType("three_way")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedMergeType === "three_way"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                2. Three-Way Merge (Divergent)
              </button>
            </div>
          </div>

          {/* Merge Type Card */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <span className="font-bold text-white text-sm">
                {selectedMergeType === "ff"
                  ? "Fast-Forward Merge (No Merge Commit Created)"
                  : "Three-Way Recursive Merge (Creates Explicit Merge Commit)"}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                selectedMergeType === "ff"
                  ? "bg-cyan-950/50 text-cyan-300 border-cyan-800"
                  : "bg-purple-950/50 text-purple-300 border-purple-800"
              }`}>
                {selectedMergeType === "ff" ? "O(1) Pointer Slide" : "3-Way Ancestor Synthesis"}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 space-y-1">
              <span className="text-slate-500 font-sans">Execution Workflow:</span>
              <p className="text-cyan-300 font-bold">
                $ git switch main &amp;&amp; git merge feature-gst
              </p>
            </div>

            <div className="text-slate-300 font-sans leading-relaxed text-xs space-y-1">
              {selectedMergeType === "ff" ? (
                <p>
                  <strong>Mechanism:</strong> Because <code className="text-slate-100">main</code> has no new commits since the fork point, Git simply slides the <code className="text-emerald-400">main</code> pointer forward to match the tip of <code className="text-cyan-400">feature-gst</code>. History remains perfectly linear.
                </p>
              ) : (
                <p>
                  <strong>Mechanism:</strong> Both <code className="text-slate-100">main</code> and <code className="text-cyan-400">feature-gst</code> added independent commits. Git finds their common ancestor, merges changes, and generates a new <strong>Merge Commit (M)</strong> with 2 parents.
                </p>
              )}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Linear Fast-Forward vs 3-Way Merge Topologies
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="mergeArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                  <marker id="mainArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                </defs>

                {selectedMergeType === "ff" ? (
                  <>
                    {/* Fast Forward Line */}
                    <circle cx="150" cy="120" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    <text x="142" y="124" fill="#a7f3d0" fontWeight="bold">C1</text>

                    <line x1="168" y1="120" x2="332" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#mainArrow)" />

                    <circle cx="350" cy="120" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="342" y="124" fill="#a5f3fc" fontWeight="bold">C2</text>

                    <line x1="368" y1="120" x2="532" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#mergeArrow)" />

                    <circle cx="550" cy="120" r="18" fill="#164e63" stroke="#22d3ee" strokeWidth="2.5" />
                    <text x="542" y="124" fill="#ecfeff" fontWeight="bold">C3</text>

                    {/* Both pointers at C3 */}
                    <rect x="500" y="40" width="100" height="26" rx="4" fill="#064e3b" stroke="#10b981">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <text x="515" y="57" fill="#a7f3d0" fontWeight="bold">main (FF)</text>

                    <rect x="500" y="170" width="100" height="26" rx="4" fill="#164e63" stroke="#06b6d4" />
                    <text x="520" y="187" fill="#a5f3fc" fontWeight="bold">feature</text>

                    <text x="640" y="125" fill="#34d399" fontSize="11">
                      Linear pointer shift. Zero extra commits.
                    </text>
                  </>
                ) : (
                  <>
                    {/* 3-Way Merge Diagram */}
                    {/* Common Base C1 */}
                    <circle cx="120" cy="120" r="18" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                    <text x="112" y="124" fill="#94a3b8" fontWeight="bold">C1</text>
                    <text x="80" y="155" fill="#64748b" fontSize="9">Merge Base</text>

                    {/* Main Branch M1 */}
                    <path d="M 138 110 L 282 65" stroke="#10b981" strokeWidth="2" markerEnd="url(#mainArrow)" />
                    <circle cx="300" cy="65" r="18" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    <text x="292" y="69" fill="#a7f3d0" fontWeight="bold">M1</text>

                    {/* Feature Branch F1 */}
                    <path d="M 138 130 L 282 175" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#mergeArrow)" />
                    <circle cx="300" cy="175" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                    <text x="292" y="179" fill="#a5f3fc" fontWeight="bold">F1</text>

                    {/* Merge Commit M */}
                    <path d="M 318 65 L 482 110" stroke="#10b981" strokeWidth="2" markerEnd="url(#mainArrow)" />
                    <path d="M 318 175 L 482 130" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#mergeArrow)" />

                    <circle cx="500" cy="120" r="22" fill="#581c87" stroke="#c084fc" strokeWidth="2.5" />
                    <text x="492" y="125" fill="#f3e8ff" fontWeight="bold">M</text>
                    <text x="450" y="165" fill="#c084fc" fontSize="10">2 Parents (M1 & F1)</text>

                    {/* main pointer at M */}
                    <rect x="460" y="20" width="80" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="480" y="37" fill="#a7f3d0" fontWeight="bold">main</text>

                    <text x="560" y="125" fill="#cbd5e1" fontSize="11">
                      Synthesized commit with two parent hashes.
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: PRE-MERGE CHECKLIST TABLE ───────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Pre-Merge Professional Best Practices</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Step #</th>
                  <th className="p-3 font-semibold">Pre-Merge Check</th>
                  <th className="p-3 font-semibold text-cyan-400">Terminal Command</th>
                  <th className="p-3 font-semibold">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-400 font-bold">1</td>
                  <td className="p-3 font-sans text-slate-200">Clean Working Tree</td>
                  <td className="p-3 text-cyan-300">git status</td>
                  <td className="p-3 font-sans text-slate-400">Prevents uncommitted code from colliding with merge changes.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-400 font-bold">2</td>
                  <td className="p-3 font-sans text-slate-200">Checkout Target Branch</td>
                  <td className="p-3 text-cyan-300">git switch main</td>
                  <td className="p-3 font-sans text-slate-400">Ensures you are on the receiving branch that will absorb the feature.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-400 font-bold">3</td>
                  <td className="p-3 font-sans text-slate-200">Sync with Remote</td>
                  <td className="p-3 text-cyan-300">git pull origin main</td>
                  <td className="p-3 font-sans text-slate-400">Ensures your local base is up to date before integrating new code.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-400 font-bold">4</td>
                  <td className="p-3 font-sans text-slate-200">Preview Incoming Diffs</td>
                  <td className="p-3 text-cyan-300">git diff main...feature</td>
                  <td className="p-3 font-sans text-slate-400">Previews the exact delta that will be merged into production.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL CHEATSHEET ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Standard Merge Command Sequence</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Switch to the branch that will receive the changes</span>
              <p className="text-cyan-400">$ git switch main</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Merge incoming feature branch</span>
              <p className="text-cyan-400">$ git merge feature-gst-slab</p>
              <p className="text-emerald-400">Updating 7a8b9c0..3f4a5b6</p>
              <p className="text-emerald-400">Fast-forward</p>
              <p className="text-slate-400"> ledger.txt | 4 ++++</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Clean up merged branch pointer</span>
              <p className="text-cyan-400">$ git branch -d feature-gst-slab</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="Welcome to Module 002_002! Branching was about taking separate paths; merging is about bringing those paths back together to deliver real software value. As Sachin and Mahima discovered, Git is an automated collaborator that seamlessly merges code 95% of the time. Over the next 14 topics, we will master every nuance of fast-forwards, 3-way algorithms, conflict markers, and squash merges!"
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Common Merging Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Running `git merge` from the Wrong Branch</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are standing on <code className="text-slate-100 font-mono">feature</code> and type <code className="text-slate-100 font-mono">git merge main</code>, you merge main into your feature branch rather than the other way around. Always verify active branch with <code className="text-cyan-300 font-mono">git branch --show-current</code>!
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Merging with Dirty Unstaged Files</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Merging while holding uncommitted edits can lead to aborted merges or accidental carry-over confusion. Always run <code className="text-slate-100 font-mono">git stash</code> before merging.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_002 Topic 0 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 0 Frequently Asked Questions & Interview Questions"
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
            <span>Prev Module (002_001 Quiz)</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 1: Fast-Forward Merges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
