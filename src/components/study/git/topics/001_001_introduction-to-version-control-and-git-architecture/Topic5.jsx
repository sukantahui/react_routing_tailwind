import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  Server,
  Laptop,
  Database,
  RefreshCw,
  Cpu,
  Monitor,
  Apple,
  TerminalSquare
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5: Installing Git on Windows (Git for Windows / Git Bash), macOS (Homebrew / Xcode CLI), and Linux (apt / dnf / pacman)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic5() {
  const [activeOS, setActiveOS] = useState("windows");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 5;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const hasNext = currentIndex < totalTopics - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ─── 1. Header Section ──────────────────────────────────────── */}
        <header className="space-y-4 border-b border-slate-800/80 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              to={`/${folder}/roadmap`}
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <FolderGit2 size={14} className="text-sky-400" />
              <span>Git Mastery Track</span>
            </Link>
            <span>/</span>
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="hover:text-sky-400 transition-colors"
            >
              Module 001_001
            </Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Topic 06 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              Environment Setup
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              Cross-Platform (Win, Mac, Linux)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 20 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Installing Git on Windows, macOS, and Linux
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Set up a clean, production-grade Git environment across any operating system. Learn package manager installations (winget, Homebrew, APT, DNF, Pacman), configure Git Bash, and verify your system PATH for zero-conflict developer productivity.
          </p>
        </header>

        {/* ─── 2. Dedicated Simple Language Section ───────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl font-bold shrink-0 shadow-inner">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300">
                In Simple Words (Installing Your Toolkit)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Getting the Git binary onto your machine so your terminal understands Git commands
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Think of Git like installing a universal language translator in your operating system. Without it, typing <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">git</code> makes your computer say &ldquo;I don&apos;t know what that means.&rdquo; Once installed, every tool—from VS Code to your terminal—speaks version control fluently.
          </p>
        </section>

        {/* ─── 3. Interactive OS Installation Switcher ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Laptop className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Choose Your Operating System
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "windows", label: "Windows (Git Bash / winget)", icon: Monitor },
              { id: "macos", label: "macOS (Homebrew / Xcode)", icon: Apple },
              { id: "linux", label: "Linux (Ubuntu / Fedora / Arch)", icon: TerminalSquare }
            ].map((os) => {
              const Icon = os.icon;
              return (
                <button
                  key={os.id}
                  onClick={() => setActiveOS(os.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 border ${
                    activeOS === os.id
                      ? "bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-950"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{os.label}</span>
                </button>
              );
            })}
          </div>

          {/* OS Installation Content */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            {activeOS === "windows" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
                    <Monitor size={18} />
                    Windows Installation Guide (Git for Windows &amp; Git Bash)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">Recommended for Windows</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <p><strong>Option A: Windows Package Manager (Fastest &amp; Cleanest)</strong></p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300">
                    $ winget install --id Git.Git -e --source winget
                  </div>

                  <p className="pt-2"><strong>Option B: Official Installer Wizard</strong></p>
                  <p className="text-slate-400 text-xs">
                    1. Download from <a href="https://git-scm.com/download/win" target="_blank" rel="noreferrer" className="text-sky-400 underline">git-scm.com/download/win</a>.<br />
                    2. Choose <strong>Git from the command line and 3rd-party software</strong>.<br />
                    3. Choose <strong>Use bundled OpenSSH</strong> and <strong>Git Credential Manager</strong>.<br />
                    4. Select <strong>Checkout Windows-style, commit Unix-style line endings (core.autocrlf true)</strong>.
                  </p>
                </div>
              </div>
            )}

            {activeOS === "macos" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
                    <Apple size={18} />
                    macOS Installation Guide (Homebrew &amp; Xcode)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">Apple Silicon &amp; Intel</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <p><strong>Option A: Homebrew (Recommended for Latest Upstream Git)</strong></p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300">
                    $ brew install git
                  </div>

                  <p className="pt-2"><strong>Option B: Apple Xcode Command Line Tools</strong></p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300">
                    $ xcode-select --install
                  </div>
                </div>
              </div>
            )}

            {activeOS === "linux" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-base font-bold text-sky-400 flex items-center gap-2">
                    <TerminalSquare size={18} />
                    Linux Package Manager Installation
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">All Major Distros</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-slate-200">Debian / Ubuntu / Linux Mint / Pop!_OS:</p>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 mt-1">
                      $ sudo apt update &amp;&amp; sudo apt install git -y
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-200">Fedora / RHEL / CentOS Stream:</p>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 mt-1">
                      $ sudo dnf install git -y
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-200">Arch Linux / Manjaro:</p>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 mt-1">
                      $ sudo pacman -S git
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Post-Installation Verification ──────────────────────── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <h3 className="text-base font-bold text-white">
              3-Step Post-Installation Verification
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">1. Check Version</span>
              <p className="text-slate-300">$ git --version</p>
              <p className="text-slate-500">git version 2.45.1</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">2. Check Binary Path</span>
              <p className="text-slate-300">$ which git</p>
              <p className="text-slate-500">/usr/bin/git</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">3. Check Help Manual</span>
              <p className="text-slate-300">$ git help config</p>
              <p className="text-slate-500">Opens full manual</p>
            </div>
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: Git Bash vs PowerShell
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Tuhina (Student):</span>
              <p>
                &ldquo;Sir, in Windows, can I just run Git commands in standard Command Prompt or PowerShell, or must I open Git Bash?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;You can run basic Git commands in PowerShell, Tuhina! However, as professional software engineers, you will frequently write bash automation scripts, use SSH keys, pipe output through <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">grep</code> and <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">awk</code>, and run Linux server commands. <strong>Git Bash</strong> gives you a 100% genuine POSIX Unix shell right on your Windows laptop. Mastering Git Bash makes you platform-agnostic!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Installing Git: Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring cross-platform package manager installations, PATH resolution, and shell configurations"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 06 Study Note: Installing Git on Windows, macOS, and Linux"
            downloadFileName="git_topic05_installing_git_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Your terminal is your surgical scalpel as a software engineer. Set it up with care and understand your PATH environment. Warning: Never install multiple conflicting Git packages on Windows—stick to official Git for Windows with Git Bash. Habit: Run 'git --version' after every environment upgrade. Motivation: A properly configured developer environment gives you wings to build world-class software! — Sukanta Hui, Coder & AccoTax"
          />
        </section>

        {/* ─── 9. Next & Previous Navigation ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          {hasPrev ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Previous: Core Design Principles (Topic 5)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Configuring Identity (Topic 7)</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              to={`/${folder}/module/${moduleSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-sm hover:bg-emerald-900 transition"
            >
              <span>Module Overview</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </nav>

      </div>
    </div>
  );
}
