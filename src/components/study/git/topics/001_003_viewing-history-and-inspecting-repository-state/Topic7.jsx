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
  Database,
  Eye,
  Tag,
  FileText,
  Search,
  Key
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
 * Topic 7: Inspecting Specific Commits with git show: Viewing commit metadata, parents, and patch diff for any commit hash
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic7() {
  const [activeShowMode, setActiveShowMode] = useState("commitPatch");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 7;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/6`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/8`;

  const showModes = {
    commitPatch: {
      title: "1. Specific Commit by SHA / Ref",
      cmd: "git show 7b1e4a8",
      desc: "Inspects a single commit in full: metadata header, conventional message, and complete unified patch.",
      output: [
        "commit 7b1e4a8c90df1b8943f25c81d3920e872ba18512 (HEAD -> main)",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 18:30:15 2026 +0530",
        "",
        "    feat(tax): enable GST processing in app configuration",
        "",
        "diff --git a/app_config.json b/app_config.json",
        "--- a/app_config.json",
        "+++ b/app_config.json",
        "@@ -1,2 +1,2 @@",
        "-{\"appName\": \"AccoTax\", \"version\": \"1.0.0\"}",
        "+{\"appName\": \"AccoTax\", \"version\": \"1.1.0\", \"gstEnabled\": true}"
      ],
      badge: "Targeted Inspection",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    historicalBlob: {
      title: "2. Historical File Dump (git show <SHA>:<path>)",
      cmd: "git show 3a4f891:app_config.json",
      desc: "Dumps the exact whole file contents from an older historical commit without switching branches or modifying workspace files.",
      output: [
        "{\"appName\": \"AccoTax\", \"version\": \"1.0.0\"}"
      ],
      badge: "Time Machine File Read",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    annotatedTag: {
      title: "3. Annotated Tag Inspection",
      cmd: "git show v1.0.0",
      desc: "Inspects tagger identity, signing timestamp, release notes, and the underlying commit target.",
      output: [
        "tag v1.0.0",
        "Tagger: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 17:00:00 2026 +0530",
        "",
        "Release v1.0.0 Milestone for Barrackpore Billing System",
        "-----BEGIN PGP SIGNATURE-----",
        "iQIzBAABCAAdFiEE...",
        "-----END PGP SIGNATURE-----",
        "",
        "commit 3a4f891b2c4e5f6...",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "..."
      ],
      badge: "Release Tag Object",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    statOnly: {
      title: "4. Summary Stats Only (--stat)",
      cmd: "git show --stat 7b1e4a8",
      desc: "Replaces the large unified diff with a clean per-file insertion/deletion summary.",
      output: [
        "commit 7b1e4a8c90df1b8943f25c81d3920e872ba18512 (HEAD -> main)",
        "Author: Sukanta Hui <sukanta@barrackpore-devs.org>",
        "Date:   Mon Sep 14 18:30:15 2026 +0530",
        "",
        "    feat(tax): enable GST processing in app configuration",
        "",
        " app_config.json | 2 +-",
        " 1 file changed, 1 insertion(+), 1 deletion(-)"
      ],
      badge: "Quick File Sizing",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ─── SECTION 1: HEADER & METADATA BADGES ─────────────────────────── */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <History className="w-4 h-4" />
                <span>Git Module 001_003 &bull; Topic 7 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Inspecting Specific Commits with <code className="text-cyan-300 font-mono text-lg">git show</code>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Topic 6: Detailed Diffs</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Topic 8: Comparing with git diff</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: REAL-WORLD MOTIVATION & THE "WHY" ────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-4 h-4" />
              <span>Targeted Object Forensics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The Swiss Army Knife for Examining Individual Git Objects
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              When someone hands you a commit SHA like <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">7b1e4a8</code>, or when you need to inspect an annotated release tag or restore historical file contents without switching branches, <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git show</code> is the single most versatile command in your terminal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <Search className="w-4 h-4" />
                  <span>Single Object Scope</span>
                </div>
                <p className="text-slate-400">
                  Inspects one exact commit without paginating through the entire upstream history stream.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Time Machine File Read</span>
                </div>
                <p className="text-slate-400">
                  Read or restore files from older revisions (<code className="text-emerald-300 font-mono">git show SHA:path</code>) without touching active workspace files.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                  <Tag className="w-4 h-4" />
                  <span>Tag &amp; Signature Audit</span>
                </div>
                <p className="text-slate-400">
                  Inspect annotated tags, release notes, GPG signatures, and target commit trees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: TECHNICAL ARCHITECTURE & INTERACTIVE SIMULATOR ──── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Layers className="w-4 h-4" />
                <span>Interactive Object Inspector</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Simulate git show Object Inspections
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Select an inspection mode to test commands
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(showModes).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveShowMode(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border flex items-center gap-2 ${
                  activeShowMode === key
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* Terminal Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>$ <strong className="text-cyan-300">{showModes[activeShowMode].cmd}</strong></span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold border text-xs ${showModes[activeShowMode].color}`}>
                {showModes[activeShowMode].badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              {showModes[activeShowMode].desc}
            </p>

            {/* Terminal Screen */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm leading-6 overflow-x-auto text-slate-300">
              {showModes[activeShowMode].output.map((line, idx) => (
                <div key={idx} className="hover:bg-slate-900/60 px-2 py-0.5 rounded transition">
                  {line.startsWith("+") && !line.startsWith("+++") ? (
                    <span className="text-emerald-400 font-semibold">{line}</span>
                  ) : line.startsWith("-") && !line.startsWith("---") ? (
                    <span className="text-rose-400 font-semibold">{line}</span>
                  ) : line.startsWith("tag ") || line.startsWith("commit ") ? (
                    <span className="text-amber-300 font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>git show Command Patterns</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Common <code className="text-cyan-300 font-mono">git show</code> Invocation Matrix
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Target Object</th>
                  <th className="p-4 text-cyan-400">Command Syntax</th>
                  <th className="p-4 text-emerald-400">What It Displays</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-amber-300 font-bold">Latest Commit</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git show (or git show HEAD)</td>
                  <td className="p-4">Full metadata, message, and unified diff for HEAD.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-sky-300 font-bold">Historical File Dump</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git show &lt;SHA&gt;:&lt;path&gt;</td>
                  <td className="p-4">Dumps complete file content from that historical snapshot to stdout.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-purple-300 font-bold">Annotated Tag</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git show v1.0.0</td>
                  <td className="p-4">Tagger, timestamp, release message, GPG signature, and target commit.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-pink-300 font-bold">Ancestry Reference</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git show HEAD~2</td>
                  <td className="p-4">Inspects the grandparent commit (2 commits before HEAD).</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-mono text-xs text-emerald-300 font-bold">Stash Entry</td>
                  <td className="p-4 font-mono text-xs text-slate-300">git show stash@&#123;0&#125;</td>
                  <td className="p-4">Displays changes saved in the latest stash.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 5: SUKANTA HUI CLASSROOM MENTORSHIP DIALOGUE ───────── */}
        <section className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>Barrackpore Dev Classroom Mentorship</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Sukanta Sir Mentors Swadeep &amp; Debangshu on Restoring Old Files with git show
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Swadeep, suppose you want to read our original database configuration from commit <code className="text-cyan-300 font-mono">3a4f891</code>, but you don't want to switch branches or overwrite the files in your current working directory. How do you do it?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SS
              </div>
              <div>
                <div className="font-semibold text-purple-300 text-xs mb-1">Swadeep SeniorDev (Student)</div>
                <p className="text-slate-300">
                  "Sir, I run <code className="text-purple-300 font-mono">git show 3a4f891:config/db.json</code>! Git extracts the blob from the object database and prints the entire file directly in my terminal window without touching my active working tree!"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Brilliant! And Debangshu, how can you save that historical version into a new temporary file on disk named <code className="text-cyan-300 font-mono">old_db.json</code>?"
                </p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                DT
              </div>
              <div>
                <div className="font-semibold text-amber-300 text-xs mb-1">Debangshu Technical (Student)</div>
                <p className="text-slate-300">
                  "Just use shell output redirection! <code className="text-amber-300 font-mono">git show 3a4f891:config/db.json &gt; old_db.json</code> saves the historical content cleanly into a local file!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: 7 COMMANDMENTS / PRODUCTION RULES ───────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Production Rules</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The 7 Commandments of git show Inspection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Use git show <SHA>:<path> to read past code",
                desc: "Never check out old commits just to view an older version of a single file.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Use --stat for quick commit overview",
                desc: "git show --stat <SHA> reveals modified files without flooding your terminal with diffs.",
                color: "text-emerald-400"
              },
              {
                num: "3",
                rule: "Use git show to audit release tags",
                desc: "Inspecting tags displays the tagger, signing key, release notes, and tagged commit.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Scope diffs to a specific file with --",
                desc: "git show <SHA> -- path/to/file.js isolates the patch for that exact file in the commit.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Inspect stash entries with git show stash@{0}",
                desc: "Verify what changes you stashed before popping or dropping them.",
                color: "text-cyan-400"
              },
              {
                num: "6",
                rule: "Use -s to suppress diffs completely",
                desc: "git show -s <SHA> outputs only the commit header, author, and description.",
                color: "text-rose-400"
              },
              {
                num: "7",
                rule: "Understand merge commit combined diffs",
                desc: "git show on a merge commit uses diff --cc to show only merge conflict resolutions.",
                color: "text-teal-400"
              }
            ].map((cmd) => (
              <div
                key={cmd.num}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex items-start gap-3.5"
              >
                <div className={`text-xl font-mono font-bold ${cmd.color} shrink-0`}>
                  #{cmd.num}
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{cmd.rule}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{cmd.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 7: AUTOMATED BASH LAB SCRIPT VIEW ──────────────────── */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Automated Bash Terminal Lab</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              topic7_files/git_show_inspection_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Lab: Object Inspection &amp; Historical File Dumps
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script to practice inspecting commit objects, tags, and reading historical file blobs.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Run the lab script:
chmod +x git_show_inspection_lab.sh
./git_show_inspection_lab.sh

# 2. Key Commands Executed:
git show HEAD
git show v1.0.0
git show --stat HEAD
git show HEAD~1:app_config.json`}
            </pre>
          </div>
        </section>

        {/* ─── SECTION 8: FAQ TEMPLATE ────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Developer Clarifications &amp; Edge Cases
          </h2>
          <FAQTemplate
            faqs={[
              {
                q: "How can I view a file from an older commit without changing my working directory?",
                a: "Use 'git show <commit_hash>:<path/to/file>'. Git prints the exact historical file content directly to stdout."
              },
              {
                q: "What does 'git show -s' do?",
                a: "'-s' (or '--no-patch') suppresses the diff output, displaying only the commit metadata, author, date, and commit message."
              },
              {
                q: "Why does git show display a weird diff on merge commits?",
                a: "For 2-parent merge commits, git show uses 'combined diff' (diff --cc) by default, showing only lines modified relative to both parents (conflict resolutions). To see full diff against parent 1, use 'git show -m --first-parent'."
              },
              {
                q: "Can I inspect annotated tags with git show?",
                a: "Yes. 'git show <tagname>' displays the tagger name, date, tag annotation message, GPG signature, and the commit object it references."
              },
              {
                q: "What happens if I run git show on a commit that modified 50 files?",
                a: "Git generates the unified diff for all 50 files and pipes it to your pager. To see just file names and summary lines, use 'git show --stat <commit_hash>'."
              }
            ]}
          />
        </section>

        {/* ─── SECTION 9: QUIZ COMPANION ──────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>Knowledge Verification</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Topic 7 Assessment: Inspecting Specific Commits with <code className="text-cyan-300 font-mono">git show</code>
          </h2>
          <p className="text-slate-400 text-sm">
            Test your command-line expertise on commit inspection, historical blob extraction, tag audits, and ancestry syntax.
          </p>

          <QuizSection questions={questions} />
        </section>

        {/* ─── SECTION 10: PLAIN TEXT PRINT NOTES ─────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <FileCode className="w-4 h-4" />
            <span>Printable Study Notes</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Downloadable Quick Revision Reference
          </h2>
          <PlainTextPrint content={noteText} fileName="git_show_inspection_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER COMPONENT ──────────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BUTTONS ──────────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: Topic 6 – Detailed Diffs &amp; Stats</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 8 – Comparing Revisions with git diff</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}

// ─── QUIZ SECTION COMPONENT ─────────────────────────────────────────────
function QuizSection({ questions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = questions.find((item) => item.id === parseInt(qId, 10));
    return q && q.correctAnswer === optIdx ? acc + 1 : acc;
  }, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
      <div className="space-y-6">
        {questions.slice(0, 5).map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-800/80 bg-slate-950/70 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-cyan-400 font-mono uppercase">
                  Question {idx + 1} of {questions.length}
                </span>
                {showResults && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
                {q.question}
              </h4>

              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  let btnClass = "border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800/70";

                  if (isSelected) {
                    btnClass = "border-cyan-500 bg-cyan-950/40 text-cyan-200";
                  }
                  if (showResults) {
                    if (optIdx === q.correctAnswer) {
                      btnClass = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                    } else if (isSelected && !isCorrect) {
                      btnClass = "border-rose-500 bg-rose-950/50 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${btnClass}`}
                    >
                      <span>{opt}</span>
                      {showResults && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-cyan-300">Technical Explanation:</div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setShowResults(!showResults)}
          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition"
        >
          {showResults ? "Hide Explanations" : "Submit & Check Answers"}
        </button>

        {showResults && (
          <div className="text-sm font-semibold text-slate-200">
            Score: <span className="text-cyan-400">{score}</span> / 5 sample questions shown
          </div>
        )}
      </div>
    </div>
  );
}
