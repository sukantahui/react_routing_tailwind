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
  Play,
  CheckCircle,
  Copy,
  Check,
  RotateCcw,
  Workflow
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic14_files/topic14_questions";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic 14: Hands-on Terminal Lab: Initializing a project, configuring .gitignore, staging chunks with patch mode, and writing conventional commits
 * Module: 001_002_git-three-tree-architecture-and-basic-workflow
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic14() {
  const [activeStep, setActiveStep] = useState(1);
  const [copied, setCopied] = useState(false);

  // Navigation Logic
  const moduleSlug = "001_002_git-three-tree-architecture-and-basic-workflow";
  const currentIndex = 14;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const labPhases = [
    {
      phase: 1,
      name: "Phase 1: Project Initialization & Identity",
      command: `git init -b main pos_engine && cd pos_engine\ngit config user.name "Sukanta Hui Student"\ngit config user.email "student@coderaccotax.com"`,
      objective: "Initialize repository with default 'main' branch and set repository author identity."
    },
    {
      phase: 2,
      name: "Phase 2: Three-Tier Exclusion Hygiene",
      command: `echo "node_modules/\ndist/\n.env\n*.log" > .gitignore\ngit add .gitignore\ngit commit -m "chore: initialize repository with production .gitignore"\n\n# Configure Tier 2 Local Exclude:\necho "scratch_notes.txt" >> .git/info/exclude`,
      objective: "Set up project-wide .gitignore (Tier 1) and private local .git/info/exclude (Tier 2)."
    },
    {
      phase: 3,
      name: "Phase 3: Core Implementation & TDD Test Suite",
      command: `cat << 'EOF' > engine.js\nexport function calcGST(subtotal) { return subtotal * 0.18; }\nEOF\n\ngit add engine.js\ngit commit -m "feat(tax): implement base 18% GST calculation logic"`,
      objective: "Stage and commit base logic adhering to Atomic Commit and Conventional Commit standards."
    },
    {
      phase: 4,
      name: "Phase 4: Surgical Staging with Patch Mode (git add -p)",
      command: `# Add enhancement + temporary debug logs in engine.js\ngit add -p engine.js\n# Press [y] on the calculation enhancement hunk\n# Press [n] on the console.log debug hunk\ngit commit -m "fix(tax): add rounding precision to tax calculation"`,
      objective: "Surgically stage feature code into index while leaving temporary debug statements unstaged."
    },
    {
      phase: 5,
      name: "Phase 5: Discard Working Tree Clutter & Verification",
      command: `git restore engine.js\ngit status -sb\ngit diff --staged\ngit log --oneline --graph --decorate`,
      objective: "Discard unstaged debug clutter using `git restore` and audit pristine commit log graph."
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(labPhases[activeStep - 1].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                <span className="text-cyan-400">Topic 14 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Terminal className="w-8 h-8 text-cyan-400" />
                Hands-on Terminal Lab: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">Full Workflow Lab</code>
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
              <Sparkles className="w-3.5 h-3.5" /> Hands-On Terminal Mastery
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Putting All Module 001_002 Concepts into Muscle Memory
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Theory without terminal muscle memory is quickly forgotten. 
              In this hands-on terminal lab, you will independently execute the complete 5-phase Git workflow: 
              initializing a project with <code className="text-cyan-300 font-mono">git init -b main</code>, 
              configuring multi-tier exclusions, staging granular hunks with <code className="text-cyan-300 font-mono">git add -p</code>, 
              and crafting a pristine commit history using Conventional Commits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-emerald-300 mb-1 flex items-center gap-2">
                  <Play className="w-4 h-4" /> 5 Executable Phases
                </h3>
                <p className="text-slate-400 text-xs">
                  Step-by-step guided CLI execution from init to surgical patch staging.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Full Automation Script
                </h3>
                <p className="text-slate-400 text-xs">
                  Run the companion bash script to verify tests and review the commit graph in seconds.
                </p>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Zero-Error Certification
                </h3>
                <p className="text-slate-400 text-xs">
                  Guarantee your code and history meet the highest professional standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: INTERACTIVE LAB RUNBOOK ──────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Interactive Terminal Runbook</h2>
              <p className="text-slate-400 text-sm">Select a phase to view its terminal commands and learning objectives</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Phase Tabs */}
            <div className="lg:col-span-5 space-y-2">
              {labPhases.map((p) => (
                <button
                  key={p.phase}
                  onClick={() => setActiveStep(p.phase)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    activeStep === p.phase
                      ? "bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10"
                      : "bg-slate-900 border-slate-800 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-300">Phase {p.phase}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Step {p.phase} of 5</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">{p.name}</h4>
                </button>
              ))}
            </div>

            {/* Phase Command Display Box */}
            <div className="lg:col-span-7 bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {labPhases[activeStep - 1].name}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Commands"}
                </button>
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-cyan-300 block mb-1">Phase Objective:</strong>
                <p>{labPhases[activeStep - 1].objective}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto leading-relaxed">
                <pre>{labPhases[activeStep - 1].command}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: LAB VERIFICATION MATRIX ───────────────────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Lab Self-Audit Checklist</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Clean Status Output</span>
              <p className="text-slate-400">`git status -sb` returns `## main` with 'nothing to commit, working tree clean'.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold">2. Conventional Format</span>
              <p className="text-slate-400">Every commit message strictly adheres to `type(scope): description`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-amber-400 font-bold">3. Zero Secret Leaks</span>
              <p className="text-slate-400">`.env` and `node_modules` are successfully ignored by `.gitignore`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-purple-400 font-bold">4. Patch Segregation</span>
              <p className="text-slate-400">Temporary `console.log` debug logs were discarded without entering Git history.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-blue-400 font-bold">5. Local Exclusions Private</span>
              <p className="text-slate-400">Scratch files in `.git/info/exclude` are untracked without dirtying `.gitignore`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-bold">6. Green Tests Guarantee</span>
              <p className="text-slate-400">All unit tests execute and pass at every single commit in history.</p>
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
              <h2 className="text-xl font-bold text-white">Sukanta Hui Mentorship: From Theory to Muscle Memory</h2>
              <p className="text-slate-400 text-sm">Classroom guidance from Coder & AccoTax, Barrackpore</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
            <p>
              <strong className="text-cyan-300">Sukanta Hui's Guidance:</strong>
            </p>
            <p>
              <em>"When you join a tech team, nobody will give you multiple-choice questions. They will watch you type in your terminal. When you initialize a repo cleanly with <code>git init -b main</code>, set up <code>.gitignore</code> before touching code, and curate your commits with <code>git add -p</code>, senior engineers immediately recognize that you have world-class discipline."</em>
            </p>
          </div>
        </section>

        {/* ─── SECTION 6: THE 7 COMMANDMENTS OF TERMINAL MASTERY ────────────── */}
        <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">The 7 Commandments of Terminal Execution</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">1. Default to Main</span>
              <p className="text-slate-400">Initialize with `git init -b main` to avoid outdated 'master' naming.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">2. Pre-Commit Verification</span>
              <p className="text-slate-400">Run `git diff --staged` before every commit command.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">3. Use Intent-to-Add</span>
              <p className="text-slate-400">`git add -N` enables patch staging on brand new untracked files.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">4. Wipe Unwanted Edits</span>
              <p className="text-slate-400">Use `git restore &lt;file&gt;` to discard temporary test clutter.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">5. Review Graph Often</span>
              <p className="text-slate-400">Check `git log --oneline --graph` to verify history cleanliness.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold">6. Alias High-Frequency Tools</span>
              <p className="text-slate-400">Configure `git st` for `git status -sb`.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="font-mono text-cyan-400 font-bold">7. Practice Regularly</span>
              <p className="text-slate-400">Re-run the bash lab script until each command becomes second nature.</p>
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
            <span className="text-xs text-slate-400 font-mono">topic14_files/full_module_workflow_lab.sh</span>
          </div>
          <p className="text-xs text-slate-300">
            Execute this bash lab script to run the full automated 6-phase Module 001_002 verification suite in an isolated sandbox.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
            <pre>{`# Run the lab directly in your bash shell:
bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic14_files/full_module_workflow_lab.sh`}</pre>
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
                question: "How do I run the full terminal lab script?",
                answer: "Execute `bash src/components/study/git/topics/001_002_git-three-tree-architecture-and-basic-workflow/topic14_files/full_module_workflow_lab.sh` in your Git Bash, Linux, or macOS terminal."
              },
              {
                question: "What happens if I make a mistake during the manual interactive lab?",
                answer: "You can unstage files with `git restore --staged <file>`, discard working tree changes with `git restore <file>`, or amend the last commit with `git commit --amend`."
              },
              {
                question: "Can I run this lab on Windows PowerShell?",
                answer: "Yes! While bash syntax is used for multi-line here-docs in the script, the standard Git CLI commands (`git init`, `git add -p`, `git commit`, `git status`) are 100% identical on PowerShell."
              },
              {
                question: "How do I verify that my `.git/info/exclude` is working?",
                answer: "Create the file listed in exclude, then run `git status -s`. It should not appear under untracked files (`??`). Running `git status -s --ignored` will reveal it prefixed with `!!`."
              },
              {
                question: "What should I do after completing this hands-on lab?",
                answer: "Proceed to Topic 15 (Module Self-Assessment Quiz) to certify your complete theoretical and practical mastery of Module 001_002."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: SELF-ASSESSMENT COMPANION QUIZ ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Topic 14 Self-Assessment Quiz ({questions.length} Questions)</h2>
          </div>
          <p className="text-slate-400 text-xs">
            Test your command-line workflow fluency, patch mode shortcuts, and lab execution steps.
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
            <span className="text-xs text-slate-400 font-mono">topic14_files/topic14_note.txt</span>
          </div>
          <PlainTextPrint content={noteText} fileName="topic14_terminal_lab_notes.txt" />
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
            <ArrowLeft className="w-4 h-4" /> Previous: Topic 13 (Classroom Walkthrough)
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors shadow-lg shadow-cyan-600/20"
          >
            Next: Topic 15 (Module 002 Self-Assessment Quiz) <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
