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
  Edit3,
  FilePlus,
  GitCommit
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic 3: Amending the Most Recent Commit: git commit --amend for updating messages or adding forgotten staged files
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [activeTab, setActiveTab] = useState("forgottenFile");

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 3;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const tabs = {
    forgottenFile: {
      title: "Add Forgotten Files",
      badge: "Most Common",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800",
      description: "You committed a feature but forgot to stage the corresponding test file or documentation.",
      command: "git add test/taxCalculator.test.js\ngit commit --amend --no-edit",
      result: "The test file is absorbed into the previous commit. The commit hash changes, but the message stays the same."
    },
    fixMessage: {
      title: "Fix Typo in Commit Message",
      badge: "Quick Polish",
      badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800",
      description: "You typed 'wip fix stuff' or made a spelling error in your Conventional Commit header.",
      command: "git commit --amend -m \"feat(billing): add 18% standard GST calculation helper\"",
      result: "Updates the commit message instantly without altering any code files or opening an editor."
    },
    resetAuthor: {
      title: "Fix Commit Author Identity",
      badge: "Governance",
      badgeColor: "text-purple-400 bg-purple-950/40 border-purple-800",
      description: "You committed under the wrong email address and GitHub contribution graphs aren't linking.",
      command: "git commit --amend --author=\"Sukanta Hui <sukanta@codernaccotax.co.in>\" --no-edit",
      result: "Re-calculates the commit object with your verified name and organization email."
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 3 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Amending Commits: <code className="text-amber-300 font-mono text-lg">git commit --amend</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 2</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-950 transition"
              >
                <span>Topic 4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Edit3 className="w-3 h-3 text-amber-400" /> In-Place Polish
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <GitCommit className="w-3 h-3 text-cyan-400" /> New SHA-1 Hash
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-amber-400" /> 15 Mins Study
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
              Mentor: Sukanta Hui · Barrackpore
            </span>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ─── SECTION 2: DEDICATED SIMPLE LANGUAGE SECTION ────────────────── */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl font-bold">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                In Simple Words (The Unsealed Letter Envelope)
              </h2>
              <p className="text-xs text-slate-400">
                How to add a forgotten photo to your letter before putting it in the mailbox
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                The Letter Envelope Story:
              </h3>
              <p className="text-slate-300">
                Suppose Debangshu in Barrackpore writes a letter to his friend, puts it into an envelope, and seals it. Just before walking to the post office mailbox, he remembers: <em>&quot;Oh no! I forgot to enclose the birthday photograph!&quot;</em>
              </p>
              <p className="text-slate-400 text-xs">
                Since he hasn&apos;t dropped it in the mailbox yet, he opens the envelope, inserts the photograph, grabs a fresh envelope, writes a clean address, and seals it. In Git, <code className="text-amber-300 font-mono">git commit --amend</code> is that fresh envelope!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                Why We Love Amending:
              </h3>
              <p className="text-slate-300">
                Instead of creating an ugly second commit saying <em>&quot;oops, forgot test file&quot;</em>, amending merges the missing work directly into your original commit so your repository history looks pristine and professional!
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-200/90 font-mono">
                &ldquo;Never publish messy draft commits: Amend locally and present clean work!&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION ────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mastering <code className="text-amber-300 font-mono">git commit --amend</code>
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Amending allows developers to refine the single most recent commit (<code className="text-cyan-300 font-mono">HEAD</code>). It creates a new commit object with the updated tree and message, repointing the active branch pointer to this replacement commit.
          </p>

          {/* Interactive Tab Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {Object.keys(tabs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-4 rounded-xl border text-left transition font-mono ${
                  activeTab === key
                    ? "bg-amber-950/40 border-amber-500 text-white shadow-lg shadow-amber-950/40"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{tabs[key].title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${tabs[key].badgeColor}`}>
                    {tabs[key].badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{tabs[key].description}</p>
              </button>
            ))}
          </div>

          {/* Selected Tab Detail Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 mt-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Syntax &amp; Action: {tabs[activeTab].title}
            </h3>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 whitespace-pre-wrap">
              {tabs[activeTab].command}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-400">Result:</strong> {tabs[activeTab].result}
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC VISUAL SVG DIAGRAM ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              DAG Mechanics: How Amend Replaces the Tip Commit
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto shadow-2xl">
            <svg viewBox="0 0 850 260" className="w-full min-w-[700px] h-auto font-mono text-xs">
              <defs>
                <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#f59e0b" />
                </marker>
                <marker id="arrowMuted" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#64748b" />
                </marker>
              </defs>

              {/* Parent Commit C1 */}
              <g>
                <circle cx="120" cy="130" r="32" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="120" y="126" fill="#38bdf8" fontWeight="bold" fontSize="11" textAnchor="middle">C1</text>
                <text x="120" y="142" fill="#94a3b8" fontSize="9" textAnchor="middle">7a4b1c</text>
                <text x="120" y="180" fill="#64748b" fontSize="10" textAnchor="middle">Parent</text>
              </g>

              {/* Old Abandoned Commit C2 (Dangling) */}
              <g>
                <circle cx="360" cy="65" r="32" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="360" y="61" fill="#f87171" fontWeight="bold" fontSize="11" textAnchor="middle">C2 (Old)</text>
                <text x="360" y="77" fill="#94a3b8" fontSize="9" textAnchor="middle">8f9e2d</text>
                <text x="360" y="115" fill="#ef4444" fontSize="9" textAnchor="middle font-bold">Dangling / Orphaned</text>
              </g>

              {/* Pointer from C2 to C1 */}
              <path d="M 328 65 L 152 120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowMuted)" />

              {/* New Amended Commit C2' (Active) */}
              <g>
                <circle cx="360" cy="195" r="34" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="360" y="191" fill="#fbbf24" fontWeight="bold" fontSize="12" textAnchor="middle">C2&apos; (New)</text>
                <text x="360" y="207" fill="#fde68a" fontSize="9" textAnchor="middle">3c4d5e</text>
                <text x="360" y="245" fill="#f59e0b" fontSize="10" textAnchor="middle font-bold">Active Branch Tip</text>
              </g>

              {/* Pointer from C2' to C1 */}
              <path d="M 326 190 L 152 140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />

              {/* Branch Head Pointer Label */}
              <g>
                <rect x="520" y="175" width="160" height="40" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="600" y="195" fill="#fbbf24" fontWeight="bold" fontSize="11" textAnchor="middle">HEAD -&gt; main</text>
                <text x="600" y="208" fill="#94a3b8" fontSize="9" textAnchor="middle">Points to C2&apos;</text>
              </g>
              <path d="M 520 195 L 396 195" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: LIVE TERMINAL DEMONSTRATION ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
              <FileCode className="w-6 h-6" /> Live Terminal Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Git Bash · Amend Workflow
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-medium">debangshu@barrackpore-lab: ~/tax-engine</span>
              </div>
              <span className="text-[11px] text-slate-500">git v2.45+</span>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-slate-300 overflow-x-auto">
              <div>
                <span className="text-slate-500"># 1. Initial commit with a spelling mistake in message</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git commit -m &quot;feat(tax): implemnt standard GST helper&quot;</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-sky-300">[main a1b2c3d] feat(tax): implemnt standard GST helper</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500"># 2. Stage forgotten test file</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git add test/gstHelper.test.js</span>
              </div>

              <div>
                <span className="text-slate-500"># 3. Amend both the code and the message typo simultaneously</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git commit --amend -m &quot;feat(tax): implement standard GST helper&quot;</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-emerald-300">[main f9e8d7c] feat(tax): implement standard GST helper</p>
                  <p className="text-slate-500"> 2 files changed, 45 insertions(+)</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500"># 4. Verify reflog showing old hash replaced by new hash</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git reflog -n 2</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-amber-300">f9e8d7c HEAD@{0}: commit (amend): feat(tax): implement standard GST helper</p>
                  <p className="text-slate-500">a1b2c3d HEAD@{1}: commit: feat(tax): implemnt standard GST helper</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & GOTCHAS ────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Misconceptions &amp; Gotchas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 1
              </div>
              <p className="text-slate-300">
                <em>&quot;Amending edits the commit without changing its hash.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Commit objects are cryptographically immutable. Amending always generates a completely brand new SHA-1 hash.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 2
              </div>
              <p className="text-slate-300">
                <em>&quot;I can amend a commit that I already pushed to main.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Amending a pushed commit creates diverged histories. Pushing will be rejected unless you force-push, which breaks teammates&apos; repos.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Misconception 3
              </div>
              <p className="text-slate-300">
                <em>&quot;git commit --amend includes unstaged edits.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Correct Understanding
              </div>
              <p className="text-slate-400">
                Amending only includes changes that were explicitly staged with <code className="text-cyan-300 font-mono">git add</code>. Unstaged edits remain on disk.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Practice Challenge: The Single-Commit Polish Drill
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create a file <code className="text-cyan-300 font-mono">math.js</code> and commit it with message <code className="text-cyan-300 font-mono">&quot;wip&quot;</code>. Now add <code className="text-cyan-300 font-mono">math.test.js</code>, stage it, and use <code className="text-amber-300 font-mono">git commit --amend -m &quot;feat(math): implement addition helper and tests&quot;</code>. Check <code className="text-cyan-300 font-mono">git log</code> to confirm only 1 pristine commit exists!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Amending Commits & git commit --amend FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git commit --amend Revision Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Revision Note"
          downloadFileName="git_commit_amend_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Principle: Commits are immutable; amending creates a brand new replacement commit. Warning: NEVER amend commits that have already been pushed to shared team branches! Habit: Use '--no-edit' when only adding forgotten files to save time. Motivation: Professional developers always polish their local commits before code review! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev Topic (Unstaging)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 4: Commit Rewriting Risks</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
