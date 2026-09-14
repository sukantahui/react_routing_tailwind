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
  Edit3,
  Palette,
  Compass
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
 * Topic7: Configuring Essential Preferences: core.editor, init.defaultBranch (main vs master), and color.ui
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [editorChoice, setEditorChoice] = useState("vscode");
  const [defaultBranchChoice, setDefaultBranchChoice] = useState("main");
  const [colorUiChoice, setColorUiChoice] = useState("auto");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const hasNext = currentIndex < totalTopics - 1;
  const hasPrev = currentIndex > 0;

  const getEditorCommand = () => {
    switch (editorChoice) {
      case "vscode": return 'git config --global core.editor "code --wait"';
      case "nano": return 'git config --global core.editor "nano"';
      case "vim": return 'git config --global core.editor "vim"';
      case "notepad": return 'git config --global core.editor "notepad"';
      default: return 'git config --global core.editor "code --wait"';
    }
  };

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
            <span className="text-sky-400 font-semibold">Topic 08 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              Productivity &amp; Workflow
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              Essential Preferences
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 20 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Configuring Essential Preferences: Editor, Default Branch &amp; Colors
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Customize your Git developer experience: integrate VS Code as your visual interactive commit editor with <code className="text-sky-300 font-mono">code --wait</code>, standardize your default initial branch to <code className="text-sky-300 font-mono">main</code>, and enable adaptive terminal color syntax.
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
                In Simple Words (Customizing Your Car&apos;s Dashboard)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Tuning your tools so writing code feels effortless and natural
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Buying a new car is great, but before driving, you adjust your seat position, set your side mirrors, and turn on GPS navigation. Configuring <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">core.editor</code>, <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">init.defaultBranch</code>, and <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">color.ui</code> is adjusting your Git driver seat so you never get trapped in an unfamiliar terminal editor.
          </p>
        </section>

        {/* ─── 3. Interactive Configuration Builder ───────────────────── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass size={20} className="text-sky-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Interactive Git Preferences Builder
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Personalize Your Git Config</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Editor Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Edit3 size={14} className="text-sky-400" />
                <span>1. Default Editor (core.editor):</span>
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "vscode", label: "VS Code (code --wait)", badge: "Recommended" },
                  { id: "nano", label: "Nano (Simple Terminal)", badge: "Terminal" },
                  { id: "vim", label: "Vim (Unix Standard)", badge: "Advanced" },
                  { id: "notepad", label: "Windows Notepad", badge: "Simple" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEditorChoice(item.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between border ${
                      editorChoice === item.id
                        ? "bg-sky-950/60 border-sky-500/50 text-sky-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-mono opacity-70">{item.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Default Branch Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <GitBranch size={14} className="text-emerald-400" />
                <span>2. Default Branch Name:</span>
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "main", label: "main", desc: "Universal Modern Standard (GitHub / GitLab)" },
                  { id: "master", label: "master", desc: "Legacy Default (Pre-2020)" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDefaultBranchChoice(item.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition cursor-pointer border ${
                      defaultBranchChoice === item.id
                        ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <p className="font-mono text-sm">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Palette size={14} className="text-purple-400" />
                <span>3. Terminal Colorization:</span>
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "auto", label: "color.ui = auto", desc: "Smart colors for screens, plain for pipes" },
                  { id: "always", label: "color.ui = always", desc: "Force color codes everywhere" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setColorUiChoice(item.id)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold transition cursor-pointer border ${
                      colorUiChoice === item.id
                        ? "bg-purple-950/60 border-purple-500/50 text-purple-200"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <p className="font-mono text-sm">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Config Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
              <span className="text-sky-300 font-bold">Generated Shell Commands:</span>
              <span className="text-slate-500 text-[11px]">Run once globally</span>
            </div>
            <p className="text-sky-300">$ {getEditorCommand()}</p>
            <p className="text-emerald-300">$ git config --global init.defaultBranch {defaultBranchChoice}</p>
            <p className="text-purple-300">$ git config --global color.ui {colorUiChoice}</p>
          </div>
        </section>

        {/* ─── 4. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: The Dreaded Vim Trap
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Swadeep (Student):</span>
              <p>
                &ldquo;Sir, yesterday I typed <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">git commit</code> without a message flag, and my terminal locked up with tilde (<code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">~</code>) symbols everywhere. I couldn&apos;t type or exit and had to close the whole terminal window! What happened?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;Haha! Welcome to the famous <em>&lsquo;How do I exit Vim?&rsquo;</em> rite of passage, Swadeep! When no editor is configured, Git defaults to Vim. If you ever get stuck, type <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold">:q!</code> and press Enter to escape. But to prevent this forever, simply set <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">git config --global core.editor &quot;code --wait&quot;</code>. Now, Git will smoothly open a clean VS Code tab whenever it needs a message!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Essential Git Preferences: Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring core.editor, defaultBranch, color.ui, and productivity aliases"
            questions={questions}
          />
        </section>

        {/* ─── 6. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 08 Study Note: Configuring Essential Preferences"
            downloadFileName="git_topic07_essential_preferences_note.txt"
          />
        </section>

        {/* ─── 7. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Configuring 'code --wait' turns interactive rebasing and merge conflict resolution into a visual pleasure right in VS Code. Warning: Never forget the '--wait' flag when configuring GUI editors—otherwise Git will assume an empty message and abort immediately! Habit: Standardize all your new projects on 'main'. Motivation: A customized, streamlined developer toolkit keeps you in deep flow state while building great software! — Sukanta Hui, Coder & AccoTax"
          />
        </section>

        {/* ─── 8. Next & Previous Navigation ──────────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          {hasPrev ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Previous: Configuring Identity (Topic 7)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Line Endings &amp; CRLF vs LF (Topic 9)</span>
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
