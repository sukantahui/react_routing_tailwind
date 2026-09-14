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
  Binary,
  GitPullRequest
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
 * Topic 3: The Merge Commit: Understanding why a merge commit has two (or more) parent commits
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [selectedParent, setSelectedParent] = useState("all");

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 3;
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
                <span>Segment 2: Merging & Conflicts • Module 002_002 • Topic 3 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The Merge Commit: Multi-Parent Object Mechanics & Ancestry
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
              <Binary className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Plumbing Object Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why a Merge Commit Bridges Multiple Ancestral Lineages
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                In standard everyday Git operations, every commit has exactly one parent commit (representing its immediate predecessor). The root commit of a repository has zero parents.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                A <strong>Merge Commit</strong> is structurally unique: its raw commit object inside <code className="text-cyan-300 font-mono">.git/objects/</code> contains <strong>two (or more) parent hashes</strong>. Parent 1 (<code className="text-emerald-400 font-mono">HEAD^1</code>) represents the active branch receiving the merge, and Parent 2 (<code className="text-purple-400 font-mono">HEAD^2</code>) represents the incoming feature branch.
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
              Explain Like I'm 10 (ELI10): The Marriage Certificate with Two Family Signatures
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, senior consultant <strong>Sukanta Hui</strong> explained the dual parentage of a merge commit:
            </p>

            <div className="p-4 bg-slate-950/80 border border-purple-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                "A regular birth certificate lists one direct bloodline. But a marriage certificate officially connects two completely distinct family trees into one combined household."
              </p>
              <p className="text-xs text-purple-300 font-semibold">
                "In Git, a Merge Commit is that marriage certificate: it holds the signature of the Mainline family (Parent 1) and the Feature family (Parent 2). Future generations can trace ancestry back through either parent!"
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-purple-500 pl-3">
              "Sachin noted: 'So that's why git log --first-parent only follows Sachin's main lineage and ignores the feature side branch!' Exactly." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE RAW OBJECT INSPECTOR ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Plumbing Inspector</span>
              <h3 className="text-xl font-bold text-white">Inspect Raw Commit Object (<code className="text-cyan-300 font-mono">git cat-file -p</code>)</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedParent("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedParent === "all"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Full Object
              </button>
              <button
                onClick={() => setSelectedParent("p1")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedParent === "p1"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Parent 1 (HEAD^1)
              </button>
              <button
                onClick={() => setSelectedParent("p2")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                  selectedParent === "p2"
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Parent 2 (HEAD^2)
              </button>
            </div>
          </div>

          {/* Raw Object Terminal Display */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs space-y-2">
            <div className="text-slate-500 pb-1 border-b border-slate-800">
              $ git cat-file -p 5a6b7c8d (Merge Commit Object)
            </div>

            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
              <div><span className="text-slate-500">tree</span> <span className="text-yellow-400">9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b</span></div>
              <div className={selectedParent === "p1" || selectedParent === "all" ? "bg-emerald-950/60 text-emerald-300 px-1 py-0.5 rounded" : "text-slate-400"}>
                <span className="text-slate-500">parent</span> 7a8b9c0d1e2f3456789abcdef0123456789abcde <span className="text-emerald-400 font-sans text-[11px] font-bold">&lt;-- Parent 1 (HEAD / main)</span>
              </div>
              <div className={selectedParent === "p2" || selectedParent === "all" ? "bg-cyan-950/60 text-cyan-300 px-1 py-0.5 rounded" : "text-slate-400"}>
                <span className="text-slate-500">parent</span> 3f4a5b6c7d8e9f0123456789abcdef0123456789 <span className="text-cyan-400 font-sans text-[11px] font-bold">&lt;-- Parent 2 (feature-gst)</span>
              </div>
              <div><span className="text-slate-500">author</span> Sukanta Hui &lt;sukanta@accotax.in&gt; 1726330000 +0530</div>
              <div><span className="text-slate-500">committer</span> Sukanta Hui &lt;sukanta@accotax.in&gt; 1726330000 +0530</div>
              <div className="text-purple-300 pt-2 font-bold">Merge branch 'feature-gst' into main</div>
            </pre>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: Merge Commit Node Pointing Back to Two Parents
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="parent1Arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                  </marker>
                  <marker id="parent2Arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>

                {/* Common Base C1 */}
                <circle cx="150" cy="120" r="18" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="142" y="125" fill="#94a3b8" fontWeight="bold">C1</text>

                {/* Parent 1 (M1) */}
                <path d="M 168 110 L 332 65" stroke="#10b981" strokeWidth="2" />
                <circle cx="350" cy="65" r="22" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                <text x="340" y="70" fill="#a7f3d0" fontWeight="bold">M1</text>
                <text x="310" y="35" fill="#10b981" fontWeight="bold">Parent 1 (HEAD^1)</text>

                {/* Parent 2 (F1) */}
                <path d="M 168 130 L 332 175" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="350" cy="175" r="22" fill="#1e293b" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="340" y="180" fill="#a5f3fc" fontWeight="bold">F1</text>
                <text x="310" y="215" fill="#06b6d4" fontWeight="bold">Parent 2 (HEAD^2)</text>

                {/* Merge Commit M */}
                <circle cx="580" cy="120" r="26" fill="#581c87" stroke="#c084fc" strokeWidth="3" />
                <text x="572" y="125" fill="#f3e8ff" fontWeight="bold" fontSize="14">M</text>

                {/* Arrows from Merge Commit pointing BACK to parents */}
                <path d="M 556 110 L 374 70" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#parent1Arrow)">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </path>

                <path d="M 556 130 L 374 170" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#parent2Arrow)">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </path>

                <text x="630" y="125" fill="#cbd5e1" fontSize="11">
                  Merge Commit M holds pointers to both M1 and F1.
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: RELATIVE ANCESTRY MATRIX ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Navigating Merge Commit Ancestry</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Notation</th>
                  <th className="p-3 font-semibold text-cyan-400">Meaning / Lineage Traversed</th>
                  <th className="p-3 font-semibold">Practical Command</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-emerald-400 font-bold">HEAD^1 (or HEAD~)</td>
                  <td className="p-3 font-sans text-slate-300">First parent commit (mainline receiving branch)</td>
                  <td className="p-3 text-slate-300">git show HEAD^1</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-cyan-400 font-bold">HEAD^2</td>
                  <td className="p-3 font-sans text-slate-300">Second parent commit (incoming feature branch)</td>
                  <td className="p-3 text-slate-300">git show HEAD^2</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-purple-400 font-bold">HEAD~2</td>
                  <td className="p-3 font-sans text-slate-300">Grandparent along first parent line (HEAD^1^1)</td>
                  <td className="p-3 text-slate-300">git diff HEAD~2 HEAD</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 text-amber-400 font-bold">git revert -m 1 &lt;sha&gt;</td>
                  <td className="p-3 font-sans text-slate-300">Reverts merge commit while keeping Parent 1 as mainline</td>
                  <td className="p-3 text-slate-300">git revert -m 1 5a6b7c8d</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL EXAMPLES ──────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Merge Commit Inspection Commands</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Inspect raw object structure</span>
              <p className="text-cyan-400">$ git cat-file -p HEAD</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. View parents directly using plumbing</span>
              <p className="text-cyan-400">$ git rev-parse HEAD^1 HEAD^2</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. View high-level first parent history</span>
              <p className="text-cyan-400">$ git log --first-parent --oneline</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When senior developers ask junior candidates to revert a merge commit in an interview, 90% of candidates fail because `git revert <sha>` errors out. Knowing that a merge commit has two parents and requires `-m 1` immediately demonstrates senior-level version control expertise."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Merge Commit Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Reverting Without the `-m` Parent Flag</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Running <code className="text-slate-100 font-mono">git revert &lt;merge-sha&gt;</code> without `-m 1` fails with `commit is a merge but no -m option was given`.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Confusing `HEAD^2` with `HEAD~2`</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code className="text-slate-100 font-mono">HEAD^2</code> chooses the 2nd parent (the incoming feature branch). <code className="text-slate-100 font-mono">HEAD~2</code> goes 2 steps back along the first-parent lineage.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_002 Topic 3 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 3 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 2: 3-Way Merges & Merge Base</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 4: Preserving Branch Topologies (--no-ff)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
