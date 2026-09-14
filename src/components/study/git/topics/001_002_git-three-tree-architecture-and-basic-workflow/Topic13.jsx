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
  Award,
  GitCommit,
  CheckCircle,
  FileSpreadsheet,
  Rocket
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic 13: Classroom Walkthrough: Sachin, Mahima, and Susmita building an Invoice Management project with atomic commits
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [selectedCommit, setSelectedCommit] = useState(0);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const commits = [
    {
      num: 1,
      author: "Sachin",
      type: "chore",
      title: "chore: initialize repository and configure standard .gitignore",
      file: ".gitignore",
      desc: "Bootstrapped project with production .gitignore preventing node_modules and .env from entering version history.",
      color: "border-slate-700 bg-slate-900"
    },
    {
      num: 2,
      author: "Mahima",
      type: "feat",
      title: "feat(core): scaffold JSON schema definition for invoice data",
      file: "invoice_schema.json",
      desc: "Created formal schema validation for invoice IDs, customer metadata, and line items.",
      color: "border-emerald-500/30 bg-emerald-950/20"
    },
    {
      num: 3,
      author: "Susmita",
      type: "test",
      title: "test(core): create unit test assertions for GST and subtotal math",
      file: "invoice.test.js",
      desc: "Wrote unit tests verifying tax calculations before implementing calculation functions (TDD).",
      color: "border-amber-500/30 bg-amber-950/20"
    },
    {
      num: 4,
      author: "Sachin",
      type: "feat",
      title: "feat(calc): implement subtotal and 18% GST calculation algorithms",
      file: "invoice.js",
      desc: "Implemented clean calculation functions, making test suite pass with green build.",
      color: "border-cyan-500/30 bg-cyan-950/20"
    },
    {
      num: 5,
      author: "Abhronila",
      type: "fix",
      title: "fix(calc): guard against empty arrays and add two-decimal rounding",
      file: "invoice.js",
      desc: "Used patch mode (git add -p) to stage 2-decimal precision fix without committing temporary logs.",
      color: "border-rose-500/30 bg-rose-950/20"
    },
    {
      num: 6,
      author: "Debangshu",
      type: "refactor",
      title: "refactor(calc): modularize festive promotional discount logic",
      file: "discount.js",
      desc: "Extracted coupon calculation into modular helper without modifying core tax algorithm.",
      color: "border-purple-500/30 bg-purple-950/20"
    },
    {
      num: 7,
      author: "Susmita",
      type: "docs",
      title: "docs: add comprehensive project README and verification instructions",
      file: "README.md",
      desc: "Added project architectural documentation and execution commands.",
      color: "border-blue-500/30 bg-blue-950/20"
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
                <span className="text-cyan-400">Topic 13 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Award className="w-8 h-8 text-cyan-400" />
                Classroom Walkthrough: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">Invoice Management Project</code>
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
              <Sparkles className="w-3.5 h-3.5" /> End-to-End Real-World Synthesis
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Collaborative Project Synthesis: The Barrackpore Invoice Engine
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Follow along as our student cohort—Sachin, Mahima, Susmita, Abhronila, and Debangshu—build a 
              complete <strong>GST Invoice Management Engine</strong> from scratch. 
              Witness how every single technique from Module 001_002 comes together: 
              Three-Tree staging, <code className="text-cyan-300 font-mono">git add -p</code> patch curation, 
              strict Conventional Commits, multi-tier exclusions, and green-build atomic commit verification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 7 Atomic Commits
                </h3>
                <p className="text-slate-400 text-xs">
                  Zero mega-commits. Every commit represents a single verifiable engineering milestone.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Multi-Author Teamwork
                </h3>
                <p className="text-slate-400 text-xs">
                  5 students collaborating without a single merge collision or broken intermediate build.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Instant SemVer Release
                </h3>
                <p className="text-slate-400 text-xs">
                  Commit log cleanly enables automatic v1.1.0 release notes and CHANGELOG compilation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE COMMIT TIMELINE EXPLORER ─────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Commit Timeline</h2>
              <p className="text-slate-400 text-sm">Step through each atomic commit to understand its design intent and technical diff</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Commit List Selector */}
            <div className="lg:col-span-5 space-y-2">
              {commits.map((c, idx) => (
                <button
                  key={c.num}
                  onClick={() => setSelectedCommit(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedCommit === idx
                      ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      #{c.num} [{c.type}]
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Author: {c.author}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 truncate">{c.title}</h4>
                </button>
              ))}
            </div>

            {/* Commit Detail Pane */}
            <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  Commit #{commits[selectedCommit].num} Details
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                  File: {commits[selectedCommit].file}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-cyan-300 border border-slate-800">
                {commits[selectedCommit].title}
              </div>

              <div className="text-xs text-slate-300 space-y-2">
                <strong className="text-slate-200 block">Engineering Purpose:</strong>
                <p className="leading-relaxed text-slate-300">{commits[selectedCommit].desc}</p>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/60 text-xs text-slate-400">
                <strong className="text-cyan-300">Author Attribution: </strong>
                {commits[selectedCommit].author} (Coder & AccoTax Student Cohort, Barrackpore)
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: LESSONS LEARNED SUMMARY TABLE ─────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Walkthrough Milestone Synthesis</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-300">
                  <th className="p-3 font-semibold">Step</th>
                  <th className="p-3 font-semibold">Student</th>
                  <th className="p-3 font-semibold">Conventional Type</th>
                  <th className="p-3 font-semibold">Key Technical Technique</th>
                  <th className="p-3 font-semibold">Verification Command</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">1</td>
                  <td className="p-3 font-bold text-slate-200">Sachin</td>
                  <td className="p-3 font-mono text-slate-400">chore</td>
                  <td className="p-3">Initialized .gitignore on Day 1 to block node_modules & .env</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">git status -s --ignored</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">2</td>
                  <td className="p-3 font-bold text-slate-200">Mahima</td>
                  <td className="p-3 font-mono text-emerald-400">feat</td>
                  <td className="p-3">Scaffolded JSON schema model</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">git diff --staged</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">3</td>
                  <td className="p-3 font-bold text-slate-200">Susmita</td>
                  <td className="p-3 font-mono text-amber-400">test</td>
                  <td className="p-3">Wrote unit tests before calculation code (TDD)</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">node invoice.test.js</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">4</td>
                  <td className="p-3 font-bold text-slate-200">Sachin</td>
                  <td className="p-3 font-mono text-cyan-400">feat</td>
                  <td className="p-3">Implemented GST algorithm turning build green</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">node invoice.test.js</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">5</td>
                  <td className="p-3 font-bold text-slate-200">Abhronila</td>
                  <td className="p-3 font-mono text-rose-400">fix</td>
                  <td className="p-3">Used `git add -p` to stage rounding fix without debug logs</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">git diff --staged</td>
                </tr>
                <tr className="hover:bg-slate-800/30 bg-slate-800/10">
                  <td className="p-3 font-mono text-cyan-300 font-bold">6</td>
                  <td className="p-3 font-bold text-slate-200">Debangshu</td>
                  <td className="p-3 font-mono text-purple-400">refactor</td>
                  <td className="p-3">Extracted discount helper without breaking existing tests</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">git log --stat</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-cyan-300 font-bold">7</td>
                  <td className="p-3 font-bold text-slate-200">Susmita</td>
                  <td className="p-3 font-mono text-blue-400">docs</td>
                  <td className="p-3">Updated README with verification instructions</td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">git show HEAD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 5: CLASSROOM MENTORSHIP SUMMARY ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Sukanta Hui Classroom Lab: The Final Debrief</h2>
              <p className="text-slate-400 text-sm">Mentorship insights from the Coder & AccoTax Barrackpore Lab</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
            <p>
              <strong className="text-emerald-400">Sukanta Hui addressed the classroom:</strong>
            </p>
            <blockquote className="border-l-2 border-cyan-500 pl-4 italic text-slate-200">
              "Look at your <code>git log</code> graph right now. Every single commit tells an unambiguous story. 
              If a bug arises in production 6 months from now, any engineer in the world can run <code>git bisect</code>, 
              identify the exact calculation change within 3 seconds, or run <code>git revert</code> on Commit 5 with zero collateral damage. 
              This is the difference between a junior hacker and a world-class professional software engineer."
            </blockquote>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF TEAM COLLABORATION ───────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Team Git Craftsmanship</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Zero Blind Staging</span>
              <p className="text-slate-400">Always run `git status -sb` and `git diff` before adding files.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Test-Driven Assurance</span>
              <p className="text-slate-400">Commit test suites alongside implementation to guarantee self-verifying code.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Isolate Bug Fixes</span>
              <p className="text-slate-400">Use `git add -p` to stage bug fixes without committing debug statements.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Strict Conventional Types</span>
              <p className="text-slate-400">Use `feat`, `fix`, `test`, `refactor`, and `docs` accurately.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Private Sandbox Hygiene</span>
              <p className="text-slate-400">Add local test dumps to `.git/info/exclude` instead of dirtying shared repo.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Green Build Guarantee</span>
              <p className="text-slate-400">Never check in broken code that fails compilation or test runners.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Meaningful Documentation</span>
              <p className="text-slate-400">Conclude features with a clear `docs:` commit updating setup instructions.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic13_files/invoice_project_walkthrough_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to automatically synthesize the entire 7-commit Invoice Management project and run the automated test suite.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic13_files/invoice_project_walkthrough_lab.sh`}</pre>
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
                question: "How do I run the full invoice test suite locally?",
                answer: "Execute `bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic13_files/invoice_project_walkthrough_lab.sh` in your bash shell."
              },
              {
                question: "Why was the unit test suite created before the calculation implementation?",
                answer: "Following Test-Driven Development (TDD) ensures that functional requirements are strictly codified and verified before writing business logic."
              },
              {
                question: "What is the benefit of keeping the discount helper in `discount.js` instead of `invoice.js`?",
                answer: "Separating concerns allows festive or promotional discount policies to change frequently without touching the stable core GST calculation engine."
              },
              {
                question: "Could we have combined commits 2 and 3 into one commit?",
                answer: "While possible, keeping the JSON schema scaffold (feat) separate from the unit test assertions (test) makes each change easier to review and understand independently."
              },
              {
                question: "How does this walkthrough prepare me for production Git workflows?",
                answer: "It mirrors the exact standards mandated by senior engineering teams at leading tech companies worldwide."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 13 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your understanding of the invoice walkthrough workflow, student roles, and engineering milestones.
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
            <span className="text-xs text-slate-400 font-mono">topic13_files/topic13_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic13_invoice_walkthrough_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 12 (Local & Global Exclude)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 14 (Hands-on Terminal Lab) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
