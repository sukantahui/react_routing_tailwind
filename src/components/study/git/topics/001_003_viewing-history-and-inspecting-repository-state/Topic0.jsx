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
  Hash,
  UserCheck,
  Calendar,
  Key
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic 0: Deep Dive into git log: Default output, commit SHA-1 hashes, author vs committer metadata, and timestamps
 * Module: 001_003_viewing-history-and-inspecting-repository-state
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic0() {
  const [selectedCommitPart, setSelectedCommitPart] = useState("sha");

  // Navigation Logic
  const moduleSlug = "001_003_viewing-history-and-inspecting-repository-state";
  const currentIndex = 0;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/001_002_git-three-tree-architecture-and-basic-workflow/15`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const commitFieldDetails = {
    sha: {
      title: "Commit Object Hash (40-hex SHA-1 / SHA-256)",
      syntax: "commit 7b1e4a8c90df1b8943f25c81d3920e872ba18512",
      explanation: "A unique 160-bit cryptographic hash calculated over the commit tree pointer, parent SHA, author identity, committer identity, timestamps, and commit message. In modern Git repositories, SHA-256 (64 hex characters) is also supported.",
      badge: "Cryptographic Integrity",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-300"
    },
    author: {
      title: "Author Metadata (Original Creator)",
      syntax: "Author: Debangshu Developer <debangshu@barrackpore-devs.org>",
      explanation: "The engineer who originally wrote the code changes. Retains original author name, email, and authorship timestamp even if the commit is rebased, cherry-picked, or merged by a maintainer later.",
      badge: "Intellectual Property & Credit",
      color: "border-sky-500/50 bg-sky-950/20 text-sky-300"
    },
    committer: {
      title: "Committer Metadata (Applying Entity)",
      syntax: "Commit: Sukanta Hui <sukanta@barrackpore-devs.org>",
      explanation: "The person or automated bot that applied the commit to the repository (e.g. during git rebase, cherry-pick, git am, or GitHub squash-and-merge). The committer date records the exact moment the commit was committed to the DAG.",
      badge: "Audit & Governance",
      color: "border-purple-500/50 bg-purple-950/20 text-purple-300"
    },
    date: {
      title: "Timestamps (Author Date vs Commit Date)",
      syntax: "Date:   Sun Sep 13 18:30:15 2026 +0530",
      explanation: "Git stores Unix epoch seconds plus timezone offset (e.g. +0530 for IST Kolkata). Two dates exist: GIT_AUTHOR_DATE (when code was written) and GIT_COMMITTER_DATE (when commit was recorded into the repository).",
      badge: "Chronological Forensics",
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-300"
    },
    message: {
      title: "Commit Message (Header + Body)",
      syntax: "feat(tax): implement 18% standard GST calculation helper",
      explanation: "The conventional message describing the intent of the commit. The first line serves as the 50-character summary subject, followed by a blank line and optional detailed technical explanation body.",
      badge: "Intent & Architecture",
      color: "border-cyan-500/50 bg-cyan-950/20 text-cyan-300"
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
                <span>Git Module 001_003 &bull; Topic 0 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Deep Dive into <code className="text-cyan-300 font-mono text-lg">git log</code> &amp; Commit Metadata
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Module</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <span>Next Topic</span>
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
              <span>Production Reality &amp; Forensics Motivation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Understanding <code className="text-cyan-300 font-mono">git log</code> Metadata is a Senior Engineering Superpower
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              In modern distributed engineering teams, source code changes constantly across time zones and microservices. When a financial calculation breaks in production, when a critical security vulnerability surfaces, or when an auditor demands compliance logs, typing <code className="text-cyan-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">git log</code> is your first window into the timeline of truth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <Key className="w-4 h-4" />
                  <span>Cryptographic Lineage</span>
                </div>
                <p className="text-slate-400">
                  Every commit hash is an immutable digest of the state, parent commits, tree SHA, author, and timestamp. You cannot tamper with history without altering the downstream SHA hashes.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Author vs. Committer Split</span>
                </div>
                <p className="text-slate-400">
                  Crucial distinction: The author wrote the code; the committer applied it to the repository. Rebase and cherry-pick preserve original authorship while recording the exact committer.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Dual Timestamp Tracking</span>
                </div>
                <p className="text-slate-400">
                  Git tracks <code className="text-emerald-300 font-mono">AuthorDate</code> (when changes were coded) and <code className="text-emerald-300 font-mono">CommitDate</code> (when merged/rebased), preventing timeline spoofing during audits.
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
                <span>Internal Architecture</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Interactive Anatomy of a Git Commit Entry
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Click any element below to inspect its internal mechanics
            </span>
          </div>

          {/* Interactive Commit Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-mono text-slate-400">
                  <span>Terminal output: <strong className="text-cyan-300">git log -n 1</strong></span>
                  <span className="text-emerald-400">● LIVE INSPECTOR</span>
                </div>

                {/* Clickable Terminal Log Block */}
                <div className="font-mono text-sm space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed select-none">
                  <div
                    onClick={() => setSelectedCommitPart("sha")}
                    className={`p-2 rounded cursor-pointer transition border ${
                      selectedCommitPart === "sha"
                        ? "bg-amber-950/40 border-amber-500 text-amber-200"
                        : "hover:bg-slate-900 border-transparent text-amber-400"
                    }`}
                  >
                    <span className="text-slate-500">commit </span>
                    <span className="font-bold">7b1e4a8c90df1b8943f25c81d3920e872ba18512</span>
                    <span className="text-xs text-slate-400 ml-2">(HEAD -&gt; main)</span>
                  </div>

                  <div
                    onClick={() => setSelectedCommitPart("author")}
                    className={`p-2 rounded cursor-pointer transition border ${
                      selectedCommitPart === "author"
                        ? "bg-sky-950/40 border-sky-500 text-sky-200"
                        : "hover:bg-slate-900 border-transparent text-slate-300"
                    }`}
                  >
                    <span className="text-slate-500">Author: </span>
                    <span className="text-sky-300">Debangshu Technical</span>
                    <span className="text-slate-500"> &lt;debangshu@barrackpore-devs.org&gt;</span>
                  </div>

                  <div
                    onClick={() => setSelectedCommitPart("committer")}
                    className={`p-2 rounded cursor-pointer transition border ${
                      selectedCommitPart === "committer"
                        ? "bg-purple-950/40 border-purple-500 text-purple-200"
                        : "hover:bg-slate-900 border-transparent text-slate-300"
                    }`}
                  >
                    <span className="text-slate-500">Commit: </span>
                    <span className="text-purple-300">Sukanta Hui</span>
                    <span className="text-slate-500"> &lt;sukanta@barrackpore-devs.org&gt;</span>
                    <span className="text-xs text-purple-400 ml-2">[visible with --format=fuller]</span>
                  </div>

                  <div
                    onClick={() => setSelectedCommitPart("date")}
                    className={`p-2 rounded cursor-pointer transition border ${
                      selectedCommitPart === "date"
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-200"
                        : "hover:bg-slate-900 border-transparent text-slate-300"
                    }`}
                  >
                    <span className="text-slate-500">Date:   </span>
                    <span className="text-emerald-300">Sun Sep 13 18:30:15 2026 +0530</span>
                  </div>

                  <div
                    onClick={() => setSelectedCommitPart("message")}
                    className={`p-2 rounded cursor-pointer transition border mt-3 ${
                      selectedCommitPart === "message"
                        ? "bg-cyan-950/40 border-cyan-500 text-cyan-200"
                        : "hover:bg-slate-900 border-transparent text-white"
                    }`}
                  >
                    <div className="font-semibold text-cyan-300 pl-4">
                      feat(tax): implement 18% standard GST calculation helper
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-400 flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Tip: Run <code className="text-cyan-300 font-mono">git log --format=fuller</code> to see both Author and Committer simultaneously.</span>
              </div>
            </div>

            {/* Field Inspector Panel */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Metadata Component Deep Dive
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${commitFieldDetails[selectedCommitPart].color}`}>
                    {commitFieldDetails[selectedCommitPart].badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {commitFieldDetails[selectedCommitPart].title}
                </h3>

                <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-cyan-300 mb-4 border border-slate-800/80 overflow-x-auto">
                  {commitFieldDetails[selectedCommitPart].syntax}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {commitFieldDetails[selectedCommitPart].explanation}
                </p>

                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How Git Encodes This in <code className="text-cyan-300 font-mono">.git/objects/</code></span>
                  </div>
                  <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre leading-5">
{`$ git cat-file -p HEAD
tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
parent 98ca7a4310d298375e89d6e4b9e843e94472f8a1
author Debangshu <debangshu@barrackpore-devs.org> 1789390215 +0530
committer Sukanta Hui <sukanta@barrackpore-devs.org> 1789390215 +0530

feat(tax): implement 18% standard GST calculation helper`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: HIGH-YIELD COMPARISON MATRIX ───────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>Core Distinctions Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Author vs. Committer &amp; Log Inspection Formats
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold text-slate-300 uppercase">
                  <th className="p-4">Dimension</th>
                  <th className="p-4 text-sky-400">Author Metadata</th>
                  <th className="p-4 text-purple-400">Committer Metadata</th>
                  <th className="p-4 text-emerald-400">Production Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-white">Definition</td>
                  <td className="p-4">The programmer who originally coded the patch.</td>
                  <td className="p-4">The person or CI system that applied the patch.</td>
                  <td className="p-4 text-emerald-300">Clear audit trail during code reviews.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-white">Environment Variable</td>
                  <td className="p-4 font-mono text-xs text-sky-300">GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL</td>
                  <td className="p-4 font-mono text-xs text-purple-300">GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL</td>
                  <td className="p-4 text-emerald-300">Can be scripted in automated release tooling.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-white">Rebase / Cherry-pick Behavior</td>
                  <td className="p-4 text-sky-300">Remains completely unchanged.</td>
                  <td className="p-4 text-purple-300">Updates to the person executing the rebase.</td>
                  <td className="p-4 text-emerald-300">Preserves original open-source attribution.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-white">Default Log Visibility</td>
                  <td className="p-4 text-emerald-400">Visible by default in <code className="text-cyan-300 font-mono">git log</code>.</td>
                  <td className="p-4 text-amber-400">Hidden unless using <code className="text-cyan-300 font-mono">--format=fuller</code>.</td>
                  <td className="p-4 text-emerald-300">Always use <code className="text-cyan-300 font-mono">--format=fuller</code> for security audits.</td>
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
            Sukanta Sir Explains Commit Hashes &amp; Metadata to Debangshu &amp; Swadeep
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            {/* Dialogue bubble 1 */}
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Debangshu, Swadeep, when you run <code className="text-cyan-300 font-mono">git log</code> on our Barrackpore billing repo, what do you see at the very top of each commit block?"
                </p>
              </div>
            </div>

            {/* Dialogue bubble 2 */}
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                DT
              </div>
              <div>
                <div className="font-semibold text-amber-300 text-xs mb-1">Debangshu Technical (Student)</div>
                <p className="text-slate-300">
                  "Sir, I see a long 40-character hexadecimal string like <code className="text-amber-300 font-mono">7b1e4a8c90df1b89...</code> followed by the Author name, Date, and Commit message. But why is the hash so long, and can two commits ever have the same hash?"
                </p>
              </div>
            </div>

            {/* Dialogue bubble 3 */}
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Excellent question! That 40-hex string is a SHA-1 hash (160 bits). It is calculated over the entire commit header: the root tree hash, parent commit hashes, your exact author string, the timestamp, and the commit message. Even a single space change in your commit message generates a totally different SHA! The mathematical probability of an accidental SHA-1 collision in a Git repository is less than one in billions of universe lifetimes."
                </p>
              </div>
            </div>

            {/* Dialogue bubble 4 */}
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SS
              </div>
              <div>
                <div className="font-semibold text-purple-300 text-xs mb-1">Swadeep SeniorDev (Student)</div>
                <p className="text-slate-300">
                  "Sir, yesterday Mahima created a commit, but when I merged her pull request using GitHub squash-and-merge or rebase, <code className="text-cyan-300 font-mono">git log</code> showed Mahima as Author, but Swadeep as Committer. Why did Git store two different names?"
                </p>
              </div>
            </div>

            {/* Dialogue bubble 5 */}
            <div className="flex gap-3.5 items-start p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                SH
              </div>
              <div>
                <div className="font-semibold text-cyan-300 text-xs mb-1">Sukanta Hui (Mentor)</div>
                <p className="text-slate-200">
                  "Because Git respects intellectual ownership while recording exact deployment audit trails! Mahima is the <em>Author</em> because she wrote the code lines. You are the <em>Committer</em> because you applied the patch into the master line. Both are preserved in Git's object database forever."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: 7 COMMANDMENTS / PRODUCTION RULES ───────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Best Practices</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The 7 Commandments of Git Log &amp; Commit Metadata
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                num: "1",
                rule: "Always verify identity before committing",
                desc: "Check git config user.name and git config user.email so your commits are attributed accurately in git log.",
                color: "text-amber-400"
              },
              {
                num: "2",
                rule: "Never trust timestamps blindly for forensic audits",
                desc: "Author dates can be manually set or backdated using GIT_AUTHOR_DATE; verify CommitterDate and GPG signatures.",
                color: "text-rose-400"
              },
              {
                num: "3",
                rule: "Use 7-character abbreviated SHAs safely",
                desc: "Git requires at least 4 characters, but 7 hex digits (e.g. 7b1e4a8) are standard for uniqueness in medium repos.",
                color: "text-sky-400"
              },
              {
                num: "4",
                rule: "Use --format=fuller for code auditing",
                desc: "Whenever auditing external PRs, use git log --format=fuller to reveal the actual committer identity.",
                color: "text-purple-400"
              },
              {
                num: "5",
                rule: "Write 50-character concise subject lines",
                desc: "git log tools and GitHub UIs truncate commit subjects longer than 50-72 characters.",
                color: "text-emerald-400"
              },
              {
                num: "6",
                rule: "Inspect raw objects with git cat-file -p",
                desc: "When in doubt about internal pointers, inspect the commit object directly in .git/objects/.",
                color: "text-cyan-400"
              },
              {
                num: "7",
                rule: "Never amend or rebase public published commits",
                desc: "Rewriting commits changes the SHA hash and breaks upstream branches for your entire team.",
                color: "text-red-400"
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
              topic0_files/git_log_deep_dive_lab.sh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Hands-on Terminal Practice: Generating &amp; Inspecting Multi-Author Logs
          </h2>
          <p className="text-slate-300 text-sm">
            Execute this automated lab script in your Git Bash terminal to initialize a sandbox repository, generate commits with simulated authors and committers, and inspect the internal object DAG.
          </p>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto">
            <pre className="text-xs font-mono text-cyan-300 leading-5">
{`# 1. Clone or copy lab script and run:
chmod +x git_log_deep_dive_lab.sh
./git_log_deep_dive_lab.sh

# 2. Key Commands Executed:
git init -b main
git config user.name "Debangshu Technical"
git config user.email "debangshu@barrackpore-devs.org"
git commit -m "feat(core): initial repository setup"

# Overriding Author to simulate team contribution:
GIT_AUTHOR_NAME="Swadeep SeniorDev" \\
GIT_AUTHOR_EMAIL="swadeep@barrackpore-devs.org" \\
git commit --allow-empty -m "docs(api): add Swadeep's architectural signoff"

# Inspecting standard vs fuller format:
git log
git log --format=fuller
git cat-file -p HEAD`}
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
                q: "What is the difference between Author and Committer in git log?",
                a: "The Author is the developer who wrote the original code and crafted the patch. The Committer is the entity (developer, maintainer, or CI tool) that actually committed or applied the patch to the branch. Commands like git rebase or git cherry-pick change the committer while keeping the original author."
              },
              {
                q: "Why are Git commit hashes 40 characters long?",
                a: "Traditional Git uses SHA-1 hashing, which produces a 160-bit checksum represented as 40 hexadecimal characters (0-9, a-f). Modern Git also supports SHA-256 (64 hex characters) for enhanced collision resistance."
              },
              {
                q: "Can I use an abbreviated commit hash instead of all 40 characters?",
                a: "Yes. Git accepts abbreviated hashes (commonly 7 characters, e.g. 7b1e4a8) as long as the prefix is unique within that repository's object database."
              },
              {
                q: "How does Git calculate the commit hash?",
                a: "Git hashes a string header containing: 'commit <size>\\0' + tree hash + parent hash(es) + author (name, email, timestamp) + committer (name, email, timestamp) + commit message. Any modification to any of these fields changes the resulting SHA-1 completely."
              },
              {
                q: "How do I see commits in reverse chronological order or limit the count?",
                a: "By default, git log displays commits in reverse chronological order (newest on top). Use 'git log -n 5' or 'git log -5' to restrict the output to the 5 most recent commits."
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
            Topic 0 Assessment: <code className="text-cyan-300 font-mono">git log</code> Mastery
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of SHA hashes, author/committer semantics, and Git object forensics.
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
          <PlainTextPrint content={noteText} fileName="git_log_deep_dive_notes.txt" />
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
            <span>Prev: Module 001_002 Assessment</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
          >
            <span>Next: Topic 1 – Log Formatting &amp; Graph</span>
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
