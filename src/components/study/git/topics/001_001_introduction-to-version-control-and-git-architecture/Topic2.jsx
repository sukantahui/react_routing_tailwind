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
  Wifi,
  WifiOff
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2: Centralized vs Distributed VCS: Single point of failure, offline working capability, and branching performance
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic2() {
  const [activeBenchmark, setActiveBenchmark] = useState("branch");
  const [networkState, setNetworkState] = useState("disconnected");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 2;
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
            <span className="text-sky-400 font-semibold">Topic 03 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              Architecture &amp; Resilience
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              CVCS vs DVCS Deep Dive
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Centralized vs Distributed VCS: SPOF, Offline Power &amp; Branching Performance
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Deconstruct the architectural trade-offs between Centralized VCS (SVN, CVS, Perforce) and Distributed VCS (Git, Mercurial). Examine why eliminating Single Points of Failure, enabling offline autonomy, and reducing branch creation to 41-byte pointer operations redefined developer productivity.
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
                In Simple Words (The Cloud Photo Storage vs Local Camera Memory)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A plain English comparison to visualize why distributed architecture is indestructible
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed text-slate-300">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3">
              <h3 className="font-semibold text-amber-300 flex items-center gap-2 text-base">
                <Server size={18} />
                Centralized VCS (Live Cloud Camera):
              </h3>
              <p>
                Imagine a digital camera that <strong>has no local memory card</strong>. Every time you snap a photo, it must immediately upload to a remote central server over 4G/Wi-Fi.
              </p>
              <p className="text-slate-400 text-xs">
                If you enter a tunnel or go into an airplane with no internet, you cannot take a single picture. If the cloud server crashes, all the photos you took yesterday are lost forever.
              </p>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-xs font-mono text-amber-200">
                SVN / CVS = No network means no commits!
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-3">
              <h3 className="font-semibold text-sky-300 flex items-center gap-2 text-base">
                <Database size={18} />
                Distributed VCS (Smart Local Camera):
              </h3>
              <p>
                Now imagine a camera with a massive <strong>internal high-speed SSD</strong>. You snap 1,000 photos, edit filters, organize photo albums, and tag friends inside an airplane or in remote Barrackpore countryside.
              </p>
              <p className="text-slate-400 text-xs">
                When you finally connect to Wi-Fi later, your camera syncs its new albums to Google Drive or iCloud in seconds. Every friend who synced has an exact backup of the entire photo history.
              </p>
              <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-200">
                Git = Full local power + asynchronous cloud backup!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. The 3 Architectural Pillars ─────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Three Foundational Differences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-white">Single Point of Failure</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Centralized VCS (SVN/CVS), the central server is a fatal single point of failure. If the server&apos;s disk is destroyed, historical versions are gone. In Git, every clone is an autonomous, hot-standby replica.
              </p>
              <div className="text-[11px] font-mono text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-800/30">
                Git: Zero risk of permanent history loss
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-white">Offline Autonomy</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                SVN requires an active network handshake for commits, diffs, and branch switches. Git executes 100% of operations against your local `.git` object database with sub-millisecond SSD latency.
              </p>
              <div className="text-[11px] font-mono text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-800/30">
                Git: Full productivity during flights &amp; outages
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-white">Branching Performance</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                SVN branches are directory copies on the server that take seconds to minutes. In Git, a branch is a 41-byte text pointer file in `.git/refs/heads/`. Creation takes ~0.001 seconds.
              </p>
              <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
                Git: Disposable, instant 41-byte branches
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Interactive Benchmark Comparison ────────────────────── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu size={20} className="text-sky-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Live Architectural Benchmark Simulator
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Execution Speed Benchmark</span>
          </div>

          <p className="text-sm text-slate-300">
            Compare execution mechanics, disk IO, and network round-trips for everyday version control operations between Subversion (SVN) and Git.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "branch", label: "Create Branch" },
              { id: "commit", label: "Commit Snapshot" },
              { id: "log", label: "View History (Log)" },
              { id: "diff", label: "Diff with Yesterday" }
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBenchmark(b.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                  activeBenchmark === b.id
                    ? "bg-sky-600 border-sky-400 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Benchmark Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SVN Side */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-amber-300 font-bold border-b border-slate-800 pb-1.5">
                <span>Subversion (Centralized VCS)</span>
                <span>🐢 Slow (Network Dependent)</span>
              </div>
              {activeBenchmark === "branch" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ svn copy ^/trunk ^/branches/feature-x -m &quot;create branch&quot;</p>
                  <p className="text-amber-400">• Makes HTTPS network call to central server</p>
                  <p className="text-amber-400">• Copies directory structure on server disk</p>
                  <p className="text-slate-400">• Execution Time: <strong>~5.0 to 15.0 seconds</strong></p>
                  <p className="text-rose-400 font-bold">• Requires live server connection</p>
                </div>
              )}
              {activeBenchmark === "commit" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ svn commit -m &quot;fix: typo&quot;</p>
                  <p className="text-amber-400">• Transmits full file delta across WAN</p>
                  <p className="text-amber-400">• Server locks database and increments revision number</p>
                  <p className="text-slate-400">• Execution Time: <strong>~2.0 to 6.0 seconds</strong></p>
                </div>
              )}
              {activeBenchmark === "log" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ svn log -r 1000:1050</p>
                  <p className="text-amber-400">• Streams commit messages across network</p>
                  <p className="text-slate-400">• Execution Time: <strong>~3.0 to 8.0 seconds</strong></p>
                </div>
              )}
              {activeBenchmark === "diff" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ svn diff -r 1000:HEAD</p>
                  <p className="text-amber-400">• Queries server to reconstruct historical files</p>
                  <p className="text-slate-400">• Execution Time: <strong>~4.0 to 10.0 seconds</strong></p>
                </div>
              )}
            </div>

            {/* Git Side */}
            <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-sky-300 font-bold border-b border-slate-800 pb-1.5">
                <span>Git (Distributed VCS)</span>
                <span>⚡ Instantaneous (Local SSD)</span>
              </div>
              {activeBenchmark === "branch" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ git branch feature-x</p>
                  <p className="text-emerald-400">• Writes 41 bytes to .git/refs/heads/feature-x</p>
                  <p className="text-emerald-400">• Zero network calls, zero server load</p>
                  <p className="text-slate-200 font-bold">• Execution Time: <strong>~0.001 seconds (sub-millisecond)</strong></p>
                  <p className="text-emerald-400">✓ 100% Offline Capable</p>
                </div>
              )}
              {activeBenchmark === "commit" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ git commit -m &quot;fix: typo&quot;</p>
                  <p className="text-emerald-400">• Computes SHA-1 hash and writes compressed blob/tree</p>
                  <p className="text-emerald-400">• Updates branch pointer locally</p>
                  <p className="text-slate-200 font-bold">• Execution Time: <strong>~0.010 seconds</strong></p>
                </div>
              )}
              {activeBenchmark === "log" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ git log --oneline -n 50</p>
                  <p className="text-emerald-400">• Traverses commit DAG directly from local memory</p>
                  <p className="text-slate-200 font-bold">• Execution Time: <strong>~0.005 seconds</strong></p>
                </div>
              )}
              {activeBenchmark === "diff" && (
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">$ git diff HEAD~10 HEAD</p>
                  <p className="text-emerald-400">• Compares local zlib blob trees on SSD</p>
                  <p className="text-slate-200 font-bold">• Execution Time: <strong>~0.003 seconds</strong></p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-indigo-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Engineering Classroom Mentorship
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300">Debangshu (Student):</span>
              <p>
                &ldquo;Sir, in our college computer lab, we were taught that SVN gives professors more security because permissions can be restricted centrally, while in Git, anyone can copy the entire repository. Is SVN still better for strict access control?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;That is a common traditional view, Debangshu! In SVN, you could configure folder-level path-based permissions on the server. However, modern DVCS platforms like GitHub and GitLab Enterprise solve security with <strong>Branch Protection Rules</strong>, <strong>CODEOWNERS approval matrices</strong>, and <strong>Cryptographic Commit Signing (GPG/SSH)</strong>. You get total enterprise governance without sacrificing the speed and resilience of distributed computing!&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300">Mahima (Student):</span>
              <p>
                &ldquo;So if our laptop is stolen, can someone tamper with our historical commits?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;No! Because Git uses a mathematical Merkle tree where every commit hash incorporates the SHA hash of its parent. If anyone modifies even a single character in a file from 3 years ago, that commit&apos;s hash changes, causing a cascade of mismatched hashes all the way to HEAD. Git instantly detects the corruption and rejects the altered history.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="CVCS vs DVCS: Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring Single Point of Failure, offline workflows, and branching architecture"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Note ───────────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 03 Study Note: Centralized vs Distributed VCS"
            downloadFileName="git_topic02_cvcs_vs_dvcs_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: In Centralized VCS, branching was an expensive luxury. In Git, branching is your everyday scratchpad. Branch freely, commit atomically, and merge with confidence. Warning: Never fear creating 10 branches a day—they are 41-byte text pointers that cost nothing! Habit: Always keep your main branch green and deployable. Motivation: Understanding the distributed architecture makes you a resilient, world-class software engineer. — Sukanta Hui, Coder & AccoTax"
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
              <span>Previous: Evolution of VCS (Topic 2)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Origins of Git &amp; Linus Torvalds (Topic 4)</span>
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
