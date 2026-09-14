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
  Search,
  FileSearch,
  Sliders,
  FolderTree,
  Eye,
  Settings
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic 10: Inspecting Active Configuration: git config --list --show-origin
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic10() {
  const [selectedScopeView, setSelectedScopeView] = useState("all");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 10;
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
                <Link to={`/${folder}`} className="hover:underline flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5" /> Git Master Roadmap
                </Link>
                <span>/</span>
                <span className="text-slate-400">Foundation</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 10 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <FileSearch className="w-8 h-8 text-cyan-400" />
                Inspecting Active Configuration: <code className="text-cyan-300 font-mono text-xl sm:text-2xl">git config --list --show-origin</code>
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
              <Clock className="w-3 h-3 text-cyan-400" /> Est. Reading Time: 15 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              <Search className="w-3 h-3 text-cyan-400" /> Diagnostics & Auditing
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Core Diagnostic Standard
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              <Users className="w-3 h-3 text-purple-400" /> Sukanta Hui Mentorship
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: INTUITIVE REAL-WORLD ANALOGY ──────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8 rounded-2xl border border-cyan-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <FileSearch className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                The Forensic Detective Analogy: Tracing the Evidence Trail
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Imagine you receive a mysterious corporate package with four delivery tags stamped over one another: one from National Headquarters, one from the Zonal Office in Kolkata, one from the Barrackpore Branch, and a final handwritten sticky note from the desk supervisor. Which delivery address takes precedence, and how do you know who stamped what?
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In Git, settings cascade through <span className="text-cyan-300 font-semibold">System</span>, <span className="text-indigo-300 font-semibold">Global</span>, <span className="text-amber-300 font-semibold">Local</span>, and <span className="text-emerald-300 font-semibold">Worktree</span> files. When a setting behaves unexpectedly—such as your commits carrying your college nickname instead of your official corporate email—running <code className="text-cyan-300 font-mono font-semibold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">git config --list --show-origin</code> acts like a forensic UV light: it stamps the exact absolute filepath right next to each configuration entry so there is zero guesswork!
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TECHNICAL ARCHITECTURE & DEEP DIVE ────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Technical Anatomy: Origin Resolution & Cascade Output
              </h2>
              <p className="text-slate-400 text-sm">
                How Git parses nested configuration files and resolves collision hierarchies
              </p>
            </div>
          </div>

          {/* Interactive Visual Scope Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> Filter Inspection View
              </h3>
              <div className="space-y-2">
                {[
                  { id: "all", label: "All Scopes Combined (--show-origin)", count: "Shows all cascaded keys" },
                  { id: "system", label: "System Origin (/etc/gitconfig)", count: "OS-level global defaults" },
                  { id: "global", label: "Global Origin (~/.gitconfig)", count: "User profile preferences" },
                  { id: "local", label: "Local Origin (.git/config)", count: "Repository specific overrides" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedScopeView(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1 ${
                      selectedScopeView === item.id
                        ? "bg-cyan-950/60 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold text-cyan-300">{item.label}</span>
                    <span className="text-xs text-slate-400">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Output Simulator */}
            <div className="lg:col-span-2 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Live Origin Output Simulation
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Git 2.8+ Engine</span>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto p-4 bg-slate-950 rounded-xl border border-slate-800/80 leading-relaxed">
{selectedScopeView === "all" && (
`$ git config --list --show-origin
file:C:/Program Files/Git/etc/gitconfig  core.symlinks=false
file:C:/Program Files/Git/etc/gitconfig  core.autocrlf=true
file:C:/Users/Sukanta/.gitconfig         user.name=Sukanta Hui
file:C:/Users/Sukanta/.gitconfig         user.email=sukanta@example.com
file:C:/Users/Sukanta/.gitconfig         init.defaultBranch=main
file:C:/Users/Sukanta/.gitconfig         core.editor=code --wait
file:.git/config                         core.repositoryformatversion=0
file:.git/config                         core.filemode=false
file:.git/config                         user.email=sukanta.office@accotax.in  <-- [WINNER (Local Overrides Global)]`
)}
{selectedScopeView === "system" && (
`$ git config --system --list --show-origin
file:C:/Program Files/Git/etc/gitconfig  core.symlinks=false
file:C:/Program Files/Git/etc/gitconfig  core.autocrlf=true
file:C:/Program Files/Git/etc/gitconfig  credential.helper=manager`
)}
{selectedScopeView === "global" && (
`$ git config --global --list --show-origin
file:C:/Users/Sukanta/.gitconfig  user.name=Sukanta Hui
file:C:/Users/Sukanta/.gitconfig  user.email=sukanta@example.com
file:C:/Users/Sukanta/.gitconfig  init.defaultBranch=main
file:C:/Users/Sukanta/.gitconfig  core.editor=code --wait
file:C:/Users/Sukanta/.gitconfig  color.ui=auto`
)}
{selectedScopeView === "local" && (
`$ git config --local --list --show-origin
file:.git/config  core.repositoryformatversion=0
file:.git/config  core.filemode=false
file:.git/config  core.bare=false
file:.git/config  user.email=sukanta.office@accotax.in`
)}
                </pre>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Notice how <code className="text-cyan-300">user.email</code> is defined in both <code className="text-indigo-300">~/.gitconfig</code> and <code className="text-amber-300">.git/config</code>. The local file appears last in the stream and wins precedence!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD KEY COMMANDS MATRIX ─────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                High-Yield Inspection Commands Matrix
              </h2>
              <p className="text-slate-400 text-sm">
                Essential CLI commands every professional Git developer must master
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                cmd: "git config --list --show-origin",
                desc: "Lists all configuration keys across all files with their exact disk path.",
                tag: "Universal Diagnostic"
              },
              {
                cmd: "git config --show-origin user.email",
                desc: "Queries which exact file provides the active 'user.email' setting.",
                tag: "Identity Verification"
              },
              {
                cmd: "git config --show-origin --get-all user.email",
                desc: "Displays every declaration of 'user.email' across system, global, and local files.",
                tag: "Collision Audit"
              },
              {
                cmd: "git config --get-regexp '^core\\.'",
                desc: "Filters and outputs all configuration settings belonging to the 'core' namespace.",
                tag: "Regex Lookup"
              },
              {
                cmd: "git config --global --edit",
                desc: "Directly launches ~/.gitconfig inside your configured default code editor.",
                tag: "Direct Edit"
              },
              {
                cmd: "git config --global --unset <key>",
                desc: "Safely deletes a specific key from the global configuration file.",
                tag: "Clean Removal"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition space-y-2">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-xs sm:text-sm text-cyan-300 font-semibold bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {item.cmd}
                  </code>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 5: REAL-WORLD FAILURE SCENARIOS & CORPORATE ANTIPATTERNS ─ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Real-World Failures & Corporate Antipatterns
              </h2>
              <p className="text-slate-400 text-sm">
                Case studies in misconfigured environments and how origin auditing prevents disasters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> The "Ghost Client Email" Incident
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A freelancer pushed 45 commits to an enterprise client repo using a personal college email (<code className="text-slate-300">gamer99@gmail.com</code>). Because the global config was never checked with <code className="text-cyan-300">--show-origin</code>, CI rejected all PRs for failing automated corporate DCO (Developer Certificate of Origin) checks.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: Set local user.email in .git/config and verify with --show-origin before committing!
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> System-Level Override Confusion
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                An administrator installed Git on a shared lab workstation and set <code className="text-slate-300">core.autocrlf=false</code> at the system level. Windows developers experienced broken bash scripts because they assumed their global setting was taking effect, unaware of the system level conflict.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: Run `git config --list --show-origin` to immediately see system-level entries.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Rogue Key Overriding GPG Signatures
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A developer could not sign commits because a stale <code className="text-slate-300">user.signingkey</code> was lingering in an old local config file from a cloned template repository, overriding their new global YubiKey hardware token configuration.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Fix: `git config --show-origin user.signingkey` pinpoints and clears the old local file.
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
                Classroom Dialogue: Sukanta Sir Mentors Barrackpore Students
              </h2>
              <p className="text-slate-400 text-sm">
                Real conversation from the lab solving configuration conflicts
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Sachin:</span>
              <p className="text-slate-300">
                "Sir, I ran <code className="text-cyan-300">git config --global user.name 'Sachin Sharma'</code>, but when I commit in our team project, the commit log still shows my teammate's name who previously used my laptop. Why is Git ignoring my global setting?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Excellent diagnostic question, Sachin. Remember the Scope Hierarchy we learned in Topic 9: <strong className="text-white">Local scope in .git/config always overrides Global scope in ~/.gitconfig</strong>. If your teammate initialized or cloned that repository, they probably ran a local config command. Type <code className="text-cyan-300">git config --show-origin user.name</code> right now. What does it return?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Sachin:</span>
              <p className="text-slate-300">
                "Aha! It printed <code className="text-amber-300">file:.git/config user.name=Debangshu</code>! The local repo config was pinning Debangshu's name!"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Exactly. To clear it, simply run <code className="text-cyan-300">git config --local --unset user.name</code>. Immediately, Git will fall back to your global setting in <code className="text-indigo-300">~/.gitconfig</code>. That is why <code className="text-cyan-300">--show-origin</code> is the first command every professional runs during environment audits."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Susmita:</span>
              <p className="text-slate-300">
                "Sir, is there any situation where <code className="text-cyan-300">--show-origin</code> shows something other than <code className="text-slate-300">file:</code>?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Yes! If you pass a temporary config via runtime flags, like <code className="text-cyan-300">git -c user.name='Temp' status</code>, Git will label the origin as <code className="text-emerald-400">command line:</code>. Git is completely transparent about every byte of data it reads."
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
                Interactive Hands-on Terminal Playground
              </h2>
              <p className="text-slate-400 text-sm">
                Copy and execute these audit commands in your terminal
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 1. Inspect complete origin list:</div>
              <div className="text-cyan-300 select-all">$ git config --list --show-origin</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 2. Check author email origin specifically:</div>
              <div className="text-cyan-300 select-all">$ git config --show-origin user.email</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 3. View all declarations of email across all scopes:</div>
              <div className="text-cyan-300 select-all">$ git config --show-origin --get-all user.email</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 4. Search all editor settings with regex:</div>
              <div className="text-cyan-300 select-all">$ git config --get-regexp "^core\."</div>
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
                Sukanta Sir's 7 Configuration Commandments
              </h2>
              <p className="text-slate-400 text-sm">
                Golden rules to prevent configuration entropy and commit identity mistakes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Always run 'git config --list --show-origin' before making your very first commit on a new machine.",
              "Rule 2: Never blindly guess why a config setting exists—trace its source with '--show-origin <key>'.",
              "Rule 3: Use '--get-all' when diagnosing duplicate keys causing intermittent workflow behavior.",
              "Rule 4: Never edit system-level gitconfig unless configuring machine-wide policy for shared servers.",
              "Rule 5: Keep personal preferences in ~/.gitconfig and repository constraints in .gitattributes.",
              "Rule 6: Use 'includeIf' conditionals to separate corporate work repos from open-source side projects.",
              "Rule 7: Before reporting a Git bug, always audit active aliases and custom hooks with '--show-origin'."
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
                Comprehensive self-testing questions curated for technical interviews and viva exams
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="topic10" />
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

          <PlainTextPrint noteText={noteText} fileName="topic10_git_config_origin_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 9: Config Scope Hierarchy
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 11: Anatomy of the .git Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
