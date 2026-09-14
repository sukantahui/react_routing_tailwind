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
  PackageMinus,
  CheckCircle
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
 * Topic 2: Unstaging Staged Changes: Modern git restore --staged <file> vs legacy git reset HEAD <file>
 * Module: 001_004_safely-undoing-changes-and-basic-recovery
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activeStep, setActiveStep] = useState(1);

  // Navigation Logic
  const moduleSlug = "001_004_safely-undoing-changes-and-basic-recovery";
  const currentIndex = 2;
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
                <RotateCcw className="w-4 h-4" />
                <span>Git Module 001_004 &bull; Topic 2 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Unstaging Changes: <code className="text-emerald-400 font-mono text-lg">git restore --staged</code> vs Legacy <code className="text-slate-400 font-mono text-lg">git reset HEAD</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 1</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-950 transition"
              >
                <span>Topic 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <PackageMinus className="w-3 h-3 text-emerald-400" /> Safe Un-Staging
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> 100% Non-Destructive to Disk
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-amber-400" /> 12 Mins Study
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
        <section className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 border border-emerald-500/20 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl font-bold">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">
                In Simple Words (The Shopping Cart Analogy)
              </h2>
              <p className="text-xs text-slate-400">
                How to take items out of your supermarket shopping cart without throwing them in the garbage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                The Supermarket Cart Story:
              </h3>
              <p className="text-slate-300">
                Imagine shopping at a grocery store in Chandan Pukur, Barrackpore. You put 5 items into your <strong>shopping cart</strong> (Staging Index). Before reaching the cash counter (Commit), you realize you picked up an expensive brand of biscuits by mistake.
              </p>
              <p className="text-slate-400 text-xs">
                You don&apos;t smash the biscuit box or throw it away! You simply take it out of your cart and put it back on the shelf. In Git, <code className="text-emerald-300 font-mono">git restore --staged</code> does exactly that: it unloads the item from the commit cart while your code stays safe on disk!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                Why This is 100% Safe:
              </h3>
              <p className="text-slate-300">
                Students often confuse <code className="text-rose-400 font-mono">git restore</code> (which overwrites disk files) with <code className="text-emerald-400 font-mono">git restore --staged</code>. Sukanta Sir reassures: <em>&quot;--staged only alters Git&apos;s internal clipboard. Your written code on disk is never harmed!&quot;</em>
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono">
                &ldquo;Staging is your drafting tray. Edit it, curate it, and unstage with zero fear!&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TOPIC DESCRIPTION ────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Why Unstaging is Critical in Daily Engineering
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Developers frequently run <code className="text-cyan-300 font-mono">git add .</code> out of habit, accidentally staging local environment variables (<code className="text-rose-400 font-mono">.env.local</code>), build binaries, or unrelated debugging statements. Running <code className="text-emerald-400 font-mono">git restore --staged &lt;file&gt;</code> immediately un-stages the unwanted files before you finalize your commit.
          </p>

          {/* Step-by-Step Interactive Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div
              onClick={() => setActiveStep(1)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                activeStep === 1
                  ? "bg-emerald-950/40 border-emerald-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
              }`}
            >
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1">STEP 1: ACCIDENTAL STAGE</div>
              <p className="text-xs text-slate-300">You ran <code className="text-cyan-300 font-mono">git add .</code> and staged 3 files including a private API secret key.</p>
            </div>

            <div
              onClick={() => setActiveStep(2)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                activeStep === 2
                  ? "bg-emerald-950/40 border-emerald-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
              }`}
            >
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1">STEP 2: PRECISION UNSTAGE</div>
              <p className="text-xs text-slate-300">Run <code className="text-emerald-300 font-mono">git restore --staged .env</code> to eject it from the commit cart.</p>
            </div>

            <div
              onClick={() => setActiveStep(3)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                activeStep === 3
                  ? "bg-emerald-950/40 border-emerald-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
              }`}
            >
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1">STEP 3: ATOMIC COMMIT</div>
              <p className="text-xs text-slate-300">Commit clean code safely while your local secrets remain untracked on disk.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: SEMANTIC VISUAL SVG DIAGRAM ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Architecture: How <code className="text-emerald-400 font-mono">--staged</code> Synchronizes Index with HEAD
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto shadow-2xl">
            <svg viewBox="0 0 850 240" className="w-full min-w-[700px] h-auto font-mono text-xs">
              <defs>
                <marker id="arrowEmerald" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
                </marker>
              </defs>

              {/* HEAD Box */}
              <g>
                <rect x="30" y="40" width="220" height="150" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="140" y="70" fill="#38bdf8" fontWeight="bold" fontSize="13" textAnchor="middle">1. HEAD Commit</text>
                <text x="140" y="90" fill="#64748b" fontSize="10" textAnchor="middle">Last Saved Snapshot</text>
                <rect x="50" y="110" width="180" height="45" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="140" y="138" fill="#7dd3fc" fontSize="11" textAnchor="middle">api.js [v1.0]</text>
              </g>

              {/* Sync Arrow from HEAD to Staging Index */}
              <path d="M 250 132 L 340 132" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowEmerald)" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" values="0;18" dur="1.5s" repeatCount="indefinite" />
              </path>
              <text x="295" y="115" fill="#10b981" fontWeight="bold" fontSize="10" textAnchor="middle">git restore</text>
              <text x="295" y="155" fill="#10b981" fontSize="9" textAnchor="middle">--staged api.js</text>

              {/* Staging Index Box */}
              <g>
                <rect x="350" y="40" width="220" height="150" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="460" y="70" fill="#34d399" fontWeight="bold" fontSize="13" textAnchor="middle">2. Staging Index</text>
                <text x="460" y="90" fill="#64748b" fontSize="10" textAnchor="middle">Commit Preparation</text>
                <rect x="370" y="110" width="180" height="45" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="460" y="132" fill="#a7f3d0" fontSize="10" textAnchor="middle">Reset to match HEAD</text>
                <text x="460" y="148" fill="#34d399" fontSize="9" textAnchor="middle font-bold">UNSTAGED CLEANLY</text>
              </g>

              {/* Working Tree Box (Untouched) */}
              <g>
                <rect x="600" y="40" width="220" height="150" rx="12" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="710" y="70" fill="#94a3b8" fontWeight="bold" fontSize="13" textAnchor="middle">3. Working Tree (Disk)</text>
                <text x="710" y="90" fill="#64748b" fontSize="10" textAnchor="middle">Local Editor Files</text>
                <rect x="620" y="110" width="180" height="45" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="710" y="132" fill="#cbd5e1" fontSize="10" textAnchor="middle">api.js [Modified Code]</text>
                <text x="710" y="148" fill="#38bdf8" fontSize="9" textAnchor="middle font-bold">100% UNTOUCHED &amp; SAFE</text>
              </g>
            </svg>
          </div>
        </section>

        {/* ─── SECTION 5: LIVE TERMINAL DEMONSTRATION ──────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center gap-2">
              <FileCode className="w-6 h-6" /> Live Terminal Unstaging Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              Git Bash · Staging Index Drill
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-slate-400 ml-2 font-medium">susmita@barrackpore-lab: ~/ecommerce-app</span>
              </div>
              <span className="text-[11px] text-slate-500">git v2.45+</span>
            </div>

            <div className="p-4 sm:p-5 space-y-4 text-slate-300 overflow-x-auto">
              <div>
                <span className="text-slate-500"># 1. Staged multiple files including a secret file</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git add .</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git status -s</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-emerald-400">M  src/services/paymentService.js</p>
                  <p className="text-emerald-400">A  .env.production</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500"># 2. Unstage .env.production without losing disk edits</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git restore --staged .env.production</span>
              </div>

              <div>
                <span className="text-slate-500"># 3. Verify status: .env.production is now untracked (??)</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-amber-200">git status -s</span>
                <div className="text-slate-400 pl-4 mt-1">
                  <p className="text-emerald-400">M  src/services/paymentService.js  <span className="text-emerald-300 font-bold">(Ready to commit)</span></p>
                  <p className="text-slate-400">?? .env.production                <span className="text-amber-300">(Safe on disk, un-staged!)</span></p>
                </div>
              </div>

              <div>
                <span className="text-slate-500"># 4. Commit clean payment logic</span>
                <br />
                <span className="text-emerald-400 font-bold">$ </span>
                <span className="text-cyan-300">git commit -m &quot;feat(payment): integrate Razorpay checkout gateway&quot;</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: COMMON PITFALLS & GOTCHAS ────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Gotchas &amp; Best Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Pitfall 1
              </div>
              <p className="text-slate-300">
                <em>&quot;Forgetting the --staged flag and typing git restore &lt;file&gt;.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Remedy
              </div>
              <p className="text-slate-400">
                Without <code className="text-emerald-300 font-mono">--staged</code>, Git overwrites your disk file! Always double-check your command flag.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Pitfall 2
              </div>
              <p className="text-slate-300">
                <em>&quot;Thinking unstaging deletes the file from disk.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Remedy
              </div>
              <p className="text-slate-400">
                Unstaging only removes the file from the upcoming commit. Your code remains 100% untouched on disk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Pitfall 3
              </div>
              <p className="text-slate-300">
                <em>&quot;Leaving secrets unstaged without adding them to .gitignore.&quot;</em>
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> Remedy
              </div>
              <p className="text-slate-400">
                After unstaging secret files, immediately append their names to <code className="text-cyan-300 font-mono">.gitignore</code> so they never stage again.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: HINT & PRACTICE CHALLENGE ────────────────────────── */}
        <section className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-800/40 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Practice Challenge: Crafting Two Clean Commits
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Create 3 files: <code className="text-cyan-300 font-mono">featureA.js</code>, <code className="text-cyan-300 font-mono">featureB.js</code>, and <code className="text-cyan-300 font-mono">temp.log</code>. Stage all three with <code className="text-cyan-300 font-mono">git add .</code>. Unstage <code className="text-cyan-300 font-mono">featureB.js</code> and <code className="text-cyan-300 font-mono">temp.log</code> using <code className="text-emerald-300 font-mono">git restore --staged</code>. Commit <code className="text-cyan-300 font-mono">featureA.js</code>, then stage and commit <code className="text-cyan-300 font-mono">featureB.js</code> in a second commit!
          </p>
        </section>

        {/* ─── SECTION 8: FAQ COMPONENT ────────────────────────────────────── */}
        <FAQTemplate
          title="Unstaging & git restore --staged FAQs"
          questions={questions}
        />

        {/* ─── SECTION 9: PLAIN TEXT PRINTABLE NOTE ────────────────────────── */}
        <PlainTextPrint
          content={noteText}
          title="git restore --staged Revision Guide"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Revision Note"
          downloadFileName="git_restore_staged_revision_note.txt"
        />

        {/* ─── SECTION 10: TEACHER'S NOTE ──────────────────────────────────── */}
        <Teacher
          note="Principle: The Staging Area is your personal pre-commit editing tray. Warning: Remember that 'git restore <file>' wipes disk changes, but 'git restore --staged <file>' preserves them! Habit: Use 'git diff --staged' to inspect what you are about to commit. Motivation: Clean commits reflect a clear engineering mind! — Sukanta Hui, Coder & AccoTax"
        />

        {/* ─── SECTION 11: NEXT / PREV NAVIGATION BAR ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 mt-10 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Prev Topic (git restore)</span>
          </Link>

          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950 transition hover:scale-[1.02]"
          >
            <span>Ready for Topic 3: Amending Commits with git commit --amend</span>
            <ArrowRight size={16} />
          </Link>
        </nav>
      </main>
    </div>
  );
}
