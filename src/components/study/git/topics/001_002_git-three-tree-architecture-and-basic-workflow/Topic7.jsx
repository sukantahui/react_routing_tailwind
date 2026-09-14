import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Terminal,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  FolderGit2,
  Zap,
  Users,
  Atom,
  Search,
  RotateCcw,
  CheckCheck,
  Workflow
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic 7: The Philosophy of Atomic Commits: One logical change per commit for bisectability and clean code reviews
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [activePillar, setActivePillar] = useState(0);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const pillars = [
    {
      title: "1. Singularity of Purpose",
      desc: "Every commit addresses exactly ONE issue, feature, or refactor. Never bundle formatting changes with business logic changes.",
      icon: Atom,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20"
    },
    {
      title: "2. Green Build Guarantee",
      desc: "Every individual commit checked into the branch must compile cleanly and pass all automated unit/integration tests on its own.",
      icon: CheckCheck,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20"
    },
    {
      title: "3. Perfect Bisectability",
      desc: "When a regression occurs, `git bisect` can binary-search history and pinpoint the exact 10-line commit responsible in seconds.",
      icon: Search,
      color: "text-amber-400 border-amber-500/30 bg-amber-950/20"
    },
    {
      title: "4. Independent Revertability",
      desc: "You can run `git revert <SHA>` on a faulty commit in production without unintentionally undoing 5 other unrelated features.",
      icon: RotateCcw,
      color: "text-purple-400 border-purple-500/30 bg-purple-950/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Link to={`/${folder}`} className="hover:underline flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5" /> Git Master Roadmap
                </Link>
                <span>/</span>
                <span className="text-slate-400">Module 001_002</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 7 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Atom className="w-8 h-8 text-cyan-400" />
                The Philosophy of Atomic Commits: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">Bisectability & Review</code>
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Prev Topic
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
              >
                Next Topic <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: MOTIVATION & PEDAGOGICAL HOOK ────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> High-Performance Engineering Culture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Elite Engineering Teams Mandate Atomic Commits
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              In physics, an atom is the fundamental building block that cannot be divided without destroying its nature. 
              In Git, an <strong>Atomic Commit</strong> is a single, complete, coherent unit of work. 
              When every commit is atomic, your git log reads like an architectural blueprint, automated tools like 
              <code className="text-cyan-300 font-mono mx-1">git bisect</code> can pinpoint bugs in seconds, and rollbacks in production are instantaneous and safe.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Flawless Bisect
                </h3>
                <p className="text-slate-400 text-xs">
                  Zero noise when tracking down regressions through hundreds of commits.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Painless Reverts
                </h3>
                <p className="text-slate-400 text-xs">
                  Undo a buggy feature without discarding 4 days of unrelated good work.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Joyful Code Reviews
                </h3>
                <p className="text-slate-400 text-xs">
                  Reviewers can follow your logical thought progression commit-by-commit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: THE 4 PILLARS INTERACTIVE VIEWER ─────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">The 4 Pillars of Atomic Commits</h2>
              <p className="text-slate-400 text-sm">Click any pillar to explore its engineering guarantee</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    activePillar === idx
                      ? `${p.color} shadow-lg shadow-cyan-500/10`
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800/60 text-slate-400"
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-3 ${activePillar === idx ? "text-white" : "text-slate-400"}`} />
                  <h3 className="font-bold text-sm text-slate-100 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 4: ANTI-PATTERN VS MASTER PATTERN ──────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The "Mega-Commit" Anti-Pattern vs The Atomic Stream</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Toxic Anti-Pattern */}
            <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-xs">❌ Toxic "Mega-Commit" Anti-Pattern</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">1 Commit</span>
              </div>
              <div className="bg-slate-900 p-3 rounded font-mono text-rose-300">
                git commit -m "Friday updates: fixed tax bug, reformatted 200 files with prettier, redesigned checkout button, updated database migrations"
              </div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 pt-1">
                <li>Impossible to review (2000 lines of whitespace noise hides tax logic).</li>
                <li>`git bisect` fails to isolate the tax bug without digging through formatting changes.</li>
                <li>`git revert` is impossible: reverting the buggy tax fix also reverts the button redesign and database migration!</li>
              </ul>
            </div>

            {/* Atomic Master Pattern */}
            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-xs">✅ Pristine Atomic Commit Stream</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">4 Atomic Commits</span>
              </div>
              <div className="bg-slate-900 p-3 rounded font-mono text-emerald-300 space-y-1">
                <div>1. `style: format codebase using Prettier config`</div>
                <div>2. `db: add tax_exempt boolean column to invoices table`</div>
                <div>3. `fix(tax): resolve 1-paisa rounding error in GST calculation`</div>
                <div>4. `feat(ui): update checkout button styling for high contrast`</div>
              </div>
              <ul className="list-disc list-inside text-slate-400 space-y-1 pt-1">
                <li>Every commit is self-contained and independently testable.</li>
                <li>`git revert` can remove only commit #3 if needed with zero side-effects.</li>
                <li>Reviewers can audit commit #3 in 45 seconds.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP & REAL-WORLD SCENARIO ────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Production Rollback Disaster</h2>
              <p className="text-slate-400 text-sm">Debangshu and Mahima learning the cost of non-atomic commits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> The Incident
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu worked for 3 days on the Barrackpore Supermarket POS system. In a single commit, he added UPI QR payments, changed all receipt font sizes, and updated the inventory sync API.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                When deployed on Saturday, the inventory sync crashed the cashier terminals. Mahima attempted to run <code className="text-cyan-300 font-mono">git revert</code>, but reverting Debangshu's commit also deleted the entire UPI QR payment feature right during peak store hours!
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Sukanta's Diagnosis & Remedy
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sukanta Hui intervened: <em>"Never mix multiple concerns in one commit! If UPI QR payments were in Commit #1 and Inventory Sync was in Commit #2, Mahima could have reverted Commit #2 in 3 seconds, leaving UPI running without interrupting store operations."</em>
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong>Key Takeaway:</strong> Atomicity is your insurance policy for zero-downtime production operations.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF ATOMIC COMMITS ─────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Atomic Craftsmanship</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. One Reason to Change</span>
              <p className="text-slate-400">Single Responsibility Principle applied to version control.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Never Commit Broken Code</span>
              <p className="text-slate-400">Every commit must compile and pass automated tests on its own.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Isolate Formatting</span>
              <p className="text-slate-400">Never combine Prettier/ESLint reformats with business logic changes.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Include Tests with Code</span>
              <p className="text-slate-400">Commit new functions together with their corresponding unit test files.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Ensure Clean Reverts</span>
              <p className="text-slate-400">Ask: "Can this commit be safely reverted tomorrow without collateral damage?"</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Use Patch Mode (git add -p)</span>
              <p className="text-slate-400">Decompose multi-concern files into separate atomic commits.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Interactive Rebase Before PR</span>
              <p className="text-slate-400">Squash messy local checkpoint commits into atomic units before sharing.</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: EXECUTABLE TERMINAL LAB SCRIPT ──────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Hands-On Bash Verification Lab</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic7_files/atomic_commits_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to construct a series of atomic commits (feature, test, refactor) and perform a clean <code className="text-cyan-300 font-mono">git revert</code> on an individual commit.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic7_files/atomic_commits_lab.sh`}</pre>
          </div>
        </section>

        {/* ─── SECTION 8: FAQ ACCORDION ───────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <FAQTemplate
            faqs={[
              {
                question: "Does an atomic commit have to be small in terms of line count?",
                answer: "Not necessarily. Atomicity is about cohesion and single logical purpose. For instance, importing a new 5,000-line third-party SDK or adding 100 country tax tables in one commit is atomic because it represents a single coherent task."
              },
              {
                question: "How does `git bisect` work with atomic commits?",
                answer: "`git bisect` uses a binary search algorithm across commit history. By checking out midpoints and running automated test scripts, Git quickly narrows down the exact commit that introduced a regression."
              },
              {
                question: "What should I do if I made 10 messy 'wip' commits while experimenting?",
                answer: "Run `git rebase -i HEAD~10` before opening your pull request. You can squash, reorder, and re-word your commits into 2 or 3 clean atomic commits."
              },
              {
                question: "Why shouldn't I squash an entire 2-week feature branch into 1 commit upon merge?",
                answer: "If the feature branch contained multiple distinct subsystems (e.g. backend DB, frontend UI, email notification worker), squashing everything into 1 commit prevents selective reverting or cherry-picking of sub-features later."
              },
              {
                question: "Can I cherry-pick an atomic commit into an older release branch?",
                answer: "Yes! Because an atomic commit is self-contained and does not depend on unrelated changes, running `git cherry-pick <SHA>` ports the hotfix with minimal risk of merge conflicts."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 7 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of atomic commit principles, bisectability, revert safety, and review workflows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.slice(0, 6).map((q) => (
              <div key={q.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-400">Q{q.id}:</span>
                  <span className="text-xs font-medium text-slate-200">{q.question}</span>
                </div>
                <div className="text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-500/20 mt-2">
                  <strong>Correct:</strong> {q.options[q.correctAnswer]}
                  <p className="text-slate-400 text-[11px] mt-1">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT & NOTE EXPORT ─────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Printable Reference Note</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">topic7_files/topic7_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic7_atomic_commits_notes.txt" />
        </section>

        {/* ─── SECTION 11: EDUCATOR PROFILE CARD ──────────────────────────── */}
        <section className="pt-6 border-t border-slate-800">
          <Teacher />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-6 border-t border-slate-800 text-sm">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 6 (Creating Commits)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 8 (Conventional Commits Specification) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
