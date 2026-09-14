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
  Cpu
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1: Evolution of VCS: Local VCS -> Centralized VCS (SVN, CVS, Perforce) -> Distributed VCS (Git, Mercurial)
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [activeGen, setActiveGen] = useState("gen3");
  const [offlineSimulation, setOfflineSimulation] = useState("offline");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 1;
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
            <span className="text-sky-400 font-semibold">Topic 02 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
              Architecture Evolution
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              Three Generations of VCS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Evolution of VCS: Local VCS → Centralized VCS → Distributed VCS
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Trace the 40-year architectural journey from single-machine delta databases (RCS) to server-dependent central repositories (SVN, CVS, Perforce), and discover why decentralized cryptographic systems (Git, Mercurial) revolutionized modern software engineering.
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
                In Simple Words (The Library Book Analogy)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Understand the 3 generations of version control through a simple real-world comparison
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm leading-relaxed">
            {/* Gen 1 */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <Laptop size={16} />
                <span>Gen 1: Personal Diary (Local)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                You write notes in a personal notebook on your desk. No one else can read or write in it. If your dog chews up the notebook or your desk catches fire, all your history is gone forever.
              </p>
              <div className="text-[11px] font-mono text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-800/40">
                Example: RCS, SCCS
              </div>
            </div>

            {/* Gen 2 */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Server size={16} />
                <span>Gen 2: Town Hall Vault (Centralized)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                Only ONE giant ledger exists inside a town hall vault. To read or write, you must travel to the town hall. If the roads are closed (no network) or the hall burns down (server crash), the whole town stops working.
              </p>
              <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-800/40">
                Example: CVS, Subversion (SVN), Perforce
              </div>
            </div>

            {/* Gen 3 */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-sky-500/30 bg-sky-950/20 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <Database size={16} />
                <span>Gen 3: Magical Syncing Ledger (Git)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                Every citizen carries a magical replica of the complete historical ledger in their pocket. You can write, read, and cross-reference anywhere—on a mountain or inside a tunnel. When you meet friends, your ledgers synchronize instantly!
              </p>
              <div className="text-[11px] font-mono text-sky-300 bg-sky-950/60 p-2 rounded border border-sky-800/60">
                Example: Git, Mercurial (DVCS)
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Deep Technical Anatomy & Architectural Evolution ────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Technical Anatomy: Three Architectural Models
            </h2>
          </div>

          {/* Interactive Generation Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "gen1", label: "Generation 1: Local VCS (RCS)", color: "rose" },
              { id: "gen2", label: "Generation 2: Centralized VCS (SVN)", color: "amber" },
              { id: "gen3", label: "Generation 3: Distributed VCS (Git)", color: "sky" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGen(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border ${
                  activeGen === tab.id
                    ? "bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-950"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Generation Details Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {activeGen === "gen1" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                    <Laptop size={20} />
                    Local Version Control Architecture (1970s – 1980s)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Tools: SCCS (1972), RCS (1982)</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Local VCS kept revision files on a single computer. Tools like <strong>RCS</strong> kept patch sets (the differences between files) in a special format on disk. By applying all the patches sequentially, it could recreate what any file looked like at any point in time.
                </p>

                {/* SVG Visual Model */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <svg viewBox="0 0 600 160" className="w-full max-w-lg mx-auto">
                    <rect x="50" y="20" width="500" height="120" rx="12" fill="#0f172a" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="300" y="45" fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">Single Local Workstation (Local Disk)</text>

                    <rect x="80" y="70" width="120" height="50" rx="8" fill="#1e293b" stroke="#64748b" />
                    <text x="140" y="95" fill="#e2e8f0" fontSize="12" textAnchor="middle">Working File</text>
                    <text x="140" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">(Single Developer)</text>

                    <path d="M 200 95 L 260 95" stroke="#e11d48" strokeWidth="2" markerEnd="url(#arrow)" />

                    <rect x="270" y="65" width="250" height="60" rx="8" fill="#881337" stroke="#f43f5e" />
                    <text x="395" y="90" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">RCS Patch Database</text>
                    <text x="395" y="110" fill="#fecdd3" fontSize="10" textAnchor="middle">Version 1 → Delta 2 → Delta 3</text>
                  </svg>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-200 space-y-1">
                  <p className="font-bold">🚨 Fatal Limitations:</p>
                  <p>1. <strong>Zero Collaboration:</strong> Developers on separate computers could not share or merge patch histories.</p>
                  <p>2. <strong>Instant Catastrophe:</strong> A single sector failure on the local disk destroyed the entire revision history permanently.</p>
                </div>
              </div>
            )}

            {activeGen === "gen2" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    <Server size={20} />
                    Centralized Version Control Architecture (1990s – 2000s)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Tools: CVS (1990), SVN (2000), Perforce</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Centralized VCS (CVCS) introduced a central server containing all the versioned files and history. Clients connect across a LAN or internet to check out working copies. While this enabled team collaboration and administrative access control, it introduced a catastrophic single point of failure.
                </p>

                {/* SVG Visual Model */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <svg viewBox="0 0 600 200" className="w-full max-w-lg mx-auto">
                    {/* Central Server */}
                    <rect x="220" y="15" width="160" height="75" rx="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                    <text x="300" y="42" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Central SVN Server</text>
                    <text x="300" y="60" fill="#fde68a" fontSize="10" textAnchor="middle">Version Database (r1..r5000)</text>
                    <text x="300" y="75" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">⚠️ SINGLE POINT OF FAILURE</text>

                    {/* Arrows */}
                    <path d="M 240 90 L 140 135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M 360 90 L 460 135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Developer A */}
                    <rect x="70" y="135" width="140" height="50" rx="8" fill="#1e293b" stroke="#64748b" />
                    <text x="140" y="158" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Client A (Barrackpore)</text>
                    <text x="140" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle">Working Copy Only (No DB)</text>

                    {/* Developer B */}
                    <rect x="390" y="135" width="140" height="50" rx="8" fill="#1e293b" stroke="#64748b" />
                    <text x="460" y="158" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Client B (Kolkata)</text>
                    <text x="460" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle">Working Copy Only (No DB)</text>
                  </svg>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 space-y-1">
                  <p className="font-bold">🚨 CVCS Bottlenecks:</p>
                  <p>1. <strong>No Offline Commits:</strong> If your internet disconnects, you cannot commit, view historical diffs, or create branches.</p>
                  <p>2. <strong>Heavyweight Branching:</strong> Branching requires creating full directory copies on the server, making branching slow and rare.</p>
                </div>
              </div>
            )}

            {activeGen === "gen3" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                    <Database size={20} />
                    Distributed Version Control Architecture (2005 – Present)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Tools: Git (2005), Mercurial (2005)</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  In a Distributed VCS (DVCS) like <strong>Git</strong>, clients don’t just check out the latest snapshot of the files; they fully mirror the repository, including its entire historical commit graph and object database. If any server dies, any client repository can be cloned by others to restore everything.
                </p>

                {/* SVG Visual Model */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <svg viewBox="0 0 600 210" className="w-full max-w-lg mx-auto">
                    {/* Remote Server */}
                    <rect x="220" y="10" width="160" height="60" rx="10" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                    <text x="300" y="34" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">GitHub / Remote Server</text>
                    <text x="300" y="52" fill="#7dd3fc" fontSize="10" textAnchor="middle">Full Repo &amp; Object DB</text>

                    {/* Sync Lines */}
                    <path d="M 230 70 L 140 120" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 370 70 L 460 120" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 210 160 L 390 160" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="300" y="152" fill="#34d399" fontSize="10" textAnchor="middle">Peer-to-Peer Sync (Direct)</text>

                    {/* Developer A */}
                    <rect x="60" y="120" width="150" height="70" rx="8" fill="#0f172a" stroke="#0284c7" />
                    <text x="135" y="142" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Dev Sachin (Laptop)</text>
                    <text x="135" y="158" fill="#38bdf8" fontSize="9" textAnchor="middle">Full Local .git DB</text>
                    <text x="135" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle">100% Offline Capable</text>

                    {/* Developer B */}
                    <rect x="390" y="120" width="150" height="70" rx="8" fill="#0f172a" stroke="#0284c7" />
                    <text x="465" y="142" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Dev Susmita (Laptop)</text>
                    <text x="465" y="158" fill="#38bdf8" fontSize="9" textAnchor="middle">Full Local .git DB</text>
                    <text x="465" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle">100% Offline Capable</text>
                  </svg>
                </div>

                <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200 space-y-1">
                  <p className="font-bold">✨ DVCS Superpowers:</p>
                  <p>1. <strong>Sub-millisecond Operations:</strong> Diffs, commits, branches, and logs execute directly on your local SSD without network delays.</p>
                  <p>2. <strong>Indestructible Resilience:</strong> Every developer clone serves as an active hot backup of the entire project history.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Comparison Matrix ───────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="text-emerald-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Definitive Architecture Comparison
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/90 text-slate-200 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Architectural Metric</th>
                  <th className="p-3.5 text-rose-400">Gen 1: Local (RCS)</th>
                  <th className="p-3.5 text-amber-400">Gen 2: Centralized (SVN)</th>
                  <th className="p-3.5 text-sky-400 font-bold">Gen 3: Distributed (Git)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-sans font-semibold text-slate-200">Database Location</td>
                  <td className="p-3.5 text-rose-300">Single Local Disk</td>
                  <td className="p-3.5 text-amber-300">Central Server Only</td>
                  <td className="p-3.5 text-sky-300 font-bold">Every Local Clone (.git)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-sans font-semibold text-slate-200">Offline Commits</td>
                  <td className="p-3.5 text-emerald-400">Yes (Solo user)</td>
                  <td className="p-3.5 text-rose-400 font-bold">NO (Blocks without net)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">YES (Full offline engine)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-sans font-semibold text-slate-200">Branching Performance</td>
                  <td className="p-3.5 text-slate-500">Not Supported</td>
                  <td className="p-3.5 text-amber-300">Slow (Copies folder on server)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Instant (41-byte pointer file)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-sans font-semibold text-slate-200">Single Point of Failure</td>
                  <td className="p-3.5 text-rose-400">Yes (Local Drive)</td>
                  <td className="p-3.5 text-rose-400 font-bold">CRITICAL (Central server)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">NONE (Fully decentralized)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-sans font-semibold text-slate-200">Data Integrity Model</td>
                  <td className="p-3.5 text-slate-500">None</td>
                  <td className="p-3.5 text-amber-300">Integer Revisions (r1490)</td>
                  <td className="p-3.5 text-sky-300 font-bold">Cryptographic SHA-1 / SHA-256</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── 5. Interactive Sandbox: Offline Capability Simulation ───── */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal size={20} className="text-sky-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Interactive Lab: Centralized vs Distributed Network Simulator
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Offline Resilience Test</span>
          </div>

          <p className="text-sm text-slate-300">
            Simulate a developer in Barrackpore losing their internet connection while traveling on the local train to Kolkata. See what happens in SVN vs Git when running daily commands.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Network State:</span>
            <button
              onClick={() => setOfflineSimulation("online")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                offlineSimulation === "online"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              🟢 Online (Wi-Fi Active)
            </button>
            <button
              onClick={() => setOfflineSimulation("offline")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                offlineSimulation === "offline"
                  ? "bg-rose-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              🔴 Offline (Zero Internet / Train Mode)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SVN Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>Subversion (SVN) Execution</span>
                <Server size={14} />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/90 text-slate-300 space-y-1.5 border border-slate-800">
                <p className="text-slate-500">$ svn commit -m &quot;feat: auth logic&quot;</p>
                {offlineSimulation === "offline" ? (
                  <p className="text-rose-400 font-bold">
                    svn: E175002: Unable to connect to a repository at URL &apos;https://svn.server.com/repo&apos;<br />
                    svn: E175002: Network unreachable (Operation failed. Work blocked!)
                  </p>
                ) : (
                  <p className="text-emerald-400">
                    Transmitting file data .<br />
                    Committed revision 1042 across central server.
                  </p>
                )}
              </div>
            </div>

            {/* Git Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-sky-300 font-bold">
                <span>Git (DVCS) Execution</span>
                <Database size={14} />
              </div>
              <div className="p-3 rounded-lg bg-slate-900/90 text-slate-300 space-y-1.5 border border-slate-800">
                <p className="text-slate-500">$ git commit -m &quot;feat: auth logic&quot;</p>
                <p className="text-emerald-400 font-bold">
                  [main 7f2a1b9] feat: auth logic<br />
                  1 file changed, 34 insertions(+)<br />
                  (Saved 100% locally in .git object database. Zero network lag!)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Classroom Dialogue (Barrackpore Setting) ────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship Dialogue
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Sachin (Student):</span>
              <p>
                &ldquo;Sir, if every developer has a full copy of the entire project history on their laptop in Git, doesn&apos;t that take up massive disk space compared to SVN where you only download the current files?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;That is one of the most brilliant questions, Sachin! You would expect a full history clone to be gigantic. However, Git uses two revolutionary engineering marvels: <strong>zlib content compression</strong> and <strong>packfile delta compression</strong> with SHA-1 content deduplication. In fact, a complete Git clone of the Mozilla project with 10+ years of history is often smaller on disk than a single uncompressed SVN checkout of just the latest files!&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300">Susmita (Student):</span>
              <p>
                &ldquo;So that means even if GitHub goes down for 5 hours, our development team in Barrackpore doesn&apos;t stop coding or committing?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;Exactly, Susmita! In SVN or CVS, a server outage halts all work worldwide. In Git, you create branches, commit code, review diffs, and even share patches with each other over the local network. When GitHub comes back online, a single <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">git push</code> synchronizes everything.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 7. Professional Best Practice Commandments ─────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="text-amber-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              DVCS Architectural Commandments
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Commit Early &amp; Often Locally
              </p>
              <p className="text-slate-400 text-xs">
                In DVCS, local commits are completely free and private. Don&apos;t wait for end-of-day commits; create atomic snapshots after every logical milestone.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Embrace Cheap Feature Branches
              </p>
              <p className="text-slate-400 text-xs">
                Branches in Git are 41-byte text pointers that take 0.001 seconds to create. Never hesitate to create disposable experimental branches.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Understand SHA Cryptographic Integrity
              </p>
              <p className="text-slate-400 text-xs">
                Git doesn&apos;t identify commits by sequential numbers (like SVN r14). It uses 160-bit SHA hashes to mathematically guarantee that history cannot be secretly tampered with.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Remember: GitHub is Not Git
              </p>
              <p className="text-slate-400 text-xs">
                Git is the decentralized command-line engine on your computer; GitHub is just a convenient remote repository hosting portal with web UI.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 8. Comprehensive FAQ Section (25–30 Q&As) ──────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Evolution of VCS: Comprehensive Q&A Knowledge Base"
            subtitle="25 in-depth technical questions spanning Local VCS, Centralized VCS, and Distributed Git Architecture"
            questions={questions}
          />
        </section>

        {/* ─── 9. Printable Plain-Text Revision Note ──────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 02 Study Note: Evolution of VCS"
            downloadFileName="git_topic01_evolution_of_vcs_note.txt"
          />
        </section>

        {/* ─── 10. Teacher Sukanta Hui's Mentorship Note ──────────────── */}
        <section>
          <Teacher
            note="Principle: In Centralized VCS, the server is the single point of failure. In Git, every developer in Barrackpore or anywhere holds the entire vault. Warning: Never confuse Git with GitHub—Git is your local engine, GitHub is just a cloud mirror. Habit: Commit frequently and branch boldly without fear of breaking main. Motivation: Once you master distributed version control, you possess the superpower of modern software engineering! — Sukanta Hui, Coder & AccoTax"
          />
        </section>

        {/* ─── 11. Next & Previous Topic Navigation ───────────────────── */}
        <nav className="flex items-center justify-between pt-8 border-t border-slate-800">
          {hasPrev ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex - 1}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Previous: What is VCS (Topic 1)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: CVCS vs DVCS (Topic 3)</span>
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
