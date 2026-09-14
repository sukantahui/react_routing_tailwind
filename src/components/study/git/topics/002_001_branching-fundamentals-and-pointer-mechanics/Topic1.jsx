import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw,
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
  Trash2,
  Sliders,
  Check,
  GitBranch,
  GitCommit,
  FileText,
  Bookmark,
  Cpu,
  Server,
  HardDrive
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
 * Topic 1: How Git Branching Differs from Other VCS: Instant zero-cost branching vs copying entire directories
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic1() {
  const [selectedVcs, setSelectedVcs] = useState("git");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 1;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const vcsComparison = {
    git: {
      name: "Git (Distributed DAG Pointers)",
      operation: "Creates a 41-byte text file (.git/refs/heads/feature)",
      timeComplexity: "O(1) Constant Time (~1 to 5 milliseconds)",
      diskUsage: "41 bytes on disk (regardless of repo size)",
      networkReq: "100% Local, zero network ping, offline capable",
      isolation: "Non-destructive commit pointer graph",
      badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-800"
    },
    svn: {
      name: "Subversion / SVN (Centralized Copy)",
      operation: "Copies /trunk directory to /branches/feature folder",
      timeComplexity: "O(N) Linear to repo file count + network latency",
      diskUsage: "Server-side directory duplicate (cheap copy on server, full download on client)",
      networkReq: "Mandatory round-trip to central server",
      isolation: "Separate URL / folder path inside server repository",
      badgeColor: "text-amber-400 bg-amber-950/40 border-amber-800"
    },
    tfs: {
      name: "TFVC / Perforce (Heavy Server Branching)",
      operation: "Allocates new server workspace branch mapping",
      timeComplexity: "High latency; requires server lock negotiation",
      diskUsage: "Heavy filesystem allocations & workspace duplicate",
      networkReq: "Requires persistent server connection & checkouts",
      isolation: "Locked workspace branches",
      badgeColor: "text-rose-400 bg-rose-950/40 border-rose-800"
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
                <GitBranch className="w-4 h-4" />
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 1 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Git Branching vs Other VCS: Zero-Cost Pointers vs Directory Copies
              </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={prevTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Link>
              <Link
                to={nextTopicUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition shadow-lg shadow-cyan-950/50"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* ─── SECTION 2: TOPIC OVERVIEW & HIGH-LEVEL INTRO ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-950/80 border border-cyan-800/60 rounded-xl text-cyan-400 mt-1">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Architectural Paradigm Shift</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Traditional VCS Developers Feared Branching (And Why Git Encourages It Constantly)
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                In centralized systems like Subversion (SVN), CVS, and older enterprise systems, branching was an expensive, slow, and dreaded ceremony. Creating a branch meant copying an entire folder hierarchy on a remote server, consuming server bandwidth, and taking minutes in large enterprise codebases. Developers branched once every quarter for a major release.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Git revolutionized software engineering by treating branches as <strong>immutable DAG commit nodes pointed to by microscopic 41-byte text pointers</strong>. In Git, creating, switching, and deleting branches is instantaneous (<span className="text-cyan-300 font-mono">O(1)</span> time complexity), requiring zero network traffic and consuming 41 bytes of disk. This architectural breakthrough unlocked <em>topic branching, micro-branching, and pull-request workflows</em>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 border border-indigo-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-950 border border-indigo-800 rounded-lg text-indigo-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-indigo-200">
              Explain Like I'm 10 (ELI10): Photocopying an Entire Register vs Moving a Bookmark
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax in Barrackpore</strong>, <strong className="text-white">Sukanta Hui</strong> set up two practical scenarios on the classroom desk with students <strong>Sachin</strong> and <strong>Mahima</strong> to contrast SVN branching against Git branching:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-slate-950/80 border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Server className="w-4 h-4" />
                  <span>The SVN / Traditional VCS Way: The Heavy Ledger Copy</span>
                </div>
                <p className="text-xs text-slate-300">
                  Imagine a 1,000-page accounting ledger. Sachin wants to draft a trial balance. In SVN, the office assistant runs to the photocopy shop, duplicates all 1,000 pages, binds a brand-new heavy register labeled <code className="text-amber-300">/branches/trial-balance</code>, and places it on a new desk. It costs ₹500, wastes 30 minutes, and clutters the shelf.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 border border-emerald-900/50 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>The Git Way: The 1-Rupee Sticky Bookmark</span>
                </div>
                <p className="text-xs text-slate-300">
                  In Git, Mahima writes the word <code className="text-emerald-300">trial-balance</code> on a tiny 1-rupee sticky bookmark and sticks it on page 452 of the existing ledger. Creating the bookmark took 1 second and weighed 0.1 grams. When Mahima adds new pages, the bookmark simply moves forward!
                </p>
              </div>
            </div>

            <p className="italic text-slate-400 border-l-2 border-indigo-500 pl-3">
              "Because bookmarks are practically free, you can stick 20 bookmarks for testing ideas without bloating your office shelf. If an idea fails, you pluck off the sticky note and throw it in the dustbin without tearing a single ledger page!" — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE VISUAL COMPARISON ────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Architecture Lab</span>
              <h3 className="text-xl font-bold text-white">Compare VCS Branching Mechanisms</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(vcsComparison).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedVcs(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    selectedVcs === key
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Selected VCS Card */}
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{vcsComparison[selectedVcs].name}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-mono ${vcsComparison[selectedVcs].badgeColor}`}>
                {selectedVcs === "git" ? "O(1) Instant" : "O(N) Heavy"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Filesystem Operation</span>
                <p className="text-slate-200 font-semibold">{vcsComparison[selectedVcs].operation}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Time Complexity</span>
                <p className="text-slate-200 font-semibold">{vcsComparison[selectedVcs].timeComplexity}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Disk Footprint</span>
                <p className="text-slate-200 font-semibold">{vcsComparison[selectedVcs].diskUsage}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Network Requirement</span>
                <p className="text-slate-200 font-semibold">{vcsComparison[selectedVcs].networkReq}</p>
              </div>
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: SVN Full Directory Copy vs Git Pointer Graph
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 260" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                  <marker id="svnArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* Left Side: SVN Directory Copy */}
                <rect x="20" y="20" width="370" height="220" rx="10" fill="#0f172a" stroke="#334155" />
                <text x="35" y="45" fill="#f59e0b" fontWeight="bold" fontSize="13">SVN / Centralized VCS (Folder Copy)</text>
                
                <rect x="40" y="65" width="150" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" />
                <text x="50" y="85" fill="#e2e8f0" fontWeight="bold">/trunk (150 MB)</text>
                <text x="50" y="105" fill="#94a3b8" fontSize="10">• src/ (1,200 files)</text>
                <text x="50" y="120" fill="#94a3b8" fontSize="10">• assets/ (50 MB)</text>

                <path d="M 195 100 L 235 100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#svnArrow)">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.5s" repeatCount="indefinite" />
                </path>
                <text x="180" y="80" fill="#f59e0b" fontSize="9">svn copy (O(N))</text>

                <rect x="240" y="65" width="135" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" />
                <text x="250" y="85" fill="#e2e8f0" fontWeight="bold">/branches/feat</text>
                <text x="250" y="105" fill="#f87171" fontSize="10">+150 MB Duplicate</text>
                <text x="250" y="120" fill="#94a3b8" fontSize="10">Full tree clone</text>

                <text x="40" y="170" fill="#94a3b8" fontSize="10">⚠️ Requires server round-trip network ping.</text>
                <text x="40" y="190" fill="#94a3b8" fontSize="10">⚠️ High disk overhead on central server.</text>
                <text x="40" y="210" fill="#f87171" fontSize="10">Result: Teams branch rarely (Release only).</text>

                {/* Right Side: Git Zero-Cost Pointer */}
                <rect x="430" y="20" width="400" height="220" rx="10" fill="#0f172a" stroke="#0891b2" />
                <text x="445" y="45" fill="#22d3ee" fontWeight="bold" fontSize="13">Git DAG (Zero-Cost 41-byte Pointers)</text>

                {/* Commit C1 */}
                <circle cx="490" cy="110" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="482" y="114" fill="#67e8f9" fontWeight="bold" fontSize="11">C1</text>

                {/* Commit C2 */}
                <line x1="510" y1="110" x2="570" y2="110" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <circle cx="590" cy="110" r="18" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="582" y="114" fill="#67e8f9" fontWeight="bold" fontSize="11">C2</text>

                {/* Branch pointer main */}
                <rect x="555" y="160" width="70" height="26" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="568" y="177" fill="#6ee7b7" fontWeight="bold">main</text>
                <line x1="590" y1="160" x2="590" y2="132" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Branch pointer feature */}
                <rect x="670" y="160" width="130" height="26" rx="4" fill="#164e63" stroke="#06b6d4">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="678" y="177" fill="#67e8f9" fontWeight="bold">feature (41 B)</text>
                <path d="M 735 160 C 735 130, 615 135, 608 120" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

                <text x="445" y="210" fill="#34d399" fontSize="10">✓ 41-byte text file written in ~2ms.</text>
                <text x="445" y="225" fill="#34d399" fontSize="10">✓ 0 MB object duplication; DAG commits are shared.</text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: DETAILED TECHNICAL COMPARISON TABLE ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Comprehensive Technical Comparison Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-200">
                  <th className="p-3 font-semibold">Evaluation Metric</th>
                  <th className="p-3 font-semibold text-cyan-400">Git (Distributed VCS)</th>
                  <th className="p-3 font-semibold text-amber-400">Subversion (SVN)</th>
                  <th className="p-3 font-semibold text-purple-400">Perforce / TFVC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Branch Creation Mechanism</td>
                  <td className="p-3 text-cyan-300">Creates 41-byte reference file pointing to SHA-1</td>
                  <td className="p-3 text-amber-300">Server copy of whole directory tree to /branches/</td>
                  <td className="p-3 text-purple-300">Creates server branching integration records</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Execution Speed</td>
                  <td className="p-3 text-emerald-400">&lt; 5 ms (Instantaneous local disk write)</td>
                  <td className="p-3 text-amber-400">Seconds to minutes (Server + Network bound)</td>
                  <td className="p-3 text-rose-400">Moderate to slow depending on workspace size</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Offline Capability</td>
                  <td className="p-3 text-emerald-400">100% Offline (airplane mode, train, local desk)</td>
                  <td className="p-3 text-rose-400">Impossible without active server connection</td>
                  <td className="p-3 text-rose-400">Impossible (requires central checkouts)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Storage Impact</td>
                  <td className="p-3 text-emerald-400">41 bytes (Only new commits add blob deltas)</td>
                  <td className="p-3 text-amber-400">Heavy duplicate metadata per branch</td>
                  <td className="p-3 text-purple-400">Significant database and depot overhead</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Merging Friction</td>
                  <td className="p-3 text-cyan-300">Automated 3-way merge using common ancestor DAG</td>
                  <td className="p-3 text-rose-400">Complex history tracking; high conflict risk</td>
                  <td className="p-3 text-amber-300">Requires manual branch-mapping tracking</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-sans font-medium text-slate-200">Encouraged Workflow</td>
                  <td className="p-3 text-emerald-400">Micro-branching (1 branch per bug/feature/experiment)</td>
                  <td className="p-3 text-amber-400">Monolithic long-lived release branching only</td>
                  <td className="p-3 text-purple-400">Planned milestone branching</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL DEMONSTRATION ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Observing Zero-Cost Creation in the Terminal</h3>
          </div>
          <p className="text-slate-300 text-sm">
            You can verify Git's zero-cost nature by inspecting your file system directly. Notice how creating a branch leaves object databases untouched and writes exactly 41 bytes:
          </p>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Check disk size of .git/refs/heads before branching</span>
              <p className="text-cyan-400">$ ls -lh .git/refs/heads/</p>
              <p className="text-slate-400">-rw-r--r-- 1 sukanta staff 41B Sep 14 10:00 main</p>
            </div>

            <div>
              <span className="text-slate-500"># 2. Create 3 new feature branches instantly</span>
              <p className="text-cyan-400">$ git branch feature-gst</p>
              <p className="text-cyan-400">$ git branch feature-discount</p>
              <p className="text-cyan-400">$ git branch experiment-invoice</p>
            </div>

            <div>
              <span className="text-slate-500"># 3. Inspect the refs folder again</span>
              <p className="text-cyan-400">$ ls -lh .git/refs/heads/</p>
              <p className="text-emerald-400">-rw-r--r-- 1 sukanta staff 41B Sep 14 10:02 experiment-invoice</p>
              <p className="text-emerald-400">-rw-r--r-- 1 sukanta staff 41B Sep 14 10:02 feature-discount</p>
              <p className="text-emerald-400">-rw-r--r-- 1 sukanta staff 41B Sep 14 10:02 feature-gst</p>
              <p className="text-emerald-400">-rw-r--r-- 1 sukanta staff 41B Sep 14 10:00 main</p>
            </div>

            <div>
              <span className="text-slate-500"># 4. Verify that all 4 branches point to the exact same commit SHA</span>
              <p className="text-cyan-400">$ cat .git/refs/heads/main</p>
              <p className="text-purple-300">7a8b9c0d1e2f3456789abcdef0123456789abcde</p>
              <p className="text-cyan-400">$ cat .git/refs/heads/feature-gst</p>
              <p className="text-purple-300">7a8b9c0d1e2f3456789abcdef0123456789abcde</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="When senior engineers who grew up with SVN or CVS joined Git projects around 2010, their biggest psychological hurdle was overcoming 'branching fear'. In SVN, you branched only during crises or milestones. In Git, I tell students like सचिन and महिमा: create a branch even if you are just testing whether changing a CSS button color from blue to indigo looks good. If you don't like it, delete the branch. The cost is literally zero."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Common Pitfalls When Transitioning from Traditional VCS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Hoarding Work on 'main' Due to Branching Hesitation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developers new to Git frequently pile 15 unverified features onto the <code className="text-slate-100">main</code> branch because they assume branching requires administrator setup or causes repository bloat. This ruins main-branch stability.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Expecting Branches to be Physical Directories</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                SVN users expect to see a physical folder <code className="text-slate-100">/branches/feature-gst/</code> in their root working tree. In Git, the working directory stays in the same folder, and Git updates the files in place when you switch branches.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 1 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 1 Frequently Asked Questions & Interview Questions"
            questions={questions}
          />
        </section>

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ──────────────────────────── */}
        <nav className="flex items-center justify-between border-t border-slate-800 pt-6">
          <Link
            to={prevTopicUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-medium text-slate-200 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Topic 0: What is a Branch?</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 2: The Role of HEAD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
