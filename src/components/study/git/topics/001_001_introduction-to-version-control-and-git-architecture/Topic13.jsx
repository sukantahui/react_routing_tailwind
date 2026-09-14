import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  History,
  GitBranch,
  Terminal,
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
  Check,
  Copy,
  Sliders,
  Settings,
  Monitor,
  Laptop
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
 * Topic 13: Hands-on Terminal Lab: Complete environment setup, verification, and default editor configuration
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic13() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedEditor, setSelectedEditor] = useState("vscode");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 13;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const setupSteps = [
    {
      step: "01",
      title: "Set Global Developer Identity",
      command: 'git config --global user.name "Your Full Name"\ngit config --global user.email "your.email@example.com"',
      desc: "Mandatory author signature attached immutably to every commit."
    },
    {
      step: "02",
      title: "Configure Modern Initial Branch",
      command: 'git config --global init.defaultBranch main',
      desc: "Standardizes new repositories to use 'main' as default root branch."
    },
    {
      step: "03",
      title: "Configure Cross-Platform Line Endings",
      command: '# Windows:\ngit config --global core.autocrlf true\n\n# macOS / Linux:\ngit config --global core.autocrlf input',
      desc: "Prevents phantom diffs caused by Windows CRLF vs Unix LF carriage returns."
    },
    {
      step: "04",
      title: "Set Default Code / Text Editor",
      command: selectedEditor === "vscode"
        ? 'git config --global core.editor "code --wait"'
        : selectedEditor === "nano"
        ? 'git config --global core.editor "nano"'
        : 'git config --global core.editor "vim"',
      desc: "Determines which editor opens for interactive commit messages, rebases, and tag edits."
    },
    {
      step: "05",
      title: "Configure High-Productivity Aliases",
      command: 'git config --global alias.st status\ngit config --global alias.br branch\ngit config --global alias.ci commit\ngit config --global alias.lg "log --oneline --graph --all --decorate"',
      desc: "Save thousands of keystrokes with standardized shorthand commands."
    },
    {
      step: "06",
      title: "Run Full Diagnostic Origin Audit",
      command: 'git config --list --show-origin',
      desc: "Verifies that every setting was written to ~/.gitconfig without scope conflicts."
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
                <span className="text-slate-400">Foundation</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 13 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Terminal className="w-8 h-8 text-cyan-400" />
                Hands-on Terminal Lab: Complete Environment Setup
              </h1>
            </div>

            {/* Quick Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </Link>
              <Link
                to={nextTopicUrl}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition shadow-md shadow-cyan-900/30"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3 h-3 text-cyan-400" /> Est. Lab Time: 20 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <Terminal className="w-3 h-3 text-emerald-400" /> 100% Practical Lab
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> Production-Ready Setup
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              <Users className="w-3 h-3 text-purple-400" /> Barrackpore Lab Exercise
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: INTUITIVE REAL-WORLD ANALOGY ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 rounded-2xl border border-cyan-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Terminal className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Calibrating Your Flight Instruments Before Takeoff
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Before a commercial airline pilot taxis onto the runway, they complete a strict pre-flight checklist: altimeters calibrated, radio transponder frequencies matched, navigation waypoints programmed, and hydraulic pressures verified.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As a software engineer, configuring your local Git workstation is your mandatory pre-flight checklist. Missing a single step (such as forgotten line-ending conversions or misconfigured editors) causes turbulence down the line: broken builds on Linux servers, rejected PRs, and phantom merge conflicts. Let's calibrate your environment to enterprise standards!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: STEP-BY-STEP LAB PROTOCOL ─────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Step-by-Step Production Setup Sequence
                </h2>
                <p className="text-slate-400 text-sm">
                  Execute each step in order or copy all commands into your terminal
                </p>
              </div>
            </div>

            {/* Editor Switcher */}
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 px-2">Editor:</span>
              {[
                { id: "vscode", label: "VS Code" },
                { id: "nano", label: "Nano" },
                { id: "vim", label: "Vim" }
              ].map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => setSelectedEditor(ed.id)}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    selectedEditor === ed.id
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {ed.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {setupSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                      STEP {step.step}
                    </span>
                    <button
                      onClick={() => copyToClipboard(step.command, idx)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition"
                      title="Copy Command"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copiedIndex === idx ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>

                  <h3 className="font-bold text-white text-sm sm:text-base">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>

                <pre className="font-mono text-xs text-cyan-300 p-3 bg-slate-950 rounded-xl border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                  {step.command}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: AUTOMATED VERIFICATION SCRIPT ─────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                One-Click Complete Setup Script (Bash / Git Bash)
              </h2>
              <p className="text-slate-400 text-sm">
                Run this complete automated script to configure and verify everything in 5 seconds
              </p>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <pre className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto leading-relaxed">
{`# Paste this into your Git Bash or Linux/macOS Terminal:
git config --global user.name "Sukanta Hui"
git config --global user.email "sukanta.developer@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf true
git config --global core.editor "code --wait"
git config --global color.ui auto
git config --global pull.rebase false
git config --global alias.st status
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --all --decorate"

echo "=== VERIFYING ACTIVE CONFIGURATION ==="
git config --list --show-origin`}
            </pre>
          </div>
        </section>

        {/* ─── SECTION 5: REAL-WORLD FAILURE SCENARIOS & ANTIPATTERNS ───────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Troubleshooting Lab Gotchas & Edge Cases
              </h2>
              <p className="text-slate-400 text-sm">
                Common errors during setup and their immediate solutions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Editor Freezes or Aborts Commit
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If VS Code was configured without <code className="text-cyan-300">--wait</code>, Git immediately sees an empty buffer and aborts with <code className="text-slate-300">Aborting commit due to empty commit message</code>.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: `git config --global core.editor "code --wait"`
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Multiple Conflicting Aliases
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Running config commands with typos can leave multiple stale entries for the same alias key inside <code className="text-slate-300">~/.gitconfig</code>.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: `git config --global --unset-all alias.&lt;name&gt;`
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Quotes in Author Names
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entering single quotes inside double quotes or leaving trailing backslashes can corrupt the author name in commit headers.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: Always verify output with `git config user.name`
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: CLASSROOM MENTORSHIP DIALOGUE ─────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/30 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Classroom Dialogue: Terminal Lab Verification Drill
              </h2>
              <p className="text-slate-400 text-sm">
                Barrackpore Lab: Sachin and Susmita test their active configurations
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Sachin:</span>
              <p className="text-slate-300">
                "Sir, I executed the setup commands, and when I type <code className="text-cyan-300">git lg</code>, it prints a colorful multi-branch ASCII tree of all my commits! It is 10 times faster than typing the whole command!"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Well done, Sachin! Custom aliases like <code className="text-cyan-300">git st</code>, <code className="text-cyan-300">git br</code>, and <code className="text-cyan-300">git lg</code> are standard tools among senior developers. They reduce friction, keep your terminal agile, and let you focus on writing great code."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Susmita:</span>
              <p className="text-slate-300">
                "Sir, when I run <code className="text-cyan-300">git config --list --show-origin</code>, every single line starts with <code className="text-slate-300">file:C:/Users/Susmita/.gitconfig</code>. That means all my global preferences are properly saved in my user profile!"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Spot on, Susmita! You have completed the laboratory with 100% precision. Your development environment is now ready for professional engineering projects."
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: INTERACTIVE TERMINAL PLAYGROUND ────────────────────── */}
        <section className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Interactive Lab Playground: Test Your Aliases
              </h2>
              <p className="text-slate-400 text-sm">
                Try out your freshly configured aliases right in the terminal
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># Test short status alias:</div>
              <div className="text-cyan-300 select-all">$ git st</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># Test branch listing alias:</div>
              <div className="text-cyan-300 select-all">$ git br</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># Test formatted graph log alias:</div>
              <div className="text-cyan-300 select-all">$ git lg</div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: SUKANTA SIR'S 7 DEVELOPER COMMANDMENTS ────────────── */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/40 p-6 sm:p-8 rounded-2xl border border-indigo-900/40 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Sukanta Sir's 7 Commandments of Developer Environment Setup
              </h2>
              <p className="text-slate-400 text-sm">
                Essential hygiene rules for onboarding every developer workstation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Always configure user.name and user.email globally before creating any repository.",
              "Rule 2: Never commit under someone else's email address or an unverified anonymous handle.",
              "Rule 3: Always set init.defaultBranch to 'main' for modern industry compliance.",
              "Rule 4: On Windows, always set core.autocrlf to true to protect Linux/macOS teammates.",
              "Rule 5: Always use '--wait' when configuring external GUI editors like VS Code.",
              "Rule 6: Use meaningful productivity aliases to keep your terminal interactions fast and enjoyable.",
              "Rule 7: Audit your final configuration with '--show-origin' to verify file paths."
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 9: 25-30 COMPREHENSIVE FAQ SECTION ────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Frequently Asked Questions & Exam Prep (25 Questions)
              </h2>
              <p className="text-slate-400 text-sm">
                Practical terminal troubleshooting and configuration questions
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="topic13" />
        </section>

        {/* ─── SECTION 10: PRINTABLE REFERENCE NOTE ──────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Printable ASCII Quick Reference
              </h2>
              <p className="text-slate-400 text-sm">
                Download or copy pure ASCII reference notes for offline revision
              </p>
            </div>
          </div>

          <PlainTextPrint noteText={noteText} fileName="topic13_env_setup_lab_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 12: Classroom Dialogue
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 14: Module 001_001 Self-Assessment Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
