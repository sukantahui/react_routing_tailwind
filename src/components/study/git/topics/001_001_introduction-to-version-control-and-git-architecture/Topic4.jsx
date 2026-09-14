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
  FileText,
  Folder,
  Tag,
  Hash
} from "lucide-react";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import roadmapData from "../../git-roadmap.json";

// ─── Dedicated Companion File Imports ──────────────────────────────────
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4: Core Design Principles of Git: Speed, simple design, non-linear development support, full distribution, and data integrity
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic4() {
  const [activeObjectType, setActiveObjectType] = useState("blob");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 4;
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
            <span className="text-sky-400 font-semibold">Topic 05 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              Core Architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              The 5 Design Pillars
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Core Design Principles of Git: The 5 Pillars &amp; The 4 Core Objects
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Uncover the internal elegance of Git: why raw speed, simple object design (Blob, Tree, Commit, Tag), non-linear branching, full distribution, and cryptographic Merkle integrity make Git the ultimate content-addressable key-value store.
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
                In Simple Words (The Transparent Lego Blocks)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                How Git achieves infinite complexity with just 4 simple building blocks
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed text-slate-300">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                The Complexity Illusion:
              </h3>
              <p>
                People often say &ldquo;Git is too complicated!&rdquo; But beneath all the commands, Git is actually simpler than almost any other software.
              </p>
              <p className="text-slate-400 text-xs">
                Linus did not build a giant database engine. He created a simple folder of compressed files where every file is named after its fingerprint (hash).
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white flex items-center gap-2 text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                The 4 Simple Lego Pieces:
              </h3>
              <p>
                Everything in Git is made from just <strong>4 Lego blocks</strong>:
              </p>
              <ul className="text-xs space-y-1 text-slate-300">
                <li>• 📄 <strong>Blob:</strong> The file content.</li>
                <li>• 📁 <strong>Tree:</strong> The folder list holding files and sub-folders.</li>
                <li>• 🏷️ <strong>Commit:</strong> The snapshot record pointing to a Tree and Parent.</li>
                <li>• 🔖 <strong>Tag:</strong> A permanent named bookmark.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 3. The 5 Core Pillars ──────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 5 Core Design Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { num: "01", title: "Speed", desc: "Sub-second POSIX C execution with mmap", color: "sky" },
              { num: "02", title: "Simple Design", desc: "Just 4 core object types in .git/objects", color: "indigo" },
              { num: "03", title: "Non-Linear Dev", desc: "Instant branching & 3-way DAG merges", color: "purple" },
              { num: "04", title: "Distributed", desc: "Zero central server dependency", color: "emerald" },
              { num: "05", title: "Data Integrity", desc: "SHA-1/256 Merkle tree verification", color: "amber" }
            ].map((p) => (
              <div key={p.num} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-center">
                <span className="text-[10px] font-mono text-sky-400 font-bold">{p.num}</span>
                <p className="font-bold text-white text-sm">{p.title}</p>
                <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. The 4 Fundamental Object Types (Interactive) ───────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Database className="text-emerald-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Deep Dive: The 4 Core Git Object Types
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "blob", label: "1. Blob (File Content)", icon: FileText },
              { id: "tree", label: "2. Tree (Directories)", icon: Folder },
              { id: "commit", label: "3. Commit (Snapshots)", icon: GitBranch },
              { id: "tag", label: "4. Tag (Releases)", icon: Tag }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveObjectType(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 border ${
                    activeObjectType === tab.id
                      ? "bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-950"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Object Type Inspector Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            {activeObjectType === "blob" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-sky-300 flex items-center gap-2">
                    <FileText size={18} />
                    Blob (Binary Large Object)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Stores Pure File Bytes</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A <strong>Blob</strong> stores only the raw compressed file contents. It does <em>not</em> store the filename, directory path, or file permissions. If you rename a file without changing its contents, the blob SHA remains 100% unchanged!
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-200 space-y-1">
                  <p className="text-slate-500"># Inspect blob raw content:</p>
                  <p>$ git cat-file -p 7f2a1b9c8...</p>
                  <p className="text-emerald-400">export function calculateGST(amount) &#123; return amount * 0.18; &#125;</p>
                </div>
              </div>
            )}

            {activeObjectType === "tree" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-indigo-300 flex items-center gap-2">
                    <Folder size={18} />
                    Tree Object (Directories &amp; Hierarchy)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Folder Representation</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A <strong>Tree</strong> represents a folder. Each line in a tree object contains the file permission mode (e.g. <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">100644</code> for normal file, <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">100755</code> for executable script, <code className="text-indigo-300 bg-slate-950 px-1 py-0.5 rounded">040000</code> for sub-directory), object type, SHA hash, and the filename.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 space-y-1">
                  <p className="text-slate-500"># Inspect tree object:</p>
                  <p>$ git cat-file -p HEAD^&#123;tree&#125;</p>
                  <p className="text-slate-300">100644 blob e69de29bb2d1...   README.md</p>
                  <p className="text-slate-300">040000 tree a1b2c3d4e5f6...   src</p>
                </div>
              </div>
            )}

            {activeObjectType === "commit" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-purple-300 flex items-center gap-2">
                    <GitBranch size={18} />
                    Commit Object (The Permanent Snapshot)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Snapshot &amp; History Chain</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A <strong>Commit</strong> binds a top-level Tree object to a parent commit, recording who made the change (Author), who committed it, the exact timestamp, and the commit message.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-200 space-y-1">
                  <p className="text-slate-500"># Inspect commit object:</p>
                  <p>$ git cat-file -p HEAD</p>
                  <p className="text-sky-300">tree d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3</p>
                  <p className="text-amber-300">parent 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b</p>
                  <p className="text-slate-300">author Sukanta Hui &lt;sukanta@codernaccotax.co.in&gt; 1726315200 +0530</p>
                  <p className="text-slate-300">committer Sukanta Hui &lt;sukanta@codernaccotax.co.in&gt; 1726315200 +0530</p>
                  <p className="text-emerald-400 mt-2">feat: add GST billing module for Barrackpore center</p>
                </div>
              </div>
            )}

            {activeObjectType === "tag" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-amber-300 flex items-center gap-2">
                    <Tag size={18} />
                    Annotated Tag Object (Release Fingerprint)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Cryptographic Milestone</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  An <strong>Annotated Tag</strong> is a permanent object in the database pointing to a commit, carrying its own author, date, message, and optional GPG signature.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-200 space-y-1">
                  <p className="text-slate-500"># Inspect tag object:</p>
                  <p>$ git cat-file -p v1.0.0</p>
                  <p className="text-purple-300">object 7f2a1b9c8d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a</p>
                  <p className="text-slate-300">type commit</p>
                  <p className="text-slate-300">tag v1.0.0</p>
                  <p className="text-slate-300">tagger Sukanta Hui &lt;sukanta@codernaccotax.co.in&gt; 1726315500 +0530</p>
                  <p className="text-emerald-400 mt-2">Production Release 1.0.0</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-indigo-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: Content Deduplication
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300">Susmita (Student):</span>
              <p>
                &ldquo;Sir, if I have a 10MB PDF manual in my project, and I make 50 commits editing only JavaScript code, does Git copy that 10MB PDF 50 times in the object database?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;Brilliant question, Susmita! The answer is <strong>absolutely not!</strong> Git uses <strong>content-addressable storage</strong>. That 10MB PDF is hashed into a single Blob SHA. Across all 50 commits, every new Tree object simply points back to the exact same 10MB Blob SHA. That 10MB is stored on disk exactly ONCE!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Core Design Principles of Git: Comprehensive Q&A Knowledge Base"
            subtitle="25 detailed technical questions exploring the 5 design pillars and 4 core object types"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 05 Study Note: Core Design Principles of Git"
            downloadFileName="git_topic04_core_design_principles_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Git is not a black box of magic commands; it is an elegant content-addressable key-value store made of 4 simple objects: Blob, Tree, Commit, Tag. Warning: Never store passwords or secrets in Git thinking you can just delete them later—Git's immutable history preserves every blob! Habit: Use 'git cat-file -p' and 'git ls-tree' whenever you want to inspect what Git is actually storing. Motivation: When you master the core design principles, version control becomes pure joy. — Sukanta Hui, Coder & AccoTax"
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
              <span>Previous: Origins of Git (Topic 4)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Installing Git (Topic 6)</span>
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
