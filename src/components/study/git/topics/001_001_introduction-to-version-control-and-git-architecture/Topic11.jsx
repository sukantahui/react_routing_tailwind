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
  FolderTree,
  FileText,
  Lock,
  Compass,
  Cpu,
  Eye,
  Sliders
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic 11: Anatomy of the .git Directory: Overview of HEAD, objects, refs, config, hooks, and index
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic11() {
  const [selectedNode, setSelectedNode] = useState("HEAD");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 11;
  const folder = roadmapData.folder || "git";

  const currentModule = roadmapData.segments
    ?.flatMap((s) => s.modules)
    ?.find((m) => m.slug === moduleSlug);

  const totalTopics = currentModule?.topics?.length || 15;
  const prevTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex - 1}`;
  const nextTopicUrl = `/${folder}/topic/${moduleSlug}/${currentIndex + 1}`;

  const nodeDetails = {
    HEAD: {
      title: ".git/HEAD (Current Checked-Out Branch Pointer)",
      type: "Text File (~30 bytes)",
      desc: "Contains a symbolic reference pointing to the currently active branch (e.g. 'ref: refs/heads/main'). When in detached HEAD mode, it contains a raw 40-character commit SHA.",
      sample: "ref: refs/heads/main",
      icon: Compass,
      role: "Determines which commit will become the parent of your next commit."
    },
    objects: {
      title: ".git/objects/ (Content-Addressable Object Store)",
      type: "Directory with 2-character subdirectories",
      desc: "The immutable database of Git. Stores compressed blobs (file data), trees (directory structures), commits (metadata & root tree), and annotated tags, named by their SHA hashes.",
      sample: "4b/825dc642cb6eb9a060e54bf8d69288fbee4904\ninfo/\npack/",
      icon: Database,
      role: "Guarantees cryptographic data integrity and stores all historical snapshots."
    },
    refs: {
      title: ".git/refs/ (Pointers to Commits - Branches & Tags)",
      type: "Directory Hierarchy",
      desc: "Contains 'heads/' (local branches), 'tags/' (version tags), and 'remotes/' (remote-tracking branches). Each file is a 41-byte text file storing a commit SHA hash.",
      sample: "refs/heads/main -> a1b2c3d4e5...\nrefs/tags/v1.0.0 -> e6f7g8h9...\nrefs/remotes/origin/main -> a1b2c3d4e5...",
      icon: GitBranch,
      role: "Provides human-friendly names for commit hashes. Branching in Git is instant because it only creates a 41-byte ref file."
    },
    index: {
      title: ".git/index (The Staging Area Cache)",
      type: "Binary File",
      desc: "The intermediate staging area. Tracks file paths, Unix permissions (100644/100755), modification times, and SHA-1 hashes of staged blobs waiting to be committed.",
      sample: "[Binary Format: DIRC header + 32-bit entries + SHA checksum]",
      icon: Layers,
      role: "Enables atomic commits by decoupling your working directory changes from the repository object store."
    },
    config: {
      title: ".git/config (Local Repository Settings)",
      type: "INI Text File",
      desc: "Stores repository-specific options including remote URLs, branch tracking configurations, and overrides for user identity or line ending rules.",
      sample: "[core]\n\trepositoryformatversion = 0\n\tfilemode = false\n[remote \"origin\"]\n\turl = https://github.com/user/repo.git",
      icon: Sliders,
      role: "Holds repository configuration that overrides global ~/.gitconfig."
    },
    hooks: {
      title: ".git/hooks/ (Client & Server Event Scripts)",
      type: "Directory of Executable Scripts",
      desc: "Lifecycle trigger scripts executed before commits, pushes, or receives (e.g. pre-commit, commit-msg, pre-push). Files ending with .sample are inactive.",
      sample: "pre-commit.sample\ncommit-msg.sample\npre-push.sample",
      icon: Zap,
      role: "Automates linting, formatting, security scanning, and commit message policy enforcement locally."
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
                <Link to={`/${folder}`} className="hover:underline flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5" /> Git Master Roadmap
                </Link>
                <span>/</span>
                <span className="text-slate-400">Foundation</span>
                <span>/</span>
                <span className="text-cyan-400">Topic 11 of {totalTopics}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <FolderTree className="w-8 h-8 text-cyan-400" />
                Anatomy of the <code className="text-cyan-300 font-mono text-xl sm:text-2xl">.git</code> Directory
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
              <Clock className="w-3 h-3 text-cyan-400" /> Est. Reading Time: 18 Mins
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              <Database className="w-3 h-3 text-cyan-400" /> Internal Architecture
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Core Knowledge Essential
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
            <FolderTree className="w-48 h-48 text-cyan-400" />
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400 shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                The Architect's Secret Vault Analogy
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Think of your project workspace as a drafting workshop with tables, blueprints, and paper sketches (your <span className="text-cyan-300 font-semibold">Working Tree</span>). Right in the corner sits a high-security black fireproof vault: the <span className="text-emerald-300 font-semibold">.git directory</span>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Inside this vault, you have:
                a magnetic pointer indicating which project edition is on the main table (<code className="text-cyan-300">HEAD</code>),
                a tray of pending sketches ready to be filed (<code className="text-amber-300">index</code>),
                an immutable locker containing every sealed drawing with tamper-proof cryptographic barcodes (<code className="text-indigo-300">objects/</code>),
                and an index drawer of bookmark labels (<code className="text-rose-300">refs/</code>). If a fire burns the drafting table, you simply open the vault and regenerate every single blueprint in seconds!
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
                Interactive Dissection: Explore the Internal Files of <code className="text-cyan-300">.git/</code>
              </h2>
              <p className="text-slate-400 text-sm">
                Click any component in the tree below to inspect its role, format, and sample contents
              </p>
            </div>
          </div>

          {/* Interactive Vault Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-cyan-400" /> Internal Hierarchy
              </h3>
              {[
                { id: "HEAD", label: "HEAD", type: "Active Branch Ref" },
                { id: "objects", label: "objects/", type: "Content Database" },
                { id: "refs", label: "refs/", type: "Branch & Tag Pointers" },
                { id: "index", label: "index", type: "Staging Cache" },
                { id: "config", label: "config", type: "Local Settings" },
                { id: "hooks", label: "hooks/", type: "Lifecycle Scripts" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedNode(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition flex items-center justify-between ${
                    selectedNode === item.id
                      ? "bg-cyan-950/60 border-cyan-500/60 text-white shadow-md shadow-cyan-950/30"
                      : "bg-slate-950 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <span className="font-mono text-xs sm:text-sm font-semibold text-cyan-300">{item.label}</span>
                  <span className="text-[11px] text-slate-500">{item.type}</span>
                </button>
              ))}
            </div>

            {/* Inspector Panel */}
            <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    {React.createElement(nodeDetails[selectedNode].icon, { className: "w-5 h-5 text-cyan-400" })}
                    {nodeDetails[selectedNode].title}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {nodeDetails[selectedNode].type}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {nodeDetails[selectedNode].desc}
                </p>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Core Function & System Role:
                  </span>
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    {nodeDetails[selectedNode].role}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1.5">Sample Internal Data Preview:</span>
                <pre className="font-mono text-xs text-cyan-300 p-3.5 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                  {nodeDetails[selectedNode].sample}
                </pre>
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
                Low-Level Plumbing Commands for Inspecting <code className="text-cyan-300">.git</code>
              </h2>
              <p className="text-slate-400 text-sm">
                How senior engineers inspect the raw internals of Git directly
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                cmd: "cat .git/HEAD",
                desc: "Reads the current symbolic ref (active branch) or detached commit hash.",
                tag: "Pointer Inspection"
              },
              {
                cmd: "cat .git/refs/heads/main",
                desc: "Prints the 40-character commit SHA hash currently at the tip of 'main'.",
                tag: "Branch Tip"
              },
              {
                cmd: "git cat-file -p <hash>",
                desc: "Pretty-prints the content of any commit, tree, blob, or tag object in .git/objects.",
                tag: "Object Viewer"
              },
              {
                cmd: "git cat-file -t <hash>",
                desc: "Returns the internal object type ('blob', 'tree', 'commit', or 'tag').",
                tag: "Type Checker"
              },
              {
                cmd: "git ls-files --stage",
                desc: "Displays tracked files, staging stages, permissions, and blob hashes from .git/index.",
                tag: "Index Inspection"
              },
              {
                cmd: "git count-objects -vH",
                desc: "Provides human-readable statistics on loose objects, packfiles, and disk usage.",
                tag: "Database Metrics"
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
                Real-World Failures & Dangerous Antipatterns
              </h2>
              <p className="text-slate-400 text-sm">
                Disastrous mistakes developers make regarding the .git directory
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Accidental Deletion of .git
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A junior developer ran <code className="text-slate-300">rm -rf .*</code> to clean hidden temp files. This wiped <code className="text-slate-300">.git</code>, destroying 3 months of un-pushed local feature branches, stashes, and revision history permanently.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: The .git directory is the repository. Never delete it unless you want to un-version the project.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Committing .git Folders (Nested Repo)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A student unzipped a third-party project into their existing repository without removing its <code className="text-slate-300">.git</code> folder. Git recorded it as an unlinked subproject, causing critical components to be excluded from GitHub commits.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Delete inner .git folders before adding third-party directories or use Git Submodules.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Manual Object Database Tampering
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A developer manually edited a file inside <code className="text-slate-300">.git/objects/</code> using a text editor to fix a typo. The SHA-1 hash no longer matched the modified payload, causing Git to fail with a fatal repository corruption error.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Lesson: Objects in .git/objects are immutable. Use Git CLI commands, never manually edit object files.
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
                Classroom Dialogue: Sukanta Sir Demystifies the .git Vault
              </h2>
              <p className="text-slate-400 text-sm">
                Barrackpore Lab Session: Sachin, Susmita, Mahima, and Debangshu dive into Git internals
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Mahima:</span>
              <p className="text-slate-300">
                "Sir, when I create a new branch like <code className="text-cyan-300">git branch feature-payment</code>, does Git duplicate all the project files on my hard drive?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Not at all, Mahima! That was how old centralized systems like SVN operated. In Git, creating a branch literally creates a 41-byte text file inside <code className="text-cyan-300">.git/refs/heads/feature-payment</code> containing the 40-character commit SHA where you were standing. That is why branching in Git takes less than 2 milliseconds, regardless of whether your project is 10 KB or 10 Gigabytes!"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="font-semibold text-purple-400">Debangshu:</span>
              <p className="text-slate-300">
                "Sir, what happens when I switch branches with <code className="text-cyan-300">git switch feature-payment</code>?"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 space-y-1">
              <span className="font-semibold text-cyan-300">Sukanta Sir:</span>
              <p className="text-slate-200">
                "Git simply overwrites the single line inside <code className="text-cyan-300">.git/HEAD</code> with <code className="text-indigo-300">ref: refs/heads/feature-payment</code>, and then updates the working tree files to match the snapshot tree pointed to by that branch tip. That is the elegance of Git's architecture."
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
                Interactive Hands-on Terminal Lab Commands
              </h2>
              <p className="text-slate-400 text-sm">
                Explore your repository's internal vault right from your terminal
              </p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 1. View current HEAD file content:</div>
              <div className="text-cyan-300 select-all">$ cat .git/HEAD</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 2. View active branch tip commit hash:</div>
              <div className="text-cyan-300 select-all">$ cat .git/refs/heads/$(git branch --show-current)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 3. Pretty-print the current commit object internals:</div>
              <div className="text-cyan-300 select-all">$ git cat-file -p HEAD</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 text-xs font-sans font-semibold"># 4. Inspect staged files recorded in the binary index:</div>
              <div className="text-cyan-300 select-all">$ git ls-files --stage</div>
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
                Sukanta Sir's 7 Commandments of Git Internals
              </h2>
              <p className="text-slate-400 text-sm">
                Architectural guidelines for keeping your repository healthy and corruption-free
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Rule 1: Treat the .git directory as sacred; never manually edit or delete files inside .git/objects.",
              "Rule 2: Remember that HEAD points to a ref, not a commit, during normal development.",
              "Rule 3: Use 'git cat-file -p' whenever you want to inspect what Git is physically recording.",
              "Rule 4: Never commit .git folders into a repository as plain folders—use Submodules or Subtrees.",
              "Rule 5: Keep local ignore patterns in .git/info/exclude when they shouldn't be shared with teammates.",
              "Rule 6: Understand that git add creates blobs immediately in .git/objects before you even commit.",
              "Rule 7: When cloning or backing up a repository, copying the .git folder copies 100% of all project history."
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
                Internal architecture questions for interviews and academic examinations
              </p>
            </div>
          </div>

          <FAQTemplate questions={questions} topicId="topic11" />
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

          <PlainTextPrint noteText={noteText} fileName="topic11_dot_git_anatomy_notes.txt" />
        </section>

        {/* ─── SECTION 11: TEACHER MENTORSHIP CARD ──────────────────────────── */}
        <Teacher />

        {/* ─── SECTION 12: BOTTOM NAVIGATION BAR ────────────────────────────── */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <Link
            to={prevTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" /> Topic 10: Inspecting Active Configuration
          </Link>

          <Link
            to={nextTopicUrl}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition shadow-lg shadow-cyan-950/40"
          >
            Topic 12: Classroom Mentorship Dialogue <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </main>
    </div>
  );
}
