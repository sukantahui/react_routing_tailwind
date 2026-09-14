import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
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
  Network,
  ShieldAlert,
  Flame,
  Code2,
  Copy,
  LayoutGrid,
  Monitor
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic 8: Using Graphical and Visual Merge Tools: Configuring git mergetool (VS Code 3-way merge editor, Meld, KDiff3)
 * Module: 002_002_merging-strategies-and-conflict-resolution
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic8() {
  const [selectedTool, setSelectedTool] = useState("vscode"); // "vscode", "meld", "kdiff3"
  const [copied, setCopied] = useState(false);

  // Navigation Logic
  const moduleSlug = "002_002_merging-strategies-and-conflict-resolution";
  const currentIndex = 8;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const toolConfigs = {
    vscode: {
      name: "Visual Studio Code (3-Way Merge Editor)",
      snippet: `git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait --merge "$LOCAL" "$REMOTE" "$BASE" "$MERGED"'
git config --global mergetool.prompt false
git config --global mergetool.keepBackup false`,
      desc: "Built-in 3-way editor with side-by-side panes, diff checkboxes, and live resolution preview."
    },
    meld: {
      name: "Meld (Open Source Multi-Pane Diff GUI)",
      snippet: `git config --global merge.tool meld
git config --global mergetool.meld.cmd 'meld "$LOCAL" "$BASE" "$REMOTE" --output "$MERGED"'
git config --global mergetool.prompt false
git config --global mergetool.keepBackup false`,
      desc: "Lightweight, cross-platform 3-way visual merge tool for Linux, Windows, and macOS."
    },
    kdiff3: {
      name: "KDiff3 (Precision 3-Way Auto Resolver)",
      snippet: `git config --global merge.tool kdiff3
git config --global mergetool.kdiff3.cmd 'kdiff3 "$BASE" "$LOCAL" "$REMOTE" -o "$MERGED"'
git config --global mergetool.prompt false
git config --global mergetool.keepBackup false`,
      desc: "Advanced tool with granular character-level diff highlighting and automated heuristics."
    }
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(toolConfigs[selectedTool].snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* ─── Top Sticky Mini Bar ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-400 truncate">
          <Link
            to={`/${folder}`}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Curriculum
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold truncate">
            {currentModule?.title || "Merging Strategies"}
          </span>
          <span>/</span>
          <span className="text-amber-400 font-mono">Topic-08</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={prevTopicUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition"
          >
            Next <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* ─── Section 1: Header & Badges ─────────────────────────────────── */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              Visual Tooling
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Intermediate • 40 Mins
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              git mergetool
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Using Graphical and Visual Merge Tools
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Accelerating conflict resolution with <code className="text-sky-400 font-mono">git mergetool</code>: configuring VS Code's 3-way merge editor, Meld, and KDiff3, passing <code className="text-amber-400 font-mono">$LOCAL</code>, <code className="text-emerald-400 font-mono">$REMOTE</code>, <code className="text-indigo-400 font-mono">$BASE</code>, and <code className="text-rose-400 font-mono">$MERGED</code> parameters.
          </p>
        </div>

        {/* ─── Section 2: ELI10 Dialogue ──────────────────────────────────── */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/20 to-slate-900 border border-sky-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-sky-900/40 pb-4">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Explain Like I'm 10: The Three-Pane Reading Glass
              </h2>
              <p className="text-xs text-sky-300">
                Swadeep and Sachin explore GUI merge editors with Sukanta Sir at Barrackpore
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Swadeep
              </div>
              <p>
                <strong className="text-amber-300">Swadeep:</strong> "Sukanta Sir! Reading raw text conflict markers in terminal is great for 2 lines, but my GST configuration file has 50 conflicting parameters across 600 lines! My eyes are spinning!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "This is where <code className="text-sky-400 font-mono">git mergetool</code> steps in, Swadeep! Imagine a special desk with three clear reading glass windows: the left window shows Sachin's changes, the right window shows Susmita's changes, the top shows the original ancestor, and the bottom pane shows the final clean document you are writing. You just click checkboxes to choose which lines go into the final document!"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sachin
              </div>
              <p>
                <strong className="text-sky-300">Sachin:</strong> "And when I save and close the visual window, does Git automatically stage the resolved file for me?"
              </p>
            </div>

            <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs">
                Sir
              </div>
              <p>
                <strong className="text-emerald-300">Sukanta Sir:</strong> "Yes! Git handles the file staging and immediately pops open the next conflicted file in queue until all files are 100% resolved."
              </p>
            </div>
          </div>
        </div>

        {/* ─── Section 3: Visual 3-Way Merge Layout Animation ──────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-indigo-400" />
              Anatomy of the 3-Way GUI Merge Editor
            </h2>
            <p className="text-xs text-slate-400">
              How VS Code, Meld, and KDiff3 map the 4 internal variables ($LOCAL, $REMOTE, $BASE, $MERGED)
            </p>
          </div>

          {/* SVG Diagram */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
            <svg
              viewBox="0 0 760 300"
              className="w-full max-w-2xl h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Top Pane: Common Base */}
              <rect x="230" y="15" width="300" height="60" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <text x="380" y="38" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
                COMMON BASE ($BASE)
              </text>
              <text x="380" y="56" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                Stage 1: Ancestor Version (₹1,500/hr)
              </text>

              {/* Connecting arrows */}
              <path d="M 330 75 L 180 105" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
              <path d="M 430 75 L 580 105" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

              {/* Left Pane: Current / Local */}
              <rect x="40" y="105" width="320" height="85" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
              <text x="200" y="130" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                CURRENT / OURS ($LOCAL)
              </text>
              <text x="200" y="150" fill="#bae6fd" fontSize="11" textAnchor="middle">
                Stage 2: main branch (₹2,000/hr)
              </text>
              <text x="200" y="170" fill="#7dd3fc" fontSize="10" textAnchor="middle">
                [✓ Accept Current Change]
              </text>

              {/* Right Pane: Incoming / Remote */}
              <rect x="400" y="105" width="320" height="85" rx="8" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
              <text x="560" y="130" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                INCOMING / THEIRS ($REMOTE)
              </text>
              <text x="560" y="150" fill="#fef3c7" fontSize="11" textAnchor="middle">
                Stage 3: feature branch (₹3,500/hr)
              </text>
              <text x="560" y="170" fill="#fde68a" fontSize="10" textAnchor="middle">
                [✓ Accept Incoming Change]
              </text>

              {/* Convergence Arrows to Result */}
              <path d="M 200 190 L 330 220" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 560 190 L 430 220" stroke="#fbbf24" strokeWidth="2" />

              {/* Bottom Pane: Result */}
              <rect x="40" y="220" width="680" height="65" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="380" y="244" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                RESULT / FINAL OUTPUT ($MERGED)
              </text>
              <text x="380" y="264" fill="#a7f3d0" fontSize="11" textAnchor="middle">
                Working Tree File &rarr; Auto-Staged upon Save &amp; Close &rarr; Final Commit
              </text>
            </svg>
          </div>
        </div>

        {/* ─── Section 4: Interactive Mergetool Configurator ──────────────── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                Interactive Visual Merge Tool Configurator
              </h2>
              <p className="text-xs text-slate-400">
                Select your preferred GUI editor to generate exact global gitconfig setup commands
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {Object.keys(toolConfigs).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTool(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedTool === key
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {key === "vscode" ? "VS Code" : key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {toolConfigs[selectedTool].name}
                </h3>
                <p className="text-xs text-slate-400">
                  {toolConfigs[selectedTool].desc}
                </p>
              </div>
              <button
                onClick={copyConfig}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Commands"}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {toolConfigs[selectedTool].snippet}
            </div>
          </div>
        </div>

        {/* ─── Section 5: Classroom Discussion ────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Users className="w-5 h-5 text-indigo-400" />
            Classroom Discussion at Barrackpore Lab
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-amber-400">Tuhina:</strong> "Sir, after I resolved a merge with VS Code, I found mysterious <code className="text-rose-400 font-mono">.orig</code> files scattered everywhere in my workspace! What are those?"
            </p>
            <p>
              <strong className="text-emerald-400">Sukanta Sir:</strong> "By default, Git saves safety backups before letting an external GUI touch your files. You can safely delete them, and permanently disable them by configuring <code className="text-emerald-300 font-mono">git config --global mergetool.keepBackup false</code>."
            </p>
          </div>
        </div>

        {/* ─── Section 6: Key Takeaways ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Mergetool Advantages
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Eliminates manual typing of marker boundaries.</li>
              <li>Shows live side-by-side diff with syntax highlighting.</li>
              <li>Auto-stages files as soon as they are saved and closed.</li>
              <li>Iterates across multi-file conflicts automatically.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Key Settings to Remember
            </h3>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 font-mono text-xs">
              <li><span className="text-emerald-400">mergetool.prompt false</span> &rarr; No enter prompt</li>
              <li><span className="text-sky-400">mergetool.keepBackup false</span> &rarr; No .orig clutter</li>
              <li><span className="text-indigo-400">code --wait --merge</span> &rarr; Blocks until tab closes</li>
            </ul>
          </div>
        </div>

        {/* ─── Section 7: PlainText Print Notes ────────────────────────────── */}
        <PlainTextPrint
          title="Printable Study Note: Using Graphical and Visual Merge Tools"
          content={noteText}
        />

        {/* ─── Section 8: FAQ Section ─────────────────────────────────────── */}
        <FAQTemplate
          title="Frequently Asked Questions: Graphical Merge Tools"
          questions={questions}
        />

        {/* ─── Section 9: Teacher Bio ─────────────────────────────────────── */}
        <Teacher />

        {/* ─── Section 10: Bottom Navigation Bar ──────────────────────────── */}
        <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to={prevTopicUrl}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous: Step-by-Step Conflict Resolution Workflow
          </Link>
          <Link
            to={nextTopicUrl}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-950/50 text-sm"
          >
            Next: Aborting a Merge Safely (git merge --abort)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
