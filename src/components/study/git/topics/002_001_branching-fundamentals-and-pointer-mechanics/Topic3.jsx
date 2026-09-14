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
  PlusCircle,
  FolderTree
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic 3: Creating Branches: git branch <branch-name> and inspecting branch pointers (.git/refs/heads/)
 * Module: 002_001_branching-fundamentals-and-pointer-mechanics
 * Segment: branching-merging (Segment 2 – Branching, Merging, Rebasing & Conflict Resolution)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [createdBranches, setCreatedBranches] = useState([
    { name: "main", sha: "7a8b9c0d", path: ".git/refs/heads/main", active: true }
  ]);
  const [branchInput, setBranchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Navigation Logic
  const moduleSlug = "002_001_branching-fundamentals-and-pointer-mechanics";
  const currentIndex = 3;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 16;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const handleCreateBranch = (e) => {
    e.preventDefault();
    const cleanName = branchInput.trim();
    if (!cleanName) return;

    // Check branch naming rules
    if (cleanName.includes("..") || cleanName.includes(" ") || cleanName.startsWith("/") || cleanName.endsWith("/")) {
      setErrorMessage("Invalid branch name syntax (no spaces, double dots '..', or leading/trailing slashes).");
      return;
    }

    if (createdBranches.some((b) => b.name === cleanName)) {
      setErrorMessage(`fatal: a branch named '${cleanName}' already exists.`);
      return;
    }

    setErrorMessage("");
    setCreatedBranches([
      ...createdBranches,
      {
        name: cleanName,
        sha: "7a8b9c0d",
        path: `.git/refs/heads/${cleanName}`,
        active: false
      }
    ]);
    setBranchInput("");
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
                <span>Segment 2: Branching & Merging • Module 002_001 • Topic 3 of {totalTopics}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Creating Branches: <code className="text-cyan-300 font-mono text-lg">git branch &lt;name&gt;</code> & Pointer Inspection
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
              <PlusCircle className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Branch Pointer Creation</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                What Happens Under the Hood When You Run <code className="text-cyan-300">git branch &lt;name&gt;</code>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                Executing <code className="text-cyan-300 font-mono">git branch &lt;branch-name&gt;</code> does not duplicate a single source code file. It performs a single micro-operation: writing a 41-byte text file to <code className="text-emerald-300 font-mono">.git/refs/heads/&lt;branch-name&gt;</code> containing the 40-character commit SHA that HEAD currently points to.
              </p>
              <p className="text-slate-300 leading-relaxed text-base">
                Crucially, <code className="text-amber-300 font-mono">git branch &lt;name&gt;</code> only <em>creates</em> the branch pointer; it does <strong>not</strong> switch your active working directory to it. HEAD remains attached to your existing branch until you explicitly switch.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: ELI10 & BARRACKPORE CLASSROOM ANALOGY ───────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-blue-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-950 border border-blue-800 rounded-lg text-blue-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-blue-200">
              Explain Like I'm 10 (ELI10): Sticking a Second Post-It Note on the Same Page
            </h3>
          </div>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              At <strong>AccoTax Barrackpore</strong>, student <strong>Mahima</strong> was working on the main accounting ledger at Page 50. <strong>Sukanta Hui</strong> asked her to start drafting a new GST calculation without disturbing the main ledger:
            </p>

            <div className="p-4 bg-slate-950/80 border border-cyan-900/50 rounded-xl space-y-2 my-2">
              <p className="text-xs text-slate-300">
                Mahima takes a fresh yellow Post-it note, writes <strong>"feature-gst"</strong> on it, and sticks it on Page 50 right next to the green <strong>"main"</strong> Post-it note.
              </p>
              <p className="text-xs text-emerald-300">
                At this exact moment, both Post-it notes point to Page 50. But Mahima's pen is still writing on "main". She hasn't switched her focus yet!
              </p>
            </div>

            <p className="italic text-slate-400 border-l-2 border-blue-500 pl-3">
              "Mahima realized: creating a branch doesn't duplicate the ledger pages; it just adds another label on the current page! That's why it takes zero seconds and costs zero ₹ Rupees." — Sukanta Hui
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: INTERACTIVE BRANCH CREATION SIMULATOR ─────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Interactive Sandbox</span>
            <h3 className="text-xl font-bold text-white">Live .git/refs/heads/ Pointer Simulator</h3>
          </div>

          <form onSubmit={handleCreateBranch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-500">$ git branch</span>
              <input
                type="text"
                value={branchInput}
                onChange={(e) => setBranchInput(e.target.value)}
                placeholder="feature/gst-invoice"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-28 pr-4 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Branch Pointer</span>
            </button>
          </form>

          {errorMessage && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/80 rounded-lg text-rose-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Filesystem View */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Directory: .git/refs/heads/</span>
              <span>Total Active Branches: {createdBranches.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {createdBranches.map((branch, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border font-mono text-xs space-y-1.5 transition ${
                    branch.active
                      ? "bg-emerald-950/30 border-emerald-800 text-emerald-300"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{branch.name}</span>
                    {branch.active && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 font-sans">
                        HEAD Active
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 break-all">{branch.path}</div>
                  <div className="text-[11px] text-purple-400 font-semibold">SHA: {branch.sha}...</div>
                  <div className="text-[10px] text-slate-500 font-sans">Size: 41 bytes on disk</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── SECTION 5: ANIMATED SVG DIAGRAM ─────────────────────────── */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Visual Animation: New Branch Pointer Co-Existing on Same Commit C2
            </span>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
              <svg viewBox="0 0 850 220" className="w-full min-w-[700px] h-auto font-mono text-xs">
                <defs>
                  <marker id="branchArrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" />
                  </marker>
                  <marker id="headArrow3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Commit Line */}
                <circle cx="200" cy="110" r="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="190" y="115" fill="#94a3b8" fontWeight="bold">C1</text>

                <line x1="220" y1="110" x2="380" y2="110" stroke="#06b6d4" strokeWidth="2" />

                <circle cx="400" cy="110" r="22" fill="#1e293b" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="390" y="115" fill="#67e8f9" fontWeight="bold">C2</text>
                <text x="375" y="145" fill="#64748b" fontSize="9">7a8b9c0d</text>

                {/* Branch 1: main */}
                <rect x="340" y="20" width="120" height="30" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="355" y="40" fill="#a7f3d0" fontWeight="bold">refs/heads/main</text>
                <line x1="400" y1="50" x2="400" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#branchArrow3)" />

                {/* HEAD pointing to main */}
                <rect x="140" y="20" width="90" height="30" rx="5" fill="#881337" stroke="#f43f5e" />
                <text x="160" y="40" fill="#fecdd3" fontWeight="bold">HEAD</text>
                <line x1="230" y1="35" x2="335" y2="35" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#headArrow3)">
                  <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.2s" repeatCount="indefinite" />
                </line>

                {/* Branch 2: feature-gst (Newly created) */}
                <rect x="520" y="20" width="160" height="30" rx="5" fill="#164e63" stroke="#06b6d4">
                  <animate attributeName="stroke-width" values="1;3;1" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="530" y="40" fill="#a5f3fc" fontWeight="bold">refs/heads/feature-gst</text>
                <path d="M 520 35 C 440 35, 420 70, 408 85" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#branchArrow3)" />

                <text x="250" y="195" fill="#94a3b8" fontSize="11">
                  Both <code className="text-emerald-400">main</code> and <code className="text-cyan-400">feature-gst</code> point to Commit C2. HEAD remains on <code className="text-rose-400">main</code>.
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: BRANCH NAMING RULES & HIERARCHIES ───────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FolderTree className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Git Branch Naming Rules & Hierarchy Conventions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-emerald-400 font-semibold font-sans">✓ Recommended Naming Patterns</span>
              <ul className="space-y-1.5 text-slate-300 list-disc pl-4 font-mono">
                <li>feature/gst-invoice-calc</li>
                <li>bugfix/login-null-pointer</li>
                <li>hotfix/round-off-error-patch</li>
                <li>chore/upgrade-tailwind-v4</li>
                <li>experiment/redis-caching</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <span className="text-rose-400 font-semibold font-sans">✗ Forbidden Naming Sequences</span>
              <ul className="space-y-1.5 text-slate-300 list-disc pl-4 font-mono">
                <li>feature..gst (no double dots '..')</li>
                <li>/feature or feature/ (no leading/trailing slashes)</li>
                <li>feature~1 or feature^ (no tilde/caret specifiers)</li>
                <li>feature name (no spaces)</li>
                <li>feature.lock (reserved lockfile extension)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: STEP-BY-STEP TERMINAL CHEATSHEET ─────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Terminal Command Execution Guide</h3>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-3 overflow-x-auto text-slate-300">
            <div>
              <span className="text-slate-500"># 1. Create a branch pointing to the current commit</span>
              <p className="text-cyan-400">$ git branch feature-gst</p>
            </div>
            <div>
              <span className="text-slate-500"># 2. Create a branch pointing to a specific commit SHA</span>
              <p className="text-cyan-400">$ git branch hotfix-old-bug 7a8b9c0</p>
            </div>
            <div>
              <span className="text-slate-500"># 3. Create a branch from a release tag</span>
              <p className="text-cyan-400">$ git branch patch-v1 v1.0.0</p>
            </div>
            <div>
              <span className="text-slate-500"># 4. List all branches with pattern matching</span>
              <p className="text-cyan-400">$ git branch --list 'feature/*'</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: TEACHER'S NOTE & INDUSTRY INSIGHTS ──────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <Teacher
            name="Sukanta Hui"
            title="Senior Technology Consultant & Lead Instructor"
            organization="Coder & AccoTax, Barrackpore"
            quote="The biggest mistake beginner students make is typing `git branch my-new-feature`, editing code, committing, and then panicking because their commits went onto `main`! Always remember: `git branch` merely creates the pointer. It does not switch you to it. In Topic 4 & 5, we will master `git switch` and `git switch -c` to create and switch seamlessly."
          />
        </section>

        {/* ─── SECTION 9: COMMON PITFALLS & REAL-WORLD MISTAKES ──────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Branch Creation Pitfalls</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 border border-rose-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" />
                <span>Creating a Branch Before Initial Commit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Running <code className="text-slate-100">git branch feature</code> immediately after <code className="text-slate-100">git init</code> fails because there is no commit object in the repository for the pointer to reference yet.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/60 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Folder vs File Name Conflicts (e.g. `feat` and `feat/tax`)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If a branch named <code className="text-slate-100">feat</code> exists, creating <code className="text-slate-100">feat/tax</code> fails because the filesystem cannot create a folder named <code className="text-slate-100">feat/</code> where a file named <code className="text-slate-100">feat</code> already sits.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PRINTABLE NOTES & CHEATSHEET ───────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <PlainTextPrint
            title="Module 002_001 Topic 3 Cheatsheet & Classroom Summary"
            content={noteText}
          />
        </section>

        {/* ─── SECTION 11: FAQS & KNOWLEDGE CHECK ─────────────────────────── */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <FAQTemplate
            title="Topic 3 Frequently Asked Questions & Interview Questions"
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
            <span>Topic 2: The Role of HEAD</span>
          </Link>
          <Link
            to={nextTopicUrl}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-sm font-semibold text-white transition shadow-lg shadow-cyan-950/50"
          >
            <span>Topic 4: Switching Branches</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
