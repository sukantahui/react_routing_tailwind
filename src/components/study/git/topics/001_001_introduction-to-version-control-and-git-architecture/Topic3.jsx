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
  Flame,
  Award,
  BookOpen
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
 * Topic3: Origins of Git: How Linus Torvalds built Git in 2005 for the Linux kernel development
 * Module: 001_001_introduction-to-version-control-and-git-architecture
 * Segment: foundation (Segment 1 – Git Foundations & Local Repository Architecture)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */
export default function Topic3() {
  const [selectedEvent, setSelectedEvent] = useState("apr2005");
  const [inputString, setInputString] = useState("Linux Kernel 2.6.12");

  // Navigation Logic
  const moduleSlug = "001_001_introduction-to-version-control-and-git-architecture";
  const currentIndex = 3;
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
            <span className="text-sky-400 font-semibold">Topic 04 of {totalTopics}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
              Origins &amp; History
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              Linus Torvalds (2005)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Clock size={13} />
              Estimated: 25 mins
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Origins of Git: How Linus Torvalds Built Git in 2005 for the Linux Kernel
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Step back into April 2005 to explore the BitKeeper controversy that prompted Linus Torvalds to architect Git in under two weeks. Discover how the extreme demands of Linux kernel development shaped Git into an ultra-fast, content-addressable cryptographic toolkit.
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
                In Simple Words (The Fire That Built the Rocket)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                How a crisis turned into the greatest developer tool ever built
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm leading-relaxed text-slate-300">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h3 className="font-semibold text-rose-300 flex items-center gap-2 text-base">
                <Flame size={18} className="text-rose-400" />
                The Crisis of April 2005:
              </h3>
              <p>
                For years, thousands of global Linux developers emailed patches to Linus Torvalds. They used a commercial software named <strong>BitKeeper</strong> to organize changes.
              </p>
              <p className="text-slate-400 text-xs">
                In April 2005, a developer tried to reverse-engineer BitKeeper, so the company abruptly revoked the free license. The entire global Linux kernel development ground to a screeching halt!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h3 className="font-semibold text-emerald-300 flex items-center gap-2 text-base">
                <Zap size={18} className="text-emerald-400" />
                Linus&apos;s 10-Day Coding Spree:
              </h3>
              <p>
                Instead of compromising or picking slow tools like SVN, Linus took a holiday from kernel development, disappeared into his room, and wrote the C code for Git from scratch.
              </p>
              <p className="text-slate-400 text-xs">
                In just <strong>4 days</strong>, Git committed its own source code! In <strong>2 months</strong>, the entire Linux Kernel 2.6.12 was released with Git. It became the world standard for software engineering.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. Timeline of Historical Events ────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <History className="text-sky-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Historical Chronology (1991 – 2005)
            </h2>
          </div>

          {/* Timeline Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "pre2002", year: "1991 – 2002", title: "Patch Email Era" },
              { id: "bkera", year: "2002 – 2005", title: "BitKeeper Era" },
              { id: "apr2005", year: "April 2005", title: "Git Is Created" },
              { id: "jun2005", year: "June 2005", title: "Linux 2.6.12 Release" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedEvent(t.id)}
                className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                  selectedEvent === t.id
                    ? "bg-sky-950/60 border-sky-500/50 text-white shadow-lg"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <p className="text-[10px] font-mono text-sky-400 uppercase font-bold">{t.year}</p>
                <p className="text-xs sm:text-sm font-semibold truncate">{t.title}</p>
              </button>
            ))}
          </div>

          {/* Detailed Timeline Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            {selectedEvent === "pre2002" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-amber-300">1991 – 2002: Tarballs &amp; Mailing List Diffs</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  During the first 11 years of the Linux kernel, changes were passed around as raw tarball archives and email diff patches. Linus Torvalds manually reviewed and applied patches using Unix <code className="text-sky-300 bg-slate-950 px-1 py-0.5 rounded">patch</code> and <code className="text-sky-300 bg-slate-950 px-1 py-0.5 rounded">diff</code> tools. By 2002, with thousands of contributors, this manual workflow became completely unmanageable.
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
                  $ diff -u old_driver.c new_driver.c &gt; patch.diff<br />
                  $ mail -s &quot;[PATCH] USB Driver Fix&quot; torvalds@linux-foundation.org &lt; patch.diff
                </div>
              </div>
            )}

            {selectedEvent === "bkera" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-amber-300">2002 – 2005: The BitKeeper Era</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In 2002, the Linux kernel project adopted BitKeeper, a proprietary commercial DVCS. BitKeeper was extraordinarily fast and proved that distributed version control was the future. However, because it was proprietary, many free software advocates fiercely criticized its use. In April 2005, the relationship between BitMover and the Linux community fractured permanently over protocol reverse-engineering.
                </p>
              </div>
            )}

            {selectedEvent === "apr2005" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-sky-400">April 3 – 7, 2005: The Birth of Git</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Linus set strict goals: sub-second patch application, immunity to corruption, full distribution, and support for thousands of parallel branches. On <strong>April 3, 2005</strong>, Linus wrote the first line of C code. On <strong>April 7, 2005</strong>, Git became self-hosting. In July 2005, Linus handed primary maintenance to <strong>Junio C Hamano</strong>.
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-sky-500/30 text-xs text-sky-300 font-mono">
                  commit e83c5163316f89bfbde7d9ab23ca2e25604af290<br />
                  Author: Linus Torvalds &lt;torvalds@ppc970.osdl.org&gt;<br />
                  Date:   Thu Apr 7 15:13:13 2005 -0700<br />
                  Initial revision of &quot;git&quot;, the information manager from hell
                </div>
              </div>
            )}

            {selectedEvent === "jun2005" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-emerald-300">June 16, 2005: Linux 2.6.12 Release</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Just 10 weeks after its initial creation, Git was used to coordinate and release the complete Linux Kernel 2.6.12. Git proved that a content-addressable Merkle DAG was orders of magnitude faster and safer than all existing version control systems on Earth.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Linus's 5 Core Design Principles ────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="text-amber-400" size={22} />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Linus Torvalds&apos; 5 Core Architectural Requirements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300">1. Take CVS/SVN as Examples of What NOT to Do</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Linus famously studied Subversion and CVS and deliberately chose the opposite design for almost every architectural decision.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300">2. Extreme Speed &amp; Low Latency</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Applying a patch across 10,000 files in Linux had to execute in &lt; 3 seconds. Git uses memory-mapped files and zlib compression.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300">3. Non-Linear Development (Cheap Merges)</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Kernel maintainers create dozens of temporary branches daily. Merging and branch switching had to be instantaneous.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <p className="font-bold text-sky-300">4. Complete Cryptographic Integrity</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every file, directory, and commit is hashed using SHA-1/SHA-256. Silent data corruption or deliberate tampering is mathematically impossible.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. Classroom Mentorship Scenario ───────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="text-purple-400" size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Barrackpore Classroom Mentorship: The Engineering Mindset
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300">Abhronila (Student):</span>
              <p>
                &ldquo;Sir, why did Linus write Git in C instead of Python or C++? Wouldn&apos;t a high-level language be easier to write in just two weeks?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;Great question, Abhronila! Python and high-level languages are wonderful for applications, but Git is a <strong>filesystem-level performance engine</strong>. When you run <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">git status</code> on a 200,000-file repository, Git must scan file metadata (stat cache) and hash file blocks at hardware limits. Only pure C allows direct POSIX memory mapping (<code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">mmap</code>) with zero garbage collection pauses!&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300">Swadeep (Student):</span>
              <p>
                &ldquo;Is that why Git commands feel like they execute instantly even on huge projects?&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-1">
              <span className="font-bold text-sky-300">Sukanta Sir (Educator):</span>
              <p>
                &ldquo;Exactly, Swadeep! Because Git was designed under the immense performance requirements of the Linux operating system, it effortlessly handles any web, mobile, or enterprise project we build today.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Comprehensive FAQ Section ───────────────────────────── */}
        <section className="space-y-4">
          <FAQTemplate
            title="Origins of Git: Comprehensive Q&A Knowledge Base"
            subtitle="25 in-depth technical questions exploring Linus Torvalds, the 2005 BitKeeper crisis, and early Git architecture"
            questions={questions}
          />
        </section>

        {/* ─── 7. Printable Plain-Text Study Note ─────────────────────── */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 04 Study Note: Origins of Git & Linus Torvalds"
            downloadFileName="git_topic03_origins_of_git_note.txt"
          />
        </section>

        {/* ─── 8. Teacher Mentorship Note ─────────────────────────────── */}
        <section>
          <Teacher
            note="Principle: Git was forged under the extreme practical fire of Linux kernel development, not academic theory. That is why it is fast, distributed, and unbreakable. Warning: Never view Git as just a set of magic terminal spells; understand its content-addressable object database. Habit: Inspect what Git is doing under the hood with 'git cat-file' and 'git log'. Motivation: When you understand how Git was built, you master the greatest collaboration engine in software history! — Sukanta Hui, Coder & AccoTax"
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
              <span>Previous: CVCS vs DVCS (Topic 3)</span>
            </Link>
          ) : (
            <div />
          )}

          {hasNext ? (
            <Link
              to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-950 transition hover:scale-[1.02]"
            >
              <span>Next: Core Design Principles (Topic 5)</span>
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
