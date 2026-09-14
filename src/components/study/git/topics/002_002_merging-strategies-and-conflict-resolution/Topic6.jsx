import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
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
  ShieldAlert,
  Flame,
  Code2,
  Copy,
  SplitSquareVertical
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic 6: Anatomy of Conflict Markers: <<<<<<< HEAD (Current Change), ======= (Separator), and >>>>>>> feature (Incoming Change)
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic6() {
  const [styleMode, setStyleMode] = useState("standard"); // "standard" or "diff3"
  const [selectedAction, setSelectedAction] = useState("both"); // "current", "incoming", "both"

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 6;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* ─── Top Sticky Mini Bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <Link
            to={`/${folder}`}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">
            {currentModule?.title || "Merging Strategies"}
          </span>
          <span>/</span>
          <span className="text-amber-400 font-mono">Topic-06</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={prevTopicUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* ─── Section 1: Header & Badges ─────────────────────────────────── */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              Syntax & Markers
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Intermediate • 40 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
              diff3 / zdiff3 Compatible
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Anatomy of Conflict Markers
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Deconstructing the raw syntax injected by Git during merge collisions: understanding <code className="text-sky-400 font-mono">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>, <code className="text-slate-400 font-mono">=======</code>, and <code className="text-amber-400 font-mono">&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch</code>, and unlocking modern 3-way <code className="text-indigo-400 font-mono">zdiff3</code> ancestors.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900 border border-sky-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Explain Like I'm 10: The Tape Flags on the Ledger
              </h2>
              <p className="text-xs text-sky-300">
                Susmita and Mahima learn how to read Git's sticky note markers with Sukanta Sir
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Susmita
              </div>
              <p>
                <strong className="text-indigo-300">Susmita:</strong> "Sir! When Git halted during my merge, it wrote weird arrows and equals signs right inside my JavaScript file! Did Git vandalize my code?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Haha! Think of Git as placing bright neon sticky tape flags on a page of our accounts ledger at Barrackpore. The top flag <code className="text-sky-400 font-mono">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> says: <em>'Here begins the change you had locally.'</em> The fence <code className="text-slate-400 font-mono">=======</code> says: <em>'Border line.'</em> And the bottom flag <code className="text-amber-400 font-mono">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</code> says: <em>'Here ends the incoming change from your colleague.'</em>"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Mahima
              </div>
              <p>
                <strong className="text-rose-300">Mahima:</strong> "So our job as developers is simply to read both suggestions, decide the final correct code, peel off all the neon tape flags, and save the file?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Spot on, Mahima! If you leave even one sticky tape line in your file, Node.js or React will crash with a SyntaxError because <code className="text-rose-400 font-mono">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> is not valid code!"
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Interactive Visual Conflict Marker Explorer ──────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <SplitSquareVertical className="w-5 h-5 text-indigo-400" />
                Interactive Conflict Marker Anatomy Viewer
              </h2>
              <p className="text-xs text-slate-400">
                Compare standard 2-way conflict markers with 3-way zdiff3 ancestor markers
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setStyleMode("standard")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  styleMode === "standard"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Standard (Default)
              </button>
              <button
                onClick={() => setStyleMode("diff3")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  styleMode === "diff3"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                3-Way (zdiff3 with Base)
              </button>
            </div>
          </div>

          {/* Conflict Code Block Display */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs sm:text-sm">
            {/* Header bar */}
            <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>src/billing/taxCalculator.js (Unmerged)</span>
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Conflict Detected
              </span>
            </div>

            <div className="p-4 space-y-1">
              <p className="text-slate-500">// Line 1-12: Standard tax imports</p>
              <p className="text-slate-300">function calculateInvoiceTotal(baseAmount) &#123;</p>

              {/* Start Marker */}
              <div className="bg-sky-950/40 border-l-4 border-sky-400 p-2.5 rounded my-1">
                <div className="text-sky-400 font-bold flex items-center justify-between">
                  <span>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Current Change: Sachin on main)</span>
                  <span className="text-[10px] bg-sky-500/20 px-2 py-0.5 rounded text-sky-300 font-sans">
                    Stage 2 / Ours
                  </span>
                </div>
                <p className="text-sky-200 mt-1 pl-2 font-semibold">
                  const consultationFee = 1200; // Standard Revised Fee (₹1,200)
                </p>
              </div>

              {/* Diff3 Base Section */}
              {styleMode === "diff3" && (
                <div className="bg-slate-800/60 border-l-4 border-slate-400 p-2.5 rounded my-1">
                  <div className="text-slate-300 font-bold flex items-center justify-between">
                    <span>||||||| base (Common Ancestor Merge Base)</span>
                    <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-sans">
                      Stage 1 / Original Base
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1 pl-2 italic">
                    const consultationFee = 500; // Original Initial Baseline (₹500)
                  </p>
                </div>
              )}

              {/* Separator */}
              <div className="py-1 text-slate-500 font-bold text-center border-y border-dashed border-slate-700 bg-slate-900/60 my-1">
                ======= (Dividing Partition)
              </div>

              {/* Incoming Marker */}
              <div className="bg-amber-950/40 border-l-4 border-amber-400 p-2.5 rounded my-1">
                <div className="text-amber-400 font-bold flex items-center justify-between">
                  <span>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/luxury-tax (Incoming Change: Susmita)</span>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-sans">
                    Stage 3 / Theirs
                  </span>
                </div>
                <p className="text-amber-200 mt-1 pl-2 font-semibold">
                  const consultationFee = 2500; // Luxury Tier Fee (₹2,500)
                </p>
              </div>

              <p className="text-slate-300 pl-4">return baseAmount + consultationFee;</p>
              <p className="text-slate-300">&#125;</p>
            </div>
          </div>

          {/* Interactive Resolution Outcome Simulator */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Simulate Resolution in Code:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedAction("current")}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedAction === "current"
                    ? "bg-sky-950/40 border-sky-500/60 text-sky-200"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                  <Check className="w-3.5 h-3.5 text-sky-400" /> Accept Current
                </div>
                <p className="text-[11px] text-slate-400">Keep ₹1,200 fee, discard incoming</p>
              </button>

              <button
                onClick={() => setSelectedAction("incoming")}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedAction === "incoming"
                    ? "bg-amber-950/40 border-amber-500/60 text-amber-200"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                  <Check className="w-3.5 h-3.5 text-amber-400" /> Accept Incoming
                </div>
                <p className="text-[11px] text-slate-400">Keep ₹2,500 fee, overwrite local</p>
              </button>

              <button
                onClick={() => setSelectedAction("both")}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedAction === "both"
                    ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="text-xs font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Smart Union (Best)
                </div>
                <p className="text-[11px] text-slate-400">Synthesize both into tiered logic</p>
              </button>
            </div>

            {/* Resolved Code Preview */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="text-slate-500 mb-2 flex items-center justify-between">
                <span>Final Clean Code (Markers Stripped):</span>
                <span className="text-emerald-400 font-sans font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for git add &amp; git commit
                </span>
              </div>
              {selectedAction === "current" && (
                <p className="text-sky-300">const consultationFee = 1200;</p>
              )}
              {selectedAction === "incoming" && (
                <p className="text-amber-300">const consultationFee = 2500;</p>
              )}
              {selectedAction === "both" && (
                <div className="text-emerald-300 space-y-1">
                  <p>const consultationFee = (isCorporateClient) ? 2500 : 1200;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Section 4: Deep Technical Analysis: Anatomy Breakdown ──────── */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Comprehensive Element-by-Element Breakdown
            </h2>
            <p className="text-sm text-slate-400">
              Exact technical specification of each conflict marker component
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-sky-900/40 space-y-2">
              <div className="text-sky-400 font-mono font-bold text-sm">
                &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
              </div>
              <h3 className="text-xs font-semibold text-white">Opening Delimiter</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seven angle brackets followed by current ref (usually <code className="text-sky-300">HEAD</code>). Contains local branch modifications made by you before initiating the merge.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
              <div className="text-slate-300 font-mono font-bold text-sm">
                =======
              </div>
              <h3 className="text-xs font-semibold text-white">Central Divider</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seven equal signs without any trailing text. Serves as the strict boundary between the two competing code suggestions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-amber-900/40 space-y-2">
              <div className="text-amber-400 font-mono font-bold text-sm">
                &gt;&gt;&gt;&gt;&gt;&gt;&gt; feature
              </div>
              <h3 className="text-xs font-semibold text-white">Closing Delimiter</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seven angle brackets followed by the target branch name or commit hash. Marks the conclusion of the conflicting code chunk.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 5: Why Enable zdiff3? ───────────────────────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg border-b border-slate-800 pb-3">
            <Zap className="w-5 h-5" />
            Why Professional Devs Configure <code className="text-white">merge.conflictStyle = zdiff3</code>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            By default, Git shows only <em>what you have</em> and <em>what they have</em>. You lose all visibility into <em>what it used to be</em>. Enabling <code className="text-emerald-400 font-mono">zdiff3</code> introduces the <code className="text-slate-300 font-mono">||||||| base</code> section, providing immediate clarity:
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <p className="text-slate-500"># Set globally across all your repositories:</p>
            <p className="text-emerald-400">$ git config --global merge.conflictStyle zdiff3</p>
          </div>
        </div>

        {/* ─── Section 6: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Abhronila:</strong> "Sir, what happens if I accidentally leave one &lt;&lt;&lt;&lt;&lt;&lt;&lt; marker in my HTML or JSX file and run npm build?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "Vite/Webpack will immediately fail with a JSX parse error! In JavaScript, <code className="text-rose-400 font-mono">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> is evaluated as multiple bitwise left shifts, crashing your application at runtime. Always search for <code className="text-amber-300 font-mono">git grep '&lt;&lt;&lt;&lt;&lt;&lt;&lt;'</code> before deploying!"
            </p>
          </div>
        </div>

        {/* ─── Section 7: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Golden Rules of Conflict Marker Cleanup
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Delete 100% of marker lines (<code className="text-slate-200">&lt;&lt;&lt;</code>, <code className="text-slate-200">|||</code>, <code className="text-slate-200">===</code>, <code className="text-slate-200">&gt;&gt;&gt;</code>).</li>
              <li>Verify syntax by compiling or running unit test suites.</li>
              <li>Stage cleaned files using <code className="text-slate-200">git add &lt;file&gt;</code>.</li>
              <li>Complete the merge using <code className="text-slate-200">git commit</code>.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Quick Command Reference
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 font-mono text-xs">
              <li><span className="text-emerald-400">git status</span> &rarr; List conflicted files</li>
              <li><span className="text-sky-400">git diff</span> &rarr; Inspect raw conflict markers</li>
              <li><span className="text-rose-400">git merge --abort</span> &rarr; Discard merge &amp; clean</li>
              <li><span className="text-amber-400">git grep '&lt;&lt;&lt;&lt;&lt;&lt;&lt;'</span> &rarr; Find stray markers</li>
            </ul>
          </div>
        </div>

        {/* ─── Section 8: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Anatomy of Conflict Markers"
          content={noteText}
        />

        {/* ─── Section 9: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Conflict Markers"
          questions={questions}
        />

        {/* ─── Section 10: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 11: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: What Causes Merge Conflicts?
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Step-by-Step Conflict Resolution Workflow
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
